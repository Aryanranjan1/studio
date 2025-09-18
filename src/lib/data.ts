export const projectStatuses = ['Pending', 'In Progress', 'Completed', 'Billed'] as const;
export type ProjectStatus = typeof projectStatuses[number];

export const serviceIcons = ['UI/UX Design', 'Web Development', 'Mobile App', 'E-commerce', 'Automations', 'SEO', 'Branding', 'Marketing'] as const;
export type ServiceIcon = typeof serviceIcons[number];

export interface Project {
  id: string;
  title: string;
  slug: string;
  longDescription: string;
  summary: string;
  imageUrl: string;
  imageHint: string;
  services: string[];
  website?: string;
  createdAt?: Date;
  status: ProjectStatus;
  isFeatured?: boolean;
}

export interface Service {
    id: string;
    title: string;
    slug: string;
    description: string;
    longDescription: string;
    icon: ServiceIcon;
    imageUrl: string;
    imageHint: string;
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

export type NewMessage = Omit<Message, 'id' | 'submittedAt'>;

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

// --- Mock Data ---
const sampleProjects: Project[] = [
    {
    id: "6",
    title: "Kedai Basikal Sukmar",
    slug: "kedai-basikal-sukmar",
    summary: "An e-commerce site for a Malaysian bicycle store with smooth navigation and product showcasing.",
    longDescription: "We designed and developed a modern e-commerce platform for Kedai Basikal Sukmar, a local bicycle shop aiming to expand their reach online. The site was built with Next.js for fast performance, features intuitive product filtering, and integrates with a secure checkout system. The branding emphasizes a clean and sporty aesthetic to resonate with cycling enthusiasts.",
    imageUrl: "/images/kedai-basikal-sukmar.png",
    imageHint: "bicycle e-commerce website",
    services: ["E-commerce", "Web Development", "UI/UX Design"],
    website: "https://kedai-basikal-sukmar.vercel.app/",
    status: "Completed",
    createdAt: new Date("2025-01-15T10:00:00Z")
  },
  {
    id: "7",
    title: "Sleeping Bear Jewelry",
    slug: "sleeping-bear-jewelry",
    summary: "A visually stunning jewelry store website that blends elegance with usability.",
    longDescription: "For Sleeping Bear Jewelry, we created a website that reflects the brand’s premium handcrafted jewelry line. The site highlights their product collections with high-resolution photography, minimalistic design, and a frictionless checkout process. Built on Next.js, the site also includes SEO optimization to ensure strong visibility in search engines.",
    imageUrl: "/images/jewellery.png",
    imageHint: "jewelry showcase",
    services: ["E-commerce", "UI/UX Design", "SEO"],
    website: "https://sleepingbearjewelry.vercel.app/",
    status: "Completed",
    createdAt: new Date("2025-01-22T14:00:00Z")
  },
  {
    id: "8",
    title: "A Prema & Co",
    slug: "a-prema-and-co",
    summary: "A professional brand and service website designed for a growing consultancy business.",
    longDescription: "A Prema & Co needed a polished and trustworthy online presence to represent their consultancy services. We designed a clean, corporate-style website with a structured layout, highlighting services, testimonials, and a contact flow that encourages inquiries. Built with a CMS for easy content updates, it gives them flexibility as they scale.",
    imageUrl: "/images/Apremaandco.png",
    imageHint: "consultancy services website",
    services: ["Web Development", "UI/UX Design", "SEO"],
    website: "https://a-prema-and-co.vercel.app/",
    status: "Completed",
    createdAt: new Date("2025-01-29T11:30:00Z")
  },
  {
    id: "9",
    title: "Fahmie Farhan Music",
    slug: "fahmie-farhan-music",
    summary: "A sleek artist portfolio showcasing music, blogs, and a content dashboard.",
    longDescription: "We developed a personalized portfolio website for Fahmie Farhan, a music producer. The site includes sections for music, blog posts, and a content dashboard, enabling easy management of projects. Built with Next.js, it is optimized for performance and SEO, helping Fahmie reach a wider audience with his creative work.",
    imageUrl: "/images/fahmiefarhanmusic.png",
    imageHint: "music portfolio",
    services: ["Web Development", "UI/UX Design"],
    website: "https://fahmie-farhan-music.vercel.app/",
    status: "Completed",
    createdAt: new Date("2025-02-10T09:45:00Z")
  },
  {
    id: "10",
    title: "CardioSim",
    slug: "cardiosim",
    summary: "An interactive medical simulation game for cardiology education and training.",
    longDescription: "CardioSim is a browser-based simulation game designed for medical students and professionals to practice cardiology scenarios. We built it using Next.js and integrated AI APIs for realistic patient case generation. The app features dynamic simulations, patient state management, and even AI-generated medical imagery to enhance realism.",
    imageUrl: "/images/cardiosim.png",
    imageHint: "medical simulation game",
    services: ["Web Development", "UI/UX Design", "Automations"],
    website: "https://cardiosim.netlify.app/",
    status: "In Progress",
    createdAt: new Date("2025-02-18T13:15:00Z")
  },
  {
    id: "11",
    title: "Email Automation Suite",
    slug: "email-automation-suite",
    summary: "A SaaS solution that streamlines email campaigns with scheduling and personalization.",
    longDescription: "We designed and developed an email automation platform for a marketing agency, enabling them to automate client campaigns with advanced scheduling, segmentation, and personalized templates. The tool integrates with popular CRMs and includes performance analytics dashboards, helping businesses run campaigns more effectively.",
    imageUrl: "/images/email.png",
    imageHint: "email automation dashboard",
    services: ["Automations", "Web Development", "UI/UX Design"],
    status: "Completed",
    createdAt: new Date("2025-02-25T12:00:00Z")
  },
  {
    id: "12",
    title: "Marketing Workflow Automation",
    slug: "marketing-workflow-automation",
    summary: "A custom automation system for managing and optimizing marketing workflows.",
    longDescription: "We built a powerful automation solution for a digital marketing firm, designed to streamline repetitive workflows like social post scheduling, client reporting, and A/B testing. The system integrates multiple APIs including Meta, Google Ads, and LinkedIn, automating tasks that previously took hours of manual work.",
    imageUrl: "/images/marketing.png",
    imageHint: "marketing workflow automation",
    services: ["Automations", "Web Development"],
    status: "Pending",
    createdAt: new Date("2025-03-05T15:45:00Z")
  }
];

const sampleTestimonials: Testimonial[] = [
    { id: "1", name: "Aisha Khan", title: "CEO", company: "Helia Skincare", quote: "Working with Ampire Studios was a dream. They took our vision and translated it into a brand that is both beautiful and authentic. Their attention to detail is unmatched.", avatarUrl: "https://picsum.photos/seed/aisha-khan/100/100" },
    { id: "2", name: "Ben Carter", title: "Founder", company: "Artisan Coffee", quote: "Our online sales have doubled since launching the new website. The team was professional, creative, and delivered a product that exceeded our expectations.", avatarUrl: "https://picsum.photos/seed/ben-carter/100/100" },
    { id: "3", name: "Chen Wei", title: "CFO", company: "Nova Financial", quote: "The website they built for us is not only fast and secure but also perfectly communicates our firm's values. We've received numerous compliments from clients.", avatarUrl: "https://picsum.photos/seed/chen-wei/100/100" },
    { id: "4", name: "David Miller", title: "Marketing Director", company: "Innovate Inc.", quote: "The new automation tools have saved my team at least 10 hours a week. It's a game-changer for our productivity. Highly recommend their services.", avatarUrl: "https://picsum.photos/seed/david-miller/100/100" },
    { id: "5", name: "Emily Rodriguez", title: "Product Manager", company: "Traverse", quote: "Their UI/UX design process was incredibly thorough. They understood our users' needs and created an app that is a joy to use.", avatarUrl: "https://picsum.photos/seed/emily-rodriguez/100/100" },
];

const sampleServices: Service[] = [
    { id: "1", title: "Branding", slug: "branding", description: "Crafting unique brand identities that tell a story.", longDescription: "We build memorable brands from the ground up, including logo design, color palettes, typography, and messaging guidelines. Our process ensures your brand's essence is captured and communicated effectively across all touchpoints.", imageUrl: "https://picsum.photos/seed/branding-service/800/600", imageHint: "brand moodboard", icon: "Branding" },
    { id: "2", title: "UI/UX Design", slug: "ui-ux-design", description: "Designing intuitive and beautiful user experiences.", longDescription: "Our UI/UX design process focuses on creating interfaces that are not only aesthetically pleasing but also highly functional and user-friendly. We conduct user research, create wireframes, and design high-fidelity prototypes to ensure the final product meets user needs and business goals.", imageUrl: "https://picsum.photos/seed/uiux-service/800/600", imageHint: "design wireframe", icon: "UI/UX Design" },
    { id: "3", title: "Web Development", slug: "web-development", description: "Building high-performance, scalable websites.", longDescription: "We specialize in developing custom websites using modern technologies like Next.js and headless CMS solutions. Our focus is on performance, security, and scalability, ensuring your website can grow with your business.", imageUrl: "https://picsum.photos/seed/webdev-service/800/600", imageHint: "code screen", icon: "Web Development" },
    { id: "4", title: "Mobile App", slug: "mobile-app", description: "Creating engaging mobile apps for iOS and Android.", longDescription: "From concept to launch, we design and develop mobile applications for both iOS and Android platforms. We focus on creating a seamless user experience that keeps your audience engaged and connected with your brand on the go.", imageUrl: "https://picsum.photos/seed/mobile-service/800/600", imageHint: "mobile phone", icon: "Mobile App" },
    { id: "5", title: "E-commerce", slug: "e-commerce", description: "Developing powerful and frictionless e-commerce solutions.", longDescription: "We create effective online stores using platforms like Shopify or custom-built solutions. Our e-commerce services include everything from product page design to payment gateway integration, all focused on maximizing conversions and providing a smooth shopping experience.", imageUrl: "https://picsum.photos/seed/ecommerce-service/800/600", imageHint: "online shopping", icon: "E-commerce" },
    { id: "6", title: "Marketing", slug: "marketing", description: "Driving growth through targeted digital marketing strategies.", longDescription: "Our marketing services help you reach your target audience and grow your business. We offer SEO, content marketing, and social media management to increase your online visibility and drive qualified leads.", imageUrl: "https://picsum.photos/seed/marketing-service/800/600", imageHint: "marketing chart", icon: "Marketing" },
    { id: "7", title: "Automations", slug: "automations", description: "Streamlining business processes with custom automations.", longDescription: "We build custom automation workflows to save you time and reduce manual effort. By integrating your existing tools and systems, we help you streamline operations, improve efficiency, and focus on what matters most.", imageUrl: "https://picsum.photos/seed/automation-service/800/600", imageHint: "gears machine", icon: "Automations" },
    { id: "8", title: "SEO", slug: "seo", description: "Improving your search engine ranking to attract organic traffic.", longDescription: "Our SEO services are designed to improve your website's visibility on search engines like Google. We perform keyword research, on-page optimization, and link building to drive more organic traffic to your site.", imageUrl: "https://picsum.photos/seed/seo-service/800/600", imageHint: "search results", icon: "SEO" },
];

const sampleArticles: Article[] = [
    {
        id: "1",
        title: "The Future of Web Design: 5 Trends to Watch in 2024",
        slug: "future-of-web-design-2024",
        content: "The digital landscape is in constant flux, and web design is no exception. As we move further into 2024, several key trends are emerging that promise to shape the future of user experiences online. From the rise of AI-driven design to the increasing importance of immersive 3D elements, staying ahead of the curve is crucial for any business looking to make an impact. In this article, we'll explore five of the most significant trends that are defining the next generation of web design, including brutalism, dynamic color palettes, and the return of typographic-focused layouts. Understanding and implementing these trends can help your brand create a more engaging, memorable, and effective online presence.",
        imageUrl: "https://picsum.photos/seed/article1/1200/800",
        status: 'published',
        createdAt: new Date("2024-05-15T10:00:00Z"),
        isFeatured: true,
        tags: [
            "UI/UX Design",
            "Web Development"
        ]
    },
    {
        id: "2",
        title: "Why Your Small Business Needs a Professional Brand Identity",
        slug: "why-small-business-needs-branding",
        content: "In a crowded marketplace, a strong brand identity is not a luxury—it's a necessity. For small businesses, professional branding is the key to standing out, building trust, and fostering customer loyalty. It goes far beyond just a logo; it's the complete visual and emotional experience you provide. A cohesive brand identity, from your color scheme and typography to your tone of voice, ensures that your business is recognizable and memorable. This article breaks down the essential components of a brand identity and explains why investing in professional branding from the start is one of the smartest decisions a small business owner can make for long-term growth and success.",
        imageUrl: "https://picsum.photos/seed/article2/1200/800",
        status: 'published',
        createdAt: new Date("2024-05-10T14:30:00Z"),
        isFeatured: true,
        tags: [
            "Branding"
        ]
    },
    {
        id: "3",
        title: "Headless CMS vs. Traditional CMS: Which is Right for You?",
        slug: "headless-vs-traditional-cms",
        content: "Choosing the right Content Management System (CMS) is a critical decision that will impact your website's performance, scalability, and flexibility. The two main contenders in the modern web development world are traditional CMSs like WordPress and headless CMSs like Strapi or Contentful. A traditional CMS bundles the back-end (content management) and front-end (presentation layer) together, while a headless CMS decouples them, providing content as data via an API. This allows for greater flexibility, better performance, and easier integration across multiple platforms (web, mobile apps, etc.). This article compares the pros and cons of both approaches to help you decide which architecture is the best fit for your project's specific needs.",
        imageUrl: "https://picsum.photos/seed/article3/1200/800",
        status: 'published',
        createdAt: new Date("2024-04-28T09:00:00Z"),
        tags: ["Web Development", "Automations"]
    },
    {
        id: "4",
        title: "Boosting E-commerce Sales: A Guide to Conversion Rate Optimization",
        slug: "ecommerce-conversion-optimization",
        content: "Getting traffic to your online store is only half the battle. The real challenge lies in converting those visitors into paying customers. This is where Conversion Rate Optimization (CRO) comes in. CRO is the systematic process of increasing the percentage of website visitors who take a desired action — be it making a purchase, adding to a cart, or signing up for a newsletter. From streamlining your checkout process and optimizing product pages to implementing A/B testing and leveraging customer reviews, this guide covers actionable strategies you can implement today to reduce friction, build trust, and ultimately boost your e-commerce sales.",
        imageUrl: "https://picsum.photos/seed/article4/1200/800",
        status: 'published',
        createdAt: new Date("2024-04-15T11:20:00Z"),
        tags: ["E-commerce", "Marketing"]
    },
];

const sampleSettings: SiteSettings = {
    id: "global",
    contactEmail: "contact@ampire.studio",
    contactPhone: "+60 12-345 6789",
    address: "Kuala Lumpur, Malaysia",
    socials: [
      { platform: 'Facebook', href: 'https://facebook.com' },
      { platform: 'Whatsapp', href: 'https://whatsapp.com' },
      { platform: 'Instagram', href: 'https://instagram.com' },
      { platform: 'Linkedin', href: 'https://linkedin.com' }
    ]
};

export const getProjects = (): Project[] => sampleProjects;
export const getFeaturedProjects = (): Project[] => sampleProjects.filter(p => p.isFeatured);
export const getProjectBySlug = (slug: string): Project | null => sampleProjects.find(p => p.slug === slug) || null;
export const getServices = (): Service[] => sampleServices.filter(s => s.title !== "Marketing" && s.title !== "Branding");
export const getServiceBySlug = (slug: string): Service | null => sampleServices.find(s => s.slug === slug) || null;
export const getTestimonials = (): Testimonial[] => sampleTestimonials;
export const getArticles = (): Article[] => sampleArticles.filter(a => a.status === 'published');
export const getArticleBySlug = (slug: string): Article | null => sampleArticles.find(a => a.slug === slug && a.status === 'published') || null;
export const getSettings = (): SiteSettings => sampleSettings;

export const addIntake = async (intake: NewIntake): Promise<{id: string}> => {
    // Mock submission
    await new Promise(resolve => setTimeout(resolve, 500));
    return { id: new Date().toISOString() };
};

export const addMessage = async (message: NewMessage): Promise<{id: string}> => {
    // Mock submission
    await new Promise(resolve => setTimeout(resolve, 500));
    return { id: new Date().toISOString() };
};