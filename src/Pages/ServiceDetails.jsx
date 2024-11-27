import { Container, Row, Col } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../App";
import { useParams } from "react-router-dom";
import Useprojects from "../Component/UseProjects";
function ServiceDetails() {
  const { id } = useParams();
  const lang = location.pathname.split("/")[1] || "en";
  const [servicedetails, setServiceDetails] = useState(null);
  const [features, setFeatures] = useState([]);
  const [adv, setAdv] = useState([]);
  const { projects } = Useprojects(lang);
  console.log("first service", projects);
  const getServiceDetails = useCallback(async () => {
    try {
      const [servdetailsRes, featurseRes, AdvRes] = await Promise.all([
        axios.get(`${API_URL}/services/getservicebyid/${id}/${lang}`),
        axios.get(
          `${API_URL}/featureservices/featureservicesbyservice_Id/${id}/${lang}`
        ),
        axios.get(
          `${API_URL}/advantages/getadvantagesnbyservicesid/${id}/${lang}`
        ),
      ]);
      setServiceDetails(servdetailsRes.data);
      setFeatures(featurseRes.data);
      setAdv(AdvRes.data);
    } catch (error) {
      console.error("Error fetching service details:", error);
    }
  }, [id, lang]);

  useEffect(() => {
    getServiceDetails();
  }, [getServiceDetails]);

  if (!servicedetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="main_margin_section">
        <Container>
          <Row>
            {/* IMAGE SECTION */}
            <Col xl={3} md={6} sm={12} className="cont_img_servicedetaile">
              <img
                src={`${API_URL}/uploads/${servicedetails.image}`}
                alt="servicedetails"
                className="img_servicedetails rounded-circle"
              />
            </Col>
            {/* DEATILS SECTION */}
            <Col xl={6} md={6} sm={12}>
              <h2 className="title_servicedetails">{servicedetails.title} </h2>
              <h6 className="desc_servicedetails">
                {servicedetails.description}
              </h6>
            </Col>

            {/* FEATURES SECTION */}
            <Col xl={3} md={6} sm={12} className="cont_features_dervicedetails">
              {features.map((feature) => (
                <>
                  <div className="d-flex align-items-center">
                    <img
                      src={`${API_URL}/uploads/${feature.image}`}
                      alt="features"
                      height={"50px"}
                      width={"50px"}
                    />
                    <h5>{feature.title}</h5>
                  </div>
                </>
              ))}
            </Col>
          </Row>
          <Row className="mt-5">
            <Col xl={12} md={12} sm={12}>
              <h2 className="adv_servicedetails">
                Advantages of natural grass for gardens:
              </h2>
              <ul>
                {adv.map((advantage) => (
                  <>
                    <li className="listof_adv_servicedetails">
                      {advantage.title}
                    </li>
                  </>
                ))}
              </ul>
            </Col>
          </Row>
          <Row className="mt-5">
            <h2 className="adv_servicedetails">Pictures of our work</h2>
            {projects && projects.length > 0 ? (
              <>
                {projects.slice(0, 4).map((project, index) =>
                  project.ProjectImages && project.ProjectImages.length > 0 ? (
                    <Col key={index} xl={3} md={6} sm={12} className="mb-2">
                      <img
                        src={`${API_URL}/uploads/${project.ProjectImages[0].image}`} // Get first image of the project
                        alt="our work"
                        height="200px"
                        width="100%"
                        className="rounded"
                      />
                    </Col>
                  ) : (
                    <div key={index} className="col-12 mb-2">
                      <p>No images available for this project.</p>
                    </div>
                  )
                )}
              </>
            ) : (
              <div>No Projects Found</div>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default ServiceDetails;
