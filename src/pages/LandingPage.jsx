import { useDispatch, useSelector } from "react-redux";
import { openModal } from '../redux/features/modal/modalSlice'
import Header from "../components/Header";
import "../App.css";
import backgroundImage from "../assets/unilag-pic.jpeg";
import SignupModal from "../pages/ModalPopuup/SignupModal";
import LoginModal from "./ModalPopuup/LoginModal";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, modalType } = useSelector((state) => state.modal);

  const handleGetStartedLink = () => {
    dispatch(openModal("signup"));
  };


  const handleExploreAsAGuest = () =>{
    navigate('/explore-business')
  }

  return (
    <div className="home">
      <Header />
      <div
        className="h-screen flex justify-center items-center p-10 bg-[url(backgroundImage)]"
        style={{
          backgroundImage: `linear-gradient(rgba(219, 195, 195, 0.8), rgba(219, 195, 195, 0.8)), url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center">
          <h1 className="text-[34px] md:text-[50px] lg:text-[50px] p-5 font-bold">
            Welcome To Unilag BizFinder
          </h1>
          <p className="text-sm md:text-lg lg:text-lg max-w-[1100px] mx-auto">
            Looking for a quick snack, the nearest salon, or a cozy cafe? Unilag BizFinder helps you find and support local campus businesses, track your favorites, and explore new places with ease. Start your campus journey with us!
          </p>
          
          {/* Section for Exploring vs. Creating an Account */}
          <div className="mt-10">
            <p className="font-bold text-lg">What can you do?</p>
            <div className="flex justify-center mt-5 gap-10">
              <div>
                <h2 className="font-semibold text-xl">Explore as a Guest</h2>
                <ul className="text-sm">
                  <li>Browse businesses near you</li>
                  <li>Read blog posts and reviews</li>
                  <li>Discover new places to visit</li>
                </ul>
                <button
                  className="bg-main p-4 rounded text-accent w-[250px] hover:bg-complementary transition duration-300 ease-in-out mt-4"
                  onClick={handleExploreAsAGuest}
                >
                  Explore as Guest
                </button>
              </div>
              
              <div>
                <h2 className="font-semibold text-xl">Sign Up to Get Started</h2>
                <ul className="text-sm">
                  <li>Create a business listing</li>
                  <li>Apply for jobs and get hired</li>
                  <li>Manage your business profile</li>
                </ul>
                <button
                  className="bg-main p-4 rounded text-accent w-[250px] hover:bg-complementary transition duration-300 ease-in-out mt-4"
                  onClick={handleGetStartedLink}
                >
                  Get Started (Sign Up)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals for Signup and Login */}
      {modalType === "signup" && <SignupModal />}
      {isOpen && modalType === "login" && <LoginModal />}

      <Footer />
    </div>
  );
}

export default LandingPage;
