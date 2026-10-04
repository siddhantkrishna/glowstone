/* ==========================================================
   GLOWSTONE — CONTENT COLLECTIONS
   A flat, typed content layer. Swap for a headless CMS
   (Sanity, Contentful, Payload) by matching these shapes.
   ========================================================== */

export const IMG = {
  crystal: "images/hero-crystal.jpg",
  aiit: "images/project-aiit.jpg",
  spark: "images/project-spark.jpg",
  meso: "images/project-mesosphere.jpg",
  brand: "images/project-glowstone.jpg",
  founder: "images/founder.jpg",
  paper: "images/material-paper.jpg",
  glass: "images/material-glass.jpg",
  arch: "images/architecture.jpg",
  studio: "images/studio-process.jpg",
} as const;

export const VIDEO = {
  shadows: {
    src: "https://videos.pexels.com/video-files/11025693/11025693-hd_4096_2160_30fps.mp4",
    poster: "https://images.pexels.com/videos/11025693/pexels-photo-11025693.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920",
  },
};

export const STUDIO = {
  name: "Glowstone",
  descriptor: "Creative Technology Studio",
  city: "Mumbai",
  country: "India",
  email: "hello@glowstone.studio",
  social: [
    { label: "Instagram", href: "https://instagram.com/glowstone.studio" },
    { label: "LinkedIn", href: "https://linkedin.com/company/glowstone-studio" },
    { label: "X", href: "https://x.com/glowstonestudio" },
  ],
};

/* ---------------- CATEGORIES ---------------- */
export const CATEGORIES = [
  { slug: "branding", label: "Branding" },
  { slug: "websites", label: "Websites" },
  { slug: "web-apps", label: "Web Apps" },
  { slug: "apps", label: "Apps" },
  { slug: "games", label: "Games" },
  { slug: "social", label: "Social" },
  { slug: "creative", label: "Creative" },
] as const;
export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

/* ---------------- SERVICES ---------------- */
export type Service = {
  num: string;
  slug: CategorySlug;
  title: string;
  short: string;
  statement: string;
  description: string;
  deliverables: string[];
  process: string[];
  image: string;
};

