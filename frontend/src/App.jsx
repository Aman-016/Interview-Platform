import { useUser } from "@clerk/clerk-react";
import { Routes , Route, Navigate} from "react-router";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ProblemPage from "./pages/ProblemPage";
import ProblemsPage from "./pages/ProblemsPage";
import SessionPage from "./pages/SessionPage";
import { Toaster } from "react-hot-toast";


function App() {
   const { isSignedIn, isLoaded } = useUser();
  return (
        <>
    <Routes>
       <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/problem" element={<ProblemPage />} />
      <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} />
      <Route path="/session" element={<SessionPage />} />
   
    </Routes>
    
      <Toaster toastOptions={{ duration: 3000 }} /> 
     </>
  );
}
export default App;
