import { collection, getDocs, onSnapshot, query, orderBy, doc } from "firebase/firestore";
import { db } from "./firebase";

export interface Project {
  id: string;
  title: string;
  longDescription: string;
  summary: string;
  imageUrl: string;
  imageHint: string;
  services: string[];
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
}

export interface SocialLink {
    platform: 'Facebook' | 'Twitter' | 'Instagram' | 'Linkedin';
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


export const getProjects = (callback: (projects: Project[]) => void) => {
    const projectsQuery = query(collection(db, "projects"), orderBy("title"));
    return onSnapshot(projectsQuery, (querySnapshot) => {
        const projects: Project[] = [];
        querySnapshot.forEach((doc) => {
            projects.push({ id: doc.id, ...doc.data() } as Project);
        });
        callback(projects);
    });
};

export const getTestimonials = (callback: (testimonials: Testimonial[]) => void) => {
    return onSnapshot(collection(db, "testimonials"), (querySnapshot) => {
        const testimonials: Testimonial[] = [];
        querySnapshot.forEach((doc) => {
            testimonials.push({ id: doc.id, ...doc.data() } as Testimonial);
        });
        callback(testimonials);
    });
}

export const getArticles = (callback: (articles: Article[]) => void) => {
    const articlesQuery = query(collection(db, "articles"), orderBy("createdAt", "desc"));
    return onSnapshot(articlesQuery, (querySnapshot) => {
        const articles: Article[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            articles.push({ 
                id: doc.id, 
                ...data,
                createdAt: data.createdAt?.toDate(),
            } as Article);
        });
        callback(articles);
    });
};

export const getSettings = (callback: (settings: SiteSettings | null) => void) => {
    const settingsDocRef = doc(db, "settings", "global");
    return onSnapshot(settingsDocRef, (docSnap) => {
        if (docSnap.exists()) {
            callback({ id: docSnap.id, ...docSnap.data() } as SiteSettings);
        } else {
            console.warn("Settings document not found!");
            callback(null);
        }
    });
};


export const sampleProjects = [
    {
      title: "Nova Financial Website",
      longDescription: "A complete website redesign for Nova Financial, a leading wealth management firm. The project focused on creating a modern, trustworthy, and user-friendly experience for high-net-worth individuals. We developed a custom dashboard for clients to track their portfolios, integrated complex financial data visualizations, and ensured the site met stringent security and compliance standards. The technology stack included Next.js for server-side rendering, Recharts for data visualization, and a headless CMS for easy content updates.",
      summary: "Launched a secure, compliant, and user-centric website for a top wealth management firm, featuring a custom portfolio dashboard and boosting client engagement.",
      imageUrl: "https://picsum.photos/600/400",
      imageHint: "finance dashboard",
      services: ["Web Development", "UI/UX Design"],
    },
    {
      title: "Helia Skincare Branding",
      longDescription: "Helia Skincare approached us for a complete branding package for their new line of organic skincare products. We developed a brand strategy, name, logo, and packaging design that conveyed a sense of natural luxury. The visual identity revolves around soft, earthy tones, elegant typography, and minimalist illustrations. The project culminated in a beautiful, cohesive brand that stands out in a crowded market.",
      summary: "Created a full brand identity, from name to packaging, for an organic skincare line, resulting in a distinct and luxurious market presence.",
      imageUrl: "https://picsum.photos/600/400",
      imageHint: "skincare product",
      services: ["Branding"],
    },
    {
      title: "Traverse Travel App",
      longDescription: "Designed and developed Traverse, a mobile application for discovering and booking unique travel experiences. The app allows users to explore destinations, create custom itineraries, and book flights and hotels. Key features include an interactive map, a social feed for sharing travel stories, and offline access to trip details. The app was built natively for both iOS and Android to ensure a smooth, high-performance user experience.",
      summary: "Developed a native mobile app for iOS and Android that simplifies travel planning with features like interactive maps and social sharing.",
      imageUrl: "https://picsum.photos/400/600",
      imageHint: "travel app",
      services: ["Mobile App", "UI/UX Design"],
    },
    {
      title: "The Culinary Collective E-commerce Store",
      longDescription: "We built a sophisticated e-commerce platform for The Culinary Collective, a purveyor of gourmet foods. The platform was built on Shopify Plus and heavily customized to support features like product bundling, subscription boxes, and a wholesale portal. We also integrated their ERP system for seamless inventory management. The design is clean, appetizing, and optimized for conversions.",
      summary: "Built a custom Shopify Plus e-commerce platform with subscription and wholesale features, leading to streamlined operations and increased online sales.",
      imageUrl: "https://picsum.photos/600/400",
      imageHint: "gourmet food",
      services: ["E-commerce", "Web Development"],
    },
    {
      title: "Orion Robotics Marketing Launch",
      longDescription: "Executed a comprehensive digital marketing campaign for the launch of Orion Robotics' new line of autonomous warehouse robots. The campaign included creating a new landing page, producing a product launch video, running targeted ad campaigns on LinkedIn and Google, and developing a content marketing strategy to drive organic traffic. The campaign exceeded lead generation goals by 150% in the first quarter.",
      summary: "Launched a multi-channel digital marketing campaign for a robotics company, exceeding lead generation targets by 150% through video, ads, and content.",
      imageUrl: "https://picsum.photos/600/400",
      imageHint: "robotics technology",
      services: ["Marketing"],
    },
    {
      title: "MindWell Mental Health App",
      longDescription: "A UI/UX design project for MindWell, a new mental health application. Our goal was to create an interface that was calming, non-judgmental, and easy to navigate. We conducted extensive user research to understand the needs and sensitivities of the target audience. The final design features a soothing color palette, gentle animations, and a clear information architecture that guides users to resources like guided journaling, meditation, and therapist directories.",
      summary: "Designed a calming and intuitive UI/UX for a mental health app, focusing on user research to create a supportive and easy-to-navigate experience.",
      imageUrl: "https://picsum.photos/400/600",
      imageHint: "meditation app",
      services: ["UI/UX Design"],
    },
  ];


