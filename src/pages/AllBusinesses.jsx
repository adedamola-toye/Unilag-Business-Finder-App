import React, {useEffect} from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { setBizs } from "../redux/features/bizs/bizsSlice";
import { getAllBusinesses } from "../redux/features/bizs/bizService";

export default function AllBusinesses(){
    const dispatch = useDispatch();
    const {allBizs} = useSelector((state) => state.bizs)

    useEffect(() => {  
        const fetchBusinesses = async() =>{
            const businessData = await getAllBusinesses();
            if(businessData && businessData != allBizs){
              dispatch(setBizs(businessData))
            }
            
        } 
        fetchBusinesses();
    }, [dispatch,allBizs])


    return(
        <>
        <Header/>

        <div className="p-2 mb-10 lg:p-10">
            <p className="text-center text-xl font-medium mt-5 md:mt-10">Businesses in Unilag</p>
        <div className="text-md md:text-lg lg:text-lg text-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2 md:p-10 lg:p-10 "> 
            {allBizs.map((biz) => (
               <ul key={biz.id} className="mt-[40px]">
                <li>
                <div className="flex justify-center items-center mx-5">
                <div className="w-[250px]">
                <img src={biz.imgUrl} alt={biz.name} className="w-[150px] h-[150px] md:w-[250px] md:h-[250px] lg:w-[250px] lg:h-[250px] rounded-md mb-3 transform transition duration-300 ease-in-out hover:scale-105 rounded-lg shadow-lg"/>
                </div>
                </div>
                <div className="flex justify-center items-center">
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
        </div>
        <Footer/>
        </>
    );
}