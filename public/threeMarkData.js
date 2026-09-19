const THREE_MARK_QUESTIONS = [
  {
    id: '3m-001',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Antenatal Care',
    question: 'Mention three important components of antenatal care.',
    answer: '1. Regular assessment of maternal and fetal wellbeing.\n2. Early detection and management of complications.\n3. Health education, nutrition advice, immunization, and preparation for safe delivery.',
    priority: 'important',
    marks: 3
  },
  {
    id: '3m-causes-preterm-labour',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Preterm Labour',
    question: 'State the causes of preterm labour.',
    answer: 'Definition: Preterm labour is labour that starts before 37 completed weeks of pregnancy.\n\n1. Maternal causes: Infections, anaemia, hypertension, diabetes and poor maternal nutrition.\n2. Uterine/placental causes: Uterine abnormalities, cervical incompetence, placenta previa or placental problems.\n3. Fetal and pregnancy causes: Multiple pregnancy, polyhydramnios, fetal abnormalities and premature rupture of membranes.',
    priority: 'high-yield',
    marks: 3
  },
  {
    id: '3m-clinical-manifestations-preterm-baby',
    subject: 'Newborn Care',
    category: 'Newborn Care',
    topic: 'Preterm Baby',
    question: 'Write the clinical manifestations of a preterm baby.',
    answer: 'Definition: A preterm baby is born before 37 completed weeks and shows features of physical and physiological immaturity.\n\n1. Small size and immature appearance: Low birth weight, relatively large head, thin skin, abundant lanugo and little subcutaneous fat.\n2. Poor muscle tone and immature reflexes: Reduced flexion, weak movements and immature sucking/swallowing reflexes.\n3. Physiological instability: Difficulty maintaining body temperature, respiratory difficulty/apnoea and feeding problems.',
    priority: 'high-yield',
    marks: 3
  },
  {
    id: '3m-causes-early-pregnancy-haemorrhage',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Early Pregnancy Haemorrhage',
    question: 'Write the causes of haemorrhage in early pregnancy.',
    answer: 'Definition: Early pregnancy haemorrhage is vaginal bleeding occurring during the first part of pregnancy. It may arise from pregnancy-related or genital tract causes.\n\n1. Abortion: Threatened, inevitable, incomplete or other forms of pregnancy loss may cause bleeding.\n2. Ectopic pregnancy: Implantation of the pregnancy outside the uterine cavity can cause bleeding and abdominal pain.\n3. Molar pregnancy: Abnormal trophoblastic growth may produce vaginal bleeding.\n4. Cervical/vaginal causes: Cervical erosion, polyps, infection or trauma may cause bleeding.',
    priority: 'high-yield',
    marks: 3
  },
  {
    id: '3m-classification-abortion',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Abortion',
    question: 'Classify abortion.',
    answer: 'Definition: Abortion is the termination or loss of pregnancy before the fetus is viable. It may be classified according to the clinical condition and whether the products of conception are retained or expelled.\n\n1. Threatened abortion: Vaginal bleeding occurs but the cervix remains closed and pregnancy may continue.\n2. Inevitable abortion: Bleeding and uterine contractions occur with cervical dilatation, making continuation of pregnancy unlikely.\n3. Incomplete abortion: Some products of conception are expelled while some remain in the uterus.\n4. Complete abortion: All products of conception are expelled from the uterus.\n5. Missed abortion: The fetus has died but the products of conception are retained in the uterus.\n\nOther forms: Septic abortion and recurrent/habitual abortion may also be described separately.',
    priority: 'high-yield',
    marks: 3
  },
  {
    id: '3m-diagnosis-management-septic-abortion',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Septic Abortion',
    question: 'Write the diagnosis and management of septic abortion.',
    answer: 'Definition: Septic abortion is an abortion complicated by infection of the uterus and surrounding genital tract. It is a serious condition that can progress to sepsis and shock.\n\nA. Diagnosis\n1. History and examination: Assess fever, lower abdominal pain, foul-smelling vaginal discharge and history of abortion.\n2. Clinical findings: Fever, tachycardia, uterine tenderness, abnormal/foul-smelling discharge and possible shock.\n3. Investigations: Perform CBC, blood culture and other appropriate investigations; ultrasound may help identify retained products.\n\nB. Management\n1. Stabilize the woman: Assess ABC, establish IV access and give IV fluids and supportive treatment as required.\n2. Antibiotics: Start appropriate broad-spectrum IV antibiotics promptly as prescribed.\n3. Evacuate retained products: After stabilization and initiation of antibiotics, remove retained products when indicated.\n4. Monitoring and follow-up: Monitor vital signs, bleeding, urine output and signs of sepsis; provide counselling and follow-up care.',
    priority: 'high-yield',
    marks: 3
  },
  {
    id: '3m-birth-preparedness',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Birth Preparedness',
    question: 'Write a short note on birth preparedness.',
    answer: 'Definition: Birth preparedness means making advance arrangements for safe delivery and management of possible complications. It helps the mother and family obtain timely skilled care.\n\n1. Place of delivery: Select a suitable health facility and skilled birth attendant.\n2. Transport and finances: Arrange transport, money and important documents before labour.\n3. Emergency plan: Identify danger signs, emergency contacts and necessary family support.',
    priority: 'high-yield',
    marks: 3
  },
  {
    id: '3m-puerperal-sepsis-short-note',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Puerperal Sepsis',
    question: 'Write a short note on puerperal sepsis.',
    answer: 'Definition: Puerperal sepsis is an infection of the genital tract occurring after childbirth or abortion. It can cause serious maternal illness if not diagnosed and treated promptly.\n\n1. Causes: Poor asepsis, prolonged labour, prolonged rupture of membranes and retained products may contribute.\n2. Signs and symptoms: Fever, uterine tenderness, lower abdominal pain and foul-smelling lochia.\n3. Management: Give prescribed antibiotics and supportive care, maintain hygiene and monitor the maternal condition.',
    priority: 'high-yield',
    marks: 3
  },
  {
    id: '3m-physiological-jaundice',
    subject: 'Newborn Care',
    category: 'Newborn Care',
    topic: 'Neonatal Jaundice',
    question: 'Write a short note on physiological jaundice.',
    answer: 'Definition: Physiological jaundice is a temporary yellow discoloration of the newborn skin and sclera due to increased bilirubin after birth. It usually appears after the first 24 hours and gradually disappears.\n\n1. Cause: Increased breakdown of fetal red blood cells produces bilirubin.\n2. Features: Yellow discoloration commonly starts on the face and progresses downward.\n3. Care: Encourage adequate breastfeeding and observe the baby; early or severe jaundice requires assessment.',
    priority: 'high-yield',
    marks: 3
  },
  {
    id: '3m-magnesium-sulphate',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Preeclampsia and Eclampsia',
    question: 'Write a short note on magnesium sulphate.',
    answer: 'Definition: Magnesium sulphate is an anticonvulsant drug used mainly to prevent and control seizures in severe pre-eclampsia and eclampsia. It reduces neuromuscular excitability and helps prevent recurrent convulsions.\n\n1. Uses: Prevention and treatment of eclamptic convulsions.\n2. Monitoring: Observe respiratory rate, patellar reflexes and urine output for toxicity.\n3. Nursing responsibility: Administer as prescribed, maintain seizure precautions and keep calcium gluconate available as the antidote.',
    priority: 'high-yield',
    marks: 3
  },
  {
    id: '3m-safe-motherhood',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Safe Motherhood',
    question: 'Write a short note on safe motherhood.',
    answer: 'Definition: Safe motherhood is an approach that ensures women receive appropriate care throughout pregnancy, childbirth and the postpartum period. Its main aim is to reduce preventable maternal illness and death.\n\n1. Antenatal care: Provide regular check-ups, screening, nutrition and preventive care.\n2. Safe delivery: Ensure skilled birth attendance and timely management or referral of complications.\n3. Postnatal care: Provide maternal and newborn care, breastfeeding support, family planning and follow-up.',
    priority: 'high-yield',
    marks: 3
  },
  {
    id: '3m-obstetric-emergency',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Obstetric Emergency',
    question: 'Write a short note on obstetric emergency.',
    answer: 'Definition: Obstetric emergencies are sudden, serious complications during pregnancy, labour or postpartum that require immediate treatment. Early recognition and prompt management are essential to prevent maternal and fetal complications.\n\n1. Examples: PPH, eclampsia, obstructed labour, cord prolapse and uterine rupture.\n2. Recognition: Identify danger signs such as severe bleeding, convulsions, severe abdominal pain or fetal distress.\n3. Management: Provide immediate emergency care, stabilize the mother and arrange urgent medical intervention/referral.',
    priority: 'high-yield',
    marks: 3
  },
  {
    id: '3m-partograph-short-note',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Partograph',
    question: 'Write a short note on partograph.',
    answer: 'Definition: A partograph is a graphical record used to monitor the progress of labour and the condition of the mother and fetus. It helps identify abnormal labour early and facilitates timely intervention.\n\n1. Fetal monitoring: Records fetal heart rate, liquor and moulding/caput.\n2. Labour progress: Records cervical dilatation and fetal descent against time.\n3. Maternal monitoring: Records contractions, pulse, BP, temperature, urine and other relevant observations.',
    priority: 'high-yield',
    marks: 3
  },
  {
    id: '3m-high-risk-pregnancy',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'High-Risk Pregnancy',
    question: 'Write a short note on high-risk pregnancy.',
    answer: 'Definition: High-risk pregnancy is a pregnancy in which the mother, fetus or both have an increased risk of illness or death compared with a normal pregnancy. It requires closer antenatal observation and appropriate referral.\n\n1. Maternal risk factors: Anaemia, hypertension, diabetes, heart disease and previous obstetric complications.\n2. Fetal/pregnancy factors: Multiple pregnancy, abnormal presentation, fetal growth problems or congenital abnormalities.\n3. Management: Regular antenatal monitoring, early identification of complications and timely referral to appropriate specialist care.',
    priority: 'high-yield',
    marks: 3
  },
  {
    id: '3m-postpartum-depression',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Postpartum Depression',
    question: 'Write a short note on postpartum depression.',
    answer: 'Definition: Postpartum depression is a depressive illness occurring after childbirth that causes persistent low mood and affects the mother daily functioning. It is more severe and persistent than the short-lived postpartum blues.\n\n1. Symptoms: Persistent sadness, loss of interest, fatigue, sleep/appetite changes and difficulty bonding with the baby.\n2. Nursing care: Provide emotional support, encourage rest and family support, and assess the maternal mental state and safety.\n3. Treatment/referral: Arrange professional assessment and appropriate psychological or medical treatment; urgent help is required if there are thoughts of self-harm or harm to the baby.',
    priority: 'high-yield',
    marks: 3
  },
  {
    id: '3m-gestational-diabetes-mellitus',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Gestational Diabetes Mellitus',
    question: 'Write a short note on gestational diabetes mellitus (GDM).',
    answer: 'Definition: GDM is glucose intolerance or diabetes first recognized during pregnancy. It may be asymptomatic and is commonly detected through antenatal screening.\n\n1. Risk/signs: May include increased thirst, frequent urination, fatigue and recurrent infections, although many women have no symptoms.\n2. Management: Dietary modification, appropriate physical activity, blood-glucose monitoring and prescribed medication when required.\n3. Complications: May increase the risk of macrosomia, difficult delivery, neonatal hypoglycaemia and neonatal jaundice.',
    priority: 'high-yield',
    marks: 3
  }
];
if (typeof window !== 'undefined') window.THREE_MARK_QUESTIONS = THREE_MARK_QUESTIONS;
if (typeof module !== 'undefined') module.exports = { THREE_MARK_QUESTIONS };


