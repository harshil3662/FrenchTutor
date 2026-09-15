export const A1_GRAMMAR_LESSONS = [
  // ==========================================
  // Unit 1: Articles
  // ==========================================
 {
    id: 'unit-1-articles',
    unitNumber: 1,
    category: 'Articles, Numbers & Determiners',
    level: 'A1',
    title: 'Unit 1: Articles (Definite, Indefinite & Partitive)',
    frenchTitle: 'Unité 1 : Les articles définis, indéfinis et partitifs',
    subtitle: 'Determine specific nouns, indefinite quantities, and uncountable partitive items.',
    formula: 'Définis: [le / la / l\' / les]  |  Indéfinis: [un / une / des]  |  Partitifs: [du / de la / de l\' / des]  → [de / d\'] après négation ou quantité',
    goldenRule: 'Use partitive articles (du, de la) for uncountable food and substances; after a negative verb (ne... pas) or adverb of quantity (beaucoup, peu), partitives reduce strictly to "de" or "d\'".',
    topics: [
      {
        id: 'topic-1-definite-articles',
        title: '1. Definite Articles (le, la, l\', les)',
        formula: 'Masc: [le] + Consonant  |  Fem: [la] + Consonant  |  Vowel/h: [l\']  |  Plural: [les] + Plural Noun',
        goldenRule: 'Use definite articles (the) for specific identified items OR general overarching concepts and preferences (aimer, adorer, détester). Definite articles NEVER reduce to "de" in negative sentences!',
        detailedDescription: [
          'All nouns in French have a gender: masculine or feminine, whether they refer to a person, an animal, a thing, or an abstract notion.',
          'While English has only one definite article the, French uses le for masculine nouns and la for feminine nouns. Le and la are shortened to l’ before a singular noun or adjective that begins with a vowel sound. The plural les is used for both masculine and feminine.'
        ],
        tables: [
          {
            title: 'Definite Articles (Les articles définis)',
            subtitle: 'Forms and phonetic liaison rules',
            description: 'Definite articles specify an exact noun or a broad universal category.',
            headers: ['Gender / Number', 'Form', 'Before Vowel / Silent H', 'Example', 'English Translation'],
            rows: [
              ['Masculine Singular', 'le', "l'", 'le café / l\'hôtel', 'the coffee / the hotel'],
              ['Feminine Singular', 'la', "l'", 'la table / l\'université', 'the table / the university'],
              ['Plural (Masc & Fem)', 'les', 'les (with /z/ liaison)', 'les enfants / les trains', 'the children / the trains']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'J\'aime le thé vert.',
            english: 'I like green tea (in general).',
            aspectNote: 'Definite article "le" expresses a general preference with aimer.'
          },
          {
            french: 'Le professeur ouvre la porte.',
            english: 'The teacher opens the door.',
            aspectNote: 'Specific known subject and object in context.'
          },
          {
            french: 'Je n\'aime pas les carottes.',
            english: 'I do not like carrots.',
            aspectNote: 'Definite articles do NOT change to "de" under negation!'
          }
        ]
      },
      {
        id: 'topic-2-indefinite-articles',
        title: '2. Indefinite Articles (un, une, des)',
        formula: 'Masc: [un]  |  Fem: [une]  |  Plural: [des]  → [de / d\'] sous la négation',
        goldenRule: 'Use indefinite articles (a, an, some) for countable, non-specific nouns. Under direct negation (ne... pas), "un", "une", and "des" transform into "de" or "d\'" (except after être).',
        detailedDescription: [
          'Indefinite articles introduce countable nouns that have not been previously identified or are one among many ("un croissant", "une maison", "des pommes").',
          'In English, plural indefinite nouns frequently take no article at all ("I bought apples"), but French strictly requires "des" ("J\'ai acheté des pommes").',
          'The indefinite articles are un (masculine singular) (a), une (feminine singular) (a), and des (both masculine and feminine plural) (some).'
        ],
        tables: [
          {
            title: 'Indefinite Articles (Les articles indéfinis)',
            subtitle: 'Singular, plural, and negative mutation',
            description: 'Used for individual countable items and entities.',
            headers: ['Gender / Number', 'Form', 'Example', 'English Translation'],
            rows: [
              ['Masculine Singular', 'un', 'un livre', 'a book'],
              ['Feminine Singular', 'une', 'une chaise', 'a chair'],
              ['Plural (Masc & Fem)', 'des', 'des stylos', 'some pens']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'J\'ai un chat et une tortue.',
            english: 'I have a cat and a turtle.',
            aspectNote: 'Individual countable pets.'
          },
          {
            french: 'Elle achète des livres à la librairie.',
            english: 'She buys (some) books at the bookstore.',
            aspectNote: 'Plural indefinite requires "des" where English omits the determiner.'
          },
          {
            french: 'Je n\'ai pas d\'animaux.',
            english: 'I do not have any pets.',
            aspectNote: '"des" becomes "d\'" before a vowel sound in negative statements.'
          }
        ]
      },
      {
        id: 'topic-3-partitive-articles',
        title: '3. Partitive Articles & Negation (du, de la, de l\', des → de)',
        formula: 'Masc: [du]  |  Fem: [de la]  |  Vowel: [de l\']  |  Plural: [des]  → [de / d\'] après négation / quantité',
        goldenRule: 'Partitive articles signify "some" or an unmeasured amount of an uncountable substance (food, liquid, abstract quality). Negation (ne... pas) or quantity adverbs (beaucoup de, un peu de) reduce them to "de / d\'".',
        detailedDescription: [
          'The partitive article is used when the exact quantity of an item is unknown. In English, the partitive article is often omitted. We say, “I want bread” or “I want some bread.” However, the partitive article is always required in French. It is formed by combining de and the definite article.',
          'de + le = du',
          'de + la = de la',
          'de + l\' = de l\'',
          'de + les = des',
          'When used in the negative, the du, de la, and des all become de, since the quantity of the item doesn’t exist any longer.',
          'One exception to this rule is when using the verb être (to be). In the negative, the partitive article is always used with être.',
        ],
        contrastExamples: [
          {
            french: 'Je voudrais du pain. ',
            english: 'I would like some bread.',
            aspectNote: 'Uncountable items take "du" and "de l\'".'
          },
          {
            french: 'Ce village n’a pas de charme.',
            english: 'This village has no charm.',
            aspectNote: 'Partitive "du charme" reduces to "de charme" after "ne... pas".'
          },
          {
            french: 'Ce n’est pas du fromage de chèvre.',
            english: 'It is not goat cheese.',
            aspectNote: 'Exception: with the verb "être", partitive articles do NOT reduce to "de".'
          }
        ]
      }
    ],
    tables: [
      {
        title: 'Master Article Classification & Gender Matrix',
        subtitle: 'Syntactic breakdown across masculine, feminine, vowel-elision and plural forms',
        description: 'Use this comparative chart to quickly look up article mutations according to grammatical gender, phonetic context, and negation.',
        headers: ['Article Category', 'Masculine Sing.', 'Feminine Sing.', 'Before Vowel (l\')', 'Plural (All)', 'Negative Form (ne... pas)'],
        rows: [
          ['Définis (The / Specific)', 'le pain', 'la table', "l'eau", 'les livres', 'le / la / les (unchanged)'],
          ['Indéfinis (A / An / Some)', 'un café', 'une pomme', 'un ami / une amie', 'des croissants', "de / d' (reduces)"],
          ['Partitifs (Some / Uncountable)', 'du beurre', 'de la soupe', "de l'huile", 'des pâtes', "de / d' (reduces)"],
        ]
      }
    ],
    contrastExamples: [
      {
        french: 'Je mange du fromage tous les matins.',
        english: 'I eat (some) cheese every morning.',
        aspectNote: 'Partitive article "du" for masculine uncountable food.',
      },
      {
        french: 'Je ne mange pas de fromage.',
        english: 'I do not eat cheese.',
        aspectNote: 'Reduction of "du" to "de" after negative negation "ne... pas".',
      },
      {
        french: 'C\'est du vin rouge / Ce n\'est pas du vin rouge.',
        english: 'This is red wine / This is not red wine.',
        aspectNote: 'Exception: with the verb "être", partitives do NOT reduce to "de".',
      },
    ],
    commonTraps: [
      'Saying "beaucoup des amis" instead of "beaucoup d\'amis" (quantifiers require "de").',
      'Saying "Je n\'ai pas un stylo" instead of "Je n\'ai pas de stylo".',
    ],
    practiceExercises: [
      {
        id: 'ex-u1-1',
        type: 'multiple-choice',
        prompt: 'Choose the correct article: "Le matin, je bois _____ café avec _____ lait."',
        options: ['du / du', 'le / le', 'de / de', 'un / des'],
        correctAnswer: 'du / du',
        hint: 'Both "café" and "lait" are masculine uncountable nouns taking partitive articles in positive sentences.',
        explanation: 'We use partitive "du" (de + le) for masculine uncountable food and drinks.',
      },
      {
        id: 'ex-u1-2',
        type: 'multiple-choice',
        prompt: 'Choose the correct form under negation: "Elle a des frères, mais elle n\'a pas _____ sœurs."',
        options: ['de', 'des', 'du', 'une'],
        correctAnswer: 'de',
        hint: 'In negative sentences with "ne... pas", indefinite/partitive articles become "de".',
        explanation: 'Indefinite plural "des" converts to "de" under direct negation.',
      },
      {
        id: 'ex-u1-3',
        type: 'sentence-builder',
        prompt: 'Arrange into: "Nous achetons beaucoup de légumes frais."',
        words: ['légumes', 'frais.', 'Nous', 'beaucoup', 'achetons', 'de'],
        correctAnswer: 'Nous achetons beaucoup de légumes frais.',
        hint: 'Adverb of quantity "beaucoup" is immediately followed by "de".',
        explanation: 'Correct structure: Subject + Verb + Adverb of quantity + de + Noun + Adjective.',
      },
    ],
  },

  // ==========================================
  // Unit 2: Basic Gender Endings
  // ==========================================
  {
    id: 'unit-2-basic-gender',
    unitNumber: 2,
    category: 'Nouns, Gender, Adjectives & Adverbs',
    level: 'A1',
    title: 'Unit 2: Basic Gender Endings (Masculin & Féminin)',
    frenchTitle: 'Unité 2 : Les terminaisons du genre masculin et féminin',
    subtitle: 'Identify noun genders through typical phonetic and orthographic suffixes.',
    formula: 'Féminin régulier = [Nom Masculin] + [-e]  |  Suffixes féminins: -tion, -sion, -té, -ette, -ance, -ence  |  Suffixes masculins: -age, -ment, -eau, -isme, -oir',
    goldenRule: 'Most French nouns ending in -tion, -sion, -té, and -ette are feminine, while nouns ending in -ment, -age, -eau, and -isme are masculine (with few exceptions like "la plage", "la cage", "la page", "l\'image").',
    rules: [
      'To form feminine nouns from people/animals, add -e (un ami → une amie, un étudiant → une étudiante).',
      'Nouns ending in -eur often become -euse (un chanteur → une chanteuse) or -rice for Latin roots (un acteur → une actrice).',
      'Nouns ending in -en and -on double the consonant before adding -e: un musicien → une musicienne, un champion → une championne.',
      'Key masculine noun endings: -ment (le monument), -age (le voyage), -isme (le réalisme), -eau (le château), -phone (le téléphone).',
      'Key feminine noun endings: -tion (la nation), -té (la liberté), -ure (la voiture), -ette (la bicyclette).',
    ],
    contrastExamples: [
      {
        french: 'Le gouvernement vote une loi importante pour la liberté.',
        english: 'The government votes an important law for liberty.',
        aspectNote: 'Le gouvernement (-ment = masc.) vs La liberté (-té = fém.).',
      },
      {
        french: 'Un acteur talentueux et une actrice célèbre.',
        english: 'A talented actor and a famous actress.',
        aspectNote: '-teur becomes -trice for Latin-rooted professions.',
      },
    ],
    commonTraps: [
      'Assuming all nouns ending in -e are feminine (e.g. "le problème", "le système", "le musée" are masculine!).',
      'Forgetting that "la plage", "la page", "l\'image" are feminine exceptions to the -age rule.',
    ],
    practiceExercises: [
      {
        id: 'ex-u2-1',
        type: 'multiple-choice',
        prompt: 'Which of the following nouns is feminine?',
        options: ['La solution', 'Le développement', 'Le voyage', 'Le romantisme'],
        correctAnswer: 'La solution',
        hint: 'Nouns ending in -tion are reliably feminine.',
        explanation: 'Words ending in "-tion" (la solution, la nation, la création) are feminine.',
      },
      {
        id: 'ex-u2-2',
        type: 'multiple-choice',
        prompt: 'What is the feminine counterpart of "un serveur"?',
        options: ['une serveuse', 'une servante', 'une servatrice', 'une serveure'],
        correctAnswer: 'une serveuse',
        hint: 'Verbs of action with stem + eur generally become -euse.',
        explanation: 'Un serveur → une serveuse (from servir).',
      },
    ],
  },

  // ==========================================
  // Unit 3: More French Nouns and Their Gender
  // ==========================================
  {
    id: 'unit-3-more-nouns-gender',
    unitNumber: 3,
    category: 'Nouns, Gender, Adjectives & Adverbs',
    level: 'A1',
    title: 'Unit 3: More French Nouns and Their Gender Nuances',
    frenchTitle: 'Unité 3 : Noms piégeux, homonymes et double genre',
    subtitle: 'Navigate deceptive Greek roots, nouns that change meaning with gender, and irregular plurals.',
    formula: 'Noms grecs en -me / -ste → Masculin (le problème, le système, l\'artiste)  |  Homonymes: Le tour (trick/tower) vs La tour (tower)',
    goldenRule: 'Greek-derived scientific or academic words ending in -ème, -ôme, and -isme are masculine: le problème, le poème, le théorème, le diplôme.',
    topics: [
      {
        id: 'topic-1-human-beings',
        title: '1. Human Beings: Gendered Nouns for People and Professions',
        detailedDescription: [
          'In numerous cases, the noun of a profession is identical in the masculine and the feminine with an -e at the end of the noun',
          'l’avocat/l’avocate = lawyer',
          'le professeur/la professeure = teacher',
          'In other cases, there are many possible endings depending on the noun. Here are some examples, but always check in the dictionary.',
          'le chanteur/la chanteuse = singer',
          'le conseiller/la conseillère = adviser'
        ]
      },
      {
        id: 'topic-2-places-calenders',
        title: '2. Places and the calendar',
        detailedDescription: [
          'The masculine is used more commonly for cities, but the feminine is still used in a more aesthetic or romantic sense. There is no set rule.',
          'Regions, provinces, and states ending in -e tend to be feminine. The others tend to be masculine—with some exceptions, of course.',
          'Like regions and states, the countries with an -e ending tend to be feminine. Other endings tend to be masculine,',
          'In French, there is a difference between un fleuve, a river that flows into the sea or the ocean, and une rivière, which does not. Most fleuves not ending with -e are masculine.',
          'La mer (sea) is feminine and l’océan (ocean) is masculine; that is fairly easy. The common mistakes have to do with capitalization. Always check in the dictionary.',
          'The days of the week,The months of the year,The seasons and Cardinal points are masculine:'
        ]
      },
      {
        id: 'topic-3-plants-wines-cheeses',
        title: '3. Plants, Wines, and Cheeses',
        detailedDescription: [
          'Most flowers not ending in -e tend to be masculine.',
          'The names of fruit, nuts, and vegetables not ending in -e are usually masculine.',
          'Wines and Cheeses are typically masculine, but some regional varieties may be feminine.',
        ]
      }
    ],
    practiceExercises: [
      {
        id: 'ex-u3-1',
        type: 'multiple-choice',
        prompt: 'Choose the correct article for "programme": "C\'est _____ programme intéressant."',
        options: ['un', 'une', 'de la', 'des'],
        correctAnswer: 'un',
        hint: 'Greek-rooted words ending in -gramme are masculine.',
        explanation: 'Programme is masculine: un programme.',
      },
      {
        id: 'ex-u3-2',
        type: 'multiple-choice',
        prompt: 'What is the plural form of "le travail"?',
        options: ['les travaux', 'les travails', 'les travailleux', 'les travailles'],
        correctAnswer: 'les travaux',
        hint: 'Irregular plural of -ail.',
        explanation: 'Le travail → les travaux.',
      },
    ],
  },

  // ==========================================
  // Unit 4: Numbers
  // ==========================================
  {
    id: 'unit-4-numbers',
    unitNumber: 4,
    category: 'Articles, Numbers & Determiners',
    level: 'A1',
    title: 'Unit 4: Numbers (Cardinals, Ordinals & Hyphenation)',
    frenchTitle: 'Unité 4 : Les nombres cardinaux et ordinaux',
    subtitle: 'Count, tell time, write dates, and master the vigesimal (base-20) French counting system.',
    formula: '70 = soixante-dix  |  71 = soixante-et-onze  |  80 = quatre-vingts  |  81 = quatre-vingt-un (no "et", no "s")  |  90 = quatre-vingt-dix',
    goldenRule: 'In standard French, 70 is 60+10 (soixante-dix), 80 is 4x20 (quatre-vingts), and 90 is 4x20+10 (quatre-vingt-dix). "Vingt" and "cent" take an "s" in the plural only when they are multiplied AND terminate the number (quatre-vingts vs quatre-vingt-cinq).',
    topics: [
      {
        id: 'topic-1-0-to-20',
        title: '1. Numbers 0 to 20',
        tables: [
          {
            title: '0 to 20 Cardinal Numbers Reference',
            subtitle: 'Base numbers and irregular addition transitions',
            description: 'Notice the spelling conventions for hyphenation, the use of "et", and plural "s" agreements.',
            headers: ['Number', 'French Cardinal', 'Spelling Rule / Breakdown', 'Ordinal Form'],
            rows: [
              ['0', 'zéro', 'Single word', 'zéroième'],
              ['1', 'un', 'Single word', 'premier'],
              ['2', 'deux', 'Single word', 'deuxième'],
              ['3', 'trois', 'Single word', 'troisième'],
              ['4', 'quatre', 'Single word', 'quatrième'],
              ['5', 'cinq', 'Single word', 'cinquième'],
              ['6', 'six', 'Single word', 'sixième'],
              ['7', 'sept', 'Single word', 'septième'],
              ['8', 'huit', 'Single word', 'huitième'],
              ['9', 'neuf', 'Single word', 'neuvième'],
              ['10', 'dix', 'Single word', 'dixième'],
              ['11', 'onze', 'Single word', 'onzième'],
              ['12', 'douze', 'Single word', 'douzième'],
              ['13', 'treize', 'Single word', 'treizième'],
              ['14', 'quatorze', 'Single word', 'quatorzième'],
              ['15', 'quinze', 'Single word', 'quinzième'],
              ['16', 'seize', 'Single word', 'seizième'],
              ['17', 'dix-sept', '10 + 7 (hyphenated)', 'dix-septième'],
              ['18', 'dix-huit', '10 + 8 (hyphenated)', 'dix-huitième'],
              ['19', 'dix-neuf', '10 + 9 (hyphenated)', 'dix-neuvième'],
              ['20', 'vingt', 'Single word', 'vingtième']
            ]
          }
        ],
      },
      {
        id: 'topic-2-20-to-50',
        title: '2. Numbers 20 to 50',
        tables: [
          {
            title: '20 to 50 Cardinal Numbers Reference',
            subtitle: 'Base numbers and irregular addition transitions',
            description: 'Notice the spelling conventions for hyphenation, the use of "et", and plural "s" agreements.',
            headers: ['Number', 'French Cardinal', 'Spelling Rule / Breakdown', 'Ordinal Form'],
            rows: [
              ['20', 'vingt', 'Single word', 'vingtième'],
              ['21', 'vingt et un', '20 + 1 (with "et")', 'vingt et unième'],
              ['22', 'vingt-deux', '20 + 2 (hyphenated)', 'vingt-deuxième'],
              ['23', 'vingt-trois', '20 + 3 (hyphenated)', 'vingt-troisième'],
              ['24', 'vingt-quatre', '20 + 4 (hyphenated)', 'vingt-quatrième'],
              ['25', 'vingt-cinq', '20 + 5 (hyphenated)', 'vingt-cinquième'],
              ['26', 'vingt-six', '20 + 6 (hyphenated)', 'vingt-sixième'],
              ['27', 'vingt-sept', '20 + 7 (hyphenated)', 'vingt-septième'],
              ['28', 'vingt-huit', '20 + 8 (hyphenated)', 'vingt-huitième'],
              ['29', 'vingt-neuf', '20 + 9 (hyphenated)', 'vingt-neuvième'],
              ['30', 'trente', 'Single word', 'trentième'],
              ['31', 'trente et un', '30 + 1 (with "et")', 'trente et unième'],
              ['32', 'trente-deux', '30 + 2 (hyphenated)', 'trente-deuxième'],
              ['33', 'trente-trois', '30 + 3 (hyphenated)', 'trente-troisième'],
              ['40', 'quarante', 'Single word', 'quarantième'],
              ['50', 'cinquante', 'Single word', 'cinquantième']
            ]
          }
        ],
      },
      {
        id: 'topic-3-50-to-99',
        title: '3. Numbers 50 to 99',
        tables: [
          {
            title: '50 to 99 Cardinal Numbers Reference',
            subtitle: 'Base numbers and irregular addition transitions',
            description: 'Notice the spelling conventions for hyphenation, the use of "et", and plural "s" agreements.',
            headers: ['Number', 'French Cardinal', 'Spelling Rule / Breakdown', 'Ordinal Form'],
            rows: [
              ['50', 'cinquante', 'Single word', 'cinquantième'],
              ['51', 'cinquante et un', '50 + 1 (with "et")', 'cinquante et unième'],
              ['52', 'cinquante-deux', '50 + 2 (hyphenated)', 'cinquante-deuxième'],
              ['60', 'soixante', 'Single word', 'soixantième'],
              ['61', 'soixante et un', '60 + 1 (with "et")', 'soixante et unième'],
              ['62', 'soixante-deux', '60 + 2 (hyphenated)', 'soixante-deuxième'],
              ['70', 'soixante-dix', '60 + 10 (with "et")', 'soixante-dixième'],
              ['71', 'soixante et onze', '60 + 11 (with "et")', 'soixante et onzième'],
              ['72', 'soixante-douze', '60 + 12 (hyphenated)', 'soixante-douzième'],
              ['73', 'soixante-treize', '60 + 13 (hyphenated)', 'soixante-treizième'],
              ['74', 'soixante-quatorze', '60 + 14 (hyphenated)', 'soixante-quatorzième'],
              ['80', 'quatre-vingt', 'Single word', 'quatre-vingtième'],
              ['81', 'quatre-vingt-un', '80 + 1 (no "et")', 'quatre-vingt-unième'],
              ['82', 'quatre-vingt-deux', '80 + 2 (hyphenated)', 'quatre-vingt-deuxième'],
              ['83', 'quatre-vingt-trois', '80 + 3 (hyphenated)', 'quatre-vingt-troisième'],
              ['90', 'quatre-vingt-dix', '80 + 10 (with "et")', 'quatre-vingt-dixième'],
              ['91', 'quatre-vingt-onze', '80 + 11 (with "et")', 'quatre-vingt-onzième'],
              ['92', 'quatre-vingt-douze', '80 + 12 (hyphenated)', 'quatre-vingt-douzième'],
              ['93', 'quatre-vingt-treize', '80 + 13 (hyphenated)', 'quatre-vingt-treizième'],
              ['94', 'quatre-vingt-quatorze', '80 + 14 (hyphenated)', 'quatre-vingt-quatorzième'],
            ]
          }
        ],
      },
      {
        id: 'topic-4-100-to-999',
        title: '4. Numbers 100 to 999',
        tables: [
          {
            title: '100 to 999 Cardinal Numbers Reference',
            subtitle: 'Base numbers and irregular addition transitions',
            description: 'Notice the spelling conventions for hyphenation, the use of "et", and plural "s" agreements.',
            headers: ['Number', 'French Cardinal', 'Spelling Rule / Breakdown', 'Ordinal Form'],
            rows: [
              ['100', 'cent', 'Single word', 'centième'],
              ['101', 'cent un', '100 + 1 (no "et")', 'cent unième'],
              ['102', 'cent deux', '100 + 2 (hyphenated)', 'cent deuxième'],
              ['111', 'cent onze', '100 + 11 (hyphenated)', 'cent onzième'],
              ['150', 'cent cinquante', '100 + 50 (hyphenated)', 'cent cinquantième'],
              ['200', 'deux cents', '2 × 100 (with "s")', 'deux centième'],
              ['201', 'deux cent un', '200 + 1 (no "et")', 'deux cent unième'],
              ['202', 'deux cent deux', '200 + 2 (hyphenated)', 'deux cent deuxième'],
              ['300', 'trois cents', '3 × 100 (with "s")', 'trois centième'],
              ['400', 'quatre cents', '4 × 100 (with "s")', 'quatre centième'],
              ['500', 'cinq cents', '5 × 100 (with "s")', 'cinq centième'],
              ['600', 'six cents', '6 × 100 (with "s")', 'six centième'],
              ['700', 'sept cents', '7 × 100 (with "s")', 'sept centième'],
              ['800', 'huit cents', '8 × 100 (with "s")', 'huit centième'],
              ['900', 'neuf cents', '9 × 100 (with "s")', 'neuf centième']
            ]
          }
        ],
      },
      {
        id: 'topic-5-1000-and-greater',
        title: '5. Numbers 1000 and Greater',
        tables: [
          {
            title: '1000 and Greater Cardinal Numbers Reference',
            subtitle: 'Base numbers and irregular addition transitions',
            description: 'Notice the spelling conventions for hyphenation, the use of "et", and plural "s" agreements.',
            headers: ['Number', 'French Cardinal', 'Spelling Rule / Breakdown', 'Ordinal Form'],
            rows: [
              ['1,000', 'mille', 'Single word', 'millième'],
              ['1,001', 'mille un', '1000 + 1 (no "et")', 'mille unième'],
              ['1,010', 'mille dix', '1000 + 10 (hyphenated)', 'mille dixième'],
              ['1,567', 'mille cinq cent soixante-sept', '1000 + 500 + 60 + 7 (hyphenated)', 'mille cinq cent soixante-septième'],
              ['2,000', 'deux mille', '2 × 1000 (with "s")', 'deux millième'],
              ['10,000', 'dix mille', '10 × 1000 (with "s")', 'dix millième'],
              ['100,000', 'cent mille', '100 × 1000 (with "s")', 'cent millième'],
              ['1,000,000', 'un million', '1 × 1,000,000 (with "s")', 'un millionième'],
              ['2,000,000', 'deux millions', '2 × 1,000,000 (with "s")', 'deux millionième'],
              ['1,000,000,000', 'un milliard', '1 × 1,000,000,000 (with "s")', 'un milliardième']
            ]
          }
        ],
      }
    ],
    practiceExercises: [
      {
        id: 'ex-u4-1',
        type: 'multiple-choice',
        prompt: 'How do you say 95 in French?',
        options: ['quatre-vingt-quinze', 'soixante-quinze', 'quatre-vingts-dix-cinq', 'nonante-cinq'],
        correctAnswer: 'quatre-vingt-quinze',
        hint: '80 (quatre-vingt) + 15 (quinze).',
        explanation: '95 is constructed as 80 + 15 = quatre-vingt-quinze.',
      },
      {
        id: 'ex-u4-2',
        type: 'multiple-choice',
        prompt: 'Select the correctly spelled number for 300:',
        options: ['trois cents', 'trois cent', 'trois-cents', 'trois centes'],
        correctAnswer: 'trois cents',
        hint: 'Cent takes an "s" when multiplied and not followed by another number.',
        explanation: 'Trois cents takes an "s" because it is a whole multiple of 100.',
      },
    ],
  },

  // ==========================================
  // Unit 6: Building Sentences
  // ==========================================
  {
    id: 'unit-6-building-sentences',
    unitNumber: 6,
    category: 'Sentence Structure & Clauses',
    level: 'A1',
    title: 'Unit 6: Building Sentences (Word Order & Negation)',
    frenchTitle: 'Unité 6 : La structure de la phrase simple et la négation',
    subtitle: 'Master standard SVO word order, adverb placement, and the "ne... pas" negation sandwich.',
    formula: 'Affirmation: [Sujet] + [Verbe] + [Complément d\'Objet] + [Adverbe / Lieu / Temps]  |  Négation: [Sujet] + [ne / n\'] + [Verbe] + [pas] + [Complément]',
    goldenRule: 'Standard French declarative word order is strictly Subject + Verb + Direct/Indirect Object. In compound tenses, short adverbs (bien, mal, toujours, souvent, déjà) sit directly between the auxiliary and the past participle.',
    topics: [
      {
        id: 'topic-1-declarative-sentences',
        title: '1. declarative sentences',
        detailedDescription: [
          'A declarative sentence (from the Latin declarare) makes an affirmative or negative statement about a subject. A declarative sentence communicates information; it does not ask a question, it does not express exclamations, nor does it give a command.',
          '**subject + verb + object noun**',
          'At this level, Don\'t worry about compound tenses, just focus on the basic SVO structure.',
        ],
        contrastExamples:[
          { 
            french: 'Tu appelles Jean. ',
            english: 'You call Jean.',
            aspectNote: 'Subject (Tu) + Verb (appelles) + Direct Object (Jean).',
          },
          {
            french: 'Elise appellera Marie.',
            english: 'Elise will call Marie.',
            aspectNote: 'Subject (Elise) + Verb (appellera) + Direct Object (Marie).',
          }
        ]
      },
      {
        id: 'topic-2-negative-declarative-sentences',
        title: '2. negative declarative sentences',
        detailedDescription: [
          'Negative sentences must include negative words. To make an affirmative sentence negative, place the word **ne** (or n’ before a vowel sound) directly before the verb and place the word pas directly after the verb.',
          '**Subject + "ne" + Verb + "pas" + Object**',
          'Other negative words and phrases that are used to create negative declarative sentences are rien (nothing), plus (no longer), jamais (never), personne (nobody), ni (neither, nor), and nulle part (nowhere). They are placed after the verb just like pas and also require ne or n’ before the verb.',
          'Unlike English, two or three negative words can be used in a single French sentence.',
          'At the end, I would say, just get familiar with declarative and negative sentence structure. Try to seperate the subject, verb, and object in your mind and then add the negative words around the verb. It will become second nature with practice.',
        ],
        contrastExamples:[
          { 
            french: 'Michelle ne joue pas au basket. ',
            english: 'Michelle doesn\'t play basketball.',
            aspectNote: 'Subject (Michelle) + "ne" + Verb (joue) + "pas" + Object (au basket).',
          },
          {
            french: 'Marius n’habite pas à Marseille. ',
            english: 'Marius doesn\'t live in Marseille.',
            aspectNote: 'Subject (Marius) + "ne" + Verb (habite) + "pas" + Object (à Marseille).',
          },
          {
            french: 'Je ne mange jamais de chocolat. ',
            english: 'I never eat chocolate.',
            aspectNote: 'Subject (Je) + "ne" + Verb (mange) + "jamais" + Object (de chocolat).',
          },
          {
            french: 'Je ne veux plus jamais rien faire de mal. ',
            english: 'I don\'t want to do anything wrong anymore.',
            aspectNote: 'Subject (Je) + "ne" + Verb (veux) + "plus" + "jamais" + Object (rien faire de mal).',
          }
        ]
      }
    ],
    practiceExercises: [
      {
        id: 'ex-u6-1',
        type: 'sentence-builder',
        prompt: 'Build the correct negative sentence: "Paul ne comprend pas cette question."',
        words: ['cette', 'Paul', 'comprend', 'ne', 'question.', 'pas'],
        correctAnswer: 'Paul ne comprend pas cette question.',
        hint: 'Subject + ne + verb + pas + complement.',
        explanation: 'The conjugated verb "comprend" is sandwiched by "ne" and "pas".',
      },
      {
        id: 'ex-u6-2',
        type: 'multiple-choice',
        prompt: 'Where does the adverb "souvent" go? "Nous voyageons (souvent) en train."',
        options: ['Nous voyageons souvent en train.', 'Nous souvent voyageons en train.', 'Souvent nous voyageons en train.', 'Nous voyageons en train souvent.'],
        correctAnswer: 'Nous voyageons souvent en train.',
        hint: 'In simple tenses, adverbs follow immediately after the conjugated verb.',
        explanation: 'Adverbs of frequency in French sit right after the conjugated verb: "voyageons souvent".',
      },
    ],
  },

  // ==========================================
  // Unit 7: Asking Questions
  // ==========================================
  {
    id: 'unit-7-asking-questions',
    unitNumber: 7,
    category: 'Sentence Structure & Clauses',
    level: 'A1',
    title: 'Unit 7: Asking Questions (3 Interrogation Registers)',
    frenchTitle: 'Unité 7 : L\'interrogation (Intonation, Est-ce que, Inversion)',
    subtitle: 'Learn informal, standard, and formal questioning techniques and interrogative pronouns.',
    formula: '1. Informelle: [Phrase affirmative] ? (Tu viens ?)  |  2. Standard: Est-ce que + [Sujet] + [Verbe] ?  |  3. Formelle: [Verbe]-[Sujet] ? (Viens-tu ?)',
    goldenRule: 'French offers three grammatical registers for yes/no and open questions: rising intonation (casual), "Est-ce que" (neutral/everyday), and subject-verb inversion with a hyphen (formal/literary). With inversion, insert "-t-" between vowels: "A-t-il compris ?".',
    topics: [
      {
        id: 'topic-1-interrogative-sentences',
        title: '1. Interrogative Sentences',
        detailedDescription: [
          'There are several ways to communicate a question. One way to create an interrogative sentence is to use an affirmative sentence and end it with a rising inflection. The intonation alone communicates a question in spoken language; a question mark follows the interrogative sentence in written texts.',
          'This manner of asking a question is familiar and preferred in oral interactions. To transcribe this oral question into writing, a question mark helps identify an interrogative sentence. Sometimes a yes orno answer may suffice as is shown in the following examples:',
          'Another way of forming a question is to start with a negative declarative sentence. Add a question mark to a negative declarative sentence and as a result you have an interrogative sentence.'
        ],
        contrastExamples: [
          {
            french: 'Tu passes un examen?',
            english: 'Are you taking an exam?',
            aspectNote: 'Informal rising intonation question.',
          },
          {
            french: 'Le magasin est fermé? ',
            english: 'Is the store closed?',
            aspectNote: 'Informal rising intonation question.',
          },
          {
            french: 'Vous ne travailliez pas pour nous? ',
            english: 'You don\'t work for us?',
            aspectNote: 'Informal rising intonation question with negation.',
          },
          {
            french: 'Elle ne voit rien? ',
            english: 'She doesn\'t see anything?',
            aspectNote: 'Informal rising intonation question with negation.',
          }
        ]
      },
      {
        id: 'topic-2-est-ce-que',
        title: '2. Interrogative sentences with est-ce que',
        detailedDescription: [
          'We have previously seen that one way to create an interrogative sentence is to use an affirmative sentence and end it with a rising inflection. Another way to create an interrogative sentence in French is to place the phrase **est-ce que** before the declarative sentence.',
        ],
        contrastExamples: [
          {
            french: 'Est-ce que le magasin est fermé? ',
            english: 'Is the store closed?',
            aspectNote: 'Standard interrogative sentence using "est-ce que".',
          },
          {
            french: 'Est-ce qu’elle ne va pas se marier? ',
            english: 'Isn\'t she going to get married?',
            aspectNote: 'Standard interrogative sentence using "est-ce que" with negation.',
          },
        ]
      },
      {
        id: 'topic-3-inversion',
        title: '3. Interrogative sentences with inversion',
        detailedDescription: [
          'The inverted interrogative structure is somewhat formal but is sometimes used in informal situations, for example, when asking for the time: **Quelle heure est-il?**',
          'If the subject of the verb in the declarative sentence is a personal pronoun, it suffices to invert the subject and the verb while separating the two with a hyphen. The result is an interrogative sentence.',
          '**verb + subject pronoun**',
          'If the subject of the verb in the declarative sentence is a noun, the subject + verb structure of the declarative sentence will remain the same, but the appropriate subject pronoun that can replace the subject noun is added after the verb and is linked to the verb with a hyphen.',
          '**subject noun + verb-pronoun of subject**',
          'Also note that whenever a verb ends in a vowel, the letter -t- is inserted between the verb and the pronoun'
        ],
        contrastExamples: [
          {
            french: 'Est-il fermé?',
            english: 'Is it closed?',
            aspectNote: 'Formal interrogative sentence using inversion with euphonic "-t-".',
          },
          {
            french: 'Chantera-t-elle fort?',
            english: 'Will she sing loudly?',
            aspectNote: 'Formal interrogative sentence using inversion with euphonic "-t-".',
          },
          {
            french: 'Le magasin est-il fermé?',
            english: 'Is the store closed?',
            aspectNote: 'Formal interrogative sentence using inversion with a subject noun and pronoun.',
          },
          {
            french: 'La maison sera-t-elle vendue? ',
            english: 'Will the house be sold?',
            aspectNote: 'Formal interrogative sentence using inversion with a plural subject noun and pronoun.',
          }
        ]
      },
      {
        id: 'topic-4-tag-questions',
        title: '4. Tag Questions',
        detailedDescription: [
          'Another way of forming a question both in English and French is to add a “tag” at the end of a declarative sentence. The tag phrase n’est-ce pas is used in all registers of the French language.',
          '**declarative sentence, + tag + ?**',
          'In French, some common and familiar tags added to declarative sentences to create questions are: non? (no?), pas vrai? (not true? / right?), and tu ne crois pas? / tu ne penses pas? (don’t you think?)'
        ],
        contrastExamples: [
          {
            french: 'Tu viens avec nous, n’est-ce pas?',
            english: 'You are coming with us, aren’t you?',
            aspectNote: 'Declarative sentence with tag question.',
          },
          {
            french: 'La gérante est intelligente, non? ',
            english: 'The manager is smart, isn’t she?',
            aspectNote: 'Declarative sentence with tag question.',
          },
          {
            french: 'Marc nage bien, tu ne penses pas? ',
            english: 'Marc swims very well, don’t you think?',
            aspectNote: 'Declarative sentence with tag question.',
          }
        ],
      },
      {
        id: 'topic-5-questions-with-qui',
        title: '5. Questions with "qui"',
        detailedDescription: [
          'There are several ways to create an interrogative sentence with the interrogative pronoun qui. The elements and word order in the sentence will vary according to the function performed by qui, which can be either subject or direct object.',
          '**Qui + verb | Qui est-ce qui + verb | Qui est-ce que + subject + verb | Qui + interrogative sentence including inversion**'
        ],
        contrastExamples: [
          {
            french: 'Qui était ce monsieur?',
            english: 'Who was that gentleman?',
            aspectNote: 'Interrogative sentence with "qui" as subject.',
          },
          {
            french: 'Qui est-ce qui dit cela? ',
            english: 'Who says that?',
            aspectNote: 'Interrogative sentence with "qui" as subject and "est-ce qui".',
          },
          {
            french: 'Qui est-ce que nous inviterons? ',
            english: 'Whom will we invite?',
            aspectNote: 'Interrogative sentence with "qui" as direct object and "est-ce que".',
          },
          {
            french: 'Qui Marielle a-t-elle épousé? ',
            english: 'Whom did Marielle marry?',
            aspectNote: 'Interrogative sentence with "qui" as direct object and inversion.',
          }
        ]
      },
      {
        id: 'topic-6-questions-with-que',
        title: '6. Questions with "que"',
        detailedDescription: [
          'The phrase qu’est-ce que/qu’ as well as the pronoun que express what and play the role of directobject in a sentence.',
          '**Qu’est-ce que/qu’ + subject + verb**',
          '**Que/Qu’ + verb + subject**',
        ],
        contrastExamples: [
          {
            french: 'Qu’est-ce qu’Anne fait? ',
            english: 'What is Anne doing?',
            aspectNote: 'Interrogative sentence with "qu’est-ce que" as direct object.',
          },
          {
            french: 'Qu’allons-nous manger?',
            english: 'What are we going to eat?',
            aspectNote: 'Interrogative sentence with "que" as direct object and inversion.',
          },
          {
            french: 'Qu’est-ce qui arrive? ',
            english: 'What is happening?',
            aspectNote: 'Interrogative sentence with "qu’est-ce qui" as subject.',
          }
        ]
      },
      {
        id: 'topic-7-interrogative-adverbs',
        title: '7. Questions with interrogative adverbs',
        detailedDescription: [
          'With the interrogative adverbs pourquoi (why), comment (how), quand (when), combien de (how many/how much), and où (where), French uses the following methods to create interrogative sentences:',
          '**Interrogative adverb + est-ce que + declarative sentence**',
          '**Interrogative adverb + word order appropriate to inversion method**',
          '**Interrogative adverb + word order of simple declarative sentence**',
        ],
        contrastExamples: [
          {
            french: 'Comment est-ce que tu vas? ',
            english: 'How are you doing?',
            aspectNote: 'Interrogative sentence with "comment" as interrogative adverb.',
          },
          {
            french: 'Pourquoi Patrick n’aime-t-il pas son travail? ',
            english: 'Why doesn\'t Patrick like his job?',
            aspectNote: 'Interrogative sentence with "pourquoi" as interrogative adverb and inversion.',
          },
          {
            french: 'Quand tu vas au travail? ',
            english: 'When do you go to work?',
            aspectNote: 'Interrogative sentence with "quand" as interrogative adverb and simple declarative word order.',
          }
        ]
      },
      {
        id: 'topic-8-adjective-quel',
        title: '8. Questions with the adjective "quel"',
        detailedDescription: [
          'Many very common interrogative questions include a form of the adjective quel. Here are a few. Note how the form of quel changes according to the gender (masculine or feminine) and the number (singular or plural) of the noun it accompanies. As previously seen, there are again three ways to create this type of question: the est-ce que method, the inversion method, and the voice pitch method.',
          '**Quel / Quelle / Quels / Quelles + noun**',
          '**Quel / Quelle / Quels / Quelles + est-ce que + subject + verb**',
          '**Quel / Quelle / Quels / Quelles + verb + subject**',
        ],
        contrastExamples: [
          {
            french: 'Quel train est-ce que tu prends? ',
            english: 'Which train are you taking?',
            aspectNote: 'Interrogative sentence with "quel" as interrogative adjective and "est-ce que".',
          },
          {
            french: 'Quelle heure est-il?',
            english: 'What time is it?',
            aspectNote: 'Interrogative sentence with "quelle" as interrogative adjective and "est-ce que".',
          },
          {
            french: 'Quels livres as-tu lus?',
            english: 'What books have you read?',
            aspectNote: 'Interrogative sentence with "quels" as interrogative adjective and "est-ce que".',
          },
          {
            french: 'Quelles dates tu préfères?',
            english: 'What dates do you prefer?',
            aspectNote: 'Interrogative sentence with "quelles" as interrogative adjective and "est-ce que".',
          }
        ],
      }
    ],
    practiceExercises: [
      {
        id: 'ex-u7-1',
        type: 'multiple-choice',
        prompt: 'Choose the correct formal inversion for: "Elle habite à Paris."',
        options: ['Habite-t-elle à Paris ?', 'Habite-elle à Paris ?', 'Est-ce qu\'elle habite à Paris ?', 'Elle habite-t-elle à Paris ?'],
        correctAnswer: 'Habite-t-elle à Paris ?',
        hint: 'Add euphonic "-t-" between verb ending in vowel and "elle".',
        explanation: 'Because "habite" ends in "e" and "elle" begins with "e", French inserts "-t-": "Habite-t-elle ?".',
      },
      {
        id: 'ex-u7-2',
        type: 'sentence-builder',
        prompt: 'Build the question: "Quand est-ce que le train arrive ?"',
        words: ['le', 'Quand', 'arrive', 'est-ce', 'que', 'train', '?'],
        correctAnswer: 'Quand est-ce que le train arrive ?',
        hint: 'Interrogative word + est-ce que + subject + verb.',
        explanation: 'Correct standard interrogation: Quand + est-ce que + le train + arrive ?',
      },
    ],
  },

  // ==========================================
  // Unit 8: Exclamations and Commands
  // ==========================================
  {
    id: 'unit-8-exclamations-commands',
    unitNumber: 8,
    category: 'Sentence Structure & Clauses',
    level: 'A1',
    title: 'Unit 8: Exclamations and Commands (L\'impératif & Exclamations)',
    frenchTitle: 'Unité 8 : Les exclamations et les ordres (Impératif)',
    subtitle: 'Express commands, advice, requests, and emotional exclamations using "que", "comme", and "quel".',
    formula: 'Impératif: [Tu] → Parle ! (no -s for -er)  |  [Nous] → Parlons !  |  [Vous] → Parlez !  |  Exclamations: Quel(le)(s) + Nom ! / Comme + Phrase ! / Qu\'est-ce que + Phrase !',
    goldenRule: 'For regular -er verbs (and aller), the "tu" form of the imperative DROPS the final "-s" (Parle !, Va !), except when followed by "y" or "en" for phonetics (Vas-y !, Manges-en !).',
    detailedDescription: [
      'With the appropriate punctuation you can use declarative sentences to express strong feelings. For some, a definition of an exclamatory sentence in English and in French alike is a forceful declarative sentence that shows strong emotion. In writing, an exclamation mark ends the sentence.',
      '**declarative sentence + !**',
      'Some exclamatory sentences start with que (how) or comme (how). These words underscore the quality, nature, or intensity of the adjective or verb that follows them.',
      '**que + declarative sentence + !**',
      'Exclamations can also be introduced by a form of the adjective quel (what). This exclamation word underscores the quality, nature, or intensity of the noun or noun phrase it describes.',
      '**quel / quelle / quels / quelles + noun + !**',
    ],
    contrastExamples: [
      {
        french: 'Je suis la meilleure! ',
        english: 'I am the best!',
        aspectNote: 'Exclamatory declarative sentence with strong emotion.',
      },
      {
        french: 'Que c’est beau! ',
        english: 'How beautiful it is!',
        aspectNote: 'Exclamatory sentence starting with "que" emphasizing the adjective "beau".',
      },
      {
        french: 'Quelle magnifique surprise !',
        english: 'What a magnificent surprise!',
        aspectNote: 'Exclamative adjective "Quelle" agreeing in feminine singular with "surprise".',
      },
      {
        french: 'Quel conducteur!',
        english: 'What a driver!',
        aspectNote: 'Exclamatory sentence starting with "quel" emphasizing the noun "conducteur".',
      }
    ],
    commonTraps: [
      'Writing "Manges ta soupe !" with an -s (it must be "Mange ta soupe !").',
      'Using subject pronouns in commands (e.g. "Tu viens ici !" is not a true imperative).',
    ],
    practiceExercises: [
      {
        id: 'ex-u8-1',
        type: 'multiple-choice',
        prompt: 'Choose the correct imperative command for "écouter" (to tu):',
        options: ['Écoute !', 'Écoutes !', 'Écoutez !', 'Tu écoutes !'],
        correctAnswer: 'Écoute !',
        hint: '-ER verbs drop the -s for the tu command.',
        explanation: 'In the imperative "tu" form of -er verbs, the final "s" is dropped: "Écoute !".',
      },
      {
        id: 'ex-u8-2',
        type: 'multiple-choice',
        prompt: 'Complete the exclamation: "_____ belle vue sur la mer !"',
        options: ['Quelle', 'Quel', 'Quels', 'Comme'],
        correctAnswer: 'Quelle',
        hint: '"Vue" is feminine singular.',
        explanation: 'Feminine singular exclamative adjective is "Quelle".',
      },
    ],
  },

  // ==========================================
  // Unit 10: Present Tense of -ER Verbs
  // ==========================================
  {
    id: 'unit-10-present-er-verbs',
    unitNumber: 10,
    category: 'Present Tense & Core Conjugations',
    level: 'A1',
    title: 'Unit 10: The Present Tense of -ER Verbs (1st Group)',
    frenchTitle: 'Unité 10 : Le présent de l\'indicatif des verbes en -ER',
    subtitle: 'Conjugate over 85% of French verbs, including spelling changes in -cer, -ger, -yer, and -eler.',
    formula: 'Radical = Infinitif - [er]  |  Terminaisons: je -e, tu -es, il -e, nous -ons, vous -ez, ils -ent',
    goldenRule: 'The endings **-e, -es, and -ent** are completely **SILENT phonetically**; only the stem consonant is heard (je parle, tu parles, ils parlent all sound identical: **/paʁl/**).',
    topics: [
      {
        id: 'topic-10-regular-conjugation',
        title: '1. Regular -ER Conjugation',
        detailedDescription: [
          'Before studying the present tense in French, you need to be familiar with the grammatical terms in chapters presenting verbs. To conjugate a verb in the present tense, you’ll need to find the root (or stem) of a verb to which you’ll add the ending corresponding to the desired tense. The root of the verb is found in its infinitive form. In English, the infinitive is preceded by the preposition to: to say, to wear. Infinitives in French are not preceded by an equivalent of the preposition to. They are identified according to groups by their endings: -er, -ir, -re, -oir.',
          'The endings for the -er regular verbs are: -e, -es, -e, -ons, -ez, -ent. The -e, -es, and -ent endings of the verbs are all silent. The final -s of nous, vous, ils, elles links with verbs beginning with a vowel sound, making a z sound. This is called a liaison.',
        ],
        tables: [
          {
            title: 'Parler Conjugation Paradigm',
            subtitle: 'Written forms vs. phonetic pronunciations',
            description: 'Observe the mute "e" endings in the boot.',
            headers: ['Pronoun', 'Written Form', 'English Meaning'],
            rows: [
              ['Je', 'parle', 'I speak'],
              ['Tu', 'parles', 'you speak'],
              ['Il / Elle / On', 'parle', 'he / she speaks'],
              ['Nous', 'parlons', 'we speak'],
              ['Vous', 'parlez', 'you speak'],
              ['Ils / Elles', 'parlent', 'they speak']
            ]
          }
        ],
      },
      {
        id: 'topic-10-cer-ger-spelling',
        title: '2. Spelling Adjustments in -ger & -cer (Nous Form)',
        formula: '-ger: nous [-geons] (manger → mangeons)  |  -cer: nous [-çons] (commencer → commençons)',
        goldenRule: 'Verbs ending in **-ger** insert an **« e »** before "-ons" in the *nous* form (**nous mangeons**) to keep the soft "g". Verbs ending in **-cer** take a cedilla **« ç »** before "-ons" (**nous commençons**) to keep the soft "s".',
        detailedDescription: [
          'In French, "g" followed by "o" produces a hard /g/ sound (as in "gong"). To retain the soft /ʒ/ sound of *manger*, an "e" is inserted: **nous mangeons**, **nous voyageons**, **nous partageons**.',
          'Similarly, "c" before "o" sounds hard /k/ (as in "cola"). To preserve the soft /s/ sound of *commencer*, a cedilla is added: **nous commençons**, **nous avançons**.'
        ],
        tables: [
          {
            title: 'Spelling Adjustments for Nous (Manger & Commencer)',
            subtitle: 'Preserving soft consonant sounds before "-ons"',
            description: 'These adjustments occur solely in the nous form.',
            headers: ['Pronoun', 'Manger (-ger)', 'Commencer (-cer)'],
            rows: [
              ['Je', 'mange', 'commence'],
              ['Tu', 'manges', 'commences'],
              ['Il / Elle', 'mange', 'commence'],
              ['Nous', 'mangeons (extra "e"!)', 'commençons (cedilla "ç"!)'],
              ['Vous', 'mangez', 'commencez'],
              ['Ils / Elles', 'mangent', 'commencent']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Nous commençons le cours et nous mangeons ensemble.',
            english: 'We begin the class and we eat together.',
            aspectNote: 'Spelling adjustments for nous: commençons (ç) and mangeons (ge).'
          },
          {
            french: 'Nous voyageons souvent en France.',
            english: 'We travel often in France.',
            aspectNote: 'Voyager takes "-geons" in the nous form: voyageons.'
          }
        ]
      },
      {
        id: 'topic-10-stem-changing-boot',
        title: '3. Stem-Changing Boot Verbs (-yer, -eler, -eter, accent shifts)',
        formula: 'Boot forms (je, tu, il, ils): changement de radical  |  Nous / Vous: radical régulier d\'origine',
        goldenRule: 'In "boot verbs", the stem changes whenever the ending is silent (je, tu, il, ils). For **nous** and **vous**, where the ending is pronounced (-ons, -ez), the original infinitive stem returns.',
        detailedDescription: [
          '**-yer verbs** (payer, envoyer): "y" becomes "i" in the boot: **je paie, tu paies, il paie, ils paient**, but **nous payons, vous payez**.',
          '**-eler / -eter verbs** (appeler, jeter): double the consonant in the boot: **j\'appelle, tu appelles, ils appellent**, but **nous appelons, vous appelez**.',
          '**Accent changes** (acheter, préférer): **j\'achète**, but **nous achetons** ; **je préfère**, but **nous préférons**.'
        ],
        tables: [
          {
            title: 'Boot Verb Paradigm (Appeler & Acheter)',
            subtitle: 'Double consonants and grave accents in the boot',
            description: 'Notice the difference between the boot forms and nous/vous.',
            headers: ['Pronoun', 'Appeler (Stem: appell- vs appel-)', 'Acheter (Stem: achèt- vs achet-)'],
            rows: [
              ['Je', 'j\'appelle (double l)', 'j\'achète (grave accent)'],
              ['Tu', 'tu appelles (double l)', 'tu achètes (grave accent)'],
              ['Il / Elle', 'il appelle (double l)', 'il achète (grave accent)'],
              ['Nous', 'nous appelons (single l)', 'nous achetons (no accent)'],
              ['Vous', 'vous appelez (single l)', 'vous achetez (no accent)'],
              ['Ils / Elles', 'ils appellent (double l)', 'ils achètent (grave accent)']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'J\'appelle mon frère, mais nous appelons nos parents.',
            english: 'I call my brother, but we call our parents.',
            aspectNote: 'Double "l" in boot form (j\'appelle) vs single "l" in nous (appelons).'
          },
          {
            french: 'J\'achète ce livre pendant que nous achetons les billets.',
            english: 'I buy this book while we buy the tickets.',
            aspectNote: 'Grave accent on j\'achète vs no accent on nous achetons.'
          }
        ]
      }
    ],
    practiceExercises: [
      {
        id: 'ex-u10-1',
        type: 'multiple-choice',
        prompt: 'Choose the correct conjugation: "Nous _____ (commencer) le projet."',
        options: ['commençons', 'commencons', 'commenceons', 'commencez'],
        correctAnswer: 'commençons',
        hint: 'A cedilla is needed under the "c" before "o".',
        explanation: 'To maintain the soft /s/ sound before "o", "c" becomes "ç": commençons.',
      },
      {
        id: 'ex-u10-2',
        type: 'multiple-choice',
        prompt: 'Choose the correct form: "Ils _____ (parler) français couramment."',
        options: ['parlent', 'parlons', 'parlez', 'parles'],
        correctAnswer: 'parlent',
        hint: 'Third-person plural ends in -ent.',
        explanation: 'Ils/elles takes the ending "-ent": parlent.',
      },
    ],
  },

  // ==========================================
  // Unit 11: Present of -IR and -RE Verbs
  // ==========================================
  {
    id: 'unit-11-present-ir-re-verbs',
    unitNumber: 11,
    category: 'Present Tense & Core Conjugations',
    level: 'A1',
    title: 'Unit 11: The Present of -IR and -RE Verbs (2nd & 3rd Groups)',
    frenchTitle: 'Unité 11 : Le présent des verbes en -IR et en -RE',
    subtitle: 'Conjugate regular 2nd group verbs with "-iss-" infix and standard 3rd group -re verbs.',
    formula: '-IR (2e groupe): je -is, tu -is, il -it, nous -issons, vous -issez, ils -issent  |  -RE: je -s, tu -s, il [rien/d], nous -ons, vous -ez, ils -ent',
    goldenRule: 'Regular 2nd-group **-IR verbs** (finir, choisir, réfléchir) expand with the **« -iss- »** infix in all plural forms (**nous finissons, vous finissez, ils finissent**). Regular **-RE verbs** take no extra letter after "d" in the *il/elle* form (**il vend, elle attend**).',
    detailedDescription: [
      'The 2nd group (-IR verbs) is defined by its characteristic "-iss-" sound in the plural.',
      'The 3rd group contains both irregular -IR verbs (like *partir, sortir*) and regular -RE verbs (like *vendre, attendre*).'
    ],
    topics: [
      {
        id: 'topic-11-regular-ir-second-group',
        title: '1. Regular 2nd Group -IR with "-iss-" Infix',
        formula: 'Singulier: [-is, -is, -it]  |  Pluriel: [-issons, -issez, -issent]',
        goldenRule: 'To conjugate 2nd group verbs like **finir, choisir, grandir, réussir**, replace "-ir" with **-is, -is, -it** in the singular, and insert the **« -iss- »** sound before plural endings.',
        detailedDescription: [
          'Finir: Je **finis**, Tu **finis**, Il/Elle **finit**, Nous **finissons**, Vous **finissez**, Ils/Elles **finissent**.',
          'Notice that the final consonants "s" and "t" in the singular (*finis, finit*) are silent: both sound like /fini/.'
        ],
        tables: [
          {
            title: 'Conjugation of Finir and Choisir',
            subtitle: 'The hallmark "-iss-" infix in the plural',
            description: 'Over 300 verbs follow this exact model.',
            headers: ['Pronoun', 'Finir (to finish)', 'Choisir (to choose)', 'Phonetic Ending'],
            rows: [
              ['Je', 'finis', 'choisis', '/i/'],
              ['Tu', 'finis', 'choisis', '/i/'],
              ['Il / Elle', 'finit', 'choisit', '/i/'],
              ['Nous', 'finissons', 'choisissons', '/i.sɔ̃/'],
              ['Vous', 'finissez', 'choisissez', '/i.se/'],
              ['Ils / Elles', 'finissent', 'choisissent', '/is/']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Nous finissons nos devoirs et nous choisissons un film.',
            english: 'We finish our homework and we choose a movie.',
            aspectNote: '2nd group -IR infix "-iss-" in plural forms: finissons, choisissons.'
          },
          {
            french: 'Elle réussit toujours ses examens avec brio.',
            english: 'She always passes her exams with flying colors.',
            aspectNote: 'Third person singular of réussir: elle réussit.'
          }
        ]
      },
      {
        id: 'topic-11-irregular-ir-third-group',
        title: '2. Irregular 3rd Group -IR Verbs (Partir, Sortir, Dormir)',
        formula: 'Singulier (radical court): [-s, -s, -t]  |  Pluriel (radical complet): [-ons, -ez, -ent]',
        goldenRule: 'Verbs like **partir, sortir, dormir, servir** do NOT have the "-iss-" sound. In the singular, they **drop the final consonant of the root**: **je pars, tu pars, il part** (root par-). In the plural, the consonant returns: **nous partons**.',
        detailedDescription: [
          'Compare: *finir* has *nous finissons* (2nd group), but *partir* has *nous partons* (3rd group)!',
          'Singular: Je **pars**, Tu **pars**, Il **part**. Plural: Nous **partons**, Vous **partez**, Ils **partent**.'
        ],
        tables: [
          {
            title: 'Partir vs. Finir Group Comparison',
            subtitle: 'Short root (singular) vs. Infix "-iss-"',
            description: 'Check whether the verb drops a consonant or adds "-iss-".',
            headers: ['Pronoun', 'Partir (3rd Group)', 'Sortir (3rd Group)', 'Dormir (3rd Group)'],
            rows: [
              ['Je', 'pars (drops t)', 'sors (drops t)', 'dors (drops m)'],
              ['Tu', 'pars (drops t)', 'sors (drops t)', 'dors (drops m)'],
              ['Il / Elle', 'part (drops t)', 'sort (drops t)', 'dort (drops m)'],
              ['Nous', 'partons', 'sortons', 'dormons'],
              ['Vous', 'partez', 'sortez', 'dormez'],
              ['Ils / Elles', 'partent', 'sortent', 'dorment']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Je pars demain à Paris et je dors chez un ami.',
            english: 'I leave tomorrow for Paris and I am sleeping at a friend\'s house.',
            aspectNote: 'Dropped consonant in singular: pars (partir), dors (dormir).'
          },
          {
            french: 'Nous partons en vacances la semaine prochaine.',
            english: 'We leave on vacation next week.',
            aspectNote: 'Restored root consonant in plural: partons.'
          }
        ]
      },
      {
        id: 'topic-11-re-verbs-prendre',
        title: '3. Regular -RE Verbs & -prendre Patterns',
        formula: 'Réguliers en -RE: [-s, -s, -rien (d), -ons, -ez, -ent]  |  Prendre: [prends, prends, prend, prenons, prenez, prennent]',
        goldenRule: 'Regular -RE verbs (**vendre, attendre, entendre, répondre**) take **no extra ending after "d"** in the third-person singular (**il attend**, never "il attendt"). Verbs in **-prendre** double the "n" in the 3rd person plural (**ils prennent**).',
        detailedDescription: [
          'Vendre: Je **vends**, Tu **vends**, Il **vend**, Nous **vendons**, Vous **vendez**, Ils **vendent**.',
          'Prendre family (*apprendre, comprendre, surprendre*): Je **prends**, Tu **prends**, Il **prend**, Nous **prenons**, Vous **prenez**, Ils **prennent** (pronounced /pʁɛn/).'
        ],
        tables: [
          {
            title: 'Vendre and Prendre Conjugations',
            subtitle: 'Regular -RE vs. Double-n Prendre paradigm',
            description: 'Notice that "il vend" and "il prend" have no ending after d.',
            headers: ['Pronoun', 'Vendre (Regular -RE)', 'Prendre (Irregular -RE)'],
            rows: [
              ['Je', 'vends', 'prends'],
              ['Tu', 'vends', 'prends'],
              ['Il / Elle / On', 'vend (no ending!)', 'prend (no ending!)'],
              ['Nous', 'vendons', 'prenons'],
              ['Vous', 'vendez', 'prenez'],
              ['Ils / Elles', 'vendent', 'prennent (double n!)']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Il attend le bus pendant que nous vendons nos livres.',
            english: 'He waits for the bus while we sell our books.',
            aspectNote: 'Regular -RE verb: "il attend" (no extra ending after d) vs "nous vendons".'
          },
          {
            french: 'Les enfants prennent le goûter à quatre heures.',
            english: 'The children have a snack at four o\'clock.',
            aspectNote: 'Double "n" in third person plural: prennent (/pʁɛn/).'
          }
        ]
      }
    ],
    rules: [
      'Regular -IR verbs (finir type): je finis, tu finis, il finit, nous finissons, vous finissez, ils finissent.',
      'Irregular -IR verbs (partir, sortir, dormir type): drop the last letter of the root in the singular: je pars, tu pars, il part, nous partons, vous partez, ils partent.',
      'Regular -RE verbs (vendre type): je vends, tu vends, il vend (root ending in d), nous vendons, vous vendez, ils vendent.',
      'Verbs in -prendre (prendre, comprendre, apprendre) double the "n" in the plural: ils prennent, ils comprennent.',
    ],
    contrastExamples: [
      {
        french: 'Nous finissons nos devoirs et nous choisissons un film.',
        english: 'We finish our homework and we choose a movie.',
        aspectNote: '2nd group -IR infix "-iss-" in plural forms: finissons, choisissons.',
      },
      {
        french: 'Il attend le bus pendant que nous vendons nos livres.',
        english: 'He waits for the bus while we sell our books.',
        aspectNote: 'Regular -RE verb: "il attend" (no extra ending after d) vs "nous vendons".',
      },
    ],
    conjugationHighlight: {
      verb: 'Finir',
      tense: 'Présent de l\'indicatif',
      table: {
        je: 'finis',
        tu: 'finis',
        'il/elle/on': 'finit',
        nous: 'finissons',
        vous: 'finissez',
        'ils/elles': 'finissent',
      },
    },
    commonTraps: [
      'Adding a "t" to regular -re verbs in third person singular (say "il vend", never "il vendt").',
      'Confusing "finir" group (nous finissons) with "partir" group (nous partons, not partissons).',
    ],
    practiceExercises: [
      {
        id: 'ex-u11-1',
        type: 'multiple-choice',
        prompt: 'Conjugate "choisir" for "nous": "Nous _____ une table près de la fenêtre."',
        options: ['choisissons', 'choisons', 'choisissez', 'choisit'],
        correctAnswer: 'choisissons',
        hint: '2nd group -ir verbs use the "-issons" ending.',
        explanation: 'Regular 2nd group verbs take "-issons" for nous: choisissons.',
      },
      {
        id: 'ex-u11-2',
        type: 'multiple-choice',
        prompt: 'Conjugate "attendre" for "elle": "Elle _____ son ami à la gare."',
        options: ['attend', 'attends', 'attendt', 'attende'],
        correctAnswer: 'attend',
        hint: 'Regular -re verbs take no ending after the "d" in 3rd person singular.',
        explanation: 'Elle attend (stem ends in d, no additional ending).',
      },
    ],
  },

  // ==========================================
  // Unit 12: Être, Avoir and Irregular Verbs
  // ==========================================
  {
    id: 'unit-12-etre-avoir-irregulars',
    unitNumber: 12,
    category: 'Present Tense & Core Conjugations',
    level: 'A1',
    title: 'Unit 12: Être, Avoir, Aller, Faire & Essential Irregular Verbs',
    frenchTitle: 'Unité 12 : Être, avoir, aller, faire et les verbes irréguliers fondamentaux',
    subtitle: 'Master the top high-frequency auxiliary and modal verbs in the French language.',
    formula: 'Être: suis, es, est, sommes, êtes, sont  |  Avoir: ai, as, a, avons, avez, ont  |  Aller: vais, vas, va, allons, allez, vont  |  Faire: fais, fais, fait, faisons, faites, font',
    goldenRule: 'Watch out for **« vous êtes »** and **« vous faites »** (two of only three present verbs ending in **-tes** for vous: vous êtes, vous faites, vous dites) and third person plurals ending in **-ont** (ils sont, ils ont, ils vont, ils font).',
    detailedDescription: [
      'The verbs *être, avoir, aller*, and *faire* are the four undisputed pillars of the French language.',
      'Beyond their primary meanings, they act as tense auxiliaries, question tags, weather indicators, and near future markers.'
    ],
    topics: [
      {
        id: 'topic-12-etre-avoir',
        title: '1. Être & Avoir (Dual Roles as Auxiliary & Verb)',
        formula: 'Être: [suis, es, est, sommes, êtes, sont]  |  Avoir: [ai, as, a, avons, avez, ont]',
        goldenRule: 'Beware the phonetic difference between **« ils ont »** (voiced /z/ liaison: /il.z‿ɔ̃/) and **« ils sont »** (voiceless /s/: /il.sɔ̃/). Confusing them flips "they have" and "they are"!',
        detailedDescription: [
          'Être expresses identity, profession, origin, and location (**« Je suis canadien »**, **« Elle est à Paris »**).',
          'Avoir expresses possession, age (**« J\'ai 25 ans »**, never "Je suis 25 ans"), and physical sensations (**« avoir faim, avoir soif, avoir chaud »**).'
        ],
        tables: [
          {
            title: 'Être vs. Avoir Conjugation Comparison',
            subtitle: 'Side-by-side present tense comparison',
            description: 'Pay close attention to pronunciation of 3rd person plural.',
            headers: ['Pronoun', 'Être (to be)', 'Avoir (to have)'],
            rows: [
              ['Je / J\'', 'suis', 'ai'],
              ['Tu', 'es', 'as'],
              ['Il / Elle / On', 'est', 'a'],
              ['Nous', 'sommes', 'avons'],
              ['Vous', 'êtes', 'avez'],
              ['Ils / Elles', 'sont (/il.sɔ̃/)', 'ont (/il.z‿ɔ̃/ with liaison)']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Ils ont un chien et ils sont très contents.',
            english: 'They have a dog and they are very happy.',
            aspectNote: 'Phonetic distinction: Ils ont (/il.z‿ɔ̃/) vs Ils sont (/il.sɔ̃/).'
          },
          {
            french: 'Quel âge avez-vous ? J\'ai trente ans.',
            english: 'How old are you? I am thirty years old.',
            aspectNote: 'Age is always expressed with "avoir", never "être".'
          }
        ]
      },
      {
        id: 'topic-12-aller-faire',
        title: '2. Aller & Faire (Near Future & Daily Idioms)',
        formula: 'Aller: [vais, vas, va, allons, allez, vont]  |  Faire: [fais, fais, fait, faisons, faites, font]',
        goldenRule: '**Aller** forms the Near Future (**aller + infinitif**). **Faire** is used for all weather statements (**il fait beau, il fait froid**) and activities (**faire du sport, faire la cuisine**).',
        detailedDescription: [
          'Remember the irregular *vous* form for faire: **vous faites** (saying *"vous faisez"* is a major error!).',
          'Both verbs end in **-ont** for third person plural: **ils vont**, **ils font**.'
        ],
        tables: [
          {
            title: 'Aller and Faire Conjugation Matrix',
            subtitle: 'Forms and high-frequency expressions',
            description: 'Notice the irregular plural endings.',
            headers: ['Pronoun', 'Aller (to go)', 'Faire (to do/make)'],
            rows: [
              ['Je', 'vais', 'fais'],
              ['Tu', 'vas', 'fais'],
              ['Il / Elle / On', 'va', 'fait (il fait beau)'],
              ['Nous', 'allons', 'faisons'],
              ['Vous', 'allez', 'faites (ends in -tes!)'],
              ['Ils / Elles', 'vont (ends in -ont)', 'font (ends in -ont)']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Vous faites du sport et vous allez à la salle de gym.',
            english: 'You do sports and you go to the gym.',
            aspectNote: 'Irregular "vous faites" + regularized "vous allez".'
          },
          {
            french: 'Aujourd\'hui, il fait beau et nous allons nous promener.',
            english: 'Today, the weather is nice (faire) and we are going to take a walk (aller).',
            aspectNote: 'Weather idiom with faire + near future with aller.'
          }
        ]
      },
      {
        id: 'topic-12-modals',
        title: '3. Core Modal Verbs (Pouvoir, Vouloir, Devoir)',
        formula: 'Pouvoir (can): peux, peux, peut, pouvons, pouvez, peuvent  |  Vouloir (want): veux, veux, veut, voulons, voulez, veulent  |  Devoir (must): dois, dois, doit, devons, devez, doivent',
        goldenRule: 'Modal verbs are immediately followed by a **bare infinitive** without any preposition: **« Je veux apprendre »**, **« Il peut venir »**, **« Nous devons partir »**.',
        detailedDescription: [
          'Notice that in *pouvoir* and *vouloir*, the singular takes an "-x": **je peux, tu peux ; je veux, tu veux**.',
          'The third person plural forms take stem shifts: **ils peuvent**, **ils veulent**, **ils doivent**.'
        ],
        tables: [
          {
            title: 'The Three Core Modal Verbs',
            subtitle: 'Pouvoir, Vouloir, Devoir in Present Tense',
            description: 'Notice "-x" endings in the singular for pouvoir and vouloir.',
            headers: ['Pronoun', 'Pouvoir (Ability / Permission)', 'Vouloir (Desire / Will)', 'Devoir (Obligation / Must)'],
            rows: [
              ['Je', 'peux', 'veux', 'dois'],
              ['Tu', 'peux', 'veux', 'dois'],
              ['Il / Elle', 'peut', 'veut', 'doit'],
              ['Nous', 'pouvons', 'voulons', 'devons'],
              ['Vous', 'pouvez', 'voulez', 'devez'],
              ['Ils / Elles', 'peuvent', 'veulent', 'doivent']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Je veux sortir mais je dois finir mes devoirs.',
            english: 'I want to go out but I must finish my homework.',
            aspectNote: 'Vouloir + infinitive and Devoir + infinitive.'
          },
          {
            french: 'Est-ce que nous pouvons entrer ?',
            english: 'Can we come in?',
            aspectNote: 'Pouvoir expressing permission followed by bare infinitive.'
          }
        ]
      }
    ],
    rules: [
      'Être (to be) and Avoir (to have) serve as both standalone verbs and the auxiliaries for all compound tenses.',
      'Aller (to go) is irregular (je vais, tu vas, il va...) and forms the Near Future (Futur Proche = aller + infinitif).',
      'Faire (to do/make) is used for activities, weather expressions (il fait beau, il fait froid), and causative structures.',
      'Key irregular modals: Pouvoir (je peux, nous pouvons, ils peuvent), Vouloir (je veux, nous voulons, ils veulent), Devoir (je dois, nous devons, ils doivent).',
    ],
    contrastExamples: [
      {
        french: 'Ils ont un chien et ils sont très contents.',
        english: 'They have a dog and they are very happy.',
        aspectNote: 'Phonetic distinction: Ils ont (/il.z‿ɔ̃/) with liaison "z" vs Ils sont (/il.sɔ̃/) with "s".',
      },
      {
        french: 'Vous faites du sport et vous êtes en forme.',
        english: 'You do sports and you are in good shape.',
        aspectNote: 'Irregular "vous" forms ending in -tes: vous faites, vous êtes.',
      },
    ],
    conjugationHighlight: {
      verb: 'Être vs Avoir',
      tense: 'Présent de l\'indicatif',
      table: {
        je: 'suis / ai',
        tu: 'es / as',
        'il/elle/on': 'est / a',
        nous: 'sommes / avons',
        vous: 'êtes / avez',
        'ils/elles': 'sont / ont',
      },
    },
    commonTraps: [
      'Saying "vous faisez" or "vous disez" (correct: vous faites, vous dites).',
      'Confusing pronunciation of "ils ont" (liaison /z/) and "ils sont" (pure /s/).',
    ],
    practiceExercises: [
      {
        id: 'ex-u12-1',
        type: 'multiple-choice',
        prompt: 'Choose the correct form for "vous" with the verb "faire":',
        options: ['Vous faites', 'Vous faisez', 'Vous faisons', 'Vous font'],
        correctAnswer: 'Vous faites',
        hint: 'One of the 3 verbs ending in -tes for vous.',
        explanation: 'Faire conjugates as "vous faites".',
      },
      {
        id: 'ex-u12-2',
        type: 'multiple-choice',
        prompt: 'Select the correct verb: "Elles _____ (aller) au cinéma ce soir."',
        options: ['vont', 'allent', 'vas', 'vons'],
        correctAnswer: 'vont',
        hint: 'Irregular 3rd person plural of aller.',
        explanation: 'Aller conjugates as "elles vont".',
      },
    ],
  },

  // ==========================================
  // Unit 28: Adjectives
  // ==========================================
  {
    id: 'unit-28-adjectives',
    unitNumber: 28,
    category: 'Nouns, Gender, Adjectives & Adverbs',
    level: 'A1',
    title: 'Unit 28: Adjectives (Agreement, BAGS Position & Dual Forms)',
    frenchTitle: 'Unité 28 : Les adjectifs qualificatifs (Accords, place et adjectifs BANGS)',
    subtitle: 'Master gender/number agreements, pre-nominal BANGS exceptions, and adjectives that change meaning by placement.',
    formula: 'Règle générale de position: [Nom] + [Adjectif] (une voiture rouge)  |  BANGS (avant le nom): Beauty, Age, Number, Goodness, Size  |  Devant voyelle: beau → bel, nouveau → nouvel, vieux → vieil',
    goldenRule: 'Most French adjectives sit **AFTER the noun** (colors, shapes, nationalities). However, short common adjectives describing **Beauty, Age, Number, Goodness, and Size (BANGS)** go **BEFORE the noun**. Five adjectives change form before masculine vowels: **beau → bel, nouveau → nouvel, vieux → vieil**.',
    detailedDescription: [
      'Adjectives describe the qualities of nouns and must agree in gender and number with the noun they modify.',
      'Unlike English, where adjectives universally precede the noun, French adjectives default to post-nominal position with strategic BANGS exceptions.'
    ],
    topics: [
      {
        id: 'topic-28-agreements',
        title: '1. Regular Gender & Plural Agreement (+e, +s, +es)',
        formula: 'Masc. Sing: [base]  |  Fem. Sing: [base] + [-e]  |  Masc. Plur: [base] + [-s]  |  Fem. Plur: [base] + [-es]',
        goldenRule: 'French adjectives **agree in gender and number** with the noun they qualify. If the masculine form already ends in unaccented "-e", the feminine is identical (**facile → facile**).',
        detailedDescription: [
          'Grand: un grand garçon, une grand**e** fille, des grand**s** garçons, des grand**es** filles.',
          'Consonant changes before -e: *bon → bonne* (double n), *cher → chère* (grave accent), *heureux → heureuse* (-eux becomes -euse), *neuf → neuve* (f becomes ve).'
        ],
        tables: [
          {
            title: 'Adjective Agreement Declensions',
            subtitle: 'Regular and common irregular adjective endings',
            description: 'Observe the additions of -e and -s.',
            headers: ['Masculine Sing.', 'Feminine Sing.', 'Masculine Plur.', 'Feminine Plur.'],
            rows: [
              ['Grand', 'Grande', 'Grands', 'Grandes'],
              ['Facile (ends in e)', 'Facile', 'Faciles', 'Faciles'],
              ['Heureux', 'Heureuse', 'Heureux (invariable in s)', 'Heureuses'],
              ['Bon', 'Bonne', 'Bons', 'Bonnes'],
              ['Cher', 'Chère', 'Chers', 'Chères']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Cette maison est grande et lumineuse.',
            english: 'This house is big and bright.',
            aspectNote: 'Feminine agreements: grand + e = grande ; lumineux → lumineuse.'
          },
          {
            french: 'Ces garçons sont très gentils et serviables.',
            english: 'These boys are very kind and helpful.',
            aspectNote: 'Masculine plural agreements with "-s".'
          }
        ]
      },
      {
        id: 'topic-28-bangs-placement',
        title: '2. Pre-Nominal BANGS Adjectives',
        formula: 'BANGS: [Beauty, Age, Number, Goodness, Size] + [Nom]  VS  [Nom] + [Couleur / Forme / Nationalité]',
        goldenRule: 'Place **BANGS** adjectives **BEFORE the noun**: Beauty (beau, joli), Age (jeune, vieux, nouveau), Number (premier, deux), Goodness (bon, mauvais), Size (grand, petit, gros). All other adjectives (colors, nationalities, shapes) sit **AFTER the noun**.',
        detailedDescription: [
          'Say: **« une jolie petite maison »** (Beauty & Size before) + **« blanche »** (Color after) → **« une jolie petite maison blanche »**.',
          'Adjectives that change meaning based on position: **« un grand homme »** (a great, historic man) vs. **« un homme grand »** (a physically tall man) ; **« ma propre maison »** (my own house) vs. **« une maison propre »** (a clean house).'
        ],
        tables: [
          {
            title: 'BANGS Categories and Examples',
            subtitle: 'Adjectives that precede the noun',
            description: 'Memorize the BANGS acronym.',
            headers: ['Category', 'Typical Adjectives', 'Sample Phrase', 'Placement'],
            rows: [
              ['Beauty', 'beau, joli', 'une jolie robe', 'BEFORE noun'],
              ['Age', 'jeune, vieux, nouveau', 'un jeune homme', 'BEFORE noun'],
              ['Number', 'premier, deuxième, dernier', 'la première fois', 'BEFORE noun'],
              ['Goodness', 'bon, mauvais, meilleur', 'un bon repas', 'BEFORE noun'],
              ['Size', 'grand, petit, gros, long', 'un grand arbre', 'BEFORE noun'],
              ['Color (Contrast)', 'rouge, bleu, noir, blanc', 'un ballon rouge', 'AFTER noun']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Un vieil arbre devant une jolie petite maison blanche.',
            english: 'An old tree in front of a pretty small white house.',
            aspectNote: 'BANGS (jolie, petite) before noun; color (blanche) after noun.'
          },
          {
            french: 'C\'est un grand homme politique.',
            english: 'He is a great political statesman.',
            aspectNote: 'Meaning shift: "grand" before noun = great/historic.'
          }
        ]
      },
      {
        id: 'topic-28-euphonic-forms',
        title: '3. Euphonic Dual Masculine Forms (Bel, Nouvel, Vieil)',
        formula: 'Devant voyelle / h muet: beau → [bel]  |  nouveau → [nouvel]  |  vieux → [vieil]',
        goldenRule: 'Before a masculine singular noun that begins with a **vowel or mute "h"**, three high-frequency adjectives change form to avoid vowel collision: **beau becomes bel**, **nouveau becomes nouvel**, and **vieux becomes vieil**.',
        detailedDescription: [
          'Saying *"un beau homme"* or *"un vieux ami"* is a major phonetic clash in French. You must say: **« un bel homme »** and **« un vieil ami »**.',
          'Before a consonant, the standard masculine form remains: **« un beau garçon »**, **« un nouveau livre »**, **« un vieux livre »**.'
        ],
        tables: [
          {
            title: 'The Special Euphonic Masculine Forms',
            subtitle: 'Before consonants vs. before vowels/silent H',
            description: 'Enables smooth phonetic liaison.',
            headers: ['Adjective', 'Before Consonant (Masc.)', 'Before Vowel / Mute H (Masc.)', 'Feminine Form'],
            rows: [
              ['Beau (handsome)', 'un beau garçon', 'un bel homme / un bel arbre', 'une belle femme'],
              ['Nouveau (new)', 'un nouveau quartier', 'un nouvel appartement', 'une nouvelle maison'],
              ['Vieux (old)', 'un vieux pont', 'un vieil ami / un vieil hôtel', 'une vieille voiture'],
              ['Fou (crazy)', 'un fou projet', 'un fol espoir', 'une folle histoire']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'C\'est un bel appartement dans un vieil immeuble parisien.',
            english: 'It is a beautiful apartment (bel) in an old Parisian building (vieil).',
            aspectNote: 'Both "bel" and "vieil" used before masculine nouns starting with vowels.'
          },
          {
            french: 'Un beau jardin avec un vieux banc en bois.',
            english: 'A beautiful garden (beau) with an old wooden bench (vieux).',
            aspectNote: 'Standard forms "beau" and "vieux" used before consonants (jardin, banc).'
          }
        ]
      }
    ],
    rules: [
      'General agreement: Add -e for feminine (grand → grande), -s for plural (grands), -es for feminine plural (grandes).',
      'BANGS Adjectives placed BEFORE the noun: Beauty (beau, joli), Age (jeune, vieux, nouveau), Number (premier, deux), Goodness (bon, mauvais, gentil), Size (grand, petit, gros, long).',
      'Dual masculine forms before vowels: un bel homme, un nouvel appartement, un vieil ami.',
      'Adjectives that change meaning based on position: "un grand homme" (a great/historic man) vs "un homme grand" (a physically tall man); "ma propre maison" (my own house) vs "une maison propre" (a clean house).',
    ],
    contrastExamples: [
      {
        french: 'Un vieil arbre devant une jolie petite maison blanche.',
        english: 'An old tree (vieil before vowel) in front of a pretty small white house (jolie/petite before, blanche after).',
        aspectNote: 'BANGS adjectives (jolie, petite) placed before; color adjective (blanche) placed after.',
      },
      {
        french: 'C\'est un grand écrivain, bien qu\'il soit un homme de taille moyenne.',
        english: 'He is a great writer (figurative), although he is a man of medium height.',
        aspectNote: 'Meaning shift: "grand" before noun = great/distinguished.',
      },
    ],
    commonTraps: [
      'Writing "un beau appartement" instead of "un bel appartement".',
      'Placing color or nationality adjectives before the noun (e.g. "un rouge ballon" is wrong; say "un ballon rouge").',
    ],
    practiceExercises: [
      {
        id: 'ex-u28-1',
        type: 'multiple-choice',
        prompt: 'Choose the correct form for: "C\'est un _____ (vieux) ami."',
        options: ['vieil', 'vieux', 'vieille', 'vieu'],
        correctAnswer: 'vieil',
        hint: 'Masculine noun starting with a vowel requires the special euphonic form.',
        explanation: 'Before a masculine singular noun starting with a vowel, "vieux" becomes "vieil": un vieil ami.',
      },
      {
        id: 'ex-u28-2',
        type: 'sentence-builder',
        prompt: 'Arrange into: "Elle porte une belle robe rouge."',
        words: ['robe', 'Elle', 'rouge.', 'une', 'belle', 'porte'],
        correctAnswer: 'Elle porte une belle robe rouge.',
        hint: 'BANGS adjective (belle) goes before noun, color (rouge) goes after.',
        explanation: 'Belle (Beauty) precedes the noun; rouge (Color) follows the noun.',
      },
    ],
  },
];
