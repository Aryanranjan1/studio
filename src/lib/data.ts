import { unstable_noStore as noStore } from 'next/cache';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

const fetchFromStrapi = async <T>(path: string): Promise<T> => {
    noStore(); // Opt out of caching for all fetches
    try {
        const res = await fetch(`${STRAPI_URL}/api/${path}`, {
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
            },
            // Use Next.js caching features if desired, e.g., { next: { revalidate: 60 } }
            // For now, we opt out to ensure fresh data during development.
            cache: 'no-store',
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch from Strapi: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        // Strapi returns data in a { data: [...] } structure. We extract the actual data array.
        // It also returns attributes, so we map to flatten it.
        if (Array.isArray(data.data)) {
            return data.data.map((item: any) => ({ id: item.id, ...item.attributes })) as T;
        } else {
            return { id: data.data.id, ...data.data.attributes } as T;
        }
    } catch (error) {
        console.error('Strapi Fetch Error:', error);
        // In a real-world scenario, you might want to return empty arrays or default objects.
        // For this example, we'll re-throw to make errors visible.
        throw error;
    }
};

export interface Project {
  id: string;
  title: string;
  slug: string;
  longDescription: string;
  summary: string;
  imageUrl: string;
  imageHint: string;
  services: string[];
  createdAt?: Date; // This will come from Strapi's createdAt field
  status: ProjectStatus;
}

export const projectStatuses = ['Pending', 'In Progress', 'Completed', 'Billed'] as const;
export type ProjectStatus = typeof projectStatuses[number];

export const serviceIcons = ['Branding', 'UI/UX Design', 'Web Development', 'Mobile App', 'E-commerce', 'Marketing', 'Automations', 'SEO'] as const;
export type ServiceIcon = typeof serviceIcons[number];

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

// --- API-Ready Data Fetching Functions ---

export const getProjects = async (): Promise<Project[]> => {
    return fetchFromStrapi<Project[]>('projects?populate=*');
};

export const getProjectBySlug = async (slug: string): Promise<Project | null> => {
    const projects = await fetchFromStrapi<Project[]>(`projects?filters[slug][$eq]=${slug}&populate=*`);
    return projects.length > 0 ? projects[0] : null;
};

export const getServices = async (): Promise<Service[]> => {
    return fetchFromStrapi<Service[]>('services?populate=*');
};

export const getServiceBySlug = async (slug: string): Promise<Service | null> => {
    const services = await fetchFromStrapi<Service[]>(`services?filters[slug][$eq]=${slug}&populate=*`);
    return services.length > 0 ? services[0] : null;
};

export const getTestimonials = async (): Promise<Testimonial[]> => {
    return fetchFromStrapi<Testimonial[]>('testimonials?populate=*');
};

export const getArticles = async (): Promise<Article[]> => {
    return fetchFromStrapi<Article[]>('articles?filters[status][$eq]=published&populate=*');
};

export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
    const articles = await fetchFromStrapi<Article[]>(`articles?filters[slug][$eq]=${slug}&filters[status][$eq]=published&populate=*`);
    return articles.length > 0 ? articles[0] : null;
};

export const getSettings = async (): Promise<SiteSettings> => {
    // Assuming settings are a "Single Type" in Strapi
    return fetchFromStrapi<SiteSettings>('setting?populate=socials');
};


// --- Form Submission Functions (Server Actions) ---

export const addMessage = async (message: Omit<Message, 'id' | 'submittedAt'>) => {
    // This function would post to your Strapi 'messages' collection
    console.log("Submitting to Strapi (mock):", message);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    // In a real app, this would be a POST request to Strapi
    return { id: new Date().toISOString() };
};

export const addIntake = async (intake: NewIntake) => {
    // This function would post to your Strapi 'intakes' collection
    console.log("Submitting intake to Strapi (mock):", intake);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return { id: new Date().toISOString() };
};
