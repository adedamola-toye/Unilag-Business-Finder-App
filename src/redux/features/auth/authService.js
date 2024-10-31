import { getFirestore, doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { auth } from '../../../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const db = getFirestore();

// Sign up with email and password
export const signUp = async (username, email, password) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store username and email in Firestore under the user's UID
        await setDoc(doc(db, 'users', user.uid), {
            username,
            email,
        });

        return { uid: user.uid, username, email };
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
export const loginWithUsername = async (username, password) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const email = await getUserEmailByUsername(username);
        if (!email) {
            throw new Error('Username not found');
        }

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { uid: userCredential.user.uid, email };
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

        // Optional: Store Google user's details in Firestore if needed
        const userDoc = doc(db, 'users', user.uid);
        await setDoc(userDoc, {
            username: user.displayName,
            email: user.email,
        }, { merge: true });

        return { uid: user.uid, username: user.displayName, email: user.email };
    } catch (error) {
        throw error;
    }
};
