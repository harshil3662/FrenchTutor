export const B2_GRAMMAR_LESSONS = [
  // ==========================================
  // Unit 25: Simple Past, Passive Voice & Indirect Speech
  // ==========================================
  {
    id: 'unit-25-simple-past-passive-indirect-speech',
    unitNumber: 25,
    category: 'Prepositions, Voice & Pronouns',
    level: 'B2',
    title: 'Unit 25: The Simple Past, Passive Voice & Indirect Speech',
    frenchTitle: 'Unité 25 : Le passé simple, la voix passive et le discours indirect',
    subtitle: 'Navigate literary historical past narration, passive transformations with "par", and backshifting tenses in reported speech.',
    formula: 'Passé Simple: -er (-a, -èrent), -ir/-re (-it, -irent), irréguliers (-ut, -urent)  |  Voix Passive: [Être au temps voulu] + [Participe Passé] + [par / de]  |  Discours Indirect: Présent → Imparfait, Futur → Conditionnel, Passé Composé → Plus-que-parfait',
    goldenRule: 'In Indirect Reported Speech, when the reporting verb is in the past (il a dit que...), the reported tenses backshift: Present becomes Imparfait, Futur Simple becomes Conditionnel Présent, and Passé Composé becomes Plus-que-parfait.',
    detailedDescription: [
      'Unit 25 covers three **pivotal advanced B2 structures**: literary narration with the **Passé Simple**, objective grammatical focus using the **Passive Voice**, and nuanced communication through **Indirect Speech**.',
      'Mastering these three subtopics equips learners to read French classical literature, analyze journalism, and accurately report statements across complex timelines.'
    ],
    topics: [
      {
        id: 'topic-25-passe-simple',
        title: '1. Le Passé Simple (Literary Narrative Past)',
        formula: '-ER verbs: [-ai, -as, -a, -âmes, -âtes, -èrent]  |  -IR/-RE verbs: [-is, -is, -it, -îmes, -îtes, -irent]  |  Irréguliers en -u: [-us, -us, -ut, -ûmes, -ûtes, -urent]',
        goldenRule: 'The Passé Simple is the literary equivalent of the **Passé Composé**, used strictly in written literature, journalism, and history. It expresses completed past actions with **no link to the present**.',
        detailedDescription: [
          'The **Passé Simple** is an exclusively literary tense found in novels, fairy tales, and historical texts. While never spoken in everyday conversation, recognizing its forms is essential for reading authentic French.',
          'Most verbs follow three patterns: the **-a** paradigm for -ER verbs (e.g. **il parla**, **ils parlèrent**), the **-i** paradigm for -IR/-RE verbs (e.g. **il finit**, **il répondit**), and the **-u** paradigm for many irregular verbs (e.g. **il eut**, **il fut**, **il sut**).'
        ],
        tables: [
          {
            title: 'Conjugation in Passé Simple (Parler, Finir, Être, Avoir)',
            subtitle: 'Key endings across regular and irregular groups',
            description: 'Notice the circumflex accent on the 1st and 2nd person plural forms (nous parlâmes, vous parlâtes).',
            headers: ['Pronoun', 'Parler (-er)', 'Finir (-ir)', 'Être (irrégulier)', 'Avoir (irrégulier)'],
            rows: [
              ['Je', 'parlai', 'finis', 'fus', 'eus'],
              ['Tu', 'parlas', 'finis', 'fus', 'eus'],
              ['Il / Elle', 'parla', 'finit', 'fut', 'eut'],
              ['Nous', 'parlâmes', 'finîmes', 'fûmes', 'eûmes'],
              ['Vous', 'parlâtes', 'finîtes', 'fûtes', 'eûtes'],
              ['Ils / Elles', 'parlèrent', 'finirent', 'furent', 'eurent']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Le roi mourut en 1715 après un long règne.',
            english: 'The king died in 1715 after a long reign.',
            aspectNote: 'Passé simple (mourut) used in historical narrative.'
          },
          {
            french: 'Elle entra dans la pièce et aperçut la lettre.',
            english: 'She entered the room and noticed the letter.',
            aspectNote: 'Successive bounded actions in literary prose (entra, aperçut).'
          }
        ]
      },
      {
        id: 'topic-25-passive-voice',
        title: '2. La Voix Passive & Complément d\'Agent',
        formula: 'Voix Passive = [Sujet] + [Être au temps voulu] + [Participe Passé] + [par / de] + [Agent]',
        goldenRule: 'In the passive voice, the past participle **ALWAYS agrees** in gender and number with the grammatical subject. Use **« par »** for active physical agents and **« de »** for verbs of sentiment, description, and state.',
        detailedDescription: [
          'The **passive voice** shifts the focus from the agent performing the action to the patient receiving it. The active direct object becomes the passive subject.',
          'While English uses "by" universally, French distinguishes between **par** (for intentional physical actions: **« construit par les Romains »**) and **de** (for verbs of emotion, opinion, and state: **« respecté de tous »**, **« entouré d\'arbres »**).'
        ],
        tables: [
          {
            title: 'Passive Voice Across Tenses',
            subtitle: 'Conjugating the auxiliary Être while agreeing the participle',
            description: 'The tense of the sentence is carried entirely by the auxiliary verb "être".',
            headers: ['Tense', 'Active Sentence', 'Passive Sentence', 'Agreement Rule'],
            rows: [
              ['Présent', 'Le chef prépare la sauce.', 'La sauce est préparée par le chef.', 'Féminin singulier (+e)'],
              ['Passé Composé', 'L\'architecte a conçu ces tours.', 'Ces tours ont été conçues par l\'architecte.', 'Féminin pluriel (+es)'],
              ['Imparfait', 'Le vent fermait la porte.', 'La porte était fermée par le vent.', 'Féminin singulier (+e)'],
              ['Futur Simple', 'La mairie démolira ce bâtiment.', 'Ce bâtiment sera démoli par la mairie.', 'Masculin singulier']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Ce pont a été construit par les Romains en l\'an 12.',
            english: 'This bridge was built by the Romans in the year 12.',
            aspectNote: 'Passive voice with physical agent introduced by "par".'
          },
          {
            french: 'Ce vieux professeur est estimé de tous ses étudiants.',
            english: 'This old professor is esteemed by all his students.',
            aspectNote: 'Verb of sentiment/feeling (estimer) takes "de" instead of "par".'
          }
        ]
      },
      {
        id: 'topic-25-indirect-speech',
        title: '3. Le Discours Indirect & Concordance des Temps',
        formula: 'Introduction au passé: [Présent → Imparfait]  |  [Futur Simple → Conditionnel Présent]  |  [Passé Composé → Plus-que-parfait]',
        goldenRule: 'When the introductory reporting verb is in a past tense (il a dit, elle expliquait), all subordinate tenses **backshift into the past**. The temporal markers also shift (aujourd\'hui → ce jour-là, demain → le lendemain).',
        detailedDescription: [
          '**Reported speech (discours indirect)** conveys what someone said without using direct quotation marks. When the reporting verb is in the present (**« Il dit que... »**), the tenses remain unchanged.',
          'However, when the reporting verb is in the past (**« Il a affirmé que... »**), French applies the **concordance of tenses**: Present becomes Imparfait, Future becomes Conditionnel, and Passé Composé becomes Plus-que-parfait.'
        ],
        tables: [
          {
            title: 'Tense & Time Backshifting in Indirect Speech',
            subtitle: 'Direct speech vs. Reported speech introduced by past verb',
            description: 'Observe how tenses step back one degree of anteriority.',
            headers: ['Direct Speech', 'Introductory Verb in Past', 'Indirect Form', 'Temporal Marker Shift'],
            rows: [
              ['« Je suis malade » (Présent)', 'Il a dit qu\'...', 'il était malade (Imparfait)', 'aujourd\'hui → ce jour-là'],
              ['« Je viendrai demain » (Futur)', 'Il a dit qu\'...', 'il viendrait (Conditionnel)', 'demain → le lendemain'],
              ['« J\'ai déjà mangé » (Passé comp.)', 'Il a dit qu\'...', 'il avait déjà mangé (PQP)', 'hier → la veille'],
              ['« Pars ! » (Impératif)', 'Il a ordonné de...', 'partir (de + Infinitif)', 'maintenant → à ce moment-là']
            ]
          }
        ],
        contrastExamples: [
          {
            french: 'Paul a dit : « Je partirai demain. » → Paul a dit qu\'il partirait le lendemain.',
            english: 'Paul said: "I will leave tomorrow." → Paul said that he would leave the next day.',
            aspectNote: 'Future simple becomes conditionnel présent, and "demain" becomes "le lendemain".'
          },
          {
            french: 'Elle nous a assuré : « Nous avons fini. » → Elle nous a assuré qu\'ils avaient fini.',
            english: 'She assured us: "We have finished." → She assured us that they had finished.',
            aspectNote: 'Passé composé shifts to plus-que-parfait (avaient fini).'
          }
        ]
      }
    ],
    rules: [
      'Passé Simple is the literary equivalent of the Passé Composé used exclusively in written literature, historical novels, and fairy tales (e.g. "Il naquit en 1802", "Elle chanta").',
      'Passive Voice transforms the active Direct Object into the grammatical Subject: "L\'architecte a conçu la maison" → "La maison a été conçue par l\'architecte" (Participle ALWAYS agrees with subject).',
      'Verbs of feeling take "de" instead of "par" in the passive: "Il est aimé de tous" (He is loved by all).',
      'Concordance of Tenses in Indirect Speech: "Il dit : \'Je viendrai\'" → "Il a dit qu\'il viendrait" (Future → Conditional).',
    ],
    contrastExamples: [
      {
        french: 'Le roi mourut en 1715 après un long règne.',
        english: 'The king died in 1715 after a long reign.',
        aspectNote: 'Passé simple (mourut) used in historical narrative.',
      },
      {
        french: 'Ce pont a été construit par les Romains.',
        english: 'This bridge was built by the Romans.',
        aspectNote: 'Passive voice: Auxiliary "a été" + participle "construit" + agent "par les Romains".',
      },
    ],
    commonTraps: [
      'Trying to speak in Passé Simple in everyday conversation (it sounds unnaturally archaic/theatrical; use Passé Composé).',
      'Forgetting to backshift tenses when reporting past speech ("Il a dit qu\'il est malade" instead of "était malade").',
    ],
    practiceExercises: [
      {
        id: 'ex-u25-1',
        type: 'multiple-choice',
        prompt: 'Transform into passive voice: "Le peintre a réalisé ce tableau."',
        options: [
          'Ce tableau a été réalisé par le peintre.',
          'Ce tableau est réalisé par le peintre.',
          'Ce tableau avait été réalisé par le peintre.',
          'Ce tableau sera réalisé par le peintre.',
        ],
        correctAnswer: 'Ce tableau a été réalisé par le peintre.',
        hint: 'Active tense is Passé Composé (a réalisé) -> Passive uses Être in Passé Composé (a été réalisé).',
        explanation: 'Active passé composé translates to "a été" + past participle.',
      },
      {
        id: 'ex-u25-2',
        type: 'multiple-choice',
        prompt: 'Convert to reported speech: Paul a dit : "Je partirai demain." → Paul a dit qu\'il _____ le lendemain.',
        options: ['partirait', 'partira', 'partait', 'est parti'],
        correctAnswer: 'partirait',
        hint: 'Future simple backshifts to conditionnel présent in reported speech.',
        explanation: 'In past reported speech, future simple (partirai) becomes conditionnel présent (partirait).',
      },
    ],
  },
];
