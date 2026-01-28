




export type Service = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  category: string;
  kpis: {
    value: string;
    label: string;
  }[];
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  image: string;
  projectId: string;
};

export type Founder = {
  name: string;
  role: string;
  bio: string;
  longBio: string;
  image: string;
};

export type SiteSettings = {
  title: string;
  description: string;
  founderName: string;
  founderRole: string;
};

type ImageObject = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export type Message = {
  id: string;
  senderName: string;
  senderEmail?: string;
  senderPhone?: string;
  senderCompany?: string;
  subject: string;
  body: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  source: string;
  receivedAt: any; // Firestore Timestamp
  isArchived: boolean;
  replies?: {
    repliedBy: string; // Admin UID
    body: string;
    sentAt: any; // Firestore Timestamp
  }[];
};

export type SiteConfiguration = {
  emailConfig: {
    enabled: boolean;
    senderName: string;
    senderEmail: string;
  };
  aiConfig: {
    enabled: boolean;
    provider: 'gemini' | 'openai';
  };
};


export type Article = {
  id: string;
  title: string;
  slug: string;
  date: string; // Publish date
  lastUpdated: string;
  author: string;
  authorImage: string;
  excerpt: string; // Used for previews, can double as meta description
  content: string; // Raw HTML
  tags: string[];
  category: string;
  status: 'draft' | 'published';
  readingTime: number;
  featured?: boolean;
  popular?: boolean;
  
  // SEO Fields
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  canonicalUrl?: string;
  robotsMeta: 'index' | 'noindex';

  // Media
  featuredImage: ImageObject;
  cardImage: ImageObject;
  ogImage: ImageObject;
};

export type FaqItem = {
  id: string; // Document ID from Firestore
  question: string;
  answer: string; // HTML content
  preview: string;
  category: string;
  published: boolean;
  order: number;
  link?: {
    href: string;
    text: string;
  };
  createdAt?: any; // Firestore Timestamp
  updatedAt?: any; // Firestore Timestamp
};


export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  image: string;
  imageAlt: string;
  url: string;
  tags: string[];
  images: {
    src: string;
    alt: string;
  }[];
  features: string[];
  specs: {
    stack: string;
    css: string;
    cms: string;
    type: string;
    [key: string]: string; 
  };
  bestSeller?: boolean;
  isNew?: boolean;
  version?: string;
  category?: string;
  technologies: string[];
};

export type PortfolioProject = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  technologies: string[];
  clientName?: string;
  projectYear: string;
  projectUrl?: string;
  longDescription: string; // Raw HTML
  featuredImage: ImageObject;
  cardImage: ImageObject;
  galleryImages: ImageObject[];
  published: boolean;
  publishDate: string; // ISO string
  lastUpdated: string; // ISO string
  metaTitle: string;
  metaDescription: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  robotsMeta: 'index' | 'noindex';
}

export type Template = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  category: string;
  tags: string[];
  technologies: string[];
  specs: {
    stack: string;
    css: string;
    cms: string;
    type: string;
  };
  features: string[];
  previewUrl: string;
  cardImage: ImageObject;
  galleryImages: ImageObject[];
  bestSeller: boolean;
  isNew: boolean;
  version: string;
  published: boolean;
  createdAt: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp
  metaTitle?: string;
  metaDescription?: string;
};


export type TeamMember = {
  id: string;
  name: string;
  role: string;
  icon: string;
};

export type ContactDetails = {
  address: {
    line1: string;
    line2: string;
  };
  phone: string;
  email: string;
  whatsapp: string; // The URL for WhatsApp chat
};


export const getSiteSettings = (): SiteSettings => ({
  title: 'Dezine',
  description:
    'A digital design and development agency specializing in bespoke websites and applications.',
  founderName: 'Alex Doe',
  founderRole: 'Founder & Lead Designer',
});

export const getContactDetails = (): ContactDetails => ({
  address: {
    line1: 'Kuala Lumpur,',
    line2: 'Malaysia',
  },
  phone: '+60 11-1092 8735',
  email: 'contactampirestudios@gmail.com',
  whatsapp: 'https://wa.me/601110928735',
});

