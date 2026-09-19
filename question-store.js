const fs = require('fs');
const path = require('path');
const { QUESTIONS } = require('./data.js');
const { THREE_MARK_QUESTIONS } = require('./threeMarkData.js');
const { FOUR_MARK_QUESTIONS } = require('./fourMarkData.js');
const { FIVE_MARK_QUESTIONS } = require('./fiveMarkData.js');
const { MCQ_QUESTIONS } = require('./mcqData.js');

let cachedBlobClient = null;

function optionalBlobClient() {
  if (cachedBlobClient !== null) return cachedBlobClient;
  try {
    cachedBlobClient = require('@vercel/blob');
  } catch (err) {
    cachedBlobClient = false;
  }
  return cachedBlobClient;
}

const STORE_FILE = path.join(process.cwd(), 'question-store.local.json');
const BLOB_KEY = process.env.QUESTION_STORE_BLOB_KEY || 'wbuhs-question-store.json';

function toSlug(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function normalizeWrittenQuestion(raw, marks) {
  const id = raw.id || `${marks}m-${toSlug(raw.question || raw.q || raw.topic || Date.now())}`;
  const answerPoints = Array.isArray(raw.answerPoints) && raw.answerPoints.length > 0 ? raw.answerPoints : undefined;
  const definitionLines = Array.isArray(raw.answerDefinitionLines) && raw.answerDefinitionLines.length > 0
    ? raw.answerDefinitionLines
    : (raw.definition ? [raw.definition] : []);
  const flatAnswer = raw.answer || raw.a || [
    ...definitionLines,
    ...(answerPoints || []).map((point, index) => `${index + 1}. ${point.heading || `Point ${index + 1}`}: ${point.text || point.description || ''}`),
    raw.additionalNotes || raw.conclusion || ''
  ].filter(Boolean).join('\n\n');

  const normalized = {
    id,
    source: raw.source || 'admin',
    marks,
    type: raw.type || 'written',
    status: raw.status || 'published',
    priority: raw.priority || 'important',
    subject: raw.subject || raw.category || raw.cat || 'Nursing',
    category: raw.category || raw.subject || raw.cat || 'Nursing',
    cat: raw.cat || raw.subject || raw.category || 'Nursing',
    topic: raw.topic || '',
    question: raw.question || raw.q || '',
    q: raw.question || raw.q || '',
    answer: flatAnswer,
    a: flatAnswer,
    answerTitle: raw.answerTitle || raw.title || '',
    additionalNotes: raw.additionalNotes || '',
    conclusion: raw.conclusion || '',
    keywords: Array.isArray(raw.keywords) ? raw.keywords : [],
    important: raw.important !== false,
    createdAt: raw.createdAt || null,
    updatedAt: raw.updatedAt || null,
    publishedAt: raw.publishedAt || null
  };

  if (definitionLines.length > 0) {
    normalized.answerDefinitionLines = definitionLines;
    normalized.definition = definitionLines.join('\n');
  }
  if (answerPoints) {
    normalized.answerPoints = answerPoints;
  }

  return normalized;
}

function normalizeMcq(raw) {
  const id = raw.id || `mcq-${toSlug(raw.question || Date.now())}`;
  return {
    id,
    mcqNumber: raw.mcqNumber || null,
    source: raw.source || 'admin',
    marks: 'mcq',
    type: 'mcq',
    status: raw.status || 'published',
    priority: raw.priority || 'important',
    subject: raw.subject || raw.category || 'Nursing',
    category: raw.category || raw.subject || 'Nursing',
    topic: raw.topic || '',
    question: raw.question || '',
    options: Array.isArray(raw.options) ? raw.options.slice(0, 4) : ['', '', '', ''],
    correctAnswer: Number(raw.correctAnswer || 0),
    explanation: raw.explanation || '',
    keywords: Array.isArray(raw.keywords) ? raw.keywords : [],
    createdAt: raw.createdAt || null,
    updatedAt: raw.updatedAt || null,
    publishedAt: raw.publishedAt || null
  };
}

function normalizeQuestion(raw) {
  const marks = String(raw.marks || '').toLowerCase() === 'mcq' ? 'mcq' : Number(raw.marks || 2);
  if (marks === 'mcq') return normalizeMcq(raw);
  return normalizeWrittenQuestion(raw, marks);
}

function validateQuestion(question) {
  if (!question.question || !String(question.question).trim()) {
    throw new Error('Question is required.');
  }
  if (!question.marks && question.marks !== 0) {
    throw new Error('Marks is required.');
  }
  if (question.marks === 'mcq') {
    if (!Array.isArray(question.options) || question.options.length < 4 || question.options.slice(0, 4).some(option => !String(option || '').trim())) {
      throw new Error('MCQ requires Option A, B, C and D.');
    }
    if (![0, 1, 2, 3].includes(Number(question.correctAnswer))) {
      throw new Error('MCQ requires a valid correct answer.');
    }
    return;
  }
  if (![2, 3, 4, 5].includes(Number(question.marks))) {
    throw new Error('Marks must be 2, 3, 4, 5, or MCQ.');
  }
  if (!question.answer || !String(question.answer).trim()) {
    throw new Error('Answer is required for written questions.');
  }
}

function getSeedQuestions() {
  const twoMark = QUESTIONS.map(q => normalizeWrittenQuestion({ ...q, source: 'seed', marks: 2, status: 'published' }, 2));
  const threeMark = THREE_MARK_QUESTIONS
    .map(q => normalizeWrittenQuestion({ ...q, source: 'seed', marks: 3, status: 'published' }, 3));
  const fourMark = FOUR_MARK_QUESTIONS
    .map(q => normalizeWrittenQuestion({ ...q, source: 'seed', marks: 4, status: 'published' }, 4));
  const fiveMark = FIVE_MARK_QUESTIONS
    .map(q => normalizeWrittenQuestion({ ...q, source: 'seed', marks: 5, status: 'published' }, 5));
  const mcq = MCQ_QUESTIONS
    .map(q => normalizeMcq({ ...q, source: 'seed', status: 'published' }));
  return [...twoMark, ...threeMark, ...fourMark, ...fiveMark, ...mcq];
}

async function readAdminStore() {
  const blob = optionalBlobClient();
  if (blob && process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const list = await blob.list({ prefix: BLOB_KEY, limit: 1 });
      const item = list.blobs.find(entry => entry.pathname === BLOB_KEY);
      if (!item) return { questions: [] };
      const res = await fetch(item.url, { cache: 'no-store' });
      if (!res.ok) return { questions: [] };
      return await res.json();
    } catch (err) {
      console.warn('Vercel Blob question store read failed; using local fallback:', err.message);
    }
  }

  if (!fs.existsSync(STORE_FILE)) return { questions: [] };
  return JSON.parse(fs.readFileSync(STORE_FILE, 'utf8'));
}

