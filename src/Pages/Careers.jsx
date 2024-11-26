import { Col, Container, Row } from "react-bootstrap";
import "../Css/Careers.css";
import { Link } from "react-router-dom";
import work from "../assets/work.png";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../App";
function Careers() {
  const lang = location.pathname.split("/")[1] || "en";
  const [careers, setCareers] = useState([]);
const getCareers=useCallback(async()=>{
try {
  const res=await axios.get(`${API_URL}/careers/getallcareers/${lang}`);
  setCareers(res.data);
} catch (error) {
  console.error(error);
}
},[lang])
useEffect(()=>{
if(lang){
  getCareers();
}
},[lang,getCareers])

  return (
    <>
      <section className="main_margin_section">
        <Container>
          <h3 className="title_team_careers">Our Amazing Team</h3>
          <h1 className="title_team_careers">Team Members</h1>
          <h6 className="desc_team_carerrs">
            All these services are provided by an integrated and specialized
            team of agricultural engineers, technicians and workers with more
            than 10 years of experience in this field. Enjoy the beauty of
            nature in your gardens with us, and call now to start the journey of
            transforming your garden into a green oasis
          </h6>
          <Row>
            {careers.map((career) => (
              <Col xl={6} md={12} sm={12} key={career.id} className="mt-4 ">
                <div className="card p-4 cont_careers">
                  <div className="d-flex justify-content-between mt-4">
                    <div className="d-flex flex-wrap">
                      <div className="cont_bag_careers">
                        <img src={work} alt="work" height={"35px"} />{" "}
                      </div>
                      <p className="position_name_careers">
                        {career.position}
                      </p>
                    </div>
                    <div>
                      <p>
                        {career.numberOfPositions}{" "}
                        {lang === "ar"
                          ? `وظائف مفتوحة ` 
                          : `position open `}
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <button
                      type="button"
                      className="btn btn_blogs btn_position_careers"
                    >
                      {career.position}{" "}
                    </button>

                    <div className="card-body">
                      <span className="card-text location_careers">
                        {lang === "ar"
                          ? `الموقع ` 
                          : `Location `}
                        :{" "}
                      </span>
                      <span>{career.location}</span>
                      <br />
                      <span className="card-text location_careers">
                        {lang === "ar"
                          ? `الخبرة `
                          : `Experience `}
                        :
                      </span>
                      <span>
                        {career.experience}
                        {lang === "ar"
                          ? `سنوات `
                          : `years `}
                      </span>
                      <br />
                      <br />
                      <Link
                        to={`/${lang}/jobdescription/${career.id}`}
                        className="link_job_desc_careers"
                      >
                        {lang === "ar"
                          ? `وصف الوظيفة ` 
                          : `Job Description
 `}
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Careers;
