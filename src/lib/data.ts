

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

export type FaqItem = {
  id: string;
  category: string;
  question: string;
  preview: string;
  answer: string;
  featured?: boolean;
  link?: {
    href: string;
    text: string;
  };
};

export type Article = {
  id: string;
  title: string;
  date: string;
  author: string;
  authorImage: string;
  excerpt: string;
  content: string;
  image: string;
  imageAlt: string;
  tags: string[];
  category: string;
  readingTime: number;
  featured?: boolean;
  popular?: boolean;
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
  featured?: boolean;
};

export type Template = Project;


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
        featured: true,
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
        featured: true,
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
        featured: true,
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


const faqItems: FaqItem[] = [
    {
      id: 'gen-1',
      category: 'General',
      question: 'What services does Ampire Studio offer?',
      preview: 'We specialize in website design, development, and automation.',
      answer: 'Ampire Studio offers a suite of digital services, including bespoke website design and development, UI/UX design, business process automation, and CMS/CRM integrations. We create high-performance digital experiences tailored to your business goals.',
      featured: true,
    },
    {
      id: 'gen-2',
      category: 'General',
      question: 'How do I start a project with Ampire Studio?',
      preview: 'Starting is easy: just send us a message.',
      answer: 'To start a project, simply head to our contact page and send us a message. We\'ll schedule a brief discovery call to understand your needs, after which we\'ll prepare a detailed proposal and project plan.',
      link: { href: '/contact', text: 'Start a Project' },
    },
    {
      id: 'gen-3',
      category: 'General',
      question: 'Do you work internationally?',
      preview: 'Yes, our team is fully remote and serves clients globally.',
      answer: 'Yes, we are a fully remote agency and collaborate with clients from all over the world. We use modern communication tools to ensure seamless collaboration regardless of your location.',
    },
    {
      id: 'gen-4',
      category: 'General',
      question: 'What platforms do you develop on?',
      preview: 'We primarily use Next.js, Webflow, and Framer.',
      answer: 'We specialize in modern web technologies. Our primary stack includes Next.js for complex applications, and Webflow or Framer for content-heavy sites that require a powerful visual editor. We choose the best tool for the job based on your project\'s specific needs.',
    },
    {
        id: 'price-1',
        category: 'Pricing & Payments',
        question: 'Do you display pricing publicly?',
        preview: 'We provide custom quotes after an initial consultation.',
        answer: 'We do not display fixed prices because every project is unique. After an initial discovery call where we assess your needs, we provide a detailed, fixed-price proposal. This ensures you only pay for what you need.',
        featured: true,
        link: { href: '/services', text: 'View Pricing Tiers' },
    },
    {
        id: 'price-2',
        category: 'Pricing & Payments',
        question: 'Is the initial payment refundable?',
        preview: 'The initial deposit secures your project slot and is non-refundable.',
        answer: 'The initial 50% payment is a non-refundable deposit that secures your project in our schedule and allows us to begin the discovery and design process. The final 50% is due upon project completion, before launch.',
    },
    {
        id: 'price-3',
        category: 'Pricing & Payments',
        question: 'What payment methods do you accept?',
        preview: 'We accept bank transfers and all major credit cards.',
        answer: 'We accept payments via direct bank transfer and all major credit cards (including Visa, MasterCard, and American Express) through our secure payment processor.',
    },
    {
        id: 'rev-1',
        category: 'Revisions & Support',
        question: 'How many revisions are included?',
        preview: 'We offer one revision round for the prototype and one for the build.',
        answer: 'Our standard process includes one round of revisions on the prototype and one round on the final build. We also include up to 5 minor post-launch revisions for free to catch any small issues.',
    },
    {
        id: 'rev-2',
        category: 'Revisions & Support',
        question: 'Do you provide support after launch?',
        preview: 'Yes, we offer ongoing support and maintenance retainers.',
        answer: 'Absolutely. We offer flexible monthly support and maintenance retainers to ensure your website remains up-to-date, secure, and performant. This service is optional but recommended for peace of mind.',
    },
    {
        id: 'rev-3',
        category: 'Revisions & Support',
        question: 'Can I request additional revisions later?',
        preview: 'Yes, additional revisions are available at our standard hourly rate.',
        answer: 'Yes, additional revision rounds or new feature requests can be accommodated. This work is billed at our standard hourly rate. We always provide a time and cost estimate before beginning any extra work.',
    },
    {
        id: 'tmpl-1',
        category: 'Templates',
        question: 'Are your templates customizable?',
        preview: 'Yes, our templates are designed to be easily customized.',
        answer: 'Yes, all our templates for platforms like Webflow and Framer are built with customization in mind. They include a global style guide and clear instructions, allowing you to easily change colors, fonts, and layouts.',
        link: { href: '/store', text: 'Browse Templates' },
    },
    {
        id: 'tmpl-2',
        category: 'Templates',
        question: 'Can a template be upgraded to a full custom project?',
        preview: 'Yes, a template is a great starting point for a custom build.',
        answer: 'Definitely. Many clients start with a template to get online quickly, then engage us for a custom project to add unique features or integrations. We can discuss a custom scope based on your template foundation.',
    },
    {
        id: 'dev-1',
        category: 'Development & Integrations',
        question: 'Do you integrate CRMs and payment gateways?',
        preview: 'Yes, we can integrate a wide range of third-party services.',
        answer: 'Yes, we have extensive experience integrating with various third-party services, including CRMs like HubSpot and Salesforce, and payment gateways like Stripe and PayPal. Let us know your requirements, and we can confirm compatibility.',
    },
    {
        id: 'dev-2',
        category: 'Development & Integrations',
        question: 'Can you build custom features or logic?',
        preview: 'Yes, we specialize in building bespoke functionalities.',
        answer: 'Building custom features is our specialty. Whether it\'s a unique user dashboard, a complex calculator, or a specific API integration, our team can design and develop the functionality your business needs to stand out.',
        featured: true,
    },
    {
        id: 'onboard-1',
        category: 'Onboarding & Process',
        question: 'What is the typical project timeline?',
        preview: 'Timelines range from 4 weeks for a small site to 12+ weeks for a large platform.',
        answer: 'Project timelines depend on the scope. A standard marketing website typically takes 4-8 weeks from start to launch. A more complex web application or platform could take 12 weeks or more. We provide a detailed timeline in our project proposal.',
        link: { href: '/services', text: 'See Our Process' }
    },
    {
        id: 'onboard-2',
        category: 'Onboarding & Process',
        question: 'What do you need from me to start a project?',
        preview: 'We typically need your brand guidelines, content, and goals.',
        answer: 'To start, we typically need any existing brand guidelines, website content (text and images), and a clear outline of your project goals and target audience. We\'ll guide you through the content collection process during our discovery phase.',
    },
    {
        id: 'legal-1',
        category: 'Legal & Privacy',
        question: 'Do you sign Non-Disclosure Agreements (NDAs)?',
        preview: 'Yes, we are happy to sign an NDA to protect your project idea.',
        answer: 'Yes, we take client confidentiality very seriously and are always willing to sign a Non-Disclosure Agreement (NDA) before discussing sensitive project details.',
    },
    {
        id: 'legal-2',
        category: 'Legal & Privacy',
        question: 'How do you handle client data and privacy?',
        preview: 'We follow strict data privacy and security protocols.',
        answer: 'We adhere to strict data privacy and security protocols. All client data is stored securely, and we build all our products with privacy-by-design principles. We are fully compliant with GDPR and other major privacy regulations.',
    }
];


