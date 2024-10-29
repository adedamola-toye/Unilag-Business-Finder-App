import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LogIn from "../pages/Login";

import NotFoundPage from "./404page";
import AddBusiness from "../pages/AddBusiness";
import ModalProvider from "../contexts/ModalProvider";


export default function GeneralRouter(){
    return(
           <ModalProvider>
           <nav className="bg-accent">
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/login" element={<LogIn/>}/>
                <Route path="/addbiz" element={<AddBusiness/>}/>
                {/* <Route path="/signup" element={<SignUp/>}/> */}
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
           </nav>
           </ModalProvider>
    );
}