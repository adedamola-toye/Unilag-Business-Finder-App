import { mapFirebaseError } from '../../../utils/firebaseErrors';
import { getFirestore, doc, setDoc, collection, getDocs, getDoc } from 'firebase/firestore';
import { auth } from '../../../firebase/firebaseConfig';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut as firebaseSignOut,
} from 'firebase/auth';
import { mapFirebaseUserToSerializable } from '../../../utils/firebaseUserToSerializable';

const db = getFirestore();

// Sign up with email and password
export const signUp = async (username, email, password, userType) => {
    try {
        if (!email) throw new Error('Email is required');

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = mapFirebaseUserToSerializable(userCredential.user);

        const userTypeToSave = userType || 'defaultUserType';

        await setDoc(doc(db, 'users', user.uid), {
            username,
            email,
            userType: userTypeToSave,
        });

        localStorage.setItem('userType', userTypeToSave);
        return { ...user, username, userType: userTypeToSave };
    } catch (error) {
        console.log('Error signing up:', error);
        throw new Error(mapFirebaseError(error.code));
    }
};

// Log in with email and password
export const loginWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = mapFirebaseUserToSerializable(userCredential.user);

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (!userDoc.exists()) {
            throw new Error('User data not found');
        }

        const userData = userDoc.data();
        const userType = userData.userType || 'defaultUserType';

        localStorage.setItem('userType', userType);
        return { ...user, userType };
    } catch (error) {
        throw new Error(mapFirebaseError(error.code));
    }
};

// Sign in with Google
export const signInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = mapFirebaseUserToSerializable(result.user);

        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        let userType = 'defaultUserType';
        if (userDocSnap.exists()) {
            userType = userDocSnap.data().userType;
        } else {
            // Set userType explicitly here if it's not set in Firestore
            await setDoc(userDocRef, {
                username: user.displayName || 'Google User',
                email: user.email,
                userType,
            });
            localStorage.setItem('userType', userType); // Save userType in localStorage
        }

        return { ...user, userType };
    } catch (error) {
        throw new Error(mapFirebaseError(error.code));
    }
};


// Get user's email by username
export const getUserEmailByUsername = async (username) => {
    const usersCollection = await getDocs(collection(db, 'users'));
    let email = null;

    usersCollection.forEach((doc) => {
        if (doc.data().username === username) {
            email = doc.data().email;
        }
    });

    return email;
};

// Sign out
export const customSignOut = async () => {
    try {
        await firebaseSignOut(auth);
        localStorage.removeItem('userType')
        localStorage.removeItem('authToken')
    } catch (error) {
        throw new Error(mapFirebaseError(error.code));
    }
};

// Get user type
export const getUserType = () => localStorage.getItem('userType') || 'defaultUserType';
