/**
 * Data for Ihsaan Yasin's personal website
 * Contains all content data structures used by the component rendering system
 */

// Work experience data
const experiences = [
    {
        company: "Meta",
        // logo: "assets/MetaLogo.webp",
        // logoAlt: "",
        position: "Software Engineering Intern",
        date: "January 2025 - Present",
        description: "Thrilled to be joining <span class=\"highlight\">Meta's engineering team</span> as an incoming intern! I'll be diving into platform infrastructure challenges and helping build technology that connects billions of people worldwide."
    },
    {
        company: "Courier Health",
        position: "Software Engineering Intern",
        date: "May 2024 - September 2024",
        description: "At Courier Health, I worked on <span class=\"highlight\">Platform Engineering</span> to help reinvent the biopharma-patient experience. I improved <span class=\"highlight\">ETL pipelines</span> processing <span class=\"highlight\">100,000+ files</span> and built an Ingest Dashboard that enhanced healthcare data quality."
    },
  {
    company: "V1",
    position: "Head of Engineering",
    date: "January 2024 - Present",
    description: "Leading all internal engineering for the largest builder community in the west."
  },
    // {
    //     company: "Bluecross Blue Shield Michigan",
    //     position: "Software Engineering Intern",
    //     date: "June 2023 - August 2023",
    //     description: "At BCBS, I built a system that centralized critical resources for internal teams. My favorite project was creating a system for automated training progress tracking. I also developed a workflow for cross-team project coordination."
    // },
    {
        company: "RediMinds",
        position: "Software Engineering Intern",
        date: "June 2022 - January 2023",
        description: "For my first internship at RediMinds, I pitched and built a <span class=\"highlight\">VR diagnosis application</span> that secured funding. I created a Python pipeline for CT scan processing that significantly improved efficiency."
    }
];

// Projects data
const projects = [
    { 
        title: "micrograd-plusplus", 
        url: "https://github.com/iyasinn/micrograd-plusplus",
        description: "A C++ implementation of micrograd by Andrej Karpathy, focusing on simplicity and educational value."
    },
    { 
        title: "ComputeLab", 
        url: "https://github.com/iyasinn/ComputeLab",
        description: "A C++ project focused on computational algorithms and data processing."
    },
    { 
        title: "iwg-form", 
        url: "https://github.com/iyasinn/iwg-form",
        description: "A TypeScript project for creating dynamic and interactive web forms."
    }
];

// Publications data
const publications = [
    { title: "Publication Title", meta: "Journal or Conference Name, Year", url: "#" },
    { title: "Another Publication", meta: "Journal or Conference Name, Year", url: "#" },
    { title: "Third Academic Paper", meta: "Journal or Conference Name, Year", url: "#" }
];

// Whitepapers data
const papers = [
    { title: "Upcoming whitepapers will appear here", meta: "Research updates will be linked as they become available", description: "This section will host technical whitepapers as they're completed." }
];

// Blog posts data
const blogs = [
    { title: "Upcoming blog posts will appear here", meta: "Date information will display here", description: "This section will contain short-form writing on topics related to my research interests." }
];

// Social media profiles
const socialLinks = [
    { platform: "GitHub", icon: "#icon-github", username: "@iyasinn", url: "https://github.com/iyasinn" },
    { platform: "Twitter", icon: "#icon-twitter", username: "@ihsaanyasin", url: "https://twitter.com/ihsaanyasin" },
    { platform: "LinkedIn", icon: "#icon-linkedin", username: "@ihsaanyasin", url: "https://linkedin.com/in/ihsaanyasin" }
]; 
