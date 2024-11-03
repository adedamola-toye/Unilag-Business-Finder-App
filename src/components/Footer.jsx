import React from "react";
import UnilagLogo from "../assets/unilag-logo.svg";
import { Link } from "react-router-dom";


export default function Footer(){
    return(
        <>
         <div className="lg:flex md:flex justify-between space-y-10 bg-main h-[80vh] px-5 py-10 lg:py-[200px] md:py-[200px] md:px-[50px] lg:px-[50px] md:space-y-0 lg:space-y-0">
            <div className="text-center space-y-3">
               <div className="flex space-x-3 pl-7 ">
                <img src={UnilagLogo} alt="Unilag Logo" className="w-[60px] h-[60px]" />
                <h2 className="text-[30px] text-center mt-3 max-sm:text-[20px]">
                  Unilag BizFinder
                </h2>
                </div>
                <p>No 1, coker street, victoria island, Lagos, Nigeria.</p>
            </div>
            <div className="text-center flex flex-col gap-2">
                <h1 className="text-md lg:text-[30px]">Quick Links</h1>
                <Link className="hover:underline text-complementary decoration-[#000000]">Home</Link>
                <Link className="hover:underline text-complementary decoration-[#000000]">Explore Business</Link>
                <Link className="hover:underline text-complementary decoration-[#000000]">Hire A Professional</Link>
                <Link className="hover:underline text-complementary decoration-[#000000]">Job Openings</Link>
            </div>
            <div className="text-center">
                <h1 className="text-md lg:text-[30px]">Contact</h1>
                <p>+234 070 3456 2980</p>
                <p>unilagbizfinder@gmail.com</p>
            </div>
        </div>
        </>
    )
}