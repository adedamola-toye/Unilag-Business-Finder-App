import GeneralRouter from "./components/GeneralRouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logoutUser } from "./redux/features/auth/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";



function App() {
  const dispatch = useDispatch();
  const {loading} = useSelector(state =>state.auth)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user){ //If user logged in
        dispatch(setUser({
          user:user,
          userType: user.userType || 'default',
          isAuthenticated:true
        }))
      }
      else{//If user logged out
        dispatch(logoutUser())
      }
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


