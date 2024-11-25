import { Container, Row, Col } from "react-bootstrap";
import terms from "../assets/terms.png";
import privacy from "../assets/privacy.png";
import arrow from "../assets/arrow.png";
import "../Css/Footer.css";
import { Link, useLocation } from "react-router-dom";
import UseLogo from "./UseLogo";
import { API_URL } from "../App";
import UseContact from "./UseContact";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
function Footer() {
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";
  const { logo } = UseLogo(lang);
  const { contact } = UseContact(lang);
  const [content, setContent] = useState([]);

  let linkToPrivacy;
  if (
    location.pathname === "/" ||
    location.pathname.split("/")[1] === "en" ||
    location.pathname.split("/")[1] === "ar"
  ) {
    linkToPrivacy = `/${lang}/privacypolicy`;
  } else {
    linkToPrivacy = `/${lang}/privacypolicy`;
  }
  let linkToTerms;
  if (
    location.pathname === "/" ||
    location.pathname.split("/")[1] === "en" ||
    location.pathname.split("/")[1] === "ar"
  ) {
    linkToTerms = `/${lang}/termsandconditions`;
  } else {
    linkToTerms = `/${lang}/termsandconditions`;
  }
  const getContent = useCallback(async () => {
    try {
      const res = await axios.get(
        `${API_URL}/allcontents/getallcontents/${lang}`
      );
      setContent(res.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }, [lang]);
  useEffect(() => {
    if (lang) {
      getContent();
    }
  }, [lang, getContent]);
  return (
    <>
      <section className="main_margin_section">
        <Container fluid className="cont_footer">
          <Row>
            {logo.map((log) => (
              <>
                <Col xl={3} md={6} sm={12}>
                  <img
                    src={`${API_URL}/uploads/${log.image}`}
                    alt=""
                    height={"150px"}
                    width={"150px"}
                  />
                  <h6 className="desc_footer">{log.description}</h6>
                </Col>
              </>
            ))}
            <Col xl={3} md={6} sm={12}>
              <h4 className="desc_footer">
                {lang === "ar" ? "تواصل معنا" : "Contact-US"}
              </h4>
              <hr className="hr_footer" />
              <div className="col_contact_footer">
                {contact.map((soc) => (
                  <>
                    <div>
                      <img
                        src={`${API_URL}/uploads/${soc.icon}`}
                        alt="phone"
                        height={"25px"}
                        width={"25px"}
                      />{" "}
                      <span className="contact_footer">{soc.content}</span>
                    </div>
                  </>
                ))}
              </div>
            </Col>
            <Col xl={3} md={6} sm={12}>
              <h4 className="desc_footer">
                {lang === "ar" ? "المحتوى" : "All Content"}
              </h4>
              <hr className="hr_footer" />
              <div className="col_contact_footer">
              {content.map((cont) => (
                  <>
                  <Link to={`${lang}/${cont.link}`} style={{textDecoration:"none"}}>
                    <div>
                      <img
                        src={arrow}
                        alt="phone"
                        height={"25px"}
                        width={"25px"}
                      />{" "}
                      <span className="contact_footer">{cont.title}</span>
                    </div>
                  </Link>
                  </>
                ))}
              </div>
            </Col>
            <Col xl={3} md={6} sm={12}>
              <h4 className="desc_footer">
                {lang === "ar" ? "السياسة والخصوصية" : "Legal Information"}
              </h4>
              <hr className="hr_footer" />
              <div className="col_contact_footer">
                <Link to={linkToPrivacy} className="footer_link">
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
                <Link to={linkToTerms} className="footer_link">
                  <div>
                    <img
                      src={terms}
                      alt="phone"
                      height={"20px"}
                      width={"20px"}
                    />{" "}
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
