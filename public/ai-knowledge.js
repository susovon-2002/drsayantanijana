/**
 * WBUHS B.Sc. Nursing 7th Semester - Bilingual AI Nursing Tutor Knowledge Base
 * 
 * Provides:
 * 1. Simple Indian English explanations (short sentences, simple vocabulary, clear teacher voice)
 * 2. Natural Bengali explanations (conversational, keeping English medical terms with Bengali context)
 * 3. Mark-based dynamic generation (2 marks, 3 marks, 5 marks)
 * 4. Topic-linked related questions
 */

// Keyword & Topic rule-based teacher knowledge
const TUTOR_TOPIC_KNOWLEDGE = {
  // --- ANC & Labour ---
  'anc': {
    en: "Antenatal care means regular health check-ups for a mother during her pregnancy. A simple way to remember its purpose is keeping both mother and baby safe. The nurse checks the mother's blood pressure, weight, and blood tests. The nurse also checks the baby's growth and heart rate so that any danger signs can be caught early.",
    bn: "Antenatal care (ANC) মানে হলো pregnancy-র সময় মায়ের নিয়মিত স্বাস্থ্য পরীক্ষা। এর মূল উদ্দেশ্য হলো মা এবং গর্ভের শিশু দুজনেরই সুরক্ষা নিশ্চিত করা। নার্স মায়ের blood pressure, ওজন এবং blood test চেক করেন। এর সাথে বাচ্চার heart rate এবং বৃদ্ধি ঠিক আছে কি না দেখে কোনো জটিলতা থাকলে আগে থেকেই ব্যবস্থা নেন।",
    keywords: ['antenatal', 'anc', 'pregnancy', 'maternal health']
  },
  'true_labour': {
    en: "True labour is the actual starting of childbirth. In true labour, uterine contractions come at regular intervals and become stronger and longer over time. Most importantly, the cervix starts thinning (effacement) and opening up (dilatation). Walking or resting will not stop true labour pain.",
    bn: "True labour হলো সন্তান প্রসবের আসল প্রক্রিয়া শুরু হওয়া। এতে জরায়ুর সংকোচন বা uterine contractions নির্দিষ্ট সময় পর পর আসে এবং ধীরে ধীরে ব্যথা বাড়ে। সবচেয়ে বড় লক্ষণ হলো cervix ধীরে ধীরে পাতলা হয় (effacement) এবং মুখ খোলে (dilatation)। হাঁটাচলা বা বিশ্রাম নিলেও এই ব্যথা কমে না।",
    keywords: ['true labour', 'false labour', 'labour signs', 'contractions', 'effacement']
  },
  'first_stage': {
    en: "The first stage of labour begins with regular contractions and ends when the cervix is fully 10 cm dilated. As a nurse, the two most important immediate duties are: first, continuously monitor maternal vital signs and fetal heart rate (FHR); second, give emotional support, encourage slow breathing, and keep the mother comfortable and hydrated.",
    bn: "Labour-এর first stage শুরু হয় আসল প্রসব বেদনা থেকে এবং শেষ হয় cervix সম্পূর্ণ ১০ সেমি (10 cm) খোলার মাধ্যমে। নার্স হিসেবে প্রধান দুটি দায়িত্ব হলো: প্রথমত, মায়ের vital signs এবং বাচ্চার heart rate (FHR) নিয়মিত পর্যবেক্ষণ করা; দ্বিতীয়ত, মাকে মানসিকভাবে সাহস দেওয়া, শ্বাস-প্রশ্বাসের ব্যায়ামে সাহায্য করা এবং শরীর আর্দ্র রাখা।",
    keywords: ['first stage', 'cervical dilatation', 'fhr']
  },

  // --- PPH & Emergencies ---
  'pph': {
    en: "Postpartum haemorrhage (PPH) means excessive and dangerous bleeding after baby delivery. In normal delivery, blood loss is over 500 ml, or in caesarean it is over 1000 ml. The most common cause is atonic uterus, meaning the uterus fails to contract after birth. Remember the 4 Ts: Tone, Tissue, Trauma, and Thrombin.",
    bn: "Postpartum haemorrhage বা PPH হলো বাচ্চার জন্মের পর অতিরিক্ত রক্তপাত। Normal delivery-তে ৫০০ মিলি (500 ml)-এর বেশি বা Caesarean-এ ১০০০ মিলি (1000 ml)-এর বেশি রক্তপাত হলে তাকে PPH বলে। এর প্রধান কারণ Atonic Uterus, অর্থাৎ delivery-র পর জরায়ু শক্ত হয়ে সংকুচিত না হওয়া। ৪টি 'T' মনে রাখবেন: Tone, Tissue, Trauma এবং Thrombin।",
    keywords: ['pph', 'postpartum haemorrhage', 'bleeding', 'atonic', 'uterine atony']
  },
  'pph_action': {
    en: "When PPH happens, the nurse must act immediately: 1. Call for medical help and do NOT leave the patient alone. 2. Firmly massage the fundus to stimulate uterine contraction. 3. Start oxygen, put wide-bore IV lines for rapid fluid replacement, and administer prescribed oxytocic drugs like Oxytocin.",
    bn: "PPH হলে নার্সকে সঙ্গে সঙ্গে পদক্ষেপ নিতে হবে: ১. অবিলম্বে ডাক্তার ও টিমকে ডাকুন, রোগীকে একা রাখবেন না। ২. জরায়ু শক্ত করার জন্য fundal massage দিন। ৩. রোগীকে অক্সিজেন দিন, দুটি মোটা IV লাইন দিয়ে ফ্লুইড চালান এবং চিকিৎসকের নির্দেশ অনুযায়ী Oxytocin ইনজেকশন দিন।",
    keywords: ['immediate nursing actions in pph', 'nursing measures for pph', 'pph nursing']
  },

  // --- Pre-eclampsia & Eclampsia ---
  'preeclampsia': {
    en: "Pre-eclampsia is a serious pregnancy disorder that develops after 20 weeks of gestation. It is identified by the classic triad: high blood pressure (hypertension), protein in urine (proteinuria), and generalized swelling (oedema). If not controlled, it can lead to seizures, which is called eclampsia.",
    bn: "Pre-eclampsia হলো গর্ভাবস্থার ২০ সপ্তাহের পর দেখা দেওয়া একটি জটিল সমস্যা। এর তিনটি প্রধান লক্ষণ (Triad): উচ্চ রক্তচাপ (High BP), প্রস্রাবে প্রোটিন যাওয়া (Proteinuria), এবং হাত-পা বা মুখে ফোলাভাব (Oedema)। সময়মতো চিকিৎসা না হলে রোগীর খিঁচুনি হতে পারে, যাকে Eclampsia বলে।",
    keywords: ['pre-eclampsia', 'preeclampsia', 'eclampsia', 'proteinuria', 'hypertension in pregnancy', 'magnesium sulphate']
  },

  // --- GDM ---
  'gdm': {
    en: "Gestational Diabetes Mellitus (GDM) is high blood sugar first discovered during pregnancy. Hormones produced by the placenta block the mother's insulin. For the mother, it increases risk of high BP and future Type 2 diabetes. For the unborn baby, it can cause macrosomia (extra-large baby) and neonatal hypoglycaemia (low sugar after birth).",
    bn: "Gestational Diabetes Mellitus (GDM) হলো এমন এক ধরনের ডায়াবেটিস যা প্রথম গর্ভাবস্থায় ধরা পড়ে। Placenta থেকে নির্গত হরমোনের কারণে মায়ের ইনসুলিন ঠিকমতো কাজ করতে পারে না। এর ফলে বাচ্চার ওজন অতিরিক্ত বেড়ে যেতে পারে (Macrosomia) এবং জন্মের পর বাচ্চার রক্তে সুগার কমে যেতে পারে (Hypoglycaemia)।",
    keywords: ['gdm', 'gestational diabetes', 'diabetes in pregnancy', 'macrosomia', 'ogtt']
  },

  // --- Anaemia ---
  'anaemia': {
    en: "Anaemia in pregnancy is when hemoglobin drops below 11 g/dL. During pregnancy, blood plasma volume increases more than red blood cells, which causes physiological anaemia. Mothers need iron and folic acid tablets with Vitamin C foods to build healthy red blood cells and avoid fatigue and complications during delivery.",
    bn: "গর্ভাবস্থায় হিমোগ্লোবিনের মাত্রা ১১ গ্রাম/ডিএল (11 g/dL)-এর নিচে নেমে গেলে তাকে Anaemia বা রক্তাল্পতা বলে। এ সময় রক্তে প্লাজমা বেশি বৃদ্ধি পাওয়ায় রক্ত পাতলা হয় (Physiological anaemia)। এর প্রতিকারে নিয়মিত Iron ও Folic Acid ট্যাবলেট খাওয়া এবং লেবু বা টক জাতীয় ভিটামিন-সি যুক্ত খাবার খাওয়া জরুরি।",
    keywords: ['anaemia', 'anemia', 'hemoglobin', 'iron deficiency', 'folic acid']
  },

  // --- Puerperium & Lochia ---
  'puerperium': {
    en: "Puerperium is the 6-week period immediately following childbirth. During these 42 days, the mother's reproductive organs, especially the uterus, gradually return to their non-pregnant condition. This natural healing and shrinking process is known as involution.",
    bn: "Puerperium বলতে delivery-র পরের প্রায় ৬ সপ্তাহ (৪২ দিন) সময়কে বোঝায়। এই সময়ে মায়ের uterus (জরায়ু) এবং অন্যান্য reproductive organs ধীরে ধীরে গর্ভাবস্থার আগের স্বাভাবিক অবস্থায় ফিরে আসে। এই স্বাভাবিক প্রক্রিয়াকে Involution বলা হয়।",
    keywords: ['puerperium', 'puerperal', 'involution', 'lochia', 'postnatal']
  },
  'lochia': {
    en: "Lochia is the normal vaginal discharge that comes after childbirth. It changes color in 3 stages: 1. Lochia Rubra (red, first 1-4 days, contains fresh blood). 2. Lochia Serosa (pinkish/brown, days 5-9, contains serum and mucus). 3. Lochia Alba (whitish/yellow, days 10-15, contains leukocytes and mucus). Foul smell indicates infection.",
    bn: "Lochia হলো সন্তান প্রসবের পর যোনিপথ দিয়ে বের হওয়া স্বাভাবিক স্রাব। এটি তিনটি ধাপে পরিবর্তিত হয়: ১. Lochia Rubra (লাল রঙের, প্রথম ১-৪ দিন)। ২. Lochia Serosa (হালকা গোলাপি বা বাদামী, ৫-৯ দিন)। ৩. Lochia Alba (সাদাটে বা হলুদাভ, ১০-১৫ দিন)। যদি এতে দুর্গন্ধ থাকে, তবে বুঝতে হবে infection হয়েছে।",
    keywords: ['lochia', 'lochia rubra', 'lochia serosa', 'lochia alba']
  },

  // --- Newborn Care ---
  'apgar': {
    en: "The APGAR score is a quick test given to a newborn at 1 minute and 5 minutes after birth. It checks 5 vital signs: A - Activity (muscle tone), P - Pulse (heart rate), G - Grimace (reflex), A - Appearance (skin color), R - Respiration (breathing effort). Score 7 to 10 means the baby is healthy; score below 4 requires urgent resuscitation.",
    bn: "APGAR score হলো জন্মের ১ মিনিট এবং ৫ মিনিট পর নবজাতকের অবস্থা দ্রুত মূল্যায়ন করার স্কোর। এতে ৫টি বিষয় দেখা হয়: Activity (পেশির টান), Pulse (হার্ট রেট), Grimace (প্রতিক্রিয়া), Appearance (গায়ের রঙ), এবং Respiration (শ্বাসপ্রশ্বাস)। মোট স্কোর ৭-১০ হলে শিশু সুস্থ, আর ৪-এর নিচে হলে জরুরি resuscitation প্রয়োজন।",
    keywords: ['apgar', 'apgar score', 'newborn assessment']
  },
  'hypothermia': {
    en: "Neonatal hypothermia occurs when a newborn baby's body temperature drops below 36.5 °C. Newborns lose heat four times faster than adults because of thin skin and lack of fat. Maintaining the Warm Chain—drying immediately, skin-to-skin contact, covering the head with a cap, and delaying the bath—saves newborns from cold stress.",
    bn: "নবজাতকের শরীরের তাপমাত্রা ৩৬.৫ ডিগ্রি সেলসিয়াসের (36.5 °C) নিচে নেমে গেলে তাকে Hypothermia বা ঠান্ডা লাগা বলে। শিশুদের চামড়া পাতলা হওয়ায় খুব দ্রুত শরীর ঠান্ডা হয়ে যায়। তাই Warm Chain বজায় রাখা—যেমন জন্মের পরপরই মুছিয়ে দেওয়া, মায়ের বুকের ওপর রাখা, মাথায় টুপি পরানো এবং দেরিতে গোসল করানো অত্যন্ত জরুরি।",
    keywords: ['hypothermia', 'cold stress', 'warm chain', 'temperature regulation', 'newborn thermal']
  },
  'jaundice': {
    en: "Neonatal jaundice is yellow discoloration of baby's skin and eyes due to high bilirubin levels. Physiological jaundice appears after 24 hours (usually days 2-3) and resolves without harm. Pathological jaundice appears within the first 24 hours and needs urgent medical investigation and phototherapy to protect the baby's brain.",
    bn: "রক্তে Bilirubin বেড়ে গিয়ে নবজাতকের ত্বক ও চোখ হলুদ হয়ে যাওয়াকে Neonatal Jaundice বলে। Physiological jaundice জন্মের ২৪ ঘণ্টা পর (২-৩ দিনে) দেখা দেয় এবং নিজে থেকেই সেরে যায়। কিন্তু Pathological jaundice জন্মের প্রথম ২৪ ঘণ্টার মধ্যেই দেখা দেয় এবং বাচ্চার মস্তিষ্ক বাঁচাতে দ্রুত Phototherapy ও চিকিৎসার প্রয়োজন হয়।",
    keywords: ['jaundice', 'neonatal jaundice', 'physiological jaundice', 'pathological jaundice', 'phototherapy', 'bilirubin']
  },
  'kmc': {
    en: "Kangaroo Mother Care (KMC) is a simple, lifesaving care method for low birth weight and preterm babies. It has two main parts: continuous skin-to-skin contact on mother's chest in kangaroo position, and exclusive frequent breastfeeding. It keeps baby warm, prevents infection, and promotes rapid weight gain.",
    bn: "Kangaroo Mother Care (KMC) হলো কম ওজনের বা সময়ের আগে জন্মানো (Preterm) বাচ্চাদের জন্য একটি জীবন রক্ষাকারী পদ্ধতি। এর দুটি প্রধান দিক রয়েছে: ১. মায়ের বুকের সাথে সরাসরি ত্বকের সংস্পর্শে রাখা (Skin-to-skin contact), এবং ২. ঘন ঘন শুধু বুকের দুধ খাওয়ানো (Exclusive breastfeeding)। এটি বাচ্চাকে উষ্ণ রাখে এবং ওজন বাড়াতে সাহায্য করে।",
    keywords: ['kmc', 'kangaroo mother care', 'skin-to-skin', 'low birth weight', 'lbw', 'preterm']
  },

  // --- Breastfeeding & Lactation ---
  'exclusive_breastfeeding': {
    en: "Exclusive breastfeeding means giving ONLY breast milk to the baby for the first 6 months of life. No other foods, formula, or even water should be given, except prescribed drops or vitamins. Breast milk contains perfect nutrition, water balance, and maternal antibodies that protect the infant from diarrhoea and pneumonia.",
    bn: "Exclusive breastfeeding মানে হলো জন্মের প্রথম ৬ মাস শিশুকে শুধুমাত্র মায়ের বুকের দুধ ছাড়া আর কিছুই না দেওয়া—এমনকি জলও নয় (শুধুমাত্র ডাক্তারের দেওয়া ওষুধ বাদে)। বুকের দুধে শিশুর সব পুষ্টি ও জল থাকে এবং মায়ের রোগ প্রতিরোধক অ্যান্টিবডি থাকে যা শিশুকে ডায়রিয়া ও নিউমোনিয়া থেকে বাঁচায়।",
    keywords: ['exclusive breastfeeding', 'ebf', 'breast milk', 'lactation']
  },
  'colostrum': {
    en: "Colostrum is the thick, yellowish first milk produced during the first 3 to 4 days after delivery. It is called baby's 'first vaccine' because it is packed with Secretory IgA antibodies, white cells, and Vitamin A. It also acts as a natural laxative to help the baby pass dark meconium stool.",
    bn: "Colostrum বা শালদুধ হলো সন্তান প্রসবের পর প্রথম ৩-৪ দিন তৈরি হওয়া ঘন, হালকা হলুদ দুধ। এটিকে শিশুর 'প্রথম টিকা' বলা হয় কারণ এতে প্রচুর Secretory IgA অ্যান্টিবডি ও ভিটামিন-এ থাকে যা শিশুকে ইনফেকশন থেকে রক্ষা করে। এটি শিশুর পেট পরিষ্কার করে প্রথম কালো মল (Meconium) বের হতে সাহায্য করে।",
    keywords: ['colostrum', 'first milk', 'immunoglobulin a', 'iga']
  },
  'engorgement': {
    en: "Breast engorgement is painful swelling and fullness of the breasts when milk builds up faster than the baby empties it, usually 2 to 4 days postpartum. Breasts feel hard, warm, tense, and throbbing. The best treatment is frequent feeding with good latching, gentle expression of milk before latching to soften the areola, and warm compresses.",
    bn: "Breast engorgement মানে হলো স্তনে অতিরিক্ত দুধ জমে শক্ত ও যন্ত্রণাদায়ক হয়ে ওঠা। এটি সাধারণত প্রসবের ২-৪ দিন পর হয় যখন দুধ তৈরি হয় কিন্তু বাচ্চা ঠিকমতো টানতে পারে না। স্তন ভারী, শক্ত ও গরম হয়ে ওঠে। এর প্রতিকার হলো ঘন ঘন দুধ খাওয়ানো, খাওয়ানোর আগে হালকা দুধ চেপে নিপল নরম করা এবং হালকা গরম সেঁক দেওয়া।",
    keywords: ['breast engorgement', 'engorgement', 'sore nipple', 'mastitis', 'latching']
  },

  // --- Community Health ---
  'primary_health_care': {
    en: "Primary Health Care (PHC) is essential health care made universally accessible to all individuals and families in the community at a cost they can afford. Its 4 key principles are: Equitable distribution (health for all), Community participation, Intersectoral coordination, and Appropriate technology.",
    bn: "Primary Health Care (PHC) হলো মৌলিক ও অপরিহার্য স্বাস্থ্যসেবা যা সমাজের প্রতিটি মানুষের কাছে সাশ্রয়ী মূল্যে পৌঁছে দেওয়া হয়। এর ৪টি মূল স্তম্ভ মনে রাখবেন: ১. Equitable distribution (সকলের সমান অধিকার), ২. Community participation (জনগণের অংশগ্রহণ), ৩. Intersectoral coordination (অন্যান্য দপ্তরের সাথে সমন্বয়), এবং ৪. Appropriate technology (উপযুক্ত সহজ প্রযুক্তি)।",
    keywords: ['primary health care', 'phc principles', 'health care delivery']
  },
  'cold_chain': {
    en: "The cold chain is a continuous system of storing and transporting vaccines at recommended low temperatures (usually +2 °C to +8 °C) from the manufacturer until it is injected into the child. If the temperature rises, vaccines lose their potency permanently and cannot be restored even if cooled again.",
    bn: "Cold chain হলো ভ্যাকসিন তৈরি কারখানা থেকে শুরু করে শিশুর শরীরে দেওয়া পর্যন্ত নির্দিষ্ট তাপমাত্রায় (+২°C থেকে +৮°C) সংরক্ষণ ও পরিবহনের অবিচ্ছিন্ন ব্যবস্থা। তাপমাত্রা বেড়ে গেলে টিকার রোগ প্রতিরোধ ক্ষমতা নষ্ট হয়ে যায় এবং পুনরায় ঠান্ডা করলেও সেই ক্ষমতা আর ফিরে আসে না।",
    keywords: ['cold chain', 'vaccine storage', 'ilr', 'deep freezer', 'vaccines']
  },
  'bag_technique': {
    en: "The community health bag technique is a clean scientific method used by the nurse to perform home visits without spreading infection. Hand washing before and after touching the patient, working on a clean plastic spread, and keeping clean items separate from contaminated items are the core rules of bag technique.",
    bn: "Community health bag technique হলো নার্সদের বাড়ি বাড়ি গিয়ে স্বাস্থ্যসেবা দেওয়ার একটি বৈজ্ঞানিক পরিচ্ছন্ন পদ্ধতি, যাতে কোনো ইনফেকশন না ছড়ায়। রোগীকে স্পর্শ করার আগে ও পরে সাবান দিয়ে হাত ধোয়া, পরিষ্কার প্লাস্টিক শিট বিছিয়ে তার ওপর কাজ করা এবং পরিচ্ছন্ন জিনিস ও ময়লা জিনিস আলাদা রাখা এর প্রধান নিয়ম।",
    keywords: ['bag technique', 'community bag', 'home visit', 'handwashing']
  },
  'epidemiological_triad': {
    en: "The epidemiological triad explains how infectious diseases spread. It consists of three connected factors: 1. Agent (the germ like bacteria or virus), 2. Host (the person who gets sick), and 3. Environment (surroundings like clean water, sanitation, and crowding that bring agent and host together).",
    bn: "Epidemiological triad হলো রোগ সৃষ্টির তিনটি মূল উপাদানের পারস্পরিক সম্পর্ক: ১. Agent (রোগ সৃষ্টিকারী জীবাণু যেমন ভাইরাস বা ব্যাকটেরিয়া), ২. Host (যে মানুষটি আক্রান্ত হচ্ছে), এবং ৩. Environment (চারপাশের পরিবেশ যেমন আবহাওয়া, দূষণ বা অস্বাস্থ্যকর পরিবেশ যা রোগ ছড়াতে সাহায্য করে)।",
    keywords: ['epidemiological triad', 'agent host environment', 'epidemiology']
  },
  'levels_of_prevention': {
    en: "Prevention in community health has four levels: 1. Primordial (preventing risk factors from appearing, like teaching healthy habits). 2. Primary (stopping disease before it starts, like vaccination). 3. Secondary (early detection and prompt treatment, like screening). 4. Tertiary (rehabilitation to reduce permanent disability).",
    bn: "Community health-এ প্রতিরোধের ৪টি স্তর রয়েছে: ১. Primordial (ঝুঁকির কারণ যাতে তৈরিই না হয়, যেমন স্বাস্থ্যকর খাদ্যাভ্যাস শেখানো)। ২. Primary (রোগ হওয়ার আগেই আটকানো, যেমন টিকাদান বা Vaccination)। ৩. Secondary (রোগের শুরুতে ধরা ও চিকিৎসা, যেমন Screening)। ৪. Tertiary (শারীরিক ক্ষতি কমানো ও পুনর্বাসন বা Rehabilitation)।",
    keywords: ['levels of prevention', 'primary prevention', 'secondary prevention', 'tertiary prevention']
  },

  // --- Research & Statistics ---
  'hypothesis': {
    en: "In nursing research, a hypothesis is a testable educated prediction about the expected relationship between two or more variables. For example, 'mothers who receive antenatal counseling will have higher breastfeeding rates than mothers who do not.' It guides the direction of the whole study.",
    bn: "Nursing research-এ Hypothesis হলো গবেষণার একটি সম্ভাব্য পূর্বানুমান (Prediction) যা পরীক্ষা করা যায়। যেমন: 'যে মায়েরা Antenatal counseling পেয়েছেন তারা বেশি দিন শিশুকে বুকের দুধ খাওয়াবেন।' এটি সম্পূর্ণ গবেষণার পথ নির্দেশ করে।",
    keywords: ['hypothesis', 'null hypothesis', 'research prediction', 'variables']
  },
  'sampling': {
    en: "Sampling is the process of selecting a small representative group of individuals (the sample) from the entire target population to study them. If the sample is truly representative, the findings can be generalized to the entire patient population. Methods are probability (random) or non-probability.",
    bn: "Sampling হলো সম্পূর্ণ জনগোষ্ঠী (Target population) থেকে একটি ছোট প্রতিনিধিত্বমূলক দল (Sample) নির্বাচন করার প্রক্রিয়া। যদি এই স্যাম্পলটি সঠিক হয়, তবে এর ফলাফল সব রোগীর ক্ষেত্রে প্রযোজ্য বলে ধরা যায়। এটি দুই ধরণের হয়: Probability (Random) এবং Non-probability।",
    keywords: ['sampling', 'sampling technique', 'sample', 'probability sampling', 'population']
  },
  'reliability_validity': {
    en: "Reliability means consistency—if you measure the same thing multiple times with the tool, you get the same result. Validity means accuracy—the tool measures exactly what it claims to measure. For example, a blood pressure cuff that gives steady readings is reliable; if it gives true BP readings, it is valid.",
    bn: "Reliability মানে হলো ধারাবাহিকতা (Consistency)—একই টুল দিয়ে বারবার মাপলে যদি একই ফল পাওয়া যায়। আর Validity মানে হলো নির্ভুলতা (Accuracy)—টুলটি যা পরিমাপ করার কথা ঠিক সেটাই পরিমাপ করছে কি না। যেমন একটি থার্মোমিটার যদি সঠিক তাপমাত্রা দেখায় তবে তা Valid; আর বারবার একই তাপমাত্রা দেখালে তা Reliable।",
    keywords: ['reliability', 'validity', 'research tool', 'measurement']
  },
  'central_tendency': {
    en: "Measures of central tendency are single numbers that represent the middle or typical value of a dataset. The three main measures are: 1. Mean (mathematical average), 2. Median (the exact middle value when scores are ordered), 3. Mode (the most frequently occurring score in the group).",
    bn: "Measures of central tendency হলো এমন একক সংখ্যা যা কোনো তথ্য বা ডেটাসেটের মধ্যবর্তী বা গড় মানকে বোঝায়। এর তিনটি প্রধান পরিমাপক: ১. Mean (গাণিতিক গড়), ২. Median (ছোট থেকে বড় সাজালে ঠিক মাঝের সংখ্যাটি), এবং ৩. Mode (যে সংখ্যাটি সবচেয়ে বেশি বার এসেছে)।",
    keywords: ['mean', 'median', 'mode', 'central tendency', 'statistics']
  }
};

