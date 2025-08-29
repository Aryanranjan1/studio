import { db } from './firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, DocumentReference, writeBatch, serverTimestamp, query, orderBy, where, limit, getDoc, setDoc } from 'firebase/firestore';
import type { Project, Testimonial, Message, Article, SiteSettings, Intake, NewIntake } from './data';
import { sampleProjects, sampleTestimonials, sampleArticles, sampleSettings } from './data';

const PROJECTS_COLLECTION = 'projects';
const TESTIMONIALS_COLLECTION = 'testimonials';
const MESSAGES_COLLECTION = 'messages';
const ARTICLES_COLLECTION = 'articles';
const SETTINGS_COLLECTION = 'settings';
const INTAKES_COLLECTION = 'intakes';


// Type for a new project, omitting the 'id' as Firestore will generate it.
export type NewProject = Omit<Project, 'id'>;
export type NewTestimonial = Omit<Testimonial, 'id'>;
export type NewMessage = Omit<Message, 'id' | 'submittedAt'>;
export type NewArticle = Omit<Article, 'id' | 'createdAt'>;
export type NewSiteSettings = Omit<SiteSettings, 'id'>;


// ----------------- PROJECTS -----------------

export const addProject = async (project: NewProject): Promise<DocumentReference> => {
  try {
    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), project);
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw new Error("Failed to add project.");
  }
};

export const updateProject = async (projectId: string, project: Partial<NewProject>): Promise<void> => {
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
    await updateDoc(projectRef, project);
  } catch (error) {
    console.error("Error updating document: ", error);
    throw new Error("Failed to update project.");
  }
};

export const deleteProject = async (projectId: string): Promise<void> => {
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
    await deleteDoc(projectRef);
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw new Error("Failed to delete project.");
  }
};

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
        }
    } catch (error) {
        console.error("Error seeding projects: ", error);
        throw new Error("Failed to seed projects.");
    }
};

// ----------------- TESTIMONIALS -----------------

export const addTestimonial = async (testimonial: NewTestimonial): Promise<DocumentReference> => {
    try {
      const docRef = await addDoc(collection(db, TESTIMONIALS_COLLECTION), testimonial);
      return docRef;
    } catch (error) {
      console.error("Error adding testimonial: ", error);
      throw new Error("Failed to add testimonial.");
    }
  };
  
  export const updateTestimonial = async (testimonialId: string, testimonial: Partial<NewTestimonial>): Promise<void> => {
    try {
      const testimonialRef = doc(db, TESTIMONIALS_COLLECTION, testimonialId);
      await updateDoc(testimonialRef, testimonial);
    } catch (error) {
      console.error("Error updating testimonial: ", error);
      throw new Error("Failed to update testimonial.");
    }
  };
  
  export const deleteTestimonial = async (testimonialId: string): Promise<void> => {
    try {
      const testimonialRef = doc(db, TESTIMONIALS_COLLECTION, testimonialId);
      await deleteDoc(testimonialRef);
    } catch (error) {
      console.error("Error deleting testimonial: ", error);
      throw new Error("Failed to delete testimonial.");
    }
  };

  export const seedTestimonials = async () => {
    try {
        const testimonialsCollection = collection(db, TESTIMONIALS_COLLECTION);
        const querySnapshot = await getDocs(testimonialsCollection);
        if (querySnapshot.empty) {
            console.log("Testimonials collection is empty, seeding with sample data...");
            const batch = writeBatch(db);
            sampleTestimonials.forEach((testimonial) => {
                const docRef = doc(testimonialsCollection);
                batch.set(docRef, testimonial);
            });
            await batch.commit();
            console.log("Sample testimonials have been added to Firestore.");
        }
    } catch (error) {
        console.error("Error seeding testimonials: ", error);
    }
};

// ----------------- MESSAGES -----------------

