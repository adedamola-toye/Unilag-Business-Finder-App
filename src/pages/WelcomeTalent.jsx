import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from '../components/Footer';
import "../App.css";
import backgroundImage from "../assets/unilag-pic.jpeg";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";  // Import framer-motion for animations

function WelcomeTalent() {
   
    const user = useSelector((state) => state.auth.user);
    console.log('Redux User:', user);
    const username = user?.username || "Talent";
    console.log('Username: ', username);

    const navigate = useNavigate();

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
                    {/* Heading with motion for animation */}
                    <motion.h1
                        className="text-center text-[34px] md:text-[50px] lg:text-[50px] p-5 font-bold"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Welcome {username}!
                    </motion.h1>

                    {/* Animated introductory text */}
                    <motion.div
                        className="flex justify-center items-center"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5 }}
                    >
                        <p className="text-center text-sm md:text-lg lg:text-lg max-w-[1100px] mx-auto">
                            We are thrilled to have you at Unilag BizFinder! As a talent, you can explore exciting job opportunities,
                            apply to positions, and get hired by top businesses on campus. 
                            <br /> Discover local favorites, expand your network, and make the most of your campus experience.
                        </p>
                    </motion.div>

                    {/* Button with hover animation */}
                    <div className="flex justify-center items-center mt-10">
                        <motion.button
                            className="bg-main p-4 rounded text-accent w-[300px] hover:bg-complementary transition duration-300 ease-in-out transform hover:scale-105"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            onClick={() => navigate("/job-openings")}
                        >
                            Explore Job Openings
                        </motion.button>
                    </div>

                    
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default WelcomeTalent;
