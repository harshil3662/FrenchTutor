export const PRONUNCIATION_DRILLS = [
  {
    id: 'p-nasals',
    title: 'Les Voyelles Nasales (on, an/en, in/ain, un)',
    soundCategory: 'Nasal Vowels',
    soundIpa: '/ɔ̃/, /ɑ̃/, /ɛ̃/, /œ̃/',
    description: 'Nasal vowels are unique to French. Air flows simultaneously through the mouth and nose without sounding an "n" or "m" consonant at the end.',
    mouthGuide: 'Keep your tongue flat on the floor of the mouth and do not close your lips or touch your teeth with your tongue at the end of the vowel.',
    audioGuideTip: 'Drop the final "N" sound completely and let the vowel resonate in your nasal cavity.',
    targetPhrases: [
      {
        french: 'Un bon vin blanc',
        english: 'A good white wine (features all 4 nasal sounds!)',
        ipa: '/œ̃ bɔ̃ vɛ̃ blɑ̃/',
        breakdownNote: 'Notice the progression: un (/œ̃/), bon (/ɔ̃/), vin (/ɛ̃/), blanc (/ɑ̃/).'
      },
      {
        french: 'Pendant mon voyage en France',
        english: 'During my trip in France',
        ipa: '/pɑ̃.dɑ̃ mɔ̃ vwa.jaʒ ɑ̃ fʁɑ̃s/',
        breakdownNote: 'Keep the vowels open and resonant without closing on the "n".'
      },
      {
        french: 'C\'est très simple et élégant',
        english: 'It is very simple and elegant',
        ipa: '/s‿ɛ tʁɛ sɛ̃pl e e.le.ɡɑ̃/',
        breakdownNote: 'The "-im" in simple makes the /ɛ̃/ nasal sound.'
      }
    ],
    tongueTwister: {
      french: 'Cinq chiens chassent six chats dans le champ de lin.',
      english: 'Five dogs hunt six cats in the flax field.',
      focusSound: 'Nasal /ɛ̃/ and /ɑ̃/'
    }
  },
  {
    id: 'p-guttural-r',
    title: 'Le "R" Français Guttural (Uvular Fricative)',
    soundCategory: 'The French R',
    soundIpa: '/ʁ/',
    description: 'Unlike the rolled Spanish "R" or English retroflex "R", the French "R" is produced by gently vibrating the back of the tongue against the uvula (the soft palate in the back of your throat).',
    mouthGuide: 'Gargle gently without water. Place the back of your tongue lightly against the soft palate in the throat and exhale softly.',
    audioGuideTip: 'Think of clearing your throat very softly or making a gentle cat purr.',
    targetPhrases: [
      {
        french: 'Regarde la Tour Eiffel à Paris',
        english: 'Look at the Eiffel Tower in Paris',
        ipa: '/ʁə.ɡaʁd la tuʁ ɛ.fɛl a pa.ʁi/',
        breakdownNote: 'Soft throat friction on Re-, -garde, Tour, and Pa-ris.'
      },
      {
        french: 'C\'est vraiment très agréable',
        english: 'It is really very pleasant',
        ipa: '/s‿ɛ vʁɛ.mɑ̃ tʁɛ.z‿a.ɡʁe.abl/',
        breakdownNote: 'Vraiment and très have quick, crisp French Rs.'
      },
      {
        french: 'Un croissant au beurre frais',
        english: 'A fresh butter croissant',
        ipa: '/œ̃ kʁwa.sɑ̃ o bœʁ fʁɛ/',
        breakdownNote: 'Notice the R in croissant, beurre, and frais.'
      }
    ],
    tongueTwister: {
      french: 'Un renard roux regarde un rat dans la rue de Rennes.',
      english: 'A red fox looks at a rat in the street of Rennes.',
      focusSound: 'Uvular /ʁ/'
    }
  },
  {
    id: 'p-u-vs-ou',
    title: 'La Différence Cruciale : "U" vs "OU"',
    soundCategory: 'U vs OU',
    soundIpa: '/y/ vs /u/',
    description: 'Mixing up "u" (/y/) and "ou" (/u/) can change meanings completely: "tu" (you) vs "tout" (all), "dessus" (on top) vs "dessous" (underneath).',
    mouthGuide: 'For "U" (/y/): Say "ee" (as in cheese), but without moving your tongue, round your lips tightly like whistling. For "OU" (/u/): Standard English "oo" sound as in "soup".',
    audioGuideTip: 'Keep your tongue anchored behind your lower front teeth while puckering your lips for /y/.',
    targetPhrases: [
      {
        french: 'Tu as bu tout le jus de fruit ?',
        english: 'Did you drink all the fruit juice?',
        ipa: '/ty a by tu lə ʒy də fʁɥi/',
        breakdownNote: 'Contrast: "Tu" (/ty/), "bu" (/by/), "jus" (/ʒy/) vs "tout" (/tu/).'
      },
      {
        french: 'C\'est au-dessus ou au-dessous ?',
        english: 'Is it above or below?',
        ipa: '/s‿ɛ o.d(ə).sy u o.d(ə).su/',
        breakdownNote: 'Dessus = above (/sy/). Dessous = below (/su/).'
      },
      {
        french: 'Une soupe pour une personne',
        english: 'A soup for one person',
        ipa: '/yn sup puʁ yn pɛʁ.sɔn/',
        breakdownNote: 'Une (/yn/) vs soupe (/sup/) vs pour (/puʁ/).'
      }
    ],
    tongueTwister: {
      french: 'As-tu vu le tutu de tulle de Lulu ?',
      english: 'Did you see Lulu\'s tulle tutu?',
      focusSound: 'Vowel /y/ (French U)'
    }
  },
  {
    id: 'p-liaison',
    title: 'Les Liaisons & Lettres Muettes',
    soundCategory: 'Liaisons & Silent Endings',
    soundIpa: '[z], [t], [n] links',
    description: 'French words are spoken in smooth acoustic flow. When a word ends with a normally silent consonant and is followed by a vowel or mute H, that consonant is pronounced as a bridge.',
    mouthGuide: 'Do not pause between the words. Treat the linked words as one single continuous rhythmic unit.',
    audioGuideTip: 'Final "s" sounds like [z]: "Les amis" sounds like "Lay-zah-mee".',
    targetPhrases: [
      {
        french: 'Les_amis vont aux_États-Unis',
        english: 'The friends are going to the United States',
        ipa: '/le.z‿a.mi vɔ̃ o.z‿e.ta.z‿y.ni/',
        breakdownNote: 'Liaisons: Les[z]amis, aux[z]États[z]Unis.'
      },
      {
        french: 'Vous_avez un grand_homme devant vous',
        english: 'You have a great man in front of you',
        ipa: '/vu.z‿a.ve œ̃ ɡʁɑ̃.t‿ɔm də.vɑ̃ vu/',
        breakdownNote: 'Vous[z]avez and grand[t]homme (d turns into t sound).'
      },
      {
        french: 'C\'est_un très_bon_hôtel',
        english: 'It is a very good hotel',
        ipa: '/s‿ɛ.t‿œ̃ tʁɛ.z‿bɔ̃.n‿o.tɛl/',
        breakdownNote: 'C\'est[t]un and bon[n]hôtel with silent H.'
      }
    ],
    tongueTwister: {
      french: 'Six beaux oiseaux sous un arbre s\'envolent en silence.',
      english: 'Six beautiful birds under a tree take flight in silence.',
      focusSound: 'Smooth [z] liaisons and fluid phrasing'
    }
  }
];