export const addMessage = async (message: NewMessage): Promise<DocumentReference> => {
    try {
      const docRef = await addDoc(collection(db, MESSAGES_COLLECTION), {
        ...message,
        submittedAt: serverTimestamp() 
      });
      return docRef;
    } catch (error) {
      console.error("Error adding message: ", error);
      throw new Error("Failed to send message.");
    }
  };

  export const deleteMessage = async (messageId: string): Promise<void> => {
    try {
      const messageRef = doc(db, MESSAGES_COLLECTION, messageId);
      await deleteDoc(messageRef);
    } catch (error) {
      console.error("Error deleting message: ", error);
      throw new Error("Failed to delete message.");
    }
  };


// ----------------- ARTICLES -----------------

export const addArticle = async (article: NewArticle): Promise<DocumentReference> => {
    try {
      const docRef = await addDoc(collection(db, ARTICLES_COLLECTION), {
        ...article,
        createdAt: serverTimestamp()
      });
      return docRef;
    } catch (error) {
      console.error("Error adding article: ", error);
      throw new Error("Failed to add article.");
    }
  };
  
export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
    try {
        const q = query(collection(db, ARTICLES_COLLECTION), where("slug", "==", slug), limit(1));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return null;
        }
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate(),
        } as Article;
    } catch (error) {
        console.error("Error getting article by slug: ", error);
        throw new Error("Failed to get article.");
    }
}
  
  export const updateArticle = async (articleId: string, article: Partial<Omit<NewArticle, 'createdAt'>>): Promise<void> => {
    try {
      const articleRef = doc(db, ARTICLES_COLLECTION, articleId);
      await updateDoc(articleRef, article);
    } catch (error) {
      console.error("Error updating article: ", error);
      throw new Error("Failed to update article.");
    }
  };
  
  export const deleteArticle = async (articleId: string): Promise<void> => {
    try {
      const articleRef = doc(db, ARTICLES_COLLECTION, articleId);
      await deleteDoc(articleRef);
    } catch (error) {
      console.error("Error deleting article: ", error);
      throw new Error("Failed to delete article.");
    }
  };

  export const seedArticles = async () => {
    try {
        const articlesCollection = collection(db, ARTICLES_COLLECTION);
        const querySnapshot = await getDocs(articlesCollection);
        if (querySnapshot.empty) {
            console.log("Articles collection is empty, seeding with sample data...");
            const batch = writeBatch(db);
            sampleArticles.forEach((article) => {
                const docRef = doc(articlesCollection);
                batch.set(docRef, article);
            });
            await batch.commit();
            console.log("Sample articles have been added to Firestore.");
        }
    } catch (error) {
        console.error("Error seeding articles: ", error);
    }
};

// ----------------- SETTINGS -----------------

export const updateSettings = async (settings: Partial<NewSiteSettings>): Promise<void> => {
    try {
      const settingsRef = doc(db, SETTINGS_COLLECTION, 'global');
      await setDoc(settingsRef, settings, { merge: true });
    } catch (error) {
      console.error("Error updating settings: ", error);
      throw new Error("Failed to update settings.");
    }
};

export const seedSettings = async () => {
    try {
      const settingsRef = doc(db, SETTINGS_COLLECTION, 'global');
      const docSnap = await getDoc(settingsRef);
      if (!docSnap.exists()) {
        console.log("Settings document not found, seeding with sample data...");
        await setDoc(settingsRef, sampleSettings);
        console.log("Sample settings have been added to Firestore.");
      }
    } catch (error) {
      console.error("Error seeding settings: ", error);
    }
};


// ----------------- INTAKE -----------------

export const addIntake = async (intake: NewIntake): Promise<DocumentReference> => {
  try {
    const docRef = await addDoc(collection(db, INTAKES_COLLECTION), {
      ...intake,
      submittedAt: serverTimestamp() 
    });
    return docRef;
  } catch (error) {
    console.error("Error adding intake: ", error);
    throw new Error("Failed to submit intake form.");
  }
};

export const deleteIntake = async (intakeId: string): Promise<void> => {
  try {
    const intakeRef = doc(db, INTAKES_COLLECTION, intakeId);
    await deleteDoc(intakeRef);
  } catch (error)
    {
    console.error("Error deleting intake: ", error);
    throw new Error("Failed to delete intake submission.");
  }
};

    