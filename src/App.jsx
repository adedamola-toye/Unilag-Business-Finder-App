import GeneralRouter from "./components/GeneralRouter";
import ErrorBoundary from "./components/ErrorBoundary";
// import Header from "./components/Header";
// import Footer from "./components/Footer"



function App() {


  return (
    <>
      {/* <Header/> */}
      <div className="font-customFont">
    <ErrorBoundary>
      
      <GeneralRouter/>
      
    </ErrorBoundary>
    </div>
      {/* <Footer/> */}

      </>

  )}

  export default App