export const SERVICES: Service[] = [
  {
    num: "01",
    slug: "branding",
    title: "Branding",
    short: "Logos, visual identities, design systems and brand direction.",
    statement: "A brand is the sum of every decision. We make the decisions consistent.",
    description:
      "We build identities as systems rather than single marks — a logic for type, colour, image, voice and behaviour that holds together on a business card, a website and a billboard. The goal is recognition without repetition.",
    deliverables: ["Logos", "Visual identities", "Brand systems", "Art direction", "Guidelines"],
    process: ["Audit & positioning", "Concept territories", "Identity system", "Rollout & guidelines"],
    image: IMG.brand,
  },
  {
    num: "02",
    slug: "websites",
    title: "Websites",
    short: "Business websites, portfolios, landing pages and digital experiences.",
    statement: "A website is often the first real conversation. It should be a good one.",
    description:
      "From a focused landing page to a full editorial platform, we design and build websites that explain clearly, load quickly and stay easy to update. Structure first, then story, then surface.",
    deliverables: ["Strategy", "UX", "UI", "Development", "CMS", "SEO", "Launch"],
    process: ["Content architecture", "Wireframes & narrative", "Design system", "Build, test, launch"],
    image: IMG.arch,
  },
  {
    num: "03",
    slug: "web-apps",
    title: "Web Apps",
    short: "Portals, dashboards, internal tools and custom web applications.",
    statement: "Good software disappears into the work it supports.",
    description:
      "We design and engineer browser-based products for teams and customers — dashboards that make data legible, portals that remove friction and internal tools that replace the spreadsheet everyone is afraid to touch.",
    deliverables: ["Dashboards", "Portals", "Internal tools", "Customer platforms", "Custom systems"],
    process: ["Workflow mapping", "Information design", "Interface system", "Engineering & iteration"],
    image: IMG.glass,
  },
  {
    num: "04",
    slug: "apps",
    title: "Apps",
    short: "Mobile and desktop applications designed and built around real use cases.",
    statement: "Built for the hand, the habit and the moment it is needed.",
    description:
      "Native-feeling mobile and desktop applications, designed around how people actually behave. We prototype early, test with real users and ship products that feel considered in every tap.",
    deliverables: ["Mobile", "Desktop", "Product interfaces", "Prototypes"],
    process: ["Use-case research", "Interactive prototypes", "Interface & motion", "Build & release"],
    image: IMG.paper,
  },
  {
    num: "05",
    slug: "games",
    title: "Games",
    short: "Simple games, interactive experiences and playful digital products.",
    statement: "Play is one of the oldest ways people learn.",
    description:
      "Small, well-made games and interactive pieces — for campaigns, education, launches or simply delight. We keep mechanics simple and craft high, so the idea lands in seconds.",
    deliverables: ["Interactive experiences", "Simple games", "Campaign experiences"],
    process: ["Core mechanic", "Paper & digital prototype", "Art direction", "Polish & ship"],
    image: IMG.meso,
  },
  {
    num: "06",
    slug: "social",
    title: "Social",
    short: "Social media management, content systems and creative direction.",
    statement: "Consistency is a system, not a mood.",
    description:
      "We build content systems — templates, tone, formats and rhythm — that let a brand show up well every week without starting from zero. Then we help run them.",
    deliverables: ["Content systems", "Creative direction", "Social management", "Campaigns"],
    process: ["Voice & pillars", "Format system", "Production rhythm", "Review & refine"],
    image: IMG.studio,
  },
  {
    num: "07",
    slug: "creative",
    title: "Creative",
    short: "Posters, presentations, campaigns, graphics and other visual work.",
    statement: "Sometimes the idea needs to exist on paper first.",
    description:
      "Posters, decks, campaign graphics and editorial design. The work that carries an idea into a room, onto a wall or across a screen — made with the same care as everything else.",
    deliverables: ["Posters", "Presentations", "Campaigns", "Graphics", "Editorial design"],
    process: ["Brief & reference", "Concepts", "Design & typesetting", "Production"],
    image: IMG.spark,
  },
];

