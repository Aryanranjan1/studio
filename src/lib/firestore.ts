import { db } from './firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, DocumentReference, writeBatch } from 'firebase/firestore';
import type { Project } from './data';
import { sampleProjects } from './data';

const PROJECTS_COLLECTION = 'projects';

// Type for a new project, omitting the 'id' as Firestore will generate it.
export type NewProject = Omit<Project, 'id'>;

// Add a new project to Firestore
export const addProject = async (project: NewProject): Promise<DocumentReference> => {
  try {
    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), project);
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw new Error("Failed to add project.");
  }
};

// Get all projects from Firestore
export const getProjects = async (): Promise<Project[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, PROJECTS_COLLECTION));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Project));
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw new Error("Failed to get projects.");
  }
};

// Update an existing project in Firestore
export const updateProject = async (projectId: string, project: Partial<NewProject>): Promise<void> => {
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
    await updateDoc(projectRef, project);
  } catch (error) {
    console.error("Error updating document: ", error);
    throw new Error("Failed to update project.");
  }
};

// Delete a project from Firestore
export const deleteProject = async (projectId: string): Promise<void> => {
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
    await deleteDoc(projectRef);
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw new Error("Failed to delete project.");
  }
};

// Seed the database with sample projects if it's empty
export const seedProjects = async () => {
    try {
        const projectsCollection = collection(db, PROJECTS_COLLECTION);
        const querySnapshot = await getDocs(projectsCollection);
        if (querySnapshot.empty) {
            console.log("Projects collection is empty, seeding with sample data...");
            const batch = writeBatch(db);
            sampleProjects.forEach((project) => {
                const docRef = doc(projectsCollection);
                batch.set(docRef, project);
            });
            await batch.commit();
            console.log("Sample projects have been added to Firestore.");
        } else {
            console.log("Projects collection already has data, no seeding needed.");
        }
    } catch (error) {
        console.error("Error seeding projects: ", error);
        throw new Error("Failed to seed projects.");
    }
};
