
import type { ReactNode } from 'react';

export type Service = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string; // Changed from ReactNode to string
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
  excerpt: string;
  content: string;
  image: string;
  imageAlt: string;
  tags: string[];
};

export type Template = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  imageAlt: string;
  url: string;
  tags: string[];
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
    id: 'web-development',
    title: 'Websites & Platforms',
    description: 'Building fast, scalable, and secure web applications.',
    longDescription:
      'We build high-performance websites and applications using modern technologies. Our focus is on creating secure, scalable, and maintainable solutions that grow with your business, from marketing sites to complex e-commerce platforms with full CMS integration.',
    icon: 'Code',
    kpis: [
      { value: 'Under 50ms', label: 'Page Loads' },
      { value: '99.9%', label: 'Uptime' },
    ],
  },
  {
    id: 'branding',
    title: 'Branding & UI/UX',
    description:
      'Crafting unique brand identities and intuitive user experiences.',
    longDescription:
      'A strong brand is the foundation of a successful business. We help you create a cohesive identity that stands out, and then translate that into a user-centered design that is both beautiful and easy to use, from wireframes to high-fidelity prototypes.',
    icon: 'Palette',
    kpis: [
      { value: '+150%', label: 'Brand Recognition' },
      { value: '-50%', label: 'Bounce Rate' },
    ],
  },
   {
    id: 'automation',
    title: 'Automation & CRM',
    description: 'Streamlining business processes with custom automations.',
    longDescription:
      'We analyze your workflows and build custom automation systems to save you time and reduce errors. From CRM setups to integrating third-party services, we help you work smarter, not harder, so you can focus on growing your business.',
    icon: 'Bot',
    kpis: [
      { value: '10+ Hours', label: 'Saved Weekly' },
      { value: '95%', label: 'Process Efficiency' },
    ],
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    description: 'Data-driven strategies to grow your online presence.',
    longDescription:
      'Our digital marketing services are designed to increase your visibility and drive qualified leads. We specialize in technical SEO, content strategy, and performance marketing to ensure your message reaches the right audience at the right time.',
    icon: 'Megaphone',
    kpis: [
      { value: '+300%', label: 'Organic Traffic' },
      { value: '+50%', label: 'Conversion Rate' },
    ],
  },
];