/* ---------------- PROJECTS ---------------- */
export type Project = {
  slug: string;
  num: string;
  title: string;
  client: string;
  year: string;
  sector: string;
  disciplines: string[];
  categories: CategorySlug[];
  description: string;
  challenge: string;
  approach: string;
  system: string;
  experience: string;
  result: string;
  hero: string;
  gallery: string[];
  process: { image: string; caption: string }[];
  video?: string;
  credits: { role: string; name: string }[];
  published: string;
  selfInitiated?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "aiit-college",
    num: "01",
    title: "AIIT College",
    client: "AIIT College",
    year: "2025",
    sector: "Education — Digital Experience",
    disciplines: ["Website", "Branding", "Creative"],
    categories: ["websites", "branding", "creative"],
    description:
      "A digital front door for an institution — rebuilt around the questions students and parents actually ask.",
    challenge:
      "The college had grown faster than its communication. Programmes, admissions, campus life and results were scattered across documents, notice boards and an ageing website. Prospective students could not find answers; staff answered the same questions every day.",
    approach:
      "We started with the questions, not the pages. Interviews with students, parents and faculty produced a ranked list of what people needed to know. That list became the information architecture — and the tone of voice.",
    system:
      "A restrained identity refresh built on a confident grotesk, an architectural grid inspired by the campus itself and a photographic language of real people in real spaces. Every component was designed to be reused across web, print and social.",
    experience:
      "Programme pages that read like editorial features. An admissions journey reduced to clear steps. A campus section built around place, light and people rather than stock smiles.",
    result:
      "One coherent system across the website, admissions material and campaigns — easier for students to navigate and simpler for staff to maintain.",
    hero: IMG.aiit,
    gallery: [IMG.arch, IMG.studio, IMG.paper],
    process: [
      { image: IMG.studio, caption: "Question mapping workshop — ranking what people need to know." },
      { image: IMG.paper, caption: "Print and digital share one typographic system." },
    ],
    credits: [
      { role: "Strategy & Direction", name: "Glowstone" },
      { role: "Design & Development", name: "Glowstone" },
      { role: "Photography direction", name: "Glowstone" },
    ],
    published: "2025-09-01",
  },
  {
    slug: "spark-labs",
    num: "02",
    title: "Spark Labs",
    client: "Spark Labs",
    year: "2025",
    sector: "Education — Technology",
    disciplines: ["Website", "Digital Product", "Brand"],
    categories: ["websites", "web-apps", "branding"],
    description:
      "An identity and learning platform for a lab that teaches young people to build with technology.",
    challenge:
      "Spark Labs needed to feel credible to parents and schools while staying genuinely exciting to the students themselves. Most ed-tech brands choose one audience. We needed both.",
    approach:
      "We designed around a single idea — the moment something clicks. A small spark mark, a precise grid and a playful but disciplined colour system that could flex from a parent brochure to a classroom dashboard.",
    system:
      "Brand system, website and a lightweight student portal sharing one component library. Typography carries the voice; colour is used as reward, not decoration.",
    experience:
      "A website that explains programmes in plain language, and a portal where students track projects, submit work and see progress at a glance.",
    result:
      "A brand that works in a boardroom and a classroom, and a product foundation the team can extend term after term.",
    hero: IMG.spark,
    gallery: [IMG.paper, IMG.glass, IMG.studio],
    process: [
      { image: IMG.paper, caption: "Card system exploring the spark mark at every scale." },
      { image: IMG.glass, caption: "Portal interface studies — progress made visible." },
    ],
    credits: [
      { role: "Brand & Product Design", name: "Glowstone" },
      { role: "Engineering", name: "Glowstone" },
    ],
    published: "2025-06-12",
  },
  {
    slug: "mesosphere",
    num: "03",
    title: "Mesosphere",
    client: "Mesosphere",
    year: "2026",
    sector: "Technology — Venture",
    disciplines: ["Digital Experience"],
    categories: ["websites", "creative"],
    description:
      "A calm, cinematic digital presence for a venture working at the edge of what is technically possible.",
    challenge:
      "Deep technology is difficult to explain without either drowning people in detail or flattening it into buzzwords. Mesosphere needed to be understood by investors, partners and future hires — quickly.",
    approach:
      "We treated the website as a short film. A slow, scroll-led narrative that introduces one idea per screen, supported by atmospheric imagery and precise, unhurried copy.",
    system:
      "A minimal palette of deep charcoal and a single warm horizon line. Typography does the explaining; imagery does the feeling. Every motion is tied to scroll and can be switched off.",
    experience:
      "A sequence of full-viewport chapters, pinned typography and a technical appendix for those who want depth — progressive disclosure rather than everything at once.",
    result:
      "A presence that feels as serious as the work behind it, and a narrative the founders now use in every pitch.",
    hero: IMG.meso,
    gallery: [IMG.glass, IMG.arch, IMG.crystal],
    process: [
      { image: IMG.glass, caption: "Light studies used to define the horizon motif." },
      { image: IMG.arch, caption: "Narrative storyboard — one idea per screen." },
    ],
    credits: [
      { role: "Narrative & Design", name: "Glowstone" },
      { role: "Creative Development", name: "Glowstone" },
    ],
    published: "2026-01-20",
  },
  {
    slug: "glowstone",
    num: "04",
    title: "Glowstone",
    client: "Glowstone (Self)",
    year: "2026",
    sector: "Studio — Identity",
    disciplines: ["Brand Identity", "Digital Experience"],
    categories: ["branding", "websites"],
    description:
      "Our own identity: a rare material used sparingly, and a typographic system that does most of the talking.",
    challenge:
      "Studios are often worst at designing for themselves. We needed an identity that could carry strategy, design and technology without leaning on any one of them — and without looking like every other studio.",
    approach:
      "We started with a material rather than a mark: a warm, translucent stone that holds light. Amber became our only accent — rare, valuable, intentional — set against a disciplined black-and-warm-white system.",
    system:
      "Grotesk display type, an editorial serif for considered moments, a mono for technical labels and a strict 12-column grid. The amber appears only where it means something.",
    experience:
      "This website: a long-form publication with pinned chapters, editorial captions and motion that explains rather than performs.",
    result:
      "An identity we can extend across proposals, social, print and product without it losing shape.",
    hero: IMG.brand,
    gallery: [IMG.crystal, IMG.paper, IMG.glass],
    process: [
      { image: IMG.crystal, caption: "The material that started the identity." },
      { image: IMG.paper, caption: "Stationery studies — amber used once per surface." },
    ],
    credits: [{ role: "Everything", name: "Glowstone" }],
    published: "2026-03-01",
    selfInitiated: true,
  },
  {
    slug: "ledger",
    num: "05",
    title: "Ledger",
    client: "Studio tool",
    year: "2026",
    sector: "Internal — Operations",
    disciplines: ["Web App", "Automation"],
    categories: ["web-apps"],
    description:
      "An internal project-tracking tool built to replace five spreadsheets and a lot of messages.",
    challenge:
      "Proposals, timelines, invoices and assets lived in different places. Every project began with fifteen minutes of searching.",
    approach:
      "We mapped our own workflow honestly, then designed the smallest tool that removed the most friction. AI-assisted scripts handle the repetitive parts; people handle the decisions.",
    system:
      "A dense but calm interface — tabular numbers, keyboard-first navigation and a single amber state for anything that needs attention.",
    experience:
      "One view per project. One place for every file. One signal for what needs doing next.",
    result: "Less searching, more building. The tool now runs every Glowstone project.",
    hero: IMG.glass,
    gallery: [IMG.studio, IMG.paper],
    process: [{ image: IMG.studio, caption: "Workflow mapping on paper before a single screen." }],
    credits: [{ role: "Design & Engineering", name: "Glowstone" }],
    published: "2026-02-10",
    selfInitiated: true,
  },
  {
    slug: "field-notes",
    num: "06",
    title: "Field Notes",
    client: "Studio experiment",
    year: "2025",
    sector: "Experiment — Play",
    disciplines: ["Game", "Interactive"],
    categories: ["games", "creative"],
    description:
      "A small browser game about noticing things — built to test how little a game needs to feel complete.",
    challenge: "Can a game teach attention in under two minutes, with one mechanic and no tutorial?",
    approach:
      "One rule, one screen, one sound. We prototyped on paper, then in the browser, cutting everything that needed explaining.",
    system: "Monochrome illustration, a single warm highlight for discoveries and haptic-feeling micro-motion.",
    experience: "Players scan a quiet scene for small changes. The game ends when you stop noticing.",
    result: "A playable argument for restraint — and a template for future campaign games.",
    hero: IMG.arch,
    gallery: [IMG.meso, IMG.paper],
    process: [{ image: IMG.paper, caption: "Paper prototype — one rule, one screen." }],
    credits: [{ role: "Design & Development", name: "Glowstone" }],
    published: "2025-11-05",
    selfInitiated: true,
  },
  {
    slug: "monsoon-posters",
    num: "07",
    title: "Monsoon Posters",
    client: "Self-initiated",
    year: "2025",
    sector: "Print — Typography",
    disciplines: ["Posters", "Editorial", "Social"],
    categories: ["creative", "social"],
    description: "A typographic poster series about Mumbai in the rain — printed, photographed and published weekly.",
    challenge: "Make a body of work that was purely about craft, with a fixed weekly deadline.",
    approach:
      "Twelve weeks, twelve posters, one grid. Each poster responded to a single observation from the city that week.",
    system: "A shared grid and two typefaces. Constraint as the creative engine.",
    experience: "Printed at A2, photographed in situ and published as a social series with short essays.",
    result: "A study in consistency that shaped how we now design content systems for clients.",
    hero: IMG.paper,
    gallery: [IMG.spark, IMG.studio],
    process: [{ image: IMG.studio, caption: "Weekly proofs on the studio wall." }],
    credits: [{ role: "Design", name: "Glowstone" }],
    published: "2025-08-18",
    selfInitiated: true,
  },
  {
    slug: "pulse",
    num: "08",
    title: "Pulse",
    client: "Concept",
    year: "2026",
    sector: "Product — Concept",
    disciplines: ["App", "Product Design"],
    categories: ["apps"],
    description: "A concept mobile app for small teams to check in without another meeting.",
    challenge: "Status meetings consume time that small teams cannot spare.",
    approach: "We prototyped a thirty-second daily check-in and tested it with real teams for two weeks.",
    system: "Large type, one action per screen and an interface that gets out of the way.",
    experience: "Open, answer three short prompts, close. The team sees a calm summary each morning.",
    result: "An interaction model we now bring to client product work.",
    hero: IMG.crystal,
    gallery: [IMG.glass, IMG.paper],
    process: [{ image: IMG.paper, caption: "Prompt cards tested before any interface." }],
    credits: [{ role: "Product Design", name: "Glowstone" }],
    published: "2026-03-22",
    selfInitiated: true,
  },
];

