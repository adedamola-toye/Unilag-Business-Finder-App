import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LogIn from "../pages/Login";
import Blog from "../pages/Blog";
import NotFoundPage from "./404page";
import WelcomeUser from "../pages/WelcomeUser";
import ExploreBusiness from "../pages/ExploreBusiness"
import ModalProvider from "../contexts/ModalProvider";


export default function GeneralRouter(){
    return(
           <ModalProvider>
           <nav className="bg-accent">
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/login" element={<LogIn/>}/>
                <Route path="/explore-business" element={<ExploreBusiness/>}/>
                <Route path="/blog" element={<Blog/>}/>
                {/* <Route path="/signup" element={<SignUp/>}/> */}
                <Route path="*" element={<NotFoundPage/>}/>
                <Route path="/welcome-user" element={<WelcomeUser/>}/>
            </Routes>
           </nav>
           </ModalProvider>
    );
}