export const getServices = (): Service[] => [
  {
    id: 'web-design',
    title: 'Web Design',
    description: 'We create beautiful, user-centric designs that are both functional and visually stunning.',
    longDescription: 'Our web design process focuses on creating a seamless user experience. We conduct thorough research to understand your audience, resulting in intuitive interfaces that drive engagement and conversions. From wireframes to high-fidelity mockups, we ensure every pixel serves a purpose.',
    icon: 'Palette',
    category: 'Design',
    kpis: [
      { value: '+25%', label: 'User Engagement' },
      { value: 'Top 1%', label: 'Design Awards' },
    ],
  },
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'We build high-performance websites using modern technologies like Next.js and React.',
    longDescription: 'We build high-performance websites and applications using modern technologies. Our focus is on creating secure, scalable, and maintainable solutions that grow with your business, from marketing sites to complex e-commerce platforms with full CMS integration.',
    icon: 'Code',
    category: 'Development',
    kpis: [
      { value: 'Under 50ms', label: 'Page Loads' },
      { value: '99.9%', label: 'Uptime' },
    ],
  },
  {
    id: 'automation',
    title: 'Automation',
    description: 'We streamline your business processes with custom automation solutions.',
    longDescription: 'Our automation services help you eliminate repetitive tasks and improve efficiency. We build custom workflows, integrate APIs, and leverage tools like Zapier and Airtable to connect your systems and free up your team to focus on what matters most.',
    icon: 'Bot',
    category: 'Systems',
    kpis: [
      { value: '80%', label: 'Reduction in Manual Tasks' },
      { value: '10k+', label: 'Hours Saved for Clients' },
    ],
  },
  {
    id: 'mobile-app',
    title: 'Mobile App',
    description: 'We design and develop native and cross-platform mobile applications.',
    longDescription: 'From iOS to Android, we build mobile apps that provide a seamless user experience. Our team handles everything from initial concept and UI/UX design to development, testing, and deployment on the app stores.',
    icon: 'Smartphone',
    category: 'Development',
    kpis: [
      { value: '1M+', label: 'App Downloads' },
      { value: '4.8/5', label: 'Average App Store Rating' },
    ],
  },
  {
    id: 'seo-optimization',
    title: 'SEO Optimization',
    description: 'We improve your search engine rankings to drive organic traffic.',
    longDescription: 'Our SEO services are designed to increase your visibility and drive qualified leads. We specialize in technical SEO, keyword research, content strategy, and link building to ensure your message reaches the right audience at the right time.',
    icon: 'Search',
    category: 'Marketing',
    kpis: [
      { value: '+300%', label: 'Organic Traffic' },
      { value: 'Top 3', label: 'Keyword Rankings' },
    ],
  },
];