export const getFaqs = (): FaqItem[] => {
    // Adding two more for a total of 20
    const additionalFaqs: FaqItem[] = [
      {
        id: 'gen-5',
        category: 'General',
        question: 'Who owns the final website and code?',
        preview: 'You do. Upon final payment, all rights are transferred to you.',
        answer: 'Upon receipt of the final payment, you, the client, own 100% of the website, including all code, design files, and assets. We can transfer all project files and repository access to you as needed.',
      },
      {
        id: 'price-4',
        category: 'Pricing & Payments',
        question: 'Are there any hidden fees or ongoing costs?',
        preview: 'No. All costs are outlined upfront in our fixed-price proposal.',
        answer: 'No, we believe in full transparency. Our project proposals are fixed-price and outline all costs. The only ongoing costs would be for third-party services like hosting, domains, or an optional post-launch support retainer, all of which are clearly communicated.',
      },
    ];

    return [...faqItems, ...additionalFaqs];
}

export const getFeaturedFaqs = (): FaqItem[] => {
    return getFaqs().filter(faq => faq.featured);
}

export const getArticles = (): Article[] => {
  const articleCategories = ['Web Design', 'Development', 'Automation', 'Templates', 'Branding', 'Business Strategy', 'Case Studies'];
  
  return Array.from({ length: 21 }, (_, i) => ({
    id: `article-${i + 1}`,
    title: [
        'The 5 Pillars of a Successful Website Redesign',
        'From Zero to Hero: A Guide to Business Automation',
        'Why Your Brand Needs a Style Guide, Yesterday',
        'Unlocking Growth: A Case Study in E-commerce SEO',
        '10 Essential Tips for Aspiring Digital Creators',
        'The Developer\'s Guide to Client Communication',
        'Mastering Dark Mode: A Guide to Premium UI',
    ][i % 7],
    date: new Date(2024, i % 12, (i % 28) + 1).toISOString().split('T')[0],
    author: ['Alex Doe', 'Jane Smith', 'Sam Wilson'][i % 3],
    authorImage: `https://picsum.photos/seed/author-img${i % 3}/40/40`,
    excerpt: `A brief look into article number ${i + 1}. This piece explores key concepts and provides actionable advice.`,
    content: `This is the full content for the article. It delves deep into the topics, supported by research and real-world examples to provide comprehensive insights.`,
    image: `https://picsum.photos/seed/ablog-cover-${i + 1}/1200/800`,
    imageAlt: `Abstract image for article ${i + 1}`,
    tags: [['Web Dev', 'Future Tech', 'AI'], ['JavaScript', 'React', 'Vue'], ['Performance', 'UX', 'Design']][i % 3],
    category: articleCategories[i % articleCategories.length],
    readingTime: Math.floor(Math.random() * 10) + 3, // 3 to 12 minutes
    featured: i === 0, // Make the first article featured
    popular: i < 5,
  }));
};

