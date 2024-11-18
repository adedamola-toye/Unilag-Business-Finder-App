import { database } from '../../../firebase/firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';


export const getAllBlogPosts = async () => {   
    try {
        const querySnapshot = await getDocs(collection(database, 'blogPosts'));
        const blogData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        return blogData;
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        throw error;
      }
    }