const projects: Project[] = [
    {
        id: 'kopi-dua-darjat',
        title: 'Kopi Dua Darjat',
        description: 'A multi-outlet website solution for a major Malaysian coffee brand, boosting local SEO for 50+ locations.',
        longDescription: 'For a coffee company with over 50 outlets, a single website isn\'t enough. People search for "coffee near me," not just the main brand. Our solution gives each of the 50+ outlets its own unique webpage, managed from one central place. This is a "parent-child" setup: the main website is the parent, and each outlet is a child. When someone searches locally, the specific outlet\'s page shows up, dramatically improving their search engine ranking (SEO) and drawing in more local customers.',
        price: 249,
        image: 'https://image2url.com/images/1765438599968-b0ba4cae-41c6-4613-870f-4d2173a604b5.png',
        imageAlt: 'A modern coffee shop website design for Kopi Dua Darjat',
        url: 'https://example.com/kopi-dua-darjat',
        tags: ['Web Development', 'Multi-location', 'SEO'],
        technologies: ['Next.js', 'Tailwind CSS', 'Firebase'],
        category: 'Corporate',
        specs: { stack: 'Next.js', css: 'Tailwind CSS', cms: 'Firebase (Custom)', type: 'Corporate' },
        images: [
            { src: 'https://image2url.com/images/1765438599968-b0ba4cae-41c6-4613-870f-4d2173a604b5.png', alt: 'Main franchise portal page for Kopi Dua Darjat' },
        ],
        features: ['Individual Outlet Pages', 'Centralized Management', 'Local SEO Optimization'],
        bestSeller: true,
        isNew: true,
    },
    {
        id: 'bfg-gym',
        title: 'BFG - Big Friendly Gym',
        description: 'A concept website for a gym, engineered to support a full-scale fitness web application.',
        longDescription: 'This isn\'t just a pretty brochure website for a gym. We designed it from the ground up to be the foundation for a complete fitness web app. Think of it as the lobby to a much bigger building. Users can sign up, view class schedules, and see gym info. But behind the scenes, it’s ready to plug in features like workout trackers, personal training dashboards, and member-only content without needing a complete rebuild. It’s built for growth.',
        price: 279,
        image: 'https://image2url.com/images/1765438663522-be2093a5-14f8-4c44-89c5-8ac1e5d097fc.png',
        imageAlt: 'A dynamic and energetic gym website for BFG',
        url: 'https://example.com/bfg-gym',
        tags: ['Web App', 'Fitness', 'Concept'],
        technologies: ['Next.js', 'Tailwind CSS', 'Firebase'],
        category: 'Web App',
        specs: { stack: 'Next.js', css: 'Tailwind CSS', cms: 'Firebase (Custom)', type: 'Web App' },
        images: [
            { src: 'https://image2url.com/images/1765438663522-be2093a5-14f8-4c44-89c5-8ac1e5d097fc.png', alt: 'BFG Gym class schedule and booking interface' },
        ],
        features: ['Scalable Architecture', 'User Authentication Ready', 'Class Schedule System'],
        isNew: true,
    },
    {
        id: 'ffm-music',
        title: 'Fahmie Farham Music',
        description: 'A personal website for a YouTuber, designed to increase view-per-visit and showcase their work professionally.',
        longDescription: 'A YouTube channel is great, but a personal website makes you look like a pro. For this musician YouTuber, we created a central hub for all their content. The site is designed to keep visitors engaged, encouraging them to watch more than one video (increasing "views per visit"). It beautifully organizes their music videos, tutorials, and behind-the-scenes content, strengthening their brand and creating a direct connection with their audience away from the noise of the YouTube platform.',
        price: 269,
        image: 'https://image2url.com/images/1765438779394-1db1263e-1ca6-47e9-a145-c9beafb4872d.png',
        imageAlt: 'A personal website for musician and YouTuber Fahmie Farham',
        url: 'https://example.com/ffm-music',
        tags: ['Personal', 'YouTuber', 'Portfolio'],
        technologies: ['Next.js', 'Tailwind CSS', 'Firebase'],
        category: 'Portfolio',
        specs: { stack: 'Next.js', css: 'Tailwind CSS', cms: 'Firebase (Custom)', type: 'Portfolio' },
        images: [
            { src: 'https://image2url.com/images/1765438779394-1db1263e-1ca6-47e9-a145-c9beafb4872d.png', alt: 'Video gallery for Fahmie Farham Music' },
        ],
        features: ['Video Showcase', 'Increased Visitor Engagement', 'Professional Branding'],
        bestSeller: true,
    },
    {
        id: 'ampire-studio-concept',
        title: 'Ampire Studio',
        description: 'Our own agency website concept, focused on showcasing our work and converting visitors into clients.',
        longDescription: 'We practice what we preach. This website is our own concept for a digital agency, built with two main goals: to be a stunning showcase of our capabilities and to be a machine for turning visitors into clients. Every element, from the project case studies to the contact form, is designed to be clear, persuasive, and easy to use. It’s our philosophy of design and business strategy made interactive.',
        price: 299,
        image: 'https://image2url.com/images/1765438809862-41a2b6dc-991c-4a4a-bef0-50d4aca9283d.png',
        imageAlt: 'A website for a digital design agency, Ampire Studio',
        url: 'https://example.com/ampire-studio',
        tags: ['Agency', 'Portfolio', 'Conversion'],
        technologies: ['Next.js', 'Tailwind CSS', 'Firebase'],
        category: 'Corporate',
        specs: { stack: 'Next.js', css: 'Tailwind CSS', cms: 'Firebase (Custom)', type: 'Corporate' },
        images: [
            { src: 'https://image2url.com/images/1765438809862-41a2b6dc-991c-4a4a-bef0-50d4aca9283d.png', alt: 'Ampire Studio portfolio showcase' },
        ],
        features: ['High-Conversion Design', 'Work Showcase', 'Service Explanations'],
    },
    {
        id: 'jewelwet-bear',
        title: 'Jewelwet Bear',
        description: 'A website concept for a jewelry brand, designed to convey luxury, elegance, and exclusivity.',
        longDescription: 'Selling high-end jewelry online requires a website that feels as luxurious as the products themselves. This concept is all about creating an atmosphere of elegance and exclusivity. We used a clean, sophisticated design, high-resolution imagery, and smooth animations to make browsing feel like a premium boutique experience. The focus is on telling the story behind each piece and making the customer feel special.',
        price: 289,
        image: 'https://image2url.com/images/1765438849828-1404abcc-9481-4695-9875-967793f8a32d.png',
        imageAlt: 'A luxurious jewelry brand website for Jewelwet Bear',
        url: 'https://example.com/jewelwet-bear',
        tags: ['Luxury', 'E-commerce', 'Branding'],
        technologies: ['Next.js', 'Tailwind CSS', 'Firebase'],
        category: 'E-commerce',
        specs: { stack: 'Next.js', css: 'Tailwind CSS', cms: 'Firebase (Custom)', type: 'E-commerce' },
        images: [
            { src: 'https://image2url.com/images/1765438849828-1404abcc-9481-4695-9875-967793f8a32d.png', alt: 'Jewelwet Bear product display' },
        ],
        features: ['Luxury Brand Experience', 'High-Resolution Imagery', 'Story-Driven Product Pages'],
    },
    {
        id: 'finanseer-saas',
        title: 'Finanseer',
        description: 'The marketing website for a financial SaaS web app that helps users manage their finances with AI.',
        longDescription: 'How do you sell a complex financial tool? You make the website simple, trustworthy, and focused on benefits. This site is the front door for a SaaS (Software as a Service) product that uses AI to manage finances. The design is clean and professional, explaining exactly how the app helps users save money and invest smarter. It builds confidence and guides the user to sign up for a trial, acting as the primary marketing tool for the application.',
        price: 229,
        image: 'https://image2url.com/images/1765439946212-e676a4d9-33c4-4e56-a8ff-49c182df253c.png',
        imageAlt: 'A website for a financial SaaS application called Finanseer',
        url: 'https://example.com/finanseer',
        tags: ['SaaS', 'Finance', 'AI'],
        technologies: ['Next.js', 'Tailwind CSS', 'Firebase'],
        category: 'SaaS',
        specs: { stack: 'Next.js', css: 'Tailwind CSS', cms: 'Firebase (Custom)', type: 'SaaS' },
        images: [
            { src: 'https://image2url.com/images/1765439946212-e676a4d9-33c4-4e56-a8ff-49c182df253c.png', alt: 'Finanseer features and benefits section' },
        ],
        features: ['SaaS Marketing Funnel', 'Clear Value Proposition', 'AI Feature Showcase'],
    },
    {
        id: 'cwt-salon',
        title: 'CWT Hair Salon',
        description: 'A stylish website for a hair salon to showcase their work, list services, and book appointments.',
        longDescription: 'For a hair salon, image is everything. This website serves as a visual portfolio, showcasing the salon\'s best work with a gallery of styles. It clearly lists all services and prices, and most importantly, includes an easy-to-use booking system. This allows clients to schedule appointments directly through the site, reducing phone calls for the salon and making booking effortless for the customer.',
        price: 279,
        image: 'https://image2url.com/images/1765439910143-6b9a8a95-bf8f-4ef3-8ac6-ce5012c76b4b.png',
        imageAlt: 'A stylish website for CWT Hair Salon',
        url: 'https://example.com/cwt-salon',
        tags: ['Local Business', 'Booking', 'Portfolio'],
        technologies: ['Next.js', 'Tailwind CSS', 'Firebase'],
        category: 'Local Business',
        specs: { stack: 'Next.js', css: 'Tailwind CSS', cms: 'Firebase (Custom)', type: 'Local Business' },
        images: [
            { src: 'https://image2url.com/images/1765439910143-6b9a8a95-bf8f-4ef3-8ac6-ce5012c76b4b.png', alt: 'CWT Hair Salon image gallery' },
        ],
        features: ['Appointment Booking System', 'Service & Price Listing', 'Visual Work Showcase'],
    }
];

