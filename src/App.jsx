import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Component/Header";
import { useEffect, useState } from "react";
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
export const API_URL = "http://localhost:3000";
import Cookies from "cookies-js";

const DirectionHandler = () => {
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";

  useEffect(() => {
    document.body.classList.remove("ltr", "rtl");
    document.body.classList.add(lang === "ar" ? "rtl" : "ltr");
  }, [lang]);

  return null;
};

const AppContent = () => {
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!Cookies.get("token")
  );

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAuthenticated(!!token);
    }
  }, []);

  const hideHeader = ["/", "/:lang/signin", "/:lang/signup"].some((path) =>
    location.pathname.match(new RegExp(path.replace(":lang", "[a-z]{2}")))
  );

  return (
    <>
      <TopHeader />
      {!hideHeader && <Header />}
      <DirectionHandler />
      <Routes>
        <Route
          path="/*"
          element={isAuthenticated ? <Home /> : <Navigate to="/" replace />}
        />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/:lang/signin" element={<Login />} />
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
        <Route exact path="/signup" element={<SignUp />} />
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
      </Routes>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
