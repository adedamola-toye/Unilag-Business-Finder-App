import { Link } from "react-router-dom"

export default function NavBar(){
    return(
        <nav className="uppercase">
            <ul className="flex list-none space-x-20">
                <li><Link to="/" className="decoration-black hover:bg-complementary p-3">Home</Link></li>
                <li><Link to = "/addbiz" className="decoration-black hover:bg-complementary p-3">Explore Businesses</Link></li>
                <li><Link to="/signup" className="decoration-black bg-complementary p-3 px-10 rounded hover:bg-main">Sign Up</Link></li>
                <li><Link to="/login" className="decoration-black p-3 px-10 rounded border-4 border-complementary hover:bg-complementary">Log In</Link></li>
            </ul>
        </nav>
    )
}

