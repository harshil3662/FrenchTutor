export const CURRICULUM_LESSONS = [
  // ================= A1: BEGINNER =================
  {
    id: 'a1-unit1-l1',
    level: 'A1',
    unit: 1,
    title: 'Salutations & Présentations',
    subtitle: 'Greetings, Politeness & Introducing Yourself',
    description: 'Learn how to **say hello**, **introduce yourself**, ask someone their name, and use French **politeness markers**.',
    category: 'Conversation',
    durationMinutes: 6,
    xpReward: 30,
    grammarTip: {
      title: 'Tu vs. Vous & Essential Politeness',
      rules: [
        'Use **« Tu »** with close friends, family, children, and peers.',
        'Use **« Vous »** for formal situations, strangers, elders, or addressing more than one person.',
        'Always include **« S\'il vous plaît »** (Please) and **« Merci »** (Thank you) in every interaction in France.'
      ],
      examples: [
        { french: 'Comment vous appelez-vous ?', english: 'What is your name? (Formal)' },
        { french: 'Je m\'appelle Sophie, enchantée !', english: 'My name is Sophie, delighted to meet you!' },
        { french: 'Comment vas-tu ? — Ça va très bien, merci !', english: 'How are you? — Doing very well, thank you!' }
      ]
    },
    vocabulary: [
      { french: 'Bonjour', english: 'Hello / Good morning', ipa: '/bɔ̃.ʒuʁ/', sampleSentence: 'Bonjour monsieur, comment allez-vous ?', sampleTranslation: 'Hello sir, how are you?' },
      { french: 'Bonsoir', english: 'Good evening', ipa: '/bɔ̃.swaʁ/', sampleSentence: 'Bonsoir à tous et bienvenue !', sampleTranslation: 'Good evening everyone and welcome!' },
      { french: 'S\'il vous plaît', english: 'Please (formal)', ipa: '/s‿il vu plɛ/', sampleSentence: 'Un café, s\'il vous plaît.', sampleTranslation: 'A coffee, please.' },
      { french: 'Enchanté(e)', english: 'Nice to meet you', ipa: '/ɑ̃.ʃɑ̃.te/', sampleSentence: 'Enchanté de faire votre connaissance.', sampleTranslation: 'Pleased to make your acquaintance.' },
      { french: 'Au revoir', english: 'Goodbye', ipa: '/o ʁə.vwaʁ/', sampleSentence: 'Au revoir et à bientôt !', sampleTranslation: 'Goodbye and see you soon!' }
    ],
    exercises: [
      {
        id: 'ex1-1',
        type: 'multiple-choice',
        prompt: 'How do you greet a store clerk politely in the morning in France?',
        options: ['Salut mec !', 'Bonjour madame / monsieur', 'Bonne nuit', 'À plus tard'],
        correctAnswer: 'Bonjour madame / monsieur',
        explanation: 'In French culture, greeting the shopkeeper with "Bonjour madame/monsieur" upon entering is an essential sign of respect.'
      },
      {
        id: 'ex1-2',
        type: 'fill-blank',
        prompt: 'Complete the self-introduction: "Je ___ Paul."',
        options: ['m\'appelle', 'appelle', 'suis appelé', 'avoir'],
        correctAnswer: 'm\'appelle',
        hint: 'From the reflexive verb s\'appeler (to be called).',
        explanation: '"Je m\'appelle" literally translates to "I call myself".'
      },
      {
        id: 'ex1-3',
        type: 'sentence-builder',
        prompt: 'Assemble the polite phrase: "Un café s\'il vous plaît"',
        words: ['plaît', 'Un', 's\'il', 'café', 'vous'],
        correctAnswer: 'Un café s\'il vous plaît',
        explanation: '"Un café s\'il vous plaît" is the quintessential French coffee order.'
      },
      {
        id: 'ex1-4',
        type: 'translation',
        prompt: 'Translate to French: "Nice to meet you!"',
        options: ['Enchanté', 'Merci beaucoup', 'Pardon', 'S\'il vous plaît'],
        correctAnswer: 'Enchanté',
        explanation: '"Enchanté" (or "Enchantée" for female speaker) is used when introduced to someone.'
      }
    ]
  },
  {
    id: 'a1-unit1-l2',
    level: 'A1',
    unit: 1,
    title: 'Au Café & Le Genre des Noms',
    subtitle: 'Ordering at a Café, Masculine vs Feminine',
    description: 'Understand French articles (un/une, le/la) and order drinks and pastries at a traditional bistro.',
    category: 'Grammar',
    durationMinutes: 8,
    xpReward: 35,
    grammarTip: {
      title: 'French Noun Genders: Masculin vs. Féminin',
      rules: [
        'Every French noun has a grammatical gender: Masculine (un / le) or Feminine (une / la).',
        'Nouns ending in -tion, -ée, -ure, -té are usually FEMININE (ex: la réservation, la baguette).',
        'Nouns ending in -age, -ment, -eau are usually MASCULINE (ex: le fromage, le croissant, le gâteau).'
      ],
      examples: [
        { french: 'Un croissant et une brioche', english: 'A croissant (m) and a brioche (f)' },
        { french: 'Le serveur apporte l\'addition', english: 'The waiter brings the bill' }
      ]
    },
    vocabulary: [
      { french: 'Le café', english: 'The espresso / coffee', gender: 'masculine', ipa: '/lə ka.fe/', sampleSentence: 'Je voudrais un café noir, s\'il vous plaît.', sampleTranslation: 'I would like a black coffee, please.' },
      { french: 'Le croissant', english: 'The croissant', gender: 'masculine', ipa: '/lə kʁwa.sɑ̃/', sampleSentence: 'Le croissant au beurre est délicieux.', sampleTranslation: 'The butter croissant is delicious.' },
      { french: 'La baguette', english: 'The baguette', gender: 'feminine', ipa: '/la ba.ɡɛt/', sampleSentence: 'Une baguette bien cuite, s\'il vous plaît.', sampleTranslation: 'A well-baked baguette, please.' },
      { french: 'L\'addition', english: 'The bill / check', gender: 'feminine', ipa: '/l‿a.di.sjɔ̃/', sampleSentence: 'L\'addition, s\'il vous plaît.', sampleTranslation: 'The bill, please.' },
      { french: 'L\'eau minérale', english: 'Mineral water', gender: 'feminine', ipa: '/l‿o mi.ne.ʁal/', sampleSentence: 'Une carafe d\'eau, s\'il vous plaît.', sampleTranslation: 'A jug of tap water, please.' }
    ],
    exercises: [
      {
        id: 'ex2-1',
        type: 'multiple-choice',
        prompt: 'Which article correctly fits: "___ croissant" ?',
        options: ['Un (masculine)', 'Une (feminine)', 'Des (plural)', 'De la'],
        correctAnswer: 'Un (masculine)',
        explanation: 'Croissant is a masculine noun in French: "un croissant".'
      },
      {
        id: 'ex2-2',
        type: 'multiple-choice',
        prompt: 'How do you ask for the bill at a French café?',
        options: ['Combien de temps ?', 'L\'addition, s\'il vous plaît', 'Où sont les toilettes ?', 'Le menu pourboire'],
        correctAnswer: 'L\'addition, s\'il vous plaît',
        explanation: '"L\'addition, s\'il vous plaît" is the standard phrase used to request the bill.'
      },
      {
        id: 'ex2-3',
        type: 'sentence-builder',
        prompt: 'Assemble: "Je voudrais un verre d\'eau"',
        words: ['d\'eau', 'un', 'voudrais', 'verre', 'Je'],
        correctAnswer: 'Je voudrais un verre d\'eau',
        explanation: '"Je voudrais" means "I would like" and is the polite conditional form of vouloir.'
      }
    ]
  },
  {
    id: 'a1-unit2-l1',
    level: 'A1',
    unit: 2,
    title: 'Les Verbes Clés : Être et Avoir',
    subtitle: 'The Pillars of French: To Be & To Have',
    description: 'Master the two most important verbs in French: Être (to be) and Avoir (to have).',
    category: 'Grammar',
    durationMinutes: 8,
    xpReward: 40,
    grammarTip: {
      title: 'Conjugation of Être & Avoir (Présent)',
      rules: [
        'Être: Je suis, Tu es, Il/Elle/On est, Nous sommes, Vous êtes, Ils/Elles sont',
        'Avoir: J\'ai, Tu as, Il/Elle/On a, Nous avons, Vous avez, Ils/Elles ont',
        'In French, age, hunger, and thirst use AVOIR: "J\'ai 25 ans" (I have 25 years), "J\'ai faim" (I am hungry).'
      ],
      examples: [
        { french: 'Je suis américain et j\'ai faim.', english: 'I am American and I am hungry.' },
        { french: 'Nous sommes prêts pour la visite.', english: 'We are ready for the tour.' }
      ]
    },
    vocabulary: [
      { french: 'Être', english: 'To be', ipa: '/ɛtʁ/', sampleSentence: 'Je suis étudiant à Paris.', sampleTranslation: 'I am a student in Paris.' },
      { french: 'Avoir', english: 'To have', ipa: '/a.vwaʁ/', sampleSentence: 'J\'ai une réservation pour deux.', sampleTranslation: 'I have a reservation for two.' },
      { french: 'Avoir faim', english: 'To be hungry', ipa: '/a.vwaʁ fɛ̃/', sampleSentence: 'Est-ce que tu as faim ?', sampleTranslation: 'Are you hungry?' },
      { french: 'Avoir soif', english: 'To be thirsty', ipa: '/a.vwaʁ swaf/', sampleSentence: 'Nous avons soif après la marche.', sampleTranslation: 'We are thirsty after the walk.' }
    ],
    exercises: [
      {
        id: 'ex3-1',
        type: 'fill-blank',
        prompt: 'Fill in with the correct form of Être: "Nous ___ très contents."',
        options: ['sommes', 'êtes', 'sont', 'suis'],
        correctAnswer: 'sommes',
        explanation: 'The present tense of être with "Nous" is "sommes".'
      },
      {
        id: 'ex3-2',
        type: 'multiple-choice',
        prompt: 'How do you say "I am 28 years old" in French?',
        options: ['Je suis 28 ans', 'J\'ai 28 ans', 'Je fais 28 ans', 'J\'être 28 ans'],
        correctAnswer: 'J\'ai 28 ans',
        explanation: 'French expresses age with the verb AVOIR (to have), not être.'
      }
    ]
  },

  // ================= A2: ELEMENTARY =================
  {
    id: 'a2-unit1-l1',
    level: 'A2',
    unit: 1,
    title: 'Le Passé Composé avec Avoir et Être',
    subtitle: 'Talking About Past Events & Adventures',
    description: 'Learn how to recount memories and completed actions using auxiliary verbs and past participles.',
    category: 'Grammar',
    durationMinutes: 10,
    xpReward: 45,
    grammarTip: {
      title: 'Passé Composé Structure & Dr. & Mrs. Vandertramp',
      rules: [
        'Form: [Sujet] + [Avoir or Être au présent] + [Participe Passé].',
        'Most verbs use AVOIR (ex: J\'ai mangé, Tu as parlé, Nous avons fini).',
        'Movement and change of state verbs (Aller, Venir, Partir, Arriver, Naître, Mourir) and reflexive verbs use ÊTRE with gender/number agreement!'
      ],
      examples: [
        { french: 'Hier, nous avons visité la Tour Eiffel.', english: 'Yesterday, we visited the Eiffel Tower.' },
        { french: 'Elle est allée au marché ce matin.', english: 'She went to the market this morning.' }
      ]
    },
    vocabulary: [
      { french: 'Hier', english: 'Yesterday', ipa: '/jɛʁ/', sampleSentence: 'Hier soir, j\'ai dîné avec des amis.', sampleTranslation: 'Yesterday evening, I had dinner with friends.' },
      { french: 'Déjà', english: 'Already', ipa: '/de.ʒa/', sampleSentence: 'Avez-vous déjà visité le Louvre ?', sampleTranslation: 'Have you already visited the Louvre?' },
      { french: 'Le voyage', english: 'The trip / journey', gender: 'masculine', ipa: '/lə vwa.jaʒ/', sampleSentence: 'Notre voyage en Provence était magnifique.', sampleTranslation: 'Our trip to Provence was magnificent.' },
      { french: 'Partir', english: 'To leave / depart', ipa: '/paʁ.tiʁ/', sampleSentence: 'Le train est parti à l\'heure.', sampleTranslation: 'The train left on time.' }
    ],
    exercises: [
      {
        id: 'ex-a2-1',
        type: 'multiple-choice',
        prompt: 'Complete: "Marie ___ arrivée en retard au bureau."',
        options: ['est', 'a', 'va', 'était'],
        correctAnswer: 'est',
        explanation: 'Arriver is a movement verb taking ÊTRE in the passé composé, agreeing with the feminine subject Marie ("arrivée").'
      },
      {
        id: 'ex-a2-2',
        type: 'sentence-builder',
        prompt: 'Arrange: "J\'ai commandé une tarte aux pommes"',
        words: ['tarte', 'J\'ai', 'aux', 'pommes', 'commandé', 'une'],
        correctAnswer: 'J\'ai commandé une tarte aux pommes',
        explanation: 'Passé composé of commander: J\'ai commandé.'
      }
    ]
  },
  {
    id: 'a2-unit2-l1',
    level: 'A2',
    unit: 2,
    title: 'Faire les Courses au Marché',
    subtitle: 'Shopping at French Open-Air Markets & Quantities',
    description: 'Learn the partitive articles (du, de la, de l\', des) and express exact quantities at local stalls.',
    category: 'Vocabulary',
    durationMinutes: 9,
    xpReward: 40,
    grammarTip: {
      title: 'Partitive Articles (Du, De la, Des) vs Specific Quantities',
      rules: [
        'Use "du" (m), "de la" (f), "de l\'" (vowel), "des" (pl) for unspecified amounts of uncountable items.',
        'After precise quantities (un kilo de, un paquet de, une bouteille de, beaucoup de), ALWAYS use "de" or "d\'".'
      ],
      examples: [
        { french: 'Je voudrais du fromage et de la confiture.', english: 'I would like some cheese and some jam.' },
        { french: 'Un kilo de pommes et un litre de lait.', english: 'A kilo of apples and a liter of milk.' }
      ]
    },
    vocabulary: [
      { french: 'Le marché', english: 'The open-air market', gender: 'masculine', ipa: '/lə maʁ.ʃe/', sampleSentence: 'Le marché du dimanche matin est très animé.', sampleTranslation: 'The Sunday morning market is very lively.' },
      { french: 'Le fromage', english: 'Cheese', gender: 'masculine', ipa: '/lə fʁɔ.maʒ/', sampleSentence: 'Un morceau de Comté bien affiné.', sampleTranslation: 'A piece of well-aged Comté cheese.' },
      { french: 'Combien coûte... ?', english: 'How much does ... cost?', ipa: '/kɔ̃.bjɛ̃ kut/', sampleSentence: 'Combien coûte ce panier de fraises ?', sampleTranslation: 'How much does this basket of strawberries cost?' },
      { french: 'Ça sera tout', english: 'That will be all', ipa: '/sa sə.ʁa tu/', sampleSentence: 'Avec ceci ? — Non merci, ça sera tout.', sampleTranslation: 'Anything else? — No thank you, that will be all.' }
    ],
    exercises: [
      {
        id: 'ex-a2-3',
        type: 'fill-blank',
        prompt: 'Choose the right partitive: "Je voudrais ___ fromage s\'il vous plaît."',
        options: ['du', 'de la', 'de le', 'des'],
        correctAnswer: 'du',
        explanation: '"Fromage" is masculine singular, so "de + le" contracts to "du".'
      }
    ]
  },

  // ================= B1: INTERMEDIATE =================
  {
    id: 'b1-unit1-l1',
    level: 'B1',
    unit: 1,
    title: 'Le Subjonctif Présent : Doutes, Désirs & Nécessités',
    subtitle: 'Expressing Emotion, Will, and Obligation',
    description: 'Demystify the famous French Subjunctive mood used after expressions of necessity, emotion, and doubt.',
    category: 'Grammar',
    durationMinutes: 12,
    xpReward: 50,
    grammarTip: {
      title: 'When to Use the Subjonctif in French',
      rules: [
        'Triggered by "Il faut que..." (It is necessary that), "Je veux que..." (I want that), "Je doute que..." (I doubt that), "Bien que..." (Although).',
        'Formation: Take the "ils" stem in present tense, remove -ent, add: -e, -es, -e, -ions, -iez, -ent.',
        'Irregular stems: Être (sois/soit), Avoir (aie/ait), Faire (fasse), Aller (aille/allions).'
      ],
      examples: [
        { french: 'Il faut que tu fasses attention.', english: 'You must pay attention (literally: It is necessary that you do attention).' },
        { french: 'Je suis ravi qu\'elle vienne avec nous.', english: 'I am delighted that she is coming with us.' }
      ]
    },
    vocabulary: [
      { french: 'Il faut que', english: 'It is necessary that / one must', ipa: '/il fo kə/', sampleSentence: 'Il faut qu\'on parte maintenant.', sampleTranslation: 'We must leave now.' },
      { french: 'Bien que', english: 'Although / Even though (+ subjunctive)', ipa: '/bjɛ̃ kə/', sampleSentence: 'Bien qu\'il fasse froid, nous nous promenons.', sampleTranslation: 'Although it is cold, we are taking a walk.' },
      { french: 'Avoir hâte de', english: 'To look forward to', ipa: '/a.vwaʁ at də/', sampleSentence: 'J\'ai hâte de visiter la Bretagne.', sampleTranslation: 'I look forward to visiting Brittany.' }
    ],
    exercises: [
      {
        id: 'ex-b1-1',
        type: 'multiple-choice',
        prompt: 'Which form correctly completes: "Il faut que nous ___ (partir) à 8 heures." ?',
        options: ['partions', 'partons', 'partirions', 'sommes partis'],
        correctAnswer: 'partions',
        explanation: 'The subjunctive ending for "nous" is -ions: "partions".'
      },
      {
        id: 'ex-b1-2',
        type: 'multiple-choice',
        prompt: 'What is the subjunctive form of "faire" for "tu"?',
        options: ['fasses', 'fais', 'faisais', 'feras'],
        correctAnswer: 'fasses',
        explanation: 'Faire has the irregular subjunctive root "fass-": "que tu fasses".'
      }
    ]
  },
  {
    id: 'b1-unit2-l1',
    level: 'B1',
    unit: 2,
    title: 'Donner son Avis & Argumenter',
    subtitle: 'Debating, Expressing Nuanced Opinions in French',
    description: 'Express agreement, disagreement, nuances, and intellectual viewpoints in French discussions.',
    category: 'Conversation',
    durationMinutes: 11,
    xpReward: 50,
    grammarTip: {
      title: 'Structuring an Argument in French',
      rules: [
        'Introduce viewpoint: "À mon avis", "Selon moi", "D\'après mon expérience".',
        'Add nuance: "D\'un côté... de l\'autre côté...", "Cependant / Néanmoins" (However).',
        'Conclude: "En fin de compte", "Par conséquent" (Consequently).'
      ],
      examples: [
        { french: 'À mon avis, ce film mérite la Palme d\'or.', english: 'In my opinion, this film deserves the Palme d\'Or.' },
        { french: 'Je ne suis pas tout à fait d\'accord avec cette idée.', english: 'I do not completely agree with this idea.' }
      ]
    },
    vocabulary: [
      { french: 'À mon avis', english: 'In my opinion', ipa: '/a mɔ̃.n‿a.vi/', sampleSentence: 'À mon avis, c\'est la meilleure solution.', sampleTranslation: 'In my opinion, it is the best solution.' },
      { french: 'Être d\'accord', english: 'To agree', ipa: '/ɛtʁ d‿a.kɔʁ/', sampleSentence: 'Je suis entièrement d\'accord avec vous.', sampleTranslation: 'I completely agree with you.' },
      { french: 'Néanmoins', english: 'Nevertheless / Nonetheless', ipa: '/ne.ɑ̃.mwɛ̃/', sampleSentence: 'Le projet est ambitieux, néanmoins réalisable.', sampleTranslation: 'The project is ambitious, nonetheless achievable.' }
    ],
    exercises: [
      {
        id: 'ex-b1-3',
        type: 'translation',
        prompt: 'How do you say "I completely agree with you" politely?',
        options: ['Je suis tout à fait d\'accord avec vous', 'J\'ai d\'accord vous', 'Je pense pas comme ça', 'Je vous accorde'],
        correctAnswer: 'Je suis tout à fait d\'accord avec vous',
        explanation: '"Je suis tout à fait d\'accord avec vous" is the gold standard polite agreement phrase.'
      }
    ]
  },

  // ================= B2: UPPER INTERMEDIATE =================
  {
    id: 'b2-unit1-l1',
    level: 'B2',
    unit: 1,
    title: 'Les Expressions Idiomatiques & Métaphores',
    subtitle: 'Colorful French Idioms Native Speakers Use Daily',
    description: 'Unlock colorful French idioms like "Poser un lapin", "Avoir le coup de foudre", and "Tomber dans les pommes".',
    category: 'Culture',
    durationMinutes: 12,
    xpReward: 60,
    grammarTip: {
      title: 'Understanding French Idioms Figuratively',
      rules: [
        'French is rich in culinary and sensory metaphors.',
        'Never translate word-for-word: "Avoir du pain sur la planche" means to have a lot of work on your plate, not literal bread on a board!'
      ],
      examples: [
        { french: 'Il m\'a posé un lapin hier soir !', english: 'He stood me up yesterday evening!' },
        { french: 'C\'est la goutte d\'eau qui fait déborder le vase.', english: 'It is the straw that broke the camel\'s back (the drop of water that overflows the vase).' }
      ]
    },
    vocabulary: [
      { french: 'Poser un lapin', english: 'To stand someone up', ipa: '/po.ze œ̃ la.pɛ̃/', sampleSentence: 'Elle m\'a attendu une heure, il lui a posé un lapin.', sampleTranslation: 'She waited an hour, he stood her up.' },
      { french: 'Avoir le coup de foudre', english: 'Love at first sight (thunderbolt)', ipa: '/a.vwaʁ lə ku d(ə) fudʁ/', sampleSentence: 'Quand ils se sont rencontrés, c\'était le coup de foudre.', sampleTranslation: 'When they met, it was love at first sight.' },
      { french: 'Tomber dans les pommes', english: 'To faint / pass out', ipa: '/tɔ̃.be dɑ̃ le pɔm/', sampleSentence: 'Il faisait si chaud qu\'il est tombé dans les pommes.', sampleTranslation: 'It was so hot that he fainted.' },
      { french: 'Avoir du pain sur la planche', english: 'To have a lot of work to do', ipa: '/a.vwaʁ dy pɛ̃ syʁ la plɑ̃ʃ/', sampleSentence: 'Cette semaine, nous avons du pain sur la planche.', sampleTranslation: 'This week, we have a lot on our plate.' }
    ],
    exercises: [
      {
        id: 'ex-b2-1',
        type: 'multiple-choice',
        prompt: 'What does "Poser un lapin" mean in everyday French?',
        options: ['To give someone a rabbit', 'To stand someone up / not show up to a date', 'To run very quickly', 'To make a lucky wish'],
        correctAnswer: 'To stand someone up / not show up to a date',
        explanation: '"Poser un lapin" historically meant leaving without paying, and evolved to standing someone up.'
      },
      {
        id: 'ex-b2-2',
        type: 'multiple-choice',
        prompt: 'If a colleague says "J\'ai du pain sur la planche", what does it mean?',
        options: ['They are making bakery bread', 'They are very busy with lots of tasks', 'They are taking a lunch break', 'They are resigning'],
        correctAnswer: 'They are very busy with lots of tasks',
        explanation: '"Avoir du pain sur la planche" signifies having substantial work ahead.'
      }
    ]
  }
];
