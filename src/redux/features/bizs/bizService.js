import React from "react";
import { database } from '../../../firebase/firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';


export const getAllBusinesses = async () => {   
    try {
        const querySnapshot = await getDocs(collection(database, 'businesses'));
        const businessData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        return businessData;
      } catch (error) {
        console.error("Error fetching businesses:", error);
        throw error;
      }
    }
