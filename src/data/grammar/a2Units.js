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
    detailedDescription: [
      'Semi-auxiliary verb constructions are among the most versatile conversational tools in French.',
      'By combining **aller**, **venir de**, or **faire** with an infinitive, you can situate actions in the immediate timeline or describe delegated services without complex conjugations.'
    ],
    topics: [
      {
        id: 'topic-13-futur-proche',
        title: '1. Le Futur Proche (Aller + Infinitif)',
        formula: '[Sujet] + [aller au présent] + [Infinitif du verbe d\'action]',
        goldenRule: 'Use the **Futur Proche** for imminent future events or predetermined intentions. In negative sentences, **« ne... pas »** wraps around **aller** (**« Je ne vais pas manger »**).',
        detailedDescription: [
          'The **Futur Proche** is extremely frequent in spoken French. It conveys high certainty or immediacy ("going to do").',
          'Object pronouns sit immediately **before the infinitive**, not before aller: **« Je vais le faire »** (not "Je le vais faire").'
        ],
        tables: [
          {
            title: 'Futur Proche Conjugation (Partir, Regarder)',
            subtitle: 'Conjugating Aller + main verb in infinitive',
            description: 'Only the auxiliary "aller" is conjugated.',
            headers: ['Pronoun', 'Aller', 'Partir (Infinitive)', 'Negative Form'],
            rows: [
              ['Je', 'vais', 'partir', 'Je ne vais pas partir'],
              ['Tu', 'vas', 'partir', 'Tu ne vas pas partir'],
              ['Il / Elle', 'va', 'partir', 'Il ne va pas partir'],
              ['Nous', 'allons', 'partir', 'Nous n\'allons pas partir'],
              ['Vous', 'allez', 'partir', 'Vous n\'allez pas partir'],
              ['Ils / Elles', 'vont', 'partir', 'Ils ne vont pas partir']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Attention, le train va partir dans une minute !',
            english: 'Watch out, the train is going to leave in one minute!',
            aspectNote: 'Imminent event expressed with futur proche.'
          },
          {
            french: 'Je vais lui téléphoner ce soir.',
            english: 'I am going to phone him this evening.',
            aspectNote: 'Object pronoun "lui" placed directly before the infinitive "téléphoner".'
          }
        ]
      },
      {
        id: 'topic-13-passe-recent',
        title: '2. Le Passé Récent (Venir de + Infinitif)',
        formula: '[Sujet] + [venir au présent] + [de / d\'] + [Infinitif]',
        goldenRule: 'Express actions that happened moments ago with **« Venir de + Infinitif »**. Never omit the preposition **« de »**!',
        detailedDescription: [
          'The **Passé Récent** translates the English "have just done".',
          'Before a verb starting with a vowel, **de** elides into **d\'** (**« Je viens d\'arriver »**).',
          'In past narration, conjugating venir in the imparfait creates an anterior recent past: **« Il venait de sortir quand le téléphone a sonné »** (He had just stepped out when the phone rang).'
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
            french: 'Je viens de raccrocher avec le directeur.',
            english: 'I have just hung up with the director.',
            aspectNote: 'Just completed action with "venir de".'
          },
          {
            french: 'Elle venait d\'acheter ce vase quand son chat l\'a brisé.',
            english: 'She had just bought this vase when her cat broke it.',
            aspectNote: 'Imparfait of venir (venait d\') showing recent past relative to a past event.'
          }
        ]
      },
      {
        id: 'topic-13-causatif',
        title: '3. La Forme Causative (Faire + Infinitif)',
        formula: '[Sujet] + [faire conjugué] + [Infinitif d\'action] (+ par / à quelqu\'un)',
        goldenRule: 'When the grammatical subject does not perform the action personally but arranges for someone else to do it, use **« Faire + Infinitif »**.',
        detailedDescription: [
          'English says "I am having my hair cut" or "The teacher made us read". In French, both are expressed by **faire + infinitive**.',
          'The agent who performs the work is introduced by **par** (for external services: **« fait réparer par le garagiste »**) or **à** (when commanding a person: **« fait lire aux élèves »**).'
        ],
        tables: [
          {
            title: 'Causative "Faire + Infinitif" Examples',
            subtitle: 'Everyday service scenarios and delegations',
            description: 'Notice that the second verb is always an invariable infinitive.',
            headers: ['Scenario', 'French Causative', 'English Translation', 'Agent Indicator'],
            rows: [
              ['Hairdresser', 'Elle se fait couper les cheveux.', 'She is having her hair cut.', 'Reflexive causative'],
              ['Mechanic', 'Pierre fait réparer sa voiture par un pro.', 'Pierre is having his car repaired by a pro.', 'Agent with "par"'],
              ['Dry cleaning', 'Je fais nettoyer ce costume.', 'I am having this suit cleaned.', 'Direct service'],
              ['School / Order', 'Le professeur fait répéter la phrase.', 'The teacher has the phrase repeated.', 'Causative instruction']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Pierre fait réparer sa voiture par le mécanicien.',
            english: 'Pierre is having his car repaired by the mechanic.',
            aspectNote: 'Pierre did not fix it; he caused the mechanic to fix it.'
          },
          {
            french: 'Elle fait bouillir l\'eau pour préparer le thé.',
            english: 'She brings the water to a boil to prepare the tea.',
            aspectNote: 'Causative with inanimate object (causing water to boil).'
          }
        ]
      }
    ],
    rules: [
      'Futur Proche (Going to do): Aller in present + main infinitive (e.g. "Je vais partir"). Used heavily in spoken French.',
      'Passé Récent (Just did): Venir in present + de/d\' + main infinitive (e.g. "Je viens d\'arriver").',
      'In negative sentences, "ne... pas" surrounds the conjugated auxiliary verb: "Je ne vais pas manger", "Il ne vient pas de partir".',
      'Causative Form (Faire + Infinitif): Subject causes another agent or service to perform the verb (e.g. "Elle fait couper ses cheveux", "Le professeur fait lire les étudiants").',
    ],
    contrastExamples: [
      {
        french: 'Je viens de finir mon déjeuner et je vais prendre un café.',
        english: 'I have just finished my lunch and I am going to have a coffee.',
        aspectNote: 'Passé récent (venir de finir) juxtaposed with Futur proche (vais prendre).',
      },
      {
        french: 'Pierre fait réparer sa voiture par le mécanicien.',
        english: 'Pierre is having his car repaired by the mechanic.',
        aspectNote: 'Causative structure: Pierre is not repairing it himself; he has it done.',
      },
    ],
    commonTraps: [
      'Forgetting the preposition "de" in passé récent ("Je viens partir" is incorrect; say "Je viens de partir").',
      'Conjugating the second verb in causative constructions (the second verb must remain in the infinitive).',
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
    detailedDescription: [
      'Pronominal verbs carry a reflexive pronoun (**me, te, se, nous, vous, se**) that matches the subject.',
      'They fall into three functional families: reflexive actions (on oneself), reciprocal interactions (between each other), and purely idiomatic verbs.'
    ],
    topics: [
      {
        id: 'topic-14-families',
        title: '1. Reflexive & Reciprocal Actions (Se laver, S\'aimer)',
        formula: 'Reflexive: [Sujet] + [pronom réfléchi] + [Verbe] (action sur soi-même)  |  Reciprocal: [Sujet pluriel] + [nous / vous / se] + [Verbe] (action mutuelle)',
        goldenRule: 'Reflexive actions bounce back onto the actor (**« Je me lave »**). Reciprocal actions require a plural subject and describe mutual actions (**« Ils s\'aiment »**).',
        detailedDescription: [
          'In reflexive verbs, subject and object are the same person: **se lever, se laver, se réveiller, se brosser**.',
          'Reciprocal verbs exist only in the plural (*nous, vous, ils/elles*): **se regarder, se téléphoner, se disputer, s\'embrasser**.',
          'Idiomatic pronominal verbs have meanings completely distinct from their non-reflexive counterparts: **se souvenir de** (to remember), **se tromper** (to make a mistake), **se méfier de** (to distrust).'
        ],
        tables: [
          {
            title: 'Pronominal Conjugation in Present Tense (Se lever)',
            subtitle: 'Matching reflexive pronouns with verbal endings',
            description: 'Notice how the reflexive pronoun adapts to each person.',
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
            french: 'Je me lève à 7 heures tous les matins.',
            english: 'I get up at 7 o\'clock every morning.',
            aspectNote: 'Reflexive daily routine with "se lever".'
          },
          {
            french: 'Roméo et Juliette s\'aiment passionnément.',
            english: 'Romeo and Juliet love each other passionately.',
            aspectNote: 'Reciprocal mutual action with plural subject.'
          }
        ]
      },
      {
        id: 'topic-14-passe-compose',
        title: '2. Compound Tenses with Être (Le Passé Composé Pronominal)',
        formula: '[Sujet] + [me / te / s\' / nous / vous / s\'] + [être au présent] + [Participe Passé]',
        goldenRule: 'All pronominal verbs without exception take the auxiliary **« Être »** in compound tenses. Never use "Avoir" with a reflexive verb!',
        detailedDescription: [
          'In compound tenses like the *passé composé*, the reflexive pronoun is wedged between the subject and the auxiliary verb **être**:',
          '**« Je me suis couché »**, **« Elle s\'est réveillée »**, **« Nous nous sommes promenés »**.',
          'In negative sentences: **« Elle ne s\'est pas réveillée »** (the *ne... pas* brackets the reflexive pronoun and auxiliary).'
        ],
        tables: [
          {
            title: 'Passé Composé of Pronominal Verbs (Se coucher)',
            subtitle: 'With auxiliary Être and feminine/plural agreement marks',
            description: 'Notice the participle takes -e for feminine and -s for plural.',
            headers: ['Pronoun', 'Conjugated Auxiliary', 'Participle (Masc / Fem)', 'Meaning'],
            rows: [
              ['Je', 'me suis', 'couché / couchée', 'I went to bed'],
              ['Tu', 't\'es', 'couché / couchée', 'you went to bed'],
              ['Il / Elle', 's\'est', 'couché / couchée', 'he / she went to bed'],
              ['Nous', 'nous sommes', 'couchés / couchées', 'we went to bed'],
              ['Vous', 'vous êtes', 'couché(e)(s)', 'you went to bed'],
              ['Ils / Elles', 'se sont', 'couchés / couchées', 'they went to bed']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Elle s\'est levée très tôt pour prendre l\'avion.',
            english: 'She got up very early to catch the flight.',
            aspectNote: 'Participle takes feminine "-ée" agreeing with subject "Elle".'
          },
          {
            french: 'Ils se sont disputés hier soir.',
            english: 'They argued yesterday evening.',
            aspectNote: 'Reciprocal verb agreeing with masculine plural "Ils" (-és).'
          }
        ]
      },
      {
        id: 'topic-14-traps',
        title: '3. Agreement Traps & Invariable Cases (COD vs. COI)',
        formula: 'Accord avec le sujet: SI le pronom réfléchi est COD  |  PAS D\'ACCORD: SI un COD suit le verbe OU si le verbe régit "à" (COI)',
        goldenRule: 'The past participle of pronominal verbs **DOES NOT AGREE** if: (1) A specific body part or direct object follows the verb (**« Elle s\'est lavé les mains »**), or (2) The verb takes an indirect object in normal syntax (**« Ils se sont parlé »** [parler à]).',
        detailedDescription: [
          'This is one of the most famous grammar traps in the French language!',
          'Compare: **« Elle s\'est lavée »** (She washed herself; "se" is COD → agrees: +e). But: **« Elle s\'est lavé les mains »** ("les mains" is COD placed *after* the verb → no agreement: lavé).',
          'Verbs that take **à quelqu\'un** (téléphoner à, parler à, sourire à, succéder à) have NO direct object, so their participle is strictly invariable: **« Elles se sont téléphoné »**, **« Ils se sont souri »**.'
        ],
        tables: [
          {
            title: 'Pronominal Agreement Decision Matrix',
            subtitle: 'Direct Object vs. Indirect Object vs. Subsequent COD',
            description: 'Examine whether the pronoun is COD or COI.',
            headers: ['Sentence', 'Role of Reflexive Pronoun', 'Participle Agreement', 'Reason'],
            rows: [
              ['Elles se sont lavées.', 'COD (themselves)', 'Yes (+es)', '"Se" is direct object preceding verb.'],
              ['Elles se sont lavé les mains.', 'COI (to themselves)', 'NO (+0)', 'COD "les mains" comes after the verb.'],
              ['Ils se sont téléphoné.', 'COI (téléphoner à)', 'NO (+0)', '"Téléphoner à" is indirect; no COD.'],
              ['Ils se sont parlé.', 'COI (parler à)', 'NO (+0)', '"Parler à" is indirect; no COD.']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Elle s\'est lavée dans la salle de bain.',
            english: 'She washed in the bathroom.',
            aspectNote: 'Agrees in feminine singular (+e) because "se" is the direct object.'
          },
          {
            french: 'Elle s\'est lavé le visage à l\'eau fraîche.',
            english: 'She washed her face with cool water.',
            aspectNote: 'No agreement (+e) because the direct object "le visage" is placed after the verb.'
          },
          {
            french: 'Nous nous sommes téléphoné pendant des heures.',
            english: 'We phoned each other for hours.',
            aspectNote: 'No agreement on téléphoné because "téléphoner à" is an indirect verbal construction.'
          }
        ]
      }
    ],
    rules: [
      'Reflexive (action on oneself): se laver (to wash oneself), se lever (to get up), se réveiller (to wake up).',
      'Reciprocal (action on each other): s\'aimer (to love each other), se téléphoner (to call each other).',
      'Idiomatic (inherent reflexive meaning): se souvenir de (to remember), se tromper (to make a mistake), se dépêcher (to hurry).',
      'Participle Agreement Trap: In "Elle s\'est lavée", "se" is COD (agrees: +e). In "Elle s\'est lavé les mains", "les mains" is COD placed AFTER the verb (no agreement: lavé). In "Ils se sont parlé", "parler à" is COI (no agreement: parlé).',
    ],
    contrastExamples: [
      {
        french: 'Elles se sont levées tôt ce matin.',
        english: 'They got up early this morning.',
        aspectNote: 'Reflexive with direct action on subject: agrees in feminine plural (+es).',
      },
      {
        french: 'Elle s\'est lavé les mains.',
        english: 'She washed her hands.',
        aspectNote: 'No agreement (+e) on lavé because the direct object "les mains" follows the verb.',
      },
      {
        french: 'Marie et Paul se sont téléphoné hier soir.',
        english: 'Marie and Paul phoned each other yesterday evening.',
        aspectNote: 'No agreement on téléphoné because "téléphoner à" takes an indirect object.',
      },
    ],
    commonTraps: [
      'Using "avoir" with reflexive verbs in passé composé (never say "Je m\'ai lavé"; always "Je me suis lavé").',
      'Adding agreement to verbs that take indirect objects like "se parler", "se téléphoner", "se succéder".',
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
    detailedDescription: [
      'The **Passé Composé** is the primary tense used in spoken French to narrate completed, punctual past events.',
      'To use it accurately, you must master the choice between the auxiliaries **Avoir** and **Être**, memorize irregular participles, and apply the crucial preceding direct object rule.'
    ],
    topics: [
      {
        id: 'topic-15-avoir',
        title: '1. Avoir Auxiliary & Regular/Irregular Participles',
        formula: '[Sujet] + [ai, as, a, avons, avez, ont] + [Participe Passé]',
        goldenRule: 'The vast majority of French verbs (over 90%) take **« Avoir »**. With Avoir, the past participle does NOT agree with the subject.',
        detailedDescription: [
          'Regular participle endings follow three simple patterns: -ER verbs become **-é** (parlé), -IR verbs become **-i** (fini), and -RE verbs become **-u** (vendu).',
          'Common irregular participles must be memorized: **eu** (avoir), **été** (être), **fait** (faire), **pris** (prendre), **mis** (mettre), **vu** (voir), **bu** (boire), **dit** (dire).'
        ],
        tables: [
          {
            title: 'Regular and Irregular Past Participles',
            subtitle: 'Key categories with Avoir auxiliary',
            description: 'No agreement with the subject when using avoir.',
            headers: ['Category', 'Infinitive', 'Participle', 'Example (with J\'ai...)'],
            rows: [
              ['Regular -ER', 'Parler', 'parlé', 'J\'ai parlé'],
              ['Regular -IR', 'Choisir', 'choisi', 'J\'ai choisi'],
              ['Regular -RE', 'Attendre', 'attendu', 'J\'ai attendu'],
              ['Irregular in -is', 'Prendre / Mettre', 'pris / mis', 'J\'ai pris mon parapluie'],
              ['Irregular in -it', 'Faire / Écrire', 'fait / écrit', 'J\'ai fait un gâteau'],
              ['Irregular in -u', 'Voir / Boire / Lire', 'vu / bu / lu', 'J\'ai lu ce livre']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Nous avons mangé dans un excellent bistrot parisien.',
            english: 'We ate in an excellent Parisian bistro.',
            aspectNote: 'Auxiliary avoir; no agreement with subject "Nous".'
          },
          {
            french: 'Elle a fait ses valises hier soir.',
            english: 'She packed her bags yesterday evening.',
            aspectNote: 'Irregular participle of faire (fait); no agreement with "Elle".'
          }
        ]
      },
      {
        id: 'topic-15-etre',
        title: '2. Être Auxiliary & DR & MRS VANDERTRAMP Verbs',
        formula: '[Sujet] + [suis, es, est, sommes, êtes, sont] + [Participe Passé] (+e, +s, +es)',
        goldenRule: 'Verbs conjugated with **« Être »** (the 17 movement/transformation verbs) **ALWAYS agree in gender and number** with the subject.',
        detailedDescription: [
          'The 17 movement and state-change verbs are remembered with the acronym **DR & MRS VANDERTRAMP**:',
          'Devenir, Revenir, Monter, Rester, Sortir, Venir, Aller, Naître, Descendre, Entrer, Rentrer, Tomber, Retourner, Arriver, Mourir, Partir.',
          'Add **-e** for feminine singular, **-s** for masculine plural, and **-es** for feminine plural.'
        ],
        tables: [
          {
            title: 'DR & MRS VANDERTRAMP Agreement Paradigm (Aller & Partir)',
            subtitle: 'Conjugating with Être and subject agreements',
            description: 'Subject gender and number strictly dictates the participle ending.',
            headers: ['Pronoun', 'Être Form', 'Participle Agreement', 'Meaning'],
            rows: [
              ['Il', 'est', 'allé / parti', 'He went / left'],
              ['Elle', 'est', 'allée / partie (+e)', 'She went / left'],
              ['Ils', 'sont', 'allés / partis (+s)', 'They went / left'],
              ['Elles', 'sont', 'allées / parties (+es)', 'They (fem.) went / left'],
              ['Marie et Paul', 'sont', 'arrivés (+s)', 'Marie and Paul arrived'],
              ['Sophie et Léa', 'sont', 'nées (+es)', 'Sophie and Léa were born']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Mes sœurs sont arrivées à Paris ce matin.',
            english: 'My sisters arrived in Paris this morning.',
            aspectNote: 'Feminine plural subject (Mes sœurs) requires "-ées" with auxiliary être.'
          },
          {
            french: 'Victor Hugo est né à Besançon en 1802.',
            english: 'Victor Hugo was born in Besançon in 1802.',
            aspectNote: 'Irregular participle of naître (né) with masculine singular subject.'
          }
        ]
      },
      {
        id: 'topic-15-cod-agreement',
        title: '3. Preceding Direct Object (COD) Agreement with Avoir',
        formula: '[COD placé avant] + [avoir conjugué] + [Participe Passé accordé avec le COD]',
        goldenRule: 'With Avoir, the past participle **AGREES with the Direct Object (COD)** if and only if that direct object is situated **BEFORE the verb** (via que, le, la, les, or quel).',
        detailedDescription: [
          'Normally, avoir never agrees with anything: **« J\'ai acheté les pommes »** ("les pommes" is after the verb → no agreement: acheté).',
          'However, if the COD is moved in front of the verb via a relative clause (**« Les pommes que j\'ai achetées »**) or an object pronoun (**« Je les ai achetées »**), the participle must agree with that preceding COD!'
        ],
        tables: [
          {
            title: 'Preceding COD vs. Subsequent COD Examples',
            subtitle: 'Comparing word order and participle agreement with Avoir',
            description: 'Check the position of the direct object relative to the auxiliary verb.',
            headers: ['Sentence Structure', 'COD Position', 'Agreement', 'Sample Sentence'],
            rows: [
              ['COD after verb', 'Après le verbe', 'NO agreement', 'J\'ai écrit une lettre.'],
              ['Relative pronoun "que"', 'Avant le verbe', 'Yes (+e)', 'La lettre que j\'ai écrite.'],
              ['Direct pronoun "la"', 'Avant le verbe', 'Yes (+e)', 'Je l\'ai écrite hier.'],
              ['Direct pronoun "les"', 'Avant le verbe', 'Yes (+es)', 'Les lettres ? Je les ai écrites.'],
              ['Interrogative "Quelle"', 'Avant le verbe', 'Yes (+e)', 'Quelle robe as-tu choisie ?']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Quelles jolies robes ! Tu les as achetées où ?',
            english: 'What pretty dresses! Where did you buy them?',
            aspectNote: 'Achetées agrees with the preceding direct object pronoun "les" (fem. plural robes).'
          },
          {
            french: 'Voici la lettre que Paul a envoyée ce matin.',
            english: 'Here is the letter that Paul sent this morning.',
            aspectNote: 'Envoyée agrees with "la lettre" via preceding relative pronoun "que".'
          }
        ]
      }
    ],
    rules: [
      'DR & MRS VANDERTRAMP verbs taking Être: Devenir, Revenir, Monter, Rester, Sortir, Venir, Aller, Naître, Descendre, Entrer, Rentrer, Tomber, Retourner, Arriver, Mourir, Partir.',
      'Regular participles: -ER verbs → -é (parlé), -IR verbs → -i (fini), -RE verbs → -u (vendu).',
      'Irregular participles: avoir → eu, être → été, faire → fait, prendre → pris, mettre → mis, voir → vu, écrire → écrit, ouvrir → ouvert.',
      'The Preceding Direct Object (COD) rule with Avoir: "Les fleurs que j\'ai achetées" (agrees with "les fleurs" because "que" precedes the verb).',
    ],
    contrastExamples: [
      {
        french: 'Elle est allée à la boulangerie et elle a acheté du pain.',
        english: 'She went to the bakery and she bought bread.',
        aspectNote: 'Allée agrees with subject "Elle" (Être), while acheté does not agree (COD "pain" is after).',
      },
      {
        french: 'Quelles jolies robes ! Tu les as achetées où ?',
        english: 'What pretty dresses! Where did you buy them?',
        aspectNote: 'Achetées agrees with the preceding direct object pronoun "les" (referring to feminine plural robes).',
      },
    ],
    commonTraps: [
      'Forgetting agreement on Être verbs (e.g. "Elle est parti" instead of "Elle est partie").',
      'Making agreement with indirect objects (e.g. "Je leur ai téléphoné" does NOT agree because "leur" is COI).',
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
    detailedDescription: [
      'While the *Passé Composé* reports specific, bounded events that happened on the foreground timeline, the **Imparfait** paints the psychological backdrop, setting, habits, and ongoing states.',
      'The **Plus-que-parfait** allows you to flashback to actions completed prior to other past events.'
    ],
    topics: [
      {
        id: 'topic-16-imparfait',
        title: '1. L\'Imparfait (Formation & Usage for Background/Habits)',
        formula: '[Radical de "nous" au présent] + [-ais, -ais, -ait, -ions, -iez, -aient]',
        goldenRule: 'To form the Imparfait: take the **nous** form of the present tense, drop **-ons**, and attach the endings: **-ais, -ais, -ait, -ions, -iez, -aient**. The only irregular stem in the entire language is **Être (ét-)**.',
        detailedDescription: [
          'The Imparfait is the tense of duration without a defined beginning or end: weather (**« Il pleuvait »**), age (**« J\'avais dix ans »**), emotional state (**« Il était triste »**), and repeated routines (**« Tous les samedis, nous allions au marché »**).',
          'Notice that regular verbs like *finir* keep their infix: *nous finissons* → *je finissais*.'
        ],
        tables: [
          {
            title: 'Imparfait Endings Across Verb Groups',
            subtitle: 'Parler, Finir, and the sole irregular Être',
            description: 'The endings are identical for every single verb in French.',
            headers: ['Pronoun', 'Parler (parl-)', 'Finir (finiss-)', 'Être (ét-)'],
            rows: [
              ['Je', 'parlais', 'finissais', 'étais'],
              ['Tu', 'parlais', 'finissais', 'étais'],
              ['Il / Elle', 'parlait', 'finissait', 'était'],
              ['Nous', 'parlions', 'finissions', 'étions'],
              ['Vous', 'parliez', 'finissiez', 'étiez'],
              ['Ils / Elles', 'parlaient', 'finissaient', 'étaient']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Il faisait beau et les oiseaux chantaient dans les arbres.',
            english: 'The weather was beautiful and birds were singing in the trees.',
            aspectNote: 'Imparfait describing the ongoing physical atmosphere.'
          },
          {
            french: 'Quand j\'étais enfant, j\'adorais lire sous ma couette.',
            english: 'When I was a child, I loved reading under my blanket.',
            aspectNote: 'Habitual past state and age expressed with the imparfait.'
          }
        ]
      },
      {
        id: 'topic-16-plus-que-parfait',
        title: '2. Le Plus-que-parfait (Anteriority in the Past)',
        formula: 'Plus-que-parfait = [Avoir ou Être à l\'imparfait] + [Participe Passé]',
        goldenRule: 'The **Plus-que-parfait** establishes that an event **had already taken place** prior to another past event.',
        detailedDescription: [
          'Form the plus-que-parfait by conjugating **avoir (avais, avait, avions...)** or **être (étais, était, étions...)** in the imparfait, followed by the past participle.',
          'It is equivalent to the English past perfect ("had done", "had arrived").'
        ],
        tables: [
          {
            title: 'Plus-que-parfait Conjugation Examples',
            subtitle: 'With Avoir and Être auxiliaries',
            description: 'Subject agreement applies with être exactly as in the passé composé.',
            headers: ['Pronoun', 'Avoir + Mangé', 'Être + Parti'],
            rows: [
              ['J\' / Je', 'j\'avais mangé', 'j\'étais parti(e)'],
              ['Tu', 'tu avais mangé', 'tu étais parti(e)'],
              ['Il / Elle', 'il avait mangé', 'elle était partie'],
              ['Nous', 'nous avions mangé', 'nous étions parti(e)s'],
              ['Vous', 'vous aviez mangé', 'vous étiez parti(e)(s)'],
              ['Ils / Elles', 'ils avaient mangé', 'elles étaient parties']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Quand je suis arrivé à la gare, le train était déjà parti.',
            english: 'When I arrived at the station, the train had already left.',
            aspectNote: 'Train departure (était déjà parti) occurred prior to my arrival (suis arrivé).'
          },
          {
            french: 'J\'ai dévoré le gâteau que ma grand-mère avait préparé.',
            english: 'I devoured the cake that my grandmother had prepared.',
            aspectNote: 'Baking occurred before eating.'
          }
        ]
      },
      {
        id: 'topic-16-aspect-distinction',
        title: '3. Imparfait vs. Passé Composé Aspect Distinction',
        formula: 'Imparfait: [Arrière-plan / Action continue]  VS  Passé Composé: [Événement soudain / Action bornée]',
        goldenRule: 'Imagine a movie: the **Imparfait** is the scenery, climate, and background music; the **Passé Composé** is the sudden door slamming or gunshot that advances the plot.',
        detailedDescription: [
          'When two actions collide in the past, the ongoing continuous action uses the **Imparfait**, while the interrupting action uses the **Passé Composé**:',
          '**« Je dormais (imparfait) quand le réveil a sonné (passé composé) »**.',
          'Passé composé measures completed time (*pendant deux heures*); Imparfait describes an unmeasured state.'
        ],
        tables: [
          {
            title: 'Imparfait vs. Passé Composé Comparison',
            subtitle: 'Grammatical aspect and narrative role',
            description: 'Use this guide to choose between background and foreground.',
            headers: ['Feature', 'L\'Imparfait', 'Le Passé Composé'],
            rows: [
              ['Narrative Role', 'Background setting, scenery', 'Foreground action, plot event'],
              ['Duration', 'Indefinite, continuous, habitual', 'Bounded, completed, punctual'],
              ['English Equivalent', 'was doing / used to do', 'did / has done'],
              ['Typical Clues', 'tous les jours, souvent, d\'habitude', 'soudain, un jour, tout à coup, hier']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Je lisais tranquillement quand mon téléphone a vibré.',
            english: 'I was reading peacefully when my phone vibrated.',
            aspectNote: 'Continuous background reading (lisais) interrupted by vibration (a vibré).'
          },
          {
            french: 'Hier, il a plu toute la journée.',
            english: 'Yesterday, it rained all day.',
            aspectNote: 'Bounded historical block of time taking passé composé (a plu).'
          }
        ]
      }
    ],
    rules: [
      'Form the Imparfait by taking the "nous" stem of the present tense and adding: -ais, -ais, -ait, -ions, -iez, -aient. (Only exception is Être: stem "ét-").',
      'The Plus-que-parfait expresses anteriority in the past: "Quand je suis arrivé, le train était déjà parti" (When I arrived, the train had already left).',
      'Imparfait is also used with "Si" to express hypothetical present wishes: "Si j\'avais de l\'argent, j\'achèterais une maison".',
      'Time expressions with Imparfait: tous les jours, d\'habitude, souvent, pendant que, quand j\'étais jeune.',
    ],
    contrastExamples: [
      {
        french: 'Il faisait beau et les oiseaux chantaient dans les arbres.',
        english: 'The weather was beautiful and birds were singing in the trees.',
        aspectNote: 'Imparfait painting the descriptive background atmosphere.',
      },
      {
        french: 'J\'ai mangé le gâteau que ma mère avait préparé.',
        english: 'I ate the cake that my mother had prepared.',
        aspectNote: 'Passé composé (j\'ai mangé) preceded by Plus-que-parfait (avait préparé).',
      },
    ],
    commonTraps: [
      'Using the Passé Composé for routine descriptions or age ("Quand j\'ai eu 10 ans" is incorrect; say "Quand j\'avais 10 ans").',
      'Conjugating Être incorrectly in Imparfait (it is j\'étais, tu étais, il était, nous étions...).',
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
    detailedDescription: [
      'Prepositions act as grammatical glue. French preposition rules are strictly structured around gender (for countries), verbal regimes (which preposition a verb demands), and temporal aspect.',
      'Mastering these three areas prevents literal translations from English.'
    ],
    topics: [
      {
        id: 'topic-21-geography',
        title: '1. Geographical Prepositions (En, Au, Aux, À)',
        formula: 'Féminin / voyelle = en  |  Masculin = au  |  Pluriel = aux  |  Villes = à',
        goldenRule: 'Countries ending in **-e** are almost all feminine and take **« en »** (en France, en Espagne). Masculine countries take **« au »** (au Canada, au Japon). Plural countries take **« aux »** (aux États-Unis). All cities take **« à »** (à Paris, à Rome).',
        detailedDescription: [
          'To determine the preposition for countries, look at the final letter: if it ends in *-e*, it is feminine (exceptions: *le Mexique, le Cambodge, le Mozambique* take *au*).',
          'Masculine countries starting with a vowel switch to **en** for phonetic harmony: **en Iran, en Irak, en Israël**.'
        ],
        tables: [
          {
            title: 'Geographical Preposition Matrix',
            subtitle: 'Destinations and places where one is located',
            description: 'Apply the rule based on gender, number, and phonetic starts.',
            headers: ['Category', 'Rule', 'Sample Entities', 'Preposition + Noun'],
            rows: [
              ['Feminine Countries', 'Ends in -e', 'France, Italie, Espagne', 'en France, en Italie'],
              ['Masculine Countries', 'Consonant end', 'Japon, Canada, Brésil', 'au Japon, au Canada'],
              ['Vowel start (masc.)', 'Starts with vowel', 'Iran, Irak, Angola', 'en Iran, en Angola'],
              ['Plural Countries', 'Plural names', 'États-Unis, Pays-Bas', 'aux États-Unis, aux Pays-Bas'],
              ['Cities', 'Universal for cities', 'Paris, Tokyo, New York', 'à Paris, à Tokyo']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Mon frère habite en France, mais il voyage souvent au Japon.',
            english: 'My brother lives in France (fem.), but he often travels to Japan (masc.).',
            aspectNote: 'Feminine country (en France) vs. masculine country (au Japon).'
          },
          {
            french: 'Ils ont passé leurs vacances aux États-Unis, à San Francisco.',
            english: 'They spent their vacation in the United States, in San Francisco.',
            aspectNote: 'Plural country (aux États-Unis) + city (à San Francisco).'
          }
        ]
      },
      {
        id: 'topic-21-time',
        title: '2. Temporal Prepositions (Depuis, Pendant, En, Dans, Pour)',
        formula: 'depuis + Présent (ongoing)  |  pendant + Passé (bounded)  |  en (durée pour accomplir)  |  dans (délai avant début)',
        goldenRule: 'Use **« Depuis »** with the present tense for actions that started in the past and are **still ongoing**. Use **« Pendant »** for completed time spans. Never use "pour" for ongoing time!',
        detailedDescription: [
          'English says "I have been studying for 2 hours". In French, you must say **« J\'étudie depuis deux heures »** (present tense!).',
          '**Pendant** measures a completed duration (**« J\'ai dormi pendant 8 heures »**).',
          '**En** indicates the amount of time required to complete a task (**« J\'ai couru 10 km en 50 minutes »**).',
          '**Dans** specifies the delay before a future action begins (**« Le train part dans 10 minutes »**).'
        ],
        tables: [
          {
            title: 'Temporal Prepositions Overview',
            subtitle: 'Comparing Depuis, Pendant, En, Dans',
            description: 'Choose based on verb tense and temporal status.',
            headers: ['Preposition', 'Meaning', 'Associated Tense', 'Sample Sentence'],
            rows: [
              ['Depuis', 'Since / For (still ongoing)', 'Présent', 'J\'habite ici depuis 5 ans.'],
              ['Pendant', 'During / For (bounded)', 'Passé Composé', 'J\'ai voyagé pendant 2 mois.'],
              ['En', 'In (time to complete)', 'Any tense', 'Il a réparé le vélo en 10 minutes.'],
              ['Dans', 'In (starting after delay)', 'Futur', 'Nous partons dans 3 jours.'],
              ['Pour', 'For (planned future duration)', 'Futur / Intention', 'Je pars à Nice pour un mois.']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'J\'apprends le français depuis six mois.',
            english: 'I have been learning French for six months (and still am).',
            aspectNote: 'Depuis + present tense for ongoing action.'
          },
          {
            french: 'Hier, il a plu pendant trois heures consécutives.',
            english: 'Yesterday, it rained for three consecutive hours.',
            aspectNote: 'Pendant used with passé composé for completed duration.'
          }
        ]
      },
      {
        id: 'topic-21-verbal-regimes',
        title: '3. Verbal Regimes (Verbes à préposition À vs. De)',
        formula: '[Verbe] + [à + Infinitif / Nom]  VS  [Verbe] + [de + Infinitif / Nom]',
        goldenRule: 'Many French verbs require a specific preposition before an infinitive. Verbs of starting/teaching take **« à »** (commencer à, apprendre à); verbs of deciding/stopping/refusing take **« de »** (décider de, refuser de, essayer de).',
        detailedDescription: [
          'Unlike English, which relies heavily on the bare infinitive or gerund, French verbs govern infinitives through **à**, **de**, or **no preposition**.',
          'Direct verbs with no preposition before infinitive: **vouloir, pouvoir, devoir, aller, aimer, préférer**.'
        ],
        tables: [
          {
            title: 'Verbs Requiring À vs. De vs. Direct Infinitive',
            subtitle: 'Essential verbal governing patterns',
            description: 'Memorize these verbs alongside their prepositional partners.',
            headers: ['Regime', 'Common Verbs', 'Sample Construction', 'English Translation'],
            rows: [
              ['Verbe + À', 'Commencer à, Réussir à, Penser à, Hésiter à', 'J\'ai réussi à réussir l\'examen.', 'I succeeded in passing the exam.'],
              ['Verbe + De', 'Décider de, Choisir de, Arrêter de, Essayer de', 'Il a décidé de partir tôt.', 'He decided to leave early.'],
              ['Verbe Direct', 'Aimer, Vouloir, Pouvoir, Devoir, Aller', 'Je veux apprendre le français.', 'I want to learn French.'],
              ['Penser à vs De', 'Penser à (thinking about) / Penser de (opinion)', 'Que penses-tu de ce film ?', 'What do you think of this film?']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Elle a enfin commencé à comprendre la leçon.',
            english: 'She finally started to understand the lesson.',
            aspectNote: 'Commencer + à + infinitive.'
          },
          {
            french: 'Nous avons oublié de fermer la fenêtre.',
            english: 'We forgot to close the window.',
            aspectNote: 'Oublier + de + infinitive.'
          }
        ]
      }
    ],
    rules: [
      'Countries ending in -e are feminine and take "en" (en France, en Espagne, en Italie). Masculine countries take "au" (au Mexique, au Portugal). Plural countries take "aux" (aux Pays-Bas).',
      'Cities always take "à" (à Paris, à New York, à Tokyo).',
      'Temporal Prepositions: "Depuis" = action started in past and still ongoing in present; "Pendant" = completed, bounded duration; "En" = time taken to complete an action; "Dans" = time before a future action begins.',
      'Verbal prepositions before infinitives: "J\'ai décidé de partir", "J\'ai réussi à terminer".',
    ],
    contrastExamples: [
      {
        french: 'J\'habite en France depuis trois ans.',
        english: 'I have been living in France for three years (and still do).',
        aspectNote: 'Feminine country (en France) + ongoing duration (depuis + présent).',
      },
      {
        french: 'J\'ai voyagé au Canada pendant deux semaines.',
        english: 'I traveled in Canada for two weeks (completed past).',
        aspectNote: 'Masculine country (au Canada) + bounded past duration (pendant).',
      },
    ],
    commonTraps: [
      'Using "pour" for ongoing time (Say "J\'étudie depuis 2 heures", never "J\'étudie pour 2 heures").',
      'Saying "en Japon" instead of "au Japon" (Japon is masculine).',
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
    detailedDescription: [
      'The **Infinitive** is the unconjugated, pure verbal mood that names an action. It can act as a subject noun, follow a conjugated modal verb, or be governed by prepositions.',
      'Mastering the distinction between present infinitives and compound past infinitives elevates written and spoken accuracy.'
    ],
    topics: [
      {
        id: 'topic-22-prepositions',
        title: '1. Infinitif Présent after Prepositions (Pour, Sans, Avant de)',
        formula: '[pour / sans / avant de / afin de / au lieu de] + [Infinitif]',
        goldenRule: 'In French, all prepositions take the **Infinitive**, EXCEPT the preposition **« en »** (which governs the gerund: en mangeant).',
        detailedDescription: [
          'While English frequently uses the gerund after prepositions ("without speaking", "before leaving"), French strictly uses the **infinitive**: **sans parler**, **avant de partir**.',
          'Notice that **avant** requires the preposition **de** before an infinitive (**avant de faire**), whereas **après** does not.'
        ],
        tables: [
          {
            title: 'Preposition + Infinitive Constructions',
            subtitle: 'Common prepositions requiring the present infinitive',
            description: 'Replace English "-ing" forms with the French infinitive.',
            headers: ['Preposition', 'Meaning', 'Sample French Phrase', 'English Translation'],
            rows: [
              ['Pour', 'In order to', 'Il travaille dur pour réussir.', 'He works hard to succeed.'],
              ['Sans', 'Without', 'Il est parti sans dire un mot.', 'He left without saying a word.'],
              ['Avant de', 'Before doing', 'Réfléchis avant de parler.', 'Think before speaking.'],
              ['Au lieu de', 'Instead of', 'Au lieu de râler, aide-moi.', 'Instead of complaining, help me.']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Avant de signer le contrat, lisez attentivement chaque clause.',
            english: 'Before signing the contract, read each clause attentively.',
            aspectNote: '"Avant de" requires the present infinitive (signer).'
          },
          {
            french: 'Elle est entrée dans la pièce sans faire de bruit.',
            english: 'She entered the room without making noise.',
            aspectNote: '"Sans" takes the infinitive (faire).'
          }
        ]
      },
      {
        id: 'topic-22-infinitif-passe',
        title: '2. Infinitif Passé after Après (Après avoir/être fait)',
        formula: '[Après] + [avoir ou être à l\'infinitif] + [Participe Passé]',
        goldenRule: 'After the preposition **« Après »**, French strictly requires the **Past Infinitive (Infinitif Passé)** to express an action that is already finished.',
        detailedDescription: [
          'Saying *"Après partir"* or *"Après manger"* is a major grammatical mistake! You must say: **« Après être parti »** and **« Après avoir mangé »**.',
          'Auxiliary choice (avoir vs. être) and participle agreement rules follow the exact same logic as the *passé composé*.'
        ],
        tables: [
          {
            title: 'Infinitif Passé Conjugation after Après',
            subtitle: 'With Avoir and Être auxiliaries',
            description: 'Auxiliary in infinitive + past participle.',
            headers: ['Auxiliary', 'Infinitive Structure', 'Sample Sentence', 'Nuance'],
            rows: [
              ['Avoir', 'Après avoir + Participe', 'Après avoir bu son café, il est parti.', 'Action with avoir completed.'],
              ['Être', 'Après être + Participe', 'Après être rentrée, elle s\'est couchée.', 'Agreement with subject (rentrée).'],
              ['Pronominal (Être)', 'Après s\'être + Participe', 'Après s\'être lavé, il s\'est habillé.', 'Reflexive past infinitive.']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Après avoir signé le contrat, nous avons fêté la nouvelle.',
            english: 'After having signed the contract, we celebrated the news.',
            aspectNote: '"Après" governing past infinitive "avoir signé".'
          },
          {
            french: 'Après être arrivées à l\'hôtel, les filles se sont reposées.',
            english: 'After having arrived at the hotel, the girls rested.',
            aspectNote: '"Après être arrivées" with feminine plural agreement.'
          }
        ]
      },
      {
        id: 'topic-22-negation',
        title: '3. Negative Infinitives & Verbal Chains (Ne pas + Infinitif)',
        formula: 'Négation de l\'infinitif = [ne pas] + [Infinitif]  (ou [ne plus / ne jamais] + [Infinitif])',
        goldenRule: 'Unlike conjugated verbs (where "ne" and "pas" sandwich the verb), when negating an **infinitive**, both negative words **sit together immediately before the verb**.',
        detailedDescription: [
          'You see this constantly on formal signs and notices: **« Prière de ne pas fumer »** (Please do not smoke), **« Merci de ne pas jeter de déchets »**.',
          'In verbal chains (e.g. vouloir + infinitive), distinguish between negating the main verb (**« Je ne veux pas manger »**) and negating the infinitive (**« Je préfère ne pas manger »**).'
        ],
        tables: [
          {
            title: 'Negating Conjugated Verbs vs. Infinitives',
            subtitle: 'Split negation vs. Joined negation',
            description: 'Observe where "ne pas" sits relative to the verb.',
            headers: ['Type', 'Formula', 'French Example', 'English Translation'],
            rows: [
              ['Conjugated Verb', 'ne + [Verbe] + pas', 'Je ne fume pas.', 'I do not smoke.'],
              ['Negative Infinitive', 'ne pas + [Infinitif]', 'Prière de ne pas fumer.', 'Please do not smoke.'],
              ['Negative "Jamais"', 'ne jamais + [Infinitif]', 'Il a promis de ne jamais recommencer.', 'He promised never to do it again.'],
              ['Negative "Plus"', 'ne plus + [Infinitif]', 'Elle a décidé de ne plus hésiter.', 'She decided not to hesitate anymore.']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Prière de ne pas stationner devant la sortie de secours.',
            english: 'Please do not park in front of the emergency exit.',
            aspectNote: '"Ne pas" remains joined before the infinitive stationner.'
          },
          {
            french: 'Il a choisi de ne pas répondre aux provocations.',
            english: 'He chose not to reply to the provocations.',
            aspectNote: 'Voluntary negative decision modifying the infinitive.'
          }
        ]
      }
    ],
    rules: [
      'All prepositions (pour, sans, à, de, avant de, afin de) take the infinitive in French, EXCEPT "en" (which takes the gerund/participle).',
      'The Past Infinitive (Infinitif Passé) expresses an action completed before the main verb: "Après avoir terminé mon café, je suis parti".',
      'When two verbs follow each other with the same subject, the second verb is in the infinitive: "Il veut voyager", "Nous espérons réussir".',
      'Negative infinitives place "ne pas" together before the verb: "Il a décidé de ne pas venir".',
    ],
    contrastExamples: [
      {
        french: 'Avant de signer le contrat, lisez attentivement.',
        english: 'Before signing the contract, read attentively.',
        aspectNote: '"Avant de" + Present infinitive (signer).',
      },
      {
        french: 'Après avoir signé le contrat, nous avons fêté la nouvelle.',
        english: 'After having signed the contract, we celebrated the news.',
        aspectNote: '"Après" + Past infinitive (avoir signé).',
      },
      {
        french: 'Prière de ne pas stationner devant la porte.',
        english: 'Please do not park in front of the door.',
        aspectNote: 'Negative infinitive: "ne pas" precedes the infinitive directly.',
      },
    ],
    commonTraps: [
      'Saying "Après terminer" instead of "Après avoir terminé" (après requires the past infinitive).',
      'Saying "Pour faire cela" with a conjugated verb instead of the infinitive.',
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
    detailedDescription: [
      'The Imperative mood is used to issue orders, give advice, or make urgent requests. It exists only for three persons: **tu**, **nous**, and **vous** (without subject pronouns).',
      'The syntactic placement of object pronouns flips completely between affirmative and negative commands.'
    ],
    topics: [
      {
        id: 'topic-23-formation',
        title: '1. Formation of the Imperative (Tu, Nous, Vous)',
        formula: 'Tu (parle, finis, vends)  |  Nous (parlons, finissons, vendons)  |  Vous (parlez, finissez, vendez)',
        goldenRule: 'For all regular **-ER verbs**, the final **"-s" of the "tu" form is DROPPED** in the imperative: **« Parle ! »** (not Parles !), **« Regarde ! »**, **« Va ! »** (Aller). It returns only before "y" and "en" for liaison: **« Vas-y ! »**, **« Parles-en ! »**.',
        detailedDescription: [
          'Forming the imperative is simple: take the present tense forms of *tu, nous, vous* and drop the subject pronoun.',
          '-IR and -RE verbs keep their final "-s" for *tu* (**« Finis ton assiette ! »**, **« Attends-moi ! »**).'
        ],
        tables: [
          {
            title: 'Imperative Formation Table',
            subtitle: 'Regular -er, -ir, -re verbs across Tu, Nous, Vous',
            description: 'Notice the dropped "-s" on "tu" for -ER verbs.',
            headers: ['Verb Group', 'Tu Form', 'Nous Form', 'Vous Form'],
            rows: [
              ['Parler (-ER)', 'Parle ! (no -s)', 'Parlons !', 'Parlez !'],
              ['Aller (Exception)', 'Va ! (no -s)', 'Allons !', 'Allez !'],
              ['Finir (-IR)', 'Finis ! (keeps -s)', 'Finissons !', 'Finissez !'],
              ['Attendre (-RE)', 'Attends ! (keeps -s)', 'Attendons !', 'Attendez !']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Écoute bien ce que je vais te dire !',
            english: 'Listen well to what I am going to tell you!',
            aspectNote: 'Dropped "-s" on the -ER verb "écouter" for the "tu" command.'
          },
          {
            french: 'Prenez votre temps pour répondre.',
            english: 'Take your time to answer.',
            aspectNote: 'Formal or plural command with "vous".'
          }
        ]
      },
      {
        id: 'topic-23-affirmative-placement',
        title: '2. Affirmative Imperative & Pronoun Placement (Donne-le-moi !)',
        formula: '[Verbe] - [COD: le / la / les] - [COI: moi / toi / lui / nous / vous / leur] - [y / en]',
        goldenRule: 'In affirmative commands, attach pronouns with **hyphens** after the verb. Stressed pronouns **« moi »** and **« toi »** replace "me" and "te".',
        detailedDescription: [
          'Order in affirmative commands: **Verb - Direct Object - Indirect Object - Y/En**.',
          'Examples: **« Regarde-moi ! »**, **« Donne-le-lui ! »**, **« Parle-nous-en ! »**.',
          'Before *y* and *en*, *moi* and *toi* contract into **m\'y, m\'en, t\'y, t\'en** (e.g. **« Donne-m\'en un peu ! »**).'
        ],
        tables: [
          {
            title: 'Affirmative Command Pronoun Hierarchy',
            subtitle: 'Verb + Hyphen + Direct + Hyphen + Indirect',
            description: 'Hyphens are mandatory between every element.',
            headers: ['Order', 'Pronoun Group', 'Examples', 'Sample Command'],
            rows: [
              ['1. Verb', 'Imperative verb form', 'Donne, Montre, Dis', 'Donne...'],
              ['2. Direct (COD)', 'le, la, les', '-le, -la, -les', 'Donne-le...'],
              ['3. Indirect (COI)', 'moi, toi, lui, nous, vous, leur', '-moi, -lui, -leur', 'Donne-le-moi !'],
              ['4. Adverbial', 'y, en', '-y, -en', 'Mène-nous-y ! / Donne-m\'en !']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Montre-la-moi tout de suite !',
            english: 'Show it to me right away!',
            aspectNote: 'Verb (Montre) + COD (la) + COI (moi) connected with hyphens.'
          },
          {
            french: 'Vas-y, n\'hésite plus !',
            english: 'Go ahead, don\'t hesitate anymore!',
            aspectNote: 'S restored on "vas-y" for phonetic liaison.'
          }
        ]
      },
      {
        id: 'topic-23-negative-irregulars',
        title: '3. Negative Imperative & Irregulars (Aie, Sois, Sache)',
        formula: 'Négatif: Ne + [pronoms normaux avant verbe] + [Verbe] + pas  |  Irréguliers: Être (sois), Avoir (aie), Savoir (sache)',
        goldenRule: 'In negative commands, **hyphens disappear**, pronouns return to their standard position **before the verb**, and "moi/toi" revert to **« me/te »** (e.g. **« Ne me le donne pas ! »**).',
        detailedDescription: [
          'Compare: **« Donne-le-moi ! »** (affirmative) versus **« Ne me le donne pas ! »** (negative).',
          'Only three verbs have irregular imperative stems (derived from the subjunctive):',
          '**Avoir**: aie, ayons, ayez ; **Être**: sois, soyons, soyez ; **Savoir**: sache, sachons, sachez.'
        ],
        tables: [
          {
            title: 'Irregular Imperative Conjugations',
            subtitle: 'Être, Avoir, Savoir',
            description: 'Derived from the subjunctive mood.',
            headers: ['Infinitive', 'Tu', 'Nous', 'Vous'],
            rows: [
              ['Être (to be)', 'Sois patient !', 'Soyons calmes !', 'Soyez les bienvenus !'],
              ['Avoir (to have)', 'Aie du courage !', 'Ayons confiance !', 'Ayez l\'amabilité de...'],
              ['Savoir (to know)', 'Sache que...', 'Sachons apprécier...', 'Sachez que vous avez réussi !'],
              ['Vouloir (polite)', 'Veuille', 'Voulons', 'Veuillez agréer...']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Ne me regarde pas comme ça.',
            english: 'Do not look at me like that.',
            aspectNote: 'Negative command: pronoun "me" precedes the verb without hyphens.'
          },
          {
            french: 'Soyez prudents sur la route du retour !',
            english: 'Be prudent on the road back!',
            aspectNote: 'Irregular imperative of être for "vous" (soyez).'
          }
        ]
      }
    ],
    rules: [
      'Affirmative imperative: Verb + Hyphen + Pronoun (Regarde-moi ! Écoutez-nous ! Vas-y ! Parles-en !).',
      'Negative imperative: Standard order with "ne" + Pronoun + Verb + "pas" (Ne me regarde pas ! N\'y va pas ! Ne lui parle pas !).',
      'Double pronoun hierarchy in affirmative commands: Verb + Direct (le/la/les) + Indirect (moi/toi/lui/nous/vous/leur) + Y/En (e.g. "Explique-le-moi !", "Donne-lui-en !").',
      'Irregular imperatives: Avoir (aie, ayons, ayez), Être (sois, soyons, soyez), Savoir (sache, sachons, sachez).',
    ],
    contrastExamples: [
      {
        french: 'Montre-la-moi tout de suite !',
        english: 'Show it to me right away!',
        aspectNote: 'Affirmative command: Verb + COD (la) + COI (moi) connected with hyphens.',
      },
      {
        french: 'Ne me la montre pas maintenant.',
        english: 'Do not show it to me now.',
        aspectNote: 'Negative command: Standard pre-verbal order (me la) with no hyphens.',
      },
    ],
    commonTraps: [
      'Writing "Donne-me" instead of "Donne-moi".',
      'Keeping hyphens in negative commands (e.g. "Ne donne-moi pas" is wrong; say "Ne me donne pas").',
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
    detailedDescription: [
      'Pronouns streamline conversation by avoiding repetitious nouns. French possesses distinct pronoun sets for direct objects (COD), indirect objects of people (COI), places/prepositional concepts (Y), and partitive/quantified nouns (En).',
      'The multi-tier pronoun order before verbs is one of the definitive benchmarks of fluent French.'
    ],
    topics: [
      {
        id: 'topic-26-cod',
        title: '1. Direct Object Pronouns (COD: Me, Te, Le, La, Les)',
        formula: '[Sujet] + [me / te / le / la / l\' / nous / vous / les] + [Verbe]',
        goldenRule: 'Direct object pronouns replace people or objects that receive the action **directly without any preposition** (e.g. regarder quelqu\'un, aimer une chose).',
        detailedDescription: [
          'Choose the COD pronoun based on gender and number: **le** (masculine singular), **la** (feminine singular), **les** (plural).',
          'Before a vowel or silent h, *le* and *la* elide to **l\'**: **« Je l\'aime »**, **« Il l\'écoute »**.',
          'In compound tenses, remember the past participle agrees with a preceding COD (**« Je les ai vus »**).'
        ],
        tables: [
          {
            title: 'Direct Object Pronouns (COD) Reference',
            subtitle: 'Forms and replacements',
            description: 'Used when the verb has no preposition before the object.',
            headers: ['Person / Gender', 'Pronoun Form', 'Before Vowel', 'Sample Replacement'],
            rows: [
              ['1st Sing. (Me)', 'me', "m'", 'Il me voit / Il m\'appelle'],
              ['2nd Sing. (You)', 'te', "t'", 'Je te regarde / Je t\'écoute'],
              ['3rd Sing. Masc. (Him/It)', 'le', "l'", 'Je connais Paul → Je le connais'],
              ['3rd Sing. Fem. (Her/It)', 'la', "l'", 'Je lis la lettre → Je la lis'],
              ['1st Plur. (Us)', 'nous', 'nous', 'Elle nous invite'],
              ['2nd Plur. (You)', 'vous', 'vous', 'Je vous entends'],
              ['3rd Plur. (Them)', 'les', 'les (liaison /z/)', 'J\'achète les livres → Je les achète']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Tu regardes ce film ? → Oui, je le regarde.',
            english: 'Are you watching this movie? → Yes, I am watching it.',
            aspectNote: 'Masculine singular COD replacement with "le".'
          },
          {
            french: 'Ces fleurs sont magnifiques, je les achète.',
            english: 'These flowers are gorgeous, I am buying them.',
            aspectNote: 'Plural COD replacement with "les".'
          }
        ]
      },
      {
        id: 'topic-26-coi',
        title: '2. Indirect Object Pronouns (COI: Lui, Leur)',
        formula: '[Sujet] + [me / te / lui / nous / vous / leur] + [Verbe régissant "à quelqu\'un"]',
        goldenRule: 'Indirect object pronouns replace **« à + une personne »** (parler à, téléphoner à, donner à). Use **« lui »** for both singular genders (him and her) and **« leur »** for plural (them).',
        detailedDescription: [
          'Notice that in the third person, French does NOT distinguish gender for indirect objects: **lui** means both "to him" and "to her"!',
          '**« Je parle à mon père »** → **« Je lui parle »** ; **« Je parle à ma mère »** → **« Je lui parle »**.',
          'Plural: **« J\'écris à mes parents »** → **« Je leur écris »** (notice: "leur" as a pronoun never takes an -s).'
        ],
        tables: [
          {
            title: 'Indirect Object Pronouns (COI)',
            subtitle: 'Replacing "à + Person"',
            description: 'Used strictly with verbs of communication and giving governing "à".',
            headers: ['Person', 'COI Form', 'Replaces', 'Example'],
            rows: [
              ['3rd Sing. Masc.', 'lui', 'à Pierre, à mon frère', 'Je lui téléphone'],
              ['3rd Sing. Fem.', 'lui', 'à Marie, à ma sœur', 'Je lui donne la clé'],
              ['3rd Plural', 'leur', 'à mes amis, aux élèves', 'Je leur réponds'],
              ['1st / 2nd Person', 'me, te, nous, vous', 'à moi, à toi, à nous, à vous', 'Il me parle / Nous vous répondons']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Je téléphone à Sophie. → Je lui téléphone.',
            english: 'I phone Sophie. → I phone her.',
            aspectNote: 'COI replaces "à Sophie" with singular pronoun "lui".'
          },
          {
            french: 'Le professeur a expliqué la règle aux élèves. → Il leur a expliqué la règle.',
            english: 'The teacher explained the rule to the students. → He explained the rule to them.',
            aspectNote: 'COI replaces plural "aux élèves" with "leur".'
          }
        ]
      },
      {
        id: 'topic-26-y-en',
        title: '3. Adverbial Pronouns (Y & En)',
        formula: 'Y = remplace [à / en / dans / sur / sous + Lieu] OU [à + Chose / Concept]  |  En = remplace [de + Chose] OU [du / de la / des / quantité + Nom]',
        goldenRule: 'Use **« Y »** for places (*there*) and concepts with **à**. Use **« En »** for partitives (*some/any*), quantities, and phrases with **de**.',
        detailedDescription: [
          '**Y**: **« Tu vas à Paris ? »** → **« Oui, j\'y vais »** (I am going there). **« Tu penses à ton avenir ? »** → **« J\'y pense »** (I am thinking about it).',
          '**En**: **« Tu as des enfants ? »** → **« Oui, j\'en ai deux »** (quantity retained at the end). **« Tu manges du pain ? »** → **« J\'en mange »** (I eat some).',
          'Trap warning: If the verb governs *de + person*, use a tonic pronoun (**« Je parle de Paul »** → **« Je parle de lui »**, not "j\'en parle").'
        ],
        tables: [
          {
            title: 'Y vs. En Comparison Matrix',
            subtitle: 'Prepositional triggers and meanings',
            description: 'Check whether the underlying trigger is "à" or "de/quantity".',
            headers: ['Pronoun', 'Triggers', 'What It Replaces', 'Sample Translation'],
            rows: [
              ['Y (Place)', 'à, dans, en, sur, chez', 'Location / Destination', 'Je vais chez Paul → J\'y vais'],
              ['Y (Idea)', 'penser à, croire à, réfléchir à', 'Concept / Object with "à"', 'Je réfléchis à ce projet → J\'y réfléchis'],
              ['En (Partitive)', 'du, de la, de l\', des', 'Unquantified amount', 'Tu bois du thé ? → J\'en bois'],
              ['En (Quantity)', 'un, deux, beaucoup de, peu de', 'Counted nouns (retain number)', 'J\'ai trois stylos → J\'en ai trois'],
              ['En (De-phrase)', 'parler de, se souvenir de', 'Thing/Concept with "de"', 'Tu te souviens du voyage ? → Je m\'en souviens']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Tu vas au supermarché ? → Oui, j\'y vais tout de suite.',
            english: 'Are you going to the supermarket? → Yes, I am going there right away.',
            aspectNote: 'Pronoun "y" replaces location introduced by "au".'
          },
          {
            french: 'Voulez-vous du café ? → Merci, j\'en ai déjà bu une tasse.',
            english: 'Do you want some coffee? → Thanks, I already drank a cup of it.',
            aspectNote: 'Pronoun "en" replaces partitive noun "du café".'
          }
        ]
      },
      {
        id: 'topic-26-double-order',
        title: '4. Double Pronoun Placement Matrix',
        formula: '[me/te/se/nous/vous] → [le/la/l\'/les] → [lui/leur] → [y] → [en] + [Verbe]',
        goldenRule: 'When two object pronouns occur together, arrange them strictly according to the **Pronoun Train**: First person / Reflexive (me, te, nous, vous) → Direct (le, la, les) → Indirect (lui, leur) → Y → En.',
        detailedDescription: [
          'Mastering the double pronoun train allows you to build sophisticated French sentences with zero hesitation:',
          'Tier 1: **me, te, se, nous, vous**',
          'Tier 2: **le, la, l\', les**',
          'Tier 3: **lui, leur**',
          'Tier 4: **y**',
          'Tier 5: **en**',
          'Examples: **« Il me le donne »** (Tier 1 + 2), **« Je le lui prête »** (Tier 2 + 3), **« Il y en a »** (Tier 4 + 5).'
        ],
        tables: [
          {
            title: 'The Pre-Verbal Pronoun Order Matrix',
            subtitle: 'Follow the arrows from left to right',
            description: 'Only pronouns from different tiers can be combined.',
            headers: ['Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5', 'Followed by:'],
            rows: [
              ['me, te, se, nous, vous', 'le, la, l\', les', 'lui, leur', 'y', 'en', 'Conjugated Verb / Auxiliary'],
              ['Il me...', '...le...', '—', '—', '—', '...donne (Il me le donne)'],
              ['Je...', '...le...', '...lui...', '—', '—', '...prête (Je le lui prête)'],
              ['Elle...', '—', '—', '...y...', '...en...', '...a trouvé (Elle y en a trouvé)']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Je donne le livre à Paul. → Je le lui donne.',
            english: 'I give the book to Paul. → I give it to him.',
            aspectNote: 'Double pronoun order: COD (le) comes before COI (lui).'
          },
          {
            french: 'Marie prête sa voiture à ses amis. → Marie la leur prête.',
            english: 'Marie lends her car to her friends. → Marie lends it to them.',
            aspectNote: 'COD (la) precedes COI (leur).'
          }
        ]
      }
    ],
    rules: [
      'Direct Object Pronouns (COD): me, te, le, la, l\', nous, vous, les (replaces nouns directly governed by the verb with no preposition).',
      'Indirect Object Pronouns (COI): me, te, lui, nous, vous, leur (replaces "à + person").',
      'Adverbial Pronoun "Y": Replaces "à/en/dans/sur + place" or "à + concept/thing" (e.g. "Je vais à Paris" → "J\'y vais").',
      'Adverbial Pronoun "En": Replaces "de + noun", quantities, or partitive articles (e.g. "Je mange du pain" → "J\'en mange").',
      'Tonic Pronouns (moi, toi, lui, elle, nous, vous, eux, elles): Used after prepositions (avec lui, pour elle), for emphasis (Moi, je pense...), or comparisons (plus grand que moi).',
    ],
    contrastExamples: [
      {
        french: 'Je donne le livre à Paul. → Je le lui donne.',
        english: 'I give the book to Paul. → I give it to him.',
        aspectNote: 'Double pronoun order: COD (le) comes before COI (lui).',
      },
      {
        french: 'Tu as parlé de ton voyage ? → Oui, j\'en ai parlé.',
        english: 'Did you talk about your trip? → Yes, I talked about it.',
        aspectNote: 'Pronoun "en" replaces prepositional phrase introduced by "de" (de ton voyage).',
      },
      {
        french: 'Elle va à la bibliothèque ? → Oui, elle y va.',
        english: 'Is she going to the library? → Yes, she is going there.',
        aspectNote: 'Pronoun "y" replaces preposition of location (à la bibliothèque).',
      },
    ],
    commonTraps: [
      'Using "lui" for things instead of "y" (e.g. "Je pense à ce problème" → "J\'y pense", not "Je lui pense").',
      'Saying "Je leur" for direct objects instead of "les" ("Je les vois", not "Je leur vois").',
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
    detailedDescription: [
      'Adverbs modify verbs, adjectives, or entire clauses. Most manner adverbs in French are systematically derived from descriptive adjectives using the suffix **-ment**.',
      'Understanding the formation exceptions (-amment / -emment) and placement rules ensures rhythmic, natural phrasing.'
    ],
    topics: [
      {
        id: 'topic-29-standard-formation',
        title: '1. Standard Formation of Adverbs (-ment)',
        formula: 'Adjectif Masculin → Féminin singulier + [-ment]  (e.g. heureux → heureuse → heureusement)',
        goldenRule: 'Find the **feminine singular** form of the adjective and attach the suffix **« -ment »**. If the masculine adjective already ends in a vowel, add **-ment** directly to the masculine.',
        detailedDescription: [
          'Regular derivation step: *doux* → feminine *douce* → **doucement** ; *complet* → feminine *complète* → **complètement**.',
          'Vowel exception: If the masculine adjective ends in a vowel (*vrai, poli, absolu*), do not make it feminine; add *-ment* straight to the masculine: **vraiment**, **poliment**, **absolument**.'
        ],
        tables: [
          {
            title: 'Adverb Formation Patterns',
            subtitle: 'Feminine stem rule vs. Vowel ending rule',
            description: 'Notice how the feminine consonant is preserved before "-ment".',
            headers: ['Masculine Adjective', 'Feminine Form', 'Adverb in -ment', 'English Meaning'],
            rows: [
              ['Lent', 'lente', 'lentement', 'slowly'],
              ['Heureux', 'heureuse', 'heureusement', 'happily / fortunately'],
              ['Franc', 'franche', 'franchement', 'frankly'],
              ['Vrai (ends in vowel)', 'vraie', 'vraiment (from masc.)', 'truly / really'],
              ['Poli (ends in vowel)', 'polie', 'poliment (from masc.)', 'politely'],
              ['Absolu (ends in vowel)', 'absolue', 'absolument (from masc.)', 'absolutely']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Elle s\'est exprimée très clairement et franchement.',
            english: 'She expressed herself very clearly and frankly.',
            aspectNote: 'Clear: claire → clairement ; Franc: franche → franchement.'
          },
          {
            french: 'Je suis absolument ravi de vous rencontrer.',
            english: 'I am absolutely delighted to meet you.',
            aspectNote: 'Vowel ending (absolu) taking -ment directly.'
          }
        ]
      },
      {
        id: 'topic-29-special-endings',
        title: '2. Special Endings (-amment, -emment) & Irregular Adverbs',
        formula: '-ant → [-amment] (courant → couramment)  |  -ent → [-emment] (patient → patiemment)  |  bon → bien  |  mauvais → mal',
        goldenRule: 'Adjectives ending in **-ant** produce adverbs in **« -amment »**. Adjectives ending in **-ent** produce adverbs in **« -emment »**. Both endings are pronounced identically as **/amɑ̃/**!',
        detailedDescription: [
          'Do not spell *patientement*! The rule produces **patiemment** and **évidemment**.',
          'Irregular pillars: **bon** (adjective modifying noun: *un bon gâteau*) becomes **bien** (adverb modifying verb: *il cuisine bien*).',
          'Similarly, **mauvais** (adjective) becomes **mal** (adverb), and **meilleur** (better adjective) becomes **mieux** (better adverb).'
        ],
        tables: [
          {
            title: '-amment / -emment and Irregular Equivalents',
            subtitle: 'Spelling rules and phonetic reality (/amɑ̃/)',
            description: 'Pay close attention to double "m" spelling.',
            headers: ['Adjective', 'Ending Rule', 'Adverb Form', 'Phonetic Pronunciation'],
            rows: [
              ['Courant', '-ant → -amment', 'couramment', '/ku.ʁa.mɑ̃/ (fluently)'],
              ['Constant', '-ant → -amment', 'constamment', '/kɔ̃s.ta.mɑ̃/ (constantly)'],
              ['Patient', '-ent → -emment', 'patiemment', '/pa.sja.mɑ̃/ (patiently)'],
              ['Évident', '-ent → -emment', 'évidemment', '/e.vi.da.mɑ̃/ (obviously)'],
              ['Bon (adj.)', 'Irregular', 'bien (adv.)', 'well'],
              ['Mauvais (adj.)', 'Irregular', 'mal (adv.)', 'badly']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Il conduit prudemment et parle couramment français.',
            english: 'He drives prudently and speaks French fluently.',
            aspectNote: 'Prudent → prudemment (-emment) ; Courant → couramment (-amment).'
          },
          {
            french: 'Ce pianiste joue très bien, c\'est un bon musicien.',
            english: 'This pianist plays very well (adverb bien), he is a good musician (adjective bon).',
            aspectNote: 'Distinction between adverb "bien" and adjective "bon".'
          }
        ]
      },
      {
        id: 'topic-29-placement',
        title: '3. Placement of Adverbs in Simple & Compound Tenses',
        formula: 'Temps simples: [Sujet] + [Verbe] + [Adverbe]  |  Temps composés: [Sujet] + [Auxiliaire] + [Adverbe court] + [Participe]',
        goldenRule: 'Never place an adverb between the subject and the verb in French (never say "Je souvent vais"). In compound tenses (*passé composé*), short common adverbs (**bien, mal, toujours, souvent, déjà, beaucoup**) sit **BETWEEN the auxiliary and the participle**.',
        detailedDescription: [
          'In simple tenses (présent, imparfait, futur simple), the adverb sits immediately after the conjugated verb: **« Il parle souvent de toi »**, **« Nous dormons bien »**.',
          'In compound tenses, short adverbs wedge in the middle: **« J\'ai bien dormi »**, **« Elle a déjà fini »**, **« Nous avons beaucoup ri »**.',
          'Long adverbs ending in *-ment* or indicating time/place (*hier, demain, là-bas*) sit after the participle or at the beginning/end of the sentence.'
        ],
        tables: [
          {
            title: 'Adverb Placement Guide across Tenses',
            subtitle: 'Where to put short vs. long adverbs',
            description: 'Positioning varies between simple and compound tenses.',
            headers: ['Tense Type', 'Adverb Category', 'Rule', 'Example Sentence'],
            rows: [
              ['Simple Tense', 'Any adverb', 'Immediately after verb', 'Il conduit toujours prudemment.'],
              ['Compound Tense', 'Short (bien, déjà, trop, peu)', 'Between auxiliary & participle', 'J\'ai déjà vu ce film.'],
              ['Compound Tense', 'Quantity (beaucoup, assez)', 'Between auxiliary & participle', 'Nous avons beaucoup travaillé.'],
              ['Compound Tense', 'Long in -ment (lentement)', 'After past participle', 'Il a conduit prudemment.'],
              ['Temporal Markers', 'Hier, Demain, Aujourd\'hui', 'Beginning or end of sentence', 'Hier, nous sommes sortis.']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Elle a toujours bien compris nos explications.',
            english: 'She has always understood our explanations well.',
            aspectNote: 'Short adverbs (toujours, bien) placed between auxiliary "a" and participle "compris".'
          },
          {
            french: 'Il a répondu poliment à toutes les questions.',
            english: 'He answered all questions politely.',
            aspectNote: 'Long adverb ending in -ment (poliment) positioned after the past participle (répondu).'
          }
        ]
      }
    ],
    rules: [
      'General rule: Masculine adjective → Feminine form + -ment (facile → facilement, heureux → heureuse → heureusement, doux → douce → doucement).',
      'If the masculine adjective already ends in a vowel, add -ment directly: vrai → vraiment, absolu → absolument, poli → poliment.',
      'Adjectives ending in -ant become -amment (constant → constamment; pronounced /amɑ̃/). Adjectives ending in -ent become -emment (évident → évidemment; pronounced /emɑ̃/).',
      'Irregular common adverbs: bon (adj) → bien (adv), mauvais (adj) → mal (adv), meilleur (adj) → mieux (adv).',
    ],
    contrastExamples: [
      {
        french: 'Il conduit prudemment et respecte scrupuleusement le code de la route.',
        english: 'He drives prudently and scrupulously respects the highway code.',
        aspectNote: 'Adverb formation: prudent → prudemment ; scrupuleux → scrupuleuse → scrupuleusement.',
      },
      {
        french: 'Elle a toujours bien compris nos explications.',
        english: 'She has always understood our explanations well.',
        aspectNote: 'Short adverbs (toujours, bien) positioned between auxiliary (a) and participle (compris).',
      },
    ],
    commonTraps: [
      'Confusing "bon" (adjective modifying a noun: "un bon repas") and "bien" (adverb modifying a verb: "il cuisine bien").',
      'Writing "patiente-ment" instead of "patiemment" for adjectives ending in -ent.',
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
