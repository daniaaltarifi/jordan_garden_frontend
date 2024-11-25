import { Carousel, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import "../Css/Services.css";
import UseServices from "../Component/UseServices";
import { API_URL } from "../App";
function Services() {
  const lang = location.pathname.split("/")[1] || "en";
  const { services } = UseServices(lang);

  return (
    <div className="cont_services">
      <section className="margin_section ">
        <Carousel fade>
          {services.map((servicesCarouselItem) => (
            <Carousel.Item
              className="cont_slider"
              key={servicesCarouselItem.id}
            >
              <img
                src={`${API_URL}/uploads/${servicesCarouselItem.image}`}
                alt="slider"
                className="slider_img"
              />
              <div className="textof_slider_home">
                <h4 className="titleof_slide_home">
                  {servicesCarouselItem.title}{" "}
                </h4>
                <h6 className="descof_slide_home">
                  {servicesCarouselItem.description}
                </h6>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* SERVICES SECTION */}
      <section className="main_margin_section ">
        <Container>
          <Row>
            {services.map((services) => (
              <>
                <Col xl={4} md={6} sm={12} key={services.id}>
                  <Link
                    to={`/${lang}/servicedetails/${services.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card className="card_services">
                      <Card.Img
                        variant="top"
                        src={`${API_URL}/uploads/${services.image}`}
                        height={"250px"}
                      />
                      <Card.Body className="card_body_services">
                        <Card.Title className="title_services">
                          {services.title}
                        </Card.Title>
                        <Card.Text className="desc_services">
                          {services.description}
                        </Card.Text>
                        <div className="d-flex justify-content-center">
                          <Link
                            to={`/${lang}/servicedetails/${services.id}`}
                            className="browse_service_home browse_services_page"
                          >
                            {lang === "ar"
                              ? "تصفح الخدمة"
                              : "Browse the service"}
                            <CiSettings />
                          </Link>
                          <Card.Text>
                            <Link to={`/${lang}/contact`}>
                              <button className="main_btn_home btn_service_home">
                                {lang === "ar" ? "تواصل معنا" : "Contact Us"}{" "}
                                <FaPhoneAlt lassName="ms-2" />
                              </button>
                            </Link>
                          </Card.Text>
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              </>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Services;
