import {useState} from "react"
import { Link } from "react-router-dom"
import UnilagLogo from "../assets/unilag-logo.svg";
import NavBar from "./Navbar";
import "../App.css";
import { FaTimes } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";


export default function Header() {
  const [onClick, setOnClick] = useState(false);
  const handleClick = () => {
    setOnClick(!onClick)
  }
  const navContent = <>
    <div className="lg:hidden block absolute top-[80px] w-full h-[50vh] left-0 right-0 bg-main transition text-center">
      <div className="border border"></div>
    <ul className="list-none space-y-10 m-10">
                <li><Link to="/" className="decoration-black hover:bg-complementary p-3">Home</Link></li>
                <li ><Link to = "/addbiz" className="decoration-black hover:bg-complementary p-3">Explore Businesses</Link></li>
                <li><Link to="/signup" className="decoration-black hover:bg-complementary p-3">Sign Up</Link></li>
                <li><Link to="/login" className="decoration-black hover:bg-complementary p-3">Log In</Link></li>
    </ul>
    </div>
  </>
  return (
    <header className="flex items-center justify-between bg-main text-accent z-50 px-[30px] py-3 lg:px-5 lg:py-5 lg:pr-[90px]">
      <div className="flex space-x-3 pl-7">
        <img src={UnilagLogo} alt="Unilag Logo" className="w-[60px] h-[60px]"/>
        <h2 className="text-[25px] text-center mt-3">Unilag BizFinder</h2>
      </div>

      <div className="hidden lg:block">
        <NavBar />
      </div>


      {onClick && (
    <div>
      {navContent}
    </div>
  )}

      <button className="block lg:hidden transition" onClick={handleClick}>
        {onClick ? <FaTimes size={30}/> : <CiMenuBurger size={30}/>}
      </button>
    </header>
  );
}

