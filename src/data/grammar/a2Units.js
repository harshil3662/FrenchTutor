export const A2_GRAMMAR_LESSONS = [
  // ==========================================
  // Unit 9: Independent & Subordinate Clauses
  // ==========================================
  {
    id: 'unit-9-independent-subordinate-clauses',
    unitNumber: 9,
    category: 'Sentence Structure & Clauses',
    level: 'A2',
    title: 'Unit 9: Independent and Subordinate Clauses (Propositions)',
    frenchTitle: 'Unité 9 : Propositions indépendantes, coordonnées et subordonnées',
    subtitle: 'Link ideas with coordinating conjunctions (mais, ou, et, donc, or, ni, car) and subordinate clauses.',
    formula: 'Coordination: [Prop. 1] + [mais / ou / et / donc / or / ni / car] + [Prop. 2]  |  Subordination: [Prop. Principale] + [que / quand / parce que / bien que] + [Prop. Subordonnée]',
    goldenRule: 'Coordinating conjunctions connect two grammatically equal clauses, remembered with the mnemonic **« Mais où est donc Ornicar ? »**. Subordinate clauses depend on a main clause and determine whether the following mood is **Indicative** or **Subjunctive**.',
    topics: [
      {
        id: 'topic-9-coordination',
        title: '1. Coordinating Conjunctions (Mais où est donc Ornicar ?)',
        detailedDescription: [
          '**sentence = independent clause + dependent clause**',
          'Examine the following example of a sentence, which comprises both types of clauses: dependent and independent:',
          'Je mange en attendant ton arrivée. ->  I eat while waiting for your arrival.',
          '* An independent clause: Je mange',
          '* A dependent clause: en attendant ton arrivée',
          'The main clause is in itself an independent clause and supports a dependent clause. This dependent clause, by itself, does not express a complete thought. It depends on the main clause to provide the premise and the background for what is to be expressed.',
        ],
        contrastExamples: [
          {
            french: 'Dax rêvait de devenir pilote.',
            english: 'Dax dreamed of becoming a pilot.',
            aspectNote: 'Main clause: "Dax rêvait" (Dax dreamed) is independent; dependent clause: "de devenir pilote" (of becoming a pilot) is subordinate.',
          },
          {
            french: 'Les Robert sont à l’hôtel bien que leur famille habite en ville. ',
            english: 'The Roberts are at the hotel even though their family lives in town.',
            aspectNote: 'Main clause: "The Roberts are at the hotel" (The Roberts are at the hotel) is independent; dependent clause: "even though their family lives in town" (even though their family lives in town) is subordinate.',
          }
        ],
      },
      {
        id: 'topic-9-compound-sentences',
        title: '2. Compound sentences',
        detailedDescription: [
          'A compound sentence includes two independent clauses. These clauses may be combined into asentence by using punctuation (e.g., a semicolon).',
          '**independent clause + ; + independent clause**',
          'More frequently, however, independent clauses are joined together with one of the following coordinating conjunctions: et (and), ni (nor), ou (or), car (for), mais (but), and donc (so).',
          'Commonly used coordinating conjunctions are:',
          'et - and',
          'ni - nor',
          'ou - or',
          'car - for',
          'mais - but',
          'donc - so',
          'sinon - otherwise',
          'soit soit - either or',
          'ni ni - neither nor'
        ],
        contrastExamples: [
          {
            french: 'Tu pars; tu vas au concert. ',
            english: 'You are leaving; you are going to the concert.',
            aspectNote: 'Two independent clauses joined by a semicolon.',
          },
          {
            french: 'Elle n’est pas encore là mais elle est en route. ',
            english: 'She is not here yet but she is on her way.',
            aspectNote: 'Two independent clauses joined by "mais" (but).'
          },
          {
            french: 'Donne-moi un peu d’argent sinon je ne pourrai pas l’acheter. ',
            english: 'Give me some money otherwise I won’t be able to buy it.',
            aspectNote: 'Two independent clauses joined by "sinon" (otherwise).'
          }
        ]
      },
      {
        id: 'topic-9-negation-ni-ni',
        title: 'The negation ni… ni…',
        detailedDescription: [
          'The negation ni… ni… precedes each noun that it negates. In addition, the negative particle ne (n’) comes directly before the verb. When the definite article le, la, l’, les is used before the noun, the definite article remains when the verb is negative.',
          'When the indefinite or partitive article is used before the noun in the affirmative sentence, the article disappears when the verb is made negative.'
        ],
        contrastExamples: [
          {
            french: 'Il aime le café et le chocolat.',
            english: 'He likes coffee and chocolate.'
          },
          {
            french: 'Il n’aime ni le café ni le chocolat. ',
            english: 'He likes neither coffee nor chocolate.'
          },
          {
            french: 'Elle commande de l’eau et du vin. ',
            english: 'She orders water and wine.'
          },
          {
            french: 'Elle ne commande ni eau ni vin. ',
            english: 'She orders neither water nor wine.'
          }
        ]
      }
    ],
    practiceExercises: [
      {
        id: 'ex-u9-1',
        type: 'multiple-choice',
        prompt: 'Which conjunction means "therefore / so"?',
        options: ['donc', 'car', 'mais', 'or'],
        correctAnswer: 'donc',
        hint: 'From the mnemonic "Mais où est donc Ornicar ?".',
        explanation: '"Donc" expresses a consequence or logical conclusion (therefore/so).',
      },
      {
        id: 'ex-u9-2',
        type: 'sentence-builder',
        prompt: 'Build the sentence: "Il étudie car il a un examen demain."',
        words: ['examen', 'Il', 'étudie', 'car', 'a', 'demain.', 'il', 'un'],
        correctAnswer: 'Il étudie car il a un examen demain.',
        hint: 'Clause 1 + car + Clause 2.',
        explanation: 'Coordinating conjunction "car" links the two clauses.',
      },
    ],
  },

  // ==========================================
  // Unit 13: Immediate Future, Past & Causative
  // ==========================================
  {
    id: 'unit-13-immediate-future-past-causative',
    unitNumber: 13,
    category: 'Past Tenses, Pronominal & Aspect',
    level: 'A2',
    title: 'Unit 13: The Immediate Future, Immediate Past & Causative Form',
    frenchTitle: 'Unité 13 : Le futur proche, le passé récent et la forme causative (Faire + Infinitif)',
    subtitle: 'Express imminent events (aller + inf.), just-completed actions (venir de + inf.), and having things done (faire + inf.).',
    formula: 'Futur Proche: [aller au présent] + [Infinitif]  |  Passé Récent: [venir au présent] + [de / d\'] + [Infinitif]  |  Causatif: [faire conjugué] + [Infinitif]',
    goldenRule: 'To express having someone else perform an action or causing something to happen, use **« Faire + Infinitif »** (e.g. **« Je fais réparer ma voiture »** = I am having my car repaired).',
    topics: [
      {
        id: 'topic-13-futur-proche',
        title: '1. The immediate future tense',
        detailedDescription: [
          '**Aller** is used to form the immediate future. So, to talk about what you are going to do, use **aller** in the present indicative followed immediately by a verb in the infinitive.',
          'And in everyday conversation, the immediate future is often used as a substitute for the future tense (le futur simple).'
        ],
        contrastExamples: [
          {
            french: 'Je vais acheter une voiture en mai. ',
            english: 'I am going to buy a car in May.',
          },
          {
            french: 'Vous allez partir la semaine prochaine? ',
            english: 'You’re going to leave next week?',
          }
        ]
      },
      {
        id: 'topic-13-passe-recent',
        title: '2. The verb venir (to come)',
        detailedDescription: [
          'The verb venir (to come) and its derivatives, devenir (to become), prévenir (to warn, to inform), survenir (to occur), are all commonly used verbs.',
          'The verb venir (to come) in the present tense de, combined with a verb in the infinitive, expresses an action that has just taken place. Although the construction venir de is in the present tense in French, it conveys an idea in the past in English.',
        ],
        tables: [
          {
            title: 'Passé Récent Conjugation Matrix',
            subtitle: 'Conjugating Venir + de + infinitive',
            description: 'Elision of "de" into "d\'" before vowels.',
            headers: ['Pronoun', 'Venir', 'Preposition', 'Infinitive', 'English Translation'],
            rows: [
              ['Je', 'viens', "d'", 'arriver', 'I have just arrived'],
              ['Tu', 'viens', 'de', 'finir', 'You have just finished'],
              ['Il / Elle', 'vient', 'de', 'partir', 'He/She has just left'],
              ['Nous', 'venons', "d'", 'entendre', 'We have just heard'],
              ['Vous', 'venez', 'de', 'recevoir', 'You have just received'],
              ['Ils / Elles', 'viennent', 'de', 'manger', 'They have just eaten']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Vous venez à huit heures ce soir? ',
            english: 'Are you coming at eight this evening?',
          },
          {
            french: 'Elle vient de vendre sa voiture.',
            english: 'She just sold her car.',
          }
        ]
      },
      {
        id: 'topic-13-Tenir',
        title: '3. Tenir',
        detailedDescription: [
          'Another verb conjugated like venir is tenir (to hold)',
          'Tenir has several different meanings.',
          'When used with the preposition à or de, tenir takes on another meaning.'
        ],
        tables: [
          {
            title: 'Conjugation',
            headers: ['Pronoun', 'Tenir'],
            rows: [
              ['Je', 'tiens'],
              ['Tu', 'tiens'],
              ['Il/Elle', 'tient'],
              ['Nous', 'tenons'],
              ['Vous', 'tenez'],
              ['Ils/Elles', 'tiennent']
            ]
          },
          {
            title: 'Different meanings',
            headers: ['French', 'English'],
            rows: [
              ['Le directeur ne tient jamais ses promesses.', 'The manager never keeps his promises.'],
              ['Ils tiennent un restaurant à Nice.', 'They run a restaurant in Nice.'],
              ['Toutes ces affaires ne vont pas **tenir** dans ta valise.', 'All these things won’t fit in your suitcase.'],
              ['Ils tiennent le rythme. ', 'They are keeping up the pace.'],
              ['Tiens, tiens, c’est étrange... ', 'Well, well, this is strange . . .'],
              ['Tiens, prends ces trois livres. ', 'Here, take these three books.']
            ]
          },
          {
            title: 'Tenir used with the preposition à or de',
            headers: ['French', 'English'],
            rows: [
              ['Elle tient à ses bijoux. ', 'She is attached to her jewels.'],
              ['Ils tiennent à leurs habitudes.', 'They are attached to their habits.'],
              ['Marc tient à vous voir. ', 'Marc insists on seeing you.'],
              ['Elle tient de sa mère. ', 'She takes after her mother.'],
            ]
          }
        ],
      },
      {
        id: 'topic-13-faire',
        title: 'The verb faire (to do, to make)',
        detailedDescription: [
          'Another verb you’ll come across all the time is faire (to do, to make). Faire is also used in expressions relating to chores, activities, sports, etc. Faire is used, with the impersonal third-person singular il, in most expressions relating to the weather.'
        ],
        tables: [
          {
            title: 'Conjugation',
            headers: ['Pronoun', 'Faire'],
            rows: [
              ['Je', 'fais'],
              ['Tu', 'fais'],
              ['Il/Elle', 'fait'],
              ['Nous', 'faisons'],
              ['Vous', 'faites'],
              ['Ils/Elles', 'font']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Nous faisons un gâteau. ',
            english: 'We’re making a cake.'
          },
          {
            french: 'Elle fait les courses ici. ',
            english: 'She shops here.'
          },
          {
            french: 'Tu ne fais jamais la cuisine? ',
            english: 'You never cook?'
          },
          {
            french: 'Il fait frais. ',
            english: 'It is cool.'
          },
          {
            french: 'Il pleut.',
            english: 'It is raining.'
          }
        ]
      },
      {
        id: 'topic-13-the-causative-form',
        title: 'The causative form',
        detailedDescription: [
          'The causative form is, in most cases, used to express the idea of having something done by someone or of causing something to happen. It is formed with the verb faire followed by an infinitive.'
        ],
        contrastExamples: [
          {
            french: 'Elle écrit la lettre elle-même. ',
            english: 'She writes the letter herself.'
          },
          {
            french: 'Elle fait écrire la lettre par sa secrétaire. ',
            english: 'She has the letter written by her secretary.'
          }
        ]
      }
    ],
    practiceExercises: [
      {
        id: 'ex-u13-1',
        type: 'multiple-choice',
        prompt: 'How do you say "We have just arrived" in French?',
        options: ['Nous venons d\'arriver', 'Nous allons arriver', 'Nous faisons arriver', 'Nous sommes arrivés juste'],
        correctAnswer: 'Nous venons d\'arriver',
        hint: 'Venir + de + infinitive.',
        explanation: 'Passé récent uses "venir de" + infinitive: "Nous venons d\'arriver".',
      },
      {
        id: 'ex-u13-2',
        type: 'sentence-builder',
        prompt: 'Build: "Elle va faire réparer son vélo."',
        words: ['réparer', 'va', 'Elle', 'vélo.', 'son', 'faire'],
        correctAnswer: 'Elle va faire réparer son vélo.',
        hint: 'Futur proche + causative faire + infinitive.',
        explanation: 'Futur proche (va) + causative (faire réparer) + complement (son vélo).',
      },
    ],
  },

  // ==========================================
  // Unit 14: Pronominal Verbs
  // ==========================================
  {
    id: 'unit-14-pronominal-verbs',
    unitNumber: 14,
    category: 'Past Tenses, Pronominal & Aspect',
    level: 'A2',
    title: 'Unit 14: Pronominal Verbs (Reflexive, Reciprocal & Idiomatic)',
    frenchTitle: 'Unité 14 : Les verbes pronominaux (Réfléchis, réciproques et idiomatiques)',
    subtitle: 'Conjugate reflexive pronouns (me, te, se, nous, vous, se) across tenses and master participle agreement rules.',
    formula: 'Présent: [Sujet] + [me / te / se / nous / vous / se] + [Verbe]  |  Passé Composé: [Sujet] + [pronom] + [être] + [Participe Passé]',
    goldenRule: 'All pronominal verbs strictly take **« Être »** in compound tenses. The past participle agrees with the reflexive pronoun ONLY if that pronoun functions as a **Direct Object (COD)**, not an **Indirect Object (COI)** or when a body part/direct object follows.',
    topics: [
      {
        id: 'topic-14-reflexive-verbs',
        title: '1. Reflexive verbs',
        detailedDescription: [
          'The action of a reflexive verb is, for the most part, reflected back on the subject, the action being done to oneself. The pronouns me, te, se drop the e before mute h or a vowel.',
          '',
          ''
        ],
        tables: [
          {
            title: 'Pronominal Conjugation in Present Tense (Se lever)',
            headers: ['Pronoun', 'Reflexive Pronoun', 'Conjugated Form', 'English Translation'],
            rows: [
              ['Je', 'me (m\')', 'je me lève', 'I get up'],
              ['Tu', 'te (t\')', 'tu te lèves', 'you get up'],
              ['Il / Elle', 'se (s\')', 'il / elle se lève', 'he / she gets up'],
              ['Nous', 'nous', 'nous nous levons', 'we get up'],
              ['Vous', 'vous', 'vous vous levez', 'you get up'],
              ['Ils / Elles', 'se (s\')', 'ils / elles se lèvent', 'they get up']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Elle ne se réveille pas avant huit heures.',
            english: 'She does not wake up until eight o’clock.',
          },
          {
            french: 'Vous maquillez-vous pour monter sur scène?',
            english: 'Do you put on makeup to go on stage?',
          },
          {
            french: 'Se rase-t-il tous les matins? ',
            english: 'Does he shave every morning?'
          },
          {
            french: 'Est-ce que vous vous préparez à partir? ',
            english: 'Are you getting ready to leave?'
          }
        ]
      },
      {
        id: 'topic-14-reciprocal-verbs',
        title: '2. Reciprocal verbs',
        detailedDescription: [
          'The second type of pronominal verb is called reciprocal. It describes an action two or more people perform with or for each other. Since two or more people are involved, reciprocal verbs can only be used in the plural (with se, nous, vous).',
        ],
        contrastExamples: [
          {
            french: 'Ils s’aiment beaucoup. ',
            english: 'They love each other a lot.',
          },
          {
            french: 'Nous nous parlons tous les jours. ',
            english: 'We talk to each other every day..',
          }
        ]
      },
      {
        id: 'topic-14-passive-pronominals',
        title: '2. Passive pronominals',
        detailedDescription: [
          'A third type of pronominal verb is called passive. With the passive pronominal verbs, the subject is not a person or an animal. The subject does not perform the action of the verb but rather is subjected to it. It is in the third-person singular, with se.',
        ],
        contrastExamples: [
          {
            french: 'Ça ne se dit pas.',
            english: 'This is not said.',
          },
          {
            french: 'Ça ne se fait pas.',
            english: 'This is not done.',
          }
        ]
      },
    ],
    practiceExercises: [
      {
        id: 'ex-u14-1',
        type: 'multiple-choice',
        prompt: 'Choose the correct form: "Elles se sont _____ (rencontrer) à Paris."',
        options: ['rencontrées', 'rencontré', 'rencontrés', 'rencontrer'],
        correctAnswer: 'rencontrées',
        hint: 'Reciprocal direct object agreeing with feminine plural subject "Elles".',
        explanation: 'Rencontrer quelqu\'un (direct object). The reflexive pronoun is COD and precedes the verb, so agreement is required: rencontrées.',
      },
      {
        id: 'ex-u14-2',
        type: 'multiple-choice',
        prompt: 'Choose the correct form: "Elle s\'est _____ (brosser) les dents."',
        options: ['brossé', 'brossée', 'brossés', 'brosser'],
        correctAnswer: 'brossé',
        hint: 'Direct object "les dents" comes AFTER the verb.',
        explanation: 'When the specific body part / COD follows the verb, the past participle remains uninflected: brossé.',
      },
    ],
  },

  // ==========================================
  // Unit 15: The Passé Composé
  // ==========================================
  {
    id: 'unit-15-passe-compose',
    unitNumber: 15,
    category: 'Past Tenses, Pronominal & Aspect',
    level: 'A2',
    title: 'Unit 15: The Passé Composé (Auxiliaries & Participle Agreements)',
    frenchTitle: 'Unité 15 : Le passé composé (Avoir, Être et l\'accord du participe passé)',
    subtitle: 'Express completed, bounded past events and master the DR & MRS VANDERTRAMP movement verbs.',
    formula: 'Passé Composé = [Avoir ou Être au présent] + [Participe Passé]  |  Avec Être: accord en genre et nombre avec le sujet  |  Avec Avoir: accord UNIQUEMENT si le COD précède le verbe',
    goldenRule: 'Verbs using **« Être »** (17 verbs of movement/state change + all reflexives) MUST agree with the subject in gender and number. Verbs using **« Avoir »** agree ONLY if a direct object (COD: que, les, la, l\') is placed **BEFORE** the auxiliary.',
    topics: [
      {
        id: 'topic-15- past-participle',
        title: '1. The past participle of regular verbs',
        detailedDescription: [
          'The past participle is formed by adding an ending to the verb stem. Regular past participles take the following endings:',
          '**-er** verbs take **-é**: parler (to speak) -> **parlé** (spoken)',
          '**-ir** verbs take **-i**: choisir (to choose) -> **choisi** (chosen)',
          '**-re** verbs take **-u**: entendre (to hear) -> **entendu** (heard)',
          'In the negative form, ne (n’) is placed in front of avoir or être, and pas after avoir or être.'
        ],
        contrastExamples: [
          {
            french: 'Elle a pris une décision.',
            english: 'She made a decision.',
          },
          {
            french: 'Il n’a pas vendu sa voiture. ',
            english: 'He did not sell his car.',
          }
        ]
      },
      {
        id: 'topic-15-passé-composé-with-avoir',
        title: '2. The passé composé with avoir',
        detailedDescription: [
          'When avoir is used with the passé composé, with a few exceptions, the past participle does not agree in gender and number with the subject of the verb.',
          "In the passé composé of verbs conjugated with avoir, the past participle agrees with the direct object of the verb, but only in sentences where the direct object noun or pronoun precedes the verb. But, Don't think too much about direct and indirect objects. That is a saparate topic to learn",
        ],
        tables: [
          {
            title: 'Some Irregular Verbs',
            headers: ['Infinitive', 'English', 'Past Participle', 'English'],
            rows: [
              ['acquérir', 'to acquire', 'acquis', 'acquired'],
              ['apprendre', 'to learn', 'appris', 'learned'],
              ['avoir', 'to have', 'eu', 'had'],
              ['boire', 'to drink', 'bu', 'drunk'],
              ['comprendre', 'to understand', 'compris', 'understood'],
              ['conduire', 'to drive', 'conduit', 'driven'],
              ['craindre', 'to fear', 'craint', 'feared'],
              ['devoir', 'must, to have to', 'dû', 'had to'],
              ['dire', 'to say', 'dit', 'said'],
              ['écrire', 'to write', 'écrit', 'written'],
              ['être', 'to be', 'été', 'been'],
              ['faire', 'to do, to make', 'fait', 'done, made'],
              ['falloir', 'to have to', 'fallu', 'had to'],
              ['lire', 'to read', 'lu', 'read'],
              ['mettre', 'to put', 'mis', 'put'],
              ['mourir', 'to die', 'mort', 'dead'],
              ['naître', 'to be born', 'né', 'born'],
              ['offrir', 'to offer', 'offert', 'offered'],
              ['ouvrir', 'to open', 'ouvert', 'opened'],
              ['peindre', 'to paint', 'peint', 'painted'],
              ['plaire', 'to please', 'plu', 'pleased'],
              ['pleuvoir', 'to rain', 'plu', 'rained'],
              ['pouvoir', 'can, to be able to', 'pu', 'could'],
              ['prendre', 'to take', 'pris', 'taken'],
              ['recevoir', 'to receive', 'reçu', 'received'],
              ['rire', 'to laugh', 'ri', 'laughed'],
              ['savoir', 'to know', 'su', 'known'],
              ['suivre', 'to follow', 'suivi', 'followed'],
              ['vivre', 'to live', 'vécu', 'lived'],
              ['voir', 'to see', 'vu', 'seen'],
              ['vouloir', 'to want', 'voulu', 'wanted']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Il a pris la bonne décision. ',
            english: 'He made the right decision.',
          },
          {
            french: 'Il l’a prise. ',
            english: 'He made it.',
          },
          {
            french: 'Il a appris le français à Strasbourg. ',
            english: 'He learned French in Strasbourg.'
          },
          {
            french: 'Elle m’a dit bonjour. ',
            english: 'She said hello to me.'
          }
        ]
      },
      {
        id: 'topic-15-passé-composé-with-être',
        title: '3. The passé composé with être',
        detailedDescription: [
          'Some verbs use être instead of avoir in the passé composé. It is very important to memorize the (finite) list of verbs conjugated with être. Many of these are intransitive verbs of movement (aller, venir, monter…). In addition, all pronominal (reflexive) verbs (see Chapter 14) are conjugated with être in the passé composé.',
          'The past participle of verbs conjugated with être agrees in gender and number with the subject.'
        ],
        tables: [
          {
            title: 'Verbs',
            headers: ['Infinitive', 'English'],
            rows: [
              ['aller', 'to go'],
              ['arriver', 'to arrive'],
              ['descendre', 'to go down'],
              ['devenir', 'to become'],
              ['entrer', 'to enter'],
              ['monter', 'to go up, to climb'],
              ['mourir', 'to die'],
              ['naître', 'to be born'],
              ['partir', 'to leave'],
              ['rentrer', 'to return'],
              ['rester', 'to stay'],
              ['retourner', 'to return, to go back'],
              ['revenir', 'to return'],
              ['sortir', 'to go out'],
              ['tomber', 'to fall'],
              ['venir', 'to come, to arrive']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Il est arrivé en retard. ',
            english: 'He arrived late.',
          },
          {
            french: 'Elles sont nées en Belgique.',
            english: 'They (f.) were born in Belgium.',
          },
          {
            french: 'Ils se sont ennuyés à la réception. ',
            english: 'They were bored at the reception.'
          },
          {
            french: 'Ils ne se sont pas couchés de bonne heure.',
            english: 'They did not go to bed.'
          }
        ]
      },
      {
        id: 'topic-15-verbs-conjugated-with-avoir-or-être',
        title: 'Verbs conjugated with avoir or être',
        detailedDescription: [
          'Six verbs among those conjugated with être in the passé composé (sortir, rentrer, monter, descendre, passer, retourner) are conjugated with avoir and follow the avoir agreement when a direct object follows the verb. In these cases, the meaning of the verb has changed.'
        ],
        tables: [
          {
            title: 'Examples',
            headers: ['French', 'English'],
            rows: [
              ['Elle est descendue au rez-de-chaussée.', 'She went down to the ground floor.'],
              ['Elle a descendu les poubelles.', 'She took down the garbage cans.'],
              ['Elle est sortie avec des amis.', 'She went out with some friends.'],
              ['Elle a sorti la voiture du garage.', 'She took the car out of the garage.'],
              ['Elle est rentrée de vacances hier.', 'She came back from vacation yesterday.'],
              ['Elle a rentré les géraniums dans le salon.', 'She brought the geraniums into the living room.'],
              ['Je suis passée devant les Galeries Lafayette.', 'I passed by the Galeries Lafayette.'],
              ['J’ai passé trois semaines à Tokyo.', 'I spent three weeks in Tokyo.'],
              ['Je suis retournée à Venise pour la troisième fois.', 'I went back to Venice for the third time.'],
              ['Elle a retourné l’omelette.', 'She turned over the omelette.']
            ]
          }
        ]
      }
    ],
    practiceExercises: [
      {
        id: 'ex-u15-1',
        type: 'multiple-choice',
        prompt: 'Choose the correct form: "Voici la lettre que j\'ai _____ (écrire)."',
        options: ['écrite', 'écrit', 'écrits', 'écrites'],
        correctAnswer: 'écrite',
        hint: 'Direct object "la lettre" (fem. sing.) precedes the verb via relative pronoun "que".',
        explanation: 'With avoir, agreement occurs with the preceding COD "que" (la lettre): écrite.',
      },
      {
        id: 'ex-u15-2',
        type: 'multiple-choice',
        prompt: 'Choose the correct form: "Mes sœurs sont _____ (arriver) hier."',
        options: ['arrivées', 'arrivé', 'arrivés', 'arrivée'],
        correctAnswer: 'arrivées',
        hint: 'Être auxiliary agrees in gender and number with subject "Mes sœurs" (fem. plural).',
        explanation: 'Arriver uses Être; feminine plural subject requires "-ées": arrivées.',
      },
    ],
  },

  // ==========================================
  // Unit 16: Imparfait and Plus-que-parfait
  // ==========================================
  {
    id: 'unit-16-imparfait-plus-que-parfait',
    unitNumber: 16,
    category: 'Past Tenses, Pronominal & Aspect',
    level: 'A2',
    title: 'Unit 16: The Imparfait and the Plus-que-parfait',
    frenchTitle: 'Unité 16 : L\'imparfait et le plus-que-parfait (Description et antériorité)',
    subtitle: 'Paint background descriptions, habits, continuous states, and past anterior actions.',
    formula: 'Imparfait = [Radical de "nous" au présent] + [-ais, -ais, -ait, -ions, -iez, -aient]  |  Plus-que-parfait = [Auxiliaire à l\'imparfait] + [Participe Passé]',
    goldenRule: 'Use the **Imparfait** for ongoing states, weather, habits, and background descriptions. Use the **Plus-que-parfait** to describe an event that had already occurred before another past event.',
    topics: [
      {
        id: 'topic-16-imparfait',
        title: '1. The imparfait',
        detailedDescription: [
          'The uses of the imparfait (imperfect) are some of the most difficult aspects of French grammar to master. While the passé composé is used to talk about an action that took place on a specific occasion in the past, the imparfait plays a different role. It is used to describe a state of mind and being in the past as well as continuous, repeated, or habitual past actions.',
          'To form the imperfect, take the nous form of the present tense and remove the -ons ending, which gives you the stem. Then add the imparfait endings (-ais, -ais, -ait, -ions, -iez, -aient) to this stem.',
          '**J\'encourageais** - I encouraged',
          '**elle exigeait ** - she demanded',
          '**Elles annonçaient ** - they announced',
          'Note that the -ais, -ait, -aient endings are pronounced alike. Verbs with spelling changes in the present tense nous form, such as manger and commencer (see Chapter 10), retain the spelling change only for the je, tu, il, elle, ils, and elles subject pronouns.',
          'The extra e or the ç are not needed in the nous and vous forms of the imparfait.',
          'Note that the verb être has an irregular stem in the imparfait.',
          '**j’étais** - I was',
          '**tu étais** - you were',
          '**il/elle était** - he/she was',
          '**nous étions** - we were',
          '**vous étiez** - you were',
          '**ils/elles étaient** - they were'
        ],
      },
      {
        id: 'topic-16- imparfait-versus-the-passé-composé',
        title: '2. The imparfait versus the passé composé',
        detailedDescription: [
          'As they express a mental or physical state of being, some verbs tend to be used more often in the imparfait than in the passé composé. Among these verbs are: être (to be), avoir (to have), penser (to think), croire (to believe), savoir (to know), espérer (to hope), sembler (to seem), paraître (to appear). However, when these verbs are used in the passé composé, they may take on a different meaning.',
          '**Il semblait déprimé. ** - He looked depressed.',
          '**Tout à coup il a semblé comprendre la situation.** - Suddenly he seemed to understand the situation.',
          'Another use of the imparfait is to express habitual, repetitive action. It describes past events that were repeated. Used to and would (meaning habitually) are translated into French by the imparfait.',
          '**Autrefois, elle faisait partie de la chorale.** - In the past, she used to belong to the choir.',
          'The imparfait is also used to describe a continuous action that was going on in the past when another action (expressed in the passé composé) interrupted it.',
          '**Elle regardait la télévision quand soudain elle a entendu un grand bruit.** - She was watching television when suddenly she heard a loud noise.'
        ],
        tables: [
          {
            title: 'Expressions of Frequency may be an indication of the imparfait',
            headers: ['French', 'English'],
            rows: [
              ['souvent', 'often'],
              ['fréquemment', 'frequently'],
              ['le mardi', 'on Tuesdays'],
              ['le vendredi', 'on Fridays'],
              ['chaque jour', 'every day'],
              ['tous les jours', 'every day'],
              ['chaque semaine', 'every week'],
              ['chaque mois', 'every month'],
              ['chaque année', 'every year'],
              ['d’ordinaire', 'ordinarily'],
              ['d’habitude', 'usually'],
              ['habituellement', 'usually'],
              ['régulièrement', 'regularly'],
              ['comme à l’accoutumée', 'as usual'],
              ['autrefois', 'formerly'],
              ['jadis', 'in times past']
            ]
          }
        ],
      },
      {
        id: 'topic-16-imparfait-with-special-constructions',
        title: '3. The imparfait with special constructions',
        detailedDescription: [
          'With a si on construction, the imparfait is used to make a suggestion or to invite someone to do something. The informal on refers to two or more people and is conjugated in the third-person singular.',
          '**Si on allait en France cet été? ** - What about going to France this summer?',
          'You will encounter the imparfait in other idiomatic constructions, for instance, preceded by si seulement, to express a wish or a regret.',
          '**Si seulement on pouvait prendre des vacances!** - If only we could take a vacation!',
          'In Chapter 13, you studied the immediate past with the verb venir de infinitive. The immediate past can also be used in the imparfait to describe an action that had just happened.',
          '**Elle vient de téléphoner. ** - She has just called.',
          '**Elle venait de téléphoner quand il est entré.** - She had just called when he walked in.'
        ],
      },
      {
        id: 'topic-16-plus-que-parfait',
        title: 'The plus-que-parfait',
        detailedDescription: [
          'To form the plus-que-parfait, use the forms of avoir or être in the imparfait the past participle of the main verb.',
          'In the plus-que-parfait, all pronominal verbs are conjugated with être and agree in gender and number with the subject.',
          '**Vous vous étiez promenés le long du canal Saint-Martin. ** - You had walked along the Saint-Martin canal.'
        ],
        tables: [
          {
            title: 'Être — Imparfait',
            headers: ['Pronoun', 'French', 'English'],
            rows: [
              ['Je', 'j’étais', 'I was'],
              ['Tu', 'tu étais', 'you were'],
              ['Il/Elle', 'il/elle était', 'he/she was'],
              ['Nous', 'nous étions', 'we were'],
              ['Vous', 'vous étiez', 'you were'],
              ['Ils/Elles', 'ils/elles étaient', 'they were']
            ]
          },
          {
            title: 'Avoir — Imparfait',
            headers: ['Pronoun', 'French', 'English'],
            rows: [
              ['Je', 'j’avais', 'I had'],
              ['Tu', 'tu avais', 'you had'],
              ['Il/Elle', 'il/elle avait', 'he/she had'],
              ['Nous', 'nous avions', 'we had'],
              ['Vous', 'vous aviez', 'you had'],
              ['Ils/Elles', 'ils/elles avaient', 'they had']
            ]
          }
        ]
      },
      {
        id: 'topic-16-use-of-plus-que-parfait',
        title: 'Use of the plus-que-parfait',
        detailedDescription: [
          'As we mentioned earlier, the plus-que-parfait (pluperfect) indicates a past action that happened before another past action started. This anteriority can be implied or stated. Therefore, the plus-que-parfait is often combined with a dependent clause that states this clearly.',
          '**Je ne m’étais pas rendu compte que j’étais malade.** - I had not realized I was sick.',
          'In Chapter 10, you studied depuis with the present tense. In this chapter, you studied depuis with the imparfait (where English uses the plus-que-parfait). Let’s review a few examples.',
          '**Ils dînent dans ce restaurant thaïlandais depuis des années. ** - They have been dining at this Thai restaurant for years.',
          '**Elle prend de la vitamine C depuis des mois.** - She has been taking vitamin C for months.',
          'The plus-que-parfait, when used with si seulement, expresses a wish or regret about past events.',
          '**Si seulement il n’avait pas attrapé un rhume!** - If only he had not caught a cold!'
        ]
      }
    ],
    practiceExercises: [
      {
        id: 'ex-u16-1',
        type: 'multiple-choice',
        prompt: 'Conjugate "faire" in the imparfait for "nous": "À cette époque, nous _____ du ski chaque hiver."',
        options: ['faisions', 'faisons', 'faisiez', 'avaient fait'],
        correctAnswer: 'faisions',
        hint: 'Nous form of present is faisons -> stem is "fais" + ions.',
        explanation: 'Imparfait of faire for nous: faisions.',
      },
      {
        id: 'ex-u16-2',
        type: 'multiple-choice',
        prompt: 'Complete with the plus-que-parfait: "Elle ne pouvait pas payer car elle _____ (perdre) son portefeuille."',
        options: ['avait perdu', 'a perdu', 'perdra', 'perdait'],
        correctAnswer: 'avait perdu',
        hint: 'Action that occurred prior to the past state.',
        explanation: 'Plus-que-parfait indicates anteriority: avait perdu.',
      },
    ],
  },

  // ==========================================
  // Unit 21: Prepositions
  // ==========================================
  {
    id: 'unit-21-prepositions',
    unitNumber: 21,
    category: 'Prepositions, Voice & Pronouns',
    level: 'A2',
    title: 'Unit 21: Prepositions (Verbal Regimes, Geography & Time)',
    frenchTitle: 'Unité 21 : Les prépositions (Régimes verbaux, géographie et temps)',
    subtitle: 'Master verbs requiring "à", "de", or direct objects, geographical prepositions, and temporal distinctions.',
    formula: 'Géographie: en France (fém.), au Japon (masc.), aux États-Unis (plur.), à Paris (ville)  |  Temps: depuis (présent), pendant (passé fini), en (durée), dans (délai)',
    goldenRule: 'Verbs of thinking/starting/tendency take **« À »** (penser à, commencer à, apprendre à), while verbs of memory/stopping/deciding take **« De »** (se souvenir de, arrêter de, décider de). Geographical prepositions strictly match the grammatical gender of the nation.',
    topics: [
      {
        id: 'topic-21-common-prepositions',
        title: '1. Common prepositions',
        detailedDescription: [
          'A preposition is a liaison word. Invariable, it never changes. No mas culine, no feminine. You are already familiar with several French prepositions: à (to, at), avec (with), avant (before), en (in), and pour (for). a preposition is a part of speech that establishes a connection between words or word groups.',
          'The prepositions à and de, when combined with the definite article, take on different forms.',
          '**à + le = au**',
          '**Jean et Vincent sont allés au cinéma. ** - Jean and Vincent went to the movies.',
          '**à + la = à la**',
          '**Anne est à la maison.** - Anne is at home.',
          '**à + les = aux**',
          '**Elle montre des photos aux enfants. ** - She shows pictures to the children.',
          '**de + le = du**',
          '**Je lui ai parlé du film.  ** - I talked to him about the film.',
          '**de + la = de la**',
          '**Le cheval s’approche de la rivière. ** - The horse is moving toward the river.',
          '**de + les = des**',
          '**Il a peur des souris. ** - He is afraid of mice.',
          'The preposition de plus a noun can express possession.',
          '**La voiture des voisins est grise. ** - The neighbors’ car is gray.'
        ],
        tables: [
          {
            title: 'Prepositions',
            headers: ['French', 'English'],
            rows: [
              ['à', 'at, in'],
              ['après', 'after'],
              ['avant', 'before'],
              ['avec', 'with'],
              ['chez', 'at, with'],
              ['contre', 'against'],
              ['dans', 'in'],
              ['de', 'of, from'],
              ['derrière', 'behind'],
              ['dès', 'from'],
              ['devant', 'in front of'],
              ['durant', 'during'],
              ['en', 'in, out of'],
              ['entre', 'between'],
              ['envers', 'toward'],
              ['hormis', 'apart from'],
              ['hors', 'except, apart from'],
              ['malgré', 'in spite of'],
              ['par', 'by, through'],
              ['parmi', 'among'],
              ['pendant', 'during'],
              ['pour', 'for'],
              ['sans', 'without'],
              ['sauf', 'except'],
              ['selon', 'according to'],
              ['sous', 'under'],
              ['suivant', 'according to'],
              ['sur', 'on'],
              ['vers', 'toward'],
              ['vu', 'considering, given']
            ]
          }
        ],
      },
      {
        id: 'topic-21-with-preposition-multiple-meaning',
        title: '2. "With" preposition with multiple meaning',
        detailedDescription: [
          'The preposition **with** presents a number of translation problems. Let’s look at a few examples—the easy ones first.',
          '**J’irai à Miami avec Etienne. ** - I’ll go to Miami with Etienne.',
          'To refer to an attribute or feature of a person or thing, **with** is translated by à the definite article.',
          '**L’ homme aux yeux verts est acteur. ** - The man with green eyes is an actor.',
          'To describe how to do something, **with** is translated by de.',
          '**Je l’ai remercié d’un sourire. ** - I thanked him with a smile.',
          'The preposition **wi**th is left untranslated when describing a way of doing things or carrying oneself.',
          '**Il avance vers eux, les manches retroussées. ** - He is walking toward them with his sleeves rolled up.',
          'Some adjectives followed by **with** in English take de in French.',
          '**Elle est contente de son nouvel emploi. ** - She is happy with her new job.'
        ],
      },
      {
        id: 'topic-21-sur',
        title: '3. "Sur" preposition',
        detailedDescription: [
          'The preposition sur presents different problems. It is not always translated by on in English.',
          '**L’ordinateur est sur le bureau. ** - The computer is on the desk.',
          '**Il a quinze mille euros sur son compte.** - He has 15,000 euros in his account.',
          '**La cuisine fait deux mètres sur trois. ** - The kitchen measures two by three meters.',
          'As you can see, sur is not always translated by on in English. And as the following examples show, on is not always translated by sur.',
          '**Ils se promènent dans la rue. ** - They are walking on the street.',
          '**Son bureau se trouve au quatrième étage. ** - Her office is on the fourth floor.',
          '**Le Louvre est à votre gauche.** - The Louvre is on your left.',
          'When expressing time, en and dans have different uses. Dans is used for an action about to begin.',
          '**Le train part dans trois minutes. ** - The train is leaving in three minutes.',
          'En indicates the length of time an action has taken, takes, or will take.',
          '**Ahmadou a couru le marathon en moins de quatre heures.** - Ahmadou ran the marathon in less than four hours.'
        ],
      },
      {
        id: 'topic-21-use-of-á-and-en-and-de',
        title: 'Use of á, en and de',
        detailedDescription: [
          'In referring to time, à is used for hours of the day and en is used for months, years, and seasons, except for spring.',
          '**Les participants sont arrivés à midi.** - The participants arrived at noon.',
          '**La guerre d’Indochine a pris fin en 1954. ** - The Indochina war ended in 1954.',
          'To express means of transportation, different prepositions are used. More precisely, when a person has to do by himself/herself to move or travel, we use **á** otherwise **en**',
          '**aller à bicyclette** - to go by bicycle',
          '**aller à cheval** - to ride',
          '**aller à pied ** - to walk',
          '**aller en autobus ** - to go by bus',
          '**aller en avion** - to go by plane',
          'Note the difference between en and dans in distinguishing between general and specific.',
          '**À Paris, je circule en métro. ** - In Paris, I travel by subway.',
          '**Hier j’ai vu Arnaud dans le métro. ** - Yesterday I saw Arnaud in the subway.',
          'The preposition à can denote nature, function, or purpose.',
          '**une glace à la framboise ** - a strawberry ice cream',
          '**un moulin à café ** - a coffee mill',
          'The preposition **de** can denote contents or composition.',
          '**une boîte de petits pois** - a can of peas',
          '**un bol de soupe ** - a bowl of soup'
        ]
      },
      {
        id: 'topic-21-compound-prepositions',
        title: 'Compound prepositions',
        detailedDescription: [
          'Compound prepositions are prepositions made up of two or three words. Here’s a list of the most common of these prepositions. There is no mystery about them—you just have to memorize them one by one.',
        ],
        tables: [
          {
            title: 'Compound Prepositions',
            headers: ['French', 'English'],
            rows: [
              ['à cause de', 'because of'],
              ['à côté de', 'beside, next to'],
              ['à défaut de', 'for lack of'],
              ['à force de', 'by dint of'],
              ['à l’égard de', 'toward, with regard to'],
              ['à l’exception de', 'except for'],
              ['à l’instar de', 'following the example of'],
              ['à l’insu de', 'without (somebody)’s knowing'],
              ['à la faveur de', 'thanks to, owing to'],
              ['à la merci de', 'at the mercy of'],
              ['à même', 'straight from, next to'],
              ['à même de', 'in a position to (do something)'],
              ['à partir de', 'from'],
              ['à raison de', 'at the rate of, on the basis of'],
              ['à travers', 'across, through'],
              ['au bas de', 'at the bottom of, at the foot of'],
              ['au bord de', 'by, on the verge of, on the brink of'],
              ['au coin de', 'at the corner of'],
              ['au lieu de', 'instead of'],
              ['au milieu de', 'in the middle of'],
              ['au moyen de', 'by means of'],
              ['au nord de', 'north of'],
              ['au prix de', 'at the cost of'],
              ['au sud de', 'south of'],
              ['au-dehors de', 'outside'],
              ['au-delà de', 'beyond'],
              ['au-dessous de', 'under, below'],
              ['au-dessus de', 'above, on top of'],
              ['auprès de', 'next to, with'],
              ['autour de', 'around'],
              ['aux alentours de', 'in the vicinity of'],
              ['aux dépens de', 'at the expense of'],
              ['aux environs de', 'in the vicinity of'],
              ['d’après', 'according to'],
              ['de façon à', 'so as to'],
              ['de peur de', 'for fear of'],
              ['en bas', 'downstairs'],
              ['en bas de', 'at the bottom of'],
              ['en comparaison de', 'in comparison with'],
              ['en dépit de', 'despite'],
              ['en face de', 'in front of, opposite'],
              ['en guise de', 'by way of'],
              ['en haut de', 'at/to the top of'],
              ['en raison de', 'because of, owing to'],
              ['en-dehors de', 'outside, apart from'],
              ['face à', 'against, faced with'],
              ['faute de', 'for lack of, for want of'],
              ['grâce à', 'thanks to'],
              ['le long de', 'along'],
              ['loin de', 'far from']
            ]
          }
        ]
      },
      {
        id: 'topic-21-geography',
        title: 'Prepositions with geographical names',
        detailedDescription: [
          'To express in or to with a geographical name, the preposition var ies in French. With cities, the preposition à is used.',
          'Cities are usually not preceded by an article. Some exceptions are La Nouvelle-Orléans, Le Havre, La Rochelle, Le Mans, and Le Caire.',
          'With countries, states, and provinces, the preposition changes ac cording to gender, number, and the initial sound of the word that follows.',
          '**en** - feminine',
          '**en** - masculine beginning with a vowel',
          '**au** - masculine beginning with a consonant',
          '**aux** - plural',
          'Elle voyagera **en** Allemagne, **aux États-Unis** puis **au** Brésil. - She’ll travel to Germany, the United States then to Brazil.',
          'With French provinces and departments, the preposition may vary. Before a feminine noun or a masculine noun beginning with a vowel, en is used.',
          'With names of American states, en is used before a feminine state name or a masculine state name beginning with a vowel. Au is used before a masculine state name beginning with a consonant.',
          'la Californie - **en Californie**',
          'l’Alabama - **en Alabama**',
          'Although usage may vary, the preposition **à (aux in the plural)** is often used for islands.',
          '**à Cuba**',
          '**aux Maldives**'
        ]
      },
      {
        id: 'topic-21-infinitives-with-adjectival-phrases',
        title: 'Infinitives with adjectival phrases',
        detailedDescription: [
          'The infinitive following an adjective is preceded by de,',
          'After the following common **être** + adjective expressions',
          '**être content(e) de ** - to be satisfied to',
          '**être déçu(e) de ** - to be disappointed to',
          '**être désolé(e) de** - to be sorry to',
          'After the impersonal il est adjective',
          '**il est bon de ** - it is good to',
          '**il est dangereux de ** - it is dangerous to'
        ]
      }
    ],
    practiceExercises: [
      {
        id: 'ex-u21-1',
        type: 'multiple-choice',
        prompt: 'Choose the correct preposition: "Mon frère part vivre _____ États-Unis le mois prochain."',
        options: ['aux', 'en', 'au', 'à les'],
        correctAnswer: 'aux',
        hint: 'Plural country name.',
        explanation: 'Plural countries take the preposition "aux" (à + les): aux États-Unis.',
      },
      {
        id: 'ex-u21-2',
        type: 'multiple-choice',
        prompt: 'Complete: "J\'apprends le français _____ six mois et je continue."',
        options: ['depuis', 'pendant', 'pour', 'dans'],
        correctAnswer: 'depuis',
        hint: 'Action began in the past and continues in the present.',
        explanation: '"Depuis" is used with the present tense for ongoing durations.',
      },
    ],
  },

  // ==========================================
  // Unit 22: The Infinitive Mood
  // ==========================================
  {
    id: 'unit-22-infinitive-mood',
    unitNumber: 22,
    category: 'Subjunctive & Non-Finite Moods',
    level: 'A2',
    title: 'Unit 22: The Infinitive Mood (L\'infinitif présent et passé)',
    frenchTitle: 'Unité 22 : Le mode infinitif (Présent, passé et constructions prépositionnelles)',
    subtitle: 'Use infinitives as noun subjects, after prepositions (pour, sans, avant de), and express past anteriority (après avoir/être).',
    formula: 'Après préposition: [sans / pour / avant de] + [Infinitif Présent]  |  Après être/avoir: [Après] + [avoir / être] + [Participe Passé]  |  Négation: [ne pas] + [Infinitif]',
    goldenRule: '**« Avant de »** is followed by the Present Infinitive (**« Avant de partir »**), whereas **« Après »** is STRICTLY followed by the Past Infinitive (**« Après être parti »**, **« Après avoir mangé »**). In negative infinitives, **« ne pas »** stays joined together in front of the verb (**« Prière de ne pas fumer »**).',
    topics: [
      {
        id: 'topic-22-infinitif-présent',
        title: '1. The infinitif présent',
        detailedDescription: [
          'You will come across the infinitif, the infinitive mood, on many occasions. It is used more frequently in French than in English. The infinitif can be used as the subject of a verb.',
          'The infinitif is also used for general instructions, prescriptions, public notices, and proverbs (where the imperative is often used in English).',
          'The infinitive is used after verbs of perception (where the present participle is used in English).',
          'The infinitive is used after expressions of position. The preposition à precedes the infinitive.',
        ],
        contrastExamples: [
          {
            french: 'Voyager par le train est rapide.',
            english: 'Traveling by train is fast.',
          },
          {
            french: 'Prendre une fois par jour. ',
            english: 'Take once a day.',
          },
          {
            french: 'J’ai vu les moutons traverser la route. ',
            english: 'I saw the sheep crossing (cross) the road.',
          },
          {
            french: 'Il est debout à éplucher des carottes. ',
            english: 'He is standing peeling carrots.',
          }
        ]
      },
      {
        id: 'topic-22-infinitif-passe',
        title: '2. Infinitif Passé',
        detailedDescription: [
          'To express an action that happened prior to another, use the past infinitive—formed by pairing the infinitive of *avoir* or *être* with the main verb\'s past participle.',
          '**Les hôtes ont remercié le chef d’avoir préparé un si bon repas. ** - The guests thanked the chef for having prepared such a good meal.',
          '**Comment pouvait-il avoir brûlé tout le dîner?** - How could he have burnt the whole dinner?',
          'One common occurrence of the infinitif passé is after the preposition après (after), while the infinitif présent follows avant de (before).',
          'Gérard fait mariner la viande **avant d’éplucher** un oignon. - Gérard marinates the meat before peeling an onion.',
          'Gérard fait mariner la viande **après avoir** épluché un oignon. - Gérard marinates the meat after peeling an onion.'
        ],
        contrastExamples: [
          {
            french: 'Nous nous sommes excusés d’être partis avant le dessert.',
            english: 'We apologized for leaving before dessert.',
          },
          {
            french: 'Elle lit le journal avant de se lever. ',
            english: 'She reads the paper before getting up.',
          }
        ]
      },
      {
        id: 'topic-22-verbs-without-prepositions',
        title: '3. Verbs not followed by a preposition',
        detailedDescription: [
          "The verbs listed in the following table don't require any preposition",
          'Elle **voudrait devenir** traiteur. - She would like to become a caterer.',
          'Il **sait faire** la sauce béchamel. - He knows how to make béchamel sauce.',
          'In the above examples, the subject of the first verb is the same as the one for the second verb; that’s why the infinitive form is used. When the subjects are different, a dependent clause introduced by que is required. Depending on the verb in the main clause, the dependent clause can be in the indicative or the subjunctive.',
          '**J’espère obtenir ce poste.** - I am hoping to get this position.',
          'J’espère **qu’elle obtiendra** ce poste. - I am hoping she’ll get this position.'
        ],
        tables: [
          {
            title: 'Verbs',
            headers: ['French', 'English'],
            rows: [
              ['aimer', 'to like, to love'],
              ['aller', 'to go'],
              ['avouer', 'to admit'],
              ['compter', 'to intend, to plan'],
              ['désirer', 'to desire, to wish'],
              ['détester', 'to hate (to)'],
              ['devoir', 'must, to have to'],
              ['écouter', 'to listen to'],
              ['espérer', 'to hope to'],
              ['faire', 'to do'],
              ['falloir', 'must, to be necessary to'],
              ['laisser', 'to let, to allow'],
              ['oser', 'to dare (to)'],
              ['paraître', 'to appear, to seem'],
              ['penser', 'to think'],
              ['pouvoir', 'can, to be able to'],
              ['préférer', 'to prefer'],
              ['prétendre', 'to claim'],
              ['savoir', 'to know (how to)'],
              ['sembler', 'to seem to'],
              ['sentir', 'to feel, to think'],
              ['souhaiter', 'to wish to'],
              ['venir', 'to come'],
              ['voir', 'to see'],
              ['vouloir', 'to want to']
            ]
          }
        ],
      },
      {
        id: 'topic-22-verbs-followed-by-á',
        title: 'Verbs followed by the preposition à',
        detailedDescription: [
          'Many verbs are followed by the preposition à when they precede an infinitive. You have already encountered quite a few in previous chapters. These will also need to be memorized.',
          'Il **commence à travailler** à huit heures. - He starts to work at eight o’clock.'
        ],
        tables: [
          {
            title: 'Verbs + à',
            headers: ['French', 'English'],
            rows: [
              ['s’accoutumer à', 'to get accustomed to'],
              ['aider à', 'to help to'],
              ['s’amuser à', 'to enjoy'],
              ['apprendre à', 'to learn to, to show how to'],
              ['arriver à', 'to manage to'],
              ['aspirer à', 'to aspire to'],
              ['s’attendre à', 'to expect to'],
              ['autoriser à', 'to authorize to'],
              ['chercher à', 'to try to, to attempt to'],
              ['commencer à', 'to start to'],
              ['consentir à', 'to agree to, to consent to'],
              ['continuer à', 'to continue to, to keep on'],
              ['se décider à', 'to make up one’s mind to'],
              ['encourager à', 'to encourage to'],
              ['se faire à', 'to get used to'],
              ['faire attention à', 'to pay attention to'],
              ['s’habituer à', 'to get used to'],
              ['hésiter à', 'to hesitate to'],
              ['inciter à', 'to encourage to'],
              ['s’intéresser à', 'to get interested in'],
              ['inviter à', 'to invite to'],
              ['se mettre à', 'to start to, to begin to'],
              ['parvenir à', 'to manage to'],
              ['préparer à', 'to get ready to'],
              ['renoncer à', 'to give up'],
              ['se résigner à', 'to resign oneself to']
            ]
          }
        ]
      },
      {
        id: 'topic-22-verbs-followed-by-de',
        title: 'Verbs followed by the preposition de',
        detailedDescription: [
          'Now that you have memorized some of the à verbs, let’s look at some verbs followed by the preposition de when they precede an infinitive.',
          'Il **a essayé de faire** un soufflé. - He tried to make a soufflé.'
        ],
        tables: [
          {
            title: 'Verbs + de',
            headers: ['French', 'English'],
            rows: [
              ['accuser de', 'to accuse (of)'],
              ['s’arrêter de', 'to stop'],
              ['avoir besoin de', 'to need to'],
              ['avoir envie de', 'to feel like, to want'],
              ['avoir l’intention de', 'to intend to'],
              ['avoir peur de', 'to be afraid of'],
              ['cesser de', 'to stop, to cease'],
              ['choisir de', 'to choose to'],
              ['conseiller de', 'to advise (to)'],
              ['se contenter de', 'to content oneself with'],
              ['convaincre de', 'to convince (to)'],
              ['craindre de', 'to fear (to)'],
              ['défendre de', 'to forbid (to)'],
              ['demander de', 'to ask (to)'],
              ['se dépêcher de', 'to hurry to'],
              ['s’efforcer de', 'to try hard to'],
              ['empêcher de', 'to prevent (from)'],
              ['s’empêcher de', 'to refrain from'],
              ['envisager de', 'to contemplate'],
              ['essayer de', 'to try to'],
              ['éviter de', 'to avoid'],
              ['s’excuser de', 'to apologize for'],
              ['faire semblant de', 'to pretend to'],
              ['feindre de', 'to feign to, to pretend to'],
              ['finir de', 'to finish, to end up'],
              ['interdire de', 'to forbid (to)'],
              ['menacer de', 'to threaten to'],
              ['mériter de', 'to deserve to'],
              ['offrir de', 'to offer to'],
              ['oublier de', 'to forget to'],
              ['permettre de', 'to allow (to), to permit (to)'],
              ['persuader de', 'to persuade (to), to convince (to)'],
              ['se plaindre de', 'to complain of'],
              ['projeter de', 'to plan to/on'],
              ['promettre de', 'to promise to'],
              ['refuser de', 'to refuse to'],
              ['regretter de', 'to regret'],
              ['remercier de', 'to thank (for)'],
              ['reprocher de', 'to reproach for'],
              ['soupçonner de', 'to suspect of'],
              ['se souvenir de', 'to remember to'],
              ['tâcher de', 'to try to']
            ]
          }
        ]
      }
    ],
    practiceExercises: [
      {
        id: 'ex-u22-1',
        type: 'multiple-choice',
        prompt: 'Choose the correct form: "_____ (rentrer) chez lui, il a préparé le dîner."',
        options: ['Après être rentré', 'Après rentrer', 'Avant être rentré', 'En rentré'],
        correctAnswer: 'Après être rentré',
        hint: '"Après" requires the past infinitive (auxiliary être + past participle).',
        explanation: '"Après" takes the past infinitive: "Après être rentré".',
      },
      {
        id: 'ex-u22-2',
        type: 'multiple-choice',
        prompt: 'Where does "ne pas" go with an infinitive? "Je préfère (ne pas / parler)."',
        options: ['ne pas parler', 'ne parler pas', 'pas parler ne', 'parler ne pas'],
        correctAnswer: 'ne pas parler',
        hint: '"Ne pas" remains undivided before the infinitive.',
        explanation: 'Before an infinitive, "ne pas" sits directly together in front: "ne pas parler".',
      },
    ],
  },

  // ==========================================
  // Unit 23: The Imperative Mood
  // ==========================================
  {
    id: 'unit-23-imperative-mood',
    unitNumber: 23,
    category: 'Subjunctive & Non-Finite Moods',
    level: 'A2',
    title: 'Unit 23: The Imperative Mood (Pronoun Positioning & Commands)',
    frenchTitle: 'Unité 23 : L\'impératif et la place des pronoms (Affirmatif vs Négatif)',
    subtitle: 'Give strong commands, advice, and instructions while mastering hyphenated pronoun placement.',
    formula: 'Affirmatif: [Verbe] - [le/la/les] - [moi/toi/lui/nous/vous/leur] - [y/en]  |  Négatif: Ne + [pronoms] + [Verbe] + pas',
    goldenRule: 'In **Affirmative commands**, pronouns follow the verb attached with **hyphens**, and "me/te" become stressed **« moi/toi »** (e.g. **« Donne-le-moi ! »**). In **Negative commands**, pronouns return to their normal position **BEFORE the verb** (e.g. **« Ne me le donne pas ! »**).',
    topics: [
      {
        id: 'topic-23-formation',
        title: '1. Formation of the Imperative (Tu, Nous, Vous)',
        detailedDescription: [
          'The imperative mood (l’impératif) is used to give orders, make suggestions, or give advice.',
          'To make the three forms of the imperative, take the tu, nous, and vous forms of the present tense. For the -er verbs, drop the -s of the present tense tu form.',
          '**Parle** - speak!',
          "**Parlons** - Let's speak",
          '**Parlez** - speak!',
          '**Prends un café avant de partir! ** - Have a coffee before you leave!',
          '**Allons leur rendre visite! ** = Let’s go visit them!',
          'In the negative form, the negation is placed around the verb. Note that object pronouns immediately precede the verb (following ne [n’]) in the negative imperative.',
          '**N’oubliez pas son anniversaire! ** - Don’t forget her birthday!'
        ],
      },
      {
        id: 'topic-23-irregular-imperative-forms',
        title: '2. Irregular imperative forms',
        detailedDescription: [
          '**être** to be',
          '**sois** be',
          "**soyons** Let's be",
          '**soyez** be',
          '**avoir** to have',
          '**aie** have',
          "**ayons** Let's have",
          '**ayez** - have',
          '**savoir** - to know',
          '**sache** know',
          "**sachons** Let’s know",
          '**sachez** know',
          'The irregular verb vouloir (to want) is used only in the vous imperative form.'
        ],
        contrastExamples: [
          {
            french: 'Veuillez accepter mes excuses! ',
            english: 'Please accept my excuses!',
          },
          {
            french: 'Aie plus de patience! ',
            english: 'Have more patience!',
          },
          {
            french: 'Sachez que je suis avec vous! ',
            english: 'Be aware (Know that) I am with you!'
          }
        ]
      },
      {
        id: 'topic-23-object-pronouns-with-imperative',
        title: '3. The position of object pronouns with the imperative',
        detailedDescription: [
          'In the affirmative imperative the object pronoun follows the verb and is joined to it by a hyphen (me becomes moi).',
          'If there are two object pronouns with the imperative form, the direct object pronoun precedes the indirect object pronoun, but y and en always come last. The pronouns are joined to each other and to the verb by a hyphen. Note that before en, moi becomes m’.',
        ],
        contrastExamples: [
          {
            french: 'Attendez-moi!',
            english: 'Wait for me!',
          },
          {
            french: 'Aidez-les!',
            english: 'Help them!',
          },
          {
            french: 'Tenez-moi au courant! ',
            english: 'Keep me posted!',
          },
          {
            french: 'Dis-le-moi!',
            english: 'Tell me!',
          },
          {
            french: 'Donnez-les-leur!',
            english: 'Give them to them!',
          }
        ]
      }
    ],
    practiceExercises: [
      {
        id: 'ex-u23-1',
        type: 'multiple-choice',
        prompt: 'Choose the correct affirmative command for: "Give it to us!" (le livre à nous):',
        options: ['Donnez-le-nous !', 'Donnez-nous-le !', 'Donnez le à nous !', 'Nous le donnez !'],
        correctAnswer: 'Donnez-le-nous !',
        hint: 'In affirmative imperative: Verb + Direct (le) + Indirect (nous).',
        explanation: 'Affirmative imperative orders direct pronouns (le/la/les) before indirect pronouns: Donnez-le-nous !',
      },
      {
        id: 'ex-u23-2',
        type: 'sentence-builder',
        prompt: 'Build the negative command: "Ne lui parle pas de cette histoire !"',
        words: ['parle', 'cette', 'Ne', 'lui', 'de', 'histoire !', 'pas'],
        correctAnswer: 'Ne lui parle pas de cette histoire !',
        hint: 'Ne + pronoun + verb + pas + complement.',
        explanation: 'In negative commands, the pronoun precedes the verb: Ne lui parle pas...',
      },
    ],
  },

  // ==========================================
  // Unit 26: Pronouns
  // ==========================================
  {
    id: 'unit-26-pronouns',
    unitNumber: 26,
    category: 'Prepositions, Voice & Pronouns',
    level: 'A2',
    title: 'Unit 26: Pronouns (COD, COI, Y, En & Double Object Syntax)',
    frenchTitle: 'Unité 26 : Les pronoms personnels (COD, COI, Y, En et l\'ordre des pronoms)',
    subtitle: 'Replace nouns with direct (le/la/les), indirect (lui/leur), adverbial (y/en), and tonic pronouns.',
    formula: 'Ordre avant le verbe: [me/te/se/nous/vous] → [le/la/l\'/les] → [lui/leur] → [y] → [en] + [Verbe]',
    goldenRule: 'Object pronouns always go **immediately BEFORE the conjugated verb** (or auxiliary in compound tenses), ordered strictly according to the French pronoun hierarchy matrix.',
    topics: [
      {
        id: 'topic-26-subject-pronouns',
        title: '1. Subject pronouns',
        detailedDescription: [
          '**je** I',
          '**tu** you (singular familiar)',
          '**il** he, it (masculine)',
          '**elle** she, it (feminine)',
          '**On** one, we, they, people',
          '**nous** we',
          '**vous** you (singular formal and all plurals)',
          '**ils** they (masculine, or mixed masculine and feminine)',
          '**elles** they (feminine)',
          'Remember that there are two ways of saying you in French. Use tu and its verb forms to talk to friends, family members, children, and animals. Use vous when you are addressing a stranger or someone you don’t know well, or to maintain a certain degree of distance or respect.',
          'Note, however, that the contemporary trend is toward familiarity, especially among peers. It all depends on the setting and the crowd. However, it’s always a good idea to let the native French speaker initiate your first exchange with tu.',
          'The pronoun on has several meanings. It may mean one, we, or they depending on how it is used. On can replace an indefinite person.',
          '**On voudrait tout réussir. ** - One would like to succeed in everything.',
          'On means people in general. It often refers to habits and customs of a culture.',
          '**En France, on boit du vin. ** - In France, one drinks wine.',
          'In informal conversation, on takes on the meaning of nous.',
          '**On va au cinéma cet après-midi?** - Shall we go to the movies this afternoon?',
          'Another informal use of on replaces the pronoun tu.',
          '**Ah, on s’amuse ici! ** - So, we are having fun here!'
        ],
      },
      {
        id: 'topic-26-direct-object-pronouns',
        title: '2. Direct object pronouns',
        detailedDescription: [
          'Another type of pronoun is the direct object pronoun (le pronom objet direct). In English there are seven direct object pronouns: me, you, him, her, it, us, them. Note that in French there are two forms of the direct object pronoun you: the informal te and the formal or plural vous. English distinguishes between a direct object pronoun that replaces a person (him or her) or a thing (it); in French le, la, les can replace both people and things. Les refers to both masculine and femi- nine. Me, te, le, and la become m’, t’, and l’ before vowels and mute h.',
          '**L’artiste chante la chanson. ** - The artist sings the song.',
          '**L’artiste la chante. ** - The artist sings it.',
          '**Quentin appelle son ami. ** - Quentin calls his friend.',
          '**Quentin l’appelle. ** - Quentin calls him.',
          'In a negative sentence, the direct object pronoun also comes immediately before the conjugated verb.',
          '**Nous n’acceptons pas l’offre. ** - We do not accept the offer.',
          '**Nous ne l’acceptons pas. ** - We do not accept it.',
          'In the interrogative form, when using the inversion, the direct object pronoun comes immediately before the verb.',
          '**Connaissez-vous ce dentiste? ** - Do you know this dentist?',
          '**Le connaissez-vous? ** - Do you know him?',
        ],
        tables: [
          {
            title: 'Direct Object Pronouns',
            headers: ['Singular', 'English', 'Plural', 'English'],
            rows: [
              ['me (m’)', 'me', 'nous', 'us'],
              ['te (t’)', 'you (familiar)', 'vous', 'you (plural or formal)'],
              ['le (l’)', 'him or it (masculine)', 'les', 'them (masc. and fem.)'],
              ['la (l’)', 'her or it (feminine)', '', '']
            ]
          }
        ],
      },
      {
        id: 'topic-26-y-indirect-object-pronouns',
        title: '3. Indirect object pronouns',
        detailedDescription: [
          'In English there are five indirect object pronouns me, you, him, her, us. As always, French distinguishes between an informal you (te) and a formal or plural you (vous). The French indirect object pronoun does not, however, distinguish gender; lui and leur replace both masculine and feminine nouns. In French, the indirect object pronoun replaces only animate indirect objects (people, animals). Inanimate ideas and things are replaced with the indirect object pronouns **y** and **en**, which will be discussed later in this chapter. Let’s look at the indirect object pronouns:',
          '**Tu parles au journaliste. ** - You are talking to the journalist.',
          '**Tu lui parles. ** - You are talking to him.',
          '**Tu réponds à Andrée. ** - You answer Andrée.',
          '**Tu lui réponds. ** - You answer her.',
          'In the interrogative or negative, the indirect object pronoun is placed immediately before the verb.',
          '**Lui as-tu parlé de ce livre? ** - Did you talk to him about this book?'
        ],
        tables: [
          {
            title: 'Indirect Object Pronouns',
            headers: ['Singular', 'English', 'Plural', 'English'],
            rows: [
              ['me (m’)', 'me', 'nous', 'us'],
              ['te (t’)', 'you (familiar)', 'vous', 'you (formal or plural)'],
              ['lui', 'him, her', 'leur', 'them (masc. and fem.)']
            ]
          }
        ],
      },
      {
        id: 'topic-26-pronoun-y-and-en',
        title: '4. The pronoun y and en',
        detailedDescription: [
          'Y is an indirect object pronoun that precedes the verb. It usually replaces an inanimate object (thing or idea). The object replaced by y is considered indirect because it is preceded by a preposition, usually the preposition à, but sometimes sur.',
          '**Elle répond à l’annonce. ** - She answers the ad.',
          '**Elle y répond. ** - She answers it.',
          'En is an indirect object pronoun that precedes the verb. It usually replaces an inanimate object (thing or idea) preceded by de. The pronoun en immediately precedes the verb, except in the affirmative imperative where it follows the verb.',
          'Nous nous occuperons **de tous les détails.** - We’ll take care of all the details. ',
          'Nous nous **en** occuperons. - We’ll take care of them.',
        ],
      },
      {
        id: 'topic-26-order-of-object-pronouns',
        title: '5. The order of object pronouns',
        detailedDescription: [
          'he order of object pronouns When a direct and indirect pronoun appear in the same sentence, the indirect object pronoun comes first, unless the direct and indirect pronouns are in the third person, in which case the direct object pronoun comes first.',
          'Elle **te** donne **le rôle.** - She gives you the part.',
          'Elle **te le** donne. - She gives it to you.',
          'If the direct and indirect pronouns in the third person are combined, the direct object pronoun comes first.',
          'J’envoie **la lettre au rédacteur.** - I send the letter to the editor.',
          'Je **la lui** envoie. - I send it to him.'
        ],
        tables: [
          {
            title: 'Object Pronouns',
            headers: ['Indirect Object', 'Direct Object'],
            rows: [
              ['me (m’)', 'le, la, l’, les'],
              ['te (t’)', 'le, la, l’, les'],
              ['nous', 'le, la, l’, les'],
              ['vous', 'le, la, l’, les']
            ]
          },
          {
              title: 'Object Pronouns',
              headers: ['Direct Object', 'Indirect Object'],
              rows: [
                ['le (l’)', 'lui, leur'],
                ['la (l’)', 'lui, leur'],
                ['les', 'lui, leur']
              ]
            }
        ]
      },
      {
        id: 'topic-26-Possessive-pronouns',
        title: '6. Possessive pronouns',
        detailedDescription: [
          'Possessive pronouns replace nouns used with possessive adjectives. They agree in gender and number with the noun they replace, not with the possessor.',
          'Remember that the most common way of expressing possession is by using être à the disjunctive pronoun.',
          'The possessive pronoun is also often used with **aussi** and **non plus** to confirm an affirmative or negative statement.'
        ],
        tables: [
          {
            title: 'Possessive Pronouns — Masculine',
            headers: ['Singular', 'English', 'Plural', 'English'],
            rows: [
              ['le mien', 'mine', 'les miens', 'mine'],
              ['le tien', 'yours', 'les tiens', 'yours'],
              ['le sien', 'his/hers', 'les siens', 'his/hers'],
              ['le nôtre', 'ours', 'les nôtres', 'ours'],
              ['le vôtre', 'yours', 'les vôtres', 'yours'],
              ['le leur', 'theirs', 'les leurs', 'theirs']
            ]
          },
          {
            title: 'Possessive Pronouns — Feminine',
            headers: ['Singular', 'English', 'Plural', 'English'],
            rows: [
              ['la mienne', 'mine', 'les miennes', 'mine'],
              ['la tienne', 'yours', 'les tiennes', 'yours'],
              ['la sienne', 'his/hers', 'les siennes', 'his/hers'],
              ['la nôtre', 'ours', 'les nôtres', 'ours'],
              ['la vôtre', 'yours', 'les vôtres', 'yours'],
              ['la leur', 'theirs', 'les leurs', 'theirs']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'J’apporte mes notes et tu apportes les tiennes.',
            english: 'I bring my notes and you bring yours.'
          },
          {
            french: 'Il a téléphoné à son avocat et elle a téléphoné au sien.',
            english: 'He called his lawyer and she called hers.'
          },
          {
            french: 'Cette valise est à moi. ',
            english: 'This suitcase is mine.'
          },
          {
            french: 'Son appartement coûtait cher. —Le mien aussi. ',
            english: 'His apartment was expensive. —So was mine.'
          }
        ]
      },
      {
        id: 'topic-26-demonstrative-pronouns',
        title: 'Demonstrative pronouns',
        detailedDescription: [
          'A demonstrative pronoun replaces a demonstrative adjective a noun. It agrees in gender and number with the noun it replaces. It can refer to people or things. In a sentence, it can be the subject or object of the verb and be followed by que, qui, de, or another prepositional phrase.',
          'Earlier, you studied the demonstrative adjectives ce, cet, cette, ces (this, that, these, those) used to point out things and people.',
          'Note that the demonstrative adjective ce adds a -t before a masculine singular noun that starts with a vowel or a mute h (cet appartement, cet arbre).'
        ],
        tables: [
          {
            title: 'Demonstrative Pronouns',
            headers: ['Number', 'Masculine', 'English', 'Feminine', 'English'],
            rows: [
              ['Singular', 'celui', 'the one (masculine)', 'celle', 'the one (feminine)'],
              ['Plural', 'ceux', 'the ones (masc.; masc. and fem.)', 'celles', 'the ones (feminine)']
            ]
          },
          {
            title: 'Demonstrative Pronouns — -ci and -là',
            headers: ['Number', 'Masculine', 'English', 'Feminine', 'English'],
            rows: [
              ['Singular', 'celui-ci', 'this one (masculine)', 'celle-ci', 'this one (feminine)'],
              ['Singular', 'celui-là', 'that one (masculine)', 'celle-là', 'that one (feminine)'],
              ['Plural', 'ceux-ci', 'these (ones) (masc.; masc. and fem.)', 'celles-ci', 'these (ones) (fem.)'],
              ['Plural', 'ceux-là', 'those (ones) (masc.; masc. and fem.)', 'celles-là', 'those (ones) (feminine)']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Cette dame est celle qui habitait autrefois à côté.',
            english: 'That woman is the one who used to live next door.'
          },
          {
            french: 'Celui-ci est en argent. Celui-là est en or. ',
            english: 'This one is silver. That one is gold.'
          }
        ]
      }
    ],
    practiceExercises: [
      {
        id: 'ex-u26-1',
        type: 'multiple-choice',
        prompt: 'Replace the underlined words: "Marie prête sa voiture à ses amis."',
        options: ['Marie la leur prête.', 'Marie leur la prête.', 'Marie les lui prête.', 'Marie la lui prête.'],
        correctAnswer: 'Marie la leur prête.',
        hint: 'Sa voiture = la (COD) ; à ses amis = leur (COI). Matrix: le/la before lui/leur.',
        explanation: 'Direct object pronoun "la" precedes indirect pronoun "leur": Marie la leur prête.',
      },
      {
        id: 'ex-u26-2',
        type: 'sentence-builder',
        prompt: 'Build the sentence: "Nous y allons en train."',
        words: ['allons', 'y', 'Nous', 'en', 'train.'],
        correctAnswer: 'Nous y allons en train.',
        hint: 'Subject + y + verb + manner.',
        explanation: 'Pronoun "y" precedes the conjugated verb: Nous y allons en train.',
      },
    ],
  },

  // ==========================================
  // Unit 29: Adverbs
  // ==========================================
  {
    id: 'unit-29-adverbs',
    unitNumber: 29,
    category: 'Nouns, Gender, Adjectives & Adverbs',
    level: 'A2',
    title: 'Unit 29: Adverbs (Formation with -ment & Syntactic Placement)',
    frenchTitle: 'Unité 29 : Les adverbes (Formation en -ment et place dans la phrase)',
    subtitle: 'Form adverbs from feminine adjectives and position them accurately in simple and compound tenses.',
    formula: 'Règle générale = [Adjectif Féminin] + [-ment] (lent → lente → lentement)  |  Terminaison -ant: -amment  |  Terminaison -ent: -emment',
    goldenRule: 'To form an adverb, take the feminine singular form of the adjective and add **« -ment »**. In simple tenses, adverbs sit immediately **after the conjugated verb** (**« Il parle lentement »**); in compound tenses, short/common adverbs sit **between the auxiliary and participle** (**« J\'ai bien dormi »**).',
    topics: [
      {
        id: 'topic-29-interrogative-forms',
        title: '1. Interrogative forms',
        detailedDescription: [
          'When you want to formulate questions, interrogative words come in handy. Here are some important ones:',
          '**pourquoi** why',
          '**où** where',
          '**quand** when',
          '**comment** how',
          '**combien** how much',
          '**que** what',
          '**qui** who, whom',
          '**dans quelle mesure** to what extent',
          'Below Adverbs are some words that are helpful when talking about location, time or expressions of time'
        ],
        tables: [
          {
            title: 'Adverbs of Place',
            headers: ['French', 'English'],
            rows: [
              ['ici', 'here'],
              ['là', 'there'],
              ['là-bas', 'over there'],
              ['ailleurs', 'elsewhere'],
              ['ça et là', 'here and there'],
              ['à cet endroit', 'in this place'],
              ['là-haut', 'up there'],
              ['partout', 'everywhere'],
              ['près', 'near, close'],
              ['loin', 'far'],
              ['à côté', 'next to, beside'],
              ['auprès', 'next to, close to'],
              ['dehors', 'outside'],
              ['dedans', 'inside'],
              ['devant', 'in front of'],
              ['derrière', 'behind'],
              ['dessus', 'on top'],
              ['dessous', 'under']
            ]
          },
          {
            title: 'Adverbs and Expressions of Time',
            headers: ['French', 'English'],
            rows: [
              ['aujourd’hui', 'today'],
              ['demain', 'tomorrow'],
              ['hier', 'yesterday'],
              ['après-demain', 'the day after tomorrow'],
              ['avant-hier', 'the day before yesterday'],
              ['dans trois jours', 'in three days (from today)'],
              ['dans une quinzaine', 'in two weeks'],
              ['dans un mois', 'in a month'],
              ['dans un an', 'in a year'],
              ['la semaine prochaine', 'next week'],
              ['la semaine dernière', 'last week']
            ]
          },
          {
            title: 'Adverbs and Expressions of Time',
            headers: ['French', 'English'],
            rows: [
              ['chaque jour', 'every day'],
              ['tous les jours', 'every day'],
              ['maintenant', 'now'],
              ['en ce moment', 'at the moment'],
              ['actuellement', 'presently'],
              ['d’habitude', 'usually'],
              ['d’ordinaire', 'ordinarily'],
              ['toujours', 'always, still'],
              ['souvent', 'often'],
              ['ne... jamais', 'never'],
              ['longtemps', 'for a long time'],
              ['autrefois', 'formerly'],
              ['rarement', 'rarely'],
              ['tôt', 'early'],
              ['tard', 'late'],
              ['parfois', 'sometimes'],
              ['quelquefois', 'sometimes'],
              ['de temps en temps', 'from time to time'],
              ['de temps à autre', 'from time to time']
            ]
          }
        ],
      },
    ],
    practiceExercises: [
      {
        id: 'ex-u29-1',
        type: 'multiple-choice',
        prompt: 'What is the correct adverb formed from "patient"?',
        options: ['patiemment', 'patientement', 'patientamment', 'patiement'],
        correctAnswer: 'patiemment',
        hint: 'Adjectives ending in -ent take -emment.',
        explanation: 'Patient ends in -ent, so the adverb is "patiemment".',
      },
      {
        id: 'ex-u29-2',
        type: 'multiple-choice',
        prompt: 'Select the correct word: "Ce gâteau est très _____ (bon/bien) et le chef cuisine _____ (bon/bien)."',
        options: ['bon / bien', 'bien / bon', 'bon / bon', 'bien / bien'],
        correctAnswer: 'bon / bien',
        hint: 'Adjective modifies the noun (gâteau); adverb modifies the verb (cuisine).',
        explanation: 'Un gâteau est bon (adjective); on cuisine bien (adverb).',
      },
    ],
  },
];
