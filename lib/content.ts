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

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  name: "Norman K. Muhwezi",
  title: "Digital Transformation & Innovation Leader",
  location: "Addis Ababa, Ethiopia",
  hook: "I've spent fifteen years turning ambitious ideas into infrastructure that works at scale: telecom towers, PPP-financed classrooms, platforms reaching over 12 million people. I'm now bringing that same delivery discipline to AI adoption.",
};

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export const profile =
  "Senior digital transformation and innovation leader with 15+ years' experience setting up, launching, and scaling technology-enabled programmes across Africa, and structuring public-private partnerships that turn pilot ideas into infrastructure at scale. I have raised and managed multi-million-dollar portfolios, including a $12.6M public-private partnership that converted recycled plastic waste into 300+ classrooms for 15,000+ children, and directed digital public infrastructure reaching 12M+ users, including identity, registration, and payment-linked platforms, building the monitoring systems, quality assurance processes, and government and private-sector partnerships needed to sustain impact once a programme goes live. I am now applying that same delivery discipline to AI adoption, holding a Cornell University certificate in AI solution design and currently advising organisations on AI adoption strategy and responsible deployment. A telecom engineering foundation keeps my approach grounded in operational rigour as much as strategic vision.";

export type Stat = { value: string; label: string };

/** Ordered by priority — if space is ever constrained, the last one goes first. */
export const stats: Stat[] = [
  {
    value: "15+",
    label: "Years across telecom infrastructure & digital transformation delivery",
  },
  {
    value: "$20M+",
    label: "Portfolio directed as Acting Section Chief, UNICEF DRC",
  },
  {
    value: "1,500+",
    label: "Tons of plastic waste converted into 300+ classrooms via the $12.6M PPP",
  },
  {
    value: "12.4M+",
    label:
      "Combined U-Report users: DRC (8.6M+, #1 globally) & Côte d'Ivoire (3.8M+, #2 globally)",
  },
  {
    value: "5+",
    label: "Countries where RapidPro workflows were replicated at scale",
  },
];

/* ------------------------------------------------------------------ */
/* Flagship achievement                                                */
/* ------------------------------------------------------------------ */

export const flagship = {
  eyebrow: "Flagship achievement",
  /** Rendered verbatim. `highlight` below only wraps substrings — it never rewrites them. */
  body: "Structured and managed a $12.6M public-private partnership with Conceptos Plasticos, converting 1,500+ tons of recycled plastic waste into 300+ classrooms serving 15,000+ children in Côte d'Ivoire. Built the real-time construction-monitoring dashboard, led toxicity/quality assurance with an independent testing lab, secured $212,000 in government cost reimbursement, and shared the model across five UNICEF Country Offices.",
  /** Exact substrings of `body` to visually emphasise. */
  highlight: [
    "$12.6M",
    "1,500+ tons",
    "300+ classrooms",
    "15,000+ children",
    "$212,000",
  ],
};

/** The flow diagram under the flagship text: input -> process -> process -> outcome. */
export const flagshipFlow = [
  { value: "1,500+ tons", label: "plastic diverted", tone: "neutral" as const },
  { value: "$12.6M PPP", label: "structured & led", tone: "accent" as const },
  { value: "300+ built", label: "classrooms", tone: "accent" as const },
  { value: "15,000+", label: "children served", tone: "solid" as const },
];

/**
 * Expandable case-study behind the flagship band. Drafted from verified
 * CV facts — Norman may add first-hand texture before this goes live.
 */
