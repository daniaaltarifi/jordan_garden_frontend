import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Row, FloatingLabel, Form, Button } from "react-bootstrap";
import apply from "../assets/apply.webp";
import { API_URL } from "../App";
import { useNavigate } from "react-router-dom";  
import Swal from "sweetalert2"; 
function JobDescription() {
  const { lang, careerid } = useParams();
  const [jobDescription, setJobDescription] = useState(null);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    yearsOfExperience: "",
    uploadCv: null,
    skills: "",
  });
  const navigate = useNavigate(); 

  useEffect(() => {
    axios
      .get(`${API_URL}/careersdescription/getcareerdescriptionbyid/${careerid}/${lang}`)
      .then((response) => {
        setJobDescription(response.data);
      })
      .catch((error) => {
        console.error("Error fetching job description:", error);
      });
  }, [careerid, lang]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("careerId", careerid);
    formDataToSubmit.append("firstName", formData.firstName);
    formDataToSubmit.append("lastName", formData.lastName);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("phoneNumber", formData.phoneNumber);
    formDataToSubmit.append("yearsOfExperience", formData.yearsOfExperience);
    formDataToSubmit.append("skills", formData.skills);

    if (formData.uploadCv) {
      formDataToSubmit.append("uploadCv", formData.uploadCv);
    }

    axios
      .post(`${API_URL}/CreateCareer/createcareer`, formDataToSubmit)
      .then((response) => {
        console.log("Career created successfully:", response.data);
        
      
        Swal.fire({
          title: "The Job is",
          text: "The job application has been successfully submitted.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
      
          navigate("/careers");
        });
      })
      .catch((error) => {
        console.error("Error creating career:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      uploadCv: e.target.files[0],
    });
  };

  if (!jobDescription) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <section className="main_margin_section">
        <Container>
          <p className="title_jobdescr">{jobDescription.position}</p>
          <Row>
            <Col xl={12} md={12} sm={12}>
              <h5 className="resp_jobdesc">
                {lang === "ar" ? "الوصف الوظيفي" : "Job Description:"}
              </h5>
              <p>{jobDescription.job_description}</p>
              <h5 className="resp_jobdesc">
                {lang === "ar" ? "المسؤوليات" : "Responsibilities:"}
              </h5>
              <p>{jobDescription.responsibilities}</p>
              <h5 className="resp_jobdesc">
                {lang === "ar" ? "المتطلبات" : "Requirements:"}
              </h5>
              <p>{jobDescription.requirements}</p>
              <h5 className="resp_jobdesc">
                {lang === "ar" ? "الفوائد" : "Benefits:"}
              </h5>
              <p>{jobDescription.benefits}</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* APPLY FORM POSITION */}
      <section className="main_marign_section">
        <Container className="cont_form_apply ">
          <Row>
            <Col xl={5} md={12} sm={12} className="cont_backg_apply">
              <h5 className="text-center mb-5">
                {lang === "ar" ? "تقدم الآن لهذا الوظيفة" : "Apply Now For this Position"}
              </h5>
              <img
                src={apply}
                alt="apply"
                height={"320px"}
                width={"100%"}
                className="rounded"
              />
            </Col>
            <Col xl={7} md={12} sm={12}>
              <Form noValidate validated={validated} onSubmit={handleSubmit} className="form_data">
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    xl="6"
                    md="12"
                    sm="12"
                    controlId="validationCustom01"
                  >
                    <Form.Label className="input_form">{lang === 'ar' ? "الاسم الاول" : "First name"}</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    xl="6"
                    md="12"
                    sm="12"
                    controlId="validationCustom02"
                  >
                    <Form.Label className="input_form">{lang === 'ar' ? "الاسم الاخير" : "Last name"}</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    xl="6"
                    md="12"
                    sm="12"
                    controlId="validationCustom02"
                  >
                    <Form.Label className="input_form">{lang === 'ar' ? "البريد الالكتروني" : "Email"}</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    xl="6"
                    md="12"
                    sm="12"
                    controlId="validationCustom02"
                  >
                    <Form.Label className="input_form">{lang === 'ar' ? "رقم الهاتف" : "Phone Number"}</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    xl="6"
                    md="12"
                    sm="12"
                    controlId="validationCustom02"
                  >
                    <Form.Label className="input_form">
                      {lang === 'ar' ? "سنوات الخبرة" : "Years Of Experience"}
                    </Form.Label>
                    <Form.Control
                      required
                      type="number"
                      name="yearsOfExperience"
                      value={formData.yearsOfExperience}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    xl="6"
                    md="12"
                    sm="12"
                    controlId="formFile"
                    className="mb-3  cv_file"
                  >
                    <Form.Label className="input_form">{lang === 'ar' ? "السيرة الذاتية" : "Upload CV"}</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={handleFileChange}
                    />
                  </Form.Group>

                  <Form.Label className="input_form">{lang === 'ar' ? "المهارات" : "Skills"}</Form.Label>
                  <FloatingLabel controlId="floatingTextarea2">
                    <Form.Control
                      as="textarea"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      style={{ height: "100px" }}
                    />
                  </FloatingLabel>
                </Row>
                <div className="div_btn_applynow">
                  <Button type="submit" className="btn_apply_now">
                    {lang === 'ar' ? "قدم الان" : "Apply Now"}
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default JobDescription;