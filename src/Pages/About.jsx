import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaPhoneAlt } from "react-icons/fa";
import { useState,useEffect } from "react";
import { API_URL } from "../App";
import axios from "axios";
import "../Css/About.css";
import UseServices from "../Component/UseServices";
import UseLogo from "../Component/UseLogo";
function About() {
  const lang = location.pathname.split("/")[1] || "en";
  const [about, setAbout] = useState([]);
  const [company, setCompany] = useState([]);
const{services}=UseServices(lang)
const {logo}=UseLogo(lang)
  const getAbout = async () => {
    try {
      const [AboutRes, whyCompanyRes] = await Promise.all([
        axios.get(`${API_URL}/about/allaboutes/${lang}`),
        axios.get(`${API_URL}/choose/allchoosecompanies/${lang}`),
      ]);
      setAbout(AboutRes.data);
      setCompany(whyCompanyRes.data);

    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    getAbout();
  }, [lang]);

  return (
    <>
      <section className="main_margin_section">
        <Container>
          <Row>
          {about.map((about) => (
              <>
                <Col xl={6} md={6} sm={12} key={about.id}>
                  <h6 className="title_about_home">
                    {lang === "ar" ? "عن حدائق الاردن" : "ABOUT US"}
                  </h6>
                  <h2>{about.title}</h2>
                  <p>{about.description}</p>
                  <Link to={`/${lang}/contact`}>
                    <button className="main_btn_home">
                      {about.title_btn}
                      <FaPhoneAlt />
                    </button>
                  </Link>
                </Col>
                <Col xl={6} md={6} sm={12}>
                  <img
                    src={`${API_URL}/uploads/${about.image}`}
                    alt="about"
                    height={"400px"}
                    width={"100%"}
                  />
                </Col>
              </>
            ))}
          </Row>
        </Container>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="main_margin_section">
        <Container fluid className=" py-5 cont_why_choose text-center">
          <h3 className="title_why_choose_about">
            {lang === "ar"
              ? "لماذا تختار شركة حدائق الأردن لتنسيق الحدائق؟"
              : " Why choose Jordan Gardens Company for landscaping?"}
          </h3>
          <Row>
            {/* First Column: First two items */}
            <Col xl={4} md={4} sm={12}>
              {company.slice(0, 2).map((comp, index) => (
                <div key={comp.id || index}>
                  <img
                    src={`${API_URL}/uploads/${comp.image}`}
                    alt="cert"
                    height={"50px"}
                    width={"50px"}
                    className="rounded-circle"
                  />
                  <div className="d-flex justify-content-center">
                    <h5 className="text_why_choose_about">{comp.title}</h5>
                  </div>
                </div>
              ))}
            </Col>

            <Col xl={4} md={4} sm={12}>
              {logo.map((log) => (
                <div key={log.id}>
                  <img
                    src={`${API_URL}/uploads/${log.image}`}
                    alt="Logo"
                    height={"220px"}
                    width={"150px"}
                  />
                </div>
              ))}
            </Col>
            <Col xl={4} md={4} sm={12}>
              {company.slice(2, 4).map((comp, index) => (
                <div key={comp.id || index}>
                  <img
                    src={`${API_URL}/uploads/${comp.image}`}
                    alt="cert"
                    height={"50px"}
                    width={"50px"}
                    className="rounded-circle"
                  />
                  <div className="d-flex justify-content-center">
                    <h5 className="text_why_choose_about">{comp.title}</h5>
                  </div>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>
      {/* OUR SERVICES SECTION */}
      <section className="main_margin_section">
        <Container fluid>
          <h2 className="titleof_section_home text-center">
            {lang === "ar" ? "خدماتنا" : " Our Services"}
            <hr className="hr_line_home" />
          </h2>
          <Row>
            {services.map((serv) => (
              <>
                <Col xl={3} md={6} sm={12} className="mb-4">
                  <Card border="warning" className="card_service_about">
                    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                      <img
                        src={`${API_URL}/uploads/${serv.image}`}
                        height={"80px"}
                        width={"80px"}
                        className="rounded-circle"
                        alt="Service"
                      />
                      <Card.Title className="mt-2 title_serv_about">
                        {serv.title}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              </>
            ))}
            <Link
              to={`/${lang}/services`}
              className="d-flex justify-content-center align-items-center"
              style={{ textDecoration: "none" }}
            >
              <button className="main_btn_home ">
                {lang === "ar" ? "شاهد المزيد" : "Show More  "}
              </button>
            </Link>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default About;