export const flagshipCaseStudy = [
  {
    label: "The problem",
    body: "Côte d'Ivoire needed classrooms fast, but conventional construction couldn't keep pace with demand, and the country was generating plastic waste with nowhere productive to go.",
  },
  {
    label: "What I built",
    body: "I structured and led a $12.6M partnership with Conceptos Plasticos to convert recycled plastic waste directly into modular classroom units. My role covered the full delivery chain: negotiating the partnership terms, building a real-time dashboard to monitor construction progress across sites, and running toxicity and quality assurance with an independent testing lab before any unit was approved for use with children.",
  },
  {
    label: "The result",
    body: "1,500+ tons of plastic waste became 300+ classrooms, reaching 15,000+ children. I also negotiated $212,000 in government cost reimbursement, and the delivery model was adopted by five other UNICEF Country Offices facing similar infrastructure gaps.",
  },
];

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
  bullets: string[];
  /** The two most recent entries open on load; the rest start collapsed. */
  defaultOpen?: boolean;
  /** Links the headline to the employer's site when set; plain text otherwise. */
  orgUrl?: string;
  /**
   * Always-visible context line, styled distinctly from bullets (not hidden
   * behind the expand toggle). Used either as a compressed scope summary
   * (DRC, MTN Uganda) or a personal bridge line (Professional Development).
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
    bullets: [
      "Advise a Kampala-based IT and consulting firm on AI adoption strategy and digital transformation roadmaps for enterprise clients, applying platform delivery discipline built over 15 years in Africa.",
    ],
  },
  {
    id: "professional-development",
    primary: "Professional Development: AI & Digital Transformation",
    secondary: "Cornell University / AI Agent Bootcamp / DataCamp",
    location: "",
    dates: "Apr 2025–Dec 2025",
    defaultOpen: true,
    subtitle:
      "After fifteen years of taking platforms from pilot to national scale, I've learned the technology is usually the easy part. Delivery is what's hard. That's what I'm focused on now with AI adoption.",
    bullets: [
      "Career transition: completed Cornell University's Designing and Building AI Solutions certificate (2025) and an AI Agent Bootcamp (2026); currently completing an AI Product Management course (Coursera; expected August 2026).",
    ],
  },
  {
    id: "unicef-drc",
    primary: "UNICEF Democratic Republic of Congo",
    secondary: "Innovation Manager & Acting SBC Section Chief",
    location: "Kinshasa",
    dates: "Mar 2023–Mar 2025",
    orgUrl: "https://www.unicef.org/drcongo/en",
    subtitle:
      "Directed a $20M+ portfolio and a 20-person team; served as Acting Section Chief (OIC) for extended periods.",
    bullets: [
      "Built and led an AI-enabled misinformation-detection programme (Web Fact Checkers) to 700 trained youth volunteers, who documented 100,000+ counter-misinformation actions and grew the programme's reach to 3.4M+ people.",
      "Scaled U-Report DRC (UNICEF's SMS-based youth polling and civic-engagement platform) to 8.6M+ users across 150 clubs in every province, including 30+ girls-only clubs, and connected it to UNICEF's cash-transfer verification system (HOPE).",
      "Led vendor selection and procurement (Nyaruka/RapidPro, ONA, YUX) for the DRC digital platform portfolio, then directed end-to-end delivery of FunDoo, a youth livelihoods and social-impact platform: implementation planning, five-language localisation, youth user-testing, and a 10,000-user beta launch.",
      "Built a RapidPro-based Ebola-preparedness chatbot for DRC, adopted as a UNICEF global template and replicated across 5+ country offices.",
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
    bullets: [
      "Negotiated Project Giga's vendor contracts for a 6% cost reduction and helped secure $500K+ in funding to expand school internet connectivity across Sierra Leone.",
      "Led digital entrepreneurship interventions under UNICEF's Generation Unlimited (GenU) youth initiative and trained 87 Ministry of Education staff on the Learning Passport digital-learning platform.",
      "Restructured the Innovation Unit's project deployment process, improving fund-utilisation from 35% to 84%.",
    ],
  },
  {
    id: "unicef-cote-divoire",
    primary: "UNICEF Côte d'Ivoire",
    secondary: "Innovation Specialist",
    location: "Abidjan",
    dates: "Dec 2016–Mar 2023",
    orgUrl: "https://www.unicef.org/cotedivoire/en",
    bullets: [
      "Established and scaled U-Report Côte d'Ivoire to 3.8M+ users, negotiating zero-rated SMS connectivity with MTN, Orange, and Moov to remove cost barriers to access.",
      "Authored and launched the roadmap for YOMA (Youth Agency Marketplace, a skills-to-opportunity platform), integrating it with U-Report and co-securing $2.08M to scale it regionally with Nigeria and WCARO.",
      "Developed Côte d'Ivoire's digital civil registration system with the Ministry of Justice and Child Protection, using RapidPro (UNICEF's SMS/chatbot engagement platform) and a Power BI dashboard to complement the paper-based birth registration process; trained 50+ registration agents for government rollout.",
      "Launched and ran the national CORONA chatbot on RapidPro with the Ministry of Health, consulted 3M+ times and adopted by government for national radio and TV campaigns; later added a module for COVAX (the global COVID-19 vaccine-sharing initiative) and a separate Ebola information bot.",
    ],
  },
  {
    id: "mtn-sudan",
    primary: "MTN Sudan",
    secondary: "Wireless Project Manager",
    location: "Khartoum",
    dates: "May–Dec 2016",
    orgUrl: "https://www.mtn.sd/",
    bullets: [
      "Oversaw a RAN equipment swap across 830+ 2G/3G sites (Ericsson/ZTE to Huawei) and commissioned 450+ new LTE sites, bringing total sites managed in-country to 1,000+.",
      "Led the transmission network's migration from TDM to IP RAN, managing Huawei's delivery and running risk-mitigation processes, including planned build pauses for subcontractor retraining, to protect network availability.",
    ],
  },
  {
    id: "mtn-uganda",
    primary: "MTN Uganda",
    secondary: "Project Manager & Senior Engineer, Radio Planning",
    location: "Kampala",
    dates: "Sep 2009–Apr 2016",
    orgUrl: "https://www.mtn.co.ug/",
    subtitle:
      "Started as a Radio Planning & Network Service Delivery Engineer before advancing to Project Manager & Senior Engineer.",
    bullets: [
      "Directed end-to-end RAN modernisation across 1,000+ sites (300+ GSM, 200+ WCDMA, 80+ LTE), coordinating vendors (Huawei) and tower companies (ATC, Eaton) to deliver national coverage expansion with minimal service disruption.",
      "Negotiated vendor and subcontractor contracts for $75,000+ in annual CAPEX savings, contributing to MTN Uganda's #1 national Quality-of-Service ranking.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Education & certifications                                          */
/* ------------------------------------------------------------------ */

export type Credential = {
  credential: string;
  institution: string;
  year: string;
};

export const education: Credential[] = [
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

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export const coreCompetencies = [
  "Digital Public Infrastructure (DPI) & Platform Delivery",
  "Public-Private Partnerships & Resource Mobilisation",
  "Digital Transformation Strategy & Delivery",
  "Programme Effectiveness & Impact Measurement",
  "AI Adoption Strategy & Responsible Deployment",
  "Vendor Evaluation & Procurement (RFP)",
  "Multi-Country / Cross-Organisation Coordination",
];

export const platformsAndTools = [
  "n8n (AI Agent Workflows)",
  "RapidPro",
  "Power BI",
  "U-Report",
  "Real-time Dashboards",
  "Sprint Planning & UAT",
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
    "Open to conversations about digital transformation, innovation, and AI adoption roles across multilateral development, financial institutions, and the private sector.",
  email: "nkmuhwezi@gmail.com",
  linkedinLabel: "linkedin.com/in/normanmuhwezi",
  linkedinUrl: "https://www.linkedin.com/in/normanmuhwezi",
  location: "Addis Ababa, Ethiopia",
};

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const sections = [
  { id: "profile", label: "Profile" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];
