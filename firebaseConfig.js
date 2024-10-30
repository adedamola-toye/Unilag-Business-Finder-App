
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvU8s7Re3VIYYrFSDewelkxH1OOIJujf8",
  authDomain: "unilag-bizfinder.firebaseapp.com",
  projectId: "unilag-bizfinder",
  storageBucket: "unilag-bizfinder.appspot.com",
  messagingSenderId: "394992493697",
  appId: "1:394992493697:web:159abbfcea14b39b445980"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export { database };
