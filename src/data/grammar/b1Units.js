export const B1_GRAMMAR_LESSONS = [
  // ==========================================
  // Unit 17: Simple Future & Past Future
  // ==========================================
  {
    id: 'unit-17-simple-future-past-future',
    unitNumber: 17,
    category: 'Future, Conditionals & Modals',
    level: 'B1',
    title: 'Unit 17: The Simple Future and the Past Future (Futur Simple & Futur Antérieur)',
    frenchTitle: 'Unité 17 : Le futur simple et le futur antérieur',
    subtitle: 'Express definitive future projections, plans, promises, and actions completed prior to a future moment.',
    formula: 'Futur Simple = [Infinitif / Radical en -r] + [-ai, -as, -a, -ons, -ez, -ont]  |  Futur Antérieur = [Auxiliaire au futur simple] + [Participe Passé]',
    goldenRule: 'Unlike English (which uses the present after when/as soon as), French **REQUIRES the Future Simple or Futur Antérieur** after temporal conjunctions: **quand**, **lorsque**, **dès que**, **aussitôt que**.',
    detailedDescription: [
      'The **Futur Simple** is used for definitive future plans, forecasts, and formal promises. It contrasts with the conversational *futur proche* (aller + infinitive) by sounding more planned and official.',
      'The **Futur Antérieur** adds temporal depth by establishing that one future action will be completed before another future action begins.'
    ],
    topics: [
      {
        id: 'topic-17-futur-simple',
        title: '1. Le Futur Simple (Regular & Irregular Stems)',
        formula: '[Infinitif en -er/-ir ou base en -r] + [-ai, -as, -a, -ons, -ez, -ont]',
        goldenRule: 'Regular verbs use their **entire infinitive** as the future stem (parler-ai, finir-ai; drop final -e for -re: vendr-ai). Irregular verbs change the stem but keep the exact same endings.',
        detailedDescription: [
          'The endings for the **Futur Simple** are identical for all French verbs without exception: **-ai, -as, -a, -ons, -ez, -ont**. Notice these match the present tense of **avoir**.',
          'Key irregular stems must be memorized: **être (ser-)**, **avoir (aur-)**, **aller (ir-)**, **faire (fer-)**, **pouvoir (pourr-)**, **devoir (devr-)**, and **venir (viendr-)**.'
        ],
        tables: [
          {
            title: 'Futur Simple Conjugation Patterns',
            subtitle: 'Regular -er, -ir, -re verbs and key irregular stems',
            description: 'Note that all future forms feature the characteristic "r" sound before the ending.',
            headers: ['Pronoun', 'Parler (Reg. -er)', 'Finir (Reg. -ir)', 'Être (ser-)', 'Avoir (aur-)'],
            rows: [
              ['Je', 'parlerai', 'finirai', 'serai', 'aurai'],
              ['Tu', 'parleras', 'finiras', 'seras', 'auras'],
              ['Il / Elle', 'parlera', 'finira', 'sera', 'aura'],
              ['Nous', 'parlerons', 'finirons', 'serons', 'aurons'],
              ['Vous', 'parlerez', 'finirez', 'serez', 'aurez'],
              ['Ils / Elles', 'parleront', 'finiront', 'seront', 'auront']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Demain, nous visiterons le Musée d\'Orsay.',
            english: 'Tomorrow, we will visit the Musée d\'Orsay.',
            aspectNote: 'Planned future action with regular verb "visiter".'
          },
          {
            french: 'Je ferai tout mon possible pour vous aider.',
            english: 'I will do everything possible to help you.',
            aspectNote: 'Irregular future stem (faire → ferai).'
          }
        ]
      },
      {
        id: 'topic-17-futur-anterieur',
        title: '2. Le Futur Antérieur (Past in the Future)',
        formula: 'Futur Antérieur = [Avoir ou Être au futur simple] + [Participe Passé]',
        goldenRule: 'The **Futur Antérieur** expresses a future action that will be completed **prior to another future event** or deadline.',
        detailedDescription: [
          'Just as the *passé composé* couples present auxiliaries with participles, the **futur antérieur** couples future auxiliaries (**aurai / serai**) with past participles.',
          'It is frequently used with expressions of deadline like **« d\'ici demain »** (by tomorrow) or **« avant ce soir »** (before this evening).'
        ],
        tables: [
          {
            title: 'Futur Antérieur Conjugation',
            subtitle: 'With Avoir and Être auxiliaries',
            description: 'Verbs using être agree in gender and number with the subject.',
            headers: ['Pronoun', 'Finir (Auxiliaire Avoir)', 'Partir (Auxiliaire Être)'],
            rows: [
              ['J\' / Je', "j'aurai fini", 'je serai parti(e)'],
              ['Tu', 'tu auras fini', 'tu seras parti(e)'],
              ['Il / Elle', 'il aura fini', 'elle sera partie'],
              ['Nous', 'nous aurons fini', 'nous serons parti(e)s'],
              ['Vous', 'vous aurez fini', 'vous serez parti(e)(s)'],
              ['Ils / Elles', 'ils auront fini', 'elles seront parties']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'D\'ici vendredi, j\'aurai rédigé tout le rapport.',
            english: 'By Friday, I will have written the entire report.',
            aspectNote: 'Completed action prior to a specified future deadline.'
          },
          {
            french: 'Quand tu te réveilleras, le train sera déjà arrivé.',
            english: 'When you wake up, the train will have already arrived.',
            aspectNote: 'Anterior action (sera arrivé) before another future action (te réveilleras).'
          }
        ]
      },
      {
        id: 'topic-17-temporal-clauses',
        title: '3. Temporal Conjunctions (Quand, Dès que, Aussitôt que)',
        formula: '[Quand / Lorsque / Dès que / Aussitôt que] + [Futur Simple / Antérieur] → [Futur Simple]',
        goldenRule: 'French requires the **future tense** after temporal conjunctions whenever referring to the future, whereas English incorrectly uses the present tense.',
        detailedDescription: [
          'A classic mistake for English speakers: in English, we say *"When I arrive, I will call you"* (present "arrive"). In French, this is strictly forbidden! You must say: **« Quand j\'arriverai, je t\'appellerai »**.',
          'If the temporal action is completed before the main clause, use the **futur antérieur**: **« Dès que j\'aurai fini, nous partirons »**.'
        ],
        tables: [
          {
            title: 'Temporal Conjunctions in Future Contexts',
            subtitle: 'Conjunction, French formula, and English translation comparison',
            description: 'Both clauses must be in a future tense in French.',
            headers: ['Conjunction', 'French Sentence', 'English Translation', 'Tense Combination'],
            rows: [
              ['Quand (When)', 'Quand il arrivera, nous dînerons.', 'When he arrives, we will dine.', 'Futur simple + Futur simple'],
              ['Dès que (As soon as)', 'Dès que j\'aurai reçu le colis, je te préviendrai.', 'As soon as I receive the package, I will let you know.', 'Futur antérieur + Futur simple'],
              ['Lorsque (When formal)', 'Lorsque vous serez prêts, prévenez-moi.', 'When you are ready, let me know.', 'Futur simple + Impératif'],
              ['Aussitôt que (As soon as)', 'Aussitôt qu\'elle aura terminé, elle partira.', 'As soon as she finishes, she will leave.', 'Futur antérieur + Futur simple']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Quand j\'arriverai à Paris, je t\'enverrai un message.',
            english: 'When I arrive in Paris, I will send you a message.',
            aspectNote: 'French uses Futur Simple (arriverai) where English uses present (arrive).'
          },
          {
            french: 'Dès que nous aurons fini les valises, nous prendrons la route.',
            english: 'As soon as we finish packing the bags, we will hit the road.',
            aspectNote: 'Dès que + Futur Antérieur for the prior completed action.'
          }
        ]
      }
    ],
    rules: [
      'Regular verbs use the entire infinitive as the stem (parler-ai, finir-ai; drop -e for -re: vendr-ai).',
      'Key irregular future stems: être (ser-), avoir (aur-), aller (ir-), faire (fer-), voir (verr-), pouvoir (pourr-), devoir (devr-), venir (viendr-), vouloir (voudr-).',
      'The Futur Antérieur expresses an action that will be completed before another future action: "Dès que j\'aurai fini, je t\'appellerai".',
      'Temporal clause rule: "Quand tu arriveras, nous mangerons" (When you arrive [will arrive], we will eat).',
    ],
    contrastExamples: [
      {
        french: 'Quand j\'arriverai à Paris, je t\'enverrai un message.',
        english: 'When I arrive in Paris, I will send you a message.',
        aspectNote: 'French uses Futur Simple (arriverai) after "Quand", whereas English uses the present.',
      },
      {
        french: 'Aussitôt qu\'elle aura terminé ses études, elle voyagera.',
        english: 'As soon as she has finished her studies, she will travel.',
        aspectNote: 'Futur Antérieur (aura terminé) showing future anteriority before "voyagera".',
      },
    ],
    commonTraps: [
      'Using the present tense after "quand" or "dès que" when referring to future events (English interference).',
      'Confusing the future endings (-ai, -as, -a) with conditional endings (-ais, -ais, -ait).',
    ],
    practiceExercises: [
      {
        id: 'ex-u17-1',
        type: 'multiple-choice',
        prompt: 'Choose the correct form: "Dès que nous _____ (recevoir) les résultats, nous vous préviendrons."',
        options: ['aurons reçu', 'recevons', 'avons reçu', 'recevrons'],
        correctAnswer: 'aurons reçu',
        hint: 'Futur Antérieur is required after "dès que" for the prior completed action.',
        explanation: 'Futur Antérieur indicates the completion of an action before another future action: "aurons reçu".',
      },
      {
        id: 'ex-u17-2',
        type: 'multiple-choice',
        prompt: 'What is the futur simple of "pouvoir" for "je"?',
        options: ['je pourrai', 'je pouvrai', 'je peux', 'je pourrais'],
        correctAnswer: 'je pourrai',
        hint: 'Irregular double-r stem "pourr-". Single "ai" ending distinguishes future from conditional.',
        explanation: 'Futur simple of pouvoir: je pourrai (conditional is je pourrais).',
      },
    ],
  },

  // ==========================================
  // Unit 18: Present & Past Conditional
  // ==========================================
  {
    id: 'unit-18-present-past-conditional',
    unitNumber: 18,
    category: 'Future, Conditionals & Modals',
    level: 'B1',
    title: 'Unit 18: The Present Conditional and Past Conditional',
    frenchTitle: 'Unité 18 : Le conditionnel présent et le conditionnel passé',
    subtitle: 'Express politeness, unconfirmed journalistic news, hypothetical outcomes, and past regrets.',
    formula: 'Conditionnel Présent = [Radical du Futur] + [-ais, -ais, -ait, -ions, -iez, -aient]  |  Conditionnel Passé = [Auxiliaire au conditionnel] + [Participe Passé]',
    goldenRule: 'Master the 3 "Si" systems: **Si + Présent → Futur** ; **Si + Imparfait → Conditionnel Présent** ; **Si + Plus-que-parfait → Conditionnel Passé**. Never put a conditional directly inside the "Si" clause!',
    detailedDescription: [
      'The **Conditionnel** is used for polite requests, advice, hypothetical scenarios, and expressing unconfirmed journalistic information.',
      'It combines the **Future stem** with the **Imparfait endings**, creating one of the most melodic and versatile moods in the French language.'
    ],
    topics: [
      {
        id: 'topic-18-cond-present',
        title: '1. Le Conditionnel Présent (Formation & Politeness)',
        formula: '[Radical du Futur Simple] + [-ais, -ais, -ait, -ions, -iez, -aient]',
        goldenRule: 'To soften requests and commands into **courteous expressions**, use the conditional: **« Je voudrais »**, **« Pourriez-vous »**, **« Tu devrais »**.',
        detailedDescription: [
          'Forming the **Conditionnel Présent** is straightforward: take the exact same stem you use for the *Futur Simple* and attach the endings of the *Imparfait*.',
          'Pronunciation nuance: **« je parlerai »** (future) ends in the closed /e/ sound, whereas **« je parlerais »** (conditional) ends in the open /ɛ/ sound.'
        ],
        tables: [
          {
            title: 'Conditionnel Présent Conjugation (Aimer, Pouvoir, Vouloir)',
            subtitle: 'Future stems + Imparfait endings',
            description: 'Notice the consistent -ais, -ais, -ait, -ions, -iez, -aient endings.',
            headers: ['Pronoun', 'Aimer (aimer-)', 'Pouvoir (pourr-)', 'Vouloir (voudr-)'],
            rows: [
              ['Je', 'j\'aimerais', 'je pourrais', 'je voudrais'],
              ['Tu', 'tu aimerais', 'tu pourrais', 'tu voudrais'],
              ['Il / Elle', 'il aimerait', 'il pourrait', 'il voudrait'],
              ['Nous', 'nous aimerions', 'nous pourrions', 'nous voudrions'],
              ['Vous', 'vous aimeriez', 'vous pourriez', 'vous voudriez'],
              ['Ils / Elles', 'ils aimeraient', 'ils pourraient', 'ils voudraient']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Je voudrais réserver une table pour deux personnes.',
            english: 'I would like to reserve a table for two people.',
            aspectNote: 'Polite request using the conditional of vouloir.'
          },
          {
            french: 'Selon les journaux, le ministre démissionnerait demain.',
            english: 'According to newspapers, the minister would reportedly resign tomorrow.',
            aspectNote: 'Journalistic conditional for unverified reports.'
          }
        ]
      },
      {
        id: 'topic-18-cond-passe',
        title: '2. Le Conditionnel Passé (Past Regrets & Missed Chances)',
        formula: 'Conditionnel Passé = [Avoir ou Être au conditionnel présent] + [Participe Passé]',
        goldenRule: 'The **Conditionnel Passé** expresses actions that *would have happened* if circumstances were different, commonly used for **remorse, regret, and reproaches**.',
        detailedDescription: [
          'Form the conditionnel passé with the auxiliary verb (**aurais / serais**) followed by the past participle.',
          'It is frequently used with verbs like **devoir** (**« Tu aurais dû m\'appeler »** = You should have called me) and **pouvoir** (**« J\'aurais pu t\'aider »** = I could have helped you).'
        ],
        tables: [
          {
            title: 'Conditionnel Passé Forms',
            subtitle: 'With Avoir and Être auxiliaries',
            description: 'Verbs using être agree in gender and number with the subject.',
            headers: ['Pronoun', 'Venir (Être)', 'Faire (Avoir)'],
            rows: [
              ['Je', 'je serais venu(e)', 'j\'aurais fait'],
              ['Tu', 'tu serais venu(e)', 'tu aurais fait'],
              ['Il / Elle', 'il serait venu / elle serait venue', 'elle aurait fait'],
              ['Nous', 'nous serions venu(e)s', 'nous aurions fait'],
              ['Vous', 'vous seriez venu(e)(s)', 'vous auriez fait'],
              ['Ils / Elles', 'ils seraient venus / elles seraient venues', 'ils auraient fait']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'J\'aurais aimé visiter le Louvre, mais il était fermé.',
            english: 'I would have liked to visit the Louvre, but it was closed.',
            aspectNote: 'Past regret / unfulfilled desire (j\'aurais aimé).'
          },
          {
            french: 'Sans ton aide, nous serions arrivés trop tard.',
            english: 'Without your help, we would have arrived too late.',
            aspectNote: 'Hypothetical past outcome with être (serions arrivés).'
          }
        ]
      },
      {
        id: 'topic-18-si-systems',
        title: '3. The 3 "Si" Hypothetical Systems',
        formula: '1. Si + Présent → Futur  |  2. Si + Imparfait → Cond. Présent  |  3. Si + Plus-que-parfait → Cond. Passé',
        goldenRule: 'Remember the classic French mnemonic: **« Les "si" n\'aiment pas les "-rais" ! »**. You must NEVER place a conditional directly inside a clause introduced by "Si".',
        detailedDescription: [
          'French organizes all hypothetical clauses into **three distinct systems** based on probability and timeline.',
          'System 1 expresses real possibilities; System 2 expresses present hypothetical or contrary-to-fact wishes; System 3 expresses past unalterable counterfactuals.'
        ],
        tables: [
          {
            title: 'The Three "Si" Systems Matrix',
            subtitle: 'Clauses, tenses, and degrees of possibility',
            description: 'Notice that "Si" always governs the indicative tense, while the result clause holds the modal tense.',
            headers: ['System', 'Si Clause (Condition)', 'Main Clause (Result)', 'Example'],
            rows: [
              ['1. Réel (Probable)', 'Si + Présent', 'Futur Simple', 'S\'il fait beau, nous irons à la plage.'],
              ['2. Potentiel (Présent)', 'Si + Imparfait', 'Conditionnel Présent', 'Si j\'avais un million, j\'achèterais un château.'],
              ['3. Irréel du Passé', 'Si + Plus-que-parfait', 'Conditionnel Passé', 'Si tu m\'avais écouté, nous n\'aurions pas eu d\'accident.']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Si j\'avais plus de temps, j\'apprendrais le violon.',
            english: 'If I had more time, I would learn the violin.',
            aspectNote: 'System 2: Si + Imparfait (avais) → Conditionnel Présent (apprendrais).'
          },
          {
            french: 'Si tu m\'avais prévenu, je serais venu plus tôt.',
            english: 'If you had warned me, I would have come earlier.',
            aspectNote: 'System 3: Si + Plus-que-parfait (avais prévenu) → Conditionnel Passé (serais venu).'
          }
        ]
      }
    ],
    rules: [
      'Conditionnel Présent combines the Future stem with Imparfait endings: je parlerais, tu finirais, il voudrait.',
      'Conditionnel Passé expresses past regrets or unfulfilled past conditions: "J\'aurais aimé venir" (I would have liked to come).',
      'Politeness register: "Je voudrais un verre d\'eau", "Pourriez-vous m\'aider ?".',
      'Journalistic hearsay / unconfirmed facts: "L\'avion aurait atterri à Lyon" (The plane reportedly landed in Lyon).',
    ],
    contrastExamples: [
      {
        french: 'Si j\'avais plus de temps, j\'apprendrais le violon.',
        english: 'If I had more time, I would learn the violin.',
        aspectNote: 'Hypothetical present: Si + Imparfait (avais) → Conditionnel Présent (apprendrais).',
      },
      {
        french: 'Si tu m\'avais prévenu, je serais venu plus tôt.',
        english: 'If you had warned me, I would have come earlier.',
        aspectNote: 'Past regret / counterfactual: Si + Plus-que-parfait (avais prévenu) → Conditionnel Passé (serais venu).',
      },
    ],
    commonTraps: [
      'Putting the conditional after "si" (The classic rule: "Les \'si\' n\'aiment pas les \'-rais\'").',
      'Confusing "je parlerai" (future, /e/) with "je parlerais" (conditional, /ɛ/).',
    ],
    practiceExercises: [
      {
        id: 'ex-u18-1',
        type: 'multiple-choice',
        prompt: 'Choose the correct form: "Si nous avions su la vérité, nous _____ (agir) différemment."',
        options: ['aurions agi', 'agissions', 'agirons', 'avions agi'],
        correctAnswer: 'aurions agi',
        hint: 'Si + Plus-que-parfait requires the Conditionnel Passé in the main clause.',
        explanation: 'Hypothetical past condition requires the conditionnel passé: "aurions agi".',
      },
      {
        id: 'ex-u18-2',
        type: 'sentence-builder',
        prompt: 'Build the polite request: "Pourriez-vous me passer le sel ?"',
        words: ['le', 'me', 'passer', 'sel', 'Pourriez-vous', '?'],
        correctAnswer: 'Pourriez-vous me passer le sel ?',
        hint: 'Conditional polite inversion + object pronoun + infinitive + object.',
        explanation: 'Polite request uses conditionnel: Pourriez-vous me passer le sel ?',
      },
    ],
  },

  // ==========================================
  // Unit 19: Could, Should, Would?
  // ==========================================
  {
    id: 'unit-19-could-should-would',
    unitNumber: 19,
    category: 'Future, Conditionals & Modals',
    level: 'B1',
    title: 'Unit 19: Could, Should, Would? (Pouvoir, Devoir, Vouloir Nuances)',
    frenchTitle: 'Unité 19 : Exprimer la possibilité, le devoir et le regret (Pouvoir, Devoir, Vouloir)',
    subtitle: 'Translate nuanced English modal verbs into precise French conditional, past, and compound structures.',
    formula: 'Could = Pourrait  |  Could have = Aurait pu + Infinitif  |  Should = Devrait  |  Should have = Aurait dû + Infinitif  |  Would = Conditionnel / Imparfait',
    goldenRule: '**« Should have »** is ALWAYS rendered by the conditional past of Devoir: **« Tu aurais dû + Infinitif »**. **« Could have »** is ALWAYS rendered by the conditional past of Pouvoir: **« Tu aurais pu + Infinitif »**.',
    detailedDescription: [
      'English modal verbs (could, should, would) are notoriously polysemic. French translates each distinct meaning using specific combinations of **tense, mood, and auxiliary verbs**.',
      'Understanding these equivalents eliminates the literal translation traps that confuse intermediate learners.'
    ],
    topics: [
      {
        id: 'topic-19-could',
        title: '1. Could & Could Have (Pouvoir au Conditionnel)',
        formula: 'Could (ability / polite request) = [Tu pourrais / Vous pourriez] + [Infinitif]  |  Could have (missed ability) = [Aurait pu] + [Infinitif]',
        goldenRule: 'Use **« pourrais »** for present polite requests and possibilities. Use **« aurais pu »** for actions someone was capable of doing in the past but did not do.',
        detailedDescription: [
          'In English, "could" can refer to polite ability ("Could you help me?"), past ability ("When I was young, I could run fast"), or past missed opportunity ("You could have told me!").',
          'French uses: (1) **Conditionnel Présent** for polite ability (**« Pourriez-vous m\'aider ? »**), (2) **Imparfait** for ongoing past ability (**« Je pouvais courir vite »**), and (3) **Conditionnel Passé** for missed opportunity (**« Tu aurais pu me le dire ! »**).'
        ],
        tables: [
          {
            title: 'Translating "Could" into French',
            subtitle: 'Context, French construction, and sample translations',
            description: 'Choose the French tense that matches the functional intent of "could".',
            headers: ['English Context', 'French Form', 'Example', 'Meaning'],
            rows: [
              ['Polite request', 'Pourriez-vous + Inf.', 'Pourriez-vous répéter ?', 'Could you repeat?'],
              ['Present possibility', 'Tu pourrais + Inf.', 'Tu pourrais essayer ce plat.', 'You could try this dish.'],
              ['Past missed chance', 'Aurait pu + Inf.', 'Nous aurions pu gagner.', 'We could have won.'],
              ['Past continuous ability', 'Pouvait (Imparfait)', 'À 6 ans, il pouvait nager.', 'At 6, he could swim.']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Tu pourrais m\'aider à porter ces valises ?',
            english: 'Could you help me carry these suitcases?',
            aspectNote: 'Present polite possibility (pourrais).'
          },
          {
            french: 'J\'aurais pu t\'accompagner si tu m\'avais prévenu.',
            english: 'I could have accompanied you if you had warned me.',
            aspectNote: 'Past missed opportunity (aurais pu).'
          }
        ]
      },
      {
        id: 'topic-19-should',
        title: '2. Should & Should Have (Devoir au Conditionnel)',
        formula: 'Should (present advice) = [Devrait] + [Infinitif]  |  Should have (past regret / reproach) = [Aurait dû] + [Infinitif]',
        goldenRule: 'To give advice or moral obligation in the present, use **« Tu devrais »**. To express regret or blame about a past omission, strictly use **« Tu aurais dû »**.',
        detailedDescription: [
          'While the present tense **« Tu dois »** conveys a mandatory command ("You must"), the conditional **« Tu devrais »** softens this into polite advice ("You should").',
          'When reprimanding someone for what they failed to do yesterday, French uses the compound past conditional: **« Tu aurais dû étudier ! »** (You should have studied!).'
        ],
        tables: [
          {
            title: 'Devoir Hierarchy of Obligation',
            subtitle: 'From strict obligation to polite advice and past regret',
            description: 'Notice the progression from order to advice to reproach.',
            headers: ['Tense', 'Form', 'English Nuance', 'Sample Sentence'],
            rows: [
              ['Présent (Order)', 'Tu dois', 'You must / have to', 'Tu dois partir maintenant.'],
              ['Conditionnel (Advice)', 'Tu devrais', 'You should / ought to', 'Tu devrais te reposer.'],
              ['Cond. Passé (Reproach)', 'Tu aurais dû', 'You should have', 'Tu aurais dû m\'avertir.'],
              ['Passé Composé (Deduction)', 'Il a dû', 'He must have (deduction)', 'Il a dû oublier son portefeuille.']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Tu devrais consulter un médecin pour cette toux.',
            english: 'You should see a doctor for this cough.',
            aspectNote: 'Present advice (devrais).'
          },
          {
            french: 'Vous auriez dû réserver vos billets à l\'avance.',
            english: 'You should have booked your tickets in advance.',
            aspectNote: 'Past reproach for a missed action (auriez dû réserver).'
          }
        ]
      },
      {
        id: 'topic-19-would',
        title: '3. Would (Conditional Desire vs. Past Habit)',
        formula: 'Polite desire / hypothetical = Conditionnel  |  Past habit / repeated action = Imparfait',
        goldenRule: 'Never translate "would" automatically with the conditional! If "would" describes a **repeated past habit** (e.g. "We would spend summers in Nice"), use the **Imparfait** (**« Nous passions nos étés à Nice »**).',
        detailedDescription: [
          'In English, "would" plays two entirely separate roles: (1) As the conditional auxiliary for hypothetical desires (**« I would like a coffee »** → **« Je voudrais un café »**), and (2) As a marker of past repeated habits (**« Every Sunday my grandfather would bake bread »**).',
          'In French, repeated past habits are the exclusive domain of the **Imparfait**, never the conditional.'
        ],
        tables: [
          {
            title: 'Distinguishing the Two Faces of "Would"',
            subtitle: 'Hypothetical modal vs. past routine',
            description: 'Determine whether "would" indicates a hypothetical outcome or a past repetition.',
            headers: ['English Sentence', 'True Meaning', 'French Tense', 'French Translation'],
            rows: [
              ['I would like to visit Paris.', 'Desire / Politeness', 'Conditionnel', 'Je voudrais visiter Paris.'],
              ['If I were rich, I would buy a boat.', 'Hypothetical result', 'Conditionnel', 'Si j\'étais riche, j\'achèterais un bateau.'],
              ['When I was young, I would read all night.', 'Past habit', 'Imparfait', 'Quand j\'étais jeune, je lisais toute la nuit.'],
              ['She said she would come tomorrow.', 'Future in the past', 'Conditionnel', 'Elle a dit qu\'elle viendrait demain.']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Quand nous étions enfants, nous allions à la mer chaque été.',
            english: 'When we were children, we would go to the seaside every summer.',
            aspectNote: 'Past habit: translated with Imparfait (allions), not conditional.'
          },
          {
            french: 'J\'aimerais tellement faire ce voyage avec toi.',
            english: 'I would love so much to take this trip with you.',
            aspectNote: 'Hypothetical present desire: translated with Conditionnel (aimerais).'
          }
        ]
      }
    ],
    rules: [
      'Could (Polite request / Current possibility): Pourriez-vous / Tu pourrais + Infinitif (e.g. "Tu pourrais m\'aider ?").',
      'Could have (Past missed opportunity): Avoir/Être au conditionnel + pu + Infinitif (e.g. "Tu aurais pu me le dire !").',
      'Should (Moral obligation / Advice): Devoir au conditionnel présent (e.g. "Tu devrais te reposer").',
      'Should have (Past remorse / Blame): Avoir au conditionnel + dû + Infinitif (e.g. "Nous aurions dû partir plus tôt").',
      'Would (Habit in past = Imparfait ; Hypothetical desire = Conditionnel): "He would always read" = "Il lisait toujours" ; "I would like" = "Je voudrais".',
    ],
    contrastExamples: [
      {
        french: 'Tu devrais étudier pour l\'examen demain.',
        english: 'You should study for the exam tomorrow.',
        aspectNote: 'Present advice: conditionnel présent of devoir (devrais).',
      },
      {
        french: 'Tu aurais dû étudier au lieu de sortir hier soir.',
        english: 'You should have studied instead of going out yesterday evening.',
        aspectNote: 'Past regret/blame: conditionnel passé of devoir (aurais dû).',
      },
      {
        french: 'J\'aurais pu t\'accompagner si tu m\'avais prévenu.',
        english: 'I could have accompanied you if you had warned me.',
        aspectNote: 'Past capability: conditionnel passé of pouvoir (aurais pu).',
      },
    ],
    commonTraps: [
      'Translating "He would visit every summer" as a conditional instead of the Imparfait of habit.',
      'Translating "should have" word-for-word instead of "aurais dû".',
    ],
    practiceExercises: [
      {
        id: 'ex-u19-1',
        type: 'multiple-choice',
        prompt: 'How do you say: "You should have called me"?',
        options: ['Tu aurais dû m\'appeler', 'Tu devrais m\'appeler', 'Tu as dû m\'appeler', 'Tu aurais pu m\'appeler'],
        correctAnswer: 'Tu aurais dû m\'appeler',
        hint: 'Should have = Conditionnel passé of devoir (aurais dû).',
        explanation: '"Should have" corresponds to "aurais dû + infinitif".',
      },
      {
        id: 'ex-u19-2',
        type: 'multiple-choice',
        prompt: 'How do you say: "We could have won the match"?',
        options: ['Nous aurions pu gagner le match', 'Nous pourrions gagner le match', 'Nous avons pu gagner le match', 'Nous aurions dû gagner le match'],
        correctAnswer: 'Nous aurions pu gagner le match',
        hint: 'Could have = Conditionnel passé of pouvoir (aurions pu).',
        explanation: '"Could have" corresponds to "aurions pu + infinitif".',
      },
    ],
  },

  // ==========================================
  // Unit 20: Present & Past Subjunctive
  // ==========================================
  {
    id: 'unit-20-present-past-subjunctive',
    unitNumber: 20,
    category: 'Subjunctive & Non-Finite Moods',
    level: 'B1',
    title: 'Unit 20: The Present Subjunctive and Past Subjunctive',
    frenchTitle: 'Unité 20 : Le subjonctif présent et le subjonctif passé (Déclencheurs W.E.I.R.O.)',
    subtitle: 'Master the mood of subjectivity, doubt, will, necessity, emotion, and concessive triggers.',
    formula: 'Subjonctif Présent: [Radical de "ils" au présent] + [-e, -es, -e, -ions, -iez, -ent]  |  Subjonctif Passé = [Être/Avoir au subjonctif] + [Participe Passé]',
    goldenRule: 'The Subjunctive is **NOT a tense, but a MOOD**. It requires three conditions: (1) A triggering expression of Will, Emotion, Impersonal necessity, or Doubt, (2) The subordinating conjunction **« que »**, and (3) **TWO DIFFERENT SUBJECTS**.',
    detailedDescription: [
      'The **Subjunctive** expresses the subjective perception of reality rather than objective facts. While the Indicative affirms truths, the Subjunctive filters events through feelings, hopes, doubts, and necessities.',
      'It is one of the most distinctive hallmarks of intermediate-to-advanced French proficiency.'
    ],
    topics: [
      {
        id: 'topic-20-subj-present',
        title: '1. Le Subjonctif Présent (Formation & Irregular Stems)',
        formula: 'Je/Tu/Il/Ils: [Radical de "ils" au présent] + [-e, -es, -e, -ent]  |  Nous/Vous: [Radical de "nous" au présent] + [-ions, -iez]',
        goldenRule: 'To conjugate the Subjunctive: find the third-person plural (**ils**) present stem for je, tu, il, ils, and the first-person plural (**nous**) present stem for nous, vous.',
        detailedDescription: [
          'Regular verbs combine the *ils* stem with distinctive endings: **que je parle, que tu parles, qu\'il parle, que nous parlions, que vous parliez, qu\'ils parlent**.',
          'Key irregular stems include: **être (sois/soyons)**, **avoir (aie/ayons)**, **faire (fasse)**, **pouvoir (puisse)**, **savoir (sache)**, **aller (aille/allions)**, and **vouloir (veuille/voulions)**.'
        ],
        tables: [
          {
            title: 'Subjunctive Conjugation of Irregular Pillars',
            subtitle: 'Être, Avoir, Faire, Pouvoir',
            description: 'These essential irregular verbs must be mastered thoroughly.',
            headers: ['Pronoun', 'Être', 'Avoir', 'Faire', 'Pouvoir'],
            rows: [
              ['Que je', 'sois', 'aie', 'fasse', 'puisse'],
              ['Que tu', 'sois', 'aies', 'fasses', 'puisses'],
              ['Qu\'il / elle', 'soit', 'ait', 'fasse', 'puisse'],
              ['Que nous', 'soyons', 'ayons', 'fassions', 'puissions'],
              ['Que vous', 'soyez', 'ayez', 'fassiez', 'puissiez'],
              ['Qu\'ils / elles', 'soient', 'aient', 'fassent', 'puissent']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Il faut absolument que tu fasses attention.',
            english: 'You absolutely must pay attention.',
            aspectNote: 'Impersonal necessity (il faut que) triggering the subjunctive (fasses).'
          },
          {
            french: 'Je suis ravi que nous soyons enfin réunis.',
            english: 'I am delighted that we are finally gathered together.',
            aspectNote: 'Emotion (ravi que) triggering subjunctive of être (soyons).'
          }
        ]
      },
      {
        id: 'topic-20-triggers',
        title: '2. W.E.I.R.D.O. Triggers & Conjunctions',
        formula: '[Expression de Volonté / Émotion / Doute / Conjonction] + [que] + [Sujet 2] + [Subjonctif]',
        goldenRule: 'Expressions of **hope (espérer que)** and affirmative **certainty (penser que, croire que)** take the **INDICATIVE**. They switch to the **SUBJUNCTIVE** only when negated or questioned.',
        detailedDescription: [
          'Remember the **W.E.I.R.D.O.** acronym for triggers: **W**ill (vouloir, exiger), **E**motion (avoir peur, être triste), **I**mpersonal necessity (il faut, il est essentiel), **R**elative doubt (douter, il est peu probable), **D**enial (nier), and **O**pinion negated (**je ne pense pas que**).',
          'Key subordinating conjunctions also demand the subjunctive: **bien que** (although), **pour que** (so that), **avant que** (before), and **à condition que** (provided that).'
        ],
        tables: [
          {
            title: 'Trigger vs. Non-Trigger Comparisons',
            subtitle: 'Subjunctive vs. Indicative contexts',
            description: 'Observe how the exact same verb changes mood based on affirmative vs. negative stance.',
            headers: ['Context', 'Expression', 'Required Mood', 'Example'],
            rows: [
              ['Certainty / Belief', 'Je pense que / Je crois que', 'Indicatif', 'Je pense qu\'il vient demain.'],
              ['Doubt / Negation', 'Je ne pense pas que', 'Subjonctif', 'Je ne pense pas qu\'il vienne demain.'],
              ['Hope (Exception)', 'J\'espère que', 'Indicatif (Futur)', 'J\'espère que tout ira bien.'],
              ['Concession', 'Bien que / Quoique', 'Subjonctif', 'Bien qu\'il soit tard, je travaille.'],
              ['Necessity', 'Il est impératif que', 'Subjonctif', 'Il est impératif que nous partions.']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Je pense qu\'il est honnête. / Je doute qu\'il soit honnête.',
            english: 'I think he is honest (Indicative) / I doubt that he is honest (Subjunctive).',
            aspectNote: 'Penser indicates belief (est); douter introduces uncertainty (soit).'
          },
          {
            french: 'Bien qu\'elle ait peu de temps, elle m\'aide toujours.',
            english: 'Although she has little time, she always helps me.',
            aspectNote: 'Concessive conjunction "Bien que" strictly requires subjunctive (ait).'
          }
        ]
      },
      {
        id: 'topic-20-subj-passe',
        title: '3. Le Subjonctif Passé (Past Subjective Anteriority)',
        formula: 'Subjonctif Passé = [Être ou Avoir au subjonctif présent] + [Participe Passé]',
        goldenRule: 'Use the **Subjonctif Passé** when the subjective action occurred **prior** to the main clause verb (e.g. "I am happy that you came").',
        detailedDescription: [
          'Form the subjonctif passé by conjugating the auxiliary in the present subjunctive (**aie, aies, ait, ayons, ayez, aient** or **sois, sois, soit, soyons, soyez, soient**) followed by the past participle.',
          'Agreement rules with être and preceding direct objects apply exactly as in the *passé composé*.'
        ],
        tables: [
          {
            title: 'Subjonctif Passé Conjugation',
            subtitle: 'With Avoir and Être auxiliaries',
            description: 'Expresses completed events filtered through an emotional or subjective main clause.',
            headers: ['Pronoun', 'Finir (Auxiliaire Avoir)', 'Venir (Auxiliaire Être)'],
            rows: [
              ['Que je', 'que j\'aie fini', 'que je sois venu(e)'],
              ['Que tu', 'que tu aies fini', 'que tu sois venu(e)'],
              ['Qu\'il / Elle', 'qu\'il ait fini', 'qu\'elle soit venue'],
              ['Que nous', 'que nous ayons fini', 'que nous soyons venu(e)s'],
              ['Que vous', 'que vous ayez fini', 'que vous soyez venu(e)(s)'],
              ['Qu\'ils / Elles', 'qu\'ils aient fini', 'qu\'elles soient venues']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Je suis soulagé que vous ayez reçu mon courriel à temps.',
            english: 'I am relieved that you received my email on time.',
            aspectNote: 'Emotional relief about a completed past action (ayez reçu).'
          },
          {
            french: 'Le professeur regrette que nous soyons partis si tôt.',
            english: 'The professor regrets that we left so early.',
            aspectNote: 'Past event with auxiliary être (soyons partis).'
          }
        ]
      }
    ],
    rules: [
      'W.E.I.R.D.O. Triggers: Will (vouloir que, exiger que), Emotion (avoir peur que, être triste que), Impersonal (il faut que, il est important que), Relative doubt (douter que, il est peu probable que), Opinions in negative/interrogative (je ne pense pas que).',
      'Subjunctive triggers with Conjunctions: bien que (although), pour que (so that), avant que (before + ne explétif), à condition que (provided that), jusqu\'à ce que (until).',
      'Irregular Subjunctives: Être (sois, sois, soit, soyons, soyez, soient), Avoir (aie, aies, ait, ayons, ayez, aient), Faire (fasse), Aller (aille/allions), Pouvoir (puisse), Savoir (sache), Vouloir (veuille/voulions).',
      'Subjonctif Passé expresses prior completed subjective actions: "Je suis content que tu sois venu", "Il est surpris que nous ayons fini si vite".',
    ],
    contrastExamples: [
      {
        french: 'Je pense qu\'il vient demain. / Je ne pense pas qu\'il vienne demain.',
        english: 'I think he is coming tomorrow (Indicative) / I don\'t think he is coming (Subjunctive).',
        aspectNote: 'Penser in affirmative takes Indicative; in negative it expresses doubt and triggers Subjunctive.',
      },
      {
        french: 'Bien qu\'il soit fatigué, il continue de travailler.',
        english: 'Although he is tired, he continues to work.',
        aspectNote: 'Concessive conjunction "Bien que" strictly requires the subjunctive (soit).',
      },
    ],
    commonTraps: [
      'Using subjunctive after "J\'espère que" (Espérer strictly takes the Indicative/Future, e.g. "J\'espère qu\'il viendra").',
      'Using subjunctive when both clauses have the same subject (use "Infinitive" instead: "Je veux que je parte" is wrong; say "Je veux partir").',
    ],
    practiceExercises: [
      {
        id: 'ex-u20-1',
        type: 'multiple-choice',
        prompt: 'Choose the correct verb form: "Il faut absolument que vous _____ (faire) attention."',
        options: ['fassiez', 'faites', 'faisez', 'ferez'],
        correctAnswer: 'fassiez',
        hint: 'Subjunctive of faire for "vous".',
        explanation: 'Faire in the subjunctive for "vous" is "fassiez".',
      },
      {
        id: 'ex-u20-2',
        type: 'multiple-choice',
        prompt: 'Which phrase does NOT trigger the subjunctive?',
        options: ['J\'espère que tu seras là', 'Il est nécessaire que tu sois là', 'Je crains que tu ne sois là', 'Bien que tu sois là'],
        correctAnswer: 'J\'espère que tu seras là',
        hint: 'Espérer triggers the indicative future, not subjunctive.',
        explanation: 'Espérer que takes the indicative future (seras), unlike expressions of doubt or necessity.',
      },
    ],
  },

  // ==========================================
  // Unit 24: Present Participle & Gerund
  // ==========================================
  {
    id: 'unit-24-present-participle-gerund',
    unitNumber: 24,
    category: 'Subjunctive & Non-Finite Moods',
    level: 'B1',
    title: 'Unit 24: The Present Participle and Gerund (Le participe présent & gérondif)',
    frenchTitle: 'Unité 24 : Le participe présent et le gérondif (En + Participe Présent)',
    subtitle: 'Express simultaneous actions, causality, manner, condition, and adverbial circumstances.',
    formula: 'Participe Présent = [Radical de "nous" au présent] + [-ant] (parlant, finissant)  |  Gérondif = [en] + [Participe Présent] (en parlant, en marchant)',
    goldenRule: 'The Gérondif (**« en + participe présent »**) expresses simultaneity (while doing), means/manner (by doing), or cause (because of doing), and **MUST share the exact same subject** as the main verb.',
    detailedDescription: [
      'The **Present Participle** and the **Gerund (Gérondif)** allow speakers to condense subordinate clauses into fluid, elegant prose.',
      'While English uses "-ing" indiscriminately for gerunds, participles, and continuous tenses, French carefully distinguishes between the verbal participle, the adverbial gerund, and verbal adjectives.'
    ],
    topics: [
      {
        id: 'topic-24-participe-present',
        title: '1. Le Participe Présent & Adjectif Verbal',
        formula: '[Radical de "nous" au présent] + [-ant] (nous chantons → chantant ; nous prenons → prenant)',
        goldenRule: 'The **Participe Présent** is a VERB form and is **always invariable** (e.g. "des femmes parlant fort"). The **Adjectif Verbal** is an ADJECTIVE and **agrees in gender and number** (e.g. "des histoires passionnantes").',
        detailedDescription: [
          'Form the present participle by taking the first-person plural (*nous*) stem of the present tense and replacing *-ons* with **-ant**.',
          'Only three verbs have irregular participles: **être → étant**, **avoir → ayant**, and **savoir → sachant**.',
          'When acting as a verb, it often replaces a relative clause with *qui* (**« Un homme portant un chapeau »** = Un homme qui porte un chapeau).'
        ],
        tables: [
          {
            title: 'Participle vs. Verbal Adjective Distinction',
            subtitle: 'Invariable verbal action vs. variable descriptive adjective',
            description: 'Observe differences in spelling and grammatical agreement.',
            headers: ['Type', 'Function', 'Agreement', 'Example'],
            rows: [
              ['Participe Présent', 'Verbal action (has complement)', 'Invariable', 'Des enfants obéissant à leurs parents.'],
              ['Adjectif Verbal', 'Descriptive quality', 'Agrees (+e, +s)', 'Des enfants obéissants.'],
              ['Spelling variation', 'Différant (participle)', 'Différent(e)(s) (adjective)', 'Une idée différant de la mienne / Des idées différentes.'],
              ['Irregular: Être / Avoir', 'Étant / Ayant', 'Invariable', 'Étant fatiguée, elle s\'est couchée.']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Les passagers ayant un billet de première classe peuvent monter.',
            english: 'Passengers having a first-class ticket may board.',
            aspectNote: 'Invariable present participle of avoir (ayant) replacing "qui ont".'
          },
          {
            french: 'C\'est une aventure palpitante pleine de rebondissements.',
            english: 'It is a thrilling adventure full of twists and turns.',
            aspectNote: 'Verbal adjective agreeing with feminine noun une aventure (palpitante).'
          }
        ]
      },
      {
        id: 'topic-24-gerondif',
        title: '2. Le Gérondif (En + Participe Présent)',
        formula: 'Gérondif = [en] + [Participe Présent] (e.g. en marchant, en mangeant, en étudiant)',
        goldenRule: 'The Gérondif acts as an **adverbial modifier** indicating simultaneity (*while*), manner/means (*by*), or condition (*if*). It strictly requires that **both actions share the exact same subject**.',
        detailedDescription: [
          'Preceding the present participle with **« en »** creates the **Gérondif**.',
          'It answers the questions: *When?* (simultaneity), *How?* (manner), or *Under what condition?* (cause/condition).',
          'Trap warning: You cannot say *"En arrivant, la pluie a commencé"* because the rain didn\'t arrive; the subject of both actions must match.'
        ],
        tables: [
          {
            title: 'Core Functions of the Gérondif',
            subtitle: 'Simultaneity, manner, and causality',
            description: 'The preposition "en" anchors the participle adverbially to the main verb.',
            headers: ['Function', 'English Equivalence', 'Sample Sentence', 'Nuance'],
            rows: [
              ['Simultanéité (Time)', 'While / As', 'Il écoute la radio en cuisinant.', 'Two actions occurring at the exact same moment.'],
              ['Moyen / Manière (Means)', 'By doing', 'Elle a réussi en travaillant dur.', 'The method through which the result was achieved.'],
              ['Cause / Condition', 'If / Because of', 'En prenant le métro, tu gagneras du temps.', 'Equivalent to "si tu prends le métro".']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Il écoute de la musique en faisant la vaisselle.',
            english: 'He listens to music while doing the dishes.',
            aspectNote: 'Gérondif (en faisant) showing simultaneous actions with the same subject.'
          },
          {
            french: 'C\'est en forgeant qu\'on devient forgeron.',
            english: 'Practice makes perfect (literally: By blacksmithing one becomes a blacksmith).',
            aspectNote: 'Gérondif (en forgeant) indicating means and practice.'
          }
        ]
      },
      {
        id: 'topic-24-tout-en',
        title: '3. Nuances with "Tout en" & Relative Replacement',
        formula: '[Tout en] + [Participe Présent] (e.g. Tout en reconnaissant ses torts, il a refusé d\'abandonner)',
        goldenRule: 'Adding **« Tout »** before the gérondif (**« Tout en + participe présent »**) emphasizes **uninterrupted simultaneity** or highlights a **concessive paradox / contradiction** (*even while doing*).',
        detailedDescription: [
          'When you wish to emphasize that two actions coexist unexpectedly, use **« tout en »** (e.g. **« Tout en souriant, elle lui annonça la mauvaise nouvelle »** = Even while smiling, she broke the bad news).',
          'The present participle also serves in formal prose as a concise alternative to relative clauses introduced by *qui* or causal clauses introduced by *parce que / puisque*.'
        ],
        tables: [
          {
            title: '"Tout en" Nuances & Relative Clause Replacement',
            subtitle: 'Stylistic elegance in intermediate and advanced prose',
            description: 'Compare standard gérondif with the emphatic "tout en" construction.',
            headers: ['Construction', 'Expressive Value', 'French Example', 'English Translation'],
            rows: [
              ['Gérondif simple', 'Pure simultaneity', 'Elle marchait en chantonnant.', 'She was walking while humming.'],
              ['Tout en + gérondif', 'Paradox / Contrast', 'Tout en ayant peur, il a sauté.', 'Even while being afraid, he jumped.'],
              ['Tout en + gérondif', 'Dual ongoing state', 'Elle étudie tout en travaillant.', 'She studies while also working.'],
              ['Relative replacement', 'Concise prose', 'Les candidats réussissant l\'épreuve...', 'Candidates who pass the test...']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Tout en souriant poliment, il refusa de signer l\'accord.',
            english: 'Even while smiling politely, he refused to sign the agreement.',
            aspectNote: 'Concessive paradox with "tout en souriant".'
          },
          {
            french: 'Ayant terminé son travail plus tôt que prévu, elle est allée au cinéma.',
            english: 'Having finished her work earlier than expected, she went to the movies.',
            aspectNote: 'Compound participle (ayant terminé) explaining causality.'
          }
        ]
      }
    ],
    rules: [
      'Form the Present Participle from the "nous" present stem + "-ant": nous chantons → chantant; nous prenons → prenant.',
      'Irregular participles (3 only): Être → étant, Avoir → ayant, Savoir → sachant.',
      'Gérondif with "Tout": Adding "Tout en + participe présent" emphasizes simultaneity or paradox (e.g. "Tout en souriant, il refusa" = Even while smiling, he refused).',
      'The standalone Present Participle acts as an adjective (un film passionnant, une histoire captivante; agrees) or replaces a relative clause "qui..." (un homme parlant cinq langues; invariable).',
    ],
    contrastExamples: [
      {
        french: 'Il écoute de la musique en faisant la vaisselle.',
        english: 'He listens to music while doing the dishes.',
        aspectNote: 'Gérondif (en faisant) showing simultaneous actions with the same subject.',
      },
      {
        french: 'C\'est en forgeant qu\'on devient forgeron.',
        english: 'Practice makes perfect (literally: It is by blacksmithing that one becomes a blacksmith).',
        aspectNote: 'Gérondif (en forgeant) showing manner and means.',
      },
      {
        french: 'Ayant terminé son travail, elle est sortie.',
        english: 'Having finished her work, she went out.',
        aspectNote: 'Compound present participle (ayant terminé) showing causality/anteriority.',
      },
    ],
    commonTraps: [
      'Using the gérondif when the subjects of the two actions are different.',
      'Confusing the verbal participle (invariable: des femmes chantant) with the verbal adjective (agrees: des voix chantantes).',
    ],
    practiceExercises: [
      {
        id: 'ex-u24-1',
        type: 'multiple-choice',
        prompt: 'Choose the correct form: "Elle a trouvé la solution _____ (réfléchir)."',
        options: ['en réfléchissant', 'en réfléchant', 'réfléchissant', 'par réfléchir'],
        correctAnswer: 'en réfléchissant',
        hint: 'Gérondif of 2nd group verb (nous réfléchissons stem) + en.',
        explanation: 'En + stem of nous (réfléchiss-) + ant = en réfléchissant.',
      },
      {
        id: 'ex-u24-2',
        type: 'multiple-choice',
        prompt: 'What is the present participle of the irregular verb "avoir"?',
        options: ['ayant', 'avants', 'avaient', 'étant'],
        correctAnswer: 'ayant',
        hint: 'One of the 3 irregular present participles.',
        explanation: 'The present participle of avoir is "ayant".',
      },
    ],
  },

  // ==========================================
  // Unit 27: Relative Pronouns
  // ==========================================
  {
    id: 'unit-27-relative-pronouns',
    unitNumber: 27,
    category: 'Prepositions, Voice & Pronouns',
    level: 'B1',
    title: 'Unit 27: Relative Pronouns (Qui, Que, Où, Dont & Composés)',
    frenchTitle: 'Unité 27 : Les pronoms relatifs simples et composés (Qui, que, où, dont, lequel)',
    subtitle: 'Combine clauses seamlessly using grammatical relative connectors and prepositional relative pronouns.',
    formula: 'Qui + [Verbe] (Sujet)  |  Que + [Sujet] + [Verbe] (COD)  |  Où (Lieu/Temps)  |  Dont (remplace "de + Nom")  |  Composés: lequel, laquelle, lesquels, lesquelles',
    goldenRule: '**« Qui »** is the grammatical subject (followed immediately by a verb). **« Que »** is the direct object (followed by a subject + verb). **« Dont »** replaces any phrase governed by **« de »** (parler de, avoir besoin de, avoir peur de, l\'auteur de).',
    detailedDescription: [
      'Relative pronouns join two sentences together, avoiding clumsy repetitions and structuring complex ideas with grammatical precision.',
      'French distinguishes clearly between subjects (**qui**), direct objects (**que**), place/time (**où**), de-complements (**dont**), and prepositional compounds (**lequel**).'
    ],
    topics: [
      {
        id: 'topic-27-qui-que',
        title: '1. Simple Relative Pronouns (Qui vs. Que / Qu\')',
        formula: 'Sujet: [Antécédent] + [qui] + [Verbe]  |  Direct Object: [Antécédent] + [que / qu\'] + [Sujet] + [Verbe]',
        goldenRule: '**« Qui » NEVER elides** before a vowel (**« qui arrive »**, **« qui est »**). In contrast, **« Que » ALWAYS elides** to **« qu\' »** before a vowel sound (**« qu\'il aime »**, **« qu\'elle voit »**).',
        detailedDescription: [
          'To choose between *qui* and *que*, look at the grammatical role inside the relative clause:',
          'If the relative pronoun is performing the action (followed directly by the conjugated verb), use **qui** (**« L\'amie qui m\'aide »**).',
          'If the relative pronoun is receiving the action (followed by a subject pronoun or noun), use **que** (**« L\'amie que j\'aide »**).'
        ],
        tables: [
          {
            title: 'Qui vs. Que / Qu\' Structural Matrix',
            subtitle: 'Subject vs. Direct Object relative markers',
            description: 'Observe the syntactic position immediately following the relative pronoun.',
            headers: ['Pronoun', 'Syntactic Function', 'Following Element', 'Elision Before Vowel', 'Example'],
            rows: [
              ['Qui', 'Subject (Sujet)', 'Conjugated verb', 'NEVER (qui aime)', 'L\'artiste qui peint ce tableau.'],
              ['Que / Qu\'', 'Direct Object (COD)', 'Subject + verb', 'ALWAYS (qu\'il)', 'Le tableau qu\'il a peint.'],
              ['Ce qui', 'Indefinite subject', 'Conjugated verb', 'NEVER (ce qui est)', 'Ce qui compte, c\'est l\'effort.'],
              ['Ce que', 'Indefinite object', 'Subject + verb', 'ALWAYS (ce qu\'il)', 'Ce que je veux, c\'est du repos.']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'C\'est l\'étudiante qui a posé la question.',
            english: 'It is the student who asked the question.',
            aspectNote: 'Qui acts as subject followed directly by verb (a posé).'
          },
          {
            french: 'C\'est la question qu\'elle a posée au professeur.',
            english: 'It is the question that she asked the professor.',
            aspectNote: 'Que acts as direct object followed by subject (elle), with participle agreement (posée).'
          }
        ]
      },
      {
        id: 'topic-27-ou-dont',
        title: '2. Pronouns Où & Dont (Place, Time & "De")',
        formula: 'Lieu / Temps: [Lieu / Moment] + [où]  |  Complément de "de": [Nom / Verbe régissant "de"] + [dont]',
        goldenRule: 'Use **« Où »** for BOTH physical location (*the city where*) and points in time (*the day when*). Never use "quand" as a relative pronoun! Use **« Dont »** whenever the verb or expression requires **« de »**.',
        detailedDescription: [
          '**Où** translates both "where" (**« La ville où j\'habite »**) and "when" (**« Le jour où nous nous sommes rencontrés »**). Saying *"Le jour quand"* is a common anglicism that must be avoided.',
          '**Dont** is the relative champion for replacing any complement governed by *de*: verbs (**parler de, se souvenir de, avoir besoin de**), adjectives (**fier de, responsable de**), or possession (**le père dont la fille est médecin**).'
        ],
        tables: [
          {
            title: 'Où vs. Dont Reference Guide',
            subtitle: 'Place, temporal markers, and expressions with "de"',
            description: '"Dont" eliminates prepositions like de, d\', du, de la, des.',
            headers: ['Pronoun', 'Meaning', 'Governing Factor', 'Example Sentence'],
            rows: [
              ['Où (Lieu)', 'Where', 'Physical place', 'Le restaurant où nous avons dîné hier.'],
              ['Où (Temps)', 'When / In which', 'Temporal noun (jour, année, moment)', 'L\'année où j\'ai obtenu mon diplôme.'],
              ['Dont (Verbe en de)', 'Of which / That', 'Verbal regime (avoir besoin de)', 'Voici le livre dont j\'ai besoin.'],
              ['Dont (Possession)', 'Whose', 'Noun possessing another', 'Un écrivain dont les livres se vendent bien.']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Paris est la ville où je me sens le mieux.',
            english: 'Paris is the city where I feel best.',
            aspectNote: 'Où denoting physical geographical location.'
          },
          {
            french: 'C\'est le projet dont nous sommes tous très fiers.',
            english: 'It is the project of which we are all very proud.',
            aspectNote: 'Dont replaces "de ce projet" (être fier de).'
          }
        ]
      },
      {
        id: 'topic-27-composes',
        title: '3. Compound Relative Pronouns (Lequel, Auquel, Duquel)',
        formula: 'Standard: lequel, laquelle, lesquels, lesquelles  |  Avec "à": auquel, à laquelle, auxquels, auxquelles  |  Avec "de": duquel, de laquelle, desquels, desquelles',
        goldenRule: 'Compound relative pronouns are used after **complex prepositions** (à côté de, grâce à, près de, avec, pour, sur). They agree in **gender and number** with the antecedent noun.',
        detailedDescription: [
          'When a relative clause follows a preposition like *sur, sous, avec, pour, chez, dans*, use **lequel** (**« La table sur laquelle j\'ai posé les clés »**).',
          'When combined with **à** or **de**, *lequel* contracts into **auquel / auxquels** and **duquel / desquels** (e.g. **« L\'entreprise grâce à laquelle j\'ai trouvé ce travail »**).'
        ],
        tables: [
          {
            title: 'Compound Relative Pronoun Declensions',
            subtitle: 'Standard forms and contractions with "à" and "de"',
            description: 'Match the gender and number of the antecedent noun.',
            headers: ['Form', 'Masculine Singular', 'Feminine Singular', 'Masculine Plural', 'Feminine Plural'],
            rows: [
              ['Standard (sur, avec, pour)', 'lequel', 'laquelle', 'lesquels', 'lesquelles'],
              ['Contracted with À (grâce à, penser à)', 'auquel', 'à laquelle', 'auxquels', 'auxquelles'],
              ['Contracted with De (à côté de, près de)', 'duquel', 'de laquelle', 'desquels', 'desquelles']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Voici le dossier sur lequel nous travaillons cette semaine.',
            english: 'Here is the file on which we are working this week.',
            aspectNote: 'Preposition "sur" + masculine singular compound relative (lequel).'
          },
          {
            french: 'La conférence à laquelle nous avons assisté était passionnante.',
            english: 'The conference which we attended was fascinating.',
            aspectNote: 'Assister à + feminine singular noun (laquelle) contracts to "à laquelle".'
          }
        ]
      }
    ],
    rules: [
      'Qui = Subject of the relative clause (e.g. "L\'homme qui parle est mon frère"). Does NOT elide before vowels (qui arrive).',
      'Que / Qu\' = Direct object of the relative clause (e.g. "Le livre que je lis"). Elides before vowels to "qu\'" (le film qu\'il aime).',
      'Où = Relative pronoun of Place or Time (e.g. "La ville où je suis né", "Le jour où nous sommes arrivés").',
      'Dont = Relative pronoun replacing "de + antecedent" (e.g. "C\'est le livre dont j\'ai besoin" [avoir besoin de], "La femme dont le fils est médecin").',
      'Compound Relatives (lequel, auquel, duquel): Used after complex prepositions (à côté duquel, grâce auquel, sur lequel).',
    ],
    contrastExamples: [
      {
        french: 'C\'est l\'amie qui m\'a aidé et que j\'apprécie beaucoup.',
        english: 'This is the friend who helped me (qui + verb) and whom I appreciate a lot (que + subject).',
        aspectNote: 'Distinction between subject relative "qui" and object relative "que".',
      },
      {
        french: 'Le projet dont nous parlons est capital.',
        english: 'The project of which we are speaking (that we are talking about) is essential.',
        aspectNote: '"Dont" replaces "de ce projet" (parler de).',
      },
    ],
    commonTraps: [
      'Saying "Le jour quand..." in French (Use "Le jour où...", never quand as a relative pronoun).',
      'Saying "C\'est la chose que j\'ai besoin de" (Must be "C\'est la chose dont j\'ai besoin").',
    ],
    practiceExercises: [
      {
        id: 'ex-u27-1',
        type: 'multiple-choice',
        prompt: 'Choose the correct relative pronoun: "Le film _____ j\'ai vu hier était incroyable."',
        options: ['que', 'qui', 'dont', 'où'],
        correctAnswer: 'que',
        hint: 'Direct object followed by subject "j\'".',
        explanation: '"Que" acts as the direct object for "j\'ai vu".',
      },
      {
        id: 'ex-u27-2',
        type: 'multiple-choice',
        prompt: 'Choose the correct pronoun: "C\'est l\'artiste _____ tout le monde parle."',
        options: ['dont', 'que', 'qui', 'auquel'],
        correctAnswer: 'dont',
        hint: 'The verb is "parler de".',
        explanation: 'Because the verbal construction is "parler de quelqu\'un", the relative pronoun is "dont".',
      },
    ],
  },
];
