import { Link } from "react-router-dom"
function NavBar(){
    return(
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to = "">Explore Businesses</Link></li>
                <li><Link to="">Sign Up</Link></li>
                <li><Link to="">Sign Up</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar