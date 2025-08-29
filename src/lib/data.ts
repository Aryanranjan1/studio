import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export interface Project {
  id: string;
  title: string;
  longDescription: string;
  summary: string;
  imageUrl: string;
  imageHint: string;
  services: string[];
}

export const fetchProjects = async (): Promise<Project[]> => {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const projects: Project[] = [];
    querySnapshot.forEach((doc) => {
        projects.push({ id: doc.id, ...doc.data() } as Project);
    });
    return projects;
}

export const getProjects = (callback: (projects: Project[]) => void) => {
    return onSnapshot(collection(db, "projects"), (querySnapshot) => {
        const projects: Project[] = [];
        querySnapshot.forEach((doc) => {
            projects.push({ id: doc.id, ...doc.data() } as Project);
        });
        callback(projects);
    });
};


export const services = ["Branding", "UI/UX Design", "Web Development", "Mobile App", "E-commerce", "Marketing"];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Marketing Director",
    company: "QuantumLeap",
    quote: "AMpire Studio transformed our online presence. Their strategic approach to design and development doubled our lead generation in just three months. A truly remarkable team!",
    avatarUrl: "https://picsum.photos/100/100",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Founder",
    company: "Artisan's Corner",
    quote: "The e-commerce platform they built for us is both beautiful and highly functional. Our vendors love the new system, and sales have increased by 40% since launch.",
    avatarUrl: "https://picsum.photos/100/100",
  },
  {
    id: 3,
    name: "Jessica Rodriguez",
    title: "CEO",
    company: "ConnectApp",
    quote: "From initial concept to final launch, the team was professional, creative, and incredibly responsive. They delivered a mobile app that exceeded all our expectations.",
    avatarUrl: "https://picsum.photos/100/100",
  },
]