/**
 * Finds best knowledge match for question/topic
 */
function findTutorKnowledge(question, topic, answer) {
  const combined = `${question} ${topic || ''} ${answer || ''}`.toLowerCase();
  
  for (const [key, item] of Object.entries(TUTOR_TOPIC_KNOWLEDGE)) {
    if (item.keywords.some(kw => combined.includes(kw.toLowerCase()))) {
      return item;
    }
  }
  return null;
}

/**
 * Generate Simple Indian English Explanation
 */
function generateSimpleIndianEnglishExplanation(question, answer, marks = 2, topic = '') {
  const match = findTutorKnowledge(question, topic, answer);
  const cleanAnswer = String(answer || '')
    .replace(/^(\d+\.|\*|-)\s*/gm, '')
    .replace(/\n+/g, ' ')
    .trim();

  // If we have a tailored topic explanation
  if (match && match.en) {
    if (marks <= 2) {
      return match.en;
    } else if (marks <= 3) {
      return `${match.en}\n\nExam Note for ${marks} Marks:\nAlways remember to mention the key clinical definition first, then list the essential points in order as asked.`;
    } else {
      return `📌 Core Concept:\n${match.en}\n\n📋 Structured Points for Exam:\n${cleanAnswer}\n\n💡 Teacher's Exam Tip:\nWrite this with clear headings and maintain correct nursing terminology.`;
    }
  }

  // Fallback high-yield teacher synthesis
  if (marks <= 2) {
    return `In simple words: ${cleanAnswer.slice(0, 220)}. This is an important 2-mark nursing concept. Remember the key definition and write the main points clearly.`;
  } else if (marks <= 3) {
    return `Let us understand this step-by-step:\n1. Main meaning: ${cleanAnswer.slice(0, 180)}.\n2. Clinical importance: This helps the nurse identify complications early and take timely action.\n3. Exam tip: Write at least 3 distinct points to score full 3 marks.`;
  } else {
    return `📌 Detailed Nursing Explanation:\n• Concept: ${cleanAnswer.slice(0, 250)}.\n• Nursing Role: Monitor vital signs, provide prompt care, and document findings accurately.\n• Exam Structure: Use headings, bullet points, and proper medical terms for 5-mark answers.`;
  }
}

