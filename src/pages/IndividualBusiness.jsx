import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { database } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { ref, get } from 'firebase/database';
import Header from "../components/Header";
import { fetchFailure, fetchStart, fetchSuccess } from "../redux/features/bizs/bizsSlice";


export default function IndividualBusiness(){
    const { id } = useParams(); 
    const dispatch = useDispatch();
    const {currentBusiness, loading, error} = useSelector((state) => state.bizs)

    useEffect(() => {
        const businessRef = ref(database, `businesses/${id}`);
    
        get(businessRef)
        .then((snapshot) => {
            console.log('Fetched document data:', snapshot.val());
            
            if (snapshot.exists()) {
                dispatch(fetchSuccess(snapshot.val()));
            } else {
              console.log('No such document!');
            }
          })
          .catch((error) => {
            console.error('Error fetching document:', error);
          });
      }, [id]);

   

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
    return(
        <>
        <div>
            <Header/>
        <div className="flex justify-center items-center h-screen text-2xl text-center">Login Page</div>
        <div>
      <h1>{currentBusiness.name}</h1>
      <p>{currentBusiness.address}</p>
      <p>{currentBusiness.category}</p>
      <p>{currentBusiness.tel}</p>
      <p>{currentBusiness.email}</p>
      <p>{currentBusiness.description}</p>
      <img src={currentBusiness.imgUrl} alt={currentBusiness.name} />
    </div>
        </div>
        </>
    )
}


