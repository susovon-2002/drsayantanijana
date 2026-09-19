const FOUR_MARK_QUESTIONS = [
  {
    id: '4m-001',
    subject: 'Newborn Care',
    category: 'Newborn Care',
    topic: 'Essential Newborn Care',
    question: 'Write the essential newborn care given after birth.',
    answer: 'Definition: Essential newborn care is the basic care given to every newborn immediately after birth and during the early neonatal period. It aims to maintain normal body functions, prevent infection and promote healthy growth and development.\n\n1. Maintain warmth: Dry the baby immediately, remove wet linen and maintain skin-to-skin contact.\n2. Ensure breathing: Assess breathing, heart rate and colour and provide resuscitation when required.\n3. Cord care: Clamp and cut the cord using clean/aseptic technique and observe for bleeding.\n4. Early breastfeeding: Initiate breastfeeding as soon as possible, preferably within the first hour.',
    priority: 'high-yield',
    marks: 4
  },
  {
    id: '4m-causes-anaemia-pregnancy',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Anaemia in Pregnancy',
    question: 'Write the causes of anaemia during pregnancy.',
    answer: 'Definition: Anaemia during pregnancy is a condition in which the haemoglobin level is below the normal level required during pregnancy. It commonly occurs when maternal iron and other nutrient requirements are not adequately met.\n\n1. Iron deficiency: Inadequate dietary iron intake or inadequate iron stores before pregnancy.\n2. Increased iron requirement: Increased demand occurs due to expansion of maternal blood volume and growth of the fetus and placenta.\n3. Folate and other nutritional deficiencies: Inadequate folic acid, vitamin B12 or protein may contribute to anaemia.\n4. Blood loss and infections: Previous blood loss, repeated pregnancies, parasitic infestation and chronic infections may contribute.',
    priority: 'high-yield',
    marks: 4
  },
  {
    id: '4m-management-iron-deficiency-anaemia-pregnancy',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Anaemia in Pregnancy',
    question: 'Explain the preventive and actual management of iron deficiency anaemia during pregnancy.',
    answer: 'A. Preventive Management:\n1. Iron-rich diet: Encourage green leafy vegetables, pulses, meat, eggs and other iron-rich foods along with vitamin-C-rich foods.\n2. Iron-folic acid supplementation: Provide prescribed iron and folic acid regularly during pregnancy.\n3. Regular antenatal care: Screen haemoglobin periodically and identify anaemia early.\n4. Health education: Teach compliance with supplements, nutrition, hygiene and prevention/treatment of worm infestation.\n\nB. Actual Management:\n1. Assess severity and cause: Check haemoglobin and investigate nutritional deficiency, blood loss, infection or other causes.\n2. Therapeutic iron: Give therapeutic-dose oral iron as prescribed; assess response and adherence.\n3. Parenteral iron: Consider intravenous/parenteral iron when oral iron is ineffective, not tolerated or when rapid correction is clinically required.\n4. Severe anaemia: Severe/symptomatic cases require medical or hospital management; blood transfusion may be required when clinically indicated.',
    priority: 'high-yield',
    marks: 4
  },
  {
    id: '4m-medical-termination-pregnancy',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Medical Termination of Pregnancy',
    question: 'Write a short note on MTP.',
    answer: 'Definition: MTP is the intentional termination of pregnancy by medical or surgical methods under appropriate medical supervision. It is performed when legally and clinically indicated to protect the woman\'s health or for other permitted indications.\n\n1. Medical method: Prescribed medicines are used to terminate an early pregnancy.\n2. Surgical method: Procedures such as vacuum aspiration may be used when indicated.\n3. Indications: May include risk to maternal health, certain fetal conditions and other legally permitted circumstances.\n4. Nursing care: Provide counselling, maintain privacy, monitor bleeding and vital signs, and provide follow-up and contraceptive advice.',
    priority: 'high-yield',
    marks: 4
  },
  {
    id: '4m-fertilization-implantation',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Fertilization and Implantation',
    question: 'Write a short note on fertilization and implantation.',
    answer: 'Definition: Fertilization is the fusion of the male and female gametes to form a zygote, usually occurring in the fallopian tube. Implantation is the attachment and embedding of the developing blastocyst into the uterine endometrium.\n\n1. Fertilization: Sperm penetrates the ovum and fusion of nuclei forms the zygote.\n2. Cleavage: The zygote undergoes repeated cell division while moving toward the uterus.\n3. Blastocyst formation: The developing conceptus forms a blastocyst before implantation.\n4. Implantation: The blastocyst attaches to and becomes embedded in the prepared endometrium.\n\nEasy Recall: Sperm + Ovum -> Zygote -> Cleavage -> Blastocyst -> Implantation.',
    priority: 'high-yield',
    marks: 4
  },
  {
    id: '4m-abnormalities-placenta-cord',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Placenta and Cord Abnormalities',
    question: 'Write a short note on abnormalities of placenta and cord.',
    answer: 'Definition: Placental and umbilical cord abnormalities are structural or positional abnormalities that may affect pregnancy, labour or fetal well-being. They may require antenatal detection and appropriate obstetric management.\n\nPlacental abnormalities:\n1. Placenta praevia: Placenta is implanted in the lower uterine segment and may cover the cervical opening.\n2. Placental abruption: Premature separation of a normally situated placenta before delivery.\n\nCord abnormalities:\n3. Cord prolapse: Umbilical cord descends alongside or ahead of the presenting part.\n4. Cord abnormalities: Abnormalities such as abnormal cord length, true knot or abnormal cord insertion may occur.',
    priority: 'high-yield',
    marks: 4
  },
  {
    id: '4m-true-false-labour-pain',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'True and False Labour',
    question: 'Differentiate between true labour pain and false labour pain.',
    answer: '1. Regularity: True labour has regular contractions; false labour has irregular contractions.\n2. Intensity: True labour gradually increases in intensity; false labour usually does not progressively increase.\n3. Duration: True labour contractions become longer; false labour contractions usually remain similar.\n4. Effect on cervix: True labour causes effacement and dilatation; false labour has no progressive cervical dilatation.\n5. Effect of activity: True labour usually continues despite activity/rest; false labour may decrease with rest or change of activity.\n\nEasy Recall: True labour = Regular + Increasing + Cervical dilatation. False labour = Irregular + No progression + No cervical dilatation.',
    priority: 'high-yield',
    marks: 4
  },
  {
    id: '4m-induction-of-labour',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Induction of Labour',
    question: 'Write a short note on induction of labour.',
    answer: 'Definition: Induction of labour is the artificial initiation of uterine contractions before spontaneous onset of labour to achieve vaginal birth. It is performed when continuing the pregnancy is considered less appropriate than delivery.\n\n1. Indications: May include post-term pregnancy, certain maternal disorders, fetal compromise or other obstetric indications.\n2. Cervical assessment: Assess cervical favourability, commonly using the Bishop score.\n3. Methods: Cervical ripening may be achieved with medicines or mechanical methods; uterine contractions may be initiated with oxytocin or other appropriate methods.\n4. Monitoring: Continuously/regularly assess maternal condition, uterine contractions and fetal heart rate and watch for complications.',
    priority: 'high-yield',
    marks: 4
  },
  {
    id: '4m-preventive-measures-puerperal-sepsis',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Puerperal Sepsis',
    question: 'Write the preventive measures for puerperal sepsis.',
    answer: '1. Aseptic technique: Maintain strict hand hygiene and use sterile/clean instruments during delivery and procedures.\n2. Clean delivery practices: Ensure clean surroundings, clean delivery surface and proper cord and perineal care.\n3. Prevent prolonged labour and prolonged rupture of membranes: Monitor labour appropriately and manage complications promptly.\n4. Postnatal hygiene and observation: Teach perineal hygiene, monitor temperature and lochia, and identify infection early.',
    priority: 'high-yield',
    marks: 4
  },
  {
    id: '4m-management-puerperal-sepsis',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Puerperal Sepsis',
    question: 'Explain the medical and nursing management of puerperal sepsis.',
    answer: '1. Assessment and investigations: Assess vital signs, uterine tenderness, lochia and general condition; obtain appropriate investigations/cultures as indicated.\n2. Antibiotic therapy: Administer prescribed broad-spectrum antibiotics promptly and adjust treatment according to clinical response/culture results.\n3. Fluid and supportive therapy: Provide adequate IV/oral fluids, nutrition, rest and other supportive treatment; manage sepsis or shock urgently if present.\n4. Nursing care and monitoring: Maintain aseptic technique, provide perineal care, monitor temperature, pulse, BP, urine output and lochia, and report deterioration promptly.',
    priority: 'high-yield',
    marks: 4
  },
  {
    id: '4m-causes-pph',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Postpartum Haemorrhage',
    question: 'Write the causes of PPH.',
    answer: 'Definition: Postpartum haemorrhage (PPH) is excessive bleeding occurring after childbirth. The major causes are commonly remembered by the 4 Ts.\n\n1. Tone: Uterine atony or failure of the uterus to contract effectively.\n2. Tissue: Retained placenta or retained products of conception.\n3. Trauma: Cervical, vaginal or perineal tears, haematoma or uterine rupture.\n4. Thrombin: Coagulation disorders causing impaired blood clotting.',
    priority: 'high-yield',
    marks: 4
  },
  {
    id: '4m-management-atonic-pph',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Postpartum Haemorrhage',
    question: 'Describe the management of a mother with atonic PPH.',
    answer: 'Definition: Atonic PPH occurs when the uterus fails to contract adequately after delivery, resulting in excessive postpartum bleeding. The priority is to control bleeding, restore circulation and identify other causes.\n\n1. Immediate assessment: Call for help, assess blood loss, monitor pulse and BP, and assess uterine tone.\n2. Uterine massage: Perform fundal/uterine massage and remove clots as appropriate to stimulate contraction.\n3. Uterotonic drugs: Administer prescribed oxytocin and other appropriate uterotonics according to the clinical situation.\n4. Fluid, blood and escalation: Establish IV access, give IV fluids/blood products when indicated, identify retained tissue or trauma, and prepare for balloon tamponade or surgical treatment if bleeding persists.',
    priority: 'high-yield',
    marks: 4
  },
  {
    id: '4m-complications-preterm-newborn',
    subject: 'Newborn Care',
    category: 'Newborn Care',
    topic: 'Preterm Newborn',
    question: 'Write the complications of a preterm newborn.',
    answer: 'Definition: A preterm newborn is a baby born before 37 completed weeks of gestation. Prematurity can affect several organ systems because the newborn organs are not fully mature.\n\n1. Respiratory complications: Respiratory distress syndrome and apnoea may occur due to immature lungs.\n2. Hypothermia: Inadequate body fat and immature temperature regulation cause difficulty maintaining body temperature.\n3. Feeding and metabolic problems: Poor feeding, hypoglycaemia and fluid/electrolyte disturbances may occur.\n4. Infection and neurological complications: Increased susceptibility to sepsis and complications related to immature nervous-system function.',
    priority: 'high-yield',
    marks: 4
  },
  {
    id: '4m-physiological-characteristics-preterm-newborn',
    subject: 'Newborn Care',
    category: 'Newborn Care',
    topic: 'Preterm Newborn',
    question: 'Write the physiological characteristics of a preterm newborn.',
    answer: 'Definition: A preterm newborn is a baby born before 37 completed weeks of gestation. The baby shows physiological immaturity because several body systems are not fully developed.\n\n1. Respiratory immaturity: Breathing may be irregular, with respiratory distress or apnoea.\n2. Poor temperature regulation: The baby loses heat easily and is prone to hypothermia.\n3. Immature feeding ability: Weak sucking and poor coordination of sucking, swallowing and breathing may cause feeding difficulty.\n4. Metabolic immaturity: There is increased risk of hypoglycaemia, jaundice and fluid/electrolyte imbalance.',
    priority: 'high-yield',
    marks: 4
  },
  {
    id: '4m-principles-management-preterm-newborn',
    subject: 'Newborn Care',
    category: 'Newborn Care',
    topic: 'Preterm Newborn',
    question: 'Write the principles of management of a preterm newborn.',
    answer: 'Definition: Management of a preterm newborn aims to support immature body systems, prevent complications and promote normal growth and development. Care should be provided with close monitoring and specialized neonatal support when required.\n\n1. Maintain warmth: Use a radiant warmer/incubator and prevent unnecessary heat loss; provide skin-to-skin care when appropriate.\n2. Maintain adequate respiration: Assess breathing and oxygenation and provide oxygen or respiratory support when clinically indicated.\n3. Provide adequate nutrition: Give breast milk early when possible; use expressed breast milk by an appropriate method if sucking is inadequate.\n4. Prevent infection and monitor: Maintain strict hand hygiene and asepsis and monitor temperature, breathing, heart rate, blood glucose, weight and jaundice.',
    priority: 'high-yield',
    marks: 4
  },
  {
    id: '4m-physiological-changes-puerperium',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Puerperium',
    question: 'Explain the physiological changes during puerperium.',
    answer: 'Definition: Puerperium is the period following childbirth during which the reproductive organs gradually return to their pre-pregnant state. It generally extends for about 6 weeks after delivery.\n\n1. Uterine involution: The uterus gradually decreases in size and returns towards its pre-pregnant condition.\n2. Lochia: Vaginal discharge changes from lochia rubra to serosa to alba and gradually decreases.\n3. Cervical and vaginal changes: The cervix and vagina gradually regain their pre-pregnancy tone and size.\n4. Breast and lactation changes: Colostrum is produced initially, followed by establishment of mature breast milk and breastfeeding.',
    priority: 'high-yield',
    marks: 4
  },
  {
    id: '4m-management-normal-puerperium',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Puerperium',
    question: 'Describe the management of normal puerperium.',
    answer: 'Definition: Management of normal puerperium aims to maintain the mother health, promote recovery and prevent postpartum complications. It includes observation, hygiene, nutrition, breastfeeding support and health education.\n\n1. Monitor mother: Regularly assess vital signs, uterine involution, fundal height and lochia for early detection of complications.\n2. Maintain hygiene and comfort: Provide perineal care, encourage adequate rest, fluids, nutrition and gradual ambulation.\n3. Promote breastfeeding: Encourage early and exclusive breastfeeding, correct positioning and proper attachment of the baby.\n4. Health education and follow-up: Advise on danger signs, personal hygiene, nutrition, family planning, newborn care and postnatal follow-up.',
    priority: 'high-yield',
    marks: 4
  },
  {
    id: '4m-immediate-care-preterm-newborn-labour-room',
    subject: 'Newborn Care',
    category: 'Newborn Care',
    topic: 'Preterm Newborn',
    question: 'Describe the immediate care of a newborn in the labour room in preterm labour.',
    answer: 'Definition: Immediate care of a preterm newborn focuses on establishing effective breathing, maintaining body temperature and preventing complications. The baby requires careful observation because prematurity increases the risk of respiratory and metabolic problems.\n\n1. Maintain warmth: Receive the baby under a radiant warmer, dry immediately and prevent heat loss; use skin-to-skin care when clinically appropriate.\n2. Assess and support breathing: Assess breathing, heart rate and tone; provide resuscitation/respiratory support according to the baby\'s condition.\n3. Prevent infection and provide cord care: Use clean/aseptic technique, provide appropriate cord care and minimize unnecessary handling.\n4. Monitor and transfer for specialized care: Monitor temperature, breathing, heart rate and blood glucose as indicated; arrange NICU/specialized neonatal care when required.',
    priority: 'high-yield',
    marks: 4
  },
  {
    id: '4m-32-week-primigravida-signs-symptoms',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Antenatal Care',
    question: 'Write the expected signs and symptoms at 32 weeks of pregnancy in a primigravida.',
    answer: 'Definition: At 32 weeks, a primigravida is in the third trimester and experiences normal maternal and fetal changes due to advancing pregnancy.\n\n1. Abdominal enlargement: Progressive increase in abdominal size due to the growing fetus and uterus.\n2. Fetal movements: The mother should perceive regular fetal movements.\n3. Breast changes: Breasts are enlarged and may show colostrum secretion.\n4. Urinary frequency and backache: Pressure from the enlarged uterus may cause increased urination and back discomfort.',
    priority: 'high-yield',
    marks: 4
  },
  {
    id: '4m-third-trimester-minor-ailments',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Antenatal Care',
    question: 'Write the common minor ailments of the third trimester.',
    answer: 'Definition: Minor ailments are common discomforts occurring during pregnancy because of hormonal and mechanical changes. They are generally manageable with appropriate advice and reassurance.\n\n1. Backache: Caused mainly by increased abdominal weight and altered posture.\n2. Heartburn: May occur due to pressure of the enlarged uterus and relaxation of the gastro-oesophageal sphincter.\n3. Constipation: Hormonal changes and pressure of the uterus may slow bowel movement.\n4. Leg cramps and oedema: Leg cramps and mild dependent swelling may occur in late pregnancy.',
    priority: 'high-yield',
    marks: 4
  },
  {
    id: '4m-clinical-assessment-maternal-fetal-wellbeing',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Antenatal Care',
    question: 'Describe the clinical assessment of maternal and fetal well-being at the antenatal clinic.',
    answer: 'Definition: Antenatal clinical assessment is the systematic examination of the mother and fetus to monitor normal pregnancy and detect complications early.\n\n1. Maternal vital signs: Measure blood pressure, pulse, respiration and temperature; check for pallor and oedema.\n2. Weight and general examination: Record maternal weight and assess nutritional and general health status.\n3. Abdominal/obstetric examination: Measure fundal height, assess lie, presentation, position and engagement of the fetus.\n4. Fetal assessment: Assess fetal heart rate and fetal movements; arrange appropriate investigations such as ultrasonography when clinically indicated.',
    priority: 'high-yield',
    marks: 4
  },
  {
    id: '4m-define-normal-labour',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Normal Labour',
    question: 'Define normal labour and mention its main features.',
    answer: 'Definition: Normal labour is the spontaneous process by which a single, viable fetus in vertex presentation is delivered through the birth canal at term. It occurs without significant maternal or fetal complications and is completed within the expected duration.\n\n1. Spontaneous onset: Labour starts naturally without artificial induction.\n2. Term pregnancy: Occurs approximately between 37-42 completed weeks.\n3. Vertex presentation: The fetus is usually in cephalic/vertex presentation.\n4. Normal progress: Labour progresses with progressive cervical dilatation and ends in vaginal delivery without major complications.',
    priority: 'high-yield',
    marks: 4
  },
  {
    id: '4m-assessment-second-stage-labour',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Second Stage of Labour',
    question: 'Describe the assessment of a mother in the second stage of labour.',
    answer: 'Definition: The second stage of labour begins with full cervical dilatation and ends with the complete birth of the baby. Assessment focuses on maternal condition, fetal well-being and progress of fetal descent.\n\n1. Maternal vital signs: Assess pulse, blood pressure, respiration and general condition.\n2. Uterine contractions: Assess frequency, duration and strength of contractions.\n3. Fetal heart rate: Monitor fetal heart rate regularly to detect fetal distress.\n4. Descent and progress: Assess fetal descent, presentation and position and observe for signs of imminent birth.',
    priority: 'high-yield',
    marks: 4
  },
  {
    id: '4m-management-second-stage-labour',
    subject: 'Midwifery & Obstetrical Nursing',
    category: 'Midwifery & Obstetrical Nursing',
    topic: 'Second Stage of Labour',
    question: 'Explain the management of the second stage of labour.',
    answer: '1. Prepare mother and equipment: Maintain privacy, asepsis and prepare necessary delivery equipment and newborn resuscitation facilities.\n2. Monitor mother and fetus: Regularly assess maternal vital signs, contractions and fetal heart rate.\n3. Support effective pushing: Encourage the woman to push with contractions when fully dilated and provide comfortable positioning and emotional support.\n4. Conduct safe delivery: Assist controlled birth of the head and shoulders, check for cord problems, complete delivery and provide immediate newborn care.',
    priority: 'high-yield',
    marks: 4
  },
  {
    id: '4m-benefits-skin-to-skin-contact',
    subject: 'Newborn Care',
    category: 'Newborn Care',
    topic: 'Essential Newborn Care',
    question: 'Write the benefits of skin-to-skin contact.',
    answer: 'Definition: Skin-to-skin contact means placing the naked or appropriately covered newborn directly on the mother bare chest soon after birth. It promotes physiological stability and supports early mother-baby bonding and breastfeeding.\n\n1. Maintains body temperature: Maternal body warmth helps prevent neonatal hypothermia.\n2. Improves breathing and heart rate: Promotes physiological stability in the newborn.\n3. Promotes breastfeeding: Supports early initiation and improves breastfeeding behaviour.\n4. Enhances bonding: Promotes emotional attachment between mother and newborn and helps calm the baby.',
    priority: 'high-yield',
    marks: 4
  },
  {
    id: '4m-resuscitation-asphyxiated-newborn',
    subject: 'Newborn Care',
    category: 'Newborn Care',
    topic: 'Neonatal Resuscitation',
    question: 'Describe the resuscitation of an asphyxiated newborn soon after birth.',
    answer: 'Definition: Neonatal resuscitation is the immediate supportive procedure used to establish effective breathing and circulation in a newborn who does not breathe adequately after birth. The priority is to provide effective ventilation promptly while maintaining warmth.\n\n1. Provide warmth and initial assessment: Place the baby under a radiant warmer, dry thoroughly and assess breathing and heart rate.\n2. Open the airway: Position the head appropriately and clear the airway only when indicated.\n3. Stimulate breathing: Provide gentle stimulation; if the baby remains apnoeic/gasping, begin positive-pressure ventilation.\n4. Positive-pressure ventilation and escalation: Provide effective ventilation and reassess heart rate; if the heart rate remains below 60/min despite effective ventilation, begin chest compressions with ventilation and proceed according to neonatal resuscitation protocol.',
    priority: 'high-yield',
    marks: 4
  }
];
if (typeof window !== 'undefined') window.FOUR_MARK_QUESTIONS = FOUR_MARK_QUESTIONS;
if (typeof module !== 'undefined') module.exports = { FOUR_MARK_QUESTIONS };
