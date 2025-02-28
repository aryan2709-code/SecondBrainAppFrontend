import { Dashboard } from "./pages/dashboard";
import { Signin } from "./pages/signin";
import { Signup } from "./pages/signup";
import { LandingPage } from "./pages/Landingpage";
import { BrowserRouter , Routes , Route } from "react-router-dom" 
import { SharedBrain } from "./pages/Sharedbrain";

function App() {
    return (
      <BrowserRouter>
      <Routes>
        <Route path= "/signup" element = {<Signup />} />
        <Route path = "/signin" element = {<Signin />} />
        <Route path = "/dashboard" element = {<Dashboard />} />
        <Route path = "/" element = {<LandingPage />} />
        <Route path = "/share/:hash" element = {<SharedBrain />}/>
      </Routes>
      </BrowserRouter>
    )
}

export default App