export const getProjects = (): Project[] => [
  {
    id: 'project-a',
    title: 'Fintech E-commerce Platform',
    category: 'Web Development',
    description: 'A full-featured e-commerce platform for a fashion brand.',
    longDescription: 'We built a custom, headless e-commerce solution for a fast-growing fintech startup. The platform required complex product logic, integration with multiple payment gateways, and a high-performance frontend to ensure a seamless user experience during checkout. The backend was built for scale, anticipating future international expansion.',
    image: 'https://picsum.photos/seed/project-a/1200/800',
    imageAlt: 'E-commerce platform screenshot',
    images: [
        { src: 'https://picsum.photos/seed/project-a1/1200/800', alt: 'Product page' },
        { src: 'https://picsum.photos/seed/project-a2/1200/800', alt: 'Checkout flow' },
        { src: 'https://picsum.photos/seed/project-a3/1200/800', alt: 'Admin dashboard' },
        { src: 'https://picsum.photos/seed/project-a4/1200/800', alt: 'Mobile view' },
    ],
    client: 'Fintech Co.',
    role: 'Lead Developer & Architect',
    duration: '6 Months',
    url: '#',
    technologies: ['Next.js', 'Firebase', 'Stripe', 'GraphQL'],
     kpis: [
      { value: '42%+', label: 'Conversion Rate' },
      { value: '$1.2M', label: 'First Quarter Sales' },
    ],
    testimonial: {
        quote: "The platform they built is not only beautiful but also incredibly robust. Our sales have skyrocketed since launch.",
        name: "Jane Doe",
        role: "CEO",
        company: "Fintech Co."
    }
  },
  {
    id: 'project-b',
    title: 'SaaS Corporate Rebranding',
    category: 'Branding',
    description: 'A complete rebranding for a major tech company.',
    longDescription: 'A major B2B SaaS company approached us to modernize their brand identity, which had not been updated in over a decade. We conducted extensive market research to develop a new brand strategy, logo, and visual system that reflected their position as an industry leader, culminating in a comprehensive brand guidelines document.',
    image: 'https://picsum.photos/seed/project-b/1200/800',
    imageAlt: 'New brand logo and assets',
     images: [
        { src: 'https://picsum.photos/seed/project-b1/1200/800', alt: 'New logo design' },
        { src: 'https://picsum.photos/seed/project-b2/1200/800', alt: 'Website before & after' },
        { src: 'https://picsum.photos/seed/project-b3/1200/800', alt: 'Brand guidelines' },
        { src: 'https://picsum.photos/seed/project-b4/1200/800', alt: 'Marketing materials' },
    ],
    client: 'SaaS Corp.',
    role: 'Brand Strategist & Designer',
    duration: '3 Months',
    url: '#',
    technologies: ['Figma', 'Illustrator', 'Webflow'],
     kpis: [
      { value: '200%+', label: 'Increase in Demo Requests' },
      { value: '75%', label: 'Positive Brand Sentiment' },
    ],
  },
  {
    id: 'project-c',
    title: 'AI Automation System',
    category: 'Automation',
    description: 'A user-friendly mobile banking application.',
    longDescription: 'For a busy marketing agency, we developed a suite of internal tools to automate their client reporting and content distribution processes. This involved integrating with multiple APIs like Google Analytics, social media platforms, and their CRM, saving the team countless hours of manual work each week.',
    image: 'https://picsum.photos/seed/project-c/1200/800',
    imageAlt: 'Automation dashboard',
     images: [
        { src: 'https://picsum.photos/seed/project-c1/1200/800', alt: 'Workflow diagram' },
        { src: 'https://picsum.photos/seed/project-c2/1200/800', alt: 'Integration setup screen' },
    ],
    client: 'Marketing Agency',
    role: 'Automation Specialist',
    duration: '4 Months',
    url: '#',
    technologies: ['Zapier', 'Make.com', 'Airtable', 'Node.js'],
     kpis: [
      { value: '20 Hours', label: 'Saved per Week' },
      { value: '100%', label: 'Reporting Accuracy' },
    ],
     testimonial: {
        quote: "This automation system has been a complete game-changer for our agency's efficiency.",
        name: "John Smith",
        role: "COO",
        company: "Marketing Agency"
    }
  },
];

export const getFounder = (): Founder => ({
  name: 'Alex Doe',
  role: 'Founder & Lead Digital Architect',
  bio: 'A passionate designer with over 10 years of experience in creating beautiful and functional digital products.',
  longBio:
    'Alex started his journey in design and development over a decade ago with a deep passion for art and technology. After working with several leading agencies and honing his skills on enterprise-level projects, he founded this agency to bring that same level of quality and strategic thinking to small and medium-sized enterprises. His philosophy is that great digital architecture is not just about aesthetics, but about solving core business problems and creating meaningful, high-performance experiences. When not coding or designing, Alex enjoys hiking and photography.',
  image: 'https://picsum.photos/seed/founder/800/800',
});

export const getTestimonials = (): Testimonial[] => [
  {
    quote:
      'Working with them was a game-changer for our business. Their attention to detail and creative vision is unparalleled.',
    name: 'Jane Smith',
    role: 'CEO',
    company: 'SaaS Corp.',
    image: 'https://picsum.photos/seed/ts1/100/100',
  },
  {
    quote:
      'The team is incredibly talented and professional. They delivered a product that exceeded all our expectations and our revenue proves it.',
    name: 'John Johnson',
    role: 'Marketing Director',
    company: 'Fintech Co.',
    image: 'https://picsum.photos/seed/ts2/100/100',
  },
  // Add more testimonials
];

export const getFaqs = (): FaqItem[] => [
    {
        question: "What services do you offer?",
        answer: "We offer a range of services including premium website/platform development, UI/UX design, CMS/CRM integration, and business process automation. Our goal is to be your one-stop-shop for digital architecture and growth."
    },
    {
        question: "What is your design and development process?",
        answer: "Our process is collaborative and structured. We start with discovery and strategy, move into UI/UX design and branding, then into development, and finally testing and launch. We believe in keeping you involved every step of the way."
    },
    {
        question: "How long does a project typically take?",
        answer: "Project timelines vary depending on scope. A premium website might take 4-8 weeks, while a custom platform could take 3-6 months. We provide a detailed timeline after our initial discovery call."
    },
    {
        question: "How much do your services cost?",
        answer: "Our pricing is project-based and reflects the premium, custom nature of our work. After discussing your needs, we provide a detailed, fixed-price proposal. We focus on delivering value and a high return on your investment."
    },
    {
        question: "Do you offer support after the project is complete?",
        answer: "Yes, we offer ongoing retainer packages for support, maintenance, and optimization to ensure your digital asset continues to perform and evolve. We aim to be your long-term digital partner."
    }
];


