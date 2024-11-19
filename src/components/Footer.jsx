import React from "react";
import UnilagLogo from "../assets/unilag-logo.svg";
import { Link, useNavigate } from "react-router-dom";


export default function Footer(){
    const navigate = useNavigate() 
    const handleLogoClick = () => {
        navigate("/")
    }
    return(
        <>
         <div className="lg:flex md:flex justify-between md:h-[50vh] lg:h-[65vh] space-y-10 bg-main h-[80vh] px-5 py-10 lg:py-[200px] md:py-[200px] md:px-[50px] lg:px-[50px] md:space-y-0 lg:space-y-0">
            <div className="p-3 space-y-3">
               <div onClick={handleLogoClick} className="flex space-x-3 pl-7 cursor-pointer">
                <img src={UnilagLogo} alt="Unilag Logo" className="w-[60px] h-[60px]" />
                <h2 className="text-[30px] text-center mt-3 max-sm:text-[20px]">
                  Unilag BizFinder
                </h2>
                </div>
                <p>No 1, coker street, victoria island, Lagos, Nigeria.</p>
            </div>
            <div className="p-3 flex flex-col gap-2">
                <h1 className="text-lg lg:text-[30px] font-medium">Quick Links</h1>
                <Link to="/" className="hover:underline text-complementary decoration-[#000000]">Home</Link>
                <Link to="/explore-business" className="hover:underline text-complementary decoration-[#000000]">Explore Business</Link>
                <Link to="/hire-a-professional" className="hover:underline text-complementary decoration-[#000000]">Hire A Professional</Link>
                <Link to="/job-openings" className="hover:underline text-complementary decoration-[#000000]">Job Openings</Link>
            </div>
            <div className="p-2">
                <h1 className="text-lg lg:text-[30px] font-medium">Contact</h1>
                <p>+234 070 3456 2980</p>
                <p>unilagbizfinder@gmail.com</p>
            </div>
        </div>
        </>
    )
}