import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UnilagLogo from "../assets/unilag-logo.svg";
import NavBar from "./Navbar";
import "../App.css";
import { FaTimes } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { customSignOut } from "../redux/features/auth/authService";
import { setUser } from "../redux/features/auth/authSlice";
import { openModal } from "../redux/features/modal/modalSlice";

export default function Header() {
  const [onClick, setOnClick] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    setOnClick(!onClick);
  };

  const handleLogoClick = () => {
    navigate("/")
}

  const openSignUp = (event) => {
    event.preventDefault();
    dispatch(openModal("signup"));
  };

  const openLogIn = (event) => {
    event.preventDefault();
    console.log("Opening Login Modal");
    dispatch(openModal("login"))
  };

  const handleSignOut = async() => {
    try{
      await customSignOut();
      dispatch(setUser(null))
      navigate("/")
    }catch(error){
      console.log("Error signing out: ", error)
    }
  };

  const navContent = (
    
    <>
      <div className="lg:hidden block absolute top-[80px] w-full h-[50vh] left-0 right-0 z-50 bg-main transition text-center">
        <div className="border border"></div>
        <ul className="list-none space-y-10 m-10 mb-[-20px]">
          <li>
            <Link
              to="/"
              className="decoration-black hover:bg-complementary p-3 "
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/explore-business"
              className="decoration-black hover:bg-complementary p-3"
            >
              Explore Businesses
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              className="decoration-black hover:bg-complementary p-3 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Blog
            </Link>
          </li>
          {user ? (
            <li>
              <Link className="decoration-black hover:bg-complementary p-3" onClick={handleSignOut}>Log out</Link>
            </li>
          ): (
            <>
              <li>
            <Link
              to="/signup"
              onClick={openSignUp}
              className="decoration-black hover:bg-complementary p-3"
            >
              Sign Up
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              onClick={openLogIn}
              className="decoration-black hover:bg-complementary p-3"
            >
              Log In
            </Link>
          </li>
            </>
          )}
          
        </ul>
      </div>
    </>
  );
  return (
    <header className="flex items-center justify-between bg-main text-accent z-50 px-4 py-3 md:px-5 md:py-3 lg:px-8 lg:py-4 lg:pr-[90px]">
      <div onClick={handleLogoClick} className="flex space-x-3 pl-7 cursor-pointer">
        <img src={UnilagLogo} alt="Unilag Logo" className="w-[60px] h-[60px]" />
        <h2 className="text-[25px] text-center mt-3 max-sm:text-[20px]">
          Unilag BizFinder
        </h2>
      </div>

      <div className="hidden lg:block">
        <NavBar />
      </div>

      {onClick && <div>{navContent}</div>}

      <button className="block lg:hidden transition" onClick={handleClick}>
        {onClick ? <FaTimes size={30} /> : <CiMenuBurger size={30} />}
      </button>
    </header>
  );
}
