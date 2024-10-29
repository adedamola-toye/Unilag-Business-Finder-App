import { useContext } from "react"
import { Link } from "react-router-dom";
import ModalContext from "../../contexts/ModalContext"


function LoginModal(){
    const {currentModal, setCurrentModal, closeModal} = useContext(ModalContext)

    if (currentModal !== "login"){
        return null;
    }

    const switchToSignUpModal = () =>{
        setCurrentModal("signup")
    }
    return(
        
        <div>
            <h2>Log in</h2>
            <form>
            <button  className="border px-3 py-1 bg-main text-accent rounded hover:bg-complementary transition duration-300 ease-in-out transform hover:scale-105" onClick={closeModal}>Close Modal</button>
            <button className="border bg-[#ffffff]">Sign in with Google</button>
            <label>Username</label>
            <input type="text" />
            <label>Password</label>
            <input type="password" />
            <p>Dont have an account with us? <Link to="/Login" className="text-main" onClick={switchToSignUpModal}>Log in</Link></p>
            <button className="border px-3 py-1 bg-main text-accent rounded hover:bg-complementary transition duration-300 ease-in-out transform hover:scale-105"> Sign up</button>
            </form>
        </div>
    )
}
export default LoginModal