import { Link } from "react-router-dom";
import { useContext } from "react";
import ModalContext from "../contexts/ModalContext";
import './custom.css';
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";

export default function NavBar() {
    const {openModal}= useContext(ModalContext)
    const user = useSelector((state)=>state.auth.user)
    const dispatch = useDispatch();

    const openSignUp = (event) => {
        event.preventDefault();
        openModal("signup")
    }
    const openLogin = (event) => {
        event.preventDefault();
        console.log("Opening Login Modal");
        openModal("login");
    };

    //Handle sign out
    const handleSignOut = () =>{
        dispatch(signOut());
    }
    
    return (
        <nav className="uppercase">
            <ul className="flex list-none space-x-[35px] text-[16px] lg:text-[16px] cus">
                <li>
                    <Link
                        to="/"
                        className="decoration-black hover:bg-complementary rounded-sm py-3 px-5 xl:px-5 transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        to="/explore"
                        className="decoration-black hover:bg-complementary rounded-sm py-3 px-5 transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        Explore Businesses
                    </Link>
                </li>
                <li>
                    <Link
                        to="/blog"
                        className="decoration-black hover:bg-complementary rounded-sm py-3 px-5 transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        Blog
                    </Link>
                </li>
                {user ? (
                    <li>
                        <Link className="decoration-black bg-complementary p-3 px-10 rounded hover:bg-main transition-all duration-300 ease-in-out transform hover:scale-105" onClick={handleSignOut}>Log out</Link>
                    </li>
                ): (
                    <>
                        <li>
                    <Link
                        to="/signup"
                        onClick={openSignUp}
                        className="decoration-black bg-complementary p-3 px-10 rounded hover:bg-main transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        Sign Up
                    </Link>
                </li>
                <li>
                    <Link
                        to="/login"
                        onClick={openLogin}
                        className="decoration-black p-3 px-10 rounded border-4 border-complementary hover:bg-complementary transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        Log In
                    </Link>
                </li>
                    </>
                )}
                
            </ul>
        </nav>
    );
}
