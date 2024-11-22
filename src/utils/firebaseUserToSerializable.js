export const mapFirebaseUserToSerializable = (firebaseUser) => {
    // Log the user data to check the available fields
    console.log('Firebase user:', firebaseUser);
  
    return {
      uid: firebaseUser?.uid,
      email: firebaseUser?.email,
      username: firebaseUser.username || "Default Username", // Fallback order
      displayName: firebaseUser?.username || null,
      userType: localStorage.getItem("userType") || "default",
    };
  };
  