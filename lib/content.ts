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
 * Swap in real photos by dropping files into `public/images/` and pointing
 * these paths at them. Nothing else needs to change.
 */
export const images = {
  headshot: "/images/headshot-placeholder.svg",
};

/** Replace `public/resume-placeholder.pdf` with the real CV, then update this. */
export const resumePath = "/resume-placeholder.pdf";

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  name: "Norman K. Muhwezi",
  title:
    "Digital Infrastructure & Innovation Leader · PRINCE2® Practitioner",
  location: "Addis Ababa, Ethiopia",
};

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export const profile =
  "15+ years delivering infrastructure and digital platforms across telecom (MTN Uganda & Sudan) and multilateral development (UNICEF Côte d'Ivoire, Sierra Leone, DRC), taking platforms from pilot to national scale across digital public infrastructure, financial inclusion, climate-resilient infrastructure financing, and civil registration/GovTech. Runs vendor evaluation and procurement for both digital platform builds (Nyaruka, ONA, YUX) and telecom infrastructure (Huawei, Ericsson, ZTE). PRINCE2® Practitioner and MBA holder, with a 2025 Cornell University AI Solutions certificate. Now applying that delivery discipline to AI adoption, advising organisations on AI adoption strategy and responsible deployment.";

export type Stat = { value: string; label: string };

/** Ordered by priority — if space is ever constrained, the last one goes first. */
export const stats: Stat[] = [
  {
    value: "15+",
    label: "Years across telecom infrastructure & multilateral digital delivery",
  },
  {
    value: "$20M+",
    label: "Portfolio directed as Acting Section Chief, UNICEF DRC",
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
  body: "Structured and managed a $12.6M public-private partnership with Conceptos Plasticos, converting 1,500+ tons of recycled plastic waste into 300+ classrooms serving 15,000+ children in Côte d'Ivoire, including construction-monitoring dashboards, toxicity/quality assurance, and $212,000 in government cost reimbursement.",
  /** Exact substrings of `body` to visually emphasise. */
  highlight: [
    "$12.6M",
    "1,500+ tons",
    "300+ classrooms",
    "15,000+ children",
    "$212,000",
  ],
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
  bullets: string[];
  /** The two most recent entries open on load; the rest start collapsed. */
  defaultOpen?: boolean;
};

export const experience: ExperienceEntry[] = [
  {
    id: "utbp",
    primary: "Unified Technology Business Partners",
    secondary: "Advisor, Growth & Digital Transformation",
    location: "Kampala",
    dates: "2026–present",
    defaultOpen: true,
    bullets: [
      "Advise a Kampala-based IT and consulting firm on AI adoption strategy and digital transformation roadmaps for enterprise clients.",
    ],
  },
  {
    id: "professional-development",
    primary: "Professional Development: AI & Digital Transformation",
    secondary: "Cornell University / AI Agent Bootcamp / DataCamp",
    location: "",
    dates: "Apr 2025–Dec 2025",
    defaultOpen: true,
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
    bullets: [
      "Served three periods as Officer-in-Charge (approx. 6.5 months combined), directing a 20+ person team and budgets up to $20M.",
      "Led vendor selection and procurement (Nyaruka/RapidPro, ONA, YUX) for the DRC digital platform portfolio, then directed FunDoo's end-to-end delivery to a 10,000-user beta launch.",
      "Scaled U-Report DRC to 8.6M+ users across 150 clubs in every province, including 30+ girls-only clubs, connecting the platform to UNICEF's HOPE cash-transfer verification system.",
      "Co-designed an AI-enabled misinformation-detection programme (Web Fact Checkers), training 700+ youth volunteers who addressed 100,000+ misinformation incidents.",
      "Deployed the RapidPro-based Ebola-preparedness chatbot in DRC and secured $850K for accountability systems during Mpox, cholera, and M23 crisis response.",
    ],
  },
  {
    id: "unicef-sierra-leone",
    primary: "UNICEF Sierra Leone",
    secondary: "Innovation Manager (Stretch Assignment)",
    location: "Freetown",
    dates: "Jul–Oct 2022",
    bullets: [
      "Led deployment of the Learning Passport digital education platform, training 87 Ministry of Education staff on system management.",
      "Negotiated Project Giga's broadband vendor contracts, securing $500K in funding for school connectivity.",
      "Restructured the Innovation Unit's project deployment process, raising fund utilisation from 35% to 84%.",
    ],
  },
  {
    id: "unicef-cote-divoire",
    primary: "UNICEF Côte d'Ivoire",
    secondary: "Innovation Specialist",
    location: "Abidjan",
    dates: "Dec 2016–Mar 2023",
    bullets: [
      "Built a national SMS/WhatsApp digital birth registration system with the Ministry of Justice, running sprint planning and UAT cycles and training 50+ registration agents to pilot the system for government rollout.",
      "Digitized mobile money payments for 30,000+ frontline workers, overseeing requirements, MNO integration, and transition to operations.",
      "Designed and launched an Ebola-response RapidPro chatbot (2021), adopted as a UNICEF global template; led FunDoo's youth-engagement pilot (~10,000 users) and Yoma's regional rollout using the same UAT methodology.",
      "Established and scaled U-Report Côte d'Ivoire to 3.8M+ users, managing MNO relationships and real-time reporting.",
    ],
  },
  {
    id: "mtn-sudan",
    primary: "MTN Sudan",
    secondary: "Wireless Project Manager",
    location: "Khartoum",
    dates: "May–Dec 2016",
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
    bullets: [
      "Started as a Radio Planning & Network Service Delivery Engineer before advancing to Project Manager & Senior Engineer.",
      "Directed end-to-end RAN modernization across 1,000+ sites (300+ GSM, 200+ WCDMA, 80+ LTE), managing vendor integration (Huawei) and tower companies (ATC, Eaton).",
      "Negotiated vendor and subcontractor contracts for $75,000+ in annual CAPEX savings, contributing to MTN Uganda's #1 national Quality of Service ranking (2014).",
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
    credential: "AI Agent Bootcamp",
    institution: "",
    year: "2026",
  },
  {
    credential: "PRINCE2® Practitioner Certification",
    institution: "APMG International, UK",
    year: "2011",
  },
  {
    credential: "MBA",
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
  "Digital Public Infrastructure",
  "Financial Inclusion & Payments",
  "Climate-Resilient Infrastructure Financing",
  "Civil Registration & GovTech",
  "Vendor Evaluation & RFP",
  "AI & Emerging Technology",
];

export const platformsAndTools = [
  "RapidPro",
  "U-Report",
  "Yoma",
  "Sprint Planning & UAT",
  "Mobile Money Integration",
  "Real-time Dashboards",
  "LTE / RAN Infrastructure",
];

export const languages = [
  { name: "English", level: "Fluent" },
  { name: "French", level: "Professional Working Proficiency" },
];

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contact = {
  email: "nkmuhwezi@gmail.com",
  phone: "+251 97 819 1199",
  phoneHref: "+251978191199",
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
