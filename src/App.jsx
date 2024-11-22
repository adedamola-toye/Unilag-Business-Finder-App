import GeneralRouter from "./components/GeneralRouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logoutUser, setLoading } from "./redux/features/auth/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { mapFirebaseUserToSerializable } from "./utils/firebaseUserToSerializable";



function App() {
  const dispatch = useDispatch();
  const {loading} = useSelector(state =>state.auth)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const serializableUser = mapFirebaseUserToSerializable(user)
            dispatch(setUser(serializableUser));
        } else {
            dispatch(logoutUser());
        }
        dispatch(setLoading(false));  // Ensure this is always called to hide the loading state
    });
    return unsubscribe;
}, [dispatch]);


  if (loading){
    return <div>Loading...</div>
  }

  return (
    <>
      {/* <Header/> */}
      <div className="font-customFont">
    <ErrorBoundary>
      
      <GeneralRouter/>
      
    </ErrorBoundary>
    </div>
      {/* <Footer/> */}

      </>

  )}

  export default App


