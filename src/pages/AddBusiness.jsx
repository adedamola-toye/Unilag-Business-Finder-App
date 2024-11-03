import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { ref as dbRef, push } from 'firebase/database';
import { collection, addDoc } from 'firebase/firestore';
import { database } from '../firebase/firebaseConfig';
import { updateField, resetForm } from '../redux/features/bizForm/bizFormSlice.js';


export default function AddBusiness(){
  const dispatch = useDispatch();
  const {name, address, category, tel, email, description, imgUrl} = useSelector((state) => state.bizForm)
  // const [imgFile, setImgFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
      dispatch(updateField({ field: name, value }));
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
  if (!name || !address || !tel || !email || !category || !description) {
    console.error("Please fill in all fields");
    return;
  }

  try {
    const businessCollection = collection(database, 'businesses');

    const businessData = {
      name: name,
      address: address,
      tel: tel,
      email: email,
      category: category,
      description: description,
      imgUrl: imgUrl,
    };

    await addDoc(businessCollection, businessData);

    setSuccessMessage("Business added Succesfully!")
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);


    dispatch(resetForm());
    console.log("Form data submitted successfully:", businessData);
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

  


  return (
    <>
    <div className='flex flex-col p-10 md:mx-[60px] lg:mx-[80px] shadow-sm bg-[#f4dcd5] mb-[60px]'>
    <h1 className="text-center text-md">Add Businesses in Unilag you think should be on this platform</h1>
    <div>
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">

      
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" value={name} onChange={handleChange} placeholder='Name of Business' className="p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-main transition" required />
     

   
      <label htmlFor="Category">Type of Business</label>
      <input type="text" name="category" value={category} onChange={handleChange} placeholder='E.g Restaurant, cafe' className="p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-main transition" required />
     


      <label htmlFor="address">Address:</label>
      <input type="text" name="address" value={address} onChange={handleChange} placeholder='Address of the business' className="p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-main transition"required />
    

      
      <label htmlFor="tel">Tel:</label>
      <input type="number" name="tel" value={tel} onChange={handleChange} placeholder='Call-center of the business' className="p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-main transition" required />
   

    
      <label htmlFor="email">Email:</label>
      <input type="email" name="email" value={email} onChange={handleChange} placeholder='Email address of the business' className="p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-main transition" required />


    
      <label htmlFor="description">Description</label>
      <textarea type="text" name="description" value={description} onChange={handleChange} placeholder='Tell us about this business and why people should patronize or contact it' className="p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-main transition" required />
  

     
      <label htmlFor="image">Image</label>
      <input type="text" name="imgUrl" value={imgUrl} onChange={handleChange} placeholder='paste an image address link to your business' className="p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-main transition" required />
      

        {successMessage && <p className='text-lg text-black p-4 text-center'>{successMessage}</p> }
      <div className='mt-5'>
      <button type="submit" className="px-3 py-3 bg-main text-accent rounded hover:bg-complementary transition duration-300 ease-in-out transform hover:scale-105 w-full">Submit</button>
        </div>

    </form>
 
    </div>
    </div>
    </>
  );
};


