// import { storage } from '../firebase/firebaseConfig';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// export const uploadFileToStorage = async (file) => {
//   const storageRef = ref(storage, `images/${file.name}`);
//   try {
//     await uploadBytes(storageRef, file);

//     const url = await getDownloadURL(storageRef);
//     return url; 
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     throw error;
//   }
// };