/**
 * Generate Natural Bengali Explanation
 */
function generateBengaliExplanation(question, answer, marks = 2, topic = '') {
  const match = findTutorKnowledge(question, topic, answer);
  const cleanAnswer = String(answer || '')
    .replace(/^(\d+\.|\*|-)\s*/gm, '')
    .replace(/\n+/g, ' ')
    .trim();

  if (match && match.bn) {
    if (marks <= 2) {
      return match.bn;
    } else if (marks <= 3) {
      return `${match.bn}\n\nপরীক্ষার জন্য টিপস:\nউত্তরে প্রথমে মূল সংজ্ঞাটি লিখবেন এবং তারপর অন্তত ৩টি পয়েন্ট সুন্দরভাবে উল্লেখ করবেন।`;
    } else {
      return `📌 মূল বিষয়বস্তু:\n${match.bn}\n\n📋 পরীক্ষার গুরুত্বপূর্ণ পয়েন্ট:\n${cleanAnswer}\n\n💡 নার্সিং টিচার টিপ:\nনার্সিং পরীক্ষায় ইংরেজি টার্মগুলো (যেমন vital signs, monitoring, complications) সঠিক রেখে পয়েন্ট আকারে লিখলে পুরো নম্বর পাওয়া সহজ হবে।`;
    }
  }

  // Fallback natural Bengali explanation
  if (marks <= 2) {
    return `সহজ কথায়: এই প্রশ্নের মূল কথা হলো রোগীর সুরক্ষা এবং প্রাথমিক নার্সিং পরিচর্যা। পরীক্ষায় ২ নম্বরের জন্য সঠিক সংজ্ঞা এবং দুটি প্রধান পয়েন্ট স্পষ্ট করে লিখলেই পুরো ২ নম্বর পাওয়া যাবে।`;
  } else {
    return `সহজ কথায় এই বিষয়টি বুঝে নেওয়া জরুরি:\n১. মূল উদ্দেশ্য হলো রোগীর শারীরিক অবস্থা পর্যবেক্ষণ করা এবং সময়মতো চিকিৎসা নিশ্চিত করা।\n২. পরীক্ষার খাতায় পয়েন্ট আকারে লিখবেন এবং গুরুত্বপূর্ণ মেডিকেল শব্দগুলো ইংরেজিতেই বজায় রাখবেন।`;
  }
}

