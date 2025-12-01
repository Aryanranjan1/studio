// This file will be used to store mock data for the application.
// In a real-world scenario, you would fetch this data from a database.

export type Service = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  kpis: {
    value: string;
    label: string;
  }[];
  image: string;
  imageAlt: string;
  projects: Project[];
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
    id: 'branding',
    title: 'Branding',
    description: 'Crafting unique brand identities that resonate with audiences.',
    longDescription:
      'Our branding service helps you create a strong, cohesive brand identity that stands out. We work with you to develop everything from your logo and color palette to your brand voice and messaging. A strong brand is the foundation of a successful business, and we are here to help you build it.',
    kpis: [
      { value: '150%', label: 'Increase in Brand Recognition' },
      { value: '200%', label: 'Growth in Social Media Engagement' },
    ],
    image: '/images/services/branding.jpg',
    imageAlt: 'Branding materials',
    projects: getProjects().filter(p => p.category === 'Branding'),
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description: 'Designing intuitive and beautiful user experiences.',
    longDescription:
      'We specialize in creating user-centered designs that are both beautiful and easy to use. Our process involves in-depth research, user testing, and iterative design to ensure the final product meets the needs of your users and the goals of your business. From wireframes to high-fidelity prototypes, we have you covered.',
    kpis: [
      { value: '50%', label: 'Reduction in Bounce Rate' },
      { value: '30%', label: 'Increase in User Retention' },
    ],
    image: '/images/services/ui-ux.jpg',
    imageAlt: 'UI/UX design process',
    projects: getProjects().filter(p => p.category === 'UI/UX Design'),
  },
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Building fast, scalable, and secure web applications.',
    longDescription:
      'Our web development team builds high-performance websites and applications using the latest technologies. We focus on creating secure, scalable, and maintainable solutions that grow with your business. Whether you need a simple marketing site or a complex e-commerce platform, we can build it.',
    kpis: [
      { value: '99.9%', label: 'Uptime Guarantee' },
      { value: '40%', label: 'Faster Page Load Times' },
    ],
    image: '/images/services/web-dev.jpg',
    imageAlt: 'Code on a screen',
    projects: getProjects().filter(p => p.category === 'Web Development'),
  },
];

export const getProjects = (): Project[] => [
  {
    id: 'project-a',
    title: 'E-commerce Platform',
    category: 'Web Development',
    description: 'A full-featured e-commerce platform for a fashion brand.',
    longDescription: 'A detailed description of the e-commerce project...',
    image: '/images/projects/project-a-cover.jpg',
    imageAlt: 'E-commerce platform screenshot',
    client: 'Fashion Co.',
    role: 'Lead Developer',
    duration: '6 Months',
    url: '#',
    technologies: ['Next.js', 'Firebase', 'Stripe'],
  },
  {
    id: 'project-b',
    title: 'Corporate Rebranding',
    category: 'Branding',
    description: 'A complete rebranding for a major tech company.',
    longDescription: 'A detailed description of the rebranding project...',
    image: '/images/projects/project-b-cover.jpg',
    imageAlt: 'New brand logo and assets',
    client: 'Tech Corp.',
    role: 'Brand Strategist',
    duration: '3 Months',
    url: '#',
    technologies: ['Figma', 'Illustrator'],
  },
  {
    id: 'project-c',
    title: 'Mobile Banking App',
    category: 'UI/UX Design',
    description: 'A user-friendly mobile banking application.',
    longDescription: 'A detailed description of the mobile app project...',
    image: '/images/projects/project-c-cover.jpg',
    imageAlt: 'Mobile banking app screens',
    client: 'MyBank',
    role: 'Lead UI/UX Designer',
    duration: '8 Months',
    url: '#',
    technologies: ['Figma', 'React Native'],
  },
  // Add more projects as needed
];

export const getFounder = (): Founder => ({
  name: 'Alex Doe',
  role: 'Founder & Lead Designer',
  bio: 'A passionate designer with over 10 years of experience in creating beautiful and functional digital products.',
  longBio:
    'Alex started his journey in design over a decade ago with a deep passion for art and technology. After working with several leading agencies and honing his skills, he founded Dezine to create a space where creativity and innovation could thrive. His philosophy is that great design is not just about aesthetics, but about solving problems and creating meaningful experiences for people. When not designing, Alex enjoys hiking and photography.',
  image: '/images/founder.jpg',
});

export const getTestimonials = (): Testimonial[] => [
  {
    quote:
      'Working with Dezine was a game-changer for our business. Their attention to detail and creative vision is unparalleled.',
    name: 'Jane Smith',
    role: 'CEO',
    company: 'Tech Corp.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    quote:
      'The team at Dezine is incredibly talented and professional. They delivered a product that exceeded all our expectations.',
    name: 'John Johnson',
    role: 'Marketing Director',
    company: 'Fashion Co.',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  // Add more testimonials
];

export const getFaqs = (): FaqItem[] => [
    {
        question: "What services do you offer?",
        answer: "We offer a range of services including branding, UI/UX design, and web development. Our goal is to be your one-stop-shop for digital design and development needs."
    },
    {
        question: "What is your design process?",
        answer: "Our design process is collaborative and iterative. We start with discovery and research, move into wireframing and prototyping, and then finalize the design based on your feedback. We believe in keeping you involved every step of the way."
    },
    {
        question: "How long does a project typically take?",
        answer: "Project timelines can vary greatly depending on the scope and complexity. A simple branding project might take a few weeks, while a full web application could take several months. We'll provide a detailed timeline after our initial discovery call."
    },
    {
        question: "How much do your services cost?",
        answer: "Our pricing is project-based. After discussing your needs, we'll provide a detailed proposal with a fixed price. We believe in transparent pricing with no hidden fees."
    },
    {
        question: "Do you offer support after the project is complete?",
        answer: "Yes, we offer ongoing support and maintenance packages to ensure your website or application continues to run smoothly. We're here to be your long-term partner."
    }
];


export const getArticles = (): Article[] => [
    // Mock data for articles
];

export const getTemplates = (): Template[] => [
    // Mock data for templates
];