export const FEATURED = PROJECTS.slice(0, 4);

/* ---------------- JOURNAL ---------------- */
export type Article = {
  slug: string;
  title: string;
  category: "Design" | "Technology" | "Branding" | "AI" | "Culture" | "Building";
  author: string;
  date: string;
  readingTime: string;
  cover: string;
  excerpt: string;
  content: { h?: string; p?: string; q?: string }[];
};

export const JOURNAL_CATEGORIES = ["Design", "Technology", "Branding", "AI", "Culture", "Building"] as const;

export const ARTICLES: Article[] = [
  {
    slug: "why-most-business-websites-feel-the-same",
    title: "Why most business websites feel the same",
    category: "Design",
    author: "Siddhant Krishna",
    date: "2026-04-08",
    readingTime: "6 min",
    cover: IMG.arch,
    excerpt:
      "Hero, three features, testimonials, call to action. The template is not the problem. Starting from it is.",
    content: [
      { p: "Open ten business websites in ten tabs and you will see the same page ten times. A large headline. Three icons in a row. A wall of logos. A testimonial carousel. A button that says Get Started." },
      { p: "None of these elements are wrong. They became common because they work, to a point. The problem is that most websites are built by choosing a structure first and fitting the business into it afterwards." },
      { h: "Structure should follow the question" },
      { p: "Every visitor arrives with a question. What is this? Is it for me? Can I trust it? What do I do next? A good website answers those questions in the order the visitor asks them — which is different for a college, a venture and a café." },
      { q: "A template answers someone else's questions." },
      { p: "When we start a website, we write the questions down before we design anything. The page structure comes out of that list. Sometimes it looks familiar. Often it does not. Either way, it belongs to the business." },
      { h: "Distinction is a by-product" },
      { p: "Trying to look different usually produces noise. Trying to be clear about something specific usually produces something distinct. The difference is worth more than any effect." },
    ],
  },
  {
    slug: "designing-for-clarity",
    title: "Designing for clarity",
    category: "Design",
    author: "Siddhant Krishna",
    date: "2026-03-21",
    readingTime: "5 min",
    cover: IMG.paper,
    excerpt: "Clarity is not minimalism. It is the discipline of making sure the important thing is the obvious thing.",
    content: [
      { p: "Clarity is often confused with minimalism. Remove enough and things become clear — or so the thinking goes. But an empty page can be just as confusing as a crowded one." },
      { h: "Hierarchy is the work" },
      { p: "Clarity comes from hierarchy: deciding what matters most, then making sure the design agrees. Size, weight, position, colour and space all vote. When they vote together, people understand without effort." },
      { q: "The important thing should be the obvious thing." },
      { p: "We use a simple test. Show a page to someone for five seconds, then take it away. Ask what it was about and what they would do next. If the answers are vague, the hierarchy is wrong — no matter how good it looks." },
      { p: "Clarity is not a style. It is a result. And it is almost always the result of removing the second-most-important thing from competing with the first." },
    ],
  },
  {
    slug: "what-ai-changes-about-creative-work",
    title: "What AI changes about creative work",
    category: "AI",
    author: "Siddhant Krishna",
    date: "2026-03-02",
    readingTime: "8 min",
    cover: IMG.glass,
    excerpt: "AI makes exploration cheap. That makes judgement — knowing what to keep — the scarce resource.",
    content: [
      { p: "We use AI every day. For research, for exploring directions, for writing and debugging code, for organising information and for automating the repetitive parts of production. It has changed how we work. It has not changed what we are responsible for." },
      { h: "Exploration became cheap" },
      { p: "Ten years ago, exploring twenty directions for a project took a week. Now it can take an afternoon. That is genuinely useful — but it moves the hard part. When options are abundant, the skill is choosing." },
      { q: "AI generates. People direct." },
      { p: "Judgement, taste and responsibility do not compress. Someone still needs to understand the business, the audience and the problem — and decide what is right, not just what is possible." },
      { h: "Infrastructure, not identity" },
      { p: "That is why we do not call ourselves an AI studio. AI is part of our infrastructure, like version control or a good type foundry. Clients do not hire us for our tools. They hire us for the outcome — and people remain responsible for it." },
    ],
  },
  {
    slug: "why-a-brand-is-more-than-a-logo",
    title: "Why a brand is more than a logo",
    category: "Branding",
    author: "Siddhant Krishna",
    date: "2026-02-14",
    readingTime: "5 min",
    cover: IMG.brand,
    excerpt: "A logo is a signature. A brand is how you behave every time you are not in the room.",
    content: [
      { p: "Clients often come to us asking for a logo. What they usually need is a system: a way of making decisions about type, colour, image, words and behaviour that stays consistent as the business grows." },
      { h: "The mark is the smallest part" },
      { p: "A logo matters. But people rarely remember a business by its mark alone. They remember how the website felt, how the invoice read, how the social posts sounded. That is the brand." },
      { q: "A logo is a signature. A brand is a character." },
      { p: "So we design identities as systems — a set of rules generous enough to allow variety and strict enough to keep recognition. The logo is where it starts, not where it ends." },
    ],
  },
  {
    slug: "building-digital-products-without-losing-the-human-part",
    title: "Building digital products without losing the human part",
    category: "Building",
    author: "Siddhant Krishna",
    date: "2026-01-27",
    readingTime: "7 min",
    cover: IMG.studio,
    excerpt: "Speed is easy to measure. Care is not. The best products make room for both.",
    content: [
      { p: "Modern tools let small teams build remarkable things quickly. The risk is that speed becomes the only measure — and the details that make a product feel human get cut first." },
      { h: "Small decisions, large effects" },
      { p: "The copy on an empty state. The pause before an animation. The order of fields in a form. None of these will appear in a roadmap. All of them shape how a product feels." },
      { q: "Care is a feature nobody writes a ticket for." },
      { p: "We protect time for those details explicitly. Every project has a refinement phase that exists only to remove friction and add care. It is often the phase clients remember most." },
    ],
  },
  {
    slug: "the-case-for-less",
    title: "The case for less",
    category: "Culture",
    author: "Siddhant Krishna",
    date: "2025-12-30",
    readingTime: "4 min",
    cover: IMG.crystal,
    excerpt: "Fewer pages, fewer features, fewer colours. Less is not a style — it is a decision you keep making.",
    content: [
      { p: "Every project accumulates. One more page, one more feature, one more colour for a special case. Each addition is reasonable. Together, they make things harder to understand." },
      { h: "Subtraction is a skill" },
      { p: "Removing things is harder than adding them because every element has someone who wanted it. Saying no requires a clear reason — which is why good strategy makes good design easier." },
      { q: "Less is a decision you keep making." },
      { p: "We use amber in our own identity the way we hope clients use features: rarely, deliberately, and only where it means something." },
    ],
  },
];

