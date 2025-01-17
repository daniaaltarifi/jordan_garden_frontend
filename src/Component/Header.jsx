// Header.js
import { useState } from "react";
import "../Css/Header.css"; // Assuming you have the CSS saved in Nav.css
import { Link } from "react-router-dom";
// import logo from '../assets/logo.png';
import { useNavigate } from "react-router-dom";
import UseLogo from "./UseLogo";
import { API_URL } from "../App";
import Cookies from "js-cookie";
const Header = ({ isAuthenticated ,setIsAuthenticated}) => {
  const navigate = useNavigate();
  const lang = location.pathname.split("/")[1] || "en";
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { logo } = UseLogo(lang);

  const logout = async () => {
    try {
      setIsAuthenticated(false); // Update the state immediately after logout
      Cookies.remove("token");
      navigate(`/${lang}`);
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  const handleSelection = (event) => {
    const newLang = event.target.value;
    setSelectedOption(newLang);
    setDropdownVisible(false);
    navigate(`/${newLang}`);
  };
  return (
    <nav>
      {logo.map((log) => (
        <div className="logo" key={log.id}>
          <img src={`${API_URL}/uploads/${log.image}`} alt="Logo" />
        </div>
      ))}

      <div
        className={`${lang === "ar" ? "hamburger hamburger_ar" : "hamburger"} ${
          isOpen ? "toggle" : ""
        }`}
        onClick={toggleMenu}
      >
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>

      <ul className={`nav-links ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <li>
          <Link to={`${lang}`}>{lang === "ar" ? "الرئيسية" : "Home"} </Link>
        </li>
        <li>
          <Link to={`${lang}/about`}>
            {lang === "ar" ? "عن حدائق الاردن" : " About"}
          </Link>
        </li>
        <li>
          <Link to={`${lang}/services`}>
            {lang === "ar" ? "الخدمات" : "Services"}
          </Link>
        </li>
        <li>
          <Link to={`${lang}/projects`}>
            {lang === "ar" ? "المشاريع" : "Projects"}
          </Link>
        </li>
        <li>
          <Link to={`${lang}/blogs`}>
            {lang === "ar" ? "المدونات" : " Blogs"}
          </Link>
        </li>
        <li>
          <Link to={`${lang}/careers`}>
            {lang === "ar" ? "الوظائف" : " Careers"}
          </Link>
        </li>
        <li>
          <Link to={`${lang}/contact`}>
            {lang === "ar" ? "تواصل معنا" : " Contact"}
          </Link>
        </li>
        <div className="d-flex">
          {isAuthenticated ? (
            <li>
              <button className="Login-button" onClick={logout}>
                {lang === "ar" ? "تسجيل خروج" : "Logout"}
              </button>
            </li>
          ) : (
            <div className="d-flex">
              <li>
                <Link to={`/`}>
                  <button className="Login-button">
                    {" "}
                    {lang === "ar" ? "تسجيل دخول" : "Login"}
                  </button>
                </Link>
              </li>
              <li>
                <Link to={`${lang}/signup`}>
                  <button className="Login-button background_btn">
                    {" "}
                    {lang === "ar" ? "تسجيل حساب" : " Sign Up"}
                  </button>
                </Link>
              </li>
            </div>
          )}

          <div
            className="dropdown-container border-none"
            onClick={toggleDropdown}
          >
            <div className="dropdown-wrapper">
              <select
                className="form-select small-select ms-2"
                value={selectedOption}
                onChange={handleSelection}
              >
                <option value="en">en</option>
                <option value="ar">ar</option>
              </select>
            </div>
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Header;
