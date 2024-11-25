import Carousel from "react-bootstrap/Carousel";
import { CgMoreO } from "react-icons/cg";
import { FaPhoneAlt } from "react-icons/fa";
import "../Css/Home.css";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Landing from "./Landing";
import HomeSection from "./HomeSection";
import { useEffect, useState } from "react";
import { API_URL } from "../App";
import axios from "axios";
function Home() {
  const lang = location.pathname.split("/")[1] || "en";
  const [heroesData, setHeroesData] = useState([]);
  const [about, setAbout] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const [heroRes, aboutRes] = await Promise.all([
          axios.get(`${API_URL}/heroes/allheros/${lang}`),
          axios.get(`${API_URL}/about/allaboutes/${lang}`),
        ]);
        setHeroesData(heroRes.data);
        setAbout(aboutRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [lang]);

  let learnmoreLink;
  if (location.pathname === "/") {
    learnmoreLink = `/${lang}`;
  } else if (location.pathname === "/en" || location.pathname === "/ar") {
    learnmoreLink = `/${lang}`;
  } else {
    learnmoreLink = `/${lang}`;
  }
  let linkToContact;

  if (location.pathname === "/") {
    linkToContact = `/${lang}/contact`;
  } else if (location.pathname === "/en" || location.pathname === "/ar") {
    linkToContact = "contact";
  }
  return (
    <>
      <section className="margin_section">
        <Carousel fade>
          {heroesData.length > 0 ? (
            heroesData.map((hero) => (
              <Carousel.Item key={hero.id} className="cont_slider">
                <img
                  src={`${API_URL}/uploads/${hero.image}`}
                  alt={hero.title}
                  className="slider_img"
                />
                <div className="textof_slider_home">
                  <h4 className="titleof_slide_home">
                    {hero.title || "No Title"}
                  </h4>
                  <h6 className="descof_slide_home">
                    {hero.description || "No Description"}
                  </h6>
                </div>
                <Carousel.Caption>
                  <Link to={`${learnmoreLink}/${hero.link}`}>
                    <button className="main_btn_home">
                      {hero.title_btn}
                      <CgMoreO className="ms-2" />
                    </button>
                  </Link>
                  <Link to={`${linkToContact}`}>
                    <button className="main_btn_home">
                      Contact Us <FaPhoneAlt lassName="ms-2" />
                    </button>
                  </Link>{" "}
                </Carousel.Caption>
              </Carousel.Item>
            ))
          ) : (
            <p className="loading-text">Loading heroes data...</p>
          )}
        </Carousel>
        {/* ABOUT SECTION */}
      </section>
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
                  <Link to={`${learnmoreLink}/${about.link}`}>
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
      <Landing />
      <HomeSection />
    </>
  );
}

export default Home;
