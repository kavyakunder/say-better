export type TopicCategory = "nature" | "technology" | "human" | "space" | "everyday" | "science";

export interface Topic {
  id: string;
  category: TopicCategory;
  question: string;
  lookInto: string[];
  vocabWords: string[];
  reveal: string;
}

export const TOPICS: Topic[] = [
  // ─── Original topics ───────────────────────────────────────────
  {
    id: "tree-communication",
    category: "nature",
    question: "How does a tree communicate with other trees?",
    lookInto: ["mycorrhizal networks", "fungi and tree roots", "nutrient exchange"],
    vocabWords: ["symbiosis", "mycorrhiza", "ecosystem"],
    reveal:
      "Trees connect through underground fungal networks called mycorrhizae, sometimes nicknamed the 'wood wide web.' Through these networks, trees share nutrients, water, and even warning signals about insect attacks or drought with neighboring trees — including different species.",
  },
  {
    id: "gps",
    category: "technology",
    question: "How does GPS know exactly where you are?",
    lookInto: ["GPS satellites", "signal timing", "triangulation/trilateration"],
    vocabWords: ["satellite", "trilateration", "precision"],
    reveal:
      "GPS satellites constantly broadcast the exact time and their position. Your phone measures how long each signal took to arrive, calculates the distance to at least four satellites, and uses trilateration to pinpoint where those distances all overlap — that overlap point is you.",
  },
  {
    id: "deja-vu",
    category: "human",
    question: "Why do we get déjà vu?",
    lookInto: ["memory processing", "brain misfiring theories", "temporal lobe"],
    vocabWords: ["familiarity", "temporal lobe", "perception"],
    reveal:
      "One leading theory says déjà vu happens when your brain's memory and perception systems briefly get out of sync — the brain registers a new experience as if it's already been filed into long-term memory, creating a false sense of familiarity for something you're seeing for the first time.",
  },
  {
    id: "black-holes",
    category: "space",
    question: "How do black holes actually form?",
    lookInto: ["star death", "gravitational collapse", "supernova"],
    vocabWords: ["gravity", "supernova", "event horizon"],
    reveal:
      "When a massive star runs out of nuclear fuel, it can no longer produce the outward pressure that balances its own gravity. The core collapses inward under its own weight, becoming so dense that its gravity prevents even light from escaping — the point of no return is called the event horizon.",
  },
  {
    id: "elevator",
    category: "everyday",
    question: "How does an elevator know which floor you're on?",
    lookInto: ["elevator position sensors", "encoders", "elevator control systems"],
    vocabWords: ["encoder", "sensor", "algorithm"],
    reveal:
      "Elevators use position encoders — sensors attached to the cable or guide rail — that track exact movement as the car travels. A control system compares this position data against known floor heights, and modern systems even use algorithms to group requests efficiently so you wait less.",
  },
  {
    id: "popcorn",
    category: "science",
    question: "Why does popcorn pop?",
    lookInto: ["moisture inside a kernel", "steam pressure", "starch structure"],
    vocabWords: ["pressure", "moisture", "expand"],
    reveal:
      "Each popcorn kernel contains a small amount of water sealed inside a hard starchy shell. When heated, that water turns to steam, and pressure builds until the shell can't contain it — it bursts, and the starch inside instantly puffs out into the fluffy shape we eat.",
  },
  {
    id: "prices-99",
    category: "everyday",
    question: "Why do so many prices end in .99?",
    lookInto: ["charm pricing", "left-digit effect", "consumer psychology"],
    vocabWords: ["psychology", "threshold", "consumer"],
    reveal:
      "This is called charm pricing — because people read numbers left to right, $9.99 is mentally processed closer to $9 than $10, even though the actual gap is one cent. Studies show this 'left-digit effect' measurably increases how many people buy something.",
  },
  {
    id: "bird-migration",
    category: "nature",
    question: "How do birds know where to migrate?",
    lookInto: ["magnetoreception", "celestial navigation", "landmark memory in birds"],
    vocabWords: ["magnetoreception", "navigation", "instinct"],
    reveal:
      "Migratory birds combine several tools: an internal sense of the Earth's magnetic field called magnetoreception, the position of the sun and stars for celestial navigation, and memorized landmarks passed down instinctively or learned on earlier trips.",
  },
  {
    id: "noise-cancelling",
    category: "technology",
    question: "How does noise-cancelling technology work?",
    lookInto: ["sound waves", "destructive interference", "microphones in headphones"],
    vocabWords: ["frequency", "interference", "waveform"],
    reveal:
      "Noise-cancelling headphones use tiny microphones to detect incoming sound waves, then generate an inverted version of that exact waveform. When the original wave and the inverted one meet, they cancel each other out through destructive interference — resulting in near silence.",
  },
  {
    id: "ocean-blue",
    category: "nature",
    question: "Why is the ocean blue?",
    lookInto: ["light absorption in water", "wavelength scattering", "why deep water looks darker"],
    vocabWords: ["wavelength", "absorb", "spectrum"],
    reveal:
      "Water molecules absorb red, orange, and yellow light (the longer wavelengths) more easily than blue light. Blue light, having a shorter wavelength, scatters and reflects back more — so the deeper and clearer the water, the more blue it appears, independent of the sky above it.",
  },

  // ─── Nature ────────────────────────────────────────────────────
  {
    id: "cat-purr",
    category: "nature",
    question: "How do cats purr?",
    lookInto: ["laryngeal muscles", "vocal folds in cats", "purring frequency and healing"],
    vocabWords: ["larynx", "vibration", "frequency"],
    reveal:
      "A cat's brain sends rapid, rhythmic signals to the muscles of its larynx, making them twitch 25–150 times per second. This opens and closes the space between the vocal folds as air flows in and out, producing a purr on both the inhale and exhale. Cats purr when content, but also when stressed or injured — scientists suspect the vibrations may even help with healing.",
  },
  {
    id: "chameleon-color",
    category: "nature",
    question: "How do chameleons change color?",
    lookInto: ["iridophore cells", "nanocrystals in skin", "structural color"],
    vocabWords: ["pigment", "nanocrystal", "reflection"],
    reveal:
      "Chameleons don't mix pigments like paint. Their skin contains cells packed with tiny guanine nanocrystals arranged in a lattice. By relaxing or tightening their skin, they change the spacing between these crystals, which changes which wavelengths of light get reflected — shifting their color from green to yellow, orange, or red.",
  },
  {
    id: "firefly-glow",
    category: "nature",
    question: "How do fireflies light up?",
    lookInto: ["bioluminescence", "luciferin and luciferase", "firefly flash patterns"],
    vocabWords: ["bioluminescence", "enzyme", "oxygen"],
    reveal:
      "Fireflies produce light through a chemical reaction: a molecule called luciferin reacts with oxygen with the help of an enzyme called luciferase. Nearly all the energy becomes light instead of heat, making it one of the most efficient light sources in nature. Fireflies control the flash by regulating oxygen flow, and each species uses its own flash pattern to find mates.",
  },
  {
    id: "autumn-leaves",
    category: "nature",
    question: "Why do leaves change color in autumn?",
    lookInto: ["chlorophyll breakdown", "carotenoids", "anthocyanins"],
    vocabWords: ["chlorophyll", "pigment", "photosynthesis"],
    reveal:
      "Leaves are full of yellow and orange pigments all summer, but green chlorophyll hides them. As days shorten, trees stop making chlorophyll and break it down to reclaim nutrients, revealing the yellows and oranges underneath. Some trees also produce new red pigments called anthocyanins, which is why maples glow red.",
  },
  {
    id: "bees-honey",
    category: "nature",
    question: "How do bees turn flower nectar into honey?",
    lookInto: ["nectar collection", "bee enzymes", "evaporation in the hive"],
    vocabWords: ["nectar", "enzyme", "evaporation"],
    reveal:
      "Bees collect nectar and store it in a special 'honey stomach,' where enzymes start breaking complex sugars into simpler ones. Back at the hive, the nectar is passed between bees and deposited into honeycomb cells, where bees fan their wings to evaporate water until the honey is thick. Then they seal it with wax — and properly stored honey can last for thousands of years.",
  },
  {
    id: "octopus-hearts",
    category: "nature",
    question: "Why does an octopus have three hearts?",
    lookInto: ["octopus circulatory system", "hemocyanin", "branchial hearts"],
    vocabWords: ["circulation", "hemocyanin", "gills"],
    reveal:
      "Two small hearts pump blood through the octopus's gills to pick up oxygen, while the third pumps it to the rest of the body. Octopus blood uses a copper-based molecule called hemocyanin (which makes it blue) that carries oxygen less efficiently than our iron-based blood, so the extra hearts help keep it moving. Oddly, the main heart pauses while the octopus swims — one reason they prefer crawling.",
  },
  {
    id: "salmon-return",
    category: "nature",
    question: "How do salmon find the exact river they were born in?",
    lookInto: ["olfactory imprinting", "magnetic navigation in fish", "salmon life cycle"],
    vocabWords: ["imprinting", "olfactory", "spawning"],
    reveal:
      "Salmon appear to use Earth's magnetic field to navigate across the open ocean back toward their home coastline. Once close, they switch to smell: as young fish, they memorized the unique chemical 'scent' of their birth stream. Years later, they follow that scent upstream, sometimes hundreds of miles, to spawn in the same place they hatched.",
  },
  {
    id: "zebra-stripes",
    category: "nature",
    question: "Why do zebras have stripes?",
    lookInto: ["biting flies and stripes", "camouflage theories", "zebra thermoregulation"],
    vocabWords: ["adaptation", "camouflage", "evolution"],
    reveal:
      "Scientists debated this for over a century, testing ideas like camouflage and cooling. The strongest evidence now points to insects: experiments show that horseflies struggle to land on striped surfaces, seemingly confused by the pattern as they approach. In regions where zebras live, biting flies spread serious diseases, so stripes act like a natural bug repellent.",
  },
  {
    id: "gecko-feet",
    category: "nature",
    question: "How can geckos walk upside down on ceilings?",
    lookInto: ["gecko setae", "van der Waals forces", "dry adhesives"],
    vocabWords: ["adhesion", "setae", "molecular force"],
    reveal:
      "A gecko's toes are covered in millions of microscopic hairs called setae, each splitting into even tinier tips. These tips get so close to a surface that weak attractions between molecules, called van der Waals forces, add up to a powerful grip. No glue is involved — geckos release by peeling their toes away at an angle, like removing tape.",
  },
  {
    id: "tardigrades",
    category: "nature",
    question: "How do tardigrades survive almost anything?",
    lookInto: ["cryptobiosis", "tun state", "Dsup protein"],
    vocabWords: ["cryptobiosis", "dehydration", "resilience"],
    reveal:
      "When conditions get harsh, tardigrades dry out, curl into a ball called a tun, and slow their metabolism to almost nothing — a state called cryptobiosis. Special proteins protect their cells and even shield their DNA from radiation damage. In this state they've survived extreme cold, boiling heat, crushing pressure, and even the vacuum of space.",
  },
  {
    id: "dolphin-sleep",
    category: "nature",
    question: "How do dolphins sleep without drowning?",
    lookInto: ["unihemispheric sleep", "voluntary breathing", "marine mammal rest"],
    vocabWords: ["hemisphere", "conscious", "mammal"],
    reveal:
      "Unlike humans, dolphins have to consciously decide to breathe, so they can't fully fall asleep. Instead they rest one half of their brain at a time while the other half stays alert, surfacing for air and watching for danger. They often keep one eye open — the one controlled by the awake half of the brain.",
  },

  // ─── Technology ────────────────────────────────────────────────
  {
    id: "touchscreen",
    category: "technology",
    question: "How does a touchscreen know where your finger is?",
    lookInto: ["capacitive touchscreens", "electrode grids", "why gloves don't work"],
    vocabWords: ["capacitance", "conductor", "electrode"],
    reveal:
      "Most phone screens have an invisible grid of electrodes holding a tiny electric field. Your finger conducts electricity, so touching the glass disturbs the field at that spot. The phone measures where the change is strongest and calculates your finger's position — which is why regular gloves, which don't conduct, don't work.",
  },
  {
    id: "wifi",
    category: "technology",
    question: "How does Wi-Fi send data through thin air?",
    lookInto: ["radio waves", "signal modulation", "2.4 GHz vs 5 GHz"],
    vocabWords: ["radio wave", "modulation", "bandwidth"],
    reveal:
      "Your router is a radio transmitter. It converts data into 1s and 0s and encodes them by rapidly changing properties of radio waves, like their strength and timing — a process called modulation. Your device picks up these waves and decodes the changes back into data, millions of times per second.",
  },
  {
    id: "microwave-oven",
    category: "technology",
    question: "How does a microwave heat food without getting hot itself?",
    lookInto: ["microwave radiation", "water molecule rotation", "dielectric heating"],
    vocabWords: ["radiation", "molecule", "friction"],
    reveal:
      "A microwave oven fills the box with invisible waves that make water molecules in food flip back and forth billions of times per second. All that jostling creates heat inside the food. The walls and plates stay mostly cool because they contain little water — anything warm on the plate usually got that way from the food touching it.",
  },
  {
    id: "qr-code",
    category: "technology",
    question: "How does a QR code store information?",
    lookInto: ["binary encoding", "finder patterns", "error correction"],
    vocabWords: ["binary", "encoding", "redundancy"],
    reveal:
      "Each black or white square in a QR code represents a 1 or 0, spelling out data in binary. The three big squares in the corners tell your camera the code's orientation. QR codes also store extra backup data using error correction, so they can still be read even if part of the code is scratched or covered.",
  },
  {
    id: "airplane-lift",
    category: "technology",
    question: "How does a heavy airplane stay in the air?",
    lookInto: ["wing shape and lift", "Bernoulli's principle", "Newton's third law in flight"],
    vocabWords: ["lift", "airfoil", "thrust"],
    reveal:
      "An airplane's wings are shaped and tilted to push huge amounts of air downward as the plane moves forward. By Newton's third law, the air pushes the wing up. This also creates lower pressure above the wing than below it. Together these produce lift — and as long as the engines keep the plane moving fast enough, lift can outweigh hundreds of tons.",
  },
  {
    id: "3d-printer",
    category: "technology",
    question: "How does a 3D printer build solid objects?",
    lookInto: ["additive manufacturing", "slicing software", "filament extrusion"],
    vocabWords: ["additive", "layer", "extrusion"],
    reveal:
      "Software first 'slices' a 3D model into hundreds of thin horizontal layers. The printer then melts plastic and squeezes it through a fine nozzle, drawing one layer at a time and stacking each on top of the last as it cools. Instead of carving material away, it builds the object up — that's why it's called additive manufacturing.",
  },
  {
    id: "refrigerator",
    category: "technology",
    question: "How does a fridge make things cold?",
    lookInto: ["refrigerant cycle", "evaporation and heat absorption", "compressors"],
    vocabWords: ["refrigerant", "evaporation", "compressor"],
    reveal:
      "A fridge doesn't create cold — it moves heat. A special liquid called refrigerant evaporates inside the fridge, soaking up heat as it turns into gas (like sweat cooling your skin). A compressor then squeezes the gas, and coils on the back release that heat into your kitchen. That's why the back of a fridge feels warm.",
  },
  {
    id: "song-recognition",
    category: "technology",
    question: "How can an app recognize a song in just a few seconds?",
    lookInto: ["audio fingerprinting", "spectrograms", "hash matching"],
    vocabWords: ["fingerprint", "spectrogram", "database"],
    reveal:
      "The app converts a few seconds of audio into a spectrogram — a map of which frequencies are loudest at each moment. It picks out the strongest peaks and turns their patterns into compact codes called fingerprints. These are matched against a giant database of millions of song fingerprints, and because peaks survive background noise, it works even in a loud room.",
  },
  {
    id: "solar-panels",
    category: "technology",
    question: "How do solar panels turn sunlight into electricity?",
    lookInto: ["photovoltaic effect", "silicon semiconductors", "photons and electrons"],
    vocabWords: ["photon", "semiconductor", "photovoltaic"],
    reveal:
      "Solar panels are made of silicon layers treated so that one side has extra electrons and the other has spaces for them. When particles of sunlight called photons hit the silicon, they knock electrons loose. The built-in electric field between the layers pushes those electrons in one direction, creating an electric current — the photovoltaic effect.",
  },
  {
    id: "compass",
    category: "technology",
    question: "Why does a compass always point north?",
    lookInto: ["Earth's magnetic field", "magnetic vs geographic north", "Earth's molten core"],
    vocabWords: ["magnetism", "pole", "declination"],
    reveal:
      "Earth acts like a giant magnet, thanks to swirling molten iron in its outer core. A compass needle is a small magnet that lines up with this field, pointing toward the magnetic north pole. But magnetic north isn't the same as the geographic North Pole — and it slowly drifts over time, so navigators have to correct for the difference.",
  },

  // ─── Human ─────────────────────────────────────────────────────
  {
    id: "yawning",
    category: "human",
    question: "Why do we yawn, and why is it contagious?",
    lookInto: ["brain cooling theory", "contagious yawning", "mirror neurons"],
    vocabWords: ["thermoregulation", "contagious", "empathy"],
    reveal:
      "One leading theory is that yawning helps cool the brain: the deep inhale and jaw stretch increase blood flow and bring in cooler air. Contagious yawning is linked to social connection — people tend to catch yawns more from family and friends than from strangers. Even reading about yawning can trigger one.",
  },
  {
    id: "tickle-yourself",
    category: "human",
    question: "Why can't you tickle yourself?",
    lookInto: ["cerebellum", "sensory prediction", "self-generated touch"],
    vocabWords: ["cerebellum", "prediction", "sensation"],
    reveal:
      "Your brain, especially the cerebellum, constantly predicts what your own movements will feel like. When you try to tickle yourself, it already knows exactly what's coming and dampens the sensation. Tickling depends on surprise — which is why someone else's unpredictable fingers work, but yours don't.",
  },
  {
    id: "dreams",
    category: "human",
    question: "Why do we dream?",
    lookInto: ["REM sleep", "memory consolidation", "emotional processing in sleep"],
    vocabWords: ["REM", "consolidation", "subconscious"],
    reveal:
      "Nobody knows for sure, but most vivid dreams happen during REM sleep, when the brain is almost as active as when awake. Leading theories suggest dreaming helps sort and store memories, process emotions, and rehearse responses to threats. Your brain may be replaying and remixing the day's experiences while you sleep.",
  },
  {
    id: "wrinkly-fingers",
    category: "human",
    question: "Why do your fingers get wrinkly in water?",
    lookInto: ["nervous system response", "blood vessel constriction", "wet grip hypothesis"],
    vocabWords: ["constriction", "nervous system", "traction"],
    reveal:
      "It's not just skin soaking up water. Wrinkling is an active response from your nervous system, which shrinks blood vessels under the skin and pulls it into folds. Proof: people with certain nerve damage in their fingers don't wrinkle. Some experiments suggest the wrinkles work like tire treads, helping you grip wet objects.",
  },
  {
    id: "goosebumps",
    category: "human",
    question: "Why do we get goosebumps?",
    lookInto: ["arrector pili muscles", "vestigial reflexes", "emotional chills"],
    vocabWords: ["reflex", "vestigial", "follicle"],
    reveal:
      "Tiny muscles attached to each hair follicle contract when you're cold or scared, pulling the hairs upright. For our furry ancestors, this puffed up their coat to trap warmth or look bigger to threats. Humans have too little hair for it to help much, so goosebumps are a leftover reflex — one that can even be triggered by powerful music.",
  },
  {
    id: "hiccups",
    category: "human",
    question: "Why do we get hiccups?",
    lookInto: ["diaphragm spasms", "glottis", "hiccup reflex arc"],
    vocabWords: ["diaphragm", "spasm", "reflex"],
    reveal:
      "A hiccup is an involuntary spasm of the diaphragm, the muscle under your lungs, which makes you suddenly suck in air. A fraction of a second later, the opening of your vocal cords snaps shut, creating the 'hic' sound. Eating too fast, fizzy drinks, or excitement can irritate the nerves involved — and no one fully knows why the reflex exists.",
  },
  {
    id: "face-recognition",
    category: "human",
    question: "How does your brain recognize faces so quickly?",
    lookInto: ["fusiform face area", "holistic processing", "prosopagnosia"],
    vocabWords: ["recognition", "holistic", "neuron"],
    reveal:
      "Your brain has a region called the fusiform face area that specializes in faces. Instead of checking features one by one, it processes a face as a whole pattern, which is why you can recognize a friend in a split second. It's so tuned for faces that you even see them in clouds and electrical outlets — a phenomenon called pareidolia.",
  },
  {
    id: "earworms",
    category: "human",
    question: "Why do some songs get stuck in your head?",
    lookInto: ["earworms", "involuntary musical imagery", "Zeigarnik effect"],
    vocabWords: ["earworm", "repetition", "memory"],
    reveal:
      "Earworms tend to be songs with simple, repetitive melodies and an unexpected twist. Your brain often loops just a short fragment, possibly because it's trying to 'complete' an unfinished memory. Research suggests one way to get rid of an earworm is to engage your brain with a moderately challenging task, like a puzzle.",
  },
  {
    id: "fingerprints",
    category: "human",
    question: "Why does everyone have unique fingerprints?",
    lookInto: ["fingerprint formation in the womb", "friction ridges", "touch sensitivity"],
    vocabWords: ["ridges", "womb", "unique"],
    reveal:
      "Fingerprints form before birth as skin layers on your fingertips grow and buckle under pressure. Tiny differences in position, blood flow, and surrounding fluid make each pattern unique — even identical twins have different prints. The ridges are thought to improve grip and help your fingertips sense fine textures.",
  },
  {
    id: "caffeine",
    category: "human",
    question: "How does caffeine keep you awake?",
    lookInto: ["adenosine", "receptor blocking", "caffeine crash"],
    vocabWords: ["adenosine", "receptor", "stimulant"],
    reveal:
      "As you stay awake, your brain builds up a chemical called adenosine that makes you feel sleepy. Caffeine has a similar shape, so it slips into adenosine's receptors and blocks them without triggering sleepiness. The adenosine is still there, though — when the caffeine wears off, it all floods in at once, causing the classic crash.",
  },

  // ─── Space ─────────────────────────────────────────────────────
  {
    id: "moon-same-face",
    category: "space",
    question: "Why do we always see the same side of the Moon?",
    lookInto: ["tidal locking", "synchronous rotation", "far side of the Moon"],
    vocabWords: ["tidal locking", "rotation", "orbit"],
    reveal:
      "The Moon does spin — but it takes exactly as long to rotate once as it does to orbit Earth, about 27 days. This is called tidal locking. Over billions of years, Earth's gravity stretched the Moon slightly and slowed its spin until the two matched. The far side still gets sunlight — we just never see it from Earth.",
  },
  {
    id: "mars-red",
    category: "space",
    question: "Why is Mars red?",
    lookInto: ["iron oxide", "Martian dust", "Mars' ancient water"],
    vocabWords: ["oxidation", "iron oxide", "atmosphere"],
    reveal:
      "Mars is covered in dust rich in iron oxide — essentially rust. Iron in its rocks reacted with oxygen, possibly with help from water long ago, and winds spread the fine rusty dust across the planet and into the sky. Beneath the surface, much of Mars' rock is actually darker gray or brown.",
  },
  {
    id: "stars-made-of",
    category: "space",
    question: "How do we know what stars are made of without visiting them?",
    lookInto: ["spectroscopy", "absorption lines", "discovery of helium"],
    vocabWords: ["spectroscopy", "element", "absorption"],
    reveal:
      "When starlight is split into a rainbow, dark lines appear at specific colors. Each element absorbs its own unique set of colors, like a barcode. By matching these lines to elements tested in labs, astronomers can tell what a star is made of. Helium was actually discovered in the Sun this way before it was ever found on Earth.",
  },
  {
    id: "northern-lights",
    category: "space",
    question: "What causes the northern lights?",
    lookInto: ["solar wind", "Earth's magnetosphere", "oxygen and nitrogen emissions"],
    vocabWords: ["solar wind", "magnetosphere", "aurora"],
    reveal:
      "The Sun constantly blasts out charged particles called the solar wind. Earth's magnetic field funnels some of them toward the poles, where they crash into gases in the upper atmosphere. The collisions make the gases glow — oxygen gives off green and red light, while nitrogen adds blue and purple.",
  },
  {
    id: "rockets-in-space",
    category: "space",
    question: "How do rockets move in space where there's no air to push against?",
    lookInto: ["Newton's third law", "rocket exhaust", "thrust in a vacuum"],
    vocabWords: ["thrust", "propellant", "momentum"],
    reveal:
      "Rockets don't push against air — they push against their own exhaust. Burning fuel throws hot gas out the back at high speed, and by Newton's third law, the rocket is pushed forward with an equal and opposite force. This actually works even better in space, where there's no air resistance slowing things down.",
  },
  {
    id: "planets-orbit",
    category: "space",
    question: "Why don't planets fall into the Sun?",
    lookInto: ["orbital velocity", "Newton's cannonball", "gravity and inertia"],
    vocabWords: ["gravity", "velocity", "inertia"],
    reveal:
      "Planets are actually falling toward the Sun all the time — they're just moving sideways so fast that they keep missing it. Gravity bends their straight path into a curve, and their forward speed keeps them from spiraling in. That balance between falling and moving sideways is what an orbit is.",
  },

  // ─── Everyday ──────────────────────────────────────────────────
  {
    id: "stale-bread",
    category: "everyday",
    question: "Why does bread go stale?",
    lookInto: ["starch retrogradation", "moisture migration", "why toasting helps"],
    vocabWords: ["starch", "crystallize", "retrogradation"],
    reveal:
      "Stale bread isn't mainly dried out — its starch is recrystallizing. Baking loosens starch molecules, but as bread cools they slowly realign into rigid crystals, a process called retrogradation. This happens fastest in the fridge. Toasting reheats the starch and temporarily undoes it, making stale bread soft again.",
  },
  {
    id: "soap",
    category: "everyday",
    question: "How does soap actually clean your hands?",
    lookInto: ["surfactants", "micelles", "hydrophobic and hydrophilic"],
    vocabWords: ["surfactant", "hydrophobic", "micelle"],
    reveal:
      "Soap molecules have a head that loves water and a tail that loves oil. The tails grab onto grease and dirt that water alone can't remove, surrounding them in tiny bubbles called micelles, which rinse away. Soap can also break apart the fatty outer layer of many germs and viruses, destroying them.",
  },
  {
    id: "mirror-flip",
    category: "everyday",
    question: "Why do mirrors flip left and right but not up and down?",
    lookInto: ["mirror reflection", "front-back reversal", "chirality"],
    vocabWords: ["reflection", "reversal", "symmetry"],
    reveal:
      "Mirrors don't actually flip left and right — they flip front to back. Your right hand stays on the right side of the image. It only seems reversed because we imagine ourselves walking around and turning to face the other way. Lie on your side and look in a mirror, and the 'flip' suddenly seems to be up and down instead.",
  },
  {
    id: "bent-spoon",
    category: "everyday",
    question: "Why does a spoon look bent in a glass of water?",
    lookInto: ["refraction", "speed of light in water", "refractive index"],
    vocabWords: ["refraction", "medium", "illusion"],
    reveal:
      "Light travels slower in water than in air. When light from the underwater part of the spoon crosses into the air, it changes speed and bends — called refraction. Your brain assumes light travels in straight lines, so it places that part of the spoon in the wrong spot, making it look broken or bent.",
  },
  {
    id: "sunset-orange",
    category: "everyday",
    question: "Why is the sky orange and red at sunset?",
    lookInto: ["Rayleigh scattering", "atmospheric path length", "dust and sunsets"],
    vocabWords: ["scattering", "atmosphere", "wavelength"],
    reveal:
      "Air scatters short blue wavelengths more than long red ones. At sunset, sunlight travels through much more atmosphere to reach you, so most of the blue gets scattered away before it arrives. What's left are the oranges and reds — and dust or smoke in the air can make sunsets even more intense.",
  },
  {
    id: "ears-pop",
    category: "everyday",
    question: "Why do your ears pop on an airplane?",
    lookInto: ["Eustachian tube", "air pressure changes", "middle ear"],
    vocabWords: ["pressure", "eardrum", "equalize"],
    reveal:
      "Your middle ear is an air-filled pocket behind your eardrum. When the plane climbs or descends, cabin pressure changes and pushes your eardrum in or out. Swallowing or yawning opens the Eustachian tube connecting your ear to your throat, letting air rush through to equalize the pressure — that's the 'pop.'",
  },
  {
    id: "lock-and-key",
    category: "everyday",
    question: "How does a key open a lock?",
    lookInto: ["pin tumbler locks", "shear line", "lock picking"],
    vocabWords: ["tumbler", "shear line", "mechanism"],
    reveal:
      "Most door locks contain spring-loaded pins of different lengths that block the cylinder from turning. The bumps on the right key push each pin to exactly the right height, so the gaps between them line up perfectly at the 'shear line.' Only then can the cylinder rotate. The wrong key leaves at least one pin in the way.",
  },

  // ─── Science ───────────────────────────────────────────────────
  {
    id: "onions-cry",
    category: "science",
    question: "Why do onions make you cry?",
    lookInto: ["onion enzymes", "sulfur compounds", "tear reflex"],
    vocabWords: ["enzyme", "sulfur", "irritant"],
    reveal:
      "Cutting an onion breaks open its cells, releasing enzymes that react with sulfur compounds to create a gas called syn-propanethial-S-oxide. When it reaches your eyes, it irritates nerves that trigger tears to wash it away. It's the onion's defense against animals that try to eat it.",
  },
  {
    id: "ice-floats",
    category: "science",
    question: "Why does ice float instead of sinking?",
    lookInto: ["hydrogen bonds", "crystal lattice", "density of water"],
    vocabWords: ["density", "hydrogen bond", "lattice"],
    reveal:
      "Most substances are denser as solids, but water is unusual. When it freezes, hydrogen bonds lock the molecules into an open, hexagonal crystal with more space between them than in liquid water. That makes ice less dense, so it floats — which insulates lakes in winter and lets fish survive underneath.",
  },
  {
    id: "rainbows",
    category: "science",
    question: "How does a rainbow form?",
    lookInto: ["light dispersion", "refraction in raindrops", "double rainbows"],
    vocabWords: ["dispersion", "refraction", "prism"],
    reveal:
      "When sunlight enters a raindrop, it bends and splits into its colors because each wavelength bends a slightly different amount. The light reflects off the back of the drop and bends again on the way out. Millions of drops act like tiny prisms, and you see a rainbow when the Sun is behind you and rain is in front.",
  },
  {
    id: "salt-ice",
    category: "science",
    question: "Why does salt melt ice on roads?",
    lookInto: ["freezing point depression", "brine", "why salt stops working when it's very cold"],
    vocabWords: ["freezing point", "solution", "dissolve"],
    reveal:
      "Salt dissolves into the thin layer of water on ice, making salty water. Salt particles get in the way of water molecules trying to lock into ice crystals, lowering the freezing point. So the ice melts at temperatures where it would normally stay frozen — although salt stops being effective when it gets extremely cold.",
  },
  {
    id: "apples-brown",
    category: "science",
    question: "Why do cut apples turn brown?",
    lookInto: ["enzymatic browning", "polyphenol oxidase", "how lemon juice helps"],
    vocabWords: ["oxidation", "enzyme", "polyphenol"],
    reveal:
      "Cutting an apple breaks its cells, letting an enzyme called polyphenol oxidase react with oxygen and natural compounds in the fruit. This reaction creates brown pigments, similar to the ones that tan skin. Lemon juice slows it down because its acidity and vitamin C interfere with the enzyme.",
  },
  {
    id: "lightning",
    category: "science",
    question: "How does lightning form?",
    lookInto: ["charge separation in clouds", "ice and graupel collisions", "why thunder follows"],
    vocabWords: ["static", "charge", "discharge"],
    reveal:
      "Inside storm clouds, ice crystals and soft hail collide, transferring electric charge. Lighter positive particles rise to the top while heavier negative ones sink to the bottom. When the charge difference becomes huge, a giant spark jumps between the cloud and ground — heating the air hotter than the Sun's surface and creating thunder as it expands.",
  },
  {
    id: "why-planes-window-round",
    category: "technology",
    question: "Why are airplane windows rounded instead of square?",
    lookInto: ["aircraft pressure", "stress concentration", "window shape"],
    vocabWords: ["pressure", "stress", "fatigue"],
    reveal:
      "A plane's cabin is pressurized while the outside air is much thinner, creating repeated stress in the fuselage. Sharp corners concentrate that stress, making cracks more likely to form. Rounded windows distribute the pressure more evenly, which is safer for the aircraft structure.",
  },
  {
    id: "why-blood-blue-veins",
    category: "human",
    question: "Why do veins look blue if blood is red?",
    lookInto: ["light scattering in skin", "hemoglobin", "vein appearance"],
    vocabWords: ["hemoglobin", "scattering", "wavelength"],
    reveal:
      "Blood inside your veins is not blue; oxygen-poor blood is still dark red. Skin absorbs and scatters different wavelengths of light, and the way blue and red light travel through tissue makes veins appear blue or greenish to our eyes.",
  },
  {
    id: "why-eyes-dont-freeze",
    category: "human",
    question: "Why don't your eyes freeze when you're outside in extreme cold?",
    lookInto: ["tear film", "blood flow", "corneal protection"],
    vocabWords: ["cornea", "tear film", "circulation"],
    reveal:
      "Your eyes are protected by a constantly renewed tear film and by warm blood circulating through nearby tissues. The tear layer also contains salts and proteins that help prevent it from freezing as easily as pure water.",
  },
  {
    id: "why-we-have-eyebrows",
    category: "human",
    question: "Why do humans have eyebrows?",
    lookInto: ["sweat protection", "facial expression", "evolution"],
    vocabWords: ["evolution", "expression", "perspiration"],
    reveal:
      "Eyebrows help divert sweat and rain away from the eyes, but they also play an important role in facial communication. Their shape and movement make subtle expressions easier for other people to read.",
  },
  {
    id: "why-babies-smell",
    category: "human",
    question: "Why do newborn babies have that distinctive smell?",
    lookInto: ["newborn skin chemistry", "amniotic fluid", "parental bonding"],
    vocabWords: ["olfaction", "bonding", "volatile"],
    reveal:
      "A newborn's smell comes from a mixture of skin oils, natural compounds, and remnants of substances present around birth. Researchers have found that newborn odor can strongly activate reward and bonding-related brain regions in adults.",
  },
  {
    id: "why-heartbeat-silent",
    category: "human",
    question: "Why can't you normally hear your own heartbeat?",
    lookInto: ["internal sound conduction", "brain filtering", "heartbeat perception"],
    vocabWords: ["perception", "filtering", "conduction"],
    reveal:
      "Your heartbeat creates vibrations that can reach your ears through your body, but your brain normally filters predictable internal signals out of conscious awareness. You become much more aware of your heartbeat when you're exercising, anxious, or lying somewhere very quiet.",
  },
  {
    id: "why-stomach-doesnt-digest-itself",
    category: "human",
    question: "Why doesn't your stomach digest itself?",
    lookInto: ["mucus barrier", "stomach lining", "acid protection"],
    vocabWords: ["mucus", "enzyme", "barrier"],
    reveal:
      "The stomach protects itself with a thick mucus layer, tightly controlled acid secretion, and rapid replacement of damaged surface cells. Digestive enzymes are also produced in forms that are activated under specific conditions, limiting damage to the stomach's own tissues.",
  },
  {
    id: "why-brain-fills-blind-spot",
    category: "human",
    question: "Why don't you see the blind spot in your vision?",
    lookInto: ["optic nerve", "retina", "brain visual filling"],
    vocabWords: ["retina", "optic nerve", "perception"],
    reveal:
      "Where the optic nerve leaves the eye, there are no light-sensitive cells, creating a genuine blind spot. You usually never notice it because your two eyes cover different areas and your brain automatically fills in missing visual information.",
  },
  {
    id: "why-tears-different",
    category: "human",
    question: "Are emotional tears actually different from the tears that protect your eyes?",
    lookInto: ["basal tears", "reflex tears", "emotional tears"],
    vocabWords: ["basal", "reflex", "electrolyte"],
    reveal:
      "All tears share the job of protecting and lubricating the eye, but their chemical composition can vary depending on how they are produced. Emotional tears can contain different levels of proteins and other compounds, although the idea that they simply 'remove toxins' is not established.",
  },
  {
    id: "why-nose-stops-smelling",
    category: "human",
    question: "Why does a smell disappear after you've been around it for a while?",
    lookInto: ["olfactory adaptation", "sensory neurons", "attention"],
    vocabWords: ["adaptation", "olfactory", "habituation"],
    reveal:
      "Your sensory system is designed to notice change more than constant signals. When the same odor remains present, olfactory receptors and brain circuits reduce their response, so the smell gradually fades from conscious awareness even though the molecules are still there.",
  },
  {
    id: "why-sleepy-after-eating",
    category: "human",
    question: "Why can a big meal make you feel sleepy?",
    lookInto: ["post-meal physiology", "circadian rhythm", "digestion and alertness"],
    vocabWords: ["circadian", "digestion", "metabolism"],
    reveal:
      "Sleepiness after eating can come from several factors rather than one simple cause. Large meals alter metabolic signals, and if the meal happens during a natural low point in your circadian rhythm, the combination can make you feel especially drowsy.",
  },
  {
    id: "why-time-zones-jetlag",
    category: "human",
    question: "Why does jet lag make you feel like your body clock is broken?",
    lookInto: ["circadian rhythm", "melatonin", "time-zone shifts"],
    vocabWords: ["circadian", "melatonin", "entrainment"],
    reveal:
      "Your body runs on an internal roughly 24-hour clock that coordinates sleep, hormones, temperature, and metabolism. Flying across time zones changes the local schedule instantly, but the internal clock adjusts gradually, creating a temporary mismatch between your biology and the clock on the wall.",
  },
  {
    id: "why-laughing-spreads",
    category: "human",
    question: "Why is laughter so contagious?",
    lookInto: ["social signaling", "vocal imitation", "brain reward systems"],
    vocabWords: ["imitation", "social cue", "reward"],
    reveal:
      "Laughter is both a sound and a social signal. Hearing someone laugh can activate brain systems involved in producing and interpreting social behavior, making you more likely to smile or laugh yourself even when you don't know what started the joke.",
  },
  {
    id: "why-voice-changes",
    category: "human",
    question: "Why does your voice sound different when you're sick?",
    lookInto: ["swollen vocal folds", "nasal congestion", "resonance"],
    vocabWords: ["resonance", "larynx", "congestion"],
    reveal:
      "Illness can change the shape and movement of the structures that create and filter your voice. Swollen vocal folds can lower or roughen the sound, while congestion changes the spaces through which sound resonates, giving your voice its familiar 'sick' quality.",
  },
  {
    id: "why-mosquitoes-find-you",
    category: "nature",
    question: "How do mosquitoes find you in the dark?",
    lookInto: ["carbon dioxide", "body heat", "skin odors"],
    vocabWords: ["carbon dioxide", "olfaction", "infrared"],
    reveal:
      "Mosquitoes use several clues at once. They can detect carbon dioxide in your breath from a distance, then use body heat and skin odors to get closer. Some species can also detect infrared radiation associated with warm bodies.",
  },
  {
    id: "why-moths-to-light",
    category: "nature",
    question: "Why do moths fly toward lights?",
    lookInto: ["artificial light", "navigation by the Moon", "light orientation"],
    vocabWords: ["navigation", "phototaxis", "orientation"],
    reveal:
      "One leading explanation is that moths evolved to use distant light sources such as the Moon for navigation. A nearby artificial light overwhelms that system, causing the insect to keep adjusting its flight angle and spiral around the source.",
  },
  {
    id: "why-crows-smart",
    category: "nature",
    question: "How can crows solve problems that seem almost human?",
    lookInto: ["tool use", "problem solving", "crow cognition"],
    vocabWords: ["cognition", "tool use", "causal"],
    reveal:
      "Crows have unusually flexible problem-solving abilities. Experiments show that some species can use tools, remember individual humans, and solve multi-step problems, suggesting that sophisticated intelligence can evolve in a very different kind of brain from ours.",
  },
  {
    id: "why-dogs-tilt-head",
    category: "nature",
    question: "Why do dogs tilt their heads when you talk to them?",
    lookInto: ["sound localization", "attention", "dog communication"],
    vocabWords: ["localization", "attention", "auditory"],
    reveal:
      "The exact reason is still uncertain, but head tilting may help dogs locate the source of a sound or process familiar words and tones. Dogs may also learn that the behavior gets a positive reaction from humans, reinforcing it.",
  },
  {
    id: "why-cats-land-feet",
    category: "nature",
    question: "How do cats manage to land on their feet?",
    lookInto: ["righting reflex", "flexible spine", "angular momentum"],
    vocabWords: ["reflex", "rotation", "momentum"],
    reveal:
      "Cats have a powerful righting reflex. Their flexible spine and ability to rotate different parts of the body independently let them turn their front and rear halves in sequence, reorienting their feet toward the ground during a fall.",
  },
  {
    id: "why-bats-upside-down",
    category: "nature",
    question: "Why do bats sleep upside down?",
    lookInto: ["bat feet", "hanging anatomy", "takeoff strategy"],
    vocabWords: ["tendon", "roost", "gravity"],
    reveal:
      "A bat's foot anatomy lets it grip a surface using tendons that lock into position without continuous muscle effort. Hanging also gives bats a convenient launch position: they can simply release their grip and drop into flight.",
  },
  {
    id: "why-sunflowers-face-sun",
    category: "nature",
    question: "Why do young sunflowers follow the Sun?",
    lookInto: ["heliotropism", "plant hormones", "growth differences"],
    vocabWords: ["heliotropism", "auxin", "phototropism"],
    reveal:
      "Young sunflower stems grow differently on their shaded and sunlit sides, causing the flower head to track the Sun across the sky. This movement is driven by plant hormones and growth patterns rather than muscles.",
  },
  {
    id: "why-desert-cold-night",
    category: "nature",
    question: "Why can deserts be freezing at night even after a scorching day?",
    lookInto: ["radiative cooling", "humidity", "desert atmosphere"],
    vocabWords: ["radiation", "humidity", "insulation"],
    reveal:
      "Dry desert air contains little water vapor, which normally helps trap heat near the surface. With few clouds and little moisture, the ground can radiate heat rapidly into the night sky, causing temperatures to drop dramatically after sunset.",
  },
  {
    id: "why-ocean-salty",
    category: "nature",
    question: "Why is the ocean salty but most rainwater isn't?",
    lookInto: ["rock weathering", "river minerals", "ocean evaporation"],
    vocabWords: ["salinity", "weathering", "evaporation"],
    reveal:
      "Rainwater picks up tiny amounts of dissolved minerals as it moves through soil and rocks. Rivers carry those ions toward the ocean. Water then evaporates from the ocean while most dissolved salts remain behind, gradually concentrating them over geological time.",
  },
  {
    id: "why-ocean-deep",
    category: "nature",
    question: "Why doesn't the ocean just keep getting deeper?",
    lookInto: ["ocean basins", "water cycle", "tectonic plates"],
    vocabWords: ["tectonics", "basin", "hydrologic"],
    reveal:
      "Ocean depth is constrained by the shape of Earth's crust and by the global water cycle. New ocean crust forms and sinks at different rates, while evaporation, precipitation, ice, groundwater, and runoff continuously move water around rather than simply adding more to the oceans.",
  },
  {
    id: "why-trees-tall",
    category: "nature",
    question: "How can trees move water all the way from their roots to their highest leaves?",
    lookInto: ["xylem", "transpiration pull", "cohesion tension"],
    vocabWords: ["xylem", "transpiration", "cohesion"],
    reveal:
      "Water travels upward through narrow tubes called xylem. As water evaporates from leaves, that loss creates tension that pulls a continuous column of water upward, helped by the attraction between water molecules and the walls of the tubes.",
  },
  {
    id: "why-leaves-green",
    category: "nature",
    question: "Why are most leaves green instead of black if they need to absorb sunlight?",
    lookInto: ["chlorophyll", "light absorption", "photosynthesis"],
    vocabWords: ["chlorophyll", "absorption", "photosynthesis"],
    reveal:
      "Chlorophyll absorbs light strongly in the red and blue parts of the spectrum but reflects more green light, which is why leaves appear green. Plants do not need to absorb every wavelength equally; their pigments evolved around the available sunlight and the chemistry of photosynthesis.",
  },
  {
    id: "why-ants-carry-heavy",
    category: "nature",
    question: "How can ants carry things many times heavier than themselves?",
    lookInto: ["muscle scaling", "body size", "exoskeleton"],
    vocabWords: ["scaling", "exoskeleton", "muscle"],
    reveal:
      "Small animals benefit from the square-cube relationship: their body mass decreases faster with size than the strength of their muscles does. An ant's muscles therefore have a much larger strength-to-body-weight ratio than a human's.",
  },
  {
    id: "why-spiders-dont-stick",
    category: "nature",
    question: "Why don't spiders get trapped in their own webs?",
    lookInto: ["sticky silk", "spider movement", "web architecture"],
    vocabWords: ["silk", "adhesive", "architecture"],
    reveal:
      "Not every strand of a spider web is equally sticky. Spiders often move along non-sticky structural threads, and their legs have specialized surfaces and movements that reduce adhesion. They also know the architecture of their own webs and navigate them carefully.",
  },
  {
    id: "why-space-stinks",
    category: "space",
    question: "Why do astronauts say space can smell like burnt metal?",
    lookInto: ["astronaut suit odor", "spacecraft airlock", "chemical compounds"],
    vocabWords: ["volatile", "oxidation", "residue"],
    reveal:
      "Astronauts cannot smell space directly because they wear sealed suits. But after spacewalks, compounds clinging to the suit can react with oxygen inside the spacecraft, producing odors that astronauts have described as metallic, smoky, or similar to burnt material.",
  },
  {
    id: "why-saturn-floats",
    category: "space",
    question: "Could Saturn actually float in water?",
    lookInto: ["Saturn density", "hydrogen and helium", "planet density"],
    vocabWords: ["density", "hydrogen", "helium"],
    reveal:
      "Saturn's average density is less than water's, mainly because it is made mostly of hydrogen and helium. So in the imaginary case of a bathtub enormous enough to hold it, Saturn would have enough buoyancy to float.",
  },
  {
    id: "why-black-space",
    category: "space",
    question: "Why is space black even though there are billions of stars?",
    lookInto: ["vacuum", "scattered light", "Olbers' paradox"],
    vocabWords: ["vacuum", "scattering", "cosmology"],
    reveal:
      "On Earth, the sky is bright because sunlight scatters through the atmosphere. Space has almost no atmosphere to scatter light in every direction, so most directions between stars remain dark. The expansion and finite age of the universe also matter to the deeper question of why the entire sky is not uniformly bright.",
  },
  {
    id: "why-moon-moves-away",
    category: "space",
    question: "Why is the Moon slowly moving away from Earth?",
    lookInto: ["tidal friction", "Earth's rotation", "orbital energy"],
    vocabWords: ["tides", "friction", "angular momentum"],
    reveal:
      "Earth's tides create friction that transfers some of Earth's rotational energy into the Moon's orbit. As a result, Earth's rotation slowly slows while the Moon gains orbital energy and moves a little farther away each year.",
  },
  {
    id: "why-space-sunburn",
    category: "space",
    question: "Why would the Sun burn you even though space itself is freezing?",
    lookInto: ["vacuum temperature", "solar radiation", "heat transfer"],
    vocabWords: ["radiation", "vacuum", "ultraviolet"],
    reveal:
      "Space does not have air to conduct heat to or from your body, so its temperature is not experienced like the temperature of Earth's atmosphere. In direct sunlight, however, your body absorbs intense solar radiation, including ultraviolet and infrared energy, which can heat and damage you.",
  },
  {
    id: "why-earth-spins",
    category: "space",
    question: "Why is Earth still spinning after billions of years?",
    lookInto: ["angular momentum", "formation of planets", "rotational inertia"],
    vocabWords: ["angular momentum", "inertia", "rotation"],
    reveal:
      "Earth inherited its rotation from the spinning disk of material that formed the Solar System. Because angular momentum is conserved, Earth keeps spinning unless a torque significantly changes that motion. Tidal friction slows the rotation gradually, but it does not stop it quickly.",
  },
  {
    id: "why-clouds-not-fall",
    category: "science",
    question: "Why don't clouds fall out of the sky?",
    lookInto: ["droplet size", "air resistance", "updrafts"],
    vocabWords: ["droplet", "updraft", "gravity"],
    reveal:
      "Cloud droplets are tiny enough that air resistance strongly opposes their fall. Gentle upward-moving air can keep them suspended, and many droplets evaporate before reaching the ground. When droplets grow large enough, gravity wins and they fall as rain.",
  },
  {
    id: "why-metal-expands",
    category: "science",
    question: "Why does almost everything expand when it gets hot?",
    lookInto: ["atomic vibration", "thermal expansion", "material structure"],
    vocabWords: ["expansion", "vibration", "thermal"],
    reveal:
      "Heating gives atoms and molecules more energy, causing them to vibrate more strongly. In many materials, the average distance between neighboring particles increases slightly as they vibrate, making the whole object expand.",
  },
  {
    id: "why-sound-faster-water",
    category: "science",
    question: "Why does sound travel faster through water than through air?",
    lookInto: ["molecular spacing", "elasticity", "speed of sound"],
    vocabWords: ["elasticity", "medium", "pressure"],
    reveal:
      "Sound travels by passing vibrations through a material. Water is much harder to compress than air, so pressure disturbances can move through it rapidly despite water being denser. The speed of sound depends on both the medium's stiffness and its density.",
  },
  {
    id: "why-moon-tides",
    category: "science",
    question: "How can the Moon pull on entire oceans without touching them?",
    lookInto: ["gravity gradients", "tidal forces", "Earth-Moon system"],
    vocabWords: ["gravity", "tide", "gradient"],
    reveal:
      "The Moon's gravity acts across Earth, but it is slightly stronger on the side facing the Moon than on the far side. That difference across Earth's diameter is called a tidal force, and it stretches the oceans into bulges as Earth rotates through them.",
  },
  {
    id: "why-hot-water-freezes",
    category: "science",
    question: "Can hot water ever freeze faster than cold water?",
    lookInto: ["Mpemba effect", "evaporation", "convection"],
    vocabWords: ["Mpemba effect", "evaporation", "convection"],
    reveal:
      "Under some conditions, warmer water can freeze faster than cooler water, a phenomenon known as the Mpemba effect. Researchers have proposed several contributing factors, including evaporation, convection, dissolved gases, and differences in supercooling, but there is no single explanation that works for every setup.",
  },
  {
    id: "why-pressure-cooker",
    category: "science",
    question: "Why does food cook faster in a pressure cooker?",
    lookInto: ["boiling point", "pressure", "steam"],
    vocabWords: ["pressure", "boiling point", "steam"],
    reveal:
      "Water normally boils when its vapor pressure matches atmospheric pressure. A pressure cooker raises the pressure above the water, which raises its boiling temperature. The hotter steam and water transfer heat to food faster, reducing cooking time.",
  },
  {
    id: "why-salt-water-boil",
    category: "science",
    question: "Does adding salt really make water boil faster?",
    lookInto: ["boiling point elevation", "salt concentration", "cooking myths"],
    vocabWords: ["boiling point", "solute", "concentration"],
    reveal:
      "Adding salt actually raises water's boiling point slightly rather than making it boil faster. At typical cooking concentrations the effect is small, so the amount of salt used in a pot does not meaningfully speed up the time it takes to reach a boil.",
  },
  {
    id: "why-metal-spoon-hot",
    category: "everyday",
    question: "Why does a metal spoon get hot so quickly in soup?",
    lookInto: ["thermal conductivity", "heat transfer", "metal lattice"],
    vocabWords: ["conductivity", "conduction", "thermal"],
    reveal:
      "Metals contain electrons and atomic structures that allow thermal energy to move efficiently through them. Heat from the hot soup travels along the spoon much faster than it would through materials such as wood or plastic, which is why the handle can become hot surprisingly quickly.",
  },
  {
    id: "why-popcorn-kernels-differ",
    category: "science",
    question: "Why do some popcorn kernels refuse to pop?",
    lookInto: ["kernel moisture", "hull damage", "popcorn structure"],
    vocabWords: ["moisture", "hull", "pressure"],
    reveal:
      "A popcorn kernel needs the right combination of moisture and an intact outer shell. If it is too dry, there is not enough steam pressure; if the hull is cracked, pressure escapes before the starch can explode outward.",
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
