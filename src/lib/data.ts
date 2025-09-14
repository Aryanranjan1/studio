export interface Project {
  id: string;
  title: string;
  slug: string;
  longDescription: string;
  summary: string;
  imageUrl: string;
  imageHint: string;
  services: string[];
  createdAt?: Date; // Add this to track creation
  status: ProjectStatus;
}

export const projectStatuses = ['Pending', 'In Progress', 'Completed', 'Billed'] as const;
export type ProjectStatus = typeof projectStatuses[number];

export const serviceIcons = ['Branding', 'UI/UX Design', 'Web Development', 'Mobile App', 'E-commerce', 'Marketing', 'Automations'] as const;
export type ServiceIcon = typeof serviceIcons[number];

export interface Service {
    id: string;
    title: string;
    slug: string;
    description: string;
    longDescription: string;
    icon: ServiceIcon;
}

export interface Testimonial {
    id: string;
    name: string;
    title:string;
    company: string;
    quote: string;
    avatarUrl: string;
}

export interface Message {
    id: string;
    name: string;
    email: string;
    phone?: string;
    service: string;
    details: string;
    submittedAt: Date;
}

export interface Article {
    id: string;
    title: string;
    slug: string;
    content: string;
    imageUrl: string;
    status: 'draft' | 'published';
    createdAt: Date;
    isFeatured?: boolean;
    tags?: string[];
}

export const socialPlatforms = ['Facebook', 'Whatsapp', 'Instagram', 'Linkedin'] as const;

export interface SocialLink {
    platform: typeof socialPlatforms[number];
    href: string;
}
  
export interface SiteSettings {
    id: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
    socials: SocialLink[];
}

export interface Intake {
    id: string;
    submittedAt: Date;
    fullName: string;
    companyName: string;
    email: string;
    phone?: string;
    currentWebsite?: string;
    companyDescription?: string;
    primaryPurpose: string;
    targetAudience?: string;
    visitorActions?: string[];
    successMetrics?: string;
    designAdjectives?: string;
    likedWebsites?: string;
    dislikedWebsites?: string;
    logoAndBranding: string;
    neededPages?: string[];
    contentProvider: string;
    neededFeatures?: string[];
    otherFeatures?: string;
    domainAndHosting: string;
    budget: string;
    deadline?: string;
    finalThoughts?: string;
}

export type NewIntake = Omit<Intake, 'id' | 'submittedAt'>;

export const projects: Project[] = [
    {
      id: "1",
      title: "Nova Financial Website",
      slug: "nova-financial-website",
      longDescription: "A complete website redesign for Nova Financial, a leading wealth management firm. The project focused on creating a modern, trustworthy, and user-friendly experience for high-net-worth individuals. We developed a custom dashboard for clients to track their portfolios, integrated complex financial data visualizations, and ensured the site met stringent security and compliance standards. The technology stack included Next.js for server-side rendering, Recharts for data visualization, and a headless CMS for easy content updates.",
      summary: "Launched a secure, compliant, and user-centric website for a top wealth management firm, featuring a custom portfolio dashboard and boosting client engagement.",
      imageUrl: "https://picsum.photos/seed/project1/600/400",
      imageHint: "finance dashboard",
      services: ["Web Development", "UI/UX Design"],
      status: "Completed",
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Helia Skincare Branding",
      slug: "helia-skincare-branding",
      longDescription: "Helia Skincare approached us for a complete branding package for their new line of organic skincare products. We developed a brand strategy, name, logo, and packaging design that conveyed a sense of natural luxury. The visual identity revolves around soft, earthy tones, elegant typography, and minimalist illustrations. The project culminated in a beautiful, cohesive brand that stands out in a crowded market.",
      summary: "Created a full brand identity, from name to packaging, for an organic skincare line, resulting in a distinct and luxurious market presence.",
      imageUrl: "https://picsum.photos/seed/project2/600/400",
      imageHint: "skincare product",
      services: ["Branding"],
      status: "Completed",
      createdAt: new Date(),
    },
    {
      id: "3",
      title: "Traverse Travel App",
      slug: "traverse-travel-app",
      longDescription: "Designed and developed Traverse, a mobile application for discovering and booking unique travel experiences. The app allows users to explore destinations, create custom itineraries, and book flights and hotels. Key features include an interactive map, a social feed for sharing travel stories, and offline access to trip details. The app was built natively for both iOS and Android to ensure a smooth, high-performance user experience.",
      summary: "Developed a native mobile app for iOS and Android that simplifies travel planning with features like interactive maps and social sharing.",
      imageUrl: "https://picsum.photos/seed/project3/400/600",
      imageHint: "travel app",
      services: ["Mobile App", "UI/UX Design"],
      status: "In Progress",
      createdAt: new Date(),
    },
];

