// // A pool of impromptu "table topics" style prompts, roughly sized for a 1-minute answer.
// // Edit freely — add your own topics or swap in ones specific to your practice goals.
// export const TOPICS: string[] = [
//   "Describe the best meal you've ever eaten and why it's stuck with you.",
//   "If you could master any skill overnight, what would it be and how would you use it?",
//   "What's a piece of advice you received that you initially ignored, then later realized was right?",
//   "Convince someone to visit your hometown in under a minute.",
//   "What does 'success' mean to you, personally?",
//   "Describe a moment you had to think on your feet.",
//   "What's a small daily habit that's had an outsized impact on your life?",
//   "If you had an extra hour every day, how would you spend it?",
//   "What's a book, film, or show that changed how you see the world?",
//   "Explain your job to a curious eight-year-old.",
//   "What's the most useful thing you learned outside of school?",
//   "Describe your ideal Saturday from morning to night.",
//   "What's a common assumption people make about you that's wrong?",
//   "If you could have dinner with anyone, living or dead, who and why?",
//   "What's a risk you took that paid off?",
//   "Describe a time you changed your mind about something important.",
//   "What would you do with an unexpected free week and no obligations?",
//   "What's one thing you wish more people understood about your field or hobby?",
//   "Pitch an idea for a product that doesn't exist yet but should.",
//   "What does a perfect work environment look like to you?",
//   "Describe the view from your favorite place in the world.",
//   "What's something you believed as a kid that turned out to be completely wrong?",
//   "If your life had a theme song right now, what would it be and why?",
//   "What's the hardest decision you've had to make this year?",
//   "Describe a time a stranger's kindness stuck with you.",
//   "What's a skill you think everyone should learn, regardless of career?",
//   "If you were mayor of your city for a day, what's the first thing you'd change?",
//   "What does 'home' mean to you?",
//   "Describe your morning routine and why it works (or doesn't) for you.",
//   "What's a compliment you received that you still think about?",
//   "If you could instantly become fluent in one language, which would you choose and why?",
//   "What's the best piece of feedback you've ever gotten?",
//   "Describe a challenge you're currently working through.",
//   "What's something you do differently than most people?",
//   "If you had to teach a class on any topic tomorrow, what would you teach?",
//   "What's a tradition, from your family or culture, that means a lot to you?",
//   "Describe the last time you laughed until it hurt.",
//   "What does being a good friend look like, in practice?",
//   "If you could send one piece of advice back to yourself five years ago, what would it be?",
//   "What's a fear you've overcome, or are working on overcoming?",
//   "Describe a place you've never been but really want to visit.",
//   "What's the most interesting thing you've learned this month?",
//   "If you had to give up your phone for a month, what would you miss most — and least?",
//   "What's a decision you're glad you made, even though it was hard at the time?",
//   "Describe your ideal way to spend a rainy afternoon.",
//   "What's something you're better at now than you were a year ago?",
//   "If you could ask your future self one question, what would it be?",
//   "What's a myth about your generation you'd like to correct?",
//   "Describe a mentor or role model and what you learned from them.",
//   "What's one change you'd make to how school prepares people for the real world?",
//   "If you could design your own holiday, what would it celebrate and how?",
//   "What's the most spontaneous thing you've ever done?",
//   "Describe a project you're proud of and what made it hard.",
//   "What's something you took for granted until you didn't have it anymore?",
//   "If you were starting a business tomorrow, what problem would you solve?",
//   "What's a piece of technology that's genuinely made your life better?",
//   "Describe how you handle disagreement with someone you care about.",
//   "What's a habit you're trying to build or break right now?",
//   "If you could relive one day exactly as it happened, which would you choose?",
//   "What's the best question someone's ever asked you?",
// ];

// export function getRandomTopic(previousTopic: string | null): string {
//   if (TOPICS.length === 1) return TOPICS[0];
//   let next = previousTopic;
//   while (next === previousTopic) {
//     next = TOPICS[Math.floor(Math.random() * TOPICS.length)];
//   }
//   return next as string;
// }

// Curiosity + vocabulary topic pool.
// Each topic gives a short "spark" (not the full answer), a few things to
// look into during the 10-minute research window, 5 target vocabulary
// words to try using in the spoken explanation, and a "reveal" — the
// satisfying full answer shown at the end as a "Now You Know" card.

export type TopicCategory = "nature" | "technology" | "human" | "space" | "everyday" | "science";

export interface VocabWord {
  word: string;
  definition: string;
}

export interface Topic {
  id: string;
  category: TopicCategory;
  question: string;
  spark: string;
  lookInto: string[];
  vocabWords: VocabWord[];
  reveal: string;
}

