import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
// import LogIn from "../pages/LogIn";
// import SignUp from "../pages/SignUp";
import NotFoundPage from "./404page";

export default function GeneralRouter(){
    return(
           <>
           <nav>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                {/* <Route path="/login" element={<LogIn/>}/> */}
                {/* <Route path="/signup" element={<SignUp/>}/> */}
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
           </nav>
           </>
    );
}