export const services = ["Branding", "UI/UX Design", "Web Development", "Mobile App", "E-commerce", "Marketing"];

export const sampleTestimonials = [
  {
    name: "Aisha Khan",
    title: "CEO",
    company: "Helia Skincare",
    quote: "Working with AMpire Studio was a dream. They took our vision and translated it into a brand that is both beautiful and authentic. Their attention to detail is unmatched.",
    avatarUrl: "https://picsum.photos/100/100",
  },
  {
    name: "David Lee",
    title: "COO",
    company: "Orion Robotics",
    quote: "The marketing launch was a resounding success, and we couldn't have done it without this team. Their strategic approach and flawless execution delivered incredible results.",
    avatarUrl: "https://picsum.photos/101/101",
  },
  {
    name: "Emily Carter",
    title: "Founder",
    company: "The Culinary Collective",
    quote: "Our new e-commerce site is a game-changer. It's robust, easy to manage, and our customers love the seamless experience. Sales have been climbing steadily since launch.",
    avatarUrl: "https://picsum.photos/102/102",
  },
  {
    name: "Ben Carter",
    title: "Head of Product",
    company: "Traverse",
    quote: "The mobile app they built is world-class. From the initial wireframes to the final App Store submission, the process was collaborative and efficient. A truly top-tier development partner.",
    avatarUrl: "https://picsum.photos/103/103",
  },
];

export const sampleArticles = [
    {
        title: "The Art of Digital Storytelling in Branding",
        slug: "art-of-digital-storytelling-in-branding",
        content: "In a world saturated with content, the ability to tell a compelling story is what separates successful brands from the rest. Digital storytelling isn't just about stringing words together; it's about weaving a narrative across multiple platforms that captivates, engages, and converts your audience. It involves understanding your audience's emotional triggers, crafting a consistent brand voice, and using visuals to enhance the message. From your website's 'About Us' page to your latest social media campaign, every piece of content should contribute to a larger, cohesive brand story. This approach builds trust, fosters loyalty, and ultimately drives business growth. A well-told story doesn't just sell a product; it sells an experience, a lifestyle, and a connection that resonates long after the initial interaction.",
        imageUrl: "https://picsum.photos/800/400",
        status: 'published',
        createdAt: new Date('2023-10-26'),
    },
    {
        title: "5 UI/UX Trends to Watch in the Coming Year",
        slug: "5-ui-ux-trends-to-watch",
        content: "The digital landscape is in constant flux, and user interface (UI) and user experience (UX) design are at the forefront of this evolution. As we look ahead, several key trends are emerging that promise to shape how we interact with technology. First, expect to see more immersive experiences powered by augmented and virtual reality (AR/VR). Second, hyper-personalization, driven by AI, will deliver content and interfaces tailored to individual users. Third, neumorphism, a design style that uses soft, subtle shadows and highlights, is making a comeback for a tactile feel. Fourth, voice-activated interfaces (VUIs) will become more integrated into our daily digital lives. Finally, a renewed focus on digital well-being will lead to designs that are more mindful, ethical, and less intrusive. Staying ahead of these trends will be crucial for creating products that are not only functional but also delightful to use.",
        imageUrl: "https://picsum.photos/800/400",
        status: 'published',
        createdAt: new Date('2023-11-15'),
    },
    {
        title: "Why Your Next Web Project Should Be on Next.js",
        slug: "why-choose-next-js",
        content: "When it comes to modern web development, choosing the right framework can make all the difference. Next.js, the React framework, has emerged as a dominant force for good reason. It offers a powerful combination of features that streamline development and boost performance. Server-Side Rendering (SSR) and Static Site Generation (SSG) provide incredible speed and SEO benefits. Its file-based routing system is intuitive and simplifies navigation. The built-in image optimization component automatically serves perfectly sized images for any device. Furthermore, its support for API routes allows you to build a full-stack application within a single project. For developers, the fast refresh and robust tooling create a world-class development experience. For businesses, the result is a fast, scalable, and maintainable website that delivers a superior user experience. If you're planning a new web project, Next.js should be at the top of your list.",
        imageUrl: "https://picsum.photos/800/400",
        status: 'draft',
        createdAt: new Date('2023-12-01'),
    }
];

export const sampleSettings = {
    contactEmail: "contact@ampirestudio.com",
    contactPhone: "+1 (555) 123-4567",
    address: "Kuala Lumpur, Malaysia",
    socials: [
      { platform: "Facebook", href: "/" },
      { platform: "Twitter", href: "/" },
      { platform: "Instagram", href: "/" },
      { platform: "Linkedin", href: "/" },
    ]
  };
