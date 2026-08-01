export interface ServiceItem {
  iconName: "Server" | "Layout" | "Cube" | "Layers" | "Cpu" | "Zap";
  title: string;
  description: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

/*
  ========================================================================
  CENTRALIZED AVA DEVELOPERS DATA CONFIGURATION:
  Edit any of the copy, URLs, or parameters below to update the site.
  ========================================================================
*/

// Set to true to use the background video, set to false to use the animated cyber grid background
export const USE_BACKGROUND_VIDEO = true;

export const HERO_VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

export const SERVICES_DATA: ServiceItem[] = [
  {
    iconName: "Server",
    title: "Node.js Backend Systems",
    description: "High-throughput server architectures built for absolute speed.",
  },
  {
    iconName: "Layout",
    title: "Next.js Web Platforms",
    description: "Blazing fast, SEO-optimized production-grade frontend apps.",
  },
  {
    iconName: "Cube",
    title: "Three.js WebGL Graphics",
    description: "Immersive, real-time 3D experiences rendering inside the browser.",
  },
  {
    iconName: "Layers",
    title: "Full-Stack Development",
    description: "End-to-end engineering from system concept to deployment.",
  },
  {
    iconName: "Cpu",
    title: "API Design & Pipeline",
    description: "Robust, documented, and secure middleware communication routes.",
  },
  {
    iconName: "Zap",
    title: "DevOps & Optimization",
    description: "Highly optimized compilation pipelines and auto-scalable hosting.",
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    title: "Civil & Structural Construction",
    description: "Working details: Executing perfect structural work including foundations and columns. Best design practices: Applying premium seismic resilience analysis and modern reinforced concrete frame engineering to guarantee safety and architectural durability.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&auto=format&fit=crop",
    tags: ["Perfect Structural Work", "Best Design", "Seismic Resilience"],
    link: "#",
  },
  {
    title: "Architectural Drafting & Layouts",
    description: "Working details: Developing perfect CAD layouts and elevations. Best design practices: Crafting modern spacing floorplans, optimizing daylight angles, and ensuring high-end premium interior design integration.",
    image: "https://images.unsplash.com/photo-1503387762-592dedb882d7?q=80&w=600&auto=format&fit=crop",
    tags: ["Best Design Layouts", "Perfect Architectural Work"],
    link: "#",
  },
  {
    title: "MEP Services Integration",
    description: "Working details: Conducting perfect engineering execution for HVAC, electrical conduits, and plumbing. Best design practices: Designing smart energy-efficient automation networks and premium solar power grids.",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=600&auto=format&fit=crop",
    tags: ["Precision MEP Systems", "Perfect Engineering Work"],
    link: "#",
  },
];

export const STATS_DATA: StatItem[] = [
  { value: 15, suffix: "+", label: "Projects Completed" },
  { value: 3, suffix: "", label: "Expert Engineers" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
  { value: 24, suffix: "/7", label: "WhatsApp Support" },
];

export const WHATSAPP_CONTACTS = [
  {
    name: "Adhykrishna",
    number: "+91 62824 47261",
    link: "https://wa.me/916282447261",
    avatarText: "AK",
    description: "Oversees frontend logic, React component architecture, and premium user interface engineering."
  },
  {
    name: "Viswas Y",
    number: "+91 97473 62645",
    link: "https://wa.me/919747362645",
    avatarText: "VY",
    description: "Specializes in high-throughput Node.js backend systems, database performance, and API design."
  },
  {
    name: "Aromal Babu",
    number: "+91 73564 62150",
    link: "https://wa.me/917356462150",
    avatarText: "AB",
    description: "Coordinates client project delivery, software roadmaps, and handles active communication on WhatsApp."
  }
];

