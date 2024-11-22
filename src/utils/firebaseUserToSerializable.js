export const mapFirebaseUserToSerializable = (firebaseUser) => ({
    uid: firebaseUser?.uid,
    email: firebaseUser?.email,
    displayName: firebaseUser?.displayName || null,
    userType: localStorage.getItem('userType') || 'default',
  });
  