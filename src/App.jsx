import GeneralRouter from "./components/GeneralRouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logoutUser, setLoading } from "./redux/features/auth/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { mapFirebaseUserToSerializable } from "./utils/firebaseUserToSerializable";
import { useNavigate } from "react-router-dom";


function App() {
  const dispatch = useDispatch();
  //const {loading, user} = useSelector(state =>state.auth)
  const navigate = useNavigate();
  const {isAuthenticated, userType } = useSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setLoading(true))
        if (user) {
          const serializableUser = mapFirebaseUserToSerializable(user)
          console.log('Serialized User:', serializableUser);

          dispatch(setUser(serializableUser));
        } else {
            dispatch(logoutUser());
        }
        dispatch(setLoading(false)); 
    });
    return unsubscribe;
}, [dispatch]);

useEffect(() => {
  if (isAuthenticated && userType) {
    // Get the current path
    const currentPath = window.location.pathname;

    // Avoid redirecting if already on the welcome page
    if (userType === "talent" && currentPath !== "/welcome-talent") {
      navigate("/welcome-talent");
    } else if (userType === "business" && currentPath !== "/welcome-business") {
      navigate("/welcome-business");
    }
  }
}, [isAuthenticated, userType, navigate]);


/*   if (loading && !user){
    return <div>Loading...</div>
  } */

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


