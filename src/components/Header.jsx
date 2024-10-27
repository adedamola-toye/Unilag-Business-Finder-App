import UnilagLogo from "../assets/unilag-logo.svg";
import NavBar from "./Navbar";
import "../App.css";
function Header() {
  return (
    <header className="flex items-center">
      <div className="logo-and-title">
        <img src={UnilagLogo} alt="Unilag Logo" className="w-6" />
        <h2 className="title">Unilag BizFinder</h2>
      </div>

      <NavBar />
    </header>
  );
}
export default Header;