export const getTemplates = (): Template[] => {
    const excludedIds = ['kopi-dua-darjat', 'ffm-music'];

    const templateDetails: Record<string, { price: number; description: string }> = {
        'bfg-gym': {
            price: 149,
            description: "A high-energy, fully-responsive Next.js template for gyms and fitness studios. Features a dynamic class schedule, trainer profiles, and membership tiers. Built with performance in mind to motivate and convert visitors."
        },
        'ampire-studio-concept': {
            price: 129,
            description: "The official Next.js template for our own agency website. Perfect for creative agencies, studios, and freelancers. Includes a stunning portfolio, detailed service pages, and a conversion-focused design to help you win clients."
        },
        'jewelwet-bear': {
            price: 179,
            description: "An elegant and luxurious e-commerce template for jewelry and high-end fashion brands. Features a clean design, beautiful product galleries, and a focus on visual storytelling to create a premium online shopping experience."
        },
        'finanseer-saas': {
            price: 159,
            description: "A professional and trustworthy marketing website template for SaaS and FinTech startups. Designed to clearly communicate your product's value, build credibility, and drive user sign-ups for your application."
        },
        'cwt-salon': {
            price: 139,
            description: "A stylish and practical template for salons, spas, and local service businesses. Comes with a visual service menu, stylist galleries, and is ready to integrate with your favorite booking system to streamline appointments."
        }
    };

    // We map the projects to templates, but adjust the price and a few other details
    return projects
        .filter(p => !excludedIds.includes(p.id) && templateDetails[p.id])
        .map((p) => {
            const details = templateDetails[p.id];
            return {
                ...p, // Spread all properties from the project
                id: `template-${p.id}`, // Create a unique template ID
                price: details.price,
                description: details.description,
            };
    });
};