export const getProjects = (): Project[] => {
    return projects;
};

export const getFounder = (): Founder => ({
  name: 'Alex Doe',
  role: 'Founder & Lead Digital Architect',
  bio: 'A passionate designer with over 10 years of experience in creating beautiful and functional digital products.',
  longBio:
    'Alex started his journey in design and development over a decade ago with a deep passion for art and technology. After working with several leading agencies and honing his skills on enterprise-level projects, he founded this agency to bring that same level of quality and strategic thinking to small and medium-sized enterprises. His philosophy is that great digital architecture is not just about aesthetics, but about solving core business problems and creating meaningful, high-performance experiences. When not coding or designing, Alex enjoys hiking and photography.',
  image: 'https://picsum.photos/seed/founder-img/800/800',
});

const capabilities: TeamMember[] = [
  { id: '1', name: 'Product Design', role: 'User-centred interfaces that convert.', icon: 'Palette' },
  { id: '2', name: 'Front-end Engineering', role: 'Fast, accessible, maintainable builds.', icon: 'Code' },
  { id: '3', name: 'Brand & Visuals', role: 'Identity systems with clarity and purpose.', icon: 'Gem' },
  { id: '4', name: 'Motion & Interaction', role: 'Micro-interactions that guide and engage.', icon: 'Sparkles' },
  { id: '5', name: 'Backend & Integrations', role: 'APIs, automation, and scalable systems.', icon: 'Server' },
  { id: '6', name: 'Performance & SEO', role: 'Speed, structure, and discoverability.', icon: 'Gauge' },
  { id: '7', name: 'Mobile & Responsive', role: 'Adaptive layouts that feel native everywhere.', icon: 'Smartphone' },
  { id: '8', name: 'Launch & Support', role: 'Deploy, monitor, and iterate with stability.', icon: 'Rocket' },
];