export const services: Service[] = [
    {
        id: "1",
        title: 'Branding',
        slug: 'branding',
        description: 'We craft unique brand identities that tell your story and help you claim your digital throne.',
        longDescription: 'Our branding process is a deep dive into your company\'s essence. We start with understanding your mission, vision, and values. From there, we develop a comprehensive brand strategy that informs every design decision. This includes logo design, color palette selection, typography, and voice & tone guidelines. We create a complete visual identity system that ensures consistency across all your marketing materials, from your website to your social media profiles to your business cards. The result is a powerful, cohesive brand that builds trust and loyalty.',
        icon: 'Branding',
    },
    {
        id: "2",
        title: 'UI/UX Design',
        slug: 'ui-ux-design',
        description: 'We design intuitive and beautiful user interfaces that captivate and convert.',
        longDescription: 'User-Experience (UX) and User-Interface (UI) are at the heart of everything we build. Our design process is human-centered, starting with in-depth research to understand your users\' needs, behaviors, and pain points. We create detailed user personas and journey maps to guide the design. From there, we move to wireframing and prototyping, creating interactive models of the user flow. Finally, we craft a visually stunning UI that is not only beautiful but also accessible and easy to use. Our goal is to create seamless, engaging experiences that users love.',
        icon: 'UI/UX Design',
    },
    {
        id: "3",
        title: 'Web Development',
        slug: 'web-development',
        description: 'We build fast, responsive, and scalable websites using modern technologies like Next.js and WordPress.',
        longDescription: 'Our web development team specializes in building high-performance websites that are both visually stunning and technically sound. We use modern frameworks like Next.js for performance and trusted platforms like WordPress for flexibility. We follow best practices for coding, ensuring your website is maintainable and secure. Whether you need a simple marketing site, a complex web application, or a headless CMS integration, we have the expertise to deliver a solution that meets your specific needs and exceeds your expectations.',
        icon: 'Web Development',
    },
    {
        id: "4",
        title: 'Mobile App',
        slug: 'mobile-app',
        description: 'We design and develop high-performance mobile applications that amplify your impact.',
        longDescription: 'We build native and cross-platform mobile apps that deliver a fantastic user experience. Our team handles the entire lifecycle, from ideation and design to development, testing, and App Store submission. We focus on performance, security, and scalability, ensuring your app can grow with your user base. Whether you need a simple utility app to streamline your workflow or a complex social network to build a community, we have the skills to bring your mobile vision to life.',
        icon: 'Mobile App',
    },
    {
        id: "5",
        title: 'E-commerce',
        slug: 'e-commerce',
        description: 'We develop robust e-commerce solutions that drive sales and help you scale.',
        longDescription: 'We create powerful e-commerce experiences on platforms like Shopify, as well as custom-built solutions. Our focus is on creating a seamless shopping journey for your customers, from product discovery to checkout. We integrate secure payment gateways, manage complex product catalogs, and optimize for conversions. We can also build custom features like subscription models, customer accounts, and loyalty programs to help you build a thriving online business.',
        icon: 'E-commerce',
    },
    {
        id: "6",
        title: 'Marketing',
        slug: 'marketing',
        description: 'We execute data-driven SEO and marketing strategies to make you visible online.',
        longDescription: 'Our digital marketing services are designed to help you reach your target audience and achieve your business goals. We develop comprehensive strategies that include Search Engine Optimization (SEO) to make you visible in search results, Pay-Per-Click (PPC) advertising, and custom automations to save you time. We are data-driven, constantly analyzing performance and optimizing our campaigns to deliver the best possible return on investment. Let us help you grow your brand and connect with more customers online.',
        icon: 'Marketing',
    },
    {
        id: "7",
        title: 'Automations',
        slug: 'automations',
        description: 'We save you time and streamline your operations by building custom automations that handle your repetitive, time-consuming tasks.',
        longDescription: 'In today\'s fast-paced world, efficiency is key. We specialize in creating custom automation solutions that integrate with your existing workflows. Whether it\'s automating data entry, streamlining your social media posting, managing email campaigns, or connecting disparate software systems, we build robust solutions that save you time and reduce errors. Let us handle the repetitive work so you can focus on what you do best: growing your business.',
        icon: 'Automations',
    }
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Aisha Khan",
    title: "CEO",
    company: "Helia Skincare",
    quote: "Working with Ampire Studios was a dream. They took our vision and translated it into a brand that is both beautiful and authentic. Their attention to detail is unmatched.",
    avatarUrl: "https://picsum.photos/seed/person1/100/100",
  },
  {
    id: "2",
    name: "David Lee",
    title: "COO",
    company: "Orion Robotics",
    quote: "The marketing launch was a resounding success, and we couldn't have done it without this team. Their strategic approach and flawless execution delivered incredible results.",
    avatarUrl: "https://picsum.photos/seed/person2/100/100",
  },
  {
    id: "3",
    name: "Emily Carter",
    title: "Founder",
    company: "The Culinary Collective",
    quote: "Our new e-commerce site is a game-changer. It's robust, aasy to manage, and our customers love the seamless experience. Sales have been climbing steadily since launch.",
    avatarUrl: "https://picsum.photos/seed/person3/100/100",
  },
  {
    id: "4",
    name: "Ben Carter",
    title: "Head of Product",
    company: "Traverse",
    quote: "The mobile app they built is world-class. From the initial wireframes to the final App Store submission, the process was collaborative and efficient. A truly top-tier development partner.",
    avatarUrl: "https://picsum.photos/seed/person4/100/100",
  },
];