/**
 * Generate Related Practice Questions
 */
function generateRelatedQuestions(currentQ, allQuestions = []) {
  const qText = (currentQ.question || currentQ.q || '').toLowerCase();
  const qTopic = (currentQ.topic || '').toLowerCase();
  const currentId = currentQ.id;

  // 1. First find other questions in same topic from database
  const sameTopic = allQuestions.filter(q => 
    q.id !== currentId && 
    (q.topic && q.topic.toLowerCase() === qTopic)
  );

  // 2. Find keyword matches
  const keywordMatches = allQuestions.filter(q => {
    if (q.id === currentId || sameTopic.some(st => st.id === q.id)) return false;
    const combined = `${q.question} ${q.answer}`.toLowerCase();
    return (currentQ.keywords || []).some(kw => kw.length > 3 && combined.includes(kw.toLowerCase()));
  });

  const candidates = [...sameTopic, ...keywordMatches].slice(0, 4);

  const results = candidates.map(c => ({
    id: c.id,
    question: c.question,
    marks: 2,
    isStored: true,
    storedId: c.id,
    answer: c.answer
  }));

  // If fewer than 3, add high-yield syllabus practice questions
  if (results.length < 3) {
    if (qText.includes('pph') || qTopic.includes('pph')) {
      results.push({
        id: 'p_pph_1',
        question: 'Mention two complications of postpartum haemorrhage.',
        marks: 2,
        isStored: false,
        answer: '1. Hypovolaemic shock due to acute massive blood loss.\n2. Puerperal sepsis and acute renal failure (acute tubular necrosis).'
      });
      results.push({
        id: 'p_pph_2',
        question: 'List two immediate nursing measures in postpartum haemorrhage.',
        marks: 2,
        isStored: false,
        answer: '1. Massage the fundus continuously to stimulate uterine contraction.\n2. Call for medical help, start high-flow oxygen, and administer prescribed oxytocics.'
      });
    } else if (qText.includes('antenatal') || qTopic.includes('antenatal')) {
      results.push({
        id: 'p_anc_1',
        question: 'State two danger signs during the antenatal period.',
        marks: 2,
        isStored: false,
        answer: '1. Vaginal bleeding of any amount during pregnancy.\n2. Severe headache, blurred vision, and persistent epigastric pain.'
      });
    } else if (qText.includes('labour') || qTopic.includes('labour')) {
      results.push({
        id: 'p_lab_1',
        question: 'Mention two clinical signs of the second stage of labour.',
        marks: 2,
        isStored: false,
        answer: '1. Involuntary maternal bearing-down urge.\n2. Bulging of perineum and crowning of the fetal head.'
      });
    } else {
      results.push({
        id: 'p_gen_1',
        question: `What are two important nursing responsibilities related to ${currentQ.topic || 'this condition'}?`,
        marks: 2,
        isStored: false,
        answer: '1. Continuous monitoring and timely recording of vital signs.\n2. Prompt notification to the doctor upon noticing early danger signs.'
      });
    }
  }

  return results.slice(0, 4);
}

module.exports = {
  findTutorKnowledge,
  generateSimpleIndianEnglishExplanation,
  generateBengaliExplanation,
  generateRelatedQuestions
};
