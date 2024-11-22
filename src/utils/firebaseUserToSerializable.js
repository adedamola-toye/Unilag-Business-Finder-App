export const mapFirebaseUserToSerializable = (firebaseUser) => {
    // Log the user data to check the available fields
    console.log('Firebase user: in mapper', firebaseUser);
  
    return {
      uid: firebaseUser?.uid,
      email: firebaseUser?.email,
      username: firebaseUser.username || "Default Username", 
      displayName: firebaseUser?.username || null,
      userType: localStorage.getItem("userType") || "default",
    };
  };
  