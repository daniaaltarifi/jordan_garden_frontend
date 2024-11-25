import { Container, Row, Col, Dropdown } from "react-bootstrap";

import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_URL } from "../App";
import UseServices from "../Component/UseServices";

function Projects() {
  const lang = location.pathname.split("/")[1] || "en";
  const [projectCard, setprojectCard] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const {services}=UseServices(lang)
  const getProject = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_URL}/projects/getallprojects/${lang}`
      );
      setprojectCard(response.data);
    } catch (error) {
      console.log("error: ", error);
    }
  }, [lang]);
  const memoProjectCard = useMemo(() => projectCard, [projectCard]);

  useEffect(() => {
    if (lang) {
      getProject();
    }
  }, [lang, getProject]);
  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
    setSelectedLocation(null);
  };
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setSelectedService(null);
  };
  const filteredProjects = useMemo(() => {
    if (selectedService) {
      return memoProjectCard.filter(
        (proj) => proj.service_id === selectedService
      );
    } else if (selectedLocation) {
      return memoProjectCard.filter(
        (proj) => proj.location === selectedLocation
      );
    } else {
      return memoProjectCard;
    }
  }, [selectedService, selectedLocation, memoProjectCard]);

  return (
    <>
      <section className="main_margin_section">
        <Container>
          <Row>
            <Col xl={8} md={6} sm={12}>
              <h2 className="titleof_section_home m-0">
                {lang === "ar" ? "المشاريع" : "  Projects"}
                <hr className="hr_line_home m-0 my-3" />
              </h2>
            </Col>
            <Col xl={2} md={6} sm={12}>
              <Dropdown>
                <Dropdown.Toggle
                  variant="white"
                  id="dropdown-basic"
                  className="border-warning"
                >
                  {lang === "ar" ? "نوع الخدمة" : " service type:  "}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {services.map((service) => (
                    <>
                      <Dropdown.Item
                        key={service.id}
                        as="button"
                        onClick={() => {
                          handleServiceSelect(service.id);
                        }}
                      >
                        {service.title}
                      </Dropdown.Item>
                    </>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col xl={2} md={6} sm={12}>
              <Dropdown>
                <Dropdown.Toggle
                  variant="white"
                  id="dropdown-basic"
                  className="border-warning"
                >
                  {lang === "ar" ? "الموقع" : " Location:  "}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {[...new Set(projectCard.map((pro) => pro.location))].map(
                    (location, index) => (
                      <Dropdown.Item
                        key={index}
                        as="button"
                        onClick={() => {
                          handleLocationSelect(location);
                        }}
                      >
                        {location}
                      </Dropdown.Item>
                    )
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Row>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((proj) => (
                <>
                  <div className="card mb-3 card_project">
                    <div className="row g-0">
                      {proj.ProjectImages.length > 0 && (
                        <>
                          <div className="col-md-4">
                            <img
                              src={`${API_URL}/uploads/${proj.ProjectImages[0].image}`}
                              className="rounded mb-2"
                              alt="project img"
                              height={"200px"}
                              width={"98%"}
                            />
                            <div>
                              {proj.ProjectImages[1] && (
                                <img
                                  src={`${API_URL}/uploads/${proj.ProjectImages[1].image}`}
                                  className="rounded mb-2"
                                  alt="project img"
                                  height={"150px"}
                                  width={"48%"}
                                />
                              )}
                              {proj.ProjectImages[2] && (
                                <img
                                  src={`${API_URL}/uploads/${proj.ProjectImages[2].image}`}
                                  className="rounded mb-2"
                                  alt="project img"
                                  height={"150px"}
                                  width={"48%"}
                                />
                              )}
                            </div>
                          </div>
                        </>
                      )}
                      <div className="col-md-8 cont_card_proj">
                        <div className="card-body">
                          <h3 className="card-title title_project">
                            {proj.title}{" "}
                          </h3>
                          <p className="card-text desc_project">
                            {proj.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <div>No Projects Found</div>
            )}{" "}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Projects;