export const getTeam = (): TeamMember[] => capabilities;


export const getTestimonials = (): Testimonial[] => [
  {
    quote: 'The multi-outlet system they built for us was a game-changer. Our local SEO has skyrocketed, and foot traffic is up across all 50 locations. A truly brilliant solution.',
    name: 'Ahmad Faisal',
    role: 'CEO',
    company: 'Kopi Dua Darjat',
    image: 'https://picsum.photos/seed/testimonial1/100/100',
    projectId: 'kopi-dua-darjat',
  },
  {
    quote: 'They didn\'t just build a website; they built the foundation for our entire digital fitness platform. The scalability is exactly what we needed.',
    name: 'Sarah Chen',
    role: 'Founder',
    company: 'BFG Gym',
    image: 'https://picsum.photos/seed/testimonial2/100/100',
    projectId: 'bfg-gym',
  },
  {
    quote: 'Our online catalog is stunning and easy to manage. It has drawn in so many new local customers, and we\'re ready to launch online sales next quarter thanks to their forward-thinking build.',
    name: 'Mr. Seng',
    role: 'Owner',
    company: 'KBS Bikes',
    image: 'https://picsum.photos/seed/testimonial3/100/100',
    projectId: 'kbs-bikes',
  },
  {
    quote: 'My personal website has become the central hub for my community. The design increased my views-per-visit and made my brand look incredibly professional.',
    name: 'Fahmie Farham',
    role: 'Musician & YouTuber',
    company: 'Fahmie Farham Music',
    image: 'https://picsum.photos/seed/testimonial4/100/100',
    projectId: 'ffm-music',
  },
  {
    quote: 'Their portfolio showcases their skills perfectly. It\'s clean, converts well, and is exactly what we wanted for our own agency site.',
    name: 'Emily Carter',
    role: 'Partner',
    company: 'Ampire Studio',
    image: 'https://picsum.photos/seed/testimonial5/100/100',
    projectId: 'ampire-studio-concept',
  },
  {
    quote: 'The website exudes luxury and elegance. It has elevated our brand perception and provided a beautiful platform to showcase our finest jewelry pieces.',
    name: 'Isabelle Dubois',
    role: 'Creative Director',
    company: 'Jewelwet Bear',
    image: 'https://picsum.photos/seed/testimonial6/100/100',
    projectId: 'jewelwet-bear',
  },
  {
    quote: 'The marketing site for Finanseer is simple, trustworthy, and incredibly effective at explaining our complex AI product. Our trial sign-ups have increased by 40%.',
    name: 'David Lee',
    role: 'CEO',
    company: 'Finanseer',
    image: 'https://picsum.photos/seed/testimonial7/100/100',
    projectId: 'finanseer-saas',
  },
  {
    quote: 'Our clients love the new website. The booking system is seamless, and our stylists\' work is beautifully showcased. It has streamlined our entire appointment process.',
    name: 'Chloe Tan',
    role: 'Owner',
    company: 'CWT Hair Salon',
    image: 'https://picsum.photos/seed/testimonial8/100/100',
    projectId: 'cwt-salon',
  },
  {
    quote: 'The new website projects the exact authority and professionalism our law firm needed. It has helped us build trust with potential clients before they even walk through our door.',
    name: 'A. Prema',
    role: 'Senior Partner',
    company: 'A. Prema & Co.',
    image: 'https://picsum.photos/seed/testimonial9/100/100',
    projectId: 'aprema-co-law',
  },
];

