import { collection, getDocs, onSnapshot, query, orderBy } from "firebase/firestore";
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
      title: "Zenith Branding Identity",
      longDescription: "A comprehensive branding project for Zenith, a luxury watchmaker. We developed a new logo, visual identity system, and packaging design that reflects the brand's commitment to precision and elegance. The project involved extensive market research and competitor analysis to create a timeless and sophisticated brand image.",
      summary: "Created a timeless and sophisticated brand identity for a luxury watchmaker, enhancing its market position through a new logo, visual system, and packaging.",
      imageUrl: "https://picsum.photos/600/400",
      imageHint: "logo brand",
      services: ["Branding", "UI/UX Design"],
    },
    {
      title: "EcoHarbor Website Redesign",
      longDescription: "We redesigned the website for EcoHarbor, a non-profit dedicated to marine conservation. The new site features an engaging user experience, streamlined donation process, and a resource hub for educational materials. Our focus was on creating a visually compelling narrative to drive user engagement and support for their cause. We used React and Next.js for a fast, modern web experience.",
      summary: "Launched a visually compelling website with a streamlined donation process, significantly boosting user engagement and support for a marine conservation non-profit.",
      imageUrl: "https://picsum.photos/600/400",
      imageHint: "website nature",
      services: ["Web Development", "UI/UX Design"],
    },
    {
      title: "ConnectApp Mobile Application",
      longDescription: "Designed and developed a new social networking mobile app, ConnectApp. The app focuses on connecting people through shared interests and local events. The UI/UX design is clean, intuitive, and promotes user interaction. We built the app natively for both iOS and Android to ensure optimal performance.",
      summary: "Developed an intuitive social networking app for iOS and Android, connecting users through local events and shared interests with a clean, engaging interface.",
      imageUrl: "https://picsum.photos/400/600",
      imageHint: "mobile app",
      services: ["Mobile App", "UI/UX Design"],
    },
    {
      title: "Artisan's Corner E-commerce Platform",
      longDescription: "Developed a full-featured e-commerce platform for Artisan's Corner, a marketplace for handmade goods. The platform includes vendor dashboards, secure payment integration, and a custom review system. The design highlights the unique products and tells the story of the artisans.",
      summary: "Built a full-featured e-commerce platform with vendor dashboards and secure payments, empowering artisans and highlighting their unique, handmade products.",
      imageUrl: "https://picsum.photos/600/400",
      imageHint: "ecommerce shopping",
      services: ["Web Development", "E-commerce"],
    },
    {
      title: "QuantumLeap Marketing Campaign",
      longDescription: "Created a multi-channel marketing campaign for QuantumLeap, a tech startup specializing in AI solutions. The campaign included digital ads, social media content, and a new landing page, resulting in a 200% increase in lead generation.",
      summary: "Executed a multi-channel marketing campaign that generated a 200% increase in leads through targeted digital ads, social media, and a new landing page.",
      imageUrl: "https://picsum.photos/600/400",
      imageHint: "marketing data",
      services: ["Branding", "Marketing"],
    },
    {
      title: "Oasis Wellness App",
      longDescription: "A mobile app for Oasis Wellness that provides guided meditations, mindfulness exercises, and personalized wellness plans. The serene interface and calming color palette are designed to create a peaceful user experience.",
      summary: "Designed a wellness app with a serene interface offering guided meditations and personalized plans, creating a peaceful and engaging user experience.",
      imageUrl: "https://picsum.photos/400/600",
      imageHint: "mobile wellness",
      services: ["Mobile App", "UI/UX Design"],
    },
  ];


export const services = ["Branding", "UI/UX Design", "Web Development", "Mobile App", "E-commerce", "Marketing"];

export const sampleTestimonials = [
  {
    name: "Sarah Johnson",
    title: "Marketing Director",
    company: "QuantumLeap",
    quote: "AMpire Studio transformed our online presence. Their strategic approach to design and development doubled our lead generation in just three months. A truly remarkable team!",
    avatarUrl: "https://picsum.photos/100/100",
  },
  {
    name: "Michael Chen",
    title: "Founder",
    company: "Artisan's Corner",
    quote: "The e-commerce platform they built for us is both beautiful and highly functional. Our vendors love the new system, and sales have increased by 40% since launch.",
    avatarUrl: "https://picsum.photos/100/100",
  },
  {
    name: "Jessica Rodriguez",
    title: "CEO",
    company: "ConnectApp",
    quote: "From initial concept to final launch, the team was professional, creative, and incredibly responsive. They delivered a mobile app that exceeded all our expectations.",
    avatarUrl: "https://picsum.photos/100/100",
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