async function writeAdminStore(store) {
  const cleanStore = {
    version: 1,
    updatedAt: new Date().toISOString(),
    questions: Array.isArray(store.questions) ? store.questions.map(normalizeQuestion) : []
  };

  const blob = optionalBlobClient();
  if (blob && process.env.BLOB_READ_WRITE_TOKEN) {
    await blob.put(BLOB_KEY, JSON.stringify(cleanStore, null, 2), {
      access: 'public',
      contentType: 'application/json',
      allowOverwrite: true
    });
    return cleanStore;
  }

  fs.writeFileSync(STORE_FILE, JSON.stringify(cleanStore, null, 2));
  return cleanStore;
}

function sortQuestions(items) {
  return [...items].sort((a, b) => {
    const markA = a.marks === 'mcq' ? 99 : Number(a.marks);
    const markB = b.marks === 'mcq' ? 99 : Number(b.marks);
    if (markA !== markB) return markA - markB;
    return String(a.id).localeCompare(String(b.id), undefined, { numeric: true });
  });
}

async function listQuestions({ marks, includeDrafts = false } = {}) {
  const store = await readAdminStore();
  const items = [...getSeedQuestions(), ...(store.questions || []).map(normalizeQuestion)]
    .filter(q => includeDrafts || q.status === 'published')
    .filter(q => !marks || String(q.marks).toLowerCase() === String(marks).toLowerCase());
  return sortQuestions(items);
}

async function getQuestion(id, { includeDrafts = false } = {}) {
  const questions = await listQuestions({ includeDrafts });
  return questions.find(q => String(q.id) === String(id)) || null;
}

async function saveQuestion(payload, existingId = null) {
  const store = await readAdminStore();
  const now = new Date().toISOString();
  const normalized = normalizeQuestion({
    ...payload,
    id: existingId || payload.id,
    source: 'admin',
    createdAt: payload.createdAt || now,
    updatedAt: now,
    publishedAt: payload.status === 'published' ? (payload.publishedAt || now) : payload.publishedAt || null
  });

  if (!normalized.id) {
    normalized.id = `${normalized.marks}m-${toSlug(normalized.question)}-${Date.now()}`;
  }
  validateQuestion(normalized);

  const questions = Array.isArray(store.questions) ? store.questions.map(normalizeQuestion) : [];
  const index = questions.findIndex(q => String(q.id) === String(existingId || normalized.id));
  if (index < 0 && getSeedQuestions().some(q => String(q.id) === String(normalized.id))) {
    throw new Error('Question ID already belongs to a built-in question. Use a different ID.');
  }
  if (index >= 0) questions[index] = { ...questions[index], ...normalized, createdAt: questions[index].createdAt || normalized.createdAt };
  else questions.push(normalized);

  await writeAdminStore({ questions });
  return normalized;
}

async function deleteQuestion(id) {
  const store = await readAdminStore();
  const questions = Array.isArray(store.questions) ? store.questions.map(normalizeQuestion) : [];
  const next = questions.filter(q => String(q.id) !== String(id));
  await writeAdminStore({ questions: next });
  return next.length !== questions.length;
}

async function setPublishState(id, published) {
  const existing = await getQuestion(id, { includeDrafts: true });
  if (!existing || existing.source !== 'admin') return null;
  return saveQuestion({
    ...existing,
    status: published ? 'published' : 'draft',
    publishedAt: published ? new Date().toISOString() : existing.publishedAt
  }, id);
}

function getCounts(questions) {
  return {
    2: questions.filter(q => Number(q.marks) === 2).length,
    3: questions.filter(q => Number(q.marks) === 3).length,
    4: questions.filter(q => Number(q.marks) === 4).length,
    5: questions.filter(q => Number(q.marks) === 5).length,
    mcq: questions.filter(q => String(q.marks).toLowerCase() === 'mcq').length
  };
}

module.exports = {
  listQuestions,
  getQuestion,
  saveQuestion,
  deleteQuestion,
  setPublishState,
  getCounts,
  normalizeQuestion
};
