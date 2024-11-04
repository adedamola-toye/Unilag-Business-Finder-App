import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { database } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Header from "../components/Header";
import { fetchFailure, fetchStart, fetchSuccess } from "../redux/features/bizs/bizsSlice";
import Footer from '../components/Footer';


export default function IndividualBusiness(){
    const { id } = useParams(); 
    const dispatch = useDispatch();
    const {currentBusiness, loading, error} = useSelector((state) => state.bizs)

    useEffect(() => {
        const fetchBusiness = async () => {
          dispatch(fetchStart());
          try {
            const businessDoc = doc(database, 'businesses', id);
            const businessSnapshot = await getDoc(businessDoc);
            
            if (businessSnapshot.exists()) {
              dispatch(fetchSuccess(businessSnapshot.data()));
            } else {
              dispatch(fetchFailure('No such business found!'));
            }
          } catch (err) {
            dispatch(fetchFailure('Error fetching business data'));
          }
        };
    
        fetchBusiness();
      }, [dispatch, id]);
    

   

  if (loading) return <p className='text-center'>Loading...</p>;
  if (error) return <p>{error}</p>;
    return(
        <>
        <div>
            <Header/>
        <div className='px-5 py-5 mb-10 md:mt-10 text-center'>
            <div className='shadow-sm flex flex-col py-5 md:py-10 gap-3'>
            <div className='flex justify-center items-center'>
              <img src={currentBusiness.imgUrl} alt={currentBusiness.name} className='w-full md:w-[600px] md:h-[600px]'/>
            </div>
              <h1 className='text-lg font-semibold md:text-2xl'>{currentBusiness.name}</h1>
              <p>{currentBusiness.category}</p>
              <p>{currentBusiness.description}</p>
              <p>Located at: {currentBusiness.address}</p>
              <p>Tel - {currentBusiness.tel}</p>
              <p>Contact - {currentBusiness.email}</p>
        </div>
        </div>

        <Footer/>
        </div>
        </>
    )
}


