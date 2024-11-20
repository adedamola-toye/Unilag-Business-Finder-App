import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvU8s7Re3VIYYrFSDewelkxH1OOIJujf8",
  authDomain: "unilag-bizfinder.firebaseapp.com",
  projectId: "unilag-bizfinder",
  storageBucket: "unilag-bizfinder.appspot.com",
  messagingSenderId: "394992493697",
  appId: "1:394992493697:web:159abbfcea14b39b445980"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
.catch((error) => {
  console.error("Error setting persistence: ", error)
})

export { database, auth };
