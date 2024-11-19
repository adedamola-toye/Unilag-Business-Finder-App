import {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../redux/features/modal/modalSlice";
import { collection, addDoc } from 'firebase/firestore';
import { database } from "../../firebase/firebaseConfig";
import { updatePostField, resetPostForm } from "../../redux/features/blog/blogSlice";


export default function PostModal() {
    const dispatch = useDispatch();
    const {isOpen, modalType} = useSelector((state) => state.modal);
    const {name, userType, contentTitle, content} = useSelector((state) => state.blog);
    const [successMessage, setSuccessMessage] = useState('');
    
    const handleFormFieldChange = (e) => {
        const { name, value } = e.target;
          dispatch(updatePostField({ field: name, value }));
      }

    // console.log("Current Modal: ", modalType);
    if(!isOpen || modalType !== "blog-post"){
        return null;
    }

    const handlePostFormSubmit = async (e) => {
        e.preventDefault()
      if (!name || !userType || !content) {
        console.error("Please fill in all fields");
        return;
      }
    
      try {
        const blogCollection = collection(database, 'blogPosts');
    
        const blogData = {
          name: name,
          userType: userType,
          contentTitle: contentTitle,
          content: content
        };
    
        await addDoc(blogCollection, blogData);
        
        setTimeout(() => {
          setSuccessMessage('Post added Succesfully!');
        }, 3000);
    
    
        dispatch(resetPostForm());
        console.log("Form data submitted successfully:", blogData);
        dispatch(closeModal())
      } catch(error) {
        console.error("Error submitting form:", error);
      }
    };
    

    return (
        <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-[#f2e9e9] rounded-lg shadow-lg w-full lg:w-[700px] p-8 lg:px-[50px] relative mx-4 sm:mx-0">
                <div className="cursor-pointer flex justify-end">
                    <FaTimes size={30} onClick={() => dispatch(closeModal())} />
                </div>
                <h2 className="text-center text-lg font-semibold mb-6">Create An Interesting Post</h2>
                <form onSubmit={handlePostFormSubmit}>
                    <div className="flex flex-col gap-1">
                        <label className="text-main text-md">Name *</label>
                        <input type="text" name="name" value={name} onChange={handleFormFieldChange} className="p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-main transition" placeholder="Note: your name will be visible to everyone"  required/>

                        <label className="text-main text-md">Talent or Business *</label>
                        <input type="text" name="userType" value={userType} onChange={handleFormFieldChange} className="p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-main transition" placeholder="e.g: talent"  required/>
                        
                        <label className="text-main text-md">Content Title </label>
                        <input type="text" name="contentTitle" value={contentTitle} onChange={handleFormFieldChange} className="p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-main transition" placeholder="Enter a captivating title (this is optional)"/>

                        <label className="text-main text-md">Content *</label>
                        <textarea type="text" name="content" value={content} onChange={handleFormFieldChange} className="p-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-main transition" placeholder="Tell us more about your post"  required/>
                    </div>

                    {successMessage && <p className='text-lg text-black p-4 text-center'>{successMessage}</p> }

                    <div className="mt-5">
                        <button className="px-3 py-3 bg-main text-accent rounded hover:bg-complementary transition duration-300 ease-in-out transform hover:scale-105 w-full">Post</button>
                    </div>
                 
                </form>
            </div>
        </div>
    )
}


