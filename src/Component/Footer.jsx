import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/logo.png";
import terms from "../assets/terms.png";
import privacy from "../assets/privacy.png";
import phone from "../assets/phone.png";
import whats from "../assets/whats.png";
import email from "../assets/email.png";
import arrow from "../assets/arrow.png";
import "../Css/Footer.css";
import { Link,useLocation } from "react-router-dom";
function Footer() {
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en"; 
  let linkToPrivacy;
    if (location.pathname === "/" || location.pathname.split("/")[1] === "en" || location.pathname.split("/")[1] === "ar") {
    linkToPrivacy = `/${lang}/privacypolicy`; 
  } else {
    linkToPrivacy = `/${lang}/privacypolicy`; 
  }
  let linkToTerms;
  if (location.pathname === "/" || location.pathname.split("/")[1] === "en" || location.pathname.split("/")[1] === "ar") {
    linkToTerms = `/${lang}/termsandconditions`; 
} else {
  linkToTerms = `/${lang}/termsandconditions`; 
}
  
  return (
    <>
      <section className="main_margin_section">
        <Container fluid className="cont_footer">
          <Row>
            <Col xl={3} md={6} sm={12}>
              <img src={logo} alt="" height={"150px"} width={"150px"} />
              <h6 className="desc_footer">
                Jordan Gardens Company is the best landscaping company in
                Jordan, where we design and landscape home and public gardens,
                supply and install artificial grass f
              </h6>
            </Col>
            <Col xl={3} md={6} sm={12}>
              <h4 className="desc_footer">
                {lang === "ar" ? "تواصل معنا" : "Contact-US"}
              </h4>
              <hr className="hr_footer" />
              <div className="col_contact_footer">
                <div>
                  <img src={phone} alt="phone" height={"25px"} width={"25px"} />{" "}
                  <span className="contact_footer">05-6958712</span>
                </div>
                <div>
                  <img src={whats} alt="phone" height={"25px"} width={"25px"} />{" "}
                  <span className="contact_footer">05-6958712</span>
                </div>
                <div>
                  <img src={email} alt="phone" height={"25px"} width={"25px"} />{" "}
                  <span className="contact_footer">05-6958712</span>
                </div>
              </div>
            </Col>
            <Col xl={3} md={6} sm={12}>
              <h4 className="desc_footer">
                {lang === "ar" ? "المحتوى" : "All Content"}
              </h4>
              <hr className="hr_footer" />
              <div className="col_contact_footer">
              <Link to={`/${lang}`}className="footer_link">
                <div>
                  <img src={arrow} alt="phone" height={"25px"} width={"25px"} />{" "}
                  <span className="contact_footer">Home</span>
                </div>
                </Link>
                <Link to={`/${lang}/about`}className="footer_link">
                <div>
                  <img src={arrow} alt="phone" height={"25px"} width={"25px"} />{" "}
                  <span className="contact_footer">About</span>
                </div>
                </Link>
                <Link to={`/${lang}/services`}className="footer_link">
                <div>
                  <img src={arrow} alt="phone" height={"25px"} width={"25px"} />{" "}
                  <span className="contact_footer">Services</span>
                </div>
                </Link>
                <Link to={`/${lang}/projects`}className="footer_link">
                <div>
                  <img src={arrow} alt="phone" height={"25px"} width={"25px"} />{" "}
                  <span className="contact_footer">Projects</span>
                </div>
                </Link>
                <Link to={`/${lang}/blogs`}className="footer_link">
                <div>
                  <img src={arrow} alt="phone" height={"25px"} width={"25px"} />{" "}
                  <span className="contact_footer">Blogs</span>
                </div>
                </Link>
                <Link to={`/${lang}/careers`}className="footer_link">
                <div>
                  <img src={arrow} alt="phone" height={"25px"} width={"25px"} />{" "}
                  <span className="contact_footer">Careers</span>
                </div>
                </Link>
                <Link to={`/${lang}/contact`}className="footer_link">
                <div>
                  <img src={arrow} alt="phone" height={"25px"} width={"25px"} />{" "}
                  <span className="contact_footer">Contact</span>
                </div>
                </Link>
              </div>
            </Col>
            <Col xl={3} md={6} sm={12}>
              <h4 className="desc_footer">
                {lang === "ar" ? "السياسة والخصوصية" : "Legal Information"}
              </h4>
              <hr className="hr_footer" />
              <div className="col_contact_footer">
                <Link to={linkToPrivacy}className="footer_link">
                <div>
                  <img
                    src={privacy}
                    alt="phone"
                    height={"25px"}
                    width={"25px"}
                    className=""
                  />{" "}
                  <span className="contact_footer">Privacy Policy </span>
                </div>
                </Link>
                <Link to={linkToTerms}className="footer_link">
                <div>
                  <img src={terms} alt="phone" height={"20px"} width={"20px"} />{" "}
                  <span className="contact_footer">Terms & Conditions</span>
                </div>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Footer;
