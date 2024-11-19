import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openModal } from "../redux/features/modal/modalSlice";
import { incrementLikes, setPosts } from "../redux/features/blog/blogSlice";
import PostModal from "./ModalPopuup/PostModal";
import SignupModal from "./ModalPopuup/SignupModal";
import { getAllBlogPosts } from "../redux/features/blog/blogService";
import LoginModal from "./ModalPopuup/LoginModal";


export default function Blog(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, userType} = useSelector((state) => state.auth);
    const {isOpen, modalType} = useSelector((state) => state.modal)
    const {noOfLikes, allPosts} = useSelector((state) => state.blog)
   

    useEffect(() => {  
        const fetchBlogPosts = async() =>{
            const blogData = await getAllBlogPosts();
            if(blogData && blogData != allPosts){
              dispatch(setPosts(blogData))
            }
            
        } 
        fetchBlogPosts();
    }, [dispatch,allPosts])

   
    const handlePostClick = () => {
        if(user){
            // console.log("Opening Login Modal");
            dispatch(openModal("signup"));
        }else{
            // console.log("opening blog-post modal")
            dispatch(openModal("blog-post"));
        }
    }

    const handleLikeClick = () => {
        dispatch(incrementLikes())
    }

    return(
        <>
            <Header/>
        <div className="flex flex-col justify-center items-center h-screen text-2xl text-center z-50">
        <div>
            <div>{user?.name} {userType}</div>
           {allPosts.map((post) => (
             <ul key={post.id}>
                <li>{post.contentTitle}</li>
                <li>{post.content}</li>
             </ul>
           ))}
        </div>
        
        {/*I was trying to implement likes but omo */}
        {/* <button onClick={handleLikeClick}> {noOfLikes}</button> */}

        <button onClick={handlePostClick} className="flex justify-center items-center border border-4 bg-main p-4">Add Post</button>
        </div>

        {modalType === "signup" && <SignupModal/>}
        {isOpen && modalType === "blog-post" && <PostModal />}
        {isOpen && modalType === "login" && <LoginModal />}
        <Footer/>
        </>
    )
}