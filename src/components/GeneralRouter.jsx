import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import IndividualBusiness from "../pages/IndividualBusiness";
import Blog from "../pages/Blog";
import NotFoundPage from "./404page";
import WelcomeUser from "../pages/WelcomeUser";
import ExploreBusiness from "../pages/ExploreBusiness"
import HireProfessional from "../pages/Hire-A-Professional";
import JobOpenings from "../pages/JobOpenings"
import AllBusinesses from "../pages/AllBusinesses";
import WelcomeBusiness from '../pages/WelcomeBusiness'
import WelcomeTalent from '../pages/WelcomeTalent'
import AddBusiness from "../pages/AddBusiness";


export default function GeneralRouter(){
    return(
           <nav className="bg-accent">
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/explore-business" element={<ExploreBusiness/>}/>
                <Route path="/explore-business/:id" element={<IndividualBusiness/>}/>
                <Route path="/explore-business/show-all" element={<AllBusinesses/>}/>
                <Route path="/explore-business/show-all/:id" element={<IndividualBusiness/>} />
                <Route path="/blog" element={<Blog/>}/>
                <Route path="/hire-a-professional" element={<HireProfessional/>}/>
                <Route path="/job-openings" element={<JobOpenings/>}/>
                <Route path="/add-business" element={<AddBusiness/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
                <Route path="/welcome-user" element={<WelcomeUser/>}/>
                <Route path="/welcome-business" element={<WelcomeBusiness/>}/>
                <Route path="/welcome-talent" element={<WelcomeTalent/>}/>
            </Routes>
           </nav>
    );
}