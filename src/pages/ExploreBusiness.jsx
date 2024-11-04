import React,  {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import AddBusiness from "../pages/AddBusiness";
import { setBizs } from "../redux/features/bizs/bizsSlice";
import { getAllBusinesses } from "../redux/features/bizs/bizService";
import SearchBusiness from "../components/SearchBusiness";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";


export default function ExploreBusiness(){
    const dispatch = useDispatch();
    const {allBizs} = useSelector((state) => state.bizs)

    // console.log(allBizs)

    useEffect(() => {  
        const fetchBusinesses = async() =>{
            const businessData = await getAllBusinesses();
            if(businessData && businessData != allBizs){
              dispatch(setBizs(businessData))
            }
            // console.log(businessData)
        } 
        fetchBusinesses();
    }, [dispatch,allBizs])

    const displayedBusinesses = allBizs.slice(0, 4);

    return(
        <>
            <Header/>
        
            <SearchBusiness/>
       <div className="p-2 lg:p-10 md:p-10">
        <h1 className="text-2xl font-bold px-4 mt-10">Some Businesses</h1>
        <div className="text-md md:text-lg lg:text-lg text-center grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 p-2 md:p-10 lg:p-10"> 
            {displayedBusinesses.map((biz) => (
               <ul key={biz.id} className="mt-5">
                <li>
                <div className="flex justify-center mx-5">
                <div className="w-[250px]">
                <img src={biz.imgUrl} alt={biz.name} className="w-[150px] h-[150px] md:w-[250px] md:h-[250px] lg:w-[250px] lg:h-[250px] rounded-md mb-3 transform transition duration-300 ease-in-out hover:scale-105 rounded-lg shadow-lg"/>
                </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="w-[250px]">
                    <p className="text-[22px]">{biz.name}</p>
                  </div>
                  </div>

                <div className="flex justify-center">
                  <div className="w-[250px]">
                    <p className="text-center text-[17px]">{biz.address}</p>
                  </div>
                </div>
                <Link to={`/explore-business/${biz.id}`} className="text-sm text-main underline underline-offset-4 decoration-main decoration-3">See more...</Link>
                </li>
               </ul>
            ))}
        </div>
        <div className="mt-5 mb-10 flex justify-center items-center">
            <Link to="/explore-business/show-all" className="hover:underline decoration-main font-md ">Show All... <span className="rounded-full bg-main px-4 py-3 text-center text-lg">&#8594;</span> </Link>
        </div>
        </div>

        <AddBusiness/>

        <Footer/>
        </>
    )
}