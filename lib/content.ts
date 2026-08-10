/**
 * Single source of truth for all site content.
 *
 * Everything here is static and rendered at build time — there is no API,
 * database, or server-side data fetching anywhere in this project.
 *
 * To update the site, edit this file.
 */

/* ------------------------------------------------------------------ */
/* Images                                                              */
/* ------------------------------------------------------------------ */

/**
 * Two density variants of the same square crop (not two breakpoint sizes —
 * the portrait's rendered width barely changes between mobile and desktop,
 * so this is a 1x/2x srcset for pixel density, not a viewport-based one).
 */
export const images = {
  headshot: "/images/headshot-800.jpg",
  headshotLarge: "/images/headshot-1600.jpg",
};

export const resumePath = "/norman-muhwezi-cv.pdf";

/**
 * Case-study image placeholders. `src: null` renders a neutral editorial
 * placeholder block instead of a photo — swapping in the real asset later
 * is a one-line edit here (set `src`, update `alt`), no component or layout
 * changes required.
 */
export type CaseStudyImage = {
  src: string | null;
  alt: string;
  label: string;
  caption?: string;
};

/**
 * One ordered array per story, shown through a single manual carousel in
 * the lead-image position — not fixed lead/supporting/optional slots at
 * different points on the page. A one-image array renders as a plain
 * photo with no carousel controls; controls only appear once there's
 * something to switch between.
 */
export const caseStudyImages: Record<
  "drc" | "coteDIvoire" | "telecom",
  CaseStudyImage[]
