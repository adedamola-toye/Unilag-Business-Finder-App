import React from "react";
import Header from "../components/Header";
import AddBusiness from "../pages/AddBusiness"

export default function ExploreBusiness(){
    return(
        <>
            <Header/>
        <div className="flex justify-center h-screen text-2xl text-center p-10">
        <div className="space-x-5">
            <input type="text" className="py-3 px-10 rounded-sm lg:w-[600px] md:w-[400px] text-[18px] focus:outline-none focus:ring-1 focus:ring-main transition" placeholder="search businesses in unilag"/>
            <button className="bg-main py-3 px-5 text-[18px] text-accent rounded-sm hover:bg-complementary transition duration-300 ease-in-out transform hover:scale-105 ">Search</button>
        </div>
        </div>

        <AddBusiness/>
        </>
    )
}