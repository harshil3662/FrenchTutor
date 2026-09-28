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
    topics: [
      {
        id: 'topic-25-passive-voice',
        title: '1. The passive voice',
        detailedDescription: [
          'A sentence can either be in the active or the passive voice. In the active voice, the subject performs the action, while in the voix passive (passive voice), the subject is acted upon. That is, in the passive voice, the subject and the object exchange roles. Be aware that the passive voice is much more common in English than in French. In French, one tends to use the active voice.',
          'La souris **mange** le fromage. - The mouse eats the cheese.',
          'Le fromage **est mangé** par la souris. - The cheese is being eaten by the mouse',
          'The passive voice is formed with être in the tense required + the past participle of the main verb.',
          'il **est** construit - it is (being) built',
          'il **a été** construit - it has been built',
          'il **était** construit - it was built',
          'il **sera** construit - it will be built',
          'il **serait** construit - it would be built',
          'However, the preposition de is commonly used after verbs expressing emotion or opinion.',
          'That is, when the voix passive is followed by the preposition de (rather than par), the agent plays a less active role.'
        ],
        contrastExamples: [
          {
            french: 'Cette bague a été retrouvée par la police.',
            english: 'This ring was found by the police.',
          },
          {
            french: 'Ce gérant est estimé de ses employés. ',
            english: 'This manager is respected by his employees.',
          },
          {
            french: 'Le voleur est suivi par la police. ',
            english: 'The thief is followed by the police.',
          },
          {
            french: 'Une écharpe blanche a été retrouvée sur les lieux du crime.',
            english: 'A white scarf was found on the crime scene.',
          }
        ]
      },
      {
        id: 'topic-25-indirect-speech',
        title: 'Indirect speech',
        detailedDescription: [
          'Indirect speech is used, both in English and in French, to relate conversational exchanges or information in the third person.',
          'If the direct speech is in the present tense, the dependent clause verb is changed into the imparfait.',
          'Elle est en Inde. - She is in India.',
          'If the direct speech is in the passé composé, the verb in the dependent clause is changed into the plus-que-parfait.',
          'Ils ont élu le candidat de gauche. - They elected the candidate from the left.',
          'If the direct speech is in the future, the dependent clause verb is changed into the conditionnel in the indirect speech.',
          'Vous vous présenterez aux élections. - You’ll run for election.'
        ]
      },
      {
        id: 'topic-25-comparatives-and-superlatives',
        title: 'Comparatives and superlatives',
        detailedDescription: [
          'In French, comparisons of adjectives and adverbs can take three forms, plus... que (more . . .than), moins... que (less . . . than), aussi... que (as . . . as).',
          'Ce modèle est **plus** récent **que** le mien. - This model is more recent than mine.',
          'Marc est **moins** riche **que** Paul. - Mark is less rich than Paul.',
          'To compare quantities, use the following expressions. Note the use of de (d’) with expressions of quantity:',
          'Elle a **plus de** temps **que** Valérie. - She has more time than Valérie.',

        ],
        contrastExamples: [
          {
            french: 'Ce livre-ci est meilleur que ce livre-là.',
            english: 'This book is better than that book.',
          },
          {
            french: 'Cela n’a pas le moindre intérêt. ',
            english: 'That does not have the slightest interest.',
          }
        ]
      },
      {
        id: 'topic-25-superlatives',
        title: 'Superlatives',
        detailedDescription: [
          'To express the ideas of the most, the least, the best, the worst, etc., one uses the superlative. To form the superlative in French, simply precede the comparative form by the definite article. Note that before naming a group or entity, the superlative is followed by **de** + the definite article.',
        ],
        contrastExamples: [
          {
            french: 'C’est le plus grand spectacle du monde. ',
            english: 'It’s the greatest show on earth.',
          },
          {
            french: 'C’est l’endroit le moins ennuyeux de toute la ville.',
            english: 'It’s the least boring place in the whole city.',
          }
        ]
      },
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