export const getArticles = (): Article[] => [
    {
        id: 'article-1',
        title: "The ROI of a Premium Website for SMEs",
        date: "October 26, 2023",
        author: "Alex Doe",
        excerpt: "Discover why investing in a high-quality website is not a cost, but a crucial investment for small and medium-sized enterprises.",
        content: "In the digital age, a website is often the first point of contact between a business and its potential customers. For Small and Medium-sized Enterprises (SMEs), a premium website is not just a digital brochure; it's a powerful tool for growth, credibility, and customer engagement. A well-crafted site enhances brand perception, improves user experience, and drives conversions. It signals to your audience that you are a serious, professional organization that values quality. This initial investment pays dividends in customer trust, lead generation, and long-term brand equity.",
        image: "https://picsum.photos/seed/blog1/1200/800",
        imageAlt: "A graph showing upward growth",
        tags: ["Business", "Web Design", "ROI"]
    },
    {
        id: 'article-2',
        title: "Headless CMS vs. Traditional: What's Right for Your Business?",
        date: "October 15, 2023",
        author: "Alex Doe",
        excerpt: "A breakdown of the pros and cons of headless and traditional content management systems for modern businesses.",
        content: "Choosing the right Content Management System (CMS) is a critical decision. Traditional CMSs like WordPress offer an all-in-one solution, which can be great for simplicity. However, a Headless CMS provides unparalleled flexibility, performance, and security by decoupling the content backend from the presentation layer (the 'head'). This allows you to use your content across multiple platforms (web, mobile apps, etc.) and employ modern frontend frameworks for a faster, more engaging user experience. For SMEs looking to future-proof their digital strategy, a headless approach is often the superior choice.",
        image: "https://picsum.photos/seed/blog2/1200/800",
        imageAlt: "Abstract representation of connected data",
        tags: ["CMS", "Development", "Strategy"]
    },
    {
        id: 'article-3',
        title: "Automating Your Sales Funnel: A Guide for SMEs",
        date: "September 28, 2023",
        author: "Alex Doe",
        excerpt: "Learn how to save time and increase efficiency by automating key parts of your sales and marketing process.",
        content: "Manual, repetitive tasks can be a significant drain on resources for any SME. Automating your sales funnel—from lead capture and nurturing to CRM updates and reporting—can free up your team to focus on high-value activities. Using modern tools, you can create seamless workflows that ensure no lead falls through the cracks and that your customer data is always up-to-date. This not only improves efficiency but also provides a more consistent and professional experience for your customers.",
        image: "https://picsum.photos/seed/blog3/1200/800",
        imageAlt: "A series of connected gears and cogs",
        tags: ["Automation", "Sales", "CRM"]
    }
];

export const getTemplates = (): Template[] => [
    {
        id: "template-1",
        title: "Agency X - Webflow Template",
        description: "A premium, dark-themed template for modern digital agencies.",
        price: 79,
        image: "https://picsum.photos/seed/template1/1200/800",
        imageAlt: "Preview of a dark agency website template",
        url: "#",
        tags: ["Webflow", "Agency", "Dark Mode"]
    },
    {
        id: "template-2",
        title: "SaaS Landing Page - Next.js",
        description: "A high-conversion landing page template built with Next.js and Tailwind CSS.",
        price: 99,
        image: "https://picsum.photos/seed/template2/1200/800",
        imageAlt: "Preview of a SaaS landing page",
        url: "#",
        tags: ["Next.js", "SaaS", "Landing Page"]
    },
     {
        id: "template-3",
        title: "Portfolio Pro - Framer Template",
        description: "A stunning personal portfolio template for creatives, built in Framer.",
        price: 59,
        image: "https://picsum.photos/seed/template3/1200/800",
        imageAlt: "Preview of a creative portfolio template",
        url: "#",
        tags: ["Framer", "Portfolio", "Creative"]
    }
];