export const TOPICS: Topic[] = [
  {
    id: "tree-communication",
    category: "nature",
    question: "How does a tree communicate with other trees?",
    spark:
      "Trees aren't as alone as they look. Underground, something is quietly connecting entire forests to each other.",
    lookInto: ["mycorrhizal networks", "fungi and tree roots", "nutrient exchange"],
    vocabWords: [
      { word: "symbiosis", definition: "a mutually beneficial relationship between two organisms" },
      { word: "mycorrhiza", definition: "a fungus that grows in association with a plant's roots" },
      { word: "nutrients", definition: "substances that provide nourishment for growth" },
      { word: "signaling", definition: "sending information from one organism to another" },
      { word: "ecosystem", definition: "a community of living things interacting with their environment" },
    ],
    reveal:
      "Trees connect through underground fungal networks called mycorrhizae, sometimes nicknamed the 'wood wide web.' Through these networks, trees share nutrients, water, and even warning signals about insect attacks or drought with neighboring trees — including different species.",
  },
  {
    id: "gps",
    category: "technology",
    question: "How does GPS know exactly where you are?",
    spark:
      "Your phone isn't guessing your location — it's doing math using signals from objects moving 20,000 km above your head.",
    lookInto: ["GPS satellites", "signal timing", "triangulation/trilateration"],
    vocabWords: [
      { word: "satellite", definition: "an object that orbits a planet, used here to broadcast signals" },
      { word: "trilateration", definition: "finding a location using distances from three or more known points" },
      { word: "signal", definition: "a transmitted piece of information, like a radio wave" },
      { word: "orbit", definition: "the curved path an object takes around another body in space" },
      { word: "precision", definition: "the degree of exactness or accuracy" },
    ],
    reveal:
      "GPS satellites constantly broadcast the exact time and their position. Your phone measures how long each signal took to arrive, calculates the distance to at least four satellites, and uses trilateration to pinpoint where those distances all overlap — that overlap point is you.",
  },
  {
    id: "deja-vu",
    category: "human",
    question: "Why do we get déjà vu?",
    spark:
      "That eerie feeling of 'I've done this exact moment before' has a few competing scientific explanations — none of them involve time travel.",
    lookInto: ["memory processing", "brain misfiring theories", "temporal lobe"],
    vocabWords: [
      { word: "familiarity", definition: "the feeling of already knowing or recognizing something" },
      { word: "temporal lobe", definition: "a region of the brain involved in memory and processing sound" },
      { word: "cognition", definition: "the mental process of acquiring knowledge and understanding" },
      { word: "glitch", definition: "a minor malfunction or unexpected error in a process" },
      { word: "perception", definition: "the way something is interpreted or understood by the senses" },
    ],
    reveal:
      "One leading theory says déjà vu happens when your brain's memory and perception systems briefly get out of sync — the brain registers a new experience as if it's already been filed into long-term memory, creating a false sense of familiarity for something you're seeing for the first time.",
  },
  {
    id: "black-holes",
    category: "space",
    question: "How do black holes actually form?",
    spark:
      "A black hole isn't a hole at all — it starts as something extremely large that runs out of a very specific kind of fuel.",
    lookInto: ["star death", "gravitational collapse", "supernova"],
    vocabWords: [
      { word: "gravity", definition: "the force that attracts objects toward each other" },
      { word: "collapse", definition: "to fall inward suddenly due to loss of structural support" },
      { word: "supernova", definition: "a powerful explosion marking the death of a massive star" },
      { word: "density", definition: "how much mass is packed into a given volume" },
      { word: "event horizon", definition: "the boundary around a black hole beyond which nothing can escape" },
    ],
    reveal:
      "When a massive star runs out of nuclear fuel, it can no longer produce the outward pressure that balances its own gravity. The core collapses inward under its own weight, becoming so dense that its gravity prevents even light from escaping — the point of no return is called the event horizon.",
  },
  {
    id: "elevator",
    category: "everyday",
    question: "How does an elevator know which floor you're on?",
    spark:
      "It's not counting doors like you might think — there's a small, precise piece of hardware doing the actual tracking.",
    lookInto: ["elevator position sensors", "encoders", "elevator control systems"],
    vocabWords: [
      { word: "encoder", definition: "a device that converts physical position into a readable signal" },
      { word: "calibration", definition: "the process of configuring a device for accurate measurement" },
      { word: "sensor", definition: "a device that detects and responds to physical input" },
      { word: "algorithm", definition: "a set of rules a system follows to solve a problem or make a decision" },
      { word: "efficiency", definition: "achieving a result with minimal wasted effort or resources" },
    ],
    reveal:
      "Elevators use position encoders — sensors attached to the cable or guide rail — that track exact movement as the car travels. A control system compares this position data against known floor heights, and modern systems even use algorithms to group requests efficiently so you wait less.",
  },
  {
    id: "popcorn",
    category: "science",
    question: "Why does popcorn pop?",
    spark: "Every kernel is hiding a tiny amount of something that turns violently explosive under heat.",
    lookInto: ["moisture inside a kernel", "steam pressure", "starch structure"],
    vocabWords: [
      { word: "pressure", definition: "the force exerted on a surface, per unit area" },
      { word: "moisture", definition: "small amounts of water present in something" },
      { word: "expand", definition: "to increase in size or volume" },
      { word: "structure", definition: "the arrangement of parts that make up something" },
      { word: "burst", definition: "to break open suddenly, often due to internal pressure" },
    ],
    reveal:
      "Each popcorn kernel contains a small amount of water sealed inside a hard starchy shell. When heated, that water turns to steam, and pressure builds until the shell can't contain it — it bursts, and the starch inside instantly puffs out into the fluffy shape we eat.",
  },
  {
    id: "prices-99",
    category: "everyday",
    question: "Why do so many prices end in .99?",
    spark:
      "It's not a coincidence, and it's not about the number itself — it's about how your brain reads left to right.",
    lookInto: ["charm pricing", "left-digit effect", "consumer psychology"],
    vocabWords: [
      { word: "perception", definition: "the way something is interpreted or understood by the senses" },
      { word: "psychology", definition: "the study of the mind and how it influences behavior" },
      { word: "threshold", definition: "a point marking a boundary or limit, e.g. between price tiers" },
      { word: "strategy", definition: "a plan of action designed to achieve a goal" },
      { word: "consumer", definition: "a person who purchases goods or services" },
    ],
    reveal:
      "This is called charm pricing — because people read numbers left to right, $9.99 is mentally processed closer to $9 than $10, even though the actual gap is one cent. Studies show this 'left-digit effect' measurably increases how many people buy something.",
  },
  {
    id: "bird-migration",
    category: "nature",
    question: "How do birds know where to migrate?",
    spark:
      "Some birds fly thousands of miles to the same exact location every year — without a map, and often without ever having made the trip before.",
    lookInto: ["magnetoreception", "celestial navigation", "landmark memory in birds"],
    vocabWords: [
      { word: "magnetoreception", definition: "the ability to sense the Earth's magnetic field" },
      { word: "navigation", definition: "the process of accurately finding one's way to a destination" },
      { word: "instinct", definition: "an inborn pattern of behavior, not learned from experience" },
      { word: "migration", definition: "seasonal movement of animals from one region to another" },
      { word: "orientation", definition: "awareness of one's position relative to surroundings" },
    ],
    reveal:
      "Migratory birds combine several tools: an internal sense of the Earth's magnetic field called magnetoreception, the position of the sun and stars for celestial navigation, and memorized landmarks passed down instinctively or learned on earlier trips.",
  },
  {
    id: "noise-cancelling",
    category: "technology",
    question: "How does noise-cancelling technology work?",
    spark: "Your headphones aren't blocking sound — they're fighting it with an identical enemy.",
    lookInto: ["sound waves", "destructive interference", "microphones in headphones"],
    vocabWords: [
      { word: "frequency", definition: "the rate at which a sound wave repeats per second" },
      { word: "interference", definition: "when two waves overlap and combine, amplifying or cancelling each other" },
      { word: "amplitude", definition: "the height or intensity of a wave, related to volume" },
      { word: "waveform", definition: "the shape of a signal as it changes over time" },
      { word: "cancellation", definition: "the process of neutralizing or eliminating an effect" },
    ],
    reveal:
      "Noise-cancelling headphones use tiny microphones to detect incoming sound waves, then generate an inverted version of that exact waveform. When the original wave and the inverted one meet, they cancel each other out through destructive interference — resulting in near silence.",
  },
  {
    id: "ocean-blue",
    category: "nature",
    question: "Why is the ocean blue?",
    spark:
      "It's not just reflecting the sky, like most people assume — the water itself is doing something to sunlight.",
    lookInto: ["light absorption in water", "wavelength scattering", "why deep water looks darker"],
    vocabWords: [
      { word: "wavelength", definition: "the distance between repeating points of a wave, determines color" },
      { word: "absorb", definition: "to take in and not reflect, e.g. light or heat" },
      { word: "scatter", definition: "to spread something, such as light, in different directions" },
      { word: "spectrum", definition: "the full range of colors or wavelengths of light" },
      { word: "refraction", definition: "the bending of light as it passes through a different medium" },
    ],
    reveal:
      "Water molecules absorb red, orange, and yellow light (the longer wavelengths) more easily than blue light. Blue light, having a shorter wavelength, scatters and reflects back more — so the deeper and clearer the water, the more blue it appears, independent of the sky above it.",
  },
];

export function getRandomTopic(previousTopic: Topic | null): Topic {
  if (TOPICS.length === 1) return TOPICS[0];
  let next = previousTopic;
  while (next === previousTopic || next?.id === previousTopic?.id) {
    next = TOPICS[Math.floor(Math.random() * TOPICS.length)];
  }
  return next as Topic;
}
