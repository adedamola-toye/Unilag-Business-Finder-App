import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from '../components/Footer'
import "../App.css";
import backgroundImage from "../assets/background-pic.jpg";

function WelcomeUser() {
    const location = useLocation();
    const { username } = location.state || {};
    const navigate = useNavigate()
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
                <div>
                    <h1 className="text-center text-[34px] md:text-[50px] lg:text-[50px] p-5 font-bold">
                        
                        Welcome, Business {username}!
                    </h1>
                    <div className="flex justify-center items-center">
                        <p className="text-center text-sm md:text-lg lg:text-lg max-w-[1100px] mx-auto">
                            We’re excited to have you here at Unilag BizFinder! Discover campus businesses, explore local favorites, and make the most of your campus experience.
                        </p>
                    </div>
                    <div className="flex justify-center items-center mt-10">
                        <button
                            className="bg-main p-4 rounded text-accent w-[300px] hover:bg-complementary transition duration-300 ease-in-out transform hover:scale-105"
                            onClick={() => navigate("/")}
                        >
                            Add Business
                        </button>
                        <button
                            className="bg-main p-4 rounded text-accent w-[300px] hover:bg-complementary transition duration-300 ease-in-out transform hover:scale-105"
                            onClick={() => navigate("/hire-a-professional")}
                        >
                            Hire A Professional
                        </button>
                        
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default WelcomeUser;