/* ---------------- TESTIMONIALS ----------------
   Replace with verified, approved client quotes before launch. */
export type Testimonial = { quote: string; name: string; role: string; project?: string };
export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Glowstone helped turn a complicated idea into something people could immediately understand.",
    name: "Leadership Team",
    role: "Mesosphere",
    project: "mesosphere",
  },
  {
    quote: "They asked better questions than we did — and the website finally answers the ones our students actually have.",
    name: "Administration",
    role: "AIIT College",
    project: "aiit-college",
  },
  {
    quote: "It works for parents in a meeting and for kids in a classroom. We didn't think one brand could do both.",
    name: "Founding Team",
    role: "Spark Labs",
    project: "spark-labs",
  },
];

/* ---------------- PRESS ----------------
   Intentionally empty. Nothing is shown until real coverage exists. */
export const PRESS: { publication: string; title: string; href: string; year: string }[] = [];

/* ---------------- RESOURCES ---------------- */
export const RESOURCES = [
  { title: "Project brief template", type: "Document", href: "mailto:hello@glowstone.studio?subject=Brief%20template" },
  { title: "Website content checklist", type: "Checklist", href: "mailto:hello@glowstone.studio?subject=Content%20checklist" },
];

/* ---------------- TEAM ---------------- */
export const TEAM = [
  {
    name: "Siddhant Krishna",
    role: "Founder",
    image: IMG.founder,
    bio: [
      "Siddhant started Glowstone with a simple observation: most businesses are forced to choose between people who design well and people who build well. Rarely do they get both in the same room.",
      "His work sits between those two worlds — identity and interface, strategy and engineering, the idea and the thing that ships. He believes good design is mostly good decisions, made consistently.",
      "He works from Mumbai, writes about design and technology in the Journal, and uses AI daily as a production tool — never as a substitute for judgement.",
    ],
  },
];

