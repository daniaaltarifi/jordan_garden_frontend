import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Component/Header";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import TopHeader from "./Component/TopHeader";
import Home from "./Pages/Home";
import Footer from "./Component/Footer";
import About from "./Pages/About";
import Projects from "./Pages/Projects";
import Blogs from "./Pages/Blogs";
import Careers from "./Pages/Careers";
import Services from "./Pages/Services";
import ServiceDetails from "./Pages/ServiceDetails";
import JobDescription from "./Pages/JobDescription";
import Contact from "./Pages/Contact";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsAndConditions from "./Pages/TermsAndConditions";
// export const API_URL = "http://localhost:3000";
 export const API_URL = "https://jordangardensbackend.jordangardens.com";

import Cookies from "cookies-js";
import { useState } from "react";
const DirectionHandler = () => {
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";

  useEffect(() => {
    document.body.classList.remove("ltr", "rtl");
    document.body.classList.add(lang === "ar" ? "rtl" : "ltr");
  }, [lang]);

  return null;
};
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!Cookies.get("token")
  );
  useEffect(() => {
    const token = Cookies.get("token");
    console.log("isAuthenticated:", isAuthenticated);
    if (token) {
      setIsAuthenticated(!!token);
    }
  }, []);
  return (
    <>
      <Router>
        <TopHeader />
        <Header />
        <DirectionHandler />
        <Routes>
          <Route
            path="/*"
            element={isAuthenticated ? <Home /> : <Navigate to="/" replace />}
          />

          <Route exact path="/" element={<Login />} />
          <Route exact path="/:lang/signin" element={<Login />} />
          <Route exact path="/" element={<Home />} />

          <Route exact path="/:lang" element={<Home />} />
          <Route exact path="/:lang/about" element={<About />} />
          <Route exact path="/:lang/services" element={<Services />} />
          <Route
            exact
            path="/:lang/servicedetails/:id"
            element={<ServiceDetails />}
          />
          <Route exact path="/:lang/projects" element={<Projects />} />
          <Route exact path="/:lang/blogs" element={<Blogs />} />
          <Route exact path="/:lang/careers" element={<Careers />} />
          <Route
            path="/:lang/jobdescription/:careerid"
            element={<JobDescription />}
          />

          <Route exact path="/:lang/contact" element={<Contact />} />
          <Route exact path="/:lang/signup" element={<SignUp />} />
          <Route exact path="/:lang/signin" element={<Login />} />
          <Route
            exact
            path="/:lang/privacypolicy"
            element={<PrivacyPolicy />}
          />
          <Route
            exact
            path="/:lang/termsandconditions"
            element={<TermsAndConditions />}
          />

          {/* <Route exact path="/contact" element={<Contact />} />
  <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
