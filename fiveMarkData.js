const FIVE_MARK_QUESTIONS = [
  {
    id: '5m-partograph-001',
    marks: 5,
    priority: 'high-yield',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'MIDWIFERY & OBSTETRICAL NURSING',
    cat: 'Midwifery & Obstetrical Nursing',
    topic: 'Partograph',
    question: 'Describe the Partograph.',
    answerTitle: 'Key Parameters',
    answerDefinitionLines: [
      'A partograph is a graphical record used to monitor the progress of labour and the condition of the mother and fetus during labour.',
      'It helps identify abnormal progress of labour early and facilitates timely management.'
    ],
    answerPoints: [
      { heading: 'Cervical Dilatation', text: 'Records cervical dilatation against time to assess the progress of labour.' },
      { heading: 'Fetal Heart Rate', text: 'Monitors the fetal heart rate regularly to assess fetal well-being.' },
      { heading: 'Uterine Contractions', text: 'Records the frequency and duration of uterine contractions during labour.' },
      { heading: 'Maternal Condition', text: 'Monitors maternal pulse, blood pressure, temperature and urine output.' },
      { heading: 'Descent of Fetal Head', text: 'Records the descent of the fetal head to assess progress towards delivery.' }
    ],
    keywords: ['Partograph', 'partograph', 'labour', 'labor', 'cervical dilatation', 'fetal heart rate', 'uterine contractions'],
    q: 'Describe the Partograph.'
  },
  {
    id: '5m-induction-methods-001',
    marks: 5,
    priority: 'high-yield',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'MIDWIFERY & OBSTETRICAL NURSING',
    cat: 'Midwifery & Obstetrical Nursing',
    topic: 'Induction of Labour',
    question: 'Describe the various methods of Induction of Labour.',
    answerTitle: 'Methods of Induction of Labour',
    answerPoints: [
      { heading: 'Membrane sweeping', text: 'The membranes are separated from the lower uterine segment during vaginal examination. This may stimulate prostaglandin release and help initiate labour.' },
      { heading: 'Prostaglandins', text: 'Prostaglandin preparations are used for cervical ripening and to help initiate uterine contractions, particularly when the cervix is unfavourable.' },
      { heading: 'Mechanical method', text: 'A Foley balloon catheter may be introduced through the cervix. Pressure from the balloon helps in cervical ripening and dilatation.' },
      { heading: 'Artificial rupture of membranes (Amniotomy)', text: 'The amniotic membranes are intentionally ruptured to release liquor and may help establish or strengthen uterine contractions.' },
      { heading: 'Oxytocin infusion', text: 'Oxytocin is given intravenously in a controlled dose to produce effective uterine contractions. Maternal and fetal condition should be monitored.' },
      { heading: 'Combined methods', text: 'Two or more methods may be used sequentially when appropriate, for example cervical ripening followed by amniotomy and oxytocin, depending on the condition of the mother, fetus and cervix.' }
    ],
    keywords: ['induction', 'induction of labour', 'induction of labor', 'methods of induction', 'amniotomy', 'oxytocin', 'prostaglandins', 'Foley catheter'],
    q: 'Describe the various methods of Induction of Labour.'
  },
  {
    id: '5m-induction-assessment-001',
    marks: 5,
    priority: 'high-yield',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'MIDWIFERY & OBSTETRICAL NURSING',
    cat: 'Midwifery & Obstetrical Nursing',
    topic: 'Induction of Labour',
    question: 'What are the parameters to be assessed before induction of labour?',
    answerTitle: 'Parameters Assessed Before Induction of Labour',
    answerPoints: [
      { heading: 'Indication for induction', text: 'Assess the reason for induction, such as post-term pregnancy, ruptured membranes, or maternal/fetal conditions, and confirm that induction is appropriate.' },
      { heading: 'Gestational age', text: 'Confirm the gestational age accurately to ensure that the pregnancy has reached the appropriate period for induction.' },
      { heading: 'Maternal condition', text: "Assess the mother's general condition, including vital signs, medical/obstetric history, and conditions such as hypertension or diabetes." },
      { heading: 'Fetal condition', text: 'Assess fetal well-being by checking fetal heart rate, fetal movements and appropriate antenatal investigations.' },
      { heading: 'Cervical assessment', text: 'Assess cervical dilatation, effacement, consistency and position, along with the presenting part/station. Bishop score may be used to assess cervical favourability.' },
      { heading: 'Pelvic adequacy and presentation', text: 'Confirm fetal presentation and position and assess whether the maternal pelvis is adequate for vaginal delivery. Also exclude conditions where vaginal delivery is contraindicated.' }
    ],
    keywords: ['induction', 'induction of labour', 'induction of labor', 'parameters', 'Bishop score', 'cervical assessment'],
    q: 'What are the parameters to be assessed before induction of labour?'
  },
  {
    id: '5m-gdm-001',
    marks: 5,
    priority: 'high-yield',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'MIDWIFERY & OBSTETRICAL NURSING',
    cat: 'Midwifery & Obstetrical Nursing',
    topic: 'Gestational Diabetes Mellitus',
    question: 'How can a mother diagnosed with Gestational Diabetes Mellitus (GDM) be managed?',
    answerTitle: 'Management of a Mother with GDM',
    answerPoints: [
      { heading: 'Dietary management', text: 'Provide a balanced diabetic diet with appropriate calories and carbohydrates; advise small, frequent meals and avoid excess sugar and refined carbohydrates.' },
      { heading: 'Blood glucose monitoring', text: 'Monitor blood glucose regularly as advised and maintain a record of fasting and post-meal blood glucose levels.' },
      { heading: 'Physical activity', text: 'Encourage safe, moderate physical activity such as walking, if there is no obstetric contraindication.' },
      { heading: 'Medication', text: 'If blood glucose remains uncontrolled with diet and exercise, administer prescribed medication, commonly insulin, and monitor for hypoglycaemia.' },
      { heading: 'Maternal and fetal monitoring', text: 'Regularly monitor maternal health, blood pressure and weight, and assess fetal growth and well-being through appropriate antenatal investigations.' },
      { heading: 'Health education and follow-up', text: 'Educate the mother about medication, diet, warning signs, fetal movement, importance of regular antenatal visits, and follow-up after delivery for diabetes screening.' }
    ],
    keywords: ['GDM', 'gestational diabetes', 'diabetes mellitus', 'management of GDM', 'blood glucose', 'insulin'],
    q: 'How can a mother diagnosed with Gestational Diabetes Mellitus (GDM) be managed?'
  },
  {
    id: '5m-001',
    subject: 'Midwifery & Obstetrical Nursing',
    topic: 'Antenatal Care',
    question: 'Discuss the importance of antenatal care during pregnancy.',
    answer: 'Antenatal care is important because it helps to assess maternal and fetal health throughout pregnancy. It helps detect anaemia, hypertension, pre-eclampsia, infections, and malpresentations early. Regular check-ups also allow for immunization, nutritional guidance, and preparation for labour and parenting. This reduces maternal and infant morbidity and mortality and promotes safe delivery.',
    marks: 5,
    priority: 'high-yield',
    keywords: ['antenatal care', 'pregnancy', 'maternal health', 'fetal health'],
    cat: 'Midwifery & Obstetrical Nursing',
    q: 'Discuss the importance of antenatal care during pregnancy.',
    a: 'Antenatal care is important because it helps to assess maternal and fetal health throughout pregnancy. It helps detect anaemia, hypertension, pre-eclampsia, infections, and malpresentations early. Regular check-ups also allow for immunization, nutritional guidance, and preparation for labour and parenting. This reduces maternal and infant morbidity and mortality and promotes safe delivery.'
  },
  {
    id: '5m-002',
    subject: 'Midwifery & Obstetrical Nursing',
    topic: 'Postpartum Haemorrhage',
    question: 'Explain the causes and nursing management of postpartum haemorrhage.',
    answer: 'Postpartum haemorrhage is excessive bleeding after delivery. Common causes are uterine atony, retained placenta, lacerations, and coagulation defects. Nursing management includes calling for help, checking uterine tone, massaging the uterus, monitoring vital signs, securing IV access, giving uterotonics, and preparing for blood transfusion if needed. Early recognition and prompt action prevent shock and maternal death.',
    marks: 5,
    priority: 'high-yield',
    keywords: ['PPH', 'uterine atony', 'blood loss', 'nursing management'],
    cat: 'Midwifery & Obstetrical Nursing',
    q: 'Explain the causes and nursing management of postpartum haemorrhage.',
    a: 'Postpartum haemorrhage is excessive bleeding after delivery. Common causes are uterine atony, retained placenta, lacerations, and coagulation defects. Nursing management includes calling for help, checking uterine tone, massaging the uterus, monitoring vital signs, securing IV access, giving uterotonics, and preparing for blood transfusion if needed. Early recognition and prompt action prevent shock and maternal death.'
  },
  {
    id: '5m-003',
    subject: 'Newborn Care',
    topic: 'Neonatal Resuscitation',
    question: 'Describe the immediate steps of newborn resuscitation.',
    answer: 'The immediate steps include providing warmth, clearing the airway if needed, drying the baby, and positioning the head to maintain airway patency. The nurse should assess breathing and heart rate. If the baby is apnoeic or gasping, begin positive pressure ventilation with bag and mask. If heart rate remains below 60 beats per minute, chest compression is started. Proper skilled resuscitation prevents brain injury and improves survival.',
    marks: 5,
    priority: 'high-yield',
    keywords: ['newborn resuscitation', 'airway', 'BVM', 'heart rate'],
    cat: 'Newborn Care',
    q: 'Describe the immediate steps of newborn resuscitation.',
    a: 'The immediate steps include providing warmth, clearing the airway if needed, drying the baby, and positioning the head to maintain airway patency. The nurse should assess breathing and heart rate. If the baby is apnoeic or gasping, begin positive pressure ventilation with bag and mask. If heart rate remains below 60 beats per minute, chest compression is started. Proper skilled resuscitation prevents brain injury and improves survival.'
  },
  {
    id: '5m-004',
    subject: 'Lactation & Breastfeeding',
    topic: 'Breastfeeding',
    question: 'Explain the advantages of exclusive breastfeeding for the infant and mother.',
    answer: 'Exclusive breastfeeding provides ideal nutrition for the newborn and protects against infections such as diarrhoea and respiratory illness. It promotes bonding and helps in proper growth and development. For the mother, breastfeeding helps uterine involution, reduces postpartum bleeding, and may delay the return of fertility. It is convenient, economical, and emotionally beneficial to both mother and baby.',
    marks: 5,
    priority: 'important',
    keywords: ['exclusive breastfeeding', 'infant immunity', 'maternal benefits'],
    cat: 'Lactation & Breastfeeding',
    q: 'Explain the advantages of exclusive breastfeeding for the infant and mother.',
    a: 'Exclusive breastfeeding provides ideal nutrition for the newborn and protects against infections such as diarrhoea and respiratory illness. It promotes bonding and helps in proper growth and development. For the mother, breastfeeding helps uterine involution, reduces postpartum bleeding, and may delay the return of fertility. It is convenient, economical, and emotionally beneficial to both mother and baby.'
  },
  {
    id: '5m-005',
    subject: 'Community Health Nursing II',
    topic: 'Primary Health Care',
    question: 'Discuss the principles and components of primary health care.',
    answer: 'Primary health care is essential health care made universally accessible to individuals and families. Its principles include equity, community participation, intersectoral coordination, appropriate technology, and prevention and promotion. Components include education, immunization, maternal and child health care, nutrition, safe water, sanitation, treatment of common diseases, and referral services. This approach improves health outcomes and reduces disease burden at the community level.',
    marks: 5,
    priority: 'high-yield',
    keywords: ['primary health care', 'community participation', 'equity'],
    cat: 'Community Health Nursing II',
    q: 'Discuss the principles and components of primary health care.',
    a: 'Primary health care is essential health care made universally accessible to individuals and families. Its principles include equity, community participation, intersectoral coordination, appropriate technology, and prevention and promotion. Components include education, immunization, maternal and child health care, nutrition, safe water, sanitation, treatment of common diseases, and referral services. This approach improves health outcomes and reduces disease burden at the community level.'
  },
  {
    id: '5m-006',
    subject: 'Nursing Research & Statistics',
    topic: 'Research Design',
    question: 'Explain the importance of a research design in nursing research.',
    answer: 'A research design is the plan that guides the study and helps answer the research question systematically. It ensures validity, reliability, and efficiency of the study. A good design helps control bias, determine sampling, data collection methods, and analysis plan, and improves the credibility of the findings. It also helps the researcher interpret results correctly and apply them to nursing practice.',
    marks: 5,
    priority: 'important',
    keywords: ['research design', 'validity', 'reliability', 'nursing research'],
    cat: 'Nursing Research & Statistics',
    q: 'Explain the importance of a research design in nursing research.',
    a: 'A research design is the plan that guides the study and helps answer the research question systematically. It ensures validity, reliability, and efficiency of the study. A good design helps control bias, determine sampling, data collection methods, and analysis plan, and improves the credibility of the findings. It also helps the researcher interpret results correctly and apply them to nursing practice.'
  },
  {
    id: '5m-puerperium-physiological-changes',
    marks: 5,
    priority: 'high-yield',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'MIDWIFERY & OBSTETRICAL NURSING',
    cat: 'Midwifery & Obstetrical Nursing',
    topic: 'Puerperium',
    question: 'Explain the physiological changes during puerperium.',
    answerTitle: 'Physiological Changes During Puerperium',
    answerDefinitionLines: [
      'Puerperium is the period following childbirth during which the reproductive organs gradually return to their pre-pregnant state.',
      'It usually lasts for about 6 weeks after delivery.'
    ],
    answerPoints: [
      { heading: 'Uterine involution', text: 'The enlarged uterus gradually contracts and returns toward its pre-pregnant size and position.' },
      { heading: 'Changes in lochia', text: 'Vaginal discharge changes from lochia rubra to lochia serosa to lochia alba as healing progresses.' },
      { heading: 'Cervical changes', text: 'The cervix gradually contracts and becomes firmer, while the cervical opening slowly becomes smaller.' },
      { heading: 'Breast changes', text: 'After delivery, colostrum is produced initially, followed by breast milk secretion, mainly under the influence of prolactin and oxytocin.' },
      { heading: 'Return of reproductive function', text: 'Ovarian activity gradually resumes, with ovulation and menstruation returning at varying times, especially depending on breastfeeding.' }
    ],
    answer: 'Puerperium is the period following childbirth during which the reproductive organs gradually return to their pre-pregnant state. It usually lasts for about 6 weeks after delivery.\n\n1. Uterine involution: The enlarged uterus gradually contracts and returns toward its pre-pregnant size and position.\n\n2. Changes in lochia: Vaginal discharge changes from lochia rubra to lochia serosa to lochia alba as healing progresses.\n\n3. Cervical changes: The cervix gradually contracts and becomes firmer, while the cervical opening slowly becomes smaller.\n\n4. Breast changes: After delivery, colostrum is produced initially, followed by breast milk secretion, mainly under the influence of prolactin and oxytocin.\n\n5. Return of reproductive function: Ovarian activity gradually resumes, with ovulation and menstruation returning at varying times, especially depending on breastfeeding.',
    keywords: ['puerperium', 'uterine involution', 'lochia rubra', 'lochia serosa', 'lochia alba', 'postnatal changes', 'breast changes'],
    q: 'Explain the physiological changes during puerperium.',
    a: 'Puerperium is the period following childbirth during which the reproductive organs gradually return to their pre-pregnant state. It usually lasts for about 6 weeks after delivery.\n\n1. Uterine involution: The enlarged uterus gradually contracts and returns toward its pre-pregnant size and position.\n\n2. Changes in lochia: Vaginal discharge changes from lochia rubra to lochia serosa to lochia alba as healing progresses.\n\n3. Cervical changes: The cervix gradually contracts and becomes firmer, while the cervical opening slowly becomes smaller.\n\n4. Breast changes: After delivery, colostrum is produced initially, followed by breast milk secretion, mainly under the influence of prolactin and oxytocin.\n\n5. Return of reproductive function: Ovarian activity gradually resumes, with ovulation and menstruation returning at varying times, especially depending on breastfeeding.'
  },
  {
    id: '5m-complications-management-preterm-baby',
    marks: 5,
    priority: 'high-yield',
    subject: 'Newborn Care',
    category: 'NEWBORN CARE',
    cat: 'Newborn Care',
    topic: 'Preterm Baby',
    question: 'Explain the complications and management of a preterm baby.',
    answerTitle: 'Complications and Management of a Preterm Baby',
    answerDefinitionLines: [
      'A preterm baby is a newborn born before 37 completed weeks of gestation.',
      'Due to immature organs and systems, the baby requires careful monitoring and supportive care.'
    ],
    answerPoints: [
      { heading: 'Respiratory problems', text: 'Respiratory distress syndrome, apnoea and breathing difficulty may occur.' },
      { heading: 'Hypothermia', text: 'The baby has difficulty maintaining body temperature because of poor fat stores.' },
      { heading: 'Feeding problems', text: 'Weak sucking and immature swallowing may cause poor feeding and aspiration.' },
      { heading: 'Hypoglycaemia', text: 'Inadequate glucose stores and feeding difficulties can cause low blood glucose.' },
      { heading: 'Infection and other complications', text: 'There is increased risk of sepsis, jaundice and neurological complications.' },
      { heading: 'Maintain warmth', text: 'Keep the baby in a radiant warmer/incubator and use appropriate skin-to-skin care when stable.' },
      { heading: 'Maintain respiration', text: 'Assess breathing and oxygenation; provide oxygen or respiratory support as clinically indicated.' },
      { heading: 'Provide adequate nutrition', text: 'Initiate breast milk early when possible; provide expressed breast milk by appropriate method if sucking is inadequate.' },
      { heading: 'Prevent infection', text: 'Maintain strict hand hygiene, aseptic technique and clean cord care.' }
    ],
    keywords: ['preterm baby', 'prematurity', 'hypothermia', 'respiratory distress', 'hypoglycaemia'],
    q: 'Explain the complications and management of a preterm baby.'
  },
  {
    id: '5m-complete-incomplete-abortion',
    marks: 5,
    priority: 'high-yield',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'MIDWIFERY & OBSTETRICAL NURSING',
    cat: 'Midwifery & Obstetrical Nursing',
    topic: 'Abortion',
    question: 'Differentiate between complete abortion and incomplete abortion.',
    answerTitle: 'Complete Abortion and Incomplete Abortion',
    answerDefinitionLines: [
      'Complete abortion is the expulsion of all products of conception from the uterus following pregnancy loss.',
      'Incomplete abortion occurs when some products of conception are expelled but some remain inside the uterus.'
    ],
    answerPoints: [
      { heading: 'Products of conception', text: 'Complete abortion: completely expelled. Incomplete abortion: partially expelled.' },
      { heading: 'Bleeding', text: 'Complete abortion: bleeding becomes slight or stops. Incomplete abortion: bleeding usually continues or is heavy.' },
      { heading: 'Pain', text: 'Complete abortion: pain usually decreases after expulsion. Incomplete abortion: cramping may continue.' },
      { heading: 'Cervical os', text: 'Complete abortion: usually closes. Incomplete abortion: usually remains open.' },
      { heading: 'Uterus', text: 'Complete abortion: becomes smaller and well contracted. Incomplete abortion: may remain larger than expected.' }
    ],
    keywords: ['complete abortion', 'incomplete abortion', 'bleeding', 'cervical os'],
    q: 'Differentiate between complete abortion and incomplete abortion.'
  },
  {
    id: '5m-constricting-ring-retraction-ring',
    marks: 5,
    priority: 'high-yield',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'MIDWIFERY & OBSTETRICAL NURSING',
    cat: 'Midwifery & Obstetrical Nursing',
    topic: 'Labour Abnormalities',
    question: 'Differentiate between constricting ring and retraction ring.',
    answerTitle: 'Constricting Ring and Retraction Ring',
    answerDefinitionLines: [
      'A retraction ring is a normal physiological boundary between the thick upper and thin lower uterine segments during labour.',
      'A constricting ring is an abnormal localized uterine contraction that forms a tight ring around the fetus and may interfere with labour.'
    ],
    answerPoints: [
      { heading: 'Nature', text: 'Retraction ring is physiological; constricting ring is pathological.' },
      { heading: 'Formation', text: 'Retraction ring develops normally during labour; constricting ring develops due to abnormal localized contraction.' },
      { heading: 'Location', text: 'Retraction ring is at the junction of upper and lower uterine segments; constricting ring may occur at any level around the fetus.' },
      { heading: 'Effect', text: 'Retraction ring helps normal labour progress; constricting ring may obstruct fetal descent or interfere with delivery.' },
      { heading: 'Management', text: 'Retraction ring usually requires observation; constricting ring requires prompt assessment and appropriate obstetric management.' }
    ],
    keywords: ['constricting ring', 'retraction ring', 'labour', 'uterine segments'],
    q: 'Differentiate between constricting ring and retraction ring.'
  },
  {
    id: '5m-placenta-praevia-abruptio-placentae',
    marks: 5,
    priority: 'high-yield',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'MIDWIFERY & OBSTETRICAL NURSING',
    cat: 'Midwifery & Obstetrical Nursing',
    topic: 'Antepartum Haemorrhage',
    question: 'Differentiate between placenta praevia and abruptio placentae.',
    answerTitle: 'Placenta Praevia and Abruptio Placentae',
    answerDefinitionLines: [
      'Placenta praevia occurs when the placenta is implanted in the lower uterine segment and may lie near or over the internal cervical os.',
      'Abruptio placentae is the premature separation of a normally situated placenta before delivery of the baby.'
    ],
    answerPoints: [
      { heading: 'Bleeding', text: 'Placenta praevia: usually painless. Abruptio placentae: usually painful.' },
      { heading: 'Onset', text: 'Placenta praevia commonly presents with sudden bleeding in late pregnancy. Abruptio placentae usually presents with sudden bleeding and abdominal pain.' },
      { heading: 'Uterus', text: 'Placenta praevia: uterus is soft and usually non-tender. Abruptio placentae: uterus is tender and tense/rigid.' },
      { heading: 'Fetal condition', text: 'Placenta praevia: fetal malpresentation may occur. Abruptio placentae: fetal distress or death may occur.' },
      { heading: 'Major risk', text: 'Placenta praevia: maternal haemorrhage and malpresentation. Abruptio placentae: maternal shock, coagulopathy and fetal compromise.' }
    ],
    keywords: ['placenta praevia', 'abruptio placentae', 'bleeding', 'antepartum haemorrhage'],
    q: 'Differentiate between placenta praevia and abruptio placentae.'
  },
  {
    id: '5m-effects-gdm-mother-fetus',
    marks: 5,
    priority: 'high-yield',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'MIDWIFERY & OBSTETRICAL NURSING',
    cat: 'Midwifery & Obstetrical Nursing',
    topic: 'Gestational Diabetes Mellitus',
    question: 'Explain the effects of GDM on mother and fetus.',
    answerTitle: 'Effects of GDM on Mother and Fetus',
    answerDefinitionLines: [
      'Gestational diabetes mellitus (GDM) is glucose intolerance or diabetes first recognised during pregnancy.'
    ],
    answerPoints: [
      { heading: 'During pregnancy - mother', text: 'Increased risk of hypertension/preeclampsia, excessive weight gain and polyhydramnios.' },
      { heading: 'During pregnancy - fetus', text: 'Excessive fetal growth (macrosomia), increased fetal fat and risk of fetal complications.' },
      { heading: 'During labour - mother', text: 'Macrosomia may lead to difficult or prolonged labour and increased risk of operative delivery.' },
      { heading: 'During labour - fetus', text: 'Increased risk of shoulder dystocia, birth trauma and fetal distress.' },
      { heading: 'During puerperium and newborn period', text: 'Mother has increased future risk of type 2 diabetes mellitus. Newborn has increased risk of hypoglycaemia, jaundice and respiratory problems.' },
      { heading: 'Maternal obstetric effects', text: 'Increased risk of caesarean delivery and birth-related complications.' }
    ],
    keywords: ['GDM', 'gestational diabetes', 'macrosomia', 'shoulder dystocia', 'hypoglycaemia'],
    q: 'Explain the effects of GDM on mother and fetus.'
  },
  {
    id: '5m-management-gdm-mother',
    marks: 5,
    priority: 'high-yield',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'MIDWIFERY & OBSTETRICAL NURSING',
    cat: 'Midwifery & Obstetrical Nursing',
    topic: 'Gestational Diabetes Mellitus',
    question: 'Describe the medical and obstetrical management of a mother with GDM.',
    answerTitle: 'Medical and Obstetrical Management of GDM',
    answerDefinitionLines: [
      'Management of GDM aims to maintain maternal blood glucose within the desired range and prevent maternal, fetal and neonatal complications.'
    ],
    answerPoints: [
      { heading: 'Dietary management', text: 'Provide a balanced diet with appropriate calories and controlled carbohydrate intake.' },
      { heading: 'Blood glucose control', text: 'Monitor fasting and postprandial blood glucose regularly.' },
      { heading: 'Medication', text: 'If glucose targets are not achieved through diet and appropriate activity, administer insulin or other prescribed therapy.' },
      { heading: 'Fetal and maternal monitoring', text: 'Regularly monitor maternal blood pressure, weight and glycaemic control.' }
    ],
    keywords: ['GDM', 'gestational diabetes', 'diet', 'insulin', 'blood glucose'],
    q: 'Describe the medical and obstetrical management of a mother with GDM.'
  },
  {
    id: '5m-immediate-assessment-mother',
    marks: 5,
    priority: 'high-yield',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'MIDWIFERY & OBSTETRICAL NURSING',
    cat: 'Midwifery & Obstetrical Nursing',
    topic: 'Immediate Postpartum Assessment',
    question: 'Describe the immediate assessment of the mother after delivery.',
    answerTitle: 'Immediate Assessment of the Mother',
    answerDefinitionLines: [
      'Immediate maternal assessment is the systematic assessment of the mother immediately after delivery to ensure her stability and detect complications early.',
      'It focuses mainly on vital signs, bleeding, uterine contraction and general condition.'
    ],
    answerPoints: [
      { heading: 'Vital signs', text: 'Assess pulse, blood pressure, respiration and temperature.' },
      { heading: 'Uterine contraction', text: 'Palpate the fundus to ensure that the uterus is firm and well contracted.' },
      { heading: 'Vaginal bleeding', text: 'Assess the amount and character of lochia and look for excessive bleeding.' },
      { heading: 'Birth canal', text: 'Inspect the perineum, vagina and cervix for tears, haematoma or other trauma.' },
      { heading: 'General condition', text: 'Assess consciousness, pallor, pain, bladder status and signs of shock or other complications.' }
    ],
    keywords: ['postpartum assessment', 'vital signs', 'uterus', 'bleeding', 'lochia'],
    q: 'Describe the immediate assessment of the mother after delivery.'
  },
  {
    id: '5m-physiological-changes-first-stage-labour',
    marks: 5,
    priority: 'high-yield',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'MIDWIFERY & OBSTETRICAL NURSING',
    cat: 'Midwifery & Obstetrical Nursing',
    topic: 'First Stage of Labour',
    question: 'Explain the physiological changes during the first stage of labour.',
    answerTitle: 'Physiological Changes During the First Stage of Labour',
    answerDefinitionLines: [
      'Physiological changes during the first stage of labour include formation of upper and lower uterine segments, polarity of the uterus and action of the bag of membranes.'
    ],
    answerPoints: [
      { heading: 'Upper uterine segment', text: 'The upper part of the uterus becomes thick and contracts strongly during labour.' },
      { heading: 'Lower uterine segment', text: 'The lower part becomes thinner and stretches to accommodate the descending fetus.' },
      { heading: 'Retraction and cervical dilatation', text: 'Muscle fibres of the upper segment retract after each contraction and pull the cervix upward, helping effacement and dilatation.' },
      { heading: 'Polarity of the uterus', text: 'The upper segment contracts and retracts while the lower segment relaxes, allowing fetal descent.' },
      { heading: 'Bag of membranes', text: 'Forewaters bulge through the cervix during contractions and hydrostatic pressure assists cervical dilatation until membranes rupture spontaneously or artificially.' }
    ],
    keywords: ['first stage labour', 'upper uterine segment', 'lower uterine segment', 'polarity', 'bag of membranes'],
    q: 'Explain the physiological changes during the first stage of labour.'
  },
  {
    id: '5m-immediate-care-mother-baby-first-hour',
    marks: 5,
    priority: 'high-yield',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'MIDWIFERY & OBSTETRICAL NURSING',
    cat: 'Midwifery & Obstetrical Nursing',
    topic: 'Immediate Postnatal Care',
    question: 'Describe the immediate care of mother and baby during the first hour after delivery.',
    answerTitle: 'Immediate Care of Mother and Baby During the First Hour',
    answerPoints: [
      { heading: 'Mother - monitor vital signs', text: 'Check pulse, blood pressure, respiration and general condition regularly.' },
      { heading: 'Mother - assess uterus and bleeding', text: 'Ensure the uterus remains firm and monitor vaginal blood loss.' },
      { heading: 'Mother - check perineum and comfort', text: 'Assess for tears, swelling or haematoma, provide perineal care, warmth, fluids, nutrition, rest and assist with bladder emptying.' },
      { heading: 'Mother - support breastfeeding', text: 'Encourage early skin-to-skin contact and initiation of breastfeeding.' },
      { heading: 'Baby - maintain warmth', text: 'Dry the newborn, remove wet linen and maintain skin-to-skin contact.' },
      { heading: 'Baby - assess breathing and circulation', text: 'Assess breathing, heart rate, colour and muscle tone.' },
      { heading: 'Baby - cord care and observation', text: 'Clamp/cut the cord appropriately, observe for bleeding, identify the newborn, administer recommended prophylaxis and monitor temperature and general condition.' },
      { heading: 'Baby - early breastfeeding', text: 'Initiate breastfeeding as soon as possible, preferably within the first hour.' }
    ],
    keywords: ['first hour after delivery', 'mother care', 'newborn care', 'skin-to-skin', 'breastfeeding'],
    q: 'Describe the immediate care of mother and baby during the first hour after delivery.'
  },
  {
    id: '5m-caput-succedaneum-cephalhaematoma',
    marks: 5,
    priority: 'high-yield',
    subject: 'Newborn Care',
    category: 'NEWBORN CARE',
    cat: 'Newborn Care',
    topic: 'Birth Injuries',
    question: 'Differentiate between caput succedaneum and cephalhaematoma.',
    answerTitle: 'Caput Succedaneum and Cephalhaematoma',
    answerDefinitionLines: [
      'Caput succedaneum is a diffuse, soft swelling of the newborn scalp caused by oedema of the tissues during labour.',
      'Cephalhaematoma is a collection of blood beneath the periosteum of a skull bone, usually caused by birth trauma.'
    ],
    answerPoints: [
      { heading: 'Site', text: 'Caput succedaneum involves scalp tissues. Cephalhaematoma is beneath the periosteum.' },
      { heading: 'Onset', text: 'Caput is present at birth. Cephalhaematoma usually appears several hours after birth.' },
      { heading: 'Crosses sutures', text: 'Caput crosses suture lines. Cephalhaematoma does not cross suture lines.' },
      { heading: 'Consistency', text: 'Caput is soft and diffuse oedema. Cephalhaematoma is firm/fluctuant localized swelling.' },
      { heading: 'Resolution', text: 'Caput usually disappears within a few days. Cephalhaematoma takes weeks to months to resolve.' }
    ],
    keywords: ['caput succedaneum', 'cephalhaematoma', 'newborn scalp swelling', 'birth injury'],
    q: 'Differentiate between caput succedaneum and cephalhaematoma.'
  }
];

if (typeof window !== 'undefined') {
  window.FIVE_MARK_QUESTIONS = FIVE_MARK_QUESTIONS;
}
if (typeof module !== 'undefined') module.exports = { FIVE_MARK_QUESTIONS };