/* ---------------- CAPABILITIES ---------------- */
export const CAPABILITIES = [
  "Strategy",
  "Brand Identity",
  "Art Direction",
  "UI/UX",
  "Web Design",
  "Web Development",
  "App Development",
  "Product Design",
  "Creative Technology",
  "Content Systems",
  "Social Media",
  "Interactive Experiences",
  "Automation",
  "AI-assisted Production",
];

export const PROCESS = [
  { num: "01", title: "Discover", text: "Understand the business, audience, problem and opportunity.", detail: ["Stakeholder interviews", "Audience research", "Competitive landscape", "Problem framing"] },
  { num: "02", title: "Strategize", text: "Define positioning, structure, priorities and direction.", detail: ["Positioning", "Information architecture", "Scope & priorities", "Creative direction"] },
  { num: "03", title: "Design", text: "Create the visual language, experience and interface.", detail: ["Identity system", "UX flows", "Interface design", "Motion principles"] },
  { num: "04", title: "Build", text: "Turn the system into a working digital product.", detail: ["Front-end engineering", "CMS & integrations", "Performance", "Accessibility"] },
  { num: "05", title: "Refine", text: "Test, iterate, polish and remove everything unnecessary.", detail: ["User testing", "QA across devices", "Copy refinement", "Subtraction"] },
  { num: "06", title: "Launch", text: "Ship the final experience and support its next phase.", detail: ["Deployment", "Analytics", "Handover & training", "Ongoing iteration"] },
];

export const MANIFESTO = [
  { a: "Clarity", b: "over noise." },
  { a: "Systems", b: "over trends." },
  { a: "Purpose", b: "over decoration." },
  { a: "Craft", b: "over output." },
  { a: "People", b: "over process." },
  { a: "Long-term", b: "over quick wins." },
];

export const CLIENT_JOURNEY = [
  "Tell us what you're building.",
  "We understand the problem.",
  "We define the right approach.",
  "We design the system.",
  "We build the experience.",
  "We launch it.",
  "We keep improving it.",
];

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();
