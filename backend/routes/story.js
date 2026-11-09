import { Router } from 'express';
import { generateAiJson } from '../services/ai.js';
import { GRAMMAR_ASPECT_LESSONS } from '../../src/data/grammar/index.js';

const router = Router();

// Dynamic AI Story, Newspaper Article & Multi-modal Reading Generator
router.post('/ai/generate-story', async (req, res) => {
  const {
    level = 'A1',
    topic = 'Le café parisien et l\'art de vivre au quotidien',
    theme = 'culture & society',
    sourceType = 'newspaper', // 'newspaper' | 'magazine' | 'editorial' | 'story'
  } = req.body;

  const levelFallbacks = {
    A1: {
      title: "Le quotidien du matin : Un café à la terrasse parisienne",
      subtitle: "Chaque matin dans les quartiers de Paris, les habitants retrouvent leur boulangerie et leur café habituel.",
      sourceType: "Newspaper Article (Le Parisien Quotidien)",
      publicationDate: "Morning Edition",
      author: "By Claire Delacroix, Society Desk",
      level: "A1",
      frenchText: "Chaque matin, Thomas se réveille à sept heures. Il habite dans un petit appartement près du jardin du Luxembourg. À huit heures, il marche jusqu'à la boulangerie de son quartier. La boulangère est toujours souriante. Thomas achète un croissant au beurre et une baguette bien dorée. Ensuite, il va au Café des Arts. Le serveur s'appelle Lucas. Lucas lui apporte un café noir avec un peu de sucre. Beaucoup de personnes lisent le journal ou parlent de la météo. Aujourd'hui, il fait beau et le ciel est bleu. Thomas aime observer les passants dans la rue. Pour lui, ce moment calme est le meilleur moment de la journée avant de commencer le travail.",
      englishTranslation: "Every morning, Thomas wakes up at seven o'clock. He lives in a small apartment near the Luxembourg Garden. At eight o'clock, he walks to the bakery in his neighborhood. The baker is always smiling. Thomas buys a butter croissant and a golden baguette. Then, he goes to the Café des Arts. The waiter's name is Lucas. Lucas brings him a black coffee with a little sugar. Many people read the newspaper or talk about the weather. Today, the weather is nice and the sky is blue. Thomas likes watching passersby in the street. For him, this calm moment is the best moment of the day before starting work.",
      glossary: [
        { french: "se réveille", english: "wakes up", type: "pronominal verb", contextSentence: "Thomas se réveille à sept heures." },
        { french: "boulangerie", english: "bakery", type: "feminine noun", contextSentence: "Il marche jusqu'à la boulangerie." },
        { french: "croissant au beurre", english: "butter croissant", type: "masculine noun", contextSentence: "Thomas achète un croissant au beurre." },
        { french: "serveur", english: "waiter", type: "masculine noun", contextSentence: "Le serveur s'appelle Lucas." },
        { french: "passants", english: "passersby / pedestrians", type: "plural noun", contextSentence: "Thomas aime observer les passants." },
      ],
      rightOrWrongQuestions: [
        {
          claim: "According to the article: Thomas buys his croissant at 10:00 AM.",
          isRight: false,
          explanation: "False: The text states that Thomas walks to the bakery at 8:00 AM, not at 10:00 AM.",
          quote: "À huit heures, il marche jusqu'à la boulangerie de son quartier."
        },
        {
          claim: "According to the article: Lucas the waiter serves Thomas a black coffee.",
          isRight: true,
          explanation: "True: The article explicitly states that Lucas brings him a black coffee with a little sugar.",
          quote: "Lucas lui apporte un café noir avec un peu de sucre."
        },
        {
          claim: "According to the article: The weather is cold and rainy that morning.",
          isRight: false,
          explanation: "False: The article says the weather is beautiful and the sky is blue.",
          quote: "Aujourd'hui, il fait beau et le ciel est bleu."
        }
      ],
      comprehensionQuestions: [
        {
          question: "Où habite Thomas à Paris ?",
          options: ["Près de la tour Eiffel", "Près du jardin du Luxembourg", "Près de la gare de Lyon", "Dans la banlieue nord"],
          correctIndex: 1,
          explanation: "Thomas lives in a small apartment near the Luxembourg Garden (près du jardin du Luxembourg)."
        },
        {
          question: "Que font les gens assis à la terrasse du café ?",
          options: ["Ils font du jogging dans le parc", "Ils dorment à leur table", "Ils lisent le journal ou parlent de la météo", "Ils regardent un match de football en direct"],
          correctIndex: 2,
          explanation: "The text says: 'Beaucoup de personnes lisent le journal ou parlent de la météo.'"
        },
        {
          question: "Quel moment de la journée Thomas préfère-t-il ?",
          options: ["Le moment calme du matin, avant le travail", "Le coup de feu bruyant du déjeuner", "Le trajet en métro du soir", "Les heures tardives de la nuit"],
          correctIndex: 0,
          explanation: "Thomas loves this calm morning moment best before beginning work."
        }
      ],
      summaryExercise: {
        prompt: "Which statement best summarizes the main idea of this article?",
        options: [
          { text: "Thomas enjoys a peaceful morning routine buying a croissant and drinking coffee at his neighborhood café before work.", isBest: true, feedback: "Excellent! This perfectly captures the essence and tone of the passage." },
          { text: "Lucas the waiter arrives late to open the café because of heavy rain.", isBest: false, feedback: "Incorrect: Lucas is already working and serving coffee on a sunny day." },
          { text: "The local bakery is closed for renovations in the morning.", isBest: false, feedback: "Incorrect: the bakery is open and welcoming customers." }
        ],
        sampleSummary: "In the morning, Thomas savors a quiet pause at his local bakery and café before his work day begins."
      },
      opinionPrompt: {
        question: "Thomas prend son café au Café des Arts avant de commencer le travail. Et vous, préférez-vous un moment calme le matin, ou commencer la journée plus vite ? Partagez votre point de vue en français.",
        context: "Write 1 to 3 simple sentences in French (e.g., your breakfast, coffee, walking, or reading habits). Use the starter phrases below to help you write!",
        starterPhrases: [
          "Le matin, je préfère boire... (In the morning, I prefer drinking...)",
          "Mon rituel du matin est très simple : d'abord... (My morning routine is very simple: first...)",
          "À mon avis, le meilleur moment de la journée est... (In my opinion, the best moment of the day is...)",
          "J'aime commencer ma journée par... (I like starting my day with...)"
        ]
      }
    },
    A2: {
      title: "Chronique Magazine : Le renouveau des marchés de producteurs locaux",
      subtitle: "De Lyon à Bordeaux, les Français se tournent vers les circuits courts pour cuisiner de saison.",
      sourceType: "Magazine Feature (Terroirs & Saveurs)",
      publicationDate: "Weekly Feature",
      author: "By Antoine Mercier, Food & Culture Journalist",
      level: "A2",
      frenchText: "Chaque samedi matin, la place du marché s'anime dès huit heures. De nombreux habitants viennent faire leurs courses avec de grands paniers en osier. Madame Dupont, maraîchère depuis vingt ans, vend des carottes fraîches, des poireaux et des pommes de terre biologiques. « Les clients posent beaucoup plus de questions qu'avant sur l'origine des légumes », explique-t-elle avec enthousiasme. Plus loin, un jeune fromager propose du comté affiné et du chèvre frais. Les prix sont parfois un peu plus élevés qu'au supermarché, mais la fraîcheur et le goût sont incomparables. Pour beaucoup de citadins, venir au marché n'est pas seulement une nécessité alimentaire, c'est aussi un rendez-vous convivial où l'on prend le temps de discuter et de partager des recettes.",
      englishTranslation: "Every Saturday morning, the market square comes alive starting at eight o'clock. Many locals come to do their shopping with large wicker baskets. Mrs. Dupont, a market gardener for twenty years, sells fresh carrots, leeks, and organic potatoes. 'Customers ask many more questions than before about the origin of vegetables,' she explains enthusiastically. Further along, a young cheesemaker offers aged Comté and fresh goat cheese. Prices are sometimes slightly higher than at the supermarket, but freshness and taste are incomparable. For many city dwellers, coming to the market is not only a food necessity, it is also a friendly gathering where people take time to chat and share recipes.",
      glossary: [
        { french: "s'anime", english: "comes alive / buzzes", type: "pronominal verb", contextSentence: "La place du marché s'anime dès huit heures." },
        { french: "maraîchère", english: "market gardener / vegetable grower", type: "feminine noun", contextSentence: "Madame Dupont est maraîchère depuis vingt ans." },
        { french: "paniers en osier", english: "wicker baskets", type: "masculine plural noun", contextSentence: "Les clients viennent avec de grands paniers en osier." },
        { french: "affiné", english: "aged / matured (cheese)", type: "adjective", contextSentence: "Le fromager propose du comté affiné." },
        { french: "convivial", english: "friendly / welcoming / warm", type: "adjective", contextSentence: "C'est un rendez-vous convivial." }
      ],
      rightOrWrongQuestions: [
        {
          claim: "According to the article: Customers care less about vegetable origins than they did in the past.",
          isRight: false,
          explanation: "False: Mrs. Dupont explains that customers ask far more questions now about where produce comes from.",
          quote: "Les clients posent beaucoup plus de questions qu'avant sur l'origine des légumes."
        },
        {
          claim: "According to the article: Prices at the local farmers' market can be slightly higher than at the supermarket.",
          isRight: true,
          explanation: "True: The article acknowledges that market prices are sometimes slightly higher than supermarkets.",
          quote: "Les prix sont parfois un peu plus élevés qu'au supermarché."
        },
        {
          claim: "According to the article: City dwellers visit the market solely for quick grocery shopping without talking.",
          isRight: false,
          explanation: "False: The article highlights that it is also a warm social gathering to chat and share recipes.",
          quote: "Ce n'est pas seulement une nécessité alimentaire, c'est aussi un rendez-vous convivial."
        }
      ],
      comprehensionQuestions: [
        {
          question: "Depuis combien de temps Madame Dupont est-elle maraîchère ?",
          options: ["Depuis deux ans", "Depuis dix ans", "Depuis vingt ans", "Depuis cinquante ans"],
          correctIndex: 2,
          explanation: "The text explicitly states: 'Madame Dupont, maraîchère depuis vingt ans' (twenty years)."
        },
        {
          question: "Quel avantage principal justifie, selon l'auteur, des prix plus élevés ?",
          options: ["La rapidité des caisses automatiques", "La fraîcheur et le goût incomparables des produits", "Un parking gratuit et illimité", "Des remises quotidiennes sur les invendus"],
          correctIndex: 1,
          explanation: "The text specifies that 'la fraîcheur et le goût sont incomparables' (freshness and taste are incomparable)."
        },
        {
          question: "Que font les visiteurs au marché, en plus d'acheter à manger ?",
          options: ["Ils travaillent en silence sur leur ordinateur", "Ils discutent avec les producteurs et échangent des recettes", "Ils manifestent dans la rue", "Ils assistent à des répétitions de chorale"],
          correctIndex: 1,
          explanation: "The market is a warm gathering place where people take time to chat and share recipes."
        }
      ],
      summaryExercise: {
        prompt: "Which statement best summarizes the journalist's perspective?",
        options: [
          { text: "Local farmers' markets are flourishing because city dwellers value fresh seasonal food and warm community connections.", isBest: true, feedback: "Spot on! This captures both the culinary quality and the social bond highlighted in the article." },
          { text: "Supermarkets have completely driven traditional French open-air markets out of business.", isBest: false, feedback: "Incorrect: the article illustrates the strong resurgence of local markets." },
          { text: "Organic vegetables are too expensive for the vast majority of consumers.", isBest: false, feedback: "Incomplete and misleading: the focus is on the appreciation of freshness and taste." }
        ],
        sampleSummary: "Despite somewhat higher prices, local farmers' markets thrive thanks to superior taste and friendly community atmosphere."
      },
      opinionPrompt: {
        question: "In your opinion, is it important to support local farmers and open-air markets? Share your view in French.",
        context: "Express your point of view in 1 to 3 sentences in French. You can mention price, health, taste, or community feeling.",
        starterPhrases: [
          "À mon avis, faire ses courses au marché... (In my opinion, shopping at the market...)",
          "Personnellement, je trouve que les produits locaux... (Personally, I find that local products...)",
          "D'un côté c'est un peu plus cher, mais de l'autre... (On one hand it is slightly pricier, but on the other...)",
          "Je préfère acheter des légumes frais parce que... (I prefer buying fresh vegetables because...)"
        ]
      }
    },
    B1: {
      title: "Enquête : Comment le vélo a conquis le cœur des métropoles françaises",
      subtitle: "Autrefois marginal, le vélo s'impose comme le symbole d'une transition urbaine accélérée.",
      sourceType: "Special Investigation (Le Monde Mobility & Cities)",
      publicationDate: "Weekly Report",
      author: "By Maxime Vasseur, Senior Reporter",
      level: "B1",
      frenchText: "Il y a dix ans, traverser Paris ou Strasbourg à vélo relevait presque du défi pour les cyclistes téméraires. Aujourd'hui, la donne a radicalement changé. Grâce à l'aménagement de pistes cyclables protégées et à la création de zones à trafic limité, des centaines de milliers de citoyens ont troqué la voiture ou le métro contre le vélo. Pour Sarah, trentenaire lyonnaise, ce changement a transformé son rapport à la ville : « Non seulement j'économise du temps et de l'argent, mais je me sens aussi beaucoup plus connectée à mon environnement. Je ne subis plus le stress des embouteillages. » Cependant, cette transformation suscite encore des débats houleux. Certains commerçants s'inquiètent de la suppression des places de stationnement, tandis que la cohabitation entre piétons, trottinettes et cyclistes exige une vigilance constante. Il n'en reste pas moins que la bicyclette semble désormais incontournable dans le paysage urbain.",
      englishTranslation: "Ten years ago, crossing Paris or Strasbourg by bicycle was almost a dare for bold cyclists. Today, the situation has radically changed. Thanks to the development of protected bike lanes and the creation of limited-traffic zones, hundreds of thousands of citizens have traded car or metro for bicycles. For Sarah, a thirty-something from Lyon, this change has transformed her relationship with the city: 'Not only do I save time and money, but I also feel much more connected to my environment. I no longer endure traffic stress.' However, this transformation still sparks heated debates. Some shopkeepers worry about the removal of parking spots, while coexistence between pedestrians, scooters, and cyclists demands constant vigilance. Nevertheless, the bicycle now seems indispensable in the urban landscape.",
      glossary: [
        { french: "relevait du défi", english: "was quite a challenge / feat", type: "verbal idiom", contextSentence: "Traverser la ville relevait presque du défi." },
        { french: "la donne a changé", english: "the situation changed completely", type: "idiom", contextSentence: "Aujourd'hui, la donne a radicalement changé." },
        { french: "troqué", english: "traded / swapped", type: "past participle", contextSentence: "Ils ont troqué la voiture contre le vélo." },
        { french: "débats houleux", english: "heated debates", type: "masculine plural noun", contextSentence: "Cette transformation suscite des débats houleux." },
        { french: "incontournable", english: "indispensable / essential", type: "adjective", contextSentence: "La bicyclette semble désormais incontournable." }
      ],
      rightOrWrongQuestions: [
        {
          claim: "According to the article: Sarah claims that commuting by bike wasted her time compared to traffic jams.",
          isRight: false,
          explanation: "False: Sarah emphasizes that she saves both time and money while avoiding the stress of traffic.",
          quote: "Non seulement j'économise du temps et de l'argent, mais je ne subis plus le stress des embouteillages."
        },
        {
          claim: "According to the article: The cycling transition still raises concerns among certain local shop owners.",
          isRight: true,
          explanation: "True: Shopkeepers worry specifically about the removal of customer parking spaces.",
          quote: "Certains commerçants s'inquiètent de la suppression des places de stationnement."
        },
        {
          claim: "According to the article: Ten years ago, bike paths in Paris and Strasbourg were as widespread as they are now.",
          isRight: false,
          explanation: "False: The article recalls that a decade ago, cycling across the city was an intimidating feat for bold riders.",
          quote: "Il y a dix ans, traverser Paris ou Strasbourg à vélo relevait presque du défi."
        }
      ],
      comprehensionQuestions: [
        {
          question: "Qu'est-ce qui a surtout favorisé l'essor spectaculaire du vélo dans les villes françaises ?",
          options: ["La fermeture définitive des réseaux de métro", "Les pistes cyclables protégées et les zones apaisées à faible trafic", "L'interdiction totale de marcher", "De fortes baisses de prix sur les vélos de luxe"],
          correctIndex: 1,
          explanation: "The author credits protected cycling infrastructure and limited-traffic pedestrian-friendly zones."
        },
        {
          question: "Quel défi persistant de l'espace public est évoqué dans le rapport ?",
          options: ["Partager la rue en sécurité entre piétons, trottinettes et cyclistes", "Le manque total d'arbres dans les rues", "Le froid intense au mois de juillet", "L'absence complète de panneaux de signalisation"],
          correctIndex: 0,
          explanation: "Coexistence among pedestrians, scooters, and cyclists requires constant vigilance."
        },
        {
          question: "Comment le vélo a-t-il transformé le quotidien de Sarah à Lyon ?",
          options: ["Elle se sent perdue et désorientée", "Elle est complètement indifférente", "Elle se sent plus libre, moins stressée et plus connectée à son environnement", "Elle veut acheter une voiture plus grande"],
          correctIndex: 2,
          explanation: "Sarah feels much more connected to her environment and free from traffic stress."
        }
      ],
      summaryExercise: {
        prompt: "Which statement provides the most balanced summary of this investigation?",
        options: [
          { text: "The rapid expansion of cycling is revitalizing urban mobility, though it brings real challenges in sharing street space.", isBest: true, feedback: "Brilliant! This reflects both the environmental enthusiasm and the practical urban coexistence issues." },
          { text: "Bicycles are a temporary fad that will disappear with the first winter frost.", isBest: false, feedback: "Incorrect: the author concludes that the bicycle has become an indispensable urban fixture." },
          { text: "French shopkeepers successfully forced city councils to dismantle all protected bike lanes.", isBest: false, feedback: "False: the article demonstrates ongoing expansion despite debates." }
        ],
        sampleSummary: "Backed by protected infrastructure, cycling has become a permanent pillar of French city life while sparking lively discussions about urban space sharing."
      },
      opinionPrompt: {
        question: "Do you believe modern cities should reduce car space to prioritize cycling and pedestrians? What is your point of view?",
        context: "State your opinion in 2 to 3 sentences in French. Try using contrast words like 'cependant' (however) or 'à mon avis' (in my view).",
        starterPhrases: [
          "À mon avis, la transition vers les mobilités douces est... (In my opinion, the transition to active travel is...)",
          "Bien que certains automobilistes soient réticents, je pense que... (Although some drivers are reluctant, I think that...)",
          "D'un point de vue environnemental, il me semble évident que... (From an environmental standpoint, it seems clear that...)",
          "Il faut néanmoins veiller à ce que... (One must nevertheless ensure that...)"
        ]
      }
    },
    B2: {
      title: "Éditorial & Analyse : L'intelligence artificielle et l'héritage intellectuel français",
      subtitle: "Entre effervescence technologique et exigence critique, la France tente d'imprimer sa marque singulière.",
      sourceType: "Editorial & Analysis (Le Figaro Perspectives)",
      publicationDate: "Ideas & Society Section",
      author: "By Hélène de Montalembert, Essayist",
      level: "B2",
      frenchText: "Dans le concert international des révolutions algorithmiques, la France cultive une posture singulière faite d'audace entrepreneuriale et de circonspection cartésienne. D'un côté, le dynamisme des start-up hexagonales et l'excellence des centres de recherche témoignent d'une réelle volonté de souveraineté numérique. De l'autre, persiste une tradition critique profondément enracinée dans l'humanisme des Lumières, qui refuse de subordonner la liberté de l'esprit aux seuls impératifs mercantiles. Les détracteurs d'une régulation stricte arguent qu'un excès de prudence risquerait d'étouffer l'innovation dans l'œuf face aux géants américains et asiatiques. À l'inverse, les partisans d'un encadrement éthique vigoureux rappellent qu'aucun progrès technique ne saurait être émancipateur s'il bafoue le discernement critique et la créativité humaine. Ce dilemme n'est pas qu'économique ; il interroge notre conception même de la culture et de la transmission du savoir.",
      englishTranslation: "In the international chorus of algorithmic revolutions, France cultivates a singular posture made of entrepreneurial boldness and Cartesian circumspection. On the one hand, the vitality of French start-ups and the excellence of research centers reflect a genuine determination for digital sovereignty. On the other hand, there persists a critical tradition deeply rooted in Enlightenment humanism, refusing to subordinate freedom of thought solely to commercial imperatives. Critics of strict regulation argue that excessive caution risks nipping innovation in the bud when facing American and Asian giants. Conversely, proponents of vigorous ethical oversight argue that no technological progress can be liberating if it tramples critical discernment and human creativity. This dilemma is not merely economic; it questions our very conception of culture and the transmission of knowledge.",
      glossary: [
        { french: "circonspection", english: "wariness / prudent reserve", type: "feminine noun", contextSentence: "Une circonspection cartésienne face au changement." },
        { french: "étouffer dans l'œuf", english: "to nip in the bud", type: "idiom", contextSentence: "Risquer d'étouffer l'innovation dans l'œuf." },
        { french: "bafoue", english: "flouts / disregards / tramples", type: "verb", contextSentence: "S'il bafoue le discernement critique." },
        { french: "souveraineté numérique", english: "digital sovereignty", type: "noun phrase", contextSentence: "Une volonté affirmée de souveraineté numérique." },
        { french: "humanisme des Lumières", english: "Enlightenment humanism", type: "philosophical concept", contextSentence: "Enracinée dans l'humanisme des Lumières." }
      ],
      rightOrWrongQuestions: [
        {
          claim: "According to the author: France wholly rejects technological innovation out of sheer conservatism.",
          isRight: false,
          explanation: "False: The author emphasizes entrepreneurial boldness and the excellence of French research labs.",
          quote: "Le dynamisme des start-up hexagonales témoigne d'une réelle volonté de souveraineté numérique."
        },
        {
          claim: "According to the author: Opponents of strict regulation fear European companies will fall behind global rivals.",
          isRight: true,
          explanation: "True: They argue that excessive caution risks nipping European innovation in the bud.",
          quote: "Les détracteurs d'une régulation stricte arguent qu'un excès de prudence risquerait d'étouffer l'innovation."
        },
        {
          claim: "According to the author: The debate surrounding AI is exclusively a financial and balance-sheet concern.",
          isRight: false,
          explanation: "False: The author insists this dilemma questions our very conception of culture and learning.",
          quote: "Ce dilemme n'est pas qu'économique ; il interroge notre conception même de la culture."
        }
      ],
      comprehensionQuestions: [
        {
          question: "Quelle double posture caractérise, selon l'éditorial, l'approche française ?",
          options: ["Un déni total et la résignation", "L'audace entrepreneuriale alliée à une vigilance critique cartésienne", "L'imitation aveugle des modèles étrangers", "Un isolationnisme nostalgique"],
          correctIndex: 1,
          explanation: "The author describes a posture combining entrepreneurial boldness and Cartesian circumspection."
        },
        {
          question: "À quel héritage philosophique l'auteur rattache-t-il l'exigence d'un contrôle éthique ?",
          options: ["Le romantisme du XIXe siècle", "L'humanisme des Lumières", "Le positivisme industriel", "Le stoïcisme antique"],
          correctIndex: 1,
          explanation: "The author refers to a critical tradition deeply rooted in Enlightenment humanism."
        },
        {
          question: "Quelle condition est jugée essentielle pour que le progrès technique soit vraiment libérateur ?",
          options: ["Il doit préserver le discernement critique et la créativité humaine", "Il doit maximiser les bénéfices trimestriels", "Il doit remplacer tous les enseignants", "Il doit interdire les livres imprimés"],
          correctIndex: 0,
          explanation: "Progress is only liberating if it upholds critical discernment and human creativity."
        }
      ],
      summaryExercise: {
        prompt: "Which analysis most faithfully captures the essayist's thesis?",
        options: [
          { text: "France seeks a humanistic equilibrium between tech ambition and ethics, ensuring progress serves critical human discernment.", isBest: true, feedback: "Remarkable! This accurately captures the dialectical nuance of the essay." },
          { text: "Artificial intelligence has no future in Europe because regulations have already crushed it.", isBest: false, feedback: "Inaccurate: the author celebrates the dynamism of French startups and research." },
          { text: "Foreign tech giants have eliminated all resistance without any domestic debate.", isBest: false, feedback: "False: France is actively seeking its own distinct path and sovereignty." }
        ],
        sampleSummary: "Balancing innovation and humanism, France seeks to reconcile digital sovereignty with the protection of critical thought."
      },
      opinionPrompt: {
        question: "Does artificial intelligence represent an opportunity for human liberation or a threat to critical thinking? Take a stance.",
        context: "Draft a reasoned paragraph in French taking a clear position with supporting arguments.",
        starterPhrases: [
          "Il convient de distinguer d'une part..., et d'autre part... (It is worth distinguishing on one hand..., and on the other...)",
          "Loin de constituer une menace absolue, l'IA pourrait... (Far from constituting an absolute threat, AI could...)",
          "À mon sens, le véritable écueil réside dans... (In my view, the real pitfall lies in...)",
          "La pensée critique demeure irremplaçable parce que... (Critical thinking remains irreplaceable because...)"
        ]
      }
    }
  };

  const defaultFallback = levelFallbacks[level] || levelFallbacks.A1;

  try {
    // A random angle makes each generation take a different direction for the same topic
    const storyAngles = [
      "a personal story from an ordinary local resident",
      "a practical guide to a place or everyday custom",
      "a seasonal or weekend event that draws people together",
      "a debate about daily life in a big city",
      "a surprising everyday fact or small discovery",
      "an interview-style portrait of someone who works in the field",
      "a short historical anecdote linked to the present day",
      "a travel tip for a visitor discovering the topic for the first time",
      "a story about a small misunderstanding or unexpected moment",
      "a short report on how people are changing their habits",
    ];
    const storyAngle = storyAngles[Math.floor(Math.random() * storyAngles.length)];

    // Build the article around a grammar unit from the learner's current CEFR level
    const levelUnits = GRAMMAR_ASPECT_LESSONS.filter((unit) => unit.level === level);
    const grammarUnit = levelUnits.length > 0
      ? levelUnits[Math.floor(Math.random() * levelUnits.length)]
      : null;
    const grammarFocus = grammarUnit
      ? `Grammar focus (CEFR ${level}): ${grammarUnit.title}
Rule formula: ${grammarUnit.formula || 'see unit'}
Key rule: ${grammarUnit.goldenRule || 'see unit'}
Topics in this unit: ${(grammarUnit.topics || []).map((t) => t.title).join('; ')}
Requirement: the article must naturally use this grammar several times (at least 5 clear examples), and the grammar should be visible in the sentences a learner would read. Use only structures and vocabulary at or below CEFR ${level}; do not use structures from higher levels.`
      : `Grammar focus: use structures appropriate for CEFR ${level}.`;

    const genreDescription = {
      newspaper: "an authentic French newspaper article (article de presse / dépêche d'actualité)",
      magazine: "a cultural magazine feature (chronique de magazine culturel / grand format de société)",
      editorial: "a thought-provoking journalistic editorial / opinion column (éditorial d'opinion et débat)",
      story: "an authentic literary narrative or personal story (récit ou nouvelle contemporaine)"
    }[sourceType] || "an authentic French magazine article";

    const prompt = `You are a distinguished French journalist and CEFR pedagogical expert.
Generate an engaging, culturally authentic French reading piece in the style of ${genreDescription} tailored specifically to CEFR level ${level}.

Target Topic / Interest: "${topic}"
Angle for this piece: ${storyAngle}. Write a fresh, original text: do not reuse common stock characters, bakery/café examples, or stock phrasing. Choose new names, places, and details.
Theme: "${theme}"
Target CEFR Level: "${level}"
Publication Format: "${sourceType}"
${grammarFocus}

CEFR Level Specifications:
- If A1: Simple short sentences, present tense, high-frequency everyday vocabulary, clear cognates, approachable tone.
- If A2: Everyday and lifestyle French, passé composé and imparfait, basic relative clauses, friendly informative journalistic tone.
- If B1: Subjunctive and conditional uses, opinions, cause/consequence connectors (cependant, par conséquent, bien que), analytical French press style.
- If B2: Nuanced journalistic prose, formal discourse markers, rich vocabulary, debate and critical perspectives (Le Monde / Le Figaro style).

Required output content:
1. Title: Catchy French headline.
2. Subtitle: Journalistic subhead / chapeau in French (1-2 sentences).
3. SourceType: Realistic French media publication name (e.g., "Le Quotidien", "Revue Culture & Société", "L'Écho de Paris", etc.).
4. Author: Journalist byline with specialty.
5. FrenchText: 220-320 words of cohesive, immersive French text.
6. EnglishTranslation: Accurate side-by-side English translation.
7. Glossary: 4-6 key journalistic terms/idioms with French, English, grammatical type, and context sentence.
8. RightOrWrongQuestions: Exactly 3 statements testing who, what, or which claim is right or wrong, with:
   - claim: statement written in French stating what is claimed about the text (e.g. "Selon l'article : ...")
   - isRight: boolean (true if claim is true / accurate according to text, false if wrong)
   - explanation: clear explanation in English citing the passage
   - quote: direct short quote in French from the text
9. ComprehensionQuestions: Exactly 3 multiple-choice reading comprehension questions written in French (CEFR-level French), with 4 French options each, correctIndex (0-3), and a clear English explanation.
10. SummaryExercise:
   - prompt: "Quelle phrase résume le mieux cet article ?"
   - options: 3 summary statements in French (exactly 1 with isBest: true and encouraging English feedback, 2 with isBest: false and pedagogical English feedback explaining why it's incomplete or misleading)
   - sampleSummary: a model 1-2 sentence French summary with English translation in parentheses.
11. OpinionPrompt:
   - question: an engaging question in French asking for the reader's opinion on a SPECIFIC event, claim, person, or debate from THIS article (name a concrete detail from the FrenchText, e.g. a character, a place, a change, or a proposal the article describes). Do not ask a generic question about the topic.
   - context: brief guidance in English on how to respond in French
   - starterPhrases: 4 helpful French sentence starters with English translations in parentheses (e.g., "À mon avis... (In my opinion...)", "Je pense que... (I think that...)")

IMPORTANT: All learner-facing activity text (statements/claims, comprehension questions, answer options, summary options, the opinion question) must be in FRENCH, because this is a French learning platform. Only explanations, feedback, and guidance notes are in English, so the student understands the answers.

Format strictly as JSON with this exact structure:
{
  "title": "Titre en français",
  "subtitle": "Chapeau journalistique...",
  "sourceType": "Nom du média et format",
  "publicationDate": "Date ou édition",
  "author": "Par Prénom Nom, fonction",
  "level": "${level}",
  "frenchText": "Texte complet en français...",
  "englishTranslation": "Full English translation...",
  "glossary": [
    { "french": "mot", "english": "meaning", "type": "noun/verb/adj", "contextSentence": "Exemple..." }
  ],
  "rightOrWrongQuestions": [
    { "claim": "Affirmation en français...", "isRight": true, "explanation": "Explanation in English...", "quote": "Citation en français..." }
  ],
  "comprehensionQuestions": [
    { "question": "Question en français ?", "options": ["Option A", "Option B", "Option C", "Option D"], "correctIndex": 0, "explanation": "Explanation in English..." }
  ],
  "summaryExercise": {
    "prompt": "Quelle phrase résume le mieux cet article ?",
    "options": [
      { "text": "Résumé proposé en français...", "isBest": true, "feedback": "Feedback in English..." }
    ],
    "sampleSummary": "Résumé modèle en français (English translation)."
  },
  "opinionPrompt": {
    "question": "Question en français demandant l'opinion...",
    "context": "Guidance in English...",
    "starterPhrases": ["À mon avis... (In my opinion...)", "Je pense que... (I think that...)"]
  }
}`;

    const result = await generateAiJson(prompt, defaultFallback, {
      task: 'generate-story',
      temperature: 0.95,
      preferOpenRouter: true,
      openRouterTimeoutMs: 90000,
      maxTokens: 8000,
      parseRetries: 1,
    });

    // Ensure all critical fields exist
    const finalData = {
      ...defaultFallback,
      ...result,
      level,
      rightOrWrongQuestions: Array.isArray(result?.rightOrWrongQuestions) && result.rightOrWrongQuestions.length > 0
        ? result.rightOrWrongQuestions
        : defaultFallback.rightOrWrongQuestions,
      comprehensionQuestions: Array.isArray(result?.comprehensionQuestions) && result.comprehensionQuestions.length > 0
        ? result.comprehensionQuestions
        : defaultFallback.comprehensionQuestions,
      summaryExercise: result?.summaryExercise || defaultFallback.summaryExercise,
      opinionPrompt: result?.opinionPrompt || defaultFallback.opinionPrompt,
      grammarFocus: grammarUnit
        ? { unitNumber: grammarUnit.unitNumber, title: grammarUnit.title }
        : null,
    };

    res.json(finalData);
  } catch (error) {
    console.error('Error in /api/ai/generate-story:', error);
    res.json(defaultFallback);
  }
});

export default router;
