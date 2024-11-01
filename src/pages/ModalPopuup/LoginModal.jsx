import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModalContext from "../../contexts/ModalContext";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading, setError } from "../../redux/features/auth/authSlice";
import { loginWithUsername, signInWithGoogle } from "../../redux/features/auth/authService";

function LoginModal() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const { currentModal, closeModal, openModal } = useContext(ModalContext);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error)
    const navigate = useNavigate();


    console.log("Current Modal: ", currentModal);
    if (currentModal !== "login") {
        return null;
    }

    const switchToSignUpModal = () => {
        openModal("signup");
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        try{
            const user = await loginWithUsername(username, password);
            dispatch(setUser(user))
            closeModal();
            navigate("/explore-business")
        }
        catch(error){
            dispatch(setError(error.message));
        }
        finally{
            dispatch(setLoading(false));
        }
    }

    //Handle sign up with google
  const handleGoogleSignIn = async() =>{
    dispatch(setLoading(true));
    try{
      const user = await signInWithGoogle();
      dispatch(setUser(user));
      closeModal();
      navigate("/explore-business")
    } 
    catch(error){
      dispatch(setError(error.message))
    }
    finally{
      dispatch(setLoading(false))
    }
  }
    return (
        <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-[#f2e9e9] rounded-lg shadow-lg w-full lg:w-[700px] p-8 lg:px-[50px] relative mx-4 sm:mx-0">
                <div className="cursor-pointer flex justify-end">
                    <FaTimes size={30} onClick={closeModal} />
                </div>
                <h2 className="text-center text-lg font-semibold mb-6">Log in to your account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="w-full mb-4">
                        <button className="border-2 border-main bg-[#ffffff] rounded-full p-2 w-full" onClick={handleGoogleSignIn}>Sign in with Google</button>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-main text-md">Username*</label>
                        <input type="text" className="p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-main transition" value={username} onChange={(e) =>setUsername(e.target.value)} required/>

                        <label className="text-main text-md">Password*</label>
                        <input type="password" className="p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-main transition" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <div className="mt-5">
                        <button className="px-3 py-3 bg-main text-accent rounded hover:bg-complementary transition duration-300 ease-in-out transform hover:scale-105 w-full">{loading ? "Logiing In..." : "Log in"}</button>
                    </div>
                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                    <p className="text-center mt-5">Dont have an account with us? <Link className="text-main" onClick={switchToSignUpModal}>Sign up</Link></p>
                </form>
            </div>
        </div>
    )
}

export default LoginModal;
