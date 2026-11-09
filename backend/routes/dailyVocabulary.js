import { Router } from 'express';
import { generateAiJson } from '../services/ai.js';

const router = Router();

// Daily AI Vocabulary Generator from Different Areas
router.post('/ai/generate-daily-vocabulary', async (req, res) => {
  const {
    area = 'Gastronomy & Culinary Arts',
    level = 'A1',
    date = new Date().toISOString().split('T')[0],
    count = 6,
  } = req.body;

  const areaFallbacks = {
    'Gastronomy & Culinary Arts': {
      area: 'Gastronomy & Culinary Arts',
      areaTitle: 'La Gastronomie & Les Arts Culinaires',
      level,
      date,
      dailyQuote: {
        french: "La gastronomie est l'art d'utiliser la nourriture pour créer le bonheur.",
        english: "Gastronomy is the art of using food to create happiness.",
        author: "Théodore Zeldin"
      },
      areaOverview: "French cuisine is designated by UNESCO as intangible cultural heritage. Mastering culinary terms connects you directly with the French art de vivre.",
      vocabulary: [
        {
          id: `daily-gastronomy-1-${date}`,
          french: "le terroir",
          english: "local soil / regional culinary heritage",
          category: "Gastronomy & Culinary Arts",
          level,
          gender: "m",
          partOfSpeech: "noun",
          ipa: "/tɛʁ.waʁ/",
          exampleFrench: "Ce fromage tire toute sa saveur du terroir normand.",
          exampleEnglish: "This cheese draws all its flavor from the Normandy terroir.",
          usageNote: "Essential French concept describing how soil, climate, and local artisan tradition shape food or wine flavor."
        },
        {
          id: `daily-gastronomy-2-${date}`,
          french: "déguster",
          english: "to savor / to taste mindfully",
          category: "Gastronomy & Culinary Arts",
          level,
          gender: null,
          partOfSpeech: "verb",
          ipa: "/de.ɡys.te/",
          exampleFrench: "Nous dégustons une tarte aux pommes faite maison.",
          exampleEnglish: "We are savoring a homemade apple tart.",
          usageNote: "Goes beyond simply 'manger' (to eat); implies taking your time to appreciate culinary subtleties."
        },
        {
          id: `daily-gastronomy-3-${date}`,
          french: "le croustillant",
          english: "crispiness / crunchiness",
          category: "Gastronomy & Culinary Arts",
          level,
          gender: "m",
          partOfSpeech: "noun",
          ipa: "/kʁus.ti.jɑ̃/",
          exampleFrench: "Cette baguette dorée a un croustillant parfait.",
          exampleEnglish: "This golden baguette has a perfect crunchiness.",
          usageNote: "Frequently praised by French bakers and food critics to describe bread crust or pastry flakiness."
        },
        {
          id: `daily-gastronomy-4-${date}`,
          french: "mijoter",
          english: "to simmer gently / to slow-cook",
          category: "Gastronomy & Culinary Arts",
          level,
          gender: null,
          partOfSpeech: "verb",
          ipa: "/mi.ʒɔ.te/",
          exampleFrench: "Le bœuf bourguignon doit mijoter pendant trois heures.",
          exampleEnglish: "The beef bourguignon needs to simmer for three hours.",
          usageNote: "Also used figuratively in French: 'Qu'est-ce que tu mijotes ?' means 'What are you cooking up / plotting?'."
        },
        {
          id: `daily-gastronomy-5-${date}`,
          french: "l'amuse-bouche",
          english: "appetizer / palate pleaser",
          category: "Gastronomy & Culinary Arts",
          level,
          gender: "m",
          partOfSpeech: "noun",
          ipa: "/a.myz.buʃ/",
          exampleFrench: "Le chef nous offre un délicieux amuse-bouche à la truffe.",
          exampleEnglish: "The chef offers us a delicious truffle appetizer.",
          usageNote: "A complimentary bite-sized savory treat served before the appetizer in French bistros and restaurants."
        },
        {
          id: `daily-gastronomy-6-${date}`,
          french: "savoureux / savoureuse",
          english: "flavorful / tasty / delectable",
          category: "Gastronomy & Culinary Arts",
          level,
          gender: null,
          partOfSpeech: "adjective",
          ipa: "/sa.vu.ʁø/",
          exampleFrench: "Cette sauce aux morilles est particulièrement savoureuse.",
          exampleEnglish: "This morel mushroom sauce is particularly flavorful.",
          usageNote: "An elegant alternative to everyday 'bon' (good) when reviewing a meal."
        }
      ]
    },
    'Art & Architecture': {
      area: 'Art & Architecture',
      areaTitle: "L'Art, le Patrimoine & l'Architecture",
      level,
      date,
      dailyQuote: {
        french: "L'art lave notre âme de la poussière du quotidien.",
        english: "Art washes away from the soul the dust of everyday life.",
        author: "Pablo Picasso"
      },
      areaOverview: "From Gothic cathedrals and Haussmannian boulevards to avant-garde galleries, artistic vocabulary is woven into the fabric of French society.",
      vocabulary: [
        {
          id: `daily-art-1-${date}`,
          french: "le chef-d'œuvre",
          english: "masterpiece",
          category: "Art & Architecture",
          level,
          gender: "m",
          partOfSpeech: "noun",
          ipa: "/ʃɛf.d‿œvʁ/",
          exampleFrench: "La Joconde est le chef-d'œuvre le plus célèbre du musée du Louvre.",
          exampleEnglish: "The Mona Lisa is the most famous masterpiece of the Louvre museum.",
          usageNote: "Plural form is 'des chefs-d'œuvre'. Refers to an artist's crowning achievement."
        },
        {
          id: `daily-art-2-${date}`,
          french: "l'édifice",
          english: "historic building / edifice / monument",
          category: "Art & Architecture",
          level,
          gender: "m",
          partOfSpeech: "noun",
          ipa: "/e.di.fis/",
          exampleFrench: "Cet édifice médiéval a été restauré avec soin.",
          exampleEnglish: "This medieval building was restored with care.",
          usageNote: "More noble and monumental than the standard word 'bâtiment' (building)."
        },
        {
          id: `daily-art-3-${date}`,
          french: "la fresque",
          english: "fresco / large mural painting",
          category: "Art & Architecture",
          level,
          gender: "f",
          partOfSpeech: "noun",
          ipa: "/fʁɛsk/",
          exampleFrench: "L'artiste a peint une fresque monumentale sur la façade.",
          exampleEnglish: "The artist painted a monumental fresco on the facade.",
          usageNote: "Can also describe a grand historical novel or narrative (une fresque historique)."
        },
        {
          id: `daily-art-4-${date}`,
          french: "la verrière",
          english: "glass roof / skylight / glass canopy",
          category: "Art & Architecture",
          level,
          gender: "f",
          partOfSpeech: "noun",
          ipa: "/vɛ.ʁjɛʁ/",
          exampleFrench: "La lumière pénètre à travers la grande verrière de l'atelier.",
          exampleEnglish: "Light enters through the large glass canopy of the atelier.",
          usageNote: "Iconic architectural feature of classic Parisian artist studios and 19th-century railway stations."
        },
        {
          id: `daily-art-5-${date}`,
          french: "harmonieux / harmonieuse",
          english: "harmonious / well-balanced",
          category: "Art & Architecture",
          level,
          gender: null,
          partOfSpeech: "adjective",
          ipa: "/aʁ.mɔ.njø/",
          exampleFrench: "Les proportions de cette place royale sont très harmonieuses.",
          exampleEnglish: "The proportions of this royal square are very harmonious.",
          usageNote: "Standard praise used in French architectural critique when balance and symmetry align."
        },
        {
          id: `daily-art-6-${date}`,
          french: "le vernissage",
          english: "exhibition opening reception",
          category: "Art & Architecture",
          level,
          gender: "m",
          partOfSpeech: "noun",
          ipa: "/vɛʁ.ni.saʒ/",
          exampleFrench: "Nous sommes invités au vernissage de la nouvelle galerie ce soir.",
          exampleEnglish: "We are invited to the exhibition opening reception of the new gallery tonight.",
          usageNote: "Originally the day artists applied varnish to dry oil paintings before public unveiling; now means the opening cocktail party."
        }
      ]
    },
    'Technology & Innovation': {
      area: 'Technology & Innovation',
      areaTitle: 'La Technologie & Les Innovations Numériques',
      level,
      date,
      dailyQuote: {
        french: "Le progrès ne vaut que s'il est partagé par tous.",
        english: "Progress is only worthy if it is shared by all.",
        author: "Aristote (devise technologique)"
      },
      areaOverview: "The Francophone tech ecosystem (la French Tech) combines engineering precision with philosophical questions about digital ethics.",
      vocabulary: [
        {
          id: `daily-tech-1-${date}`,
          french: "l'algorithme",
          english: "algorithm",
          category: "Technology & Innovation",
          level,
          gender: "m",
          partOfSpeech: "noun",
          ipa: "/al.ɡɔ.ʁitm/",
          exampleFrench: "Cet algorithme d'apprentissage optimise le traitement des données.",
          exampleEnglish: "This machine learning algorithm optimizes data processing.",
          usageNote: "Masculine noun, often paired with 'de recommandation' (recommendation algorithm)."
        },
        {
          id: `daily-tech-2-${date}`,
          french: "le logiciel",
          english: "software program",
          category: "Technology & Innovation",
          level,
          gender: "m",
          partOfSpeech: "noun",
          ipa: "/lɔ.ʒi.sjɛl/",
          exampleFrench: "L'équipe développe un logiciel libre et sécurisé.",
          exampleEnglish: "The team is developing free open-source and secure software.",
          usageNote: "Coined by French linguists to avoid English loanwords; ubiquitous across French tech."
        },
        {
          id: `daily-tech-3-${date}`,
          french: "télécharger",
          english: "to download / to upload",
          category: "Technology & Innovation",
          level,
          gender: null,
          partOfSpeech: "verb",
          ipa: "/te.le.ʃaʁ.ʒe/",
          exampleFrench: "Vous pouvez télécharger la mise à jour dès maintenant.",
          exampleEnglish: "You can download the update right now.",
          usageNote: "Used for both downloading and uploading; 'téléverser' specifically denotes uploading."
        },
        {
          id: `daily-tech-4-${date}`,
          french: "l'infonuagique",
          english: "cloud computing",
          category: "Technology & Innovation",
          level,
          gender: "f",
          partOfSpeech: "noun",
          ipa: "/ɛ̃.fɔ.nɥa.ʒik/",
          exampleFrench: "Nos serveurs sont hébergés dans l'infonuagique.",
          exampleEnglish: "Our servers are hosted in cloud computing.",
          usageNote: "Official French term ('le cloud' is also commonly heard in colloquial European French)."
        },
        {
          id: `daily-tech-5-${date}`,
          french: "sécurisé / sécurisée",
          english: "secure / encrypted / protected",
          category: "Technology & Innovation",
          level,
          gender: null,
          partOfSpeech: "adjective",
          ipa: "/se.ky.ʁi.ze/",
          exampleFrench: "Toutes les transactions bancaires se font sur un réseau sécurisé.",
          exampleEnglish: "All banking transactions take place on a secure network.",
          usageNote: "High-frequency term seen on every French checkout and login screen."
        },
        {
          id: `daily-tech-6-${date}`,
          french: "l'intelligence artificielle",
          english: "artificial intelligence (AI)",
          category: "Technology & Innovation",
          level,
          gender: "f",
          partOfSpeech: "noun",
          ipa: "/ɛ̃.tɛ.li.ʒɑ̃s aʁ.ti.fi.sjɛl/",
          exampleFrench: "L'intelligence artificielle transforme l'apprentissage des langues.",
          exampleEnglish: "Artificial intelligence transforms language learning.",
          usageNote: "Abbreviated as 'l'IA' (pronounced 'ee-ah') in French media and discourse."
        }
      ]
    }
  };

  const selectedFallback = areaFallbacks[area] || areaFallbacks['Gastronomy & Culinary Arts'];

  try {
    const prompt = `You are a distinguished French lexicographer and CEFR pedagogical expert at the Académie de Français.
Generate a rich, authentic Daily French Vocabulary collection from the specific thematic area: "${area}".
Target CEFR Level: "${level}"
Today's Date: "${date}"
Number of words: exactly ${count}

Specifications:
- Target Area / Domain: "${area}"
- Level ${level} adjustments:
  - If A1: Everyday accessible terms from this field, clear cognates, present tense examples, simple sentence syntax.
  - If A2: Practical, conversational vocabulary from this domain with useful verb collocations and descriptive adjectives.
  - If B1: Nuanced professional and cultural terminology with expressive examples using conjunctions and past tenses.
  - If B2: Specialized, sophisticated lexical items, idioms, and stylistic nuances typical of French broadsheets and debates.
- Ensure words are strictly relevant to the chosen field "${area}".
- Provide authentic IPA phonetic transcription for each word.
- For each noun, explicitly specify gender ("m" or "f"). For verbs, adjectives, expressions, set gender to null.
- For each word, provide:
  1. french: exact French term (with accurate accents: é, è, ê, ç, à, etc.)
  2. english: precise English translation and nuance
  3. category: "${area}"
  4. level: "${level}"
  5. gender: "m" | "f" | null
  6. partOfSpeech: "noun" | "verb" | "adjective" | "expression" | "adverb"
  7. ipa: phonetic transcription enclosed in slashes e.g. "/tɛʁ.waʁ/"
  8. exampleFrench: a natural, authentic sentence in French contextualizing this word in this field
  9. exampleEnglish: accurate English translation of the example sentence
  10. usageNote: practical cultural or grammatical insight in English (1 sentence) explaining how native French speakers employ this term in this domain.
- Also include:
  - areaTitle: poetic or formal French title for this domain
  - dailyQuote: an authentic French proverb or quote from a notable thinker/figure regarding this domain, with french, english, and author.
  - areaOverview: 1-2 sentence English introduction on why this vocabulary domain matters in French culture.

Format STRICTLY as valid JSON matching this schema:
{
  "area": "${area}",
  "areaTitle": "Titre en français de ce domaine",
  "level": "${level}",
  "date": "${date}",
  "areaOverview": "Overview in English...",
  "dailyQuote": {
    "french": "Citation en français...",
    "english": "English translation...",
    "author": "Nom de l'auteur"
  },
  "vocabulary": [
    {
      "id": "daily-${area.toLowerCase().replace(/[^a-z0-9]/g, '-')}-1-${date}",
      "french": "mot en français",
      "english": "English translation",
      "category": "${area}",
      "level": "${level}",
      "gender": "m",
      "partOfSpeech": "noun",
      "ipa": "/.../",
      "exampleFrench": "Phrase d'exemple...",
      "exampleEnglish": "Example sentence translation...",
      "usageNote": "Usage tip in English..."
    }
  ]
}`;

    const result = await generateAiJson(prompt, selectedFallback, {
      task: 'generate-daily-vocabulary',
      temperature: 0.7,
      preferOpenRouter: true,
      openRouterTimeoutMs: 16000,
      maxTokens: 2500,
    });

    const finalVocab = Array.isArray(result?.vocabulary) && result.vocabulary.length > 0
      ? result.vocabulary.map((item, idx) => ({
          ...item,
          id: item.id || `daily-${idx + 1}-${date}-${Date.now()}`,
          category: area,
          level: level,
        }))
      : selectedFallback.vocabulary;

    res.json({
      area,
      areaTitle: result?.areaTitle || selectedFallback.areaTitle,
      level,
      date,
      areaOverview: result?.areaOverview || selectedFallback.areaOverview,
      dailyQuote: result?.dailyQuote || selectedFallback.dailyQuote,
      vocabulary: finalVocab,
    });
  } catch (error) {
    console.error('Error in /api/ai/generate-daily-vocabulary:', error);
    res.json(selectedFallback);
  }
});

export default router;
