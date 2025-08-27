export interface Project {
  id: number;
  title: string;
  longDescription: string;
  imageUrl: string;
  imageHint: string;
  services: string[];
}

export const portfolioData: Project[] = [
  {
    id: 1,
    title: "Zenith Branding Identity",
    longDescription: "A comprehensive branding project for Zenith, a luxury watchmaker. We developed a new logo, visual identity system, and packaging design that reflects the brand's commitment to precision and elegance. The project involved extensive market research and competitor analysis to create a timeless and sophisticated brand image.",
    imageUrl: "https://picsum.photos/600/400",
    imageHint: "logo brand",
    services: ["Branding", "UI/UX Design"],
  },
  {
    id: 2,
    title: "EcoHarbor Website Redesign",
    longDescription: "We redesigned the website for EcoHarbor, a non-profit dedicated to marine conservation. The new site features an engaging user experience, streamlined donation process, and a resource hub for educational materials. Our focus was on creating a visually compelling narrative to drive user engagement and support for their cause. We used React and Next.js for a fast, modern web experience.",
    imageUrl: "https://picsum.photos/600/400",
    imageHint: "website nature",
    services: ["Web Development", "UI/UX Design"],
  },
  {
    id: 3,
    title: "ConnectApp Mobile Application",
    longDescription: "Designed and developed a new social networking mobile app, ConnectApp. The app focuses on connecting people through shared interests and local events. The UI/UX design is clean, intuitive, and promotes user interaction. We built the app natively for both iOS and Android to ensure optimal performance.",
    imageUrl: "https://picsum.photos/400/600",
    imageHint: "mobile app",
    services: ["Mobile App", "UI/UX Design"],
  },
  {
    id: 4,
    title: "Artisan's Corner E-commerce Platform",
    longDescription: "Developed a full-featured e-commerce platform for Artisan's Corner, a marketplace for handmade goods. The platform includes vendor dashboards, secure payment integration, and a custom review system. The design highlights the unique products and tells the story of the artisans.",
    imageUrl: "https://picsum.photos/600/400",
    imageHint: "ecommerce shopping",
    services: ["Web Development", "E-commerce"],
  },
  {
    id: 5,
    title: "QuantumLeap Marketing Campaign",
    longDescription: "Created a multi-channel marketing campaign for QuantumLeap, a tech startup specializing in AI solutions. The campaign included digital ads, social media content, and a new landing page, resulting in a 200% increase in lead generation.",
    imageUrl: "https://picsum.photos/600/400",
    imageHint: "marketing data",
    services: ["Branding", "Marketing"],
  },
  {
    id: 6,
    title: "Oasis Wellness App",
    longDescription: "A mobile app for Oasis Wellness that provides guided meditations, mindfulness exercises, and personalized wellness plans. The serene interface and calming color palette are designed to create a peaceful user experience.",
    imageUrl: "https://picsum.photos/400/600",
    imageHint: "mobile wellness",
    services: ["Mobile App", "UI/UX Design"],
  },
];

export const services = Array.from(new Set(portfolioData.flatMap(p => p.services)));
