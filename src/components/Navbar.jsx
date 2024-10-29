import { Link } from "react-router-dom";
import { useContext } from "react";
import ModalContext from "../contexts/ModalContext";
import './custom.css';

export default function NavBar() {
    const {openModal}= useContext(ModalContext)
    const handleNavLinkClick = (event) => {
        event.preventDefault();
        openModal()
    }
    
    return (
        <nav className="uppercase">
            <ul className="flex list-none space-x-20 text-[16px] lg:text-[22px] lg-max:text-[20px] cus">
                <li>
                    <Link
                        to="/"
                        className="decoration-black hover:bg-complementary p-3 xl:px-5 transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        to="/addbiz"
                        onClick={handleNavLinkClick}
                        className="decoration-black hover:bg-complementary p-3 transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        Explore Businesses
                    </Link>
                </li>
                <li>
                    <Link
                        to="/signup"
                        onClick={handleNavLinkClick}
                        className="decoration-black bg-complementary p-3 px-10 rounded hover:bg-main transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        Sign Up
                    </Link>
                </li>
                <li>
                    <Link
                        to="/login"
                        onClick={handleNavLinkClick}
                        className="decoration-black p-3 px-10 rounded border-4 border-complementary hover:bg-complementary transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        Log In
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
