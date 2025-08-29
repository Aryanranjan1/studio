export interface Project {
  id: number;
  title: string;
  longDescription: string;
  summary: string;
  imageUrl: string;
  imageHint: string;
  services: string[];
}

export const portfolioData: Project[] = [
  {
    id: 1,
    title: "Zenith Branding Identity",
    longDescription: "A comprehensive branding project for Zenith, a luxury watchmaker. We developed a new logo, visual identity system, and packaging design that reflects the brand's commitment to precision and elegance. The project involved extensive market research and competitor analysis to create a timeless and sophisticated brand image.",
    summary: "Created a timeless and sophisticated brand identity for a luxury watchmaker, enhancing its market position through a new logo, visual system, and packaging.",
    imageUrl: "https://picsum.photos/600/400",
    imageHint: "logo brand",
    services: ["Branding", "UI/UX Design"],
  },
  {
    id: 2,
    title: "EcoHarbor Website Redesign",
    longDescription: "We redesigned the website for EcoHarbor, a non-profit dedicated to marine conservation. The new site features an engaging user experience, streamlined donation process, and a resource hub for educational materials. Our focus was on creating a visually compelling narrative to drive user engagement and support for their cause. We used React and Next.js for a fast, modern web experience.",
    summary: "Launched a visually compelling website with a streamlined donation process, significantly boosting user engagement and support for a marine conservation non-profit.",
    imageUrl: "https://picsum.photos/600/400",
    imageHint: "website nature",
    services: ["Web Development", "UI/UX Design"],
  },
  {
    id: 3,
    title: "ConnectApp Mobile Application",
    longDescription: "Designed and developed a new social networking mobile app, ConnectApp. The app focuses on connecting people through shared interests and local events. The UI/UX design is clean, intuitive, and promotes user interaction. We built the app natively for both iOS and Android to ensure optimal performance.",
    summary: "Developed an intuitive social networking app for iOS and Android, connecting users through local events and shared interests with a clean, engaging interface.",
    imageUrl: "https://picsum.photos/400/600",
    imageHint: "mobile app",
    services: ["Mobile App", "UI/UX Design"],
  },
  {
    id: 4,
    title: "Artisan's Corner E-commerce Platform",
    longDescription: "Developed a full-featured e-commerce platform for Artisan's Corner, a marketplace for handmade goods. The platform includes vendor dashboards, secure payment integration, and a custom review system. The design highlights the unique products and tells the story of the artisans.",
    summary: "Built a full-featured e-commerce platform with vendor dashboards and secure payments, empowering artisans and highlighting their unique, handmade products.",
    imageUrl: "https://picsum.photos/600/400",
    imageHint: "ecommerce shopping",
    services: ["Web Development", "E-commerce"],
  },
  {
    id: 5,
    title: "QuantumLeap Marketing Campaign",
    longDescription: "Created a multi-channel marketing campaign for QuantumLeap, a tech startup specializing in AI solutions. The campaign included digital ads, social media content, and a new landing page, resulting in a 200% increase in lead generation.",
    summary: "Executed a multi-channel marketing campaign that generated a 200% increase in leads through targeted digital ads, social media, and a new landing page.",
    imageUrl: "https://picsum.photos/600/400",
    imageHint: "marketing data",
    services: ["Branding", "Marketing"],
  },
  {
    id: 6,
    title: "Oasis Wellness App",
    longDescription: "A mobile app for Oasis Wellness that provides guided meditations, mindfulness exercises, and personalized wellness plans. The serene interface and calming color palette are designed to create a peaceful user experience.",
    summary: "Designed a wellness app with a serene interface offering guided meditations and personalized plans, creating a peaceful and engaging user experience.",
    imageUrl: "https://picsum.photos/400/600",
    imageHint: "mobile wellness",
    services: ["Mobile App", "UI/UX Design"],
  },
];

export const services = Array.from(new Set(portfolioData.flatMap(p => p.services)));

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Marketing Director",
    company: "QuantumLeap",
    quote: "AMpire Studio transformed our online presence. Their strategic approach to design and development doubled our lead generation in just three months. A truly remarkable team!",
    avatarUrl: "https://picsum.photos/100/100",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Founder",
    company: "Artisan's Corner",
    quote: "The e-commerce platform they built for us is both beautiful and highly functional. Our vendors love the new system, and sales have increased by 40% since launch.",
    avatarUrl: "https://picsum.photos/100/100",
  },
  {
    id: 3,
    name: "Jessica Rodriguez",
    title: "CEO",
    company: "ConnectApp",
    quote: "From initial concept to final launch, the team was professional, creative, and incredibly responsive. They delivered a mobile app that exceeded all our expectations.",
    avatarUrl: "https://picsum.photos/100/100",
  },
]