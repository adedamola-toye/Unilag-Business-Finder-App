
import {useContext } from "react";
import ModalContext from "../contexts/ModalContext";
import Header from "../components/Header";
import "../App.css";
//import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/background-pic.jpg";
import SignupModal from "../pages/ModalPopuup/SignupModal";
import LoginModal from "./ModalPopuup/LoginModal";

function LandingPage() {
  
  //const navigate = useNavigate();
  const {openModal} = useContext(ModalContext)

  const handleGetStartedLink = () => {
    openModal("signup")
  };

  
  

  return (
    <div className="home">
      <Header />
      <div
        className="h-screen flex justify-center items-center p-10 mt-[-30px]bg-[url(backgroundImage)]"
        style={{
          backgroundImage: `linear-gradient(rgba(219, 195, 195, 0.8), rgba(219, 195, 195, 0.8)), url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <h1 className="text-center text-[34px] md:text-[50px] lg:text-[50px] p-5 font-bold">
            Welcome To Unilag BizFinder
          </h1>
          <div className="flex justify-center items-center">
            <p className="flex justify-center items-center text-center text-sm md:text-lg lg:text-lg max-w-[1100px] mx-auto">
              Looking for a quick snack, the nearest salon or a cozy cafe?
              Unilag BizFinder helps you find and support local campus
              businesses, track your favorites, and explore new places with
              ease. Start your campus journey with us!
            </p>
          </div>
          <div className="flex justify-center items-center mt-10">
            <button
              className="bg-main p-4 rounded text-accent w-[300px] hover:bg-complementary transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleGetStartedLink}
            >
              Get started
            </button>
          </div>
        </div>
      </div>
      <SignupModal/>
      <LoginModal/>
    </div>
  );
}

export default LandingPage;
