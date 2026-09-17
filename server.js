require('dotenv').config();
const express = require('express');
const path = require('path');
const { QUESTIONS } = require('./data.js');
const {
  findTutorKnowledge,
  generateSimpleIndianEnglishExplanation,
  generateBengaliExplanation,
  generateRelatedQuestions
} = require('./ai-knowledge.js');

const app = express();
const PORT = Number(process.env.PORT || 3000);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for development & local simulators
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Serve static frontend files
app.use(express.static(__dirname));

// Health check
app.get('/api/health', (req, res) => {
  const hasGemini = Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);
  res.json({
    ok: true,
    status: 'healthy',
    mode: hasGemini ? 'gemini' : (hasOpenAI ? 'openai' : 'high-yield-knowledge-engine'),
    totalQuestions: QUESTIONS.length
  });
});

/**
 * Helper to call external LLMs if API keys are configured
 */
async function callLiveLLM({ systemInstruction, userPrompt }) {
  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;

  if (geminiKey) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemInstruction }]
          },
          contents: [
            { role: 'user', parts: [{ text: userPrompt }] }
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 500
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text && text.trim()) {
          return text.trim();
        }
      }
    } catch (e) {
      console.warn('Gemini live API attempt failed, using high-yield tutor engine:', e.message);
    }
  }

  if (openAiKey) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.3,
          max_tokens: 500
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data?.choices?.[0]?.message?.content;
        if (text && text.trim()) {
          return text.trim();
        }
      }
    } catch (e) {
      console.warn('OpenAI live API attempt failed, using high-yield tutor engine:', e.message);
    }
  }

  return null;
}

/**
 * POST /api/ai/explain
 * Explain answer in Simple Indian English or Natural Bengali according to marks
 */
app.post('/api/ai/explain', async (req, res) => {
  try {
    const { questionId, question, answer, subject, topic, language = 'en-in', marks = 2 } = req.body;
    
    // Resolve question data from stored DB if questionId is provided
    let targetQuestion = question;
    let targetAnswer = answer;
    let targetTopic = topic;
    let targetSubject = subject;

    if (questionId) {
      const found = QUESTIONS.find(q => q.id === Number(questionId));
      if (found) {
        targetQuestion = targetQuestion || found.question;
        targetAnswer = targetAnswer || found.answer;
        targetTopic = targetTopic || found.topic;
        targetSubject = targetSubject || found.subject;
      }
    }

    const isBengali = language === 'bn' || (language && language.toLowerCase().startsWith('bn'));
    const markNum = Number(marks) || 2;

    // Build system instructions as mandated by user specification
    let systemInstruction = `You are a friendly B.Sc. Nursing teacher helping students prepare for examinations.
The student may not be fluent in English.
Explain the supplied nursing answer according to the number of marks (${markNum} marks).
Do not use unnecessarily difficult vocabulary.
Keep important medical and nursing terms accurate.
Explain difficult terminology in simple language.
Do not change the meaning of the stored exam answer.
Do not invent facts.
Do not provide personal medical diagnosis or treatment advice.
This is an educational examination preparation application.
For a 2-mark question, keep the explanation short.
For higher-mark questions, provide appropriately greater detail.
The explanation should sound like a patient, friendly nursing teacher teaching a student.`;

    if (isBengali) {
      systemInstruction += `\n\nWhen Bengali is selected:
Explain in natural conversational Bengali suitable for a B.Sc. Nursing student.
Do not translate word-by-word.
Use Bengali for explanations but retain important medical terminology in English where it improves understanding (e.g., "Uterus বা জরায়ু", "delivery-এর পর অতিরিক্ত bleeding", "Hypertension মানে high blood pressure").
Use simple sentences.
Avoid highly literary Bengali.
The student should be able to understand the explanation even if their English is weak.`;
    } else {
      systemInstruction += `\n\nWhen Indian English is selected:
Explain using simple Indian English.
Avoid advanced vocabulary.
Use short sentences. One idea per sentence.
Explain difficult medical terms in simple language.
Write as if an experienced Indian nursing teacher is explaining the concept to a student in class.`;
    }

    const userPrompt = `Question: "${targetQuestion}"
Subject: ${targetSubject || 'Nursing'}
Topic: ${targetTopic || ''}
Exam Answer:
${targetAnswer}

Please provide a ${markNum}-mark student explanation in ${isBengali ? 'natural Bengali with English medical terms' : 'simple Indian English'}.`;

    // Try live LLM if API key is present
    const liveExplanation = await callLiveLLM({ systemInstruction, userPrompt });

    if (liveExplanation) {
      return res.json({
        ok: true,
        explanation: liveExplanation,
        language: isBengali ? 'bn' : 'en-in',
        marks: markNum,
        source: 'live-llm'
      });
    }

    // High-yield built-in teacher engine fallback
    let fallbackExplanation = isBengali
      ? generateBengaliExplanation(targetQuestion, targetAnswer, markNum, targetTopic)
      : generateSimpleIndianEnglishExplanation(targetQuestion, targetAnswer, markNum, targetTopic);

    return res.json({
      ok: true,
      explanation: fallbackExplanation,
      language: isBengali ? 'bn' : 'en-in',
      marks: markNum,
      source: 'high-yield-tutor'
    });
  } catch (err) {
    console.error('Error in /api/ai/explain:', err);
    res.status(500).json({ ok: false, error: 'Failed to generate explanation' });
  }
});

/**
 * POST /api/ai/related
 * Suggest 3 to 5 related questions linked to syllabus
 */
