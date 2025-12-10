
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

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  imageAlt: string;
  images?: {
    src: string;
    alt: string;
  }[];
  client: string;
  role: string;
  duration: string;
  url: string;
  technologies: string[];
  kpis: {
    value: string;
    label: string;
  }[];
  testimonial?: {
    quote: string;
    name: string;
    role: string;
    company: string;
  };
  featured?: boolean;
  tags: string[];
  popular?: boolean;
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

export type Template = {
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
    [key: string]: string; // Allow other string keys
  };
  bestSeller?: boolean;
  isNew?: boolean;
  version?: string;
  fileTree?: { name: string; indent: boolean }[];
};

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

export const getProjects = (): Project[] => Array.from({ length: 20 }, (_, i) => ({
    id: `project-${i + 1}`,
    title: `Project Title ${i + 1}`,
    category: ['Web Development', 'Branding', 'Automation', 'Mobile App'][i % 4],
    description: `A brief description of project ${i + 1}, highlighting its main goal and achievement.`,
    longDescription: `This is a more detailed description of Project ${i + 1}. It involved a complex set of requirements and our team delivered a robust solution that exceeded client expectations. We focused on user experience and performance to ensure the final product was not only beautiful but also highly effective.`,
    image: `https://picsum.photos/seed/p-cover-${i + 1}/1200/800`,
    imageAlt: `Cover image for Project ${i + 1}`,
    images: [
      {
        src: `https://picsum.photos/seed/p-img1-${i + 1}/1200/800`,
        alt: `Gallery image 1 for Project ${i + 1}`,
      },
      {
        src: `https://picsum.photos/seed/p-img2-${i + 1}/1200/800`,
        alt: `Gallery image 2 for Project ${i + 1}`,
      },
      {
        src: `https://picsum.photos/seed/p-img3-${i + 1}/1200/800`,
        alt: `Gallery image 3 for Project ${i + 1}`,
      },
      {
        src: `https://picsum.photos/seed/p-img4-${i + 1}/1200/800`,
        alt: `Gallery image 4 for Project ${i + 1}`,
      },
    ],
    client: `Client ${String.fromCharCode(65 + (i % 26))}`,
    role: ['Lead Developer', 'UI/UX Designer', 'Project Manager', 'QA Engineer'][i % 4],
    duration: `${i % 6 + 2} Months`,
    url: '#',
    technologies: [['LABORATORY', 'Next.js', 'Firebase'], ['ENGINEERING', 'Figma', 'Webflow'], ['LAB PRODUCTION', 'Zapier', 'Airtable'], ['PROJECTS 3D', 'React Native', 'Firebase']][i % 4],
    kpis: [
      { value: `${i*5 + 10}%+`, label: 'Metric Increase' },
      { value: `$${(i+1) * 100}k`, label: 'Revenue Generated' },
    ],
    testimonial: {
      quote: `This was an amazing project. The team for project ${i + 1} was professional and delivered outstanding results.`,
      name: `Client ${String.fromCharCode(65 + (i % 26))}`,
      role: 'CEO',
      company: `Company ${i + 1}`,
    },
    featured: i < 8, // Let's feature the first 8 projects for variety
    tags: [['Web Dev', 'Future Tech', 'AI'], ['JavaScript', 'React', 'Vue'], ['Performance', 'UX', 'Design']][i % 3],
    popular: i < 5,
}));

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


export const getTemplates = (): Template[] => Array.from({ length: 20 }, (_, i) => ({
    id: `template-${i + 1}`,
    title: `Obsidian ${i + 1}`,
    description: `A high-quality, professional template for ${['agencies', 'SaaS companies', 'portfolios'][i % 3]}.`,
    longDescription: `This is a comprehensive description for Pro Template ${i + 1}. It is designed to be fully responsive, highly customizable, and optimized for performance. It comes with a variety of pre-built pages and components to help you launch your website quickly and efficiently.`,
    price: 49 + (i * 5),
    image: `https://picsum.photos/seed/t-cover-${i + 1}/1200/800`,
    imageAlt: `Cover image for Pro Template ${i + 1}`,
    url: 'https://gumroad.com/',
    tags: [['Webflow', 'Agency'], ['Next.js', 'SaaS'], ['Framer', 'Portfolio']][i % 3],
    version: `2.1.${i}`,
    specs: {
        stack: ['Next.js 14 (App Router)', 'React', 'Astro', 'Vue 3'][i % 4],
        css: ['Tailwind CSS', 'Styled Components'][i % 2],
        animation: ['Framer Motion', 'GSAP'][i % 2],
        cms: ['Sanity.io (Headless)', 'Contentful', 'MDX', 'Strapi'][i % 4],
        deploy: ['Vercel Ready', 'Netlify Ready'][i % 2],
        type: ['Agency', 'SaaS', 'Portfolio', 'Blog'][i % 4]
    },
    fileTree: [
        { name: '/app', indent: false },
        { name: 'layout.tsx', indent: true },
        { name: 'page.tsx', indent: true },
        { name: '/projects', indent: true },
        { name: '/components', indent: false },
        { name: 'Hero.tsx', indent: true },
        { name: 'Navbar.tsx', indent: true },
        { name: 'Footer.tsx', indent: true },
        { name: '/lib', indent: false },
        { name: 'sanity.ts', indent: true },
    ],
    images: [
      {
        src: `https://picsum.photos/seed/t-img1-${i + 1}/1200/800`,
        alt: `HOME_PAGE_HERO_SECTION`,
      },
      {
        src: `https://picsum.photos/seed/t-img2-${i + 1}/1200/800`,
        alt: `MOBILE_RESPONSIVE_MENU`,
      },
      {
        src: `https://picsum.photos/seed/t-img3-${i + 1}/1200/800`,
        alt: `PROJECT_GRID_LAYOUT`,
      },
    ],
    features: [
      'Fully Responsive Design',
      `CMS for ${['Projects', 'Features', 'Showcase'][i % 3]}`,
      'Advanced Animations',
      'Global Style Guide',
      'Contact & Subscribe Forms',
      'Lifetime Updates',
    ],
    bestSeller: i === 0,
    isNew: i > 0 && i < 3,
}));

export const allCategories = articleCategories;
