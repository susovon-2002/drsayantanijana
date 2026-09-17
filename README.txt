# WBUHS 7th Semester – 2-Mark High-Yield Mobile Study App

A tactile, beautiful, and offline-ready mobile web application for B.Sc. Nursing 7th Semester exam revision.

## Features
- **Mobile-First & Native App Feel**: Designed specifically for smartphone screens with safe-area support and mobile touch targets. Centered smartphone mockup frame on desktop screens.
- **Dark & Light Mode**: Seamless toggle with saved preference for day and night study.
- **Bilingual AI Nursing Tutor**:
  - 🌐 Explanation Language: 🇮🇳 Simple Indian English, বাংলা Natural Bengali, or 🔄 Auto.
  - Slower learning pacing (0.84x default 🐢 Slow, 🙂 Normal, ⚡ Fast).
  - Exam marks-based explanation (2 Marks, 3 Marks, 5 Marks).
  - 🔊 Listen Explanation with Play, Pause, Resume, Stop, Listen Again.
  - 💡 Suggest Related Questions with Stored Exam Answer vs AI Practice Answer distinction.
- **Natural Voice (Web Speech API)**:
  - Natural Indian English female voice for clear medical pronunciation.
  - Native Bengali speech support (`bn-IN`).
  - Dual listen controls: Exam Answer voice & AI Explanation voice kept clearly separated.
- **80 High-Yield 2-Mark Questions & Model Answers**:
  - Midwifery & Obstetrical Nursing
  - Newborn Care
  - Lactation & Breastfeeding
  - Community Health Nursing II
  - Nursing Research & Statistics
- **Smart Search & Keyword Highlighting**: Real-time search with instant term highlighting.
- **Interactive Flashcard Mode**: Flip card active recall study mode with flip animations, swipe navigation, and random shuffle.
- **Starred / Bookmarks**: Star tricky questions and revise them anytime from the dedicated Starred tab.
- **Exam Readiness Tracker**: Mark questions as "Mastered" with an animated progress bar and checklist.
- **Expand / Collapse All & Shuffle**: Toggle all answers or randomize question order.
- **100% Secure & Resilient**: API keys remain server-side; high-yield offline tutor engine available with zero downtime.

## How to Run
- Run the full application with AI Tutor:
  ```bash
  npm start
  # or: node server.js
  ```
  Then open `http://localhost:3000` (or `http://<your-ip>:3000` on your mobile phone on the same Wi-Fi!).

- Optional Live LLM Key:
  Add `GEMINI_API_KEY=your_key` or `OPENAI_API_KEY=your_key` to a `.env` file for live external AI generation. If omitted, the high-yield built-in tutor engine runs automatically.

## Important Disclaimer
This study application is designed for B.Sc. Nursing examination preparation for WBUHS students. Always consult official university syllabus guidelines and standard nursing textbooks.
