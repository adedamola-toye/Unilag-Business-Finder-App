//import Header from "../../components/Header";
//import Login from '../Login'
import { Link } from "react-router-dom";
import { useContext } from "react";
import ModalContext from "../../contexts/ModalContext";
import { FaTimes } from "react-icons/fa";

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
   <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
   <div className="bg-[#f2e9e9] rounded-lg shadow-lg w-full lg:w-[700px] p-8 lg:px-[50px] relative mx-4 sm:mx-0">
        <div className="cursor-pointer flex justify-end">
                  <FaTimes size={30} onClick={closeModal}/> 
        </div>
        <h2 className="text-center text-lg  font-semibold mb-6">Create an account with us to get started</h2>
            <form>
                <div className="w-full mb-4">
                  <button className="border-2 border-main bg-[#ffffff] rounded-full p-2 w-full">Sign in with Google</button>
                </div>
                <div className="flex flex-col gap-1">
                <label className="text-main text-md">Username*</label>
                <input type="text" className="p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-main transition"/>

                <label className="text-main text-md">Email*</label>
                <input type="email" className="p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-main transition"/>

                <label className="text-main text-md">Create Password*</label>
                <input type="password" className="p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-main transition"/>

                <label className="text-main text-md">Confirm password*</label>
                <input type="password" className="p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-main transition"/>

                <div className="mt-5">
               <button className=" px-3 py-3 bg-main text-accent rounded hover:bg-complementary transition duration-300 ease-in-out transform hover:scale-105 w-full">Create Account</button>
               </div>
                </div>
                <p className="text-center mt-5">Already have an account with us? <Link  className="text-main" onClick={switchToLoginModal}>Log in</Link></p>
                
                {/* <button className="border px-3 py-1 bg-main text-accent rounded hover:bg-complementary transition duration-300 ease-in-out transform hover:scale-105">Sign Up</button> */}
          
            </form>
        </div>
      </div>
    </>
  );
}


