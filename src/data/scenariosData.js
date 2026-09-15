export const ROLEPLAY_SCENARIOS = [
  {
    id: 'sc-cafe',
    title: 'Ordering at a Parisian Café',
    frenchTitle: 'Au Café Parisien',
    level: 'A1',
    location: 'Café de Flore, Saint-Germain-des-Prés, Paris',
    icon: '☕',
    description: 'You sit down on the terrace of a bustling Parisian café. The waiter approaches with a tray to take your order.',
    character: {
      name: 'Henri',
      role: 'Serveur Parisien',
      avatar: '👨🏻‍🍳',
      personality: 'Efficient, witty, polite, proud of traditional French roast and viennoiseries.'
    },
    starterMessage: 'Bonjour madame / monsieur ! Bienvenue au Café. Qu\'est-ce qui vous ferait plaisir aujourd\'hui ?',
    starterTranslation: 'Hello madam / sir! Welcome to the Café. What would bring you pleasure today?',
    recommendedObjectives: [
      'Order a coffee (un café noir / un café crème) and a pastry (un croissant)',
      'Ask for a glass or carafe of tap water (une carafe d\'eau)',
      'Politely request the check (l\'addition, s\'il vous plaît)'
    ],
    suggestedPhrases: [
      { french: 'Bonjour ! Je voudrais un café crème et un croissant, s\'il vous plaît.', english: 'Hello! I would like a coffee with cream and a croissant, please.' },
      { french: 'Est-ce que je pourrais avoir une carafe d\'eau ?', english: 'Could I please have a carafe of tap water?' },
      { french: 'Combien est-ce que je vous dois ?', english: 'How much do I owe you?' },
      { french: 'L\'addition s\'il vous plaît ! Est-ce que vous prenez la carte ?', english: 'The bill please! Do you take cards?' }
    ]
  },
  {
    id: 'sc-hotel',
    title: 'Hotel Check-in on the French Riviera',
    frenchTitle: 'À la Réception de l\'Hôtel à Nice',
    level: 'A2',
    location: 'Hôtel Beau Rivage, Promenade des Anglais, Nice',
    icon: '🏨',
    description: 'You have just landed in Nice and arrived at your boutique hotel. Check in, confirm your room, and ask for local dining recommendations.',
    character: {
      name: 'Camille',
      role: 'Réceptionniste de l\'Hôtel',
      avatar: '👩🏼‍💼',
      personality: 'Warm, welcoming, very helpful with recommendations for Côte d\'Azur.'
    },
    starterMessage: 'Bonsoir et bienvenue à Nice ! Avez-vous une réservation chez nous pour ce soir ?',
    starterTranslation: 'Good evening and welcome to Nice! Do you have a reservation with us for tonight?',
    recommendedObjectives: [
      'Give your name and confirm a reservation for 3 nights',
      'Ask what time breakfast is served (le petit-déjeuner)',
      'Ask if there is a room with a balcony or sea view (vue sur la mer)',
      'Inquire about the Wi-Fi password'
    ],
    suggestedPhrases: [
      { french: 'J\'ai une réservation au nom de Martin pour trois nuits.', english: 'I have a reservation under the name Martin for three nights.' },
      { french: 'À quelle heure est servi le petit-déjeuner demain matin ?', english: 'What time is breakfast served tomorrow morning?' },
      { french: 'Quel est le code du réseau Wi-Fi, s\'il vous plaît ?', english: 'What is the Wi-Fi password, please?' },
      { french: 'Avez-vous un bon restaurant niçois à nous conseiller ?', english: 'Do you have a good local Nicois restaurant to recommend?' }
    ]
  },
  {
    id: 'sc-boulangerie',
    title: 'The Neighborhood Boulangerie',
    frenchTitle: 'À la Boulangerie Artisanale',
    level: 'A1',
    location: 'Boulangerie du Marais, Paris',
    icon: '🥖',
    description: 'The aroma of fresh sourdough and butter croissants fills the air. It is your turn in line at the neighborhood artisan bakery.',
    character: {
      name: 'Madame Dupont',
      role: 'Boulangère',
      avatar: '🥖',
      personality: 'Friendly, fast-paced, proud of freshly baked baguettes.'
    },
    starterMessage: 'Bonjour ! Qu\'est-ce qu\'il vous faudra aujourd\'hui ? Une tradition bien cuite ?',
    starterTranslation: 'Hello! What will you have today? A well-baked traditional baguette?',
    recommendedObjectives: [
      'Order two traditional baguettes (deux baguettes tradition)',
      'Choose a pastry (un pain au chocolat or un éclair au café)',
      'Pay in cash or contactless card (sans contact)'
    ],
    suggestedPhrases: [
      { french: 'Une baguette tradition pas trop cuite, s\'il vous plaît.', english: 'A traditional baguette not too well done, please.' },
      { french: 'Et deux pains au chocolat aussi, s\'il vous plaît.', english: 'And two chocolate croissants as well, please.' },
      { french: 'Est-ce que je peux payer par carte sans contact ?', english: 'Can I pay by contactless card?' },
      { french: 'Merci beaucoup, bonne journée !', english: 'Thank you very much, have a nice day!' }
    ]
  },
  {
    id: 'sc-interview',
    title: 'Job Interview in Paris',
    frenchTitle: 'Entretien d\'Embauche',
    level: 'B2',
    location: 'La Défense, Paris',
    icon: '💼',
    description: 'You are interviewing for a role at a French tech consulting company. Practice formal business French, career background, and motivations.',
    character: {
      name: 'Monsieur Laurent',
      role: 'Directeur des Ressources Humaines',
      avatar: '👨🏽‍💼',
      personality: 'Professional, articulate, evaluates clarity of expression and motivation.'
    },
    starterMessage: 'Bonjour et merci d\'être venu. Pour commencer notre échange, pourriez-vous vous présenter brièvement et m\'expliquer votre parcours ?',
    starterTranslation: 'Hello and thank you for coming. To begin our discussion, could you briefly introduce yourself and explain your background?',
    recommendedObjectives: [
      'Introduce your professional background and passions',
      'Explain why you want to work in France or in this specific role',
      'Highlight a key strength and how you solve team challenges'
    ],
    suggestedPhrases: [
      { french: 'Avec grand plaisir. Après mes études, j\'ai travaillé pendant trois ans dans la gestion de projets.', english: 'With great pleasure. After my studies, I worked for three years in project management.' },
      { french: 'Ce qui me motive particulièrement dans votre entreprise, c\'est votre approche innovante.', english: 'What particularly motivates me in your company is your innovative approach.' },
      { french: 'Je sais m\'adapter rapidement à de nouveaux environnements et collaborer en équipe.', english: 'I adapt quickly to new environments and collaborate effectively in teams.' }
    ]
  },
  {
    id: 'sc-museum',
    title: 'Guided Discussion at the Louvre',
    frenchTitle: 'Visite au Musée du Louvre',
    level: 'B1',
    location: 'Musée du Louvre, Paris',
    icon: '🎨',
    description: 'You are viewing masterpieces in the Denon wing of the Louvre with an art historian docent.',
    character: {
      name: 'Élise',
      role: 'Guide Conférencière d\'Art',
      avatar: '👩🏻‍🎨',
      personality: 'Passionate about French classical art, Renaissance painting, and cultural history.'
    },
    starterMessage: 'Bienvenue dans la galerie Denon ! Devant nous se trouve La Joconde de Léonard de Vinci. Qu\'est-ce qui vous frappe dans ce tableau ?',
    starterTranslation: 'Welcome to the Denon gallery! In front of us is the Mona Lisa by Leonardo da Vinci. What strikes you about this painting?',
    recommendedObjectives: [
      'Describe your impressions of the colors, light, and expression (le regard, les couleurs)',
      'Ask about the history of the painting in France',
      'Ask where the French romantic paintings (La Liberté guidant le peuple) are located'
    ],
    suggestedPhrases: [
      { french: 'Le jeu d\'ombre et de lumière est vraiment fascinant.', english: 'The play of light and shadow is truly fascinating.' },
      { french: 'Depuis quand ce tableau fait-il partie de la collection royale française ?', english: 'Since when has this painting been part of the French royal collection?' },
      { french: 'Dans quelle aile peut-on admirer les toiles d\'Eugène Delacroix ?', english: 'In which wing can we admire the paintings of Eugène Delacroix?' }
    ]
  }
];
