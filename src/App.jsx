import GeneralRouter from "./components/GeneralRouter";
import ErrorBoundary from "./components/ErrorBoundary"

export default function App() {
  return (
    <>
     <ErrorBoundary>
      <GeneralRouter/>
     </ErrorBoundary>
    </>
  )
}


