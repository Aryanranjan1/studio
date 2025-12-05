
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
  question: string;
  answer: string;
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
    title: 'Custom Web Design',
    description:
      'Tailored, visually appealing designs crafted to represent your brand identity.',
    longDescription:
      'We build high-performance websites and applications using modern technologies. Our focus is on creating secure, scalable, and maintainable solutions that grow with your business, from marketing sites to complex e-commerce platforms with full CMS integration.',
    icon: 'Globe',
    category: 'Web Design',
    kpis: [
      { value: 'Under 50ms', label: 'Page Loads' },
      { value: '99.9%', label: 'Uptime' },
    ],
  },
  {
    id: 'seo-optimization',
    title: 'SEO Optimization',
    description:
      "Implementing practices to enhance your website's visibility on search engines.",
    longDescription:
      'Our digital marketing services are designed to increase your visibility and drive qualified leads. We specialize in technical SEO, content strategy, and performance marketing to ensure your message reaches the right audience at the right time.',
    icon: 'Seo',
    category: 'Search Engine Optimization',
    kpis: [
      { value: '+300%', label: 'Organic Traffic' },
      { value: '+50%', label: 'Conversion Rate' },
    ],
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    description:
      'Crafting unique brand identities through logos, color schemes, and typography.',
    longDescription:
      'A strong brand is the foundation of a successful business. We help you create a cohesive identity that stands out, and then translate that into a user-centered design that is both beautiful and easy to use, from wireframes to high-fidelity prototypes.',
    icon: 'Brand',
    category: 'Brand',
    kpis: [
      { value: '+150%', label: 'Brand Recognition' },
      { value: '-50%', label: 'Bounce Rate' },
    ],
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    description:
      'Ongoing support to keep your website up-to-date. Regular updates to ensure optimal performance.',
    longDescription:
      'We analyze your workflows and build custom automation systems to save you time and reduce errors. From CRM setups to integrating third-party services, we help you work smarter, not harder, so you can focus on growing your business.',
    icon: 'Maintenance',
    category: 'Support',
    kpis: [
      { value: '10+ Hours', label: 'Saved Weekly' },
      { value: '95%', label: 'Process Efficiency' },
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
    technologies: [['Next.js', 'Firebase', 'Stripe'], ['Figma', 'Webflow'], ['Zapier', 'Airtable'], ['React Native', 'Firebase']][i % 4],
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
}));

export const getFounder = (): Founder => ({
  name: 'Alex Doe',
  role: 'Founder & Lead Digital Architect',
  bio: 'A passionate designer with over 10 years of experience in creating beautiful and functional digital products.',
  longBio:
    'Alex started his journey in design and development over a decade ago with a deep passion for art and technology. After working with several leading agencies and honing his skills on enterprise-level projects, he founded this agency to bring that same level of quality and strategic thinking to small and medium-sized enterprises. His philosophy is that great digital architecture is not just about aesthetics, but about solving core business problems and creating meaningful, high-performance experiences. When not coding or designing, Alex enjoys hiking and photography.',
  image: 'https://picsum.photos/seed/founder-img/800/800',
});

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

export const getFaqs = (): FaqItem[] => [
  {
    question: 'What services do you offer?',
    answer:
      'We offer a range of services including premium website/platform development, UI/UX design, CMS/CRM integration, and business process automation. Our goal is to be your one-stop-shop for digital architecture and growth.',
  },
  {
    question: 'What is your design and development process?',
    answer:
      'Our process is collaborative and structured. We start with discovery and strategy, move into UI/UX design and branding, then into development, and finally testing and launch. We believe in keeping you involved every step of the way.',
  },
  {
    question: 'How long does a project typically take?',
    answer:
      'Project timelines vary depending on scope. A premium website might take 4-8 weeks, while a custom platform could take 3-6 months. We provide a detailed timeline after our initial discovery call.',
  },
  {
    question: 'How much do your services cost?',
    answer:
      'Our pricing is project-based and reflects the premium, custom nature of our work. After discussing your needs, we provide a detailed, fixed-price proposal. We focus on delivering value and a high return on your investment.',
  },
  {
    question: 'Do you offer support after the project is complete?',
    answer:
      'Yes, we offer ongoing retainer packages for support, maintenance, and optimization to ensure your digital asset continues to perform and evolve. We aim to be your long-term digital partner.',
  },
];

export const getArticles = (): Article[] => Array.from({ length: 20 }, (_, i) => ({
    id: `article-${i + 1}`,
    title: `The Future of Web Development in ${2024 + i}`,
    date: new Date(2024, i % 12, (i % 28) + 1).toISOString().split('T')[0],
    author: ['Alex Doe', 'Jane Smith', 'Sam Wilson'][i % 3],
    authorImage: `https://picsum.photos/seed/author-img${i % 3}/40/40`,
    excerpt: `A look into the upcoming trends for web development in ${2024 + i}, from AI integration to new JavaScript frameworks.`,
    content: `This is the full content for the article about web development trends in ${2024 + i}. It delves deep into topics like the rise of server-side rendering, the impact of AI on coding practices, and how to stay ahead of the curve. It's a must-read for any developer looking to future-proof their skills.`,
    image: `https://picsum.photos/seed/ablog-cover-${i + 1}/1200/800`,
    imageAlt: `Abstract image representing future tech for ${2024 + i}`,
    tags: [['Web Dev', 'Future Tech', 'AI'], ['JavaScript', 'React', 'Vue'], ['Performance', 'UX', 'Design']][i % 3],
    popular: i % 3 === 0,
}));


export const getTemplates = (): Template[] => Array.from({ length: 20 }, (_, i) => ({
    id: `template-${i + 1}`,
    title: `Pro Template ${i + 1}`,
    description: `A high-quality, professional template for ${['agencies', 'SaaS companies', 'portfolios'][i % 3]}.`,
    longDescription: `This is a comprehensive description for Pro Template ${i + 1}. It is designed to be fully responsive, highly customizable, and optimized for performance. It comes with a variety of pre-built pages and components to help you launch your website quickly and efficiently.`,
    price: 49 + (i * 5),
    image: `https://picsum.photos/seed/t-cover-${i + 1}/1200/800`,
    imageAlt: `Cover image for Pro Template ${i + 1}`,
    url: '#',
    tags: [['Webflow', 'Agency'], ['Next.js', 'SaaS'], ['Framer', 'Portfolio']][i % 3],
    images: [
      {
        src: `https://picsum.photos/seed/t-img1-${i + 1}/1200/800`,
        alt: `Gallery image 1 for Template ${i + 1}`,
      },
      {
        src: `https://picsum.photos/seed/t-img2-${i + 1}/1200/800`,
        alt: `Gallery image 2 for Template ${i + 1}`,
      },
      {
        src: `https://picsum.photos/seed/t-img3-${i + 1}/1200/800`,
        alt: `Gallery image 3 for Template ${i + 1}`,
      },
      {
        src: `https://picsum.photos/seed/t-img4-${i + 1}/1200/800`,
        alt: `Gallery image 4 for Template ${i + 1}`,
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
}));
