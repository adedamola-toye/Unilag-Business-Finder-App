//import Header from "../../components/Header";
//import Login from '../Login'
import { Link } from "react-router-dom";
import { useContext } from "react";
import ModalContext from "../../contexts/ModalContext";


export default function SignupModal() {
    
  const {currentModal, closeModal, setCurrentModal} = useContext(ModalContext)
  
   const switchToLoginModal = () => {
    setCurrentModal("login")
    console.log("Switching to login")
  }

  if (currentModal !== "signup"){
    return null
  }
   
  return (
    <>
    <div>
        
        <div className={`fixed inset-0 flex justify-center items-center transition-colors`}>
            {/* image */}
            <form>
                <h2>Create an account with us to get started</h2>
                <button onClick={closeModal}  className="border px-3 py-1 bg-main text-accent rounded hover:bg-complementary transition duration-300 ease-in-out transform hover:scale-105">Close Modal</button>
                <button className="border bg-[#ffffff]">Sign in with Google</button>
                <label>Username: </label>
                <input type="text" />

                <label>Email: </label>
                <input type="email" />

                <label>Create Password:</label>
                <input type="password" />

                <label>Confirm password</label>
                <input type="password" />

                <button>Create Account</button>
                <p>Already have an account with us? <Link  className="text-main" onClick={switchToLoginModal}>Log in</Link></p>
                
                <button className="border px-3 py-1 bg-main text-accent rounded hover:bg-complementary transition duration-300 ease-in-out transform hover:scale-105">Sign Up</button>
            </form>
        </div>
      </div>
      
    </>
  );
}


