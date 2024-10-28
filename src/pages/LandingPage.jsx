import Header from "../components/Header";
import '../App.css'
function LandingPage() {
  return (
    <div className="home">
      <Header />
      <div className="h-screen flex justify-center items-center p-10">
        <div>
        <h1 className="text-center text-[34px] md:text-[50px] lg:text-[50px] p-5 font-bold">Welcome To Unilag Biz Finder</h1>
        <div className="flex justify-center items-center">
        <p className="flex justify-center items-center text-center text-sm md:text-lg lg:text-lg max-w-[1100px] mx-auto">
          Looking for a quick snack, the nearest salon or a cozy cafe? Unilag
          BizFinder helps you find and support local campus businesses, track
          your favorites, and explore new places with ease. Start your campus
          journey with us!
        </p>
        </div>
        <div className="flex justify-center items-center mt-10">
          <button className="bg-main p-4 rounded text-accent w-[300px]">Get started</button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default LandingPage;