app.post('/api/ai/related', (req, res) => {
  try {
    const { questionId, question, topic, subject } = req.body;
    let target = { question, topic, subject, id: questionId };

    if (questionId) {
      const found = QUESTIONS.find(q => q.id === Number(questionId));
      if (found) target = found;
    }

    const relatedList = generateRelatedQuestions(target, QUESTIONS);
    res.json({
      ok: true,
      related: relatedList
    });
  } catch (err) {
    console.error('Error in /api/ai/related:', err);
    res.status(500).json({ ok: false, error: 'Failed to find related questions' });
  }
});

/**
 * POST /api/ai/practice-answer
 * Generate a practice answer for a related question if not in stored bank
 */
app.post('/api/ai/practice-answer', async (req, res) => {
  try {
    const { question, marks = 2 } = req.body;
    const markNum = Number(marks) || 2;

    // Check if question exists in stored question bank
    const qLower = String(question || '').toLowerCase().trim();
    const stored = QUESTIONS.find(q => q.question.toLowerCase().includes(qLower) || qLower.includes(q.question.toLowerCase()));

    if (stored) {
      return res.json({
        ok: true,
        answer: stored.answer,
        isStored: true,
        marks: 2
      });
    }

    // Try live LLM for practice answer
    const systemInstruction = `You are a B.Sc. Nursing examination tutor for West Bengal University of Health Sciences (WBUHS).
Provide a concise, academically accurate ${markNum}-mark examination answer.
- Keep the answer concise but complete.
- Use proper definitions.
- Use numbered points where applicable.
- If the question asks for two points, provide two strong points.
- If the question asks for four points, provide four strong points.
- Do not provide conversational filler.`;

    const userPrompt = `Generate a ${markNum}-mark exam answer for: "${question}"`;

    const liveAnswer = await callLiveLLM({ systemInstruction, userPrompt });
    if (liveAnswer) {
      return res.json({
        ok: true,
        answer: liveAnswer,
        isStored: false,
        marks: markNum
      });
    }

    // Default synthesis
    const defaultAnswer = `1. Monitor the patient's vital signs and clinical condition regularly.\n2. Promptly notify the attending physician of any abnormal findings and document all care given.`;

    return res.json({
      ok: true,
      answer: defaultAnswer,
      isStored: false,
      marks: markNum
    });
  } catch (err) {
    console.error('Error in /api/ai/practice-answer:', err);
    res.status(500).json({ ok: false, error: 'Failed to generate practice answer' });
  }
});

// Student reading progress state for Admin Dashboard
let studentProgress = {
  studentName: 'Sayantani Hauri',
  totalQuestions: 80,
  questionsReadCount: 0,
  questionsReadList: [],
  lastActive: null
};

// In-memory verification logs for Admin Dashboard
const verificationLogs = [];

// POST /api/study/progress - Sync student questions read count
app.post('/api/study/progress', (req, res) => {
  try {
    const { studentName, questionsReadCount, questionsReadList, newQuestion } = req.body;
    if (studentName) studentProgress.studentName = studentName;
    if (typeof questionsReadCount === 'number') {
      studentProgress.questionsReadCount = questionsReadCount;
    }
    if (Array.isArray(questionsReadList)) {
      studentProgress.questionsReadList = questionsReadList;
      studentProgress.questionsReadCount = questionsReadList.length;
    } else if (newQuestion && newQuestion.id) {
      const idx = studentProgress.questionsReadList.findIndex(q => q.id === newQuestion.id);
      if (idx === -1) {
        studentProgress.questionsReadList.push(newQuestion);
      } else {
        studentProgress.questionsReadList[idx] = newQuestion;
      }
      studentProgress.questionsReadCount = studentProgress.questionsReadList.length;
    }
    studentProgress.lastActive = new Date().toISOString();
    res.json({ ok: true, progress: studentProgress });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// POST /api/verification/checkin - Submit verified study session
app.post('/api/verification/checkin', (req, res) => {
  try {
    const { 
      studentName, 
      imageBase64, 
      latitude, 
      longitude, 
      accuracy, 
      locationName,
      questionsReadCount, 
      questionsReadList, 
      timestamp 
    } = req.body;

    if (Array.isArray(questionsReadList) && questionsReadList.length > 0) {
      studentProgress.questionsReadList = questionsReadList;
      studentProgress.questionsReadCount = questionsReadList.length;
    } else if (typeof questionsReadCount === 'number') {
      studentProgress.questionsReadCount = questionsReadCount;
    }
    if (studentName) studentProgress.studentName = studentName;
    studentProgress.lastActive = timestamp || new Date().toISOString();

    const record = {
      id: Date.now().toString(),
      studentName: studentName || 'Sayantani Hauri',
      imageBase64: imageBase64 || null,
      latitude: typeof latitude === 'number' ? latitude : null,
      longitude: typeof longitude === 'number' ? longitude : null,
      accuracy: accuracy || null,
      locationName: locationName || null,
      questionsReadCount: typeof questionsReadCount === 'number' ? questionsReadCount : studentProgress.questionsReadCount,
      timestamp: timestamp || new Date().toISOString()
    };

    verificationLogs.unshift(record);
    // Keep last 100 entries
    if (verificationLogs.length > 100) verificationLogs.pop();

    res.json({ ok: true, message: 'Study verification recorded successfully', id: record.id });
  } catch (err) {
    console.error('Check-in error:', err);
    res.status(500).json({ ok: false, error: 'Failed to record verification' });
  }
});

// GET /api/verification/logs - View logs and reading progress for Admin Dashboard
app.get('/api/verification/logs', (req, res) => {
  res.json({ 
    ok: true, 
    count: verificationLogs.length, 
    logs: verificationLogs,
    progress: studentProgress
  });
});

// Serve standalone Admin Dashboard
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Catch-all route to serve index.html
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Bilingual AI Nursing Tutor server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
