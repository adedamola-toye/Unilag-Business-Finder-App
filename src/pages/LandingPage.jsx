import Header from "../components/Header";
import '../App.css'
function LandingPage() {
  return (
    <div className="home">
      <Header />
      <div className="intro">
        <h1>Welcome To Unilag Biz Finder</h1>
        <p>
          Looking for a quick snack, the nearest salon or a cozy cafe? Unilag
          BizFinder helps you find and support local campus businesses, track
          your favorites, and explore new places with ease. Start your campus
          journey with us!
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
