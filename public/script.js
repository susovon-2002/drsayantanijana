/**
 * WBUHS B.Sc. Nursing 7th Semester Mobile Study Application
 * 
 * Features:
 * - 80 High-Yield 2-Mark Questions & Model Answers
 * - 3-Minute Focused Study Timer with Strict Next-Question Lock
 * - Natural Bengali Completion Voice: "সায়ন্তনী বাবু হাউরি, তুমি কি পুরোটা পড়েছ? বুঝতে পেরেছ? আবার পড়ার প্রশ্নটা পড়ো।"
 * - Bilingual AI Nursing Tutor (Simple Indian English & Natural Conversational Bengali)
 * - Natural Voice Engine with Slow Learning Pacing (0.84x default)
 * - Exam Marks-based Explanation (2, 3, 5 marks)
 * - Related Questions Generator with Stored vs AI-Generated distinction
 * - Offline-first Resilience with Server-Side LLM Security
 */
(() => {
  'use strict';

  // Defensive dataset resolution
  const allQuestions = (typeof QUESTIONS !== 'undefined' && Array.isArray(QUESTIONS))
    ? QUESTIONS
    : (typeof window !== 'undefined' && Array.isArray(window.QUESTIONS) ? window.QUESTIONS : []);

  if (!allQuestions || allQuestions.length === 0) {
    console.error('QUESTIONS dataset not loaded.');
    return;
  }

  // Ensure global availability
  if (typeof window !== 'undefined') {
    window.QUESTIONS = allQuestions;
  }

  // Category Tag Mapping
  const CATEGORY_TAG_MAP = {
    'Midwifery & Obstetrical Nursing': 'tag-midwifery',
    'Newborn Care': 'tag-newborn',
    'Lactation & Breastfeeding': 'tag-lactation',
    'Community Health Nursing II': 'tag-community',
    'Nursing Research & Statistics': 'tag-research'
  };

  allQuestions.forEach((item, index) => {
    item.id = item.id || (index + 1);
    item.strId = 'q_' + item.id;
    item.displayIndex = String(item.id).padStart(2, '0');
    item.tagClass = CATEGORY_TAG_MAP[item.subject || item.cat] || 'tag-community';
    item.priority = item.priority || 'normal';
    item.keywords = item.keywords || [];
    item.answer_version = item.answer_version || 'local-v1';
  });

  // Storage Keys
  const STORAGE_STARRED = 'wbuhs_starred_v1';
  const STORAGE_MASTERED = 'wbuhs_mastered_v1';
  const STORAGE_THEME = 'wbuhs_theme_v1';
  const STORAGE_SPEED = 'wbuhs_voice_speed_v1';
  const STORAGE_LANG = 'wbuhs_explanation_lang_v1';
  const STORAGE_AI_SPEED = 'wbuhs_ai_speed_v1';
  const STORAGE_ACTIVE_TIMER = 'wbuhs_active_timer_v1';
  const STORAGE_STUDY_STATS = 'wbuhs_study_history_v1';

  // Constants
  const STUDY_TIMER_SECONDS = 180; // Exactly 3 minutes
  const BENGALI_COMPLETION_SPEECH = 'সায়ন্তনী বাবু হাউরি, তুমি কি পুরোটা পড়েছ? বুঝতে পেরেছ? আবার পড়ার প্রশ্নটা পড়ো।';

  // Persistent State
  let starredIds = new Set(loadStorage(STORAGE_STARRED));
  let masteredIds = new Set(loadStorage(STORAGE_MASTERED));
  let voiceSpeed = parseFloat(localStorage.getItem(STORAGE_SPEED)) || 1.0;
  let explanationLang = localStorage.getItem(STORAGE_LANG) || 'en-in'; // 'en-in' | 'bn' | 'auto'
  let selectedSpeechLanguage = localStorage.getItem(STORAGE_LANG) || 'en-in';
  let aiVoiceSpeed = localStorage.getItem(STORAGE_AI_SPEED) || 'slow'; // 'slow' (0.84) | 'normal' (0.98) | 'fast' (1.18)

  const AI_SPEECH_RATES = {
    slow: 0.84,    // 🐢 Slow (pedagogical default for learners)
    normal: 0.98,  // 🙂 Normal
    fast: 1.18     // ⚡ Fast
  };

  // Runtime State
  let activeTab = 'list';
  let activeCategory = 'All';
  let searchTerm = '';
  let flashcardIndex = 0;
  let isCardFlipped = false;
  let isAllExpanded = false;

  // TTS State for Exam Audio
  let currentAudioItem = null;
  let currentAudioType = null; // 'question' | 'answer'
  let isPaused = false;
  let cachedFemaleVoice = null;
  let cachedBengaliVoice = null;

  // AI Tutor State & Caches
  const aiExplanationCache = {}; // key: `${itemId}_${lang}_${marks}`
  const aiRelatedCache = {};     // key: `${itemId}`
  const aiCardSettings = {};     // key: itemId -> { lang, marks }
  let currentAiVoiceItem = null;
  let isAiVoiceSpeaking = false;
  let isAiVoicePaused = false;

  // 3-Minute Study Timer Runtime State
  let activeTimerState = null;
  let timerIntervalId = null;
  let isSpeakingCompletion = false;

  // DOM Elements
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const globalLangSelect = document.getElementById('globalLangSelect');
  const searchInput = document.getElementById('searchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const categoryChips = document.getElementById('categoryChips');
  const questionsContainer = document.getElementById('questionsContainer');
  const visibleCountEl = document.getElementById('visibleCount');
  const emptyListState = document.getElementById('emptyListState');
  const resetFilterBtn = document.getElementById('resetFilterBtn');
  const toggleExpandAllBtn = document.getElementById('toggleExpandAllBtn');
  const expandAllLabel = document.getElementById('expandAllLabel');
  const shuffleListBtn = document.getElementById('shuffleListBtn');

  // Flashcards DOM
  const activeFlashcard = document.getElementById('activeFlashcard');
  const fcSubject = document.getElementById('fcSubject');
  const fcNumber = document.getElementById('fcNumber');
  const fcNumberBack = document.getElementById('fcNumberBack');
  const fcQuestion = document.getElementById('fcQuestion');
  const fcAnswer = document.getElementById('fcAnswer');
  const fcCurrentIndex = document.getElementById('fcCurrentIndex');
  const fcTotalCount = document.getElementById('fcTotalCount');
  const fcFlipBtn = document.getElementById('fcFlipBtn');
  const fcPrevBtn = document.getElementById('fcPrevBtn');
  const fcNextBtn = document.getElementById('fcNextBtn');
  const fcShuffleBtn = document.getElementById('fcShuffleBtn');
  const fcStarBtn = document.getElementById('fcStarBtn');
  const fcStarLabel = document.getElementById('fcStarLabel');
  const fcMasterBtn = document.getElementById('fcMasterBtn');
  const fcMasterLabel = document.getElementById('fcMasterLabel');

  // Bookmarks & Mastered DOM
  const bookmarksContainer = document.getElementById('bookmarksContainer');
  const emptyBookmarksState = document.getElementById('emptyBookmarksState');
  const starredCountBadge = document.getElementById('starredCountBadge');
  const masteredListContainer = document.getElementById('masteredListContainer');
  const emptyMasteredState = document.getElementById('emptyMasteredState');
  const emptyMasteredTitle = document.getElementById('emptyMasteredTitle');
  const emptyMasteredMsg = document.getElementById('emptyMasteredMsg');
  const resetMasteredBtn = document.getElementById('resetMasteredBtn');
  const browseFromSavedBtn = document.getElementById('browseFromSavedBtn');
  const browseFromMasteredBtn = document.getElementById('browseFromMasteredBtn');
  const btnShowMastered = document.getElementById('btnShowMastered');
  const btnShowUnmastered = document.getElementById('btnShowUnmastered');
  const countMasteredTab = document.getElementById('countMasteredTab');
  const countRemainingTab = document.getElementById('countRemainingTab');
  const masteryTotalVal = document.getElementById('masteryTotalVal');
  const masteryMasteredVal = document.getElementById('masteryMasteredVal');
  const masteryRemainingVal = document.getElementById('masteryRemainingVal');
  const masteryPercentVal = document.getElementById('masteryPercentVal');
  let activeMasterySubtab = 'mastered';

  // Progress & Dock DOM
  const masteredCountText = document.getElementById('masteredCountText');
  const totalQuestionsText = document.getElementById('totalQuestionsText');
  const masteryProgressBar = document.getElementById('masteryProgressBar');
  const quickPracticeBtn = document.getElementById('quickPracticeBtn');
  const dockTabs = document.querySelectorAll('.dock-tab');
  const dockStarredBadge = document.getElementById('dockStarredBadge');
  const dockMasteredBadge = document.getElementById('dockMasteredBadge');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  // Floating Voice Player DOM
  const voicePlayerBar = document.getElementById('voicePlayerBar');
  const playerLabel = document.getElementById('playerLabel');
  const playerSub = document.getElementById('playerSub');
  const playerSpeedBtn = document.getElementById('playerSpeedBtn');
  const playerPauseBtn = document.getElementById('playerPauseBtn');
  const playerStopBtn = document.getElementById('playerStopBtn');

  // Views mapping
  const viewPanels = {
    list: document.getElementById('viewList'),
    flashcards: document.getElementById('viewFlashcards'),
    bookmarks: document.getElementById('viewBookmarks'),
    mastered: document.getElementById('viewMastered')
  };

  // =========================================================================
  // Storage & Theme Helpers
  // =========================================================================
  function loadStorage(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveStorage(key, items) {
    try {
      localStorage.setItem(key, JSON.stringify(Array.from(items)));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_THEME) || 
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_THEME, theme);
    } catch (e) {}
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      showToast(newTheme === 'dark' ? '🌙 Dark Mode enabled' : '☀️ Light Mode enabled');
    });
  }

  // =========================================================================
  // Global Explanation Language Selector
  // =========================================================================
  if (globalLangSelect) {
    globalLangSelect.value = explanationLang;
    globalLangSelect.addEventListener('change', (e) => {
      explanationLang = e.target.value;
      selectedSpeechLanguage = e.target.value === 'auto' ? 'en-in' : e.target.value;
      localStorage.setItem(STORAGE_LANG, explanationLang);

      stopVoice();
      stopAiVoice();
      stopCompletionSpeech();

      document.querySelectorAll('.ai-lang-select').forEach(sel => {
        sel.value = explanationLang;
      });

      const langName = explanationLang === 'bn' ? 'বাংলা Bengali' : (explanationLang === 'en-in' ? '🇮🇳 Indian English' : '🔄 Auto');
      showToast(`🌐 Explanation language set to ${langName}`);
      updateVoiceStatusBar(
        'Voice Language Active',
        explanationLang === 'bn' ? 'Bengali Voice • bn-IN' : 'Indian English • en-IN'
      );
    });
  }

  // =========================================================================
  // Toast Notifications
  // =========================================================================
  let toastTimer = null;
  function showToast(msg) {
    if (!toastNotification || !toastMessage) return;
    toastMessage.textContent = msg;
    toastNotification.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 2800);
  }

  // =========================================================================
  // Natural Voice Selection Engine (Web Speech API)
  // =========================================================================
  function getAvailableVoices() {
    if (!('speechSynthesis' in window)) return [];
    return window.speechSynthesis.getVoices() || [];
  }

  function findIndianEnglishVoice() {
    const voices = getAvailableVoices();
    if (!voices.length) return null;

    const preferredNames = /female|woman|girl|samantha|aria|jenny|victoria|karen|sonia|heera|zira|sangeeta|meera|rani|ananya|nisha|neerja|veena|geeta|julia|liam|emma|mary/i;
    const humanLike = /natural|neural|premium|voice|human|soft|calm|warm|clear/i;

    const scoreVoice = (voice) => {
      const name = (voice.name || '').toLowerCase();
      const lang = (voice.lang || '').toLowerCase().replace('_', '-');
      let score = 0;

      if (lang === 'en-in') score += 100;
      else if (lang.startsWith('en-in')) score += 90;
      else if (lang.startsWith('en')) score += 40;

      if (preferredNames.test(name)) score += 35;
      if (humanLike.test(name)) score += 25;
      if (!/robot|droid|ai|synthetic|mono|echo|wave|narrator|voicebot/i.test(name)) score += 15;
      return score;
    };

    const ranked = [...voices].sort((a, b) => scoreVoice(b) - scoreVoice(a));
    const found = ranked.find(v => scoreVoice(v) > 0 && (v.lang || '').toLowerCase().startsWith('en'));
    return found || ranked[0] || null;
  }

  function findBengaliVoice() {
    const voices = getAvailableVoices();
    if (!voices.length) return null;

    const preferredNames = /female|woman|girl|bengali|bangla|swar|tripti|aditi|ananya|nisha|meera|rani|sangeeta|veena|geeta|heera|moira|neerja|mitali|shreya/i;
    const humanLike = /natural|neural|premium|voice|human|soft|calm|warm|clear/i;

    const scoreVoice = (voice) => {
      const name = (voice.name || '').toLowerCase();
      const lang = (voice.lang || '').toLowerCase().replace('_', '-');
      let score = 0;

      if (lang === 'bn-in') score += 120;
      else if (lang.startsWith('bn')) score += 100;
      else if (/bangla|bengali/i.test(name)) score += 60;

      if (preferredNames.test(name)) score += 35;
      if (humanLike.test(name)) score += 20;
      if (!/robot|droid|ai|synthetic|mono|echo|wave|voicebot/i.test(name)) score += 15;
      return score;
    };

    const ranked = [...voices].sort((a, b) => scoreVoice(b) - scoreVoice(a));
    const found = ranked.find(v => scoreVoice(v) > 0 && ((v.lang || '').toLowerCase().startsWith('bn') || /bangla|bengali/i.test(v.name || '')));
    return found || null;
  }

  function getSelectedSpeechLanguage() {
    const raw = (selectedSpeechLanguage || explanationLang || 'en-in').toLowerCase();
    if (raw === 'bn') return 'bn';
    return 'en-in';
  }

  function updateVoiceStatusBar(labelText, subText) {
    if (!voicePlayerBar) return;
    voicePlayerBar.hidden = false;
    if (playerLabel) playerLabel.textContent = labelText || 'Reading Question #01';
    if (playerSub) playerSub.textContent = subText || 'Indian English • en-IN';
  }

  function speakText(text, language, options = {}) {
    if (!text || !String(text).trim()) return false;
    if (!('speechSynthesis' in window)) {
      showToast('Voice unavailable in this browser');
      return false;
    }

    const selectedLang = (language || 'en-in').toLowerCase();
    const normalizedLang = selectedLang === 'bn' ? 'bn' : 'en-in';

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(String(text).trim());
    if (normalizedLang === 'bn') {
      const bnVoice = findBengaliVoice();
      if (!bnVoice) {
        showToast('Bengali voice is not available on this device. Please install or enable a Bengali (bn-IN) voice in your device/browser settings.');
        return false;
      }
      utterance.voice = bnVoice;
      utterance.lang = 'bn-IN';
      utterance.rate = 0.82;
      utterance.pitch = 1.0;
      updateVoiceStatusBar(options.label || 'Reading Question', options.subText || `Bengali Voice • ${bnVoice.lang || 'bn-IN'}`);
    } else {
      const enVoice = findIndianEnglishVoice();
      if (enVoice) {
        utterance.voice = enVoice;
        utterance.lang = enVoice.lang || 'en-IN';
      } else {
        utterance.lang = 'en-IN';
      }
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      updateVoiceStatusBar(options.label || 'Reading Question', options.subText || `Indian English • ${utterance.lang || 'en-IN'}`);
    }

    utterance.volume = 1.0;
    if (options.onStart) utterance.onstart = options.onStart;
    if (options.onEnd) utterance.onend = options.onEnd;
    if (options.onError) utterance.onerror = options.onError;
    if (options.onPause) utterance.onpause = options.onPause;
    if (options.onResume) utterance.onresume = options.onResume;

    speechSynthesis.speak(utterance);
    return true;
  }

  function refreshAvailableVoices() {
    if (!('speechSynthesis' in window)) return;
    cachedFemaleVoice = findIndianEnglishVoice();
    cachedBengaliVoice = findBengaliVoice();
  }

  if ('speechSynthesis' in window) {
    refreshAvailableVoices();
    window.speechSynthesis.onvoiceschanged = refreshAvailableVoices;
  }

  function cleanSpokenText(text, isAnswer = false) {
    if (!text) return '';
    let cleaned = String(text)
      .replace(/^([0-9]{1,2}|Q[0-9]{1,2})\.\s*/i, '')
      .replace(/[*_#`]/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (isAnswer) {
      cleaned = cleaned.replace(/(\d+)\.\s+/g, (match, num) => `Point ${num}. `);
    }
    return cleaned;
  }

  // =========================================================================
  // 3-Minute Focused Study Timer Engine
  // =========================================================================
  function formatTimerDigits(totalSeconds) {
    const s = Math.max(0, Math.floor(totalSeconds));
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function getStudyHistory() {
    try {
      const raw = localStorage.getItem(STORAGE_STUDY_STATS);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function getQuestionStudyStats(questionId) {
    const history = getStudyHistory();
    return history[questionId] || { sessionsCount: 0, lastStudiedAt: null, totalSeconds: 0 };
  }

  function recordStudyCompletion(questionId, startTime, completedAt) {
    const history = getStudyHistory();
    const qStats = history[questionId] || { sessionsCount: 0, lastStudiedAt: null, totalSeconds: 0, sessions: [] };
    
    qStats.sessionsCount = (qStats.sessionsCount || 0) + 1;
    qStats.lastStudiedAt = completedAt || Date.now();
    qStats.totalSeconds = (qStats.totalSeconds || 0) + STUDY_TIMER_SECONDS;
    if (!Array.isArray(qStats.sessions)) qStats.sessions = [];
    
    qStats.sessions.push({
      question_id: questionId,
      user_id: 'wbuhs_student',
      study_start: startTime,
      study_completed: true,
      study_duration: STUDY_TIMER_SECONDS,
      completed_at: completedAt || Date.now()
    });

    history[questionId] = qStats;
    try {
      localStorage.setItem(STORAGE_STUDY_STATS, JSON.stringify(history));
    } catch (e) {}
    syncStudyProgressToServer();
  }

  function startStudyTimer(questionId) {
    const now = Date.now();

    // If currently running on this exact question and not completed, continue countdown
    if (activeTimerState && activeTimerState.questionId === questionId && !activeTimerState.completed) {
      if (!timerIntervalId) {
        timerIntervalId = setInterval(tickStudyTimer, 500);
      }
      updateActiveTimerDisplay();
      return;
    }

    // Stop any existing interval
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
      timerIntervalId = null;
    }

    const startTime = now;
    const endTime = startTime + (STUDY_TIMER_SECONDS * 1000);

    activeTimerState = {
      questionId: questionId,
      startTime: startTime,
      endTime: endTime,
      duration: STUDY_TIMER_SECONDS,
      remaining: STUDY_TIMER_SECONDS,
      completed: false,
      completionSpoken: false
    };

    try {
      localStorage.setItem(STORAGE_ACTIVE_TIMER, JSON.stringify(activeTimerState));
    } catch (e) {}

    updateActiveTimerDisplay();
    timerIntervalId = setInterval(tickStudyTimer, 500);
  }

  function tickStudyTimer() {
    if (!activeTimerState) return;

    const now = Date.now();
    const remainingMs = activeTimerState.endTime - now;
    const remainingSec = Math.max(0, Math.ceil(remainingMs / 1000));
    activeTimerState.remaining = remainingSec;

    if (remainingSec <= 0) {
      // 00:00 Reached!
      if (!activeTimerState.completed) {
        activeTimerState.completed = true;
        activeTimerState.remaining = 0;

        try {
          localStorage.setItem(STORAGE_ACTIVE_TIMER, JSON.stringify(activeTimerState));
        } catch (e) {}

        recordStudyCompletion(activeTimerState.questionId, activeTimerState.startTime, now);
        updateActiveTimerDisplay();

        // Speak exact Bengali message once
        if (!activeTimerState.completionSpoken) {
          activeTimerState.completionSpoken = true;
          try {
            localStorage.setItem(STORAGE_ACTIVE_TIMER, JSON.stringify(activeTimerState));
          } catch (e) {}
          speakCompletionMessage();
        }

        if (timerIntervalId) {
          clearInterval(timerIntervalId);
          timerIntervalId = null;
        }
      }
    } else {
      updateActiveTimerDisplay();
    }
  }

  function updateActiveTimerDisplay() {
    if (!activeTimerState) return;
    const qId = activeTimerState.questionId;

    const box = document.getElementById(`timerBox_${qId}`);
    const digits = document.getElementById(`timerDigits_${qId}`);
    const statusText = document.getElementById(`timerStatus_${qId}`);
    const progressFill = document.getElementById(`timerProgress_${qId}`);
    const voiceActions = document.getElementById(`timerVoiceActions_${qId}`);
    const nextBtn = document.getElementById(`nextBtn_${qId}`);
    const nextHint = document.getElementById(`nextHint_${qId}`);

    const isCompleted = activeTimerState.completed || activeTimerState.remaining <= 0;
    const formatted = formatTimerDigits(activeTimerState.remaining);
    const progressPercent = ((STUDY_TIMER_SECONDS - activeTimerState.remaining) / STUDY_TIMER_SECONDS) * 100;

    if (box) {
      box.classList.toggle('timer-completed', isCompleted);
      box.classList.toggle('timer-reading', !isCompleted);
    }

    if (digits) {
      digits.textContent = isCompleted ? '00:00' : formatted;
    }

    if (statusText) {
      statusText.textContent = isCompleted ? '✅ Study Time Completed' : `⏱️ ${formatted} remaining`;
    }

    if (progressFill) {
      progressFill.style.width = isCompleted ? '100%' : `${progressPercent}%`;
    }

    if (voiceActions) {
      voiceActions.hidden = !isCompleted;
    }

    if (nextBtn) {
      nextBtn.classList.toggle('unlocked', isCompleted);
      nextBtn.classList.toggle('locked', !isCompleted);
      nextBtn.disabled = !isCompleted;
      const textSpan = nextBtn.querySelector('.next-btn-text');
      if (textSpan) {
        textSpan.textContent = isCompleted ? 'NEXT QUESTION →' : 'NEXT QUESTION 🔒';
      }
    }

    if (nextHint) {
      nextHint.classList.toggle('completed-hint', isCompleted);
      nextHint.textContent = isCompleted 
        ? '✅ 3-Minute study completed. You may proceed to next question.'
        : 'Please complete the 3-minute study time before moving to the next question.';
    }
  }

  function speakCompletionMessage() {
    if (!('speechSynthesis' in window)) return;

    stopVoice();
    stopAiVoice();
    stopWelcomeAudio();

    const voiceText = BENGALI_COMPLETION_SPEECH;
    const started = speakText(voiceText, 'bn', {
      label: 'Study Timer Complete',
      subText: 'Bengali Voice • bn-IN',
      onStart: () => {
        isSpeakingCompletion = true;
        updateCompletionVoiceButtons(true);
      },
      onEnd: () => {
        isSpeakingCompletion = false;
        updateCompletionVoiceButtons(false);
      },
      onError: (e) => {
        console.warn('Completion speech error:', e);
        isSpeakingCompletion = false;
        updateCompletionVoiceButtons(false);
      }
    });

    if (!started) {
      isSpeakingCompletion = false;
      updateCompletionVoiceButtons(false);
    }
  }

  function stopCompletionSpeech() {
    if ('speechSynthesis' in window && isSpeakingCompletion) {
      window.speechSynthesis.cancel();
    }
    isSpeakingCompletion = false;
    updateCompletionVoiceButtons(false);
  }

  function updateCompletionVoiceButtons(isSpeaking) {
    if (!activeTimerState) return;
    const qId = activeTimerState.questionId;
    const actionsWrap = document.getElementById(`timerVoiceActions_${qId}`);
    if (!actionsWrap) return;

    const stopBtn = actionsWrap.querySelector('.stop-btn');
    if (stopBtn) stopBtn.hidden = !isSpeaking;
  }

  function handleNextQuestion(currentId) {
    // 1. Stop speech
    stopVoice();
    stopAiVoice();
    stopCompletionSpeech();

    // 2. Clear current timer
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
      timerIntervalId = null;
    }
    activeTimerState = null;
    localStorage.removeItem(STORAGE_ACTIVE_TIMER);

    // 3. Close current question
    const currentCard = document.getElementById(`card_${currentId}`);
    if (currentCard) {
      currentCard.classList.remove('open');
      const qBtn = currentCard.querySelector('.qbutton');
      if (qBtn) qBtn.setAttribute('aria-expanded', 'false');
    }

    // 4. Find next question
    const filtered = getFilteredQuestions();
    const currentIdx = filtered.findIndex(q => q.id === currentId);
    let nextItem = null;

    if (currentIdx !== -1 && currentIdx < filtered.length - 1) {
      nextItem = filtered[currentIdx + 1];
    } else {
      const nextAllIdx = allQuestions.findIndex(q => q.id === currentId) + 1;
      if (nextAllIdx < allQuestions.length) {
        nextItem = allQuestions[nextAllIdx];
      } else {
        nextItem = allQuestions[0]; // loop back to start
      }
    }

    if (nextItem) {
      const nextCard = document.getElementById(`card_${nextItem.id}`);
      if (nextCard) {
        nextCard.classList.add('open');
        const nextQBtn = nextCard.querySelector('.qbutton');
        if (nextQBtn) nextQBtn.setAttribute('aria-expanded', 'true');
        nextCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Start fresh 3-minute timer on next question
      startStudyTimer(nextItem.id);
      showToast(`⏱️ Started 3-minute study session on Question #${nextItem.displayIndex}`);
    }
  }

  function initActiveTimerFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_ACTIVE_TIMER);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (!data || !data.questionId || !data.endTime) return;

      const now = Date.now();
      const remainingMs = data.endTime - now;
      const remainingSec = Math.ceil(remainingMs / 1000);

      if (remainingSec > 0) {
        activeTimerState = {
          ...data,
          remaining: remainingSec,
          completed: false
        };
        const card = document.getElementById(`card_${data.questionId}`);
        if (card) {
          card.classList.add('open');
          const qBtn = card.querySelector('.qbutton');
          if (qBtn) qBtn.setAttribute('aria-expanded', 'true');
        }
        timerIntervalId = setInterval(tickStudyTimer, 500);
        updateActiveTimerDisplay();
      } else {
        activeTimerState = {
          ...data,
          remaining: 0,
          completed: true
        };
        const card = document.getElementById(`card_${data.questionId}`);
        if (card) {
          card.classList.add('open');
          const qBtn = card.querySelector('.qbutton');
          if (qBtn) qBtn.setAttribute('aria-expanded', 'true');
        }
        updateActiveTimerDisplay();
      }
    } catch (e) {
      console.warn('Could not restore timer:', e);
    }
  }

  // Handle tab switching & returning
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && activeTimerState) {
      tickStudyTimer();
    }
  });

  // =========================================================================
  // Welcome Orientation Audio Engine
  // =========================================================================
  const welcomeAudio = new Audio('welcome-audio.mp4');
  welcomeAudio.preload = 'auto';
  let isWelcomeAudioPlaying = false;

  const welcomeAudioCard = document.getElementById('welcomeAudioCard');
  const welcomeAudioBtn = document.getElementById('welcomeAudioBtn');
  const welcomeAudioBtnIcon = document.getElementById('welcomeAudioBtnIcon');
  const welcomeAudioBtnText = document.getElementById('welcomeAudioBtnText');
  const welcomeAudioStatus = document.getElementById('welcomeAudioStatus');

  function updateWelcomeAudioUI(playing) {
    isWelcomeAudioPlaying = playing;
    if (welcomeAudioCard) {
      welcomeAudioCard.classList.toggle('is-playing', playing);
    }
    if (welcomeAudioBtnIcon) {
      welcomeAudioBtnIcon.textContent = playing ? '🔊' : '🎧';
    }
    if (welcomeAudioBtnText) {
      welcomeAudioBtnText.textContent = playing ? 'Playing' : 'Audio';
    }
    if (welcomeAudioStatus) {
      if (playing) {
        welcomeAudioStatus.textContent = '🔊 Playing orientation audio (29s)...';
      } else if (welcomeAudio.ended) {
        welcomeAudioStatus.textContent = 'Completed (29s)';
      } else {
        welcomeAudioStatus.textContent = 'WBUHS Welcome Audio • 29s';
      }
    }
  }

  function playWelcomeAudio() {
    stopVoice();
    stopAiVoice();
    stopCompletionSpeech();

    const playPromise = welcomeAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        updateWelcomeAudioUI(true);
      }).catch(err => {
        console.warn('Welcome audio playback deferred until gesture:', err);
        updateWelcomeAudioUI(false);
      });
    }
  }

  function pauseWelcomeAudio() {
    welcomeAudio.pause();
    updateWelcomeAudioUI(false);
  }

  function stopWelcomeAudio() {
    if (!welcomeAudio.paused) {
      welcomeAudio.pause();
    }
    welcomeAudio.currentTime = 0;
    updateWelcomeAudioUI(false);
  }

  function toggleWelcomeAudio() {
    if (welcomeAudio.paused) {
      playWelcomeAudio();
    } else {
      pauseWelcomeAudio();
    }
  }

  welcomeAudio.addEventListener('play', () => updateWelcomeAudioUI(true));
  welcomeAudio.addEventListener('pause', () => updateWelcomeAudioUI(false));
  welcomeAudio.addEventListener('ended', () => {
    updateWelcomeAudioUI(false);
    if (welcomeAudioStatus) {
      welcomeAudioStatus.textContent = 'Completed • Tap to replay (29s)';
    }
  });

  if (welcomeAudioBtn) {
    welcomeAudioBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleWelcomeAudio();
    });
  }

  if (welcomeAudioCard) {
    welcomeAudioCard.addEventListener('click', (e) => {
      if (!e.target.closest('#welcomeAudioBtn')) {
        toggleWelcomeAudio();
      }
    });
  }

  function initAutoWelcomeAudio() {
    // Attempt automatic playback when website opens
    const playPromise = welcomeAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        updateWelcomeAudioUI(true);
        showToast('🔊 Playing WBUHS welcome audio');
      }).catch(() => {
        // Modern mobile/desktop browser autoplay restriction:
        // Automatically play on the very first touch or click anywhere on the page
        const triggerOnFirstInteraction = () => {
          if (welcomeAudio.paused && !welcomeAudio.ended) {
            welcomeAudio.play().then(() => {
              updateWelcomeAudioUI(true);
              showToast('🔊 Playing WBUHS welcome audio');
            }).catch(() => {});
          }
          window.removeEventListener('click', triggerOnFirstInteraction, true);
          window.removeEventListener('touchstart', triggerOnFirstInteraction, true);
          window.removeEventListener('keydown', triggerOnFirstInteraction, true);
        };
        window.addEventListener('click', triggerOnFirstInteraction, { once: true, capture: true });
        window.addEventListener('touchstart', triggerOnFirstInteraction, { once: true, capture: true });
        window.addEventListener('keydown', triggerOnFirstInteraction, { once: true, capture: true });
      });
    }
  }

  // =========================================================================
  // Exam Voice Audio System (Questions & Answers)
  // =========================================================================
  function playVoice(item, type) {
    if (!('speechSynthesis' in window)) {
      showToast('Voice unavailable in this browser');
      return;
    }

    if (currentAudioItem === item.id && currentAudioType === type) {
      if (window.speechSynthesis.speaking) {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
          isPaused = false;
          updatePlayerUI();
          return;
        } else {
          window.speechSynthesis.pause();
          isPaused = true;
          updatePlayerUI();
          return;
        }
      }
    }

    stopVoice();
    stopAiVoice();
    stopCompletionSpeech();
    stopWelcomeAudio();

    const rawText = type === 'question' ? item.question : item.answer;
    const spokenText = cleanSpokenText(rawText, type === 'answer');
    if (!spokenText) {
      showToast('No text available to read.');
      return;
    }

    const lang = getSelectedSpeechLanguage();
    const startLabel = type === 'question' ? `Reading Question #${item.displayIndex}` : `Reading Answer #${item.displayIndex}`;
    const started = speakText(spokenText, lang, {
      label: startLabel,
      subText: lang === 'bn' ? 'Bengali Voice • bn-IN' : 'Indian English • en-IN',
      onStart: () => {
        currentAudioItem = item.id;
        currentAudioType = type;
        isPaused = false;
        updateCardVoiceButtons();
        updatePlayerUI();
      },
      onEnd: () => {
        stopVoice();
      },
      onError: (err) => {
        console.warn('TTS playback error:', err);
        stopVoice();
      },
      onPause: () => {
        isPaused = true;
        updatePlayerUI();
      },
      onResume: () => {
        isPaused = false;
        updatePlayerUI();
      }
    });

    if (!started) return;
  }

  function stopVoice() {
    if ('speechSynthesis' in window && currentAudioItem) {
      window.speechSynthesis.cancel();
    }
    currentAudioItem = null;
    currentAudioType = null;
    isPaused = false;
    updateCardVoiceButtons();
    updatePlayerUI();
  }

  function togglePauseVoice() {
    if (!('speechSynthesis' in window) || !window.speechSynthesis.speaking) return;

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      isPaused = false;
    } else {
      window.speechSynthesis.pause();
      isPaused = true;
    }
    updatePlayerUI();
  }

  function cycleSpeed() {
    if (voiceSpeed === 1.0) voiceSpeed = 1.25;
    else if (voiceSpeed === 1.25) voiceSpeed = 0.75;
    else voiceSpeed = 1.0;

    try {
      localStorage.setItem(STORAGE_SPEED, String(voiceSpeed));
    } catch (e) {}

    if (playerSpeedBtn) {
      playerSpeedBtn.textContent = voiceSpeed + 'x';
    }

    if (currentAudioItem && currentAudioType) {
      const item = allQuestions.find(q => q.id === currentAudioItem);
      if (item) playVoice(item, currentAudioType);
    } else {
      showToast(`Playback speed: ${voiceSpeed}x`);
    }
  }

  function updatePlayerUI() {
    if (!voicePlayerBar) return;

    if (!currentAudioItem && !currentAiVoiceItem) {
      voicePlayerBar.hidden = true;
      return;
    }

    voicePlayerBar.hidden = false;

    if (currentAiVoiceItem) {
      const item = allQuestions.find(q => q.id === currentAiVoiceItem);
      const isBn = currentAiVoiceLang === 'bn';
      if (playerLabel) {
        playerLabel.textContent = isBn ? `🤖 AI ব্যাখ্যা #${item ? item.displayIndex : ''}` : `🤖 AI Explanation #${item ? item.displayIndex : ''}`;
      }
      if (playerSub) {
        playerSub.textContent = isAiVoicePaused
          ? '⏸ Paused (Tap play to continue)'
          : (isBn ? '🇧🇩 বাংলা ভয়েস চলছে (ধীর গতি)' : '🇮🇳 Simple Indian English Tutor (Slow)');
      }
    } else {
      const item = allQuestions.find(q => q.id === currentAudioItem);
      const labelType = currentAudioType === 'question' ? 'Question' : 'Answer';
      if (playerLabel) {
        playerLabel.textContent = `${labelType} #${item ? item.displayIndex : ''}`;
      }
      if (playerSub) {
        playerSub.textContent = isPaused ? '⏸ Paused (Tap play to continue)' : '🔊 Natural Female Educational Voice';
      }
    }

    if (playerSpeedBtn) {
      playerSpeedBtn.textContent = voiceSpeed + 'x';
    }

    if (playerPauseBtn) {
      const pauseIcon = playerPauseBtn.querySelector('.icon-pause');
      const playIcon = playerPauseBtn.querySelector('.icon-play');
      const currentlyPaused = currentAiVoiceItem ? isAiVoicePaused : isPaused;
      if (pauseIcon && playIcon) {
        pauseIcon.hidden = currentlyPaused;
        playIcon.hidden = !currentlyPaused;
      }
    }
  }

  function updateCardVoiceButtons() {
    document.querySelectorAll('.voice-btn').forEach(btn => {
      const card = btn.closest('.qcard');
      if (!card) return;
      const cardId = parseInt(card.dataset.id, 10);
      const action = btn.dataset.action;
      const isThisAction = (currentAudioItem === cardId && 
        ((action === 'listen-q' && currentAudioType === 'question') || 
         (action === 'listen-a' && currentAudioType === 'answer')));

      btn.classList.toggle('is-active-voice', isThisAction);
      const textSpan = btn.querySelector('.voice-btn-text');
      if (textSpan) {
        if (isThisAction) {
          textSpan.textContent = isPaused ? 'Paused...' : 'Listening...';
        } else {
          textSpan.textContent = action === 'listen-q' ? '🎧 Listen Question' : '🔊 Listen Answer';
        }
      }
    });
  }

  // Floating Player Listeners
  if (playerPauseBtn) playerPauseBtn.addEventListener('click', () => {
    if (currentAiVoiceItem) {
      if (isAiVoicePaused) resumeAiVoice();
      else pauseAiVoice();
    } else {
      togglePauseVoice();
    }
  });

  if (playerStopBtn) playerStopBtn.addEventListener('click', () => {
    stopVoice();
    stopAiVoice();
    stopCompletionSpeech();
  });

  if (playerSpeedBtn) playerSpeedBtn.addEventListener('click', cycleSpeed);

  // =========================================================================
  // AI Nursing Tutor Voice Engine
  // =========================================================================
  function playAiExplanation(itemId) {
    if (!('speechSynthesis' in window)) {
      showToast('Speech synthesis not supported in this browser.');
      return;
    }

    const item = allQuestions.find(q => q.id === itemId);
    if (!item) return;

    const settings = getCardSettings(itemId);
    const effectiveLang = resolveEffectiveLanguage(settings.lang);
    const marks = settings.marks || 2;
    const cacheKey = `${itemId}_${effectiveLang}_${marks}`;
    const cached = aiExplanationCache[cacheKey];

    const contentEl = document.getElementById(`aiContent_${itemId}`);
    const explanationText = cached ? cached.explanation : (contentEl ? contentEl.textContent : '');

    if (!explanationText || !explanationText.trim()) {
      showToast('Please generate the explanation first by tapping "Explain Answer".');
      return;
    }

    stopVoice();
    stopCompletionSpeech();
    stopWelcomeAudio();

    if (currentAiVoiceItem === itemId && window.speechSynthesis.speaking) {
      if (window.speechSynthesis.paused) {
        resumeAiVoice();
        return;
      } else {
        pauseAiVoice();
        return;
      }
    }

    stopAiVoice();

    const cleanText = cleanSpokenText(explanationText);
    const utterance = new SpeechSynthesisUtterance(cleanText);

    const rateMultiplier = AI_SPEECH_RATES[aiVoiceSpeed] || 0.84;
    utterance.volume = 1.0;
    utterance.rate = rateMultiplier;
    utterance.pitch = 1.02;

    if (effectiveLang === 'bn') {
      utterance.lang = 'bn-IN';
      const bnVoice = cachedBengaliVoice || findBengaliVoice();
      if (bnVoice) utterance.voice = bnVoice;
    } else {
      utterance.lang = 'en-IN';
      const enVoice = cachedFemaleVoice || findIndianEnglishVoice();
      if (enVoice) utterance.voice = enVoice;
    }

    utterance.onstart = () => {
      currentAiVoiceItem = itemId;
      currentAiVoiceLang = effectiveLang;
      isAiVoiceSpeaking = true;
      isAiVoicePaused = false;
      updateAiVoiceButtons(itemId);
      updatePlayerUI();
    };

    utterance.onend = () => {
      stopAiVoice();
    };

    utterance.onerror = (e) => {
      console.warn('AI Voice synthesis error:', e);
      stopAiVoice();
    };

    window.speechSynthesis.speak(utterance);
  }

  function pauseAiVoice() {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      isAiVoicePaused = true;
      updateAiVoiceButtons(currentAiVoiceItem);
      updatePlayerUI();
    }
  }

  function resumeAiVoice() {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.resume();
      isAiVoicePaused = false;
      updateAiVoiceButtons(currentAiVoiceItem);
      updatePlayerUI();
    }
  }

  function stopAiVoice() {
    if ('speechSynthesis' in window && currentAiVoiceItem) {
      window.speechSynthesis.cancel();
    }
    const prevItem = currentAiVoiceItem;
    currentAiVoiceItem = null;
    isAiVoiceSpeaking = false;
    isAiVoicePaused = false;
    if (prevItem) updateAiVoiceButtons(prevItem);
    updatePlayerUI();
  }

  function updateAiVoiceButtons(itemId) {
    if (!itemId) return;
    const controls = document.getElementById(`aiVoiceControls_${itemId}`);
    if (!controls) return;

    const playBtn = controls.querySelector('[data-action="ai-play"]');
    const pauseBtn = controls.querySelector('[data-action="ai-pause"]');
    const resumeBtn = controls.querySelector('[data-action="ai-resume"]');
    const stopBtn = controls.querySelector('[data-action="ai-stop"]');
    const replayBtn = controls.querySelector('[data-action="ai-replay"]');

    const isThisPlaying = currentAiVoiceItem === itemId && isAiVoiceSpeaking;

    if (playBtn) {
      playBtn.hidden = isThisPlaying;
      playBtn.classList.toggle('is-active-ai-voice', isThisPlaying);
    }
    if (replayBtn) replayBtn.hidden = !isThisPlaying && !aiExplanationCache[`${itemId}_${getCardSettings(itemId).lang}_${getCardSettings(itemId).marks}`];
    if (pauseBtn) pauseBtn.hidden = !isThisPlaying || isAiVoicePaused;
    if (resumeBtn) resumeBtn.hidden = !isThisPlaying || !isAiVoicePaused;
    if (stopBtn) stopBtn.hidden = !isThisPlaying;
  }

  // =========================================================================
  // AI Tutor Client API & High-Yield Fallback Engine
  // =========================================================================
  function getCardSettings(itemId) {
    if (!aiCardSettings[itemId]) {
      aiCardSettings[itemId] = {
        lang: explanationLang,
        marks: 2
      };
    }
    return aiCardSettings[itemId];
  }

  function resolveEffectiveLanguage(langCode) {
    if (langCode === 'auto') {
      return explanationLang === 'auto' ? 'en-in' : explanationLang;
    }
    return langCode || 'en-in';
  }

  async function fetchAiExplanation(item, lang, marks) {
    const effectiveLang = resolveEffectiveLanguage(lang);
    const cacheKey = `${item.id}_${effectiveLang}_${marks}`;

    if (aiExplanationCache[cacheKey]) {
      return aiExplanationCache[cacheKey];
    }

    try {
      const res = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: item.id,
          question: item.question,
          answer: item.answer,
          subject: item.subject,
          topic: item.topic,
          language: effectiveLang,
          marks: marks
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.ok && data.explanation) {
          aiExplanationCache[cacheKey] = data;
          return data;
        }
      }
    } catch (e) {
      console.warn('Network API fetch failed, falling back to local client tutor:', e);
    }

    const fallback = generateClientFallbackExplanation(item, effectiveLang, marks);
    aiExplanationCache[cacheKey] = fallback;
    return fallback;
  }

  function generateClientFallbackExplanation(item, lang, marks) {
    const isBn = lang === 'bn';
    const qLower = (item.question + ' ' + (item.topic || '')).toLowerCase();
    let text = '';

    if (qLower.includes('pph') || qLower.includes('postpartum')) {
      text = isBn
        ? "Postpartum haemorrhage বা PPH হলো delivery-র পর অতিরিক্ত রক্তপাত (৫০০ মিলির বেশি)। এর প্রধান কারণ Atonic Uterus (জরায়ু শক্ত না হওয়া)। নার্স হিসেবে তাৎক্ষণিক fundal massage দেওয়া এবং Oxytocin ইনজেকশন নিশ্চিত করা জীবন রক্ষাকারী।"
        : "Postpartum haemorrhage means heavy bleeding after delivery (more than 500 ml). The most common cause is atonic uterus, where the uterus stays soft. The nurse must massage the fundus immediately and call for doctor's support.";
    } else if (qLower.includes('antenatal') || qLower.includes('anc')) {
      text = isBn
        ? "Antenatal care (ANC) মানে গর্ভাবস্থায় মায়ের নিয়মিত স্বাস্থ্য পরীক্ষা। এর মূল লক্ষ্য হলো মা ও গর্ভের শিশুর নিরাপত্তা নিশ্চিত করা, ব্লাড প্রেশার ও বাচ্চার বৃদ্ধি নিয়মিত দেখা এবং কোনো জটিলতা থাকলে আগে থেকেই ধরা।"
        : "Antenatal care means regular check-ups during pregnancy. The goal is to keep both mother and baby safe by checking maternal blood pressure, baby's growth, and catching any danger signs early.";
    } else if (qLower.includes('labour') || qLower.includes('labor')) {
      text = isBn
        ? "True labour-এর প্রধান লক্ষণ হলো নিয়মিত ও ক্রমশ বাড়তে থাকা প্রসব বেদনা এবং Cervix-এর মুখ খোলা (dilatation)। বিশ্রাম নিলেও এই ব্যথা বন্ধ হয় না।"
        : "True labour means regular uterine contractions that become stronger over time. The most important sign is progressive opening of the cervix (dilatation). Rest will not stop true labour contractions.";
    } else if (qLower.includes('kmc') || qLower.includes('kangaroo')) {
      text = isBn
        ? "Kangaroo Mother Care (KMC) কম ওজনের শিশুদের জন্য জরুরি পদ্ধতি। এতে শিশুকে সরাসরি মায়ের বুকের ত্বকের সাথে লাগানো থাকে এবং ঘন ঘন বুকের দুধ খাওয়ানো হয়। এটি শিশুকে উষ্ণ রাখে ও দ্রুত ওজন বাড়ায়।"
        : "Kangaroo Mother Care (KMC) is for low birth weight babies. The baby is placed skin-to-skin directly on the mother's chest and breastfed frequently. This keeps the baby warm and helps rapid weight gain.";
    } else {
      const cleanAns = cleanSpokenText(item.answer);
      text = isBn
        ? `সহজ ব্যাখ্যা: এই প্রশ্নের মূল বিষয়বস্তু হলো—${cleanAns.slice(0, 180)}। পরীক্ষায় ২ নম্বরের জন্য মূল সংজ্ঞা এবং প্রয়োজনীয় পয়েন্ট স্পষ্টভাবে লিখলে পুরো নম্বর পাওয়া যাবে।`
        : `In simple Indian English: ${cleanAns.slice(0, 200)}. This is an essential nursing exam topic. Remember the definition and write the main points in numbered order.`;
    }

    return {
      ok: true,
      explanation: text,
      language: isBn ? 'bn' : 'en-in',
      marks: marks,
      source: 'client-tutor'
    };
  }

  async function fetchRelatedQuestions(item) {
    if (aiRelatedCache[item.id]) {
      return aiRelatedCache[item.id];
    }

    try {
      const res = await fetch('/api/ai/related', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: item.id,
          question: item.question,
          topic: item.topic,
          subject: item.subject
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.ok && Array.isArray(data.related)) {
          aiRelatedCache[item.id] = data.related;
          return data.related;
        }
      }
    } catch (e) {
      console.warn('Failed to fetch related questions from server:', e);
    }

    const sameTopic = allQuestions.filter(q => q.id !== item.id && q.topic && q.topic === item.topic);
    const keywordMatches = allQuestions.filter(q => {
      if (q.id === item.id || sameTopic.some(st => st.id === q.id)) return false;
      const combined = `${q.question} ${q.answer}`.toLowerCase();
      return (item.keywords || []).some(kw => kw.length > 3 && combined.includes(kw.toLowerCase()));
    });

    const related = [...sameTopic, ...keywordMatches].slice(0, 3).map(q => ({
      id: q.id,
      question: q.question,
      marks: 2,
      isStored: true,
      storedId: q.id,
      answer: q.answer
    }));

    if (related.length === 0) {
      related.push({
        id: `p_${item.id}_1`,
        question: `Mention two nursing responsibilities for ${item.topic || 'this clinical condition'}.`,
        marks: 2,
        isStored: false,
        answer: "1. Monitor maternal and fetal vital signs regularly.\n2. Promptly report warning signs and maintain strict aseptic technique."
      });
    }

    aiRelatedCache[item.id] = related;
    return related;
  }

  // =========================================================================
  // Filtering & Category Chips
  // =========================================================================
  const categoryList = [
    'All',
    'Midwifery & Obstetrical Nursing',
    'Newborn Care',
    'Lactation & Breastfeeding',
    'Community Health Nursing II',
    'Nursing Research & Statistics'
  ];

  function renderCategoryChips() {
    if (!categoryChips) return;
    categoryChips.innerHTML = categoryList.map(cat => {
      const count = cat === 'All' 
        ? allQuestions.length 
        : allQuestions.filter(q => (q.subject || q.cat) === cat).length;
      const isActive = cat === activeCategory;
      return `
        <button type="button" class="chip ${isActive ? 'active' : ''}" data-cat="${escapeHtml(cat)}" role="tab" aria-selected="${isActive}">
          <span>${escapeHtml(cat)}</span>
          <span class="chip-count">${count}</span>
        </button>
      `;
    }).join('');

    categoryChips.querySelectorAll('.chip').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.cat;
        renderCategoryChips();
        renderList();
      });
    });
  }

  function getFilteredQuestions() {
    const q = searchTerm.trim().toLowerCase();
    return allQuestions.filter(item => {
      const subj = (item.subject || item.cat || '');
      const matchCategory = activeCategory === 'All' || subj === activeCategory;
      
      if (!matchCategory) return false;
      if (!q) return true;

      const questionMatch = (item.question || item.q || '').toLowerCase().includes(q);
      const answerMatch = (item.answer || item.a || '').toLowerCase().includes(q);
      const subjectMatch = subj.toLowerCase().includes(q);
      const topicMatch = (item.topic || '').toLowerCase().includes(q);
      const keywordMatch = Array.isArray(item.keywords) && item.keywords.some(k => k.toLowerCase().includes(q));

      return questionMatch || answerMatch || subjectMatch || topicMatch || keywordMatch;
    });
  }

  // Search input listeners
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value;
      if (searchClearBtn) searchClearBtn.hidden = !searchTerm;
      renderList();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      searchTerm = '';
      searchClearBtn.hidden = true;
      renderList();
    });
  }

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchTerm = '';
      if (searchClearBtn) searchClearBtn.hidden = true;
      activeCategory = 'All';
      renderCategoryChips();
      renderList();
    });
  }

  // =========================================================================
  // Question Card Component & Rendering
  // =========================================================================
  function renderQuestionCard(item) {
    const isStarred = starredIds.has(item.id);
    const isMastered = masteredIds.has(item.id);
    const isCardOpen = isAllExpanded || (activeTimerState && activeTimerState.questionId === item.id);

    const highlightedQuestion = highlightMatches(item.question, searchTerm);
    const highlightedAnswer = highlightMatches(item.answer, searchTerm);

    const settings = getCardSettings(item.id);
    const cardLang = settings.lang || explanationLang;
    const cardMarks = settings.marks || 2;

    const effectiveLang = resolveEffectiveLanguage(cardLang);
    const cacheKey = `${item.id}_${effectiveLang}_${cardMarks}`;
    const cachedExplanation = aiExplanationCache[cacheKey];

    // Priority badge
    let priorityBadgeHtml = '';
    if (item.priority === 'high-yield') {
      priorityBadgeHtml = `<span class="badge-priority high-yield">🔴 HIGH-YIELD</span>`;
    } else if (item.priority === 'important') {
      priorityBadgeHtml = `<span class="badge-priority important">⭐ IMPORTANT</span>`;
    }

    // Study timer data for this card
    const studyStats = getQuestionStudyStats(item.id);
    const isThisActiveTimer = activeTimerState && activeTimerState.questionId === item.id;
    const isCompletedTimer = isThisActiveTimer && (activeTimerState.completed || activeTimerState.remaining <= 0);
    const remainingSec = isThisActiveTimer ? activeTimerState.remaining : STUDY_TIMER_SECONDS;
    const formattedDigits = isCompletedTimer ? '00:00' : formatTimerDigits(remainingSec);
    const progressPercent = isCompletedTimer ? 100 : (isThisActiveTimer ? ((STUDY_TIMER_SECONDS - remainingSec) / STUDY_TIMER_SECONDS) * 100 : 0);

    return `
      <article class="qcard ${isCardOpen ? 'open' : ''} ${isMastered ? 'mastered' : ''}" id="card_${item.id}" data-id="${item.id}">
        <button type="button" class="qbutton" aria-expanded="${isCardOpen}" aria-controls="answer_${item.id}">
          <div class="qheader-top">
            <span class="num-badge">${item.displayIndex}</span>
            ${priorityBadgeHtml}
            <span class="qmeta-tag ${item.tagClass}">${escapeHtml(item.subject)}</span>
          </div>
          <div class="qtext-row">
            <div class="qtext">${highlightedQuestion}</div>
            <span class="chev-icon">˅</span>
          </div>
        </button>

        <div class="answer-panel" id="answer_${item.id}">
          
          <!-- ================= 3-MINUTE FOCUSED STUDY TIMER ================= -->
          <div class="study-timer-box ${isCompletedTimer ? 'timer-completed' : (isThisActiveTimer ? 'timer-reading' : '')}" id="timerBox_${item.id}">
            <div class="timer-header">
              <div class="timer-badge">
                <span class="timer-icon">${isCompletedTimer ? '✅' : '⏱️'}</span>
                <span class="timer-status-text" id="timerStatus_${item.id}">
                  ${isCompletedTimer ? '✅ Study Time Completed' : (isThisActiveTimer ? `⏱️ ${formattedDigits} remaining` : '⏱️ Start 3-Minute Study')}
                </span>
              </div>
              <div class="timer-session-info" id="timerSession_${item.id}">
                ${studyStats.sessionsCount ? `Sessions: ${studyStats.sessionsCount} • Last: ${studyStats.lastStudiedAt ? (new Date(studyStats.lastStudiedAt).toDateString() === new Date().toDateString() ? 'Today' : new Date(studyStats.lastStudiedAt).toLocaleDateString()) : 'Today'}${isMastered ? ' • Mastered: ✓' : ''}` : 'Not studied yet'}
              </div>
            </div>

            <div class="timer-display-row">
              <div class="timer-digits" id="timerDigits_${item.id}">${formattedDigits}</div>
              <div class="timer-actions-wrap" id="timerVoiceActions_${item.id}" ${isCompletedTimer ? '' : 'hidden'}>
                <button type="button" class="timer-action-btn replay-btn" data-action="timer-replay" data-id="${item.id}" title="Replay Bengali Message">
                  <span>🔊 Replay Message</span>
                </button>
                <button type="button" class="timer-action-btn stop-btn" data-action="timer-stop" data-id="${item.id}" title="Stop Speech" hidden>
                  <span>⏹ Stop</span>
                </button>
              </div>
            </div>

            <div class="timer-progress-track">
              <div class="timer-progress-fill" id="timerProgress_${item.id}" style="width: ${progressPercent}%;"></div>
            </div>
          </div>

          <div class="answer-header">
            <span class="answer-label-text">📌 EXAM ANSWER</span>
          </div>
          <div class="answer-body">${highlightedAnswer}</div>

          <!-- Stored Exam Answer Voice Row -->
          <div class="card-voice-row">
            <button type="button" class="voice-btn" data-action="listen-q" aria-label="Listen to Question">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              <span class="voice-btn-text">🎧 Listen Question</span>
            </button>
            <button type="button" class="voice-btn" data-action="listen-a" aria-label="Listen to Exam Answer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              <span class="voice-btn-text">🔊 Listen Answer</span>
            </button>
          </div>

          <!-- ================= BILINGUAL AI NURSING TUTOR ================= -->
          <div class="ai-tutor-container" id="aiTutor_${item.id}">
            <div class="ai-tutor-header">
              <div class="ai-tutor-title">
                <span class="ai-sparkle">🤖</span>
                <span>AI Nursing Tutor</span>
              </div>
              <div class="ai-lang-select-wrap">
                <select class="ai-lang-select" data-id="${item.id}" aria-label="Explanation Language">
                  <option value="en-in" ${cardLang === 'en-in' ? 'selected' : ''}>🇮🇳 Indian English</option>
                  <option value="bn" ${cardLang === 'bn' ? 'selected' : ''}>বাংলা Bengali</option>
                  <option value="auto" ${cardLang === 'auto' ? 'selected' : ''}>🔄 Auto</option>
                </select>
              </div>
            </div>

            <div class="ai-marks-row">
              <span class="ai-marks-label">Exam Marks:</span>
              <div class="ai-marks-pills" data-id="${item.id}">
                <button type="button" class="ai-marks-pill ${cardMarks === 2 ? 'active' : ''}" data-marks="2">2 Marks</button>
                <button type="button" class="ai-marks-pill ${cardMarks === 3 ? 'active' : ''}" data-marks="3">3 Marks</button>
                <button type="button" class="ai-marks-pill ${cardMarks === 5 ? 'active' : ''}" data-marks="5">5 Marks</button>
              </div>
            </div>

            <button type="button" class="ai-explain-trigger-btn" data-action="explain-ai" data-id="${item.id}">
              <span class="ai-btn-icon">🤖</span>
              <span class="ai-btn-text">${cachedExplanation ? 'Refresh AI Explanation' : 'Explain Answer'}</span>
            </button>

            <!-- AI Explanation Result Box -->
            <div class="ai-explanation-box" id="aiBox_${item.id}" ${cachedExplanation ? '' : 'hidden'}>
              <div class="ai-box-badge">
                <span>🤖 AI EXPLANATION</span>
                <span class="ai-box-lang-badge" id="aiLangBadge_${item.id}">
                  ${effectiveLang === 'bn' ? 'বাংলা Easy Bengali' : '🇮🇳 Simple Indian English'} (${cardMarks} Marks)
                </span>
              </div>
              <div class="ai-explanation-content" id="aiContent_${item.id}">
                ${cachedExplanation ? escapeHtml(cachedExplanation.explanation) : ''}
              </div>

              <!-- Voice Controls under AI explanation -->
              <div class="ai-voice-controls" id="aiVoiceControls_${item.id}">
                <button type="button" class="ai-vbtn ai-vbtn-play" data-action="ai-play" data-id="${item.id}">
                  <span>🔊 Listen Explanation</span>
                </button>
                <button type="button" class="ai-vbtn ai-vbtn-pause" data-action="ai-pause" data-id="${item.id}" hidden>
                  <span>⏸ Pause</span>
                </button>
                <button type="button" class="ai-vbtn ai-vbtn-resume" data-action="ai-resume" data-id="${item.id}" hidden>
                  <span>▶ Resume</span>
                </button>
                <button type="button" class="ai-vbtn ai-vbtn-stop" data-action="ai-stop" data-id="${item.id}" hidden>
                  <span>⏹ Stop</span>
                </button>
                <button type="button" class="ai-vbtn ai-vbtn-replay" data-action="ai-replay" data-id="${item.id}" ${cachedExplanation ? '' : 'hidden'}>
                  <span>🔄 Listen Again</span>
                </button>
              </div>

              <!-- Speed selection row for learner (Slow by default) -->
              <div class="ai-speed-row">
                <span class="ai-speed-label">Speed:</span>
                <div class="ai-speed-pills" data-id="${item.id}">
                  <button type="button" class="ai-speed-pill ${aiVoiceSpeed === 'slow' ? 'active' : ''}" data-speed="slow">🐢 Slow</button>
                  <button type="button" class="ai-speed-pill ${aiVoiceSpeed === 'normal' ? 'active' : ''}" data-speed="normal">🙂 Normal</button>
                  <button type="button" class="ai-speed-pill ${aiVoiceSpeed === 'fast' ? 'active' : ''}" data-speed="fast">⚡ Fast</button>
                </div>
              </div>
            </div>

            <!-- Related Practice Questions Section -->
            <div class="ai-related-section">
              <button type="button" class="ai-related-trigger-btn" data-action="suggest-related" data-id="${item.id}">
                <span>💡 Suggest Related Questions</span>
              </button>
              <div class="ai-related-container" id="aiRelatedContainer_${item.id}" hidden>
                <div class="ai-related-title">💡 Related Practice Questions</div>
                <div class="ai-related-list" id="aiRelatedList_${item.id}"></div>
              </div>
            </div>
          </div>

          <!-- Card Actions (Star and Mastered) -->
          <div class="card-actions-bar">
            <button type="button" class="star-action-btn ${isStarred ? 'is-starred' : ''}" data-action="star" aria-label="Star question">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span>${isStarred ? '★ Starred' : '☆ Star'}</span>
            </button>

            <button type="button" class="master-action-btn ${isMastered ? 'is-mastered' : ''}" data-action="master" aria-label="Mark mastered">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>${isMastered ? '✓ Mastered' : '✓ Mastered'}</span>
            </button>
          </div>

          <!-- ================= NEXT QUESTION NAVIGATION FOOTER ================= -->
          <div class="card-next-footer" id="nextFooter_${item.id}">
            <button type="button" class="next-question-btn ${isCompletedTimer ? 'unlocked' : 'locked'}" id="nextBtn_${item.id}" data-action="next-question" data-id="${item.id}" ${isCompletedTimer ? '' : 'disabled'}>
              <span class="next-btn-text">${isCompletedTimer ? 'NEXT QUESTION →' : 'NEXT QUESTION 🔒'}</span>
            </button>
            <div class="next-btn-hint ${isCompletedTimer ? 'completed-hint' : ''}" id="nextHint_${item.id}">
              ${isCompletedTimer ? '✅ 3-Minute study completed. You may proceed to next question.' : 'Please complete the 3-minute study time before moving to the next question.'}
            </div>
          </div>

        </div>
      </article>
    `;
  }

  // =========================================================================
  // Card Event Binding (AI Tutor, Voice, Accordions, Timer)
  // =========================================================================
  function bindCardEvents(container) {
    if (!container) return;

    // Accordion toggle with 3-minute study lock protection
    container.querySelectorAll('.qbutton').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.qcard');
        const cardId = parseInt(card.dataset.id, 10);
        const isOpen = card.classList.contains('open');

        if (!isOpen) {
          // Attempting to OPEN card:
          // Check if another question has an uncompleted active timer
          if (activeTimerState && activeTimerState.questionId !== cardId && !activeTimerState.completed && activeTimerState.remaining > 0) {
            showToast('Please complete the 3-minute study time before moving to the next question.');
            const activeCardEl = document.getElementById(`card_${activeTimerState.questionId}`);
            if (activeCardEl) {
              activeCardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
          }

          card.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
          startStudyTimer(cardId);
        } else {
          // Close card
          card.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Action buttons inside cards
    container.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        const card = btn.closest('.qcard');
        const itemId = parseInt(card.dataset.id, 10);
        const item = allQuestions.find(q => q.id === itemId);
        if (!item) return;

        if (action === 'star') {
          toggleStar(item);
        } else if (action === 'master') {
          toggleMaster(item);
        } else if (action === 'listen-q') {
          stopAiVoice();
          stopCompletionSpeech();
          playVoice(item, 'question');
        } else if (action === 'listen-a') {
          stopAiVoice();
          stopCompletionSpeech();
          playVoice(item, 'answer');
        } else if (action === 'explain-ai') {
          await handleExplainAction(item, btn);
        } else if (action === 'ai-play') {
          stopCompletionSpeech();
          playAiExplanation(item.id);
        } else if (action === 'ai-pause') {
          pauseAiVoice();
        } else if (action === 'ai-resume') {
          resumeAiVoice();
        } else if (action === 'ai-stop') {
          stopAiVoice();
        } else if (action === 'ai-replay') {
          stopCompletionSpeech();
          playAiExplanation(item.id);
        } else if (action === 'suggest-related') {
          await handleSuggestRelated(item, btn);
        } else if (action === 'timer-replay') {
          speakCompletionMessage();
        } else if (action === 'timer-stop') {
          stopCompletionSpeech();
        } else if (action === 'next-question') {
          if (activeTimerState && activeTimerState.questionId === itemId && !activeTimerState.completed && activeTimerState.remaining > 0) {
            showToast('Please complete the 3-minute study time before moving to the next question.');
            return;
          }
          handleNextQuestion(itemId);
        }
      });
    });

    // Card Language select dropdown change
    container.querySelectorAll('.ai-lang-select').forEach(sel => {
      sel.addEventListener('change', async (e) => {
        const itemId = parseInt(sel.dataset.id, 10);
        const item = allQuestions.find(q => q.id === itemId);
        if (!item) return;

        const newLang = e.target.value;
        const settings = getCardSettings(itemId);
        settings.lang = newLang;

        stopVoice();
        stopAiVoice();
        stopCompletionSpeech();

        const box = document.getElementById(`aiBox_${itemId}`);
        if (box && !box.hidden) {
          const card = sel.closest('.qcard');
          const triggerBtn = card.querySelector('[data-action="explain-ai"]');
          await handleExplainAction(item, triggerBtn);
        }
      });
    });

    // Marks pills (2, 3, 5 marks)
    container.querySelectorAll('.ai-marks-pill').forEach(pill => {
      pill.addEventListener('click', async (e) => {
        const marksRow = pill.closest('.ai-marks-pills');
        const itemId = parseInt(marksRow.dataset.id, 10);
        const item = allQuestions.find(q => q.id === itemId);
        if (!item) return;

        const marks = parseInt(pill.dataset.marks, 10);
        marksRow.querySelectorAll('.ai-marks-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const settings = getCardSettings(itemId);
        settings.marks = marks;

        stopVoice();
        stopAiVoice();
        stopCompletionSpeech();

        const box = document.getElementById(`aiBox_${itemId}`);
        if (box && !box.hidden) {
          const card = pill.closest('.qcard');
          const triggerBtn = card.querySelector('[data-action="explain-ai"]');
          await handleExplainAction(item, triggerBtn);
        }
      });
    });

    // Speed pills
    container.querySelectorAll('.ai-speed-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        const speed = pill.dataset.speed;
        aiVoiceSpeed = speed;
        localStorage.setItem(STORAGE_AI_SPEED, speed);

        document.querySelectorAll('.ai-speed-pill').forEach(p => {
          p.classList.toggle('active', p.dataset.speed === speed);
        });

        showToast(`AI voice speed set to ${speed === 'slow' ? '🐢 Slow (0.84x)' : (speed === 'normal' ? '🙂 Normal' : '⚡ Fast')}`);

        if (currentAiVoiceItem) {
          playAiExplanation(currentAiVoiceItem);
        }
      });
    });
  }

  // =========================================================================
  // Handlers: Explain Action & Related Questions
  // =========================================================================
  async function handleExplainAction(item, triggerBtn) {
    const itemId = item.id;
    const settings = getCardSettings(itemId);
    const effectiveLang = resolveEffectiveLanguage(settings.lang);
    const marks = settings.marks || 2;

    if (triggerBtn) {
      triggerBtn.disabled = true;
      triggerBtn.querySelector('.ai-btn-text').textContent = '🤖 Generating explanation...';
    }

    try {
      const data = await fetchAiExplanation(item, effectiveLang, marks);
      const box = document.getElementById(`aiBox_${itemId}`);
      const contentEl = document.getElementById(`aiContent_${itemId}`);
      const badgeEl = document.getElementById(`aiLangBadge_${itemId}`);

      if (contentEl) contentEl.textContent = data.explanation;
      if (badgeEl) {
        badgeEl.textContent = `${effectiveLang === 'bn' ? 'বাংলা Easy Bengali' : '🇮🇳 Simple Indian English'} (${marks} Marks)`;
      }
      if (box) box.hidden = false;

      updateAiVoiceButtons(itemId);
      showToast('🤖 AI Explanation ready! Tap "Listen Explanation" to hear.');
    } catch (err) {
      console.error('Explanation error:', err);
      showToast('⚠️ Could not load explanation. Using local synthesis.');
    } finally {
      if (triggerBtn) {
        triggerBtn.disabled = false;
        triggerBtn.querySelector('.ai-btn-text').textContent = 'Refresh AI Explanation';
      }
    }
  }

  async function handleSuggestRelated(item, triggerBtn) {
    const itemId = item.id;
    const container = document.getElementById(`aiRelatedContainer_${itemId}`);
    const listEl = document.getElementById(`aiRelatedList_${itemId}`);
    if (!container || !listEl) return;

    if (triggerBtn) {
      triggerBtn.disabled = true;
      triggerBtn.textContent = '⏳ Finding related questions...';
    }

    try {
      const related = await fetchRelatedQuestions(item);
      listEl.innerHTML = related.map((rel, idx) => `
        <div class="ai-related-card" data-rel-id="${rel.id}">
          <div class="ai-related-q-row">
            <div class="ai-related-q">${idx + 1}. ${escapeHtml(rel.question)}</div>
            <span class="${rel.isStored ? 'ai-badge-stored' : 'ai-badge-practice'}">
              ${rel.isStored ? '📌 STORED EXAM ANSWER' : '🤖 AI-GENERATED PRACTICE ANSWER'}
            </span>
          </div>
          <div class="ai-related-actions">
            <button type="button" class="ai-rel-btn" data-rel-action="listen-q" data-q="${escapeHtml(rel.question)}">
              <span>🎧 Listen</span>
            </button>
            <button type="button" class="ai-rel-btn" data-rel-action="toggle-ans">
              <span>Show Answer</span>
            </button>
          </div>
          <div class="ai-related-answer-box" hidden>
            <div class="ai-rel-ans-text">${escapeHtml(rel.answer)}</div>
            <div style="margin-top: 6px;">
              <button type="button" class="ai-rel-btn" data-rel-action="listen-a" data-a="${escapeHtml(rel.answer)}">
                <span>🔊 Listen Answer</span>
              </button>
            </div>
          </div>
        </div>
      `).join('');

      listEl.querySelectorAll('.ai-related-card').forEach(card => {
        const ansBox = card.querySelector('.ai-related-answer-box');
        const toggleBtn = card.querySelector('[data-rel-action="toggle-ans"]');
        const listenQBtn = card.querySelector('[data-rel-action="listen-q"]');
        const listenABtn = card.querySelector('[data-rel-action="listen-a"]');

        if (toggleBtn && ansBox) {
          toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = ansBox.hidden;
            ansBox.hidden = !isHidden;
            toggleBtn.textContent = isHidden ? 'Hide Answer' : 'Show Answer';
          });
        }

        if (listenQBtn) {
          listenQBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            stopVoice();
            stopAiVoice();
            stopCompletionSpeech();
            const text = listenQBtn.dataset.q;
            const speechLang = getSelectedSpeechLanguage();
            speakText(cleanSpokenText(text), speechLang, {
              label: 'Related Question',
              subText: speechLang === 'bn' ? 'Bengali Voice • bn-IN' : 'Indian English • en-IN'
            });
          });
        }

        if (listenABtn) {
          listenABtn.addEventListener('click', (e) => {
            e.stopPropagation();
            stopVoice();
            stopAiVoice();
            stopCompletionSpeech();
            const text = listenABtn.dataset.a;
            const speechLang = getSelectedSpeechLanguage();
            speakText(cleanSpokenText(text, true), speechLang, {
              label: 'Related Answer',
              subText: speechLang === 'bn' ? 'Bengali Voice • bn-IN' : 'Indian English • en-IN'
            });
          });
        }
      });

      container.hidden = false;
    } catch (err) {
      console.error('Related questions error:', err);
    } finally {
      if (triggerBtn) {
        triggerBtn.disabled = false;
        triggerBtn.textContent = '💡 Suggest Related Questions';
      }
    }
  }

  // =========================================================================
  // Actions: Star & Master
  // =========================================================================
  function toggleStar(item) {
    if (starredIds.has(item.id)) {
      starredIds.delete(item.id);
      showToast('Removed from starred');
    } else {
      starredIds.add(item.id);
      showToast('⭐ Saved to Starred revision!');
    }
    saveStorage(STORAGE_STARRED, starredIds);
    updateProgressUI();
    renderAll();
  }

  function toggleMaster(item) {
    if (masteredIds.has(item.id)) {
      masteredIds.delete(item.id);
      showToast('Marked as unlearned');
    } else {
      masteredIds.add(item.id);
      showToast('🎉 Question marked as Mastered!');
    }
    saveStorage(STORAGE_MASTERED, masteredIds);
    updateProgressUI();
    renderAll();
  }

  // =========================================================================
  // Rendering Views
  // =========================================================================
  function renderList() {
    if (!questionsContainer || !visibleCountEl) return;
    const items = getFilteredQuestions();
    visibleCountEl.textContent = items.length;
    if (emptyListState) emptyListState.hidden = items.length !== 0;

    questionsContainer.innerHTML = items.map(item => renderQuestionCard(item)).join('');
    bindCardEvents(questionsContainer);
    updateCardVoiceButtons();
    updateActiveTimerDisplay();
  }

  function renderBookmarks() {
    if (!bookmarksContainer) return;
    const starredItems = allQuestions.filter(q => starredIds.has(q.id));
    if (starredCountBadge) starredCountBadge.textContent = `${starredItems.length} Saved`;
    if (emptyBookmarksState) emptyBookmarksState.hidden = starredItems.length !== 0;

    bookmarksContainer.innerHTML = starredItems.map(item => renderQuestionCard(item)).join('');
    bindCardEvents(bookmarksContainer);
    updateCardVoiceButtons();
    updateActiveTimerDisplay();
  }

  function renderMastered() {
    if (!masteredListContainer) return;

    if (btnShowMastered) btnShowMastered.classList.toggle('active', activeMasterySubtab === 'mastered');
    if (btnShowUnmastered) btnShowUnmastered.classList.toggle('active', activeMasterySubtab === 'unmastered');

    const isShowingMastered = activeMasterySubtab === 'mastered';
    const items = allQuestions.filter(q => isShowingMastered ? masteredIds.has(q.id) : !masteredIds.has(q.id));

    if (emptyMasteredState) {
      emptyMasteredState.hidden = items.length !== 0;
      if (emptyMasteredTitle) {
        emptyMasteredTitle.textContent = isShowingMastered 
          ? 'No questions marked mastered yet' 
          : '🎉 All questions mastered!';
      }
      if (emptyMasteredMsg) {
        emptyMasteredMsg.textContent = isShowingMastered 
          ? 'Mark questions as mastered as you prepare to watch your exam readiness meter fill up!' 
          : 'Outstanding! You have marked every single question in the 7th Semester practice bank as mastered.';
      }
    }

    masteredListContainer.innerHTML = items.map(item => renderQuestionCard(item)).join('');
    bindCardEvents(masteredListContainer);
    updateCardVoiceButtons();
    updateActiveTimerDisplay();
  }

  if (btnShowMastered) {
    btnShowMastered.addEventListener('click', () => {
      activeMasterySubtab = 'mastered';
      renderMastered();
    });
  }

  if (btnShowUnmastered) {
    btnShowUnmastered.addEventListener('click', () => {
      activeMasterySubtab = 'unmastered';
      renderMastered();
    });
  }

  function renderAll() {
    renderList();
    renderBookmarks();
    renderMastered();
    updateFlashcardUI();
  }

  // =========================================================================
  // Expand All / Collapse All & Shuffle
  // =========================================================================
  if (toggleExpandAllBtn) {
    toggleExpandAllBtn.addEventListener('click', () => {
      isAllExpanded = !isAllExpanded;
      if (expandAllLabel) expandAllLabel.textContent = isAllExpanded ? 'Collapse All' : 'Expand All';
      
      const visibleCards = questionsContainer ? questionsContainer.querySelectorAll('.qcard') : [];
      visibleCards.forEach(card => {
        card.classList.toggle('open', isAllExpanded);
        const btn = card.querySelector('.qbutton');
        if (btn) btn.setAttribute('aria-expanded', String(isAllExpanded));
      });
    });
  }

  if (shuffleListBtn) {
    shuffleListBtn.addEventListener('click', () => {
      for (let i = allQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
      }
      renderList();
      showToast('🔀 Questions shuffled!');
    });
  }

  // =========================================================================
  // Flashcard Revision Mode
  // =========================================================================
  function updateFlashcardUI() {
    const total = allQuestions.length;
    if (total === 0 || !activeFlashcard) return;

    if (flashcardIndex >= total) flashcardIndex = 0;
    if (flashcardIndex < 0) flashcardIndex = total - 1;

    const item = allQuestions[flashcardIndex];
    const isStarred = starredIds.has(item.id);
    const isMastered = masteredIds.has(item.id);

    if (fcSubject) fcSubject.textContent = item.subject;
    if (fcNumber) fcNumber.textContent = `#${item.displayIndex}`;
    if (fcNumberBack) fcNumberBack.textContent = `#${item.displayIndex}`;
    if (fcQuestion) fcQuestion.textContent = item.question;
    if (fcAnswer) fcAnswer.textContent = item.answer;

    if (fcCurrentIndex) fcCurrentIndex.textContent = flashcardIndex + 1;
    if (fcTotalCount) fcTotalCount.textContent = total;

    if (fcStarBtn) {
      fcStarBtn.classList.toggle('is-starred', isStarred);
      if (fcStarLabel) fcStarLabel.textContent = isStarred ? '★ Starred' : '☆ Star';
    }

    if (fcMasterBtn) {
      fcMasterBtn.classList.toggle('is-mastered', isMastered);
      if (fcMasterLabel) fcMasterLabel.textContent = isMastered ? '✓ Mastered' : '✓ Mastered';
    }

    isCardFlipped = false;
    activeFlashcard.classList.remove('flipped');
  }

  function flipFlashcard() {
    if (!activeFlashcard) return;
    isCardFlipped = !isCardFlipped;
    activeFlashcard.classList.toggle('flipped', isCardFlipped);
  }

  if (activeFlashcard) {
    activeFlashcard.addEventListener('click', (e) => {
      if (e.target.closest('.card-action-pill')) return;
      flipFlashcard();
    });

    let touchStartX = 0;
    let touchEndX = 0;
    activeFlashcard.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    activeFlashcard.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 45) {
        if (diff < 0) flashcardIndex++;
        else flashcardIndex--;
        updateFlashcardUI();
      }
    }, { passive: true });
  }

  if (fcFlipBtn) fcFlipBtn.addEventListener('click', flipFlashcard);

  if (fcPrevBtn) {
    fcPrevBtn.addEventListener('click', () => {
      flashcardIndex--;
      updateFlashcardUI();
    });
  }

  if (fcNextBtn) {
    fcNextBtn.addEventListener('click', () => {
      flashcardIndex++;
      updateFlashcardUI();
    });
  }

  if (fcShuffleBtn) {
    fcShuffleBtn.addEventListener('click', () => {
      flashcardIndex = Math.floor(Math.random() * allQuestions.length);
      updateFlashcardUI();
      showToast('🎲 Random flashcard loaded');
    });
  }

  if (fcStarBtn) {
    fcStarBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const item = allQuestions[flashcardIndex];
      toggleStar(item);
    });
  }

  if (fcMasterBtn) {
    fcMasterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const item = allQuestions[flashcardIndex];
      toggleMaster(item);
    });
  }

  // Keyboard accessibility
  window.addEventListener('keydown', (e) => {
    if (activeTab !== 'flashcards') return;
    if (e.code === 'Space') {
      e.preventDefault();
      flipFlashcard();
    } else if (e.code === 'ArrowRight') {
      flashcardIndex++;
      updateFlashcardUI();
    } else if (e.code === 'ArrowLeft') {
      flashcardIndex--;
      updateFlashcardUI();
    }
  });

  // =========================================================================
  // Tab Navigation Dock
  // =========================================================================
  window.switchTab = function(tabName) {
    activeTab = tabName;

    Object.keys(viewPanels).forEach(key => {
      const panel = viewPanels[key];
      if (panel) {
        const isActive = key === tabName;
        panel.classList.toggle('active-view', isActive);
        if (isActive) {
          panel.removeAttribute('hidden');
        } else {
          panel.setAttribute('hidden', '');
        }
      }
    });

    dockTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabName);
    });

    const activeSection = viewPanels[tabName];
    if (activeSection) {
      activeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (tabName === 'flashcards') {
      updateFlashcardUI();
    } else if (tabName === 'bookmarks') {
      renderBookmarks();
    } else if (tabName === 'mastered') {
      renderMastered();
    } else {
      renderList();
    }
  };

  dockTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      window.switchTab(btn.dataset.tab);
    });
  });

  // Quick Practice Button in Top Header
  if (quickPracticeBtn) {
    quickPracticeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const unmasteredIdx = allQuestions.findIndex(q => !masteredIds.has(q.id));
      if (unmasteredIdx !== -1) {
        flashcardIndex = unmasteredIdx;
      } else {
        flashcardIndex = Math.floor(Math.random() * allQuestions.length);
      }

      window.switchTab('flashcards');
      showToast(`🎯 Practice Mode: Question #${flashcardIndex + 1} (Tap card to flip)`);
    });
  }

  if (browseFromSavedBtn) {
    browseFromSavedBtn.addEventListener('click', () => window.switchTab('list'));
  }

  if (browseFromMasteredBtn) {
    browseFromMasteredBtn.addEventListener('click', () => window.switchTab('list'));
  }

  // Reset mastered questions checklist
  if (resetMasteredBtn) {
    resetMasteredBtn.addEventListener('click', () => {
      if (confirm('Reset your mastered progress checklist?')) {
        masteredIds.clear();
        saveStorage(STORAGE_MASTERED, masteredIds);
        updateProgressUI();
        renderAll();
        showToast('Progress reset');
      }
    });
  }

  // =========================================================================
  // Progress Bar & Counts UI
  // =========================================================================
  function updateProgressUI() {
    const total = allQuestions.length;
    const mastered = masteredIds.size;
    const remaining = total - mastered;
    const starred = starredIds.size;
    const percent = Math.round((mastered / total) * 100);

    if (masteredCountText) masteredCountText.textContent = mastered;
    if (totalQuestionsText) totalQuestionsText.textContent = total;
    if (masteryTotalVal) masteryTotalVal.textContent = total;
    if (masteryMasteredVal) masteryMasteredVal.textContent = mastered;
    if (masteryRemainingVal) masteryRemainingVal.textContent = remaining;
    if (masteryPercentVal) masteryPercentVal.textContent = percent + '%';
    if (countMasteredTab) countMasteredTab.textContent = mastered;
    if (countRemainingTab) countRemainingTab.textContent = remaining;

    if (masteryProgressBar) {
      masteryProgressBar.style.width = percent + '%';
      if (masteryProgressBar.parentElement) {
        masteryProgressBar.parentElement.setAttribute('aria-valuenow', String(percent));
      }
    }

    if (dockStarredBadge) {
      dockStarredBadge.textContent = starred;
      dockStarredBadge.hidden = starred === 0;
    }

    if (dockMasteredBadge) {
      dockMasteredBadge.textContent = mastered;
      dockMasteredBadge.hidden = mastered === 0;
    }
  }

  // =========================================================================
  // Utilities: HTML Escaping & Text Highlighting
  // =========================================================================
  function escapeHtml(val) {
    return String(val).replace(/[&<>"']/g, ch => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[ch]));
  }

  function escapeRegex(val) {
    return val.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function highlightMatches(text, query) {
    if (!query || !query.trim()) {
      return escapeHtml(text);
    }
    const safeText = escapeHtml(text);
    const words = query.trim().split(/\s+/).filter(w => w.length > 0).map(escapeRegex);
    if (!words.length) return safeText;

    const regex = new RegExp(`(${words.join('|')})`, 'gi');
    return safeText.replace(regex, '<mark class="highlight">$1</mark>');
  }

  // =========================================================================
  // Study Verification & Reading Progress Tracking
  // =========================================================================
  const openCheckInBtn = document.getElementById('openCheckInBtn');
  const checkInModal = document.getElementById('checkInModal');
  const closeCheckInBtn = document.getElementById('closeCheckInBtn');
  const vStartCameraBtn = document.getElementById('vStartCameraBtn');
  const vCaptureBtn = document.getElementById('vCaptureBtn');
  const vCameraVideo = document.getElementById('vCameraVideo');
  const vCameraCanvas = document.getElementById('vCameraCanvas');
  const vCameraPlaceholder = document.getElementById('vCameraPlaceholder');
  const vLocationText = document.getElementById('vLocationText');
  const vSubmitStatus = document.getElementById('vSubmitStatus');

  let mediaStream = null;
  let currentGeoCoords = null;
  let autoCaptureTimer = null;

  // Compute summary of questions read/studied by Sayantani Hauri
  function getStudiedQuestionsSummary() {
    const history = getStudyHistory();
    const readList = [];
    const readIdSet = new Set();

    // 1. Questions with completed 3-minute study timer
    QUESTIONS.forEach(q => {
      const stat = history[q.id];
      if (stat && (stat.sessionsCount > 0 || stat.totalSeconds > 0 || stat.lastStudiedAt)) {
        readIdSet.add(q.id);
        readList.push({
          id: q.id,
          question: q.question,
          subject: q.subject,
          topic: q.topic || '',
          sessionsCount: stat.sessionsCount || 1,
          totalSeconds: stat.totalSeconds || 180,
          completedAt: stat.lastStudiedAt || Date.now()
        });
      }
    });

    // 2. Questions marked as mastered
    masteredIds.forEach(id => {
      const qId = Number(id);
      if (!readIdSet.has(qId)) {
        const q = QUESTIONS.find(item => item.id === qId);
        if (q) {
          readIdSet.add(qId);
          readList.push({
            id: q.id,
            question: q.question,
            subject: q.subject,
            topic: q.topic || '',
            sessionsCount: 1,
            totalSeconds: 180,
            completedAt: Date.now()
          });
        }
      }
    });

    return {
      count: readList.length,
      totalQuestions: QUESTIONS.length || 80,
      questions: readList
    };
  }

  // Background sync questions read to Admin server
  function syncStudyProgressToServer() {
    try {
      const summary = getStudiedQuestionsSummary();
      fetch('/api/study/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: 'Sayantani Hauri',
          questionsReadCount: summary.count,
          questionsReadList: summary.questions
        })
      }).catch(() => {});
    } catch (e) {}
  }

  function stopCameraStream() {
    if (autoCaptureTimer) {
      clearTimeout(autoCaptureTimer);
      autoCaptureTimer = null;
    }
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      mediaStream = null;
    }
    if (vCameraVideo) vCameraVideo.srcObject = null;
    if (vCameraPlaceholder) vCameraPlaceholder.hidden = false;
    if (vStartCameraBtn) vStartCameraBtn.textContent = 'Start Camera';
  }

  function closeCheckInModal() {
    stopCameraStream();
    if (checkInModal) {
      checkInModal.hidden = true;
      checkInModal.classList.add('is-hidden');
      checkInModal.style.setProperty('display', 'none', 'important');
    }
    if (vSubmitStatus) vSubmitStatus.hidden = true;
  }

  function openCheckInModal() {
    if (checkInModal) {
      checkInModal.hidden = false;
      checkInModal.classList.remove('is-hidden');
      checkInModal.style.setProperty('display', 'flex', 'important');
    }

    // Never trigger permission-gated browser APIs automatically.
    // Use network fallback quietly and let the user tap Start Camera only when needed.
    fetchCurrentLocation();
    if (vCameraPlaceholder) {
      vCameraPlaceholder.hidden = false;
      vCameraPlaceholder.innerHTML = '<span>📷 Camera is ready when you tap “Start Camera”</span>';
    }
    if (vSubmitStatus) {
      vSubmitStatus.hidden = true;
    }
  }

  function updateLocationUI() {
    if (!vLocationText) return;
    if (currentGeoCoords && currentGeoCoords.lat !== null) {
      const label = currentGeoCoords.label
        ? `${currentGeoCoords.label} • ${currentGeoCoords.lat.toFixed(4)}° N, ${currentGeoCoords.lng.toFixed(4)}° E`
        : `${currentGeoCoords.lat.toFixed(4)}° N, ${currentGeoCoords.lng.toFixed(4)}° E (±${Math.round(currentGeoCoords.accuracy || 0)}m)`;
      vLocationText.textContent = label;
    } else {
      vLocationText.textContent = 'Location unavailable';
    }
  }

  async function fetchNetworkLocationFallback() {
    try {
      const res = await fetch('https://ipapi.co/json/');
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data.latitude === 'number' && typeof data.longitude === 'number') {
          const locParts = [data.city, data.region].filter(Boolean);
          currentGeoCoords = {
            lat: data.latitude,
            lng: data.longitude,
            accuracy: 2500,
            label: locParts.join(', ') || 'Network Location'
          };
          updateLocationUI();
          return;
        }
      }
    } catch (e) {
      console.warn('Network location lookup error:', e);
    }

    // Default West Bengal location fallback for WBUHS
    currentGeoCoords = {
      lat: 22.5726,
      lng: 88.3639,
      accuracy: 5000,
      label: 'Kolkata, West Bengal'
    };
    updateLocationUI();
  }

  function fetchCurrentLocation() {
    if (vLocationText) vLocationText.textContent = 'Detecting location...';

    // Avoid forcing browser permission prompts on load.
    // Use a network-based fallback immediately when geolocation is not available or denied.
    if (!('geolocation' in navigator)) {
      fetchNetworkLocationFallback();
      return;
    }

    try {
      const permissions = navigator.permissions && navigator.permissions.query;
      if (permissions) {
        permissions.call(navigator.permissions, { name: 'geolocation' })
          .then((status) => {
            if (status.state === 'denied') {
              fetchNetworkLocationFallback();
              return;
            }
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                currentGeoCoords = {
                  lat: pos.coords.latitude,
                  lng: pos.coords.longitude,
                  accuracy: pos.coords.accuracy,
                  label: 'GPS Location'
                };
                updateLocationUI();
              },
              () => fetchNetworkLocationFallback(),
              { enableHighAccuracy: true, timeout: 5000, maximumAge: 60000 }
            );
          })
          .catch(() => fetchNetworkLocationFallback());
        return;
      }
    } catch (e) {
      console.warn('Permission detection unavailable, using fallback location:', e);
    }

    fetchNetworkLocationFallback();
  }

  async function startCamera(autoCapture = true) {
    try {
      if (mediaStream) {
        stopCameraStream();
        return;
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        if (vCameraPlaceholder) {
          vCameraPlaceholder.hidden = false;
          vCameraPlaceholder.innerHTML = '<span>📷 Camera is not available on this browser.</span>';
        }
        if (vStartCameraBtn) vStartCameraBtn.textContent = 'Start Camera';
        return;
      }

      if (autoCapture) {
        // Do not request camera automatically without an explicit user action.
        if (vCameraPlaceholder) {
          vCameraPlaceholder.hidden = false;
          vCameraPlaceholder.innerHTML = '<span>📷 Tap “Start Camera” to enable the verification snapshot.</span>';
        }
        if (vStartCameraBtn) vStartCameraBtn.textContent = 'Start Camera';
        return;
      }

      if (vStartCameraBtn) vStartCameraBtn.textContent = 'Starting...';

      const constraints = {
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false
      };

      mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      if (vCameraVideo) {
        vCameraVideo.srcObject = mediaStream;
        await vCameraVideo.play();
      }
      if (vCameraPlaceholder) vCameraPlaceholder.hidden = true;
      if (vCaptureBtn) vCaptureBtn.disabled = false;
      if (vStartCameraBtn) vStartCameraBtn.textContent = 'Stop Camera';
    } catch (err) {
      console.warn('Camera error:', err);
      if (vCameraPlaceholder) {
        vCameraPlaceholder.hidden = false;
        vCameraPlaceholder.innerHTML = '<span>📷 Camera was not enabled. You can keep studying without this step.</span>';
      }
      if (vStartCameraBtn) vStartCameraBtn.textContent = 'Start Camera';
    }
  }

  async function captureAndVerify() {
    if (autoCaptureTimer) {
      clearTimeout(autoCaptureTimer);
      autoCaptureTimer = null;
    }

    // If camera not yet active, start it first
    if (!vCameraVideo || !mediaStream) {
      try {
        await startCamera(false);
        await new Promise(resolve => setTimeout(resolve, 600));
      } catch (err) {
        showToast('Please enable camera to verify');
        return;
      }
    }

    if (!vCameraVideo || !mediaStream) {
      showToast('Camera not available');
      return;
    }

    try {
      if (vCaptureBtn) vCaptureBtn.disabled = true;

      // Draw frame to canvas
      const width = vCameraVideo.videoWidth || 640;
      const height = vCameraVideo.videoHeight || 480;
      vCameraCanvas.width = width;
      vCameraCanvas.height = height;
      const ctx = vCameraCanvas.getContext('2d');
      ctx.drawImage(vCameraVideo, 0, 0, width, height);

      const imageBase64 = vCameraCanvas.toDataURL('image/jpeg', 0.75);

      // =======================================================
      // IMMEDIATELY CLOSE MODAL & STOP CAMERA UPON CAPTURE
      // =======================================================
      closeCheckInModal();
      showToast('📸 Verified! Attendance & study progress sent to Admin.');

      const studySummary = getStudiedQuestionsSummary();
      const payload = {
        studentName: 'Sayantani Hauri',
        imageBase64: imageBase64,
        latitude: currentGeoCoords ? currentGeoCoords.lat : null,
        longitude: currentGeoCoords ? currentGeoCoords.lng : null,
        accuracy: currentGeoCoords ? currentGeoCoords.accuracy : null,
        locationName: currentGeoCoords ? currentGeoCoords.label : null,
        questionsReadCount: studySummary.count,
        questionsReadList: studySummary.questions,
        timestamp: new Date().toISOString()
      };

      // Save to localStorage for static GitHub Pages support
      try {
        const localLogs = JSON.parse(localStorage.getItem('wbuhs_verification_logs') || '[]');
        localLogs.unshift(payload);
        if (localLogs.length > 50) localLogs.pop();
        localStorage.setItem('wbuhs_verification_logs', JSON.stringify(localLogs));
      } catch (e) {}

      // Send to server in background
      fetch('/api/verification/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(data => {
        if (data && data.ok) {
          showToast(`✅ Study session logged to Admin (${studySummary.count}/80 questions read)`);
        }
      })
      .catch(err => {
        console.warn('Background check-in report error:', err);
      });

    } catch (err) {
      console.error('Submit error:', err);
      showToast('Capture error: ' + err.message);
      closeCheckInModal();
    } finally {
      if (vCaptureBtn) vCaptureBtn.disabled = false;
    }
  }

  // Check-In Listeners
  if (openCheckInBtn) {
    openCheckInBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openCheckInModal();
    });
  }

  if (closeCheckInBtn) {
    closeCheckInBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeCheckInModal();
    });
  }

  if (vStartCameraBtn) {
    vStartCameraBtn.addEventListener('click', () => startCamera(false));
  }

  if (vCaptureBtn) {
    vCaptureBtn.addEventListener('click', captureAndVerify);
  }

  // Close check-in modal on backdrop click
  if (checkInModal) {
    checkInModal.addEventListener('click', (e) => {
      if (e.target === checkInModal) {
        closeCheckInModal();
      }
    });
  }

  // =========================================================================
  // Initialize Application
  // =========================================================================
  initTheme();
  renderCategoryChips();
  updateProgressUI();
  renderAll();
  initActiveTimerFromStorage();
  initAutoWelcomeAudio();
  syncStudyProgressToServer();

})();