> = {
  drc: [
    {
      src: "/images/case-studies/drc-ureport-group.jpg",
      alt: "A group of U-Report DRC volunteers in matching black \"U-Report par UNICEF\" T-shirts, posing and cheering together on a street during a community clean-up.",
      label: "DRC project photo",
      caption: "U-Report community engagement in DRC.",
    },
    {
      src: "/images/case-studies/drc-ureport-megaphone.jpg",
      alt: "A U-Report DRC volunteer wearing a \"U-Report par UNICEF\" T-shirt speaks into a megaphone to mobilise the community at a local market.",
      label: "DRC project photo",
      caption: "Community mobilisation through U-Report in DRC.",
    },
    {
      src: "/images/case-studies/drc-ureport-cleanup.jpg",
      alt: "Two U-Report DRC volunteers in branded T-shirts collect litter into bags along a riverbank as part of a community clean-up drive.",
      label: "DRC project photo",
      caption: "U-Report volunteers taking part in a community clean-up drive, DRC.",
    },
  ],
  coteDIvoire: [
    {
      src: null,
      alt: "",
      label: "Cote d'Ivoire project photo",
    },
  ],
  telecom: [
    {
      src: null,
      alt: "",
      label: "Telecom project visual",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: "Africa & Emerging Markets · Based in Addis Ababa",
  name: "Norman K. Muhwezi",
  title: "Digital Transformation Leader",
  copy: "I've spent 15 years turning ambitious technology ideas into systems that work at scale, including telecom networks, digital platforms used by millions, and a $12.6M public-private partnership. I now bring that same delivery experience to AI adoption advisory work.",
};

/* ------------------------------------------------------------------ */
/* Career trajectory                                                   */
/* ------------------------------------------------------------------ */

export type CareerStage = {
  year: string;
  stage: string;
  body: string;
};

export const careerStages: CareerStage[] = [
  {
    year: "2009",
    stage: "Networks",
    body: "Planning and delivering telecom infrastructure at scale.",
  },
  {
    year: "2016",
    stage: "Platforms",
    body: "Building digital services that reached millions of people.",
  },
  {
    year: "2020s",
    stage: "Scale",
    body: "Bringing together funding, partners and teams to move proven ideas into wider use.",
  },
  {
    year: "Now",
    stage: "AI",
    body: "Applying my delivery experience to practical AI adoption.",
  },
];

/* ------------------------------------------------------------------ */
/* Impact metrics                                                      */
/* ------------------------------------------------------------------ */

export type Metric = { value: string; label: string };

/** Exactly four — a fifth alone on its own row reads as an afterthought. */
export const impactMetrics: Metric[] = [
  { value: "15+", label: "Years across technology & transformation" },
  { value: "12.4M+", label: "Users reached through scaled digital platforms" },
  { value: "$20M+", label: "Portfolio leadership" },
  { value: "1,000+", label: "Telecom sites delivered / modernised" },
];

/* ------------------------------------------------------------------ */
/* Selected transformation stories                                     */
/* ------------------------------------------------------------------ */

export type CaseStudyStep = {
  number: string;
  label: string;
  body: string;
};

export type CaseStudy = {
  id: "drc" | "coteDIvoire" | "telecom";
  eyebrow: string;
  headline: string;
  supportingLine: string;
  /** Short, scannable evidence — visible without opening anything. */
  proofPoints: string[];
  steps: CaseStudyStep[];
  /** Caption shown above the interactive step diagram. */
  stepsCta: string;
  /** Exact substrings of headline/supportingLine/proofPoints to accent. */
  highlight: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "drc",
    eyebrow: "Digital platform at national scale",
    headline: "Scaling U-Report to 8.6M users across DRC.",
    supportingLine:
      "The partnerships, localisation and delivery choices behind U-Report's growth across the Democratic Republic of Congo.",
    proofPoints: [
      "8.6M+ users across every province",
      "150+ community clubs, including 30+ girls-only clubs",
      "Zero-rated data agreements with Orange, Vodacom, Airtel and Africell",
      "Connected to UNICEF's HOPE cash-transfer verification system",
    ],
    steps: [
      {
        number: "01",
        label: "Context",
        body: "U-Report was growing across a large, multilingual country with different local realities and partners.",
      },
      {
        number: "02",
        label: "Model",
        body: "The platform, local partnerships, language choices, communication channels and governance needed to support growth.",
      },
      {
        number: "03",
        label: "Delivery",
        body: "Working with partners, connecting the platform to programme delivery, tracking use and improving the service over time.",
      },
      {
        number: "04",
        label: "Scale",
        body: "8.6M+ users reached across the country.",
      },
    ],
    stepsCta: "Tap a step for details",
    highlight: ["8.6M", "8.6M+"],
  },
  {
    id: "coteDIvoire",
    eyebrow: "From pilot to operating model",
    headline: "Building a $12.6M partnership around recycled-plastic classrooms.",
    supportingLine:
      "How the idea moved from an early concept to more than 300 classrooms, backed by financing, quality testing and real-time construction monitoring.",
    proofPoints: [
      "$12.6M public-private partnership with Conceptos Plasticos",
      "1,500+ tons of recycled plastic converted into 300+ classrooms",
      "15,000+ children served",
      "$212,000 in government cost reimbursement secured",
    ],
    steps: [
      {
        number: "01",
        label: "Context",
        body: "The classroom concept needed a clear route from early testing to dependable construction at scale.",
      },
      {
        number: "02",
        label: "Model",
        body: "I helped structure the partnership, financing arrangements and government engagement around the programme.",
      },
      {
        number: "03",
        label: "Delivery",
        body: "We put independent testing, quality checks and real-time construction monitoring in place as delivery expanded.",
      },
      {
        number: "04",
        label: "Scale",
        body: "300+ classrooms built, serving 15,000+ children, with the model shared for wider use.",
      },
    ],
    stepsCta: "Explore the delivery model",
    highlight: ["$12.6M", "1,500+ tons", "300+ classrooms", "15,000+ children", "$212,000"],
  },
  {
    id: "telecom",
    eyebrow: "Infrastructure at scale",
    headline: "Delivering telecom infrastructure at scale.",
    supportingLine:
      "My years at MTN built the delivery habits I still use today: careful planning, vendor coordination, service quality and close attention to performance.",
    proofPoints: [
      "1,000+ sites modernised in Uganda (300+ GSM, 200+ WCDMA, 80+ LTE)",
      "830+ 2G/3G sites swapped and 450+ new LTE sites commissioned in Sudan",
      "$75,000+ in annual CAPEX savings negotiated with vendors",
      "Contributed to MTN Uganda's #1 national Quality-of-Service ranking",
    ],
    steps: [
      {
        number: "01",
        label: "Complexity",
        body: "Large network programmes spread across many sites, teams and vendors.",
      },
      {
        number: "02",
        label: "Execution",
        body: "Planning the rollout, coordinating vendors and keeping delivery on track.",
      },
      {
        number: "03",
        label: "Performance",
        body: "Protecting service quality while improving network performance.",
      },
      {
        number: "04",
        label: "Transferable lesson",
        body: "The strongest results came when the technology, teams and day-to-day operating processes worked together.",
      },
    ],
    stepsCta: "Tap a step for details",
    highlight: ["1,000+", "830+", "450+", "$75,000+"],
  },
];

/* ------------------------------------------------------------------ */
/* Approach                                                             */
/* ------------------------------------------------------------------ */

export type ApproachBlock = { number: string; title: string; body: string };

export const approach = {
  eyebrow: "How I work",
  leadStatement:
    "My approach starts with the outcome and stays close to how the work will actually be delivered.",
  blocks: [
    {
      number: "01",
      title: "Start with the outcome",
      body: "I get clear on what needs to improve and how we will know it has worked.",
    },
    {
      number: "02",
      title: "Make ownership clear",
      body: "I define who owns the work, how decisions are made and how the process will run day to day.",
    },
    {
      number: "03",
      title: "Build for the real setting",
      body: "I design with the people, infrastructure, regulation and procurement environment in mind.",
    },
    {
      number: "04",
      title: "Learn, improve and scale",
      body: "I track what is working, improve the model and expand it with evidence.",
    },
  ] as ApproachBlock[],
};

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export type ExperienceEntry = {
  id: string;
  /** Displayed as the headline of the card. */
  primary: string;
  /** Displayed beneath the headline. */
  secondary: string;
  location: string;
  dates: string;
  /** Always-visible, dot-separated scan line — visible even when collapsed. */
  proof: string;
  bullets: string[];
  /** The two most recent entries open on load; the rest start collapsed. */
  defaultOpen?: boolean;
  /** Links the headline to the employer's site when set; plain text otherwise. */
  orgUrl?: string;
  /**
   * Always-visible italic aside, distinct from `proof` — used for narrative
   * color (a role's internal progression) rather than scannable evidence.
   */
  subtitle?: string;
};

export const experience: ExperienceEntry[] = [
  {
    id: "utbp",
    primary: "Unified Technology Business Partners",
    secondary: "Advisor, Growth & Digital Transformation",
    location: "Kampala",
    dates: "2026–present",
    defaultOpen: true,
    orgUrl: "https://www.unionbps.com/",
    proof: "AI adoption advisory · digital transformation · enterprise advisory",
    bullets: [
      "Advise a Kampala-based IT and consulting firm on AI adoption strategy and digital transformation roadmaps for enterprise clients, applying platform delivery discipline built over 15 years in Africa.",
    ],
  },
  {
    id: "unicef-drc",
    primary: "UNICEF Democratic Republic of Congo",
    secondary: "Innovation Manager & Acting SBC Section Chief",
    location: "Kinshasa",
    dates: "Mar 2023–Mar 2025",
    defaultOpen: true,
    orgUrl: "https://www.unicef.org/drcongo/en",
    proof: "8.6M-user platform · $20M+ portfolio · 20-person team",
    bullets: [
      "Directed a $20M+ portfolio and a 20-person team; served as Acting SBC Section Chief (OIC) for extended periods.",
      "Built and led a misinformation-detection programme (Web Fact Checkers), using social-listening tools including Talkwalker to track and flag false information online. The programme trained 700 youth volunteers, who documented 100,000+ counter-misinformation actions and reached 3.4M+ people.",
      "Scaled U-Report DRC (UNICEF's SMS-based youth polling and civic-engagement platform) to 8.6M+ users across 150 clubs in every province, including 30+ girls-only clubs, and connected it to UNICEF's cash-transfer verification system (HOPE).",
      "Led vendor selection and procurement (Nyaruka/RapidPro, GoInnovation) for the DRC digital platform portfolio, then directed end-to-end delivery of FunDoo, a youth livelihoods and social-impact platform: implementation planning, five-language localisation, youth user-testing, and a 10,000-user beta launch.",
      "Adapted the Ebola-response RapidPro chatbot for DRC, originally designed at Côte d'Ivoire in 2021 and since adopted as a UNICEF global template across 5+ country offices.",
      "Chaired the DRC Accountability to Affected Populations (AAP) Committee, securing $850,000 for community feedback systems, and secured zero-rated data agreements with Orange, Vodacom, Airtel, and Africell to sustain platform growth.",
    ],
  },
  {
    id: "unicef-sierra-leone",
    primary: "UNICEF Sierra Leone",
    secondary: "Innovation Manager (Short-Term Mission)",
    location: "Freetown",
    dates: "Jul–Oct 2022",
    orgUrl: "https://www.unicef.org/sierraleone/",
    proof: "School connectivity · Giga · government and ISP coordination",
    bullets: [
      "Led deployment of the Learning Passport digital education platform, training 87 Ministry of Education staff on system management.",
      "Negotiated Project Giga's broadband vendor contracts for a 6% cost reduction, securing $500K in funding for school connectivity.",
      "Restructured the Innovation Unit's project deployment process, raising fund utilisation from 35% to 84%.",
    ],
  },
  {
    id: "unicef-cote-divoire",
    primary: "UNICEF Côte d'Ivoire",
    secondary: "Innovation Specialist",
    location: "Abidjan",
    dates: "Dec 2016–Mar 2023",
    orgUrl: "https://www.unicef.org/cotedivoire/en",
    proof: "Digital platforms · $12.6M PPP · multi-partner delivery",
    bullets: [
      "Built a national SMS/WhatsApp digital birth registration system with the Ministry of Justice and ONA, running sprint planning and UAT cycles and training 50+ registration agents to pilot the system for government rollout.",
      "Digitized mobile money payments for 30,000+ frontline workers, overseeing requirements, MNO integration, and transition to operations.",
      "Designed and launched an Ebola-response RapidPro chatbot (2021), adopted as a UNICEF global template.",
      "Authored and launched the roadmap for YOMA (Youth Agency Marketplace, a skills-to-opportunity platform), working with YUX Design on platform customisation, integrating it with U-Report and co-securing $2.08M to scale it regionally with Nigeria and WCARO.",
      "Established and scaled U-Report Côte d'Ivoire to 3.8M+ users, managing MNO relationships and real-time reporting.",
      "Launched and ran the national CORONA chatbot on RapidPro with the Ministry of Health, consulted 3M+ times and adopted by government for national radio and TV campaigns; later added a module for COVAX (the global COVID-19 vaccine-sharing initiative).",
    ],
  },
  {
    id: "mtn-sudan",
    primary: "MTN Sudan",
    secondary: "Wireless Project Manager",
    location: "Khartoum",
    dates: "May–Dec 2016",
    orgUrl: "https://www.mtn.sd/",
    proof: "Network modernisation · rollout execution · vendor coordination",
    bullets: [
      "Oversaw a RAN equipment swap across 830+ 2G/3G sites (Ericsson/ZTE to Huawei) and commissioned 450+ new LTE sites, bringing total sites managed in-country to 1,000+.",
      "Led the transmission network's migration from TDM to IP RAN, managing Huawei's delivery and risk mitigation to protect network availability.",
    ],
  },
  {
    id: "mtn-uganda",
    primary: "MTN Uganda",
    secondary: "Project Manager & Senior Engineer, Radio Planning",
    location: "Kampala",
    dates: "Sep 2009–Apr 2016",
    orgUrl: "https://www.mtn.co.ug/",
    proof: "Large-scale network delivery · performance · infrastructure modernisation",
    subtitle:
      "Started as a Radio Planning & Network Service Delivery Engineer before advancing to Project Manager & Senior Engineer.",
    bullets: [
      "Directed end-to-end RAN modernisation across 1,000+ sites (300+ GSM, 200+ WCDMA, 80+ LTE), managing vendor integration (Huawei) and tower companies (ATC, Eaton).",
      "Negotiated vendor and subcontractor contracts for $75,000+ in annual CAPEX savings, contributing to MTN Uganda's #1 national Quality-of-Service ranking (2014).",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* AI in Practice                                                       */
/* ------------------------------------------------------------------ */

export type AIPracticeEntry = { title: string; tag: string; body: string };

export const aiInPractice = {
  intro:
    "For AI work, I start with the job that needs to be done. I look at where AI can improve the workflow and add value, who owns the decision, what should stay with people, and how results will be measured. I test the approach before scaling it.",
  entries: [
    {
      title: "Enterprise AI Adoption",
      tag: "Current advisory work: UTBP",
      body: "I work with a Kampala-based advisory firm on AI adoption for enterprise clients, looking at where AI fits into existing workflows and redesigning processes around it. From there, I build practical adoption roadmaps with responsible deployment built in.",
    },
    {
      title: "AI Solution Design",
      tag: "Cornell University coursework",
      body: "Coursework in designing AI solutions from the ground up: framing the use case, working through data and model choices, and building in the human oversight a responsible deployment needs.",
    },
  ] as AIPracticeEntry[],
};

/* ------------------------------------------------------------------ */
/* About                                                                */
/* ------------------------------------------------------------------ */

export const about = {
  /** Exact substrings to render with emphasis. */
  emphasis: [
    "I started my career as a telecom engineer and have spent the past 15 years leading technology programmes across Africa.",
    "digital transformation and AI adoption advisory work",
  ],
  paragraphs: [
    "I started my career as a telecom engineer and have spent the past 15 years leading technology programmes across Africa. My work has grown from network infrastructure into digital platforms, partnerships and large-scale programme delivery.",
    "That mix of engineering and programme leadership still shapes how I work. I pay attention to the technology, the people using it, the partners around it and what it takes to keep the system working after launch.",
    "Today, I bring that experience to digital transformation and AI adoption advisory work, with a focus on practical use cases, clear ownership and measurable results.",
  ],
};

/* ------------------------------------------------------------------ */
/* Education & Professional Development                                */
/* ------------------------------------------------------------------ */

export type Credential = {
  credential: string;
  institution: string;
  year: string;
};

export const education: Credential[] = [
  {
    credential: "Master of Business Administration (MBA)",
    institution: "East & Southern Africa Management Institute, Tanzania",
    year: "2015",
  },
  {
    credential: "BSc (Hons) Telecommunication Engineering",
    institution: "Makerere University, Uganda",
    year: "2009",
  },
];

export const professionalDevelopment: Credential[] = [
  {
    credential: "AI Agent Bootcamp",
    institution: "",
    year: "2026",
  },
  {
    credential: "Designing and Building AI Solutions",
    institution: "Cornell University, USA",
    year: "2025",
  },
  {
    credential: "PRINCE2® Practitioner Certificate",
    institution: "APMG International, UK",
    year: "2011",
  },
];

/* ------------------------------------------------------------------ */
/* Capabilities                                                        */
/* ------------------------------------------------------------------ */

export type CapabilityGroup = { title: string; items: string[] };

export const capabilities: CapabilityGroup[] = [
  {
    title: "Transformation Strategy",
    items: [
      "Digital strategy",
      "transformation roadmaps",
      "operating models",
      "technology investment priorities",
    ],
  },
  {
    title: "AI Adoption",
    items: [
      "Use-case prioritisation",
      "workflow redesign",
      "responsible deployment",
      "human oversight",
    ],
  },
  {
    title: "Delivery at Scale",
    items: [
      "Programme leadership",
      "procurement",
      "vendor management",
      "UAT",
      "implementation governance",
      "performance",
    ],
  },
  {
    title: "Partnerships & Ecosystems",
    items: [
      "Government",
      "telecom operators",
      "technology partners",
      "public-private partnerships",
      "multi-country coordination",
    ],
  },
];

export const platformsAndTools = [
  "RapidPro",
  "Power BI",
  "n8n",
  "U-Report",
  "analytics dashboards",
];

export const languages = [
  { name: "English", level: "Fluent" },
  { name: "French", level: "Professional Working Proficiency" },
];

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contact = {
  opening:
    "I'm interested in senior roles and advisory work in digital transformation, technology delivery and AI adoption across Africa and emerging markets.",
  email: "nkmuhwezi@gmail.com",
  linkedinLabel: "linkedin.com/in/normanmuhwezi",
  linkedinUrl: "https://www.linkedin.com/in/normanmuhwezi",
  location: "Addis Ababa, Ethiopia",
  supportingLine:
    "Based in Addis Ababa · open to regional, remote and relocation opportunities",
};

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const sections = [
  { id: "work", label: "Work" },
  { id: "approach", label: "Approach" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];
