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
  /* 
    FIRST CARD (Real Project): Masterpool.in
  */
  {
    title: "Masterpool.in",
    description: "A modern platform built with Node.js and Next.js.",
    image: "/images/masterpool-thumb.jpg", // TODO: Replace this with a real screenshot in your public/images folder
    tags: ["Node.js", "Next.js"],
    link: "https://masterpool.in",
  },
  /* 
    ========================================================================
    // TODO: Replace these placeholder projects with real AVA Developers 
    // project data (title, description, thumbnail, tags, link)
    ========================================================================
  */
  {
    title: "Project_02",
    description: "Secured enterprise log manager tracking database queries in real-time.",
    image: "/images/project2-thumb.jpg",
    tags: ["Express", "MongoDB", "Docker"],
    link: "#",
  },
  {
    title: "Project_03",
    description: "Browser game engine handling real-time peer sockets and 3D layers.",
    image: "/images/project3-thumb.jpg",
    tags: ["React", "Socket.io", "Three.js"],
    link: "#",
  },
  {
    title: "Project_04",
    description: "Clean cloud system interface displaying server resources usage.",
    image: "/images/project4-thumb.jpg",
    tags: ["Next.js", "Tailwind", "Redis"],
    link: "#",
  },
];

export const STATS_DATA: StatItem[] = [
  { value: 12, suffix: "+", label: "Projects Delivered" },
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "Technologies Mastered" },
  { value: 100, suffix: "%", label: "Client Focus" },
];

export const CONTACT_INFO = {
  email: "hello@avadevelopers.com",
  phone: "+1 (234) 567-890",
  githubUrl: "https://github.com",
  linkedinUrl: "https://linkedin.com",
  twitterUrl: "https://twitter.com",
};
