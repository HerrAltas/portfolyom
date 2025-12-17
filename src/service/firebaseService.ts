
import { initializeApp, getApp, getApps } from "firebase/app";
// Fix named exports from firebase/firestore for the modular SDK
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  Timestamp 
} from "firebase/firestore";
import { BlogPost } from "../types";

// Configuration for Firebase
const firebaseConfig = {
 apiKey: "AIzaSyBtc_Ibt_Ae1mRTMNhMy6Yuw0_b71E7DbQ",
  authDomain: "mustafaaltasportfolio.firebaseapp.com",
  projectId: "mustafaaltasportfolio",
  storageBucket: "mustafaaltasportfolio.firebasestorage.app",
  messagingSenderId: "828233682812",
  appId: "1:828233682812:web:c54b39569e183cdd4fdef9",
  measurementId: "G-X373477Y0T"
};

const isConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY" && firebaseConfig.projectId !== "YOUR_PROJECT_ID";

const app = isConfigured 
  ? (!getApps().length ? initializeApp(firebaseConfig) : getApp())
  : null;

/**
 * Initialize and export the Firestore database instance
 */
export const db = app ? getFirestore(app) : null;

const BLOG_COLLECTION = "blog_posts";

/**
 * Fetches all blog posts from Firestore ordered by creation date
 */
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  if (!db) {
    console.warn("Firestore is not configured. Falling back to static data.");
    return [];
  }

  try {
    const q = query(collection(db, BLOG_COLLECTION), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as BlogPost));
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
};

/**
 * Adds a new blog post to the collection with a current timestamp
 */
export const addBlogPost = async (post: Omit<BlogPost, 'id'>) => {
  if (!db) {
    throw new Error("Firestore is not configured.");
  }

  try {
    const docRef = await addDoc(collection(db, BLOG_COLLECTION), {
      ...post,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding blog post:", error);
    throw error;
  }
};