export const getTemplates = (): (Project & { id: string })[] => {
    const excludedIds = ['kopi-dua-darjat', 'ffm-music'];

    const templateDetails: Record<string, { title: string; price: number; description: string; longDescription: string, features: string[], tags: string[] }> = {
        'bfg-gym': {
            title: 'Dynamic Website for Gyms & Fitness Brands',
            price: 249,
            description: "Built for gyms, fitness studios, and personal trainers who need a strong, energetic online presence.",
            longDescription: "A high-energy, fully-responsive Next.js template for gyms and fitness studios. Features a dynamic class schedule, trainer profiles, and membership tiers. Built with performance in mind to motivate and convert visitors.",
            features: [
                'High-impact landing sections for memberships & classes',
                'Clean layout focused on conversions (sign-ups & inquiries)',
                'Easily editable content using a custom CMS',
                'Mobile-first, fast-loading design'
            ],
            tags: ['Gyms', 'CrossFit boxes', 'Fitness Coaches']
        },
        'ampire-studio-concept': {
            title: 'Corporate Website for Digital Agencies & Startups',
            price: 269,
            description: "A professional, modern website template designed for agencies that want to look credible and premium.",
            longDescription: "The official Next.js template for our own agency website. Perfect for creative agencies, studios, and freelancers. Includes a stunning portfolio, detailed service pages, and a conversion-focused design to help you win clients.",
            features: [
                'Strong homepage structure for services & portfolio',
                'Clean typography and spacing for a premium feel',
                'CMS-powered sections for easy updates',
                'Built to scale as the business grows'
            ],
            tags: ['Design Studios', 'Marketing Agencies', 'Consultants']
        },
        'jewelwet-bear': {
            title: 'Luxury E-commerce Website for Jewelry Brands',
            price: 299,
            description: "Designed specifically for high-end jewelry and lifestyle brands that rely on visual appeal and trust.",
            longDescription: "An elegant and luxurious e-commerce template for jewelry and high-end fashion brands. Features a clean design, beautiful product galleries, and a focus on visual storytelling to create a premium online shopping experience.",
            features: [
                'Product-focused layouts with clean visuals',
                'E-commerce–ready structure',
                'CMS to manage products, content, and images',
                'Optimized for performance and mobile shopping'
            ],
            tags: ['Jewelry Brands', 'Luxury Product Stores']
        },
        'finanseer-saas': {
            title: 'SaaS Website for Financial & Tech Products',
            price: 279,
            description: "A structured, conversion-focused template for SaaS products that need clarity and trust.",
            longDescription: "A professional and trustworthy marketing website for SaaS and FinTech startups. Designed to clearly communicate your product's value, build credibility, and drive user sign-ups for your application.",
            features: [
                'Clear feature breakdown sections',
                'Pricing & onboarding-ready layout',
                'CMS for content and updates',
                'Built with scalability in mind'
            ],
            tags: ['SaaS Startups', 'Fintech Products', 'Tools']
        },
        'cwt-salon': {
            title: 'Website for Local Businesses & Salons',
            price: 249,
            description: "A stylish, clean website template designed to help local businesses get more bookings and inquiries.",
            longDescription: "A stylish and practical template for salons, spas, and local service businesses. Comes with a visual service menu, stylist galleries, and is ready to integrate with your favorite booking system to streamline appointments.",
            features: [
                'Service listing and gallery sections',
                'Contact & booking-friendly layout',
                'CMS for updating services and prices',
                'Mobile-optimized for local customers'
            ],
            tags: ['Salons', 'Spas', 'Clinics', 'Local Services']
        }
    };

    return projects
        .filter(p => !excludedIds.includes(p.id) && templateDetails[p.id])
        .map((p) => {
            const details = templateDetails[p.id];
            return {
                ...p,
                id: `template-${p.id}`,
                title: p.title, // Keep original project title
                description: details.description,
                longDescription: details.longDescription,
                price: details.price,
                features: details.features,
                tags: details.tags,
            };
    });
};

    

    

    