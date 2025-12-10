
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

export const getProjects = (): Project[] => [
    {
      id: 'project-1',
      title: 'QuantumLeap CRM',
      category: 'Web Development',
      description: 'A cutting-edge CRM platform for tech startups, built with Next.js and Firebase.',
      longDescription: 'QuantumLeap CRM is a bespoke platform designed to help tech startups manage their customer relationships with ease. Built with performance and scalability in mind, it leverages Next.js for a fast frontend and Firebase for a reliable backend, providing real-time data synchronization and a seamless user experience.',
      image: 'https://picsum.photos/seed/project-quantum/1200/800',
      imageAlt: 'Dashboard of QuantumLeap CRM showing charts and user data.',
      images: [
        { src: 'https://picsum.photos/seed/quantum-1/1200/800', alt: 'CRM contact page' },
        { src: 'https://picsum.photos/seed/quantum-2/1200/800', alt: 'Analytics dashboard' },
        { src: 'https://picsum.photos/seed/quantum-3/1200/800', alt: 'Task management board' },
        { src: 'https://picsum.photos/seed/quantum-4/1200/800', alt: 'Mobile responsive view' },
      ],
      client: 'Innovate Inc.',
      role: 'Lead Developer',
      duration: '6 Months',
      url: '#',
      technologies: ['Next.js', 'Firebase', 'Tailwind CSS', 'TypeScript'],
      kpis: [
        { value: '40%+', label: 'Increase in User Productivity' },
        { value: '<50ms', label: 'Average Page Load' },
      ],
      testimonial: {
        quote: 'The new CRM transformed our workflow. The speed and real-time updates are game-changers for our sales team.',
        name: 'Sarah Chen',
        role: 'CEO',
        company: 'Innovate Inc.',
      },
      featured: true,
      tags: ['SaaS', 'Web App', 'Firebase'],
      popular: true,
    },
    {
      id: 'project-2',
      title: 'Zenith Branding',
      category: 'Branding',
      description: 'A complete brand identity overhaul for a luxury wellness brand, focusing on minimalism and elegance.',
      longDescription: 'Zenith, a luxury wellness retreat, required a brand identity that reflected its values of peace, clarity, and elegance. We developed a comprehensive branding package, including a new logo, color palette, typography system, and a full suite of marketing materials that resonate with their target audience.',
      image: 'https://picsum.photos/seed/project-zenith/1200/800',
      imageAlt: 'A minimalist logo for Zenith on a textured paper background.',
      images: [
        { src: 'https://picsum.photos/seed/zenith-1/1200/800', alt: 'Stationery with new branding' },
        { src: 'https://picsum.photos/seed/zenith-2/1200/800', alt: 'Website homepage design' },
        { src: 'https://picsum.photos/seed/zenith-3/1200/800', alt: 'Packaging design for products' },
        { src: 'https://picsum.photos/seed/zenith-4/1200/800', alt: 'Social media templates' },
      ],
      client: 'Zenith Wellness',
      role: 'Lead Designer',
      duration: '3 Months',
      url: '#',
      technologies: ['Figma', 'Adobe Illustrator', 'Brand Strategy'],
      kpis: [
        { value: '200%+', label: 'Increase in Brand Recognition' },
        { value: '50%', label: 'Higher Customer Engagement' },
      ],
      featured: true,
      tags: ['Branding', 'UI/UX', 'Design System'],
      popular: true,
    },
    {
        id: 'project-3',
        title: 'NomadGo Mobile App',
        category: 'Mobile App',
        description: 'A travel planning app for digital nomads, designed to simplify life on the road.',
        longDescription: 'NomadGo is a cross-platform mobile app built with React Native that helps digital nomads plan their travel, find co-working spaces, and connect with other nomads. The app features offline capabilities, real-time chat, and a community-driven review system.',
        image: 'https://picsum.photos/seed/project-nomad/1200/800',
        imageAlt: 'A smartphone displaying the NomadGo app interface.',
        images: [
          { src: 'https://picsum.photos/seed/nomad-1/1200/800', alt: 'App onboarding screens' },
          { src: 'https://picsum.photos/seed/nomad-2/1200/800', alt: 'Map view of co-working spaces' },
          { src: 'https://picsum.photos/seed/nomad-3/1200/800', alt: 'Community chat interface' },
          { src: 'https://picsum.photos/seed/nomad-4/1200/800', alt: 'User profile page' },
        ],
        client: 'Wanderlust Co.',
        role: 'Mobile Lead',
        duration: '8 Months',
        url: '#',
        technologies: ['React Native', 'Firebase', 'GraphQL', 'iOS/Android'],
        kpis: [
          { value: '100k+', label: 'Downloads in First Year' },
          { value: '4.9/5', label: 'User Rating' },
        ],
        featured: true,
        tags: ['Mobile', 'Community', 'Travel'],
        popular: true,
    },
    {
        id: 'project-4',
        title: 'DataFlow Automation',
        category: 'Automation',
        description: 'An automated workflow system for a financial services firm, processing thousands of daily transactions.',
        longDescription: 'We designed and implemented a robust automation system for DataFlow Analytics to handle their high-volume transaction processing. Using n8n and custom Python scripts, we created a workflow that ingests data from multiple sources, validates it, and syncs it with their internal database, reducing manual errors by 99%.',
        image: 'https://picsum.photos/seed/project-dataflow/1200/800',
        imageAlt: 'A visual representation of a complex data workflow.',
        images: [
          { src: 'https://picsum.photos/seed/dataflow-1/1200/800', alt: 'Diagram of the automation architecture' },
          { src: 'https://picsum.photos/seed/dataflow-2/1200/800', alt: 'Monitoring dashboard for the workflow' },
        ],
        client: 'DataFlow Analytics',
        role: 'Automation Specialist',
        duration: '4 Months',
        url: '#',
        technologies: ['Python', 'n8n', 'PostgreSQL', 'REST APIs'],
        kpis: [
          { value: '99%', label: 'Reduction in Manual Errors' },
          { value: '80h/week', label: 'Time Saved for the Team' },
        ],
        testimonial: {
          quote: 'The automation solution is flawless. It has fundamentally changed how we operate and allowed us to scale our services.',
          name: 'David Lee',
          role: 'CTO',
          company: 'DataFlow Analytics',
        },
        featured: true,
        tags: ['Automation', 'Fintech', 'Backend'],
        popular: false,
    },
    {
        id: 'project-5',
        title: 'Helios E-commerce',
        category: 'Web Development',
        description: 'A high-performance e-commerce site for a sustainable fashion brand, built on Shopify Plus.',
        longDescription: 'Helios required a fast, beautiful, and scalable e-commerce presence. We developed a custom Shopify Plus theme from the ground up, focusing on a premium user experience, fast page loads, and seamless checkout to boost conversions.',
        image: 'https://picsum.photos/seed/project-helios/1200/800',
        imageAlt: 'The homepage of the Helios fashion e-commerce site.',
        images: [
          { src: 'https://picsum.photos/seed/helios-1/1200/800', alt: 'Product detail page' },
          { src: 'https://picsum.photos/seed/helios-2/1200/800', alt: 'Category grid page' },
          { src: 'https://picsum.photos/seed/helios-3/1200/800', alt: 'Mobile checkout flow' },
        ],
        client: 'Helios Threads',
        role: 'E-commerce Developer',
        duration: '5 Months',
        url: '#',
        technologies: ['Shopify Plus', 'Liquid', 'JavaScript', 'Headless'],
        kpis: [
          { value: '30%', label: 'Increase in Conversion Rate' },
          { value: '+25%', label: 'Higher Average Order Value' },
        ],
        featured: true,
        tags: ['E-commerce', 'Shopify', 'Fashion'],
        popular: true,
    },
    {
        id: 'project-6',
        title: 'Artisan Coffee Co.',
        category: 'Branding',
        description: 'A warm and rustic brand identity for a specialty coffee roaster.',
        longDescription: 'Artisan Coffee Co. needed a brand that felt as authentic and handcrafted as their coffee. We developed a rustic identity using hand-drawn illustrations, earthy tones, and tactile packaging materials to tell their story.',
        image: 'https://picsum.photos/seed/project-artisan/1200/800',
        imageAlt: 'Packaging for Artisan Coffee Co. showing the new logo.',
        images: [
          { src: 'https://picsum.photos/seed/artisan-1/1200/800', alt: 'Logo variations' },
          { src: 'https://picsum.photos/seed/artisan-2/1200/800', alt: 'Coffee bag design' },
        ],
        client: 'Artisan Coffee Co.',
        role: 'Brand Strategist',
        duration: '2 Months',
        url: '#',
        technologies: ['Branding', 'Packaging Design', 'Illustration'],
        kpis: [
          { value: '40%', label: 'Increase in Retail Sales' },
          { value: 'Top 5', label: 'Local Coffee Brand' },
        ],
        featured: false,
        tags: ['Branding', 'Food & Beverage', 'Packaging'],
        popular: false,
    },
    {
        id: 'project-7',
        title: 'CodeLab Platform',
        category: 'Web Development',
        description: 'An interactive online learning platform for coders, featuring live coding environments.',
        longDescription: 'CodeLab is an educational platform where users can learn to code through interactive tutorials and live-coding challenges. We built the platform using Vue.js and integrated a secure container-based system for running user code in real-time.',
        image: 'https://picsum.photos/seed/project-codelab/1200/800',
        imageAlt: 'A user typing code in the CodeLab learning interface.',
        images: [
          { src: 'https://picsum.photos/seed/codelab-1/1200/800', alt: 'Course dashboard' },
          { src: 'https://picsum.photos/seed/codelab-2/1200/800', alt: 'Live coding challenge screen' },
        ],
        client: 'CodeLab Academy',
        role: 'Full-Stack Developer',
        duration: '10 Months',
        url: '#',
        technologies: ['Vue.js', 'Node.js', 'Docker', 'WebSockets'],
        kpis: [
          { value: '50k+', label: 'Active Monthly Users' },
          { value: '95%', label: 'Course Completion Rate' },
        ],
        featured: true,
        tags: ['EdTech', 'Web App', 'Docker'],
        popular: true,
    },
    {
        id: 'project-8',
        title: 'Starlight Landing Page',
        category: 'Web Development',
        description: 'A visually stunning animated landing page for a new SaaS product, built with Three.js.',
        longDescription: 'To launch their new product, Starlight needed a landing page that would capture users\' attention. We created a fully interactive 3D landing page using Three.js and GSAP, resulting in a memorable experience that drove sign-ups.',
        image: 'https://picsum.photos/seed/project-starlight/1200/800',
        imageAlt: 'An abstract 3D nebula animation on the Starlight landing page.',
        images: [
          { src: 'https://picsum.photos/seed/starlight-1/1200/800', alt: 'Interactive 3D product model' },
        ],
        client: 'Starlight Software',
        role: 'Creative Developer',
        duration: '2 Months',
        url: '#',
        technologies: ['Three.js', 'GSAP', 'WebGL', 'JavaScript'],
        kpis: [
          { value: '60%', label: 'Increase in Sign-up Rate' },
          { value: '3x', label: 'Longer Average Time on Page' },
        ],
        featured: true,
        tags: ['3D', 'Animation', 'SaaS'],
        popular: false,
    },
     {
      id: 'project-9',
      title: 'HealthSync App',
      category: 'Mobile App',
      description: 'A mobile app for tracking personal health metrics and syncing with wearable devices.',
      longDescription: 'HealthSync is a native iOS and Android app that consolidates data from various health trackers like Apple Watch and Fitbit into a single, intuitive dashboard. It provides personalized insights and goal tracking to help users improve their well-being.',
      image: 'https://picsum.photos/seed/project-healthsync/1200/800',
      imageAlt: 'The main dashboard of the HealthSync mobile app.',
      client: 'Vitality Tech',
      role: 'Mobile Developer',
      duration: '7 Months',
      url: '#',
      technologies: ['Swift', 'Kotlin', 'HealthKit', 'REST APIs'],
      kpis: [
        { value: '250k+', label: 'Active Users' },
        { value: '4.8/5', label: 'App Store Rating' },
      ],
      featured: false,
      tags: ['Mobile', 'HealthTech', 'iOS', 'Android'],
      popular: true,
    },
    {
      id: 'project-10',
      title: 'Aperture Portfolio',
      category: 'Web Development',
      description: 'A minimal and elegant portfolio website for a world-renowned photographer.',
      longDescription: 'We designed a portfolio for Aperture Studios that puts the focus entirely on the photography. Using a headless CMS and a lightning-fast frontend, the site serves as a beautiful, unobtrusive frame for the artist\'s work, with smooth animations and a clean grid system.',
      image: 'https://picsum.photos/seed/project-aperture/1200/800',
      imageAlt: 'A grid of black and white photos on the Aperture portfolio site.',
      client: 'Aperture Studios',
      role: 'Frontend Developer',
      duration: '3 Months',
      url: '#',
      technologies: ['Next.js', 'Sanity.io', 'Framer Motion', 'Vercel'],
      kpis: [
        { value: '98', label: 'Performance Score' },
        { value: '50%', label: 'Increase in Print Sales' },
      ],
      featured: false,
      tags: ['Portfolio', 'Headless CMS', 'Web Design'],
      popular: false,
    },
    {
      id: 'project-11',
      title: 'LegalEase Automation',
      category: 'Automation',
      description: 'Automated document generation and e-signature workflow for a busy law firm.',
      longDescription: 'LegalEase needed to reduce the time spent on repetitive paperwork. We built a system using Zapier and the DocuSign API to automatically generate contracts from templates, send them for signature, and archive the signed documents, saving hundreds of hours per month.',
      image: 'https://picsum.photos/seed/project-legalease/1200/800',
      imageAlt: 'A diagram showing an automated document workflow.',
      client: 'Reyes & Associates Law',
      role: 'Automation Consultant',
      duration: '2 Months',
      url: '#',
      technologies: ['Zapier', 'DocuSign API', 'Airtable', 'Document Generation'],
      kpis: [
        { value: '90%', label: 'Reduction in Paperwork Time' },
        { value: '24h', label: 'Faster Contract Turnaround' },
      ],
      testimonial: {
        quote: 'This automation has been a revelation for our firm. What used to take days now takes minutes. The efficiency gains are enormous.',
        name: 'Maria Reyes',
        role: 'Managing Partner',
        company: 'Reyes & Associates Law',
      },
      featured: false,
      tags: ['Automation', 'LegalTech', 'API Integration'],
      popular: false,
    },
    {
      id: 'project-12',
      title: 'Terra Firma Rebrand',
      category: 'Branding',
      description: 'A bold and earthy rebrand for an environmental consulting firm.',
      longDescription: 'Terra Firma wanted to update their image to reflect their modern, data-driven approach to environmental science. We created a strong, geometric brand identity paired with a natural color palette and clear typography to convey both authority and a connection to the earth.',
      image: 'https://picsum.photos/seed/project-terrafirma/1200/800',
      imageAlt: 'The new Terra Firma logo on a background of a topographical map.',
      client: 'Terra Firma Environmental',
      role: 'Art Director',
      duration: '4 Months',
      url: '#',
      technologies: ['Brand Strategy', 'Logo Design', 'UI/UX', 'Figma'],
      kpis: [
        { value: '30%', label: 'Increase in RFP Wins' },
        { value: 'Top 10', label: 'Industry Design Award' },
      ],
      featured: false,
      tags: ['Branding', 'Corporate Identity', 'Science'],
      popular: false,
    },
    {
      id: 'project-13',
      title: 'Sphere Internal Tools',
      category: 'Web Development',
      description: 'A suite of internal dashboards and tools for a large logistics company.',
      longDescription: 'Sphere Logistics needed a unified system to manage their fleet, track shipments, and visualize performance data. We built a secure, role-based web application with multiple dashboards, providing real-time insights for everyone from drivers to executives.',
      image: 'https://picsum.photos/seed/project-sphere/1200/800',
      imageAlt: 'A complex logistics dashboard showing a map and various data points.',
      client: 'Sphere Logistics',
      role: 'Full-Stack Developer',
      duration: '9 Months',
      url: '#',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Charts.js'],
      kpis: [
        { value: '15%', label: 'Improvement in Fleet Efficiency' },
        { value: '100%', label: 'Adoption by all departments' },
      ],
      featured: false,
      tags: ['Web App', 'Internal Tools', 'Logistics'],
      popular: false,
    },
    {
      id: 'project-14',
      title: 'MindWell App',
      category: 'Mobile App',
      description: 'A mindfulness and meditation app with guided sessions and progress tracking.',
      longDescription: 'MindWell is a mobile app designed to promote mental wellness. We created a calming and intuitive interface, integrated audio playback for guided meditations, and implemented a journaling feature to help users track their progress and mood over time.',
      image: 'https://picsum.photos/seed/project-mindwell/1200/800',
      imageAlt: 'The meditation timer screen on the MindWell app.',
      client: 'Clarity Labs',
      role: 'UI/UX Designer',
      duration: '6 Months',
      url: '#',
      technologies: ['React Native', 'Firebase', 'Figma', 'Lottie'],
      kpis: [
        { value: '500k+', label: 'Total Meditations Completed' },
        { value: '20%', label: 'Higher User Retention' },
      ],
      testimonial: {
        quote: 'The design is beautiful and so easy to use. Our users love the new journaling feature and the overall peaceful experience.',
        name: 'Dr. Emily Carter',
        role: 'Founder',
        company: 'Clarity Labs',
      },
      featured: false,
      tags: ['Mobile', 'Wellness', 'UI/UX'],
      popular: true,
    },
    {
      id: 'project-15',
      title: 'Oasis Landing Page',
      category: 'Web Development',
      description: 'A fast and beautiful Webflow landing page for a new real estate development.',
      longDescription: 'Oasis Properties needed a compelling landing page to generate leads for their new luxury development. We used Webflow to rapidly design and deploy a visually rich page with smooth animations, an integrated contact form, and a gallery of renderings.',
      image: 'https://picsum.photos/seed/project-oasis/1200/800',
      imageAlt: 'A hero section of a website showing a luxury property.',
      client: 'Oasis Properties',
      role: 'Webflow Developer',
      duration: '2 Weeks',
      url: '#',
      technologies: ['Webflow', 'Figma', 'GSAP', 'Lead Generation'],
      kpis: [
        { value: '400+', label: 'Leads in First Month' },
        { value: '2 weeks', label: 'From Concept to Launch' },
      ],
      featured: false,
      tags: ['Webflow', 'Real Estate', 'Landing Page'],
      popular: false,
    }
];

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