export const articles: Article[] = [
    {
        id: "1",
        title: "The Art of Digital Storytelling in Branding",
        slug: "art-of-digital-storytelling-in-branding",
        content: "In a world saturated with content, the ability to tell a compelling story is what separates successful brands from the rest. Digital storytelling isn't just about stringing words together; it's about weaving a narrative across multiple platforms that captivates, engages, and converts your audience. It involves understanding your audience's emotional triggers, crafting a consistent brand voice, and using visuals to enhance the message. From your website's 'About Us' page to your latest social media campaign, every piece of content should contribute to a larger, cohesive brand story. This approach builds trust, fosters loyalty, and ultimately drives business growth. A well-told story doesn't just sell a product; it sells an experience, a lifestyle, and a connection that resonates long after the initial interaction.",
        imageUrl: "https://picsum.photos/seed/article1/800/400",
        status: 'published',
        isFeatured: true,
        tags: ["Branding", "Marketing"],
        createdAt: new Date('2023-10-15T10:00:00Z'),
    },
    {
        id: "2",
        title: "5 UI/UX Trends to Watch in the Coming Year",
        slug: "5-ui-ux-trends-to-watch",
        content: "The digital landscape is in constant flux, and user interface (UI) and user experience (UX) design are at the forefront of this evolution. As we look ahead, several key trends are emerging that promise to shape how we interact with technology. First, expect to see more immersive experiences powered by augmented and virtual reality (AR/VR). Second, hyper-personalization, driven by AI, will deliver content and interfaces tailored to individual users. Third, neumorphism, a design style that uses soft, subtle shadows and highlights, is making a comeback for a tactile feel. Fourth, voice-activated interfaces (VUIs) will become more integrated into our daily digital lives. Finally, a renewed focus on digital well-being will lead to designs that are more mindful, ethical, and less intrusive. Staying ahead of these trends will be crucial for creating products that are not only functional but also delightful to use.",
        imageUrl: "https://picsum.photos/seed/article2/800/400",
        status: 'published',
        isFeatured: true,
        tags: ["UI/UX Design"],
        createdAt: new Date('2023-10-10T14:30:00Z'),
    },
    {
        id: "3",
        title: "Why Your Next Web Project Should Be on Next.js",
        slug: "why-choose-next-js",
        content: "When it comes to modern web development, choosing the right framework can make all the difference. Next.js, the React framework, has emerged as a dominant force for good reason. It offers a powerful combination of features that streamline development and boost performance. Server-Side Rendering (SSR) and Static Site Generation (SSG) provide incredible speed and SEO benefits. Its file-based routing system is intuitive and simplifies navigation. The built-in image optimization component automatically serves perfectly sized images for any device. Furthermore, its support for API routes allows you to build a full-stack application within a single project. For developers, the fast refresh and robust tooling create a world-class development experience. For businesses, the result is a fast, scalable, and maintainable website that delivers a superior user experience. If you're planning a new web project, Next.js should be at the top of your list.",
        imageUrl: "https://picsum.photos/seed/article3/800/400",
        status: 'published',
        isFeatured: false,
        tags: ["Web Development"],
        createdAt: new Date('2023-10-05T09:00:00Z'),
    }
];

export const allArticleTags = Array.from(new Set(services.map(a => a.title)));


export const siteSettings: SiteSettings = {
    id: "global",
    contactEmail: "contact@ampirestudios.com",
    contactPhone: "+1 (555) 123-4567",
    address: "Kuala Lumpur, Malaysia",
    socials: [
      { platform: "Facebook", href: "https://facebook.com" },
      { platform: "Whatsapp", href: "https://whatsapp.com" },
      { platform: "Instagram", href: "https://instagram.com" },
      { platform: "Linkedin", href: "https://linkedin.com" },
    ]
  };

export const getProjects = () => projects;
export const getProjectBySlug = (slug: string) => projects.find(p => p.slug === slug) || null;

export const getServices = () => services;
export const getServiceBySlug = (slug: string) => services.find(s => s.slug === slug) || null;

export const getTestimonials = () => testimonials;

export const getArticles = () => articles.filter(a => a.status === 'published');
export const getArticleBySlug = (slug: string) => articles.find(a => a.slug === slug && a.status === 'published') || null;

export const getSettings = () => siteSettings;

export const addMessage = async (message: Omit<Message, 'id' | 'submittedAt'>) => {
    // This is a mock function. In a real app, you'd send this to a server.
    console.log("New message submitted:", message);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return { id: new Date().toISOString() };
};

export const addIntake = async (intake: NewIntake) => {
    // This is a mock function. In a real app, you'd send this to a server.
    console.log("New intake submitted:", intake);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return { id: new Date().toISOString() };
};
