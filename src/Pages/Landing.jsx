import { Container, Row, Col, Card } from "react-bootstrap";
import "../Css/Landing.css";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import UseServices from "../Component/UseServices";
import { API_URL } from "../App";
import Useprojects from "../Component/UseProjects";
function Landing() {
  const location = useLocation();
  const lang = location.pathname.split("/")[1] || "en";
  const { services } = UseServices(lang);
  const { projects } = Useprojects(lang);
  let linkToServices;
  if (location.pathname === "/") {
    linkToServices = `/${lang}/services`;
  } else if (location.pathname === "/en" || location.pathname === "/ar") {
    linkToServices = "services";
  }
  let linkToContact;
  if (location.pathname === "/") {
    linkToContact = `/${lang}/contact`;
  } else if (location.pathname === "/en" || location.pathname === "/ar") {
    linkToContact = "contact";
  }
  return (
    <>
      {/* SERVICES */}
      <section className="main_margin_section">
        <Container fluid className=" px-5 pt-1 cont_service_home">
          <h2 className="titleof_section_home text-center ">
            {lang === "ar" ? "الخدمات" : "Services"}{" "}
            <hr className="hr_line_home" />
          </h2>
          <Row>
            {services.map((service) => (
              <>
                <Col xl={3} md={6} sm={12}>
                  <Card className="card_service_home ">
                    <Card.Img
                      src={`${API_URL}/uploads/${service.image}`}
                      alt="Card image"
                      className="service_home_img"
                    />
                    <Card.ImgOverlay className="card_overlay_home">
                      <Card.Title className="title_card_service_home">
                        {service.title}
                      </Card.Title>
                      <div className="d-flex justify-content-center">
                        <Link
                          to={linkToServices}
                          className="browse_service_home"
                        >
                          {lang === "ar" ? "تصفح الخدمة" : "Browse the service"}
                          <CiSettings />
                        </Link>
                        <Card.Text>
                          <Link to={linkToContact}>
                            <button className="main_btn_home btn_service_home">
                              {lang === "ar" ? "تواصل معنا" : "Contact Us"}{" "}
                              <FaPhoneAlt lassName="ms-2" />
                            </button>
                          </Link>{" "}
                        </Card.Text>
                      </div>
                    </Card.ImgOverlay>
                  </Card>
                </Col>
              </>
            ))}
          </Row>
        </Container>
      </section>

      {/* PROJECTS */}
      <section className="main_margin_section">
        <Container className="">
          <h2 className="titleof_section_home text-center ">
            {lang === "ar" ? "المشاريع" : " Projects "}
            <hr className="hr_line_home" />
          </h2>
          <Row className="gallery-row">
            {projects.length > 0 &&
              projects.map(
                (project, projectIndex) =>
                  project.ProjectImages &&
                  project.ProjectImages.length > 0 && (
                    <>
                      <Col xl={3} md={6} sm={12}>
                        <img
                          key={projectIndex}
                          src={`${API_URL}/uploads/${project.ProjectImages[0].image}`}
                          alt={`Project ${projectIndex + 1} Image`}
                          height="235px"
                          className="img_project_home"
                        />
                      </Col>
                    </>
                  )
              )}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Landing;
