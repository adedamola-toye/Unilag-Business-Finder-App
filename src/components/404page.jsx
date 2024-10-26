import React from "react";
import {NavLink} from "react-router-dom"

//this page is to inform and redirect the user incase they entered a wrong url
export default function NotFoundPage(){
    return(
        <>
        <div className="h-screen bg-blue-900 text-white rounded flex justify-center items-center ">
            <div className="">
                <h1 className="text-[200px] text-center">404</h1>
         <h1 className="text-center">Oops! Page Not Found</h1>
         <div className="text-center leading-8">
        <p>Seems you are trying to access a page that does not exist or was probably deleted.</p>
         <p>We apologize for the incovenience</p>
         </div>
         <div className="flex justify-center items-center bg-black rounded p-5 opacity-2 "> 
         <NavLink to="/" className="text-md text-center">Back to Home</NavLink>
         </div>
         </div>
        </div>
        </>
    )
}