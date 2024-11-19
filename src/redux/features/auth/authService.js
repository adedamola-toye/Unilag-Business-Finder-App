import { getFirestore, doc, setDoc, collection, getDocs, getDoc } from 'firebase/firestore';
import { auth } from '../../../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';

const db = getFirestore();

// Sign up with email and password
export const signUp = async (username, email, password, userType) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userTypeToSave = userType || 'defaultUserType'

        // Store username and email in Firestore under the user's UID
        await setDoc(doc(db, 'users', user.uid), {
            username,
            email,
            userType:userTypeToSave,
        });

        return { uid: user.uid, username, email, userType:userTypeToSave };
    } catch (error) {
        throw error;
    }
};

// Get user's email by username
export const getUserEmailByUsername = async (username) => {
    const usersCollection = await getDocs(collection(db, "users"));
    let email = null;

    usersCollection.forEach((doc) => {
        if (doc.data().username === username) {
            email = doc.data().email;
        }
    });

    return email;
};

// Log in with username and password
export const loginWithEmail = async (email, password) => {
    // eslint-disable-next-line no-useless-catch
    try {
       const userCredential = await signInWithEmailAndPassword(auth, email, password)
       const uid = userCredential.user.uid;

       const userDoc = await getDoc(doc(db, 'users', uid))
       if(!userDoc.exists()){
        throw new  Error('User data not found')
       }
       const userData = userDoc.data()

       if(!userData){
        throw new Error("User data  not found")
       }
       const userType = userData.userType || 'defaultUserType';
       return {uid, email, userType}
    } catch (error) {
        throw error;
    }
};

// Sign in with Google
export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    // eslint-disable-next-line no-useless-catch
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userDocRef = doc(db, 'users', user.uid);

        const userDocSnap = await getDoc(userDocRef);
        let userTypeToSave;

        if(userDocSnap.exists()){
            userTypeToSave = userDocSnap.data().userType;
        }
        else{
            userTypeToSave = 'defaultUserType';
            await setDoc(userDocRef, {
                username: user.displayName,
                email: user.email,
                userType:userTypeToSave
            })
        }
        return {uid: user.uid, username: user.displayName, email:user.email,userType:userTypeToSave};
        
    } catch (error) {
        throw error;
    }
};

export const customSignOut = async() =>{
    return firebaseSignOut(auth)
}
