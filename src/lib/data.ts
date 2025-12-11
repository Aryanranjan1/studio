
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


export const getSiteSettings = (): SiteSettings => ({
  title: 'Dezine',
  description:
    'A digital design and development agency specializing in bespoke websites and applications.',
  founderName: 'Alex Doe',
  founderRole: 'Founder & Lead Designer',
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
        price: 149,
        image: 'https://picsum.photos/seed/kopi/1200/800',
        imageAlt: 'A modern coffee shop website design',
        url: 'https://example.com/kopi-dua-darjat',
        tags: ['Web Development', 'Multi-location', 'SEO'],
        technologies: ['Next.js', 'Sanity CMS', 'Vercel'],
        featured: true,
        category: 'Corporate',
        specs: { stack: 'Next.js', css: 'Tailwind CSS', cms: 'Sanity', type: 'Corporate' },
        images: [
            { src: 'https://picsum.photos/seed/kopi1/1200/800', alt: 'Main franchise portal page' },
            { src: 'https://picsum.photos/seed/kopi2/1200/800', alt: 'Individual outlet page with local map' },
            { src: 'https://picsum.photos/seed/kopi3/1200/800', alt: 'CMS backend for managing outlets' },
        ],
        features: ['Individual Outlet Pages', 'Centralized Management', 'Local SEO Optimization'],
    },
    {
        id: 'bfg-gym',
        title: 'BFG - Big Friendly Gym',
        description: 'A concept website for a gym, engineered to support a full-scale fitness web application.',
        longDescription: 'This isn\'t just a pretty brochure website for a gym. We designed it from the ground up to be the foundation for a complete fitness web app. Think of it as the lobby to a much bigger building. Users can sign up, view class schedules, and see gym info. But behind the scenes, it’s ready to plug in features like workout trackers, personal training dashboards, and member-only content without needing a complete rebuild. It’s built for growth.',
        price: 79,
        image: 'https://picsum.photos/seed/gym/1200/800',
        imageAlt: 'A dynamic and energetic gym website',
        url: 'https://example.com/bfg-gym',
        tags: ['Web App', 'Fitness', 'Concept'],
        technologies: ['React', 'Firebase', 'Node.js'],
        category: 'Web App',
        specs: { stack: 'React', css: 'Tailwind CSS', cms: 'Firebase', type: 'Web App' },
        images: [
            { src: 'https://picsum.photos/seed/gym1/1200/800', alt: 'Class schedule and booking interface' },
            { src: 'https://picsum.photos/seed/gym2/1200/800', alt: 'User profile and progress tracking dashboard' },
            { src: 'https://picsum.photos/seed/gym3/1200/800', alt: 'Admin panel for managing classes and members' },
        ],
        features: ['Scalable Architecture', 'User Authentication Ready', 'Class Schedule System'],
    },
    {
        id: 'kbs-bikes',
        title: 'KBS - Kedai Basikal Seng',
        description: 'A digital catalog for a KL bicycle store, designed to attract local customers and enable future online sales.',
        longDescription: 'For a local bike shop in Kuala Lumpur, the goal is to get people into the store. This website acts as a digital window display, showcasing their latest bikes and gear in a beautiful online catalog. It helps people discover products before they even visit. More importantly, we built it so that with a few adjustments, the owner can easily switch on e-commerce features and start selling online, turning their local shop into a nationwide business.',
        price: 99,
        image: 'https://picsum.photos/seed/bike/1200/800',
        imageAlt: 'A sleek and modern bicycle store website',
        url: 'https://example.com/kbs-bikes',
        tags: ['E-commerce', 'Local Business', 'Catalog'],
        technologies: ['Shopify', 'Liquid', 'Headless'],
        category: 'E-commerce',
        specs: { stack: 'Shopify', css: 'CSS3', cms: 'Shopify', type: 'E-commerce' },
        images: [
            { src: 'https://picsum.photos/seed/bike1/1200/800', alt: 'Product catalog page with filtering' },
            { src: 'https://picsum.photos/seed/bike2/1200/800', alt: 'Detailed product page for a bicycle' },
            { src: 'https://picsum.photos/seed/bike3/1200/800', alt: 'Mobile view of the store' },
        ],
        features: ['Product Catalog System', 'E-commerce Ready', 'Local Store Locator'],
    },
    {
        id: 'ffm-music',
        title: 'Fahmie Farham Music',
        description: 'A personal website for a YouTuber, designed to increase view-per-visit and showcase their work professionally.',
        longDescription: 'A YouTube channel is great, but a personal website makes you look like a pro. For this musician YouTuber, we created a central hub for all their content. The site is designed to keep visitors engaged, encouraging them to watch more than one video (increasing "views per visit"). It beautifully organizes their music videos, tutorials, and behind-the-scenes content, strengthening their brand and creating a direct connection with their audience away from the noise of the YouTube platform.',
        price: 69,
        image: 'https://picsum.photos/seed/music/1200/800',
        imageAlt: 'A personal website for a musician and YouTuber',
        url: 'https://example.com/ffm-music',
        tags: ['Personal', 'YouTuber', 'Portfolio'],
        technologies: ['Framer', 'Webflow', 'React'],
        featured: true,
        category: 'Portfolio',
        specs: { stack: 'Framer', css: 'CSS3', cms: 'Framer', type: 'Portfolio' },
        images: [
            { src: 'https://picsum.photos/seed/music1/1200/800', alt: 'Video gallery page' },
            { src: 'https://picsum.photos/seed/music2/1200/800', alt: 'About the artist page' },
            { src: 'https://picsum.photos/seed/music3/1200/800', alt: 'Embedded YouTube player and playlist' },
        ],
        features: ['Video Showcase', 'Increased Visitor Engagement', 'Professional Branding'],
    },
    {
        id: 'ampire-studio-concept',
        title: 'Ampire Studio',
        description: 'Our own agency website concept, focused on showcasing our work and converting visitors into clients.',
        longDescription: 'We practice what we preach. This website is our own concept for a digital agency, built with two main goals: to be a stunning showcase of our capabilities and to be a machine for turning visitors into clients. Every element, from the project case studies to the contact form, is designed to be clear, persuasive, and easy to use. It’s our philosophy of design and business strategy made interactive.',
        price: 199,
        image: 'https://picsum.photos/seed/ampire/1200/800',
        imageAlt: 'A website for a digital design agency',
        url: 'https://example.com/ampire-studio',
        tags: ['Agency', 'Portfolio', 'Conversion'],
        technologies: ['Next.js', 'Framer Motion', 'Sanity'],
        category: 'Corporate',
        specs: { stack: 'Next.js', css: 'Tailwind CSS', cms: 'Sanity', type: 'Corporate' },
        images: [
            { src: 'https://picsum.photos/seed/ampire1/1200/800', alt: 'Showcase of portfolio projects' },
            { src: 'https://picsum.photos/seed/ampire2/1200/800', alt: 'Services and pricing page' },
            { src: 'https://picsum.photos/seed/ampire3/1200/800', alt: 'Contact form and lead capture' },
        ],
        features: ['High-Conversion Design', 'Work Showcase', 'Service Explanations'],
    },
    {
        id: 'jewelwet-bear',
        title: 'Jewelwet Bear',
        description: 'A website concept for a jewelry brand, designed to convey luxury, elegance, and exclusivity.',
        longDescription: 'Selling high-end jewelry online requires a website that feels as luxurious as the products themselves. This concept is all about creating an atmosphere of elegance and exclusivity. We used a clean, sophisticated design, high-resolution imagery, and smooth animations to make browsing feel like a premium boutique experience. The focus is on telling the story behind each piece and making the customer feel special.',
        price: 89,
        image: 'https://picsum.photos/seed/jewel/1200/800',
        imageAlt: 'A luxurious jewelry brand website',
        url: 'https://example.com/jewelwet-bear',
        tags: ['Luxury', 'E-commerce', 'Branding'],
        technologies: ['Shopify', 'GSAP', 'Headless'],
        category: 'E-commerce',
        specs: { stack: 'Shopify', css: 'Styled Components', cms: 'Contentful', type: 'E-commerce' },
        images: [
            { src: 'https://picsum.photos/seed/jewel1/1200/800', alt: 'Product display with elegant typography' },
            { src: 'https://picsum.photos/seed/jewel2/1200/800', alt: 'Storytelling page about a collection' },
            { src: 'https://picsum.photos/seed/jewel3/1200/800', alt: 'Close-up detail shot of a jewelry piece' },
        ],
        features: ['Luxury Brand Experience', 'High-Resolution Imagery', 'Story-Driven Product Pages'],
    },
    {
        id: 'finanseer-saas',
        title: 'Finanseer',
        description: 'The marketing website for a financial SaaS web app that helps users manage their finances with AI.',
        longDescription: 'How do you sell a complex financial tool? You make the website simple, trustworthy, and focused on benefits. This site is the front door for a SaaS (Software as a Service) product that uses AI to manage finances. The design is clean and professional, explaining exactly how the app helps users save money and invest smarter. It builds confidence and guides the user to sign up for a trial, acting as the primary marketing tool for the application.',
        price: 129,
        image: 'https://picsum.photos/seed/finance/1200/800',
        imageAlt: 'A website for a financial SaaS application',
        url: 'https://example.com/finanseer',
        tags: ['SaaS', 'Finance', 'AI'],
        technologies: ['Next.js', 'Stripe', 'Firebase'],
        featured: true,
        category: 'SaaS',
        specs: { stack: 'Next.js', css: 'Tailwind CSS', cms: 'None', type: 'SaaS' },
        images: [
            { src: 'https://picsum.photos/seed/finance1/1200/800', alt: 'Features and benefits section' },
            { src: 'https://picsum.photos/seed/finance2/1200/800', alt: 'Pricing and subscription tiers' },
            { src: 'https://picsum.photos/seed/finance3/1200/800', alt: 'Sign-up flow for the web app' },
        ],
        features: ['SaaS Marketing Funnel', 'Clear Value Proposition', 'AI Feature Showcase'],
    },
    {
        id: 'cwt-salon',
        title: 'CWT Hair Salon',
        description: 'A stylish website for a hair salon to showcase their work, list services, and book appointments.',
        longDescription: 'For a hair salon, image is everything. This website serves as a visual portfolio, showcasing the salon\'s best work with a gallery of styles. It clearly lists all services and prices, and most importantly, includes an easy-to-use booking system. This allows clients to schedule appointments directly through the site, reducing phone calls for the salon and making booking effortless for the customer.',
        price: 79,
        image: 'https://picsum.photos/seed/salon/1200/800',
        imageAlt: 'A stylish website for a hair salon',
        url: 'https://example.com/cwt-salon',
        tags: ['Local Business', 'Booking', 'Portfolio'],
        technologies: ['Webflow', 'Calendly', 'Acuity'],
        category: 'Local Business',
        specs: { stack: 'Webflow', css: 'CSS3', cms: 'Webflow', type: 'Local Business' },
        images: [
            { src: 'https://picsum.photos/seed/salon1/1200/800', alt: 'Image gallery of hairstyles' },
            { src: 'https://picsum.photos/seed/salon2/1200/800', alt: 'Services and pricing list' },
            { src: 'https://picsum.photos/seed/salon3/1200/800', alt: 'Appointment booking calendar' },
        ],
        features: ['Appointment Booking System', 'Service & Price Listing', 'Visual Work Showcase'],
    },
    {
        id: 'aprema-co-law',
        title: 'A. Prema & Co.',
        description: 'A professional and authoritative website for a law firm, designed to build trust and showcase legal services.',
        longDescription: 'A law firm\'s website needs to project authority and trust. This design is clean, professional, and serious, without being intimidating. It clearly outlines the firm\'s areas of legal practice, introduces the lawyers with professional profiles, and provides helpful articles to demonstrate expertise. The goal is to make a potential client feel they have found a knowledgeable and reliable partner, encouraging them to make contact for a consultation.',
        price: 119,
        image: 'https://picsum.photos/seed/law/1200/800',
        imageAlt: 'A professional website for a law firm',
        url: 'https://example.com/aprema-co',
        tags: ['Corporate', 'Law Firm', 'Professional Services'],
        technologies: ['Next.js', 'Contentful', 'React'],
        category: 'Corporate',
        specs: { stack: 'Next.js', css: 'Tailwind CSS', cms: 'Contentful', type: 'Corporate' },
        images: [
            { src: 'https://picsum.photos/seed/law1/1200/800', alt: 'Practice areas overview page' },
            { src: 'https://picsum.photos/seed/law2/1200/800', alt: 'Attorney profile pages' },
            { src: 'https://picsum.photos/seed/law3/1200/800', alt: 'Contact page for consultations' },
        ],
        features: ['Professional & Trustworthy Design', 'Clear Service Outlines', 'Expertise Showcase'],
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
    quote:
      'Working with them was a game-changer for our business. Their attention to detail and creative vision is unparalleled.',
    name: 'Jane Smith',
    role: 'CEO',
    company: 'SaaS Corp.',
    image: 'https://picsum.photos/seed/testimonial1/100/100',
  },
  {
    quote:
      'The team is incredibly talented and professional. They delivered a product that exceeded all our expectations and our revenue proves it.',
    name: 'John Johnson',
    role: 'Marketing Director',
    company: 'Fintech Co.',
    image: 'https://picsum.photos/seed/testimonial2/100/100',
  },
  // Add more testimonials
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
        link: { href: '/pricing', text: 'View Pricing Tiers' },
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
        link: { href: '/process', text: 'See Our Process' }
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


const articleCategories = ['Web Design', 'Development', 'Automation', 'Templates', 'Branding', 'Business Strategy', 'Case Studies'];

export const getArticles = (): Article[] => Array.from({ length: 21 }, (_, i) => ({
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

export const getTemplates = (): Template[] => {
    // We map the projects to templates, but adjust the price and a few other details
    return projects.map((p, i) => ({
        ...p, // Spread all properties from the project
        id: `template-${p.id}`, // Create a unique template ID
        price: [79, 129, 89, 69, 149, 99, 119, 59, 139][i % 9], // Assign different prices
        description: `A professionally designed template based on the ${p.title} project.`,
        isNew: i < 2, // Mark the first two as "New"
        bestSeller: i === 0 || i === 3, // Mark a couple as best-sellers
    }));
};

export const allCategories = articleCategories;
