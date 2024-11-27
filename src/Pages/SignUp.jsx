import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import auth from "../assets/slide2.jpg";
import "../Css/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

import Swal from "sweetalert2"; 
import { API_URL } from "../App";

function SignUp() {
  const lang = location.pathname.split("/")[1] || "en"; 
  const navigate = useNavigate(); 

  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    repeat_password: "",
    lang: lang, 
  });
  const [error, setError] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault(); 

    
      if (formData.password !== formData.repeat_password) {
        setError(lang === "ar" ? "كلمة المرور غير متطابقة" : "Passwords do not match");
        return;
      }

    
      try {
        const response = await axios.post(`${API_URL}/users/signup`, formData);
        console.log("User created successfully:", response.data);

   
        Cookies.set("user", JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone_number: formData.phone_number
        }), { expires: 7 }); 

       
        Swal.fire({
          title: lang === "ar" ? "تم إنشاء الحساب بنجاح" : "User Created Account Successfully",
          icon: "success",
          confirmButtonText: lang === "ar" ? "موافق" : "OK"
        }).then(() => {
          navigate(`/`); 
        });
      } catch (error) {
        console.error("Error during signup:", error);
        setError(error.response?.data?.message || "There was an error during signup");
      }
    }

    setValidated(true);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col xl={6} md={12} sm={12}>
          <img src={auth} alt="auth img" className="auth_img" />
        </Col>

        <Col xl={6} md={12} sm={12}>
          <h1 className="create_acc_title">{lang === "ar" ? "تسجيل حساب" : "Sign Up"}</h1>
          {error && <div className="alert alert-danger">{error}</div>}

          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="cont_form"
          >
            <Form.Group controlId="validationCustom01" className="input_group_auth">
              <Form.Label>{lang === "ar" ? "اسم المستخدم" : "Name"}</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your Name"
                className="form_input_auth"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="validationCustom02" className="input_group_auth">
              <Form.Label>{lang === "ar" ? "البريد الالكتروني" : "Email"}</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="name@gmail.com"
                className="form_input_auth"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="validationCustomUsername" className="input_group_auth">
              <Form.Label>{lang === "ar" ? "رقم الهاتف" : "Phone No"}</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="0799999999"
                className="form_input_auth"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Phone No.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="validationCustom04" className="input_group_auth">
              <Form.Label>{lang === "ar" ? "كلمة السر" : "Password"}</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                required
                className="form_input_auth"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Password.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="validationCustom05" className="input_group_auth">
              <Form.Label>{lang === "ar" ? "تأكيد كلمة السر" : "Repeat Password"}</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                required
                className="form_input_auth"
                name="repeat_password"
                value={formData.repeat_password}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please confirm your password.
              </Form.Control.Feedback>
            </Form.Group>

            <input type="hidden" name="lang" value={formData.lang} /> 

            <button type="submit" className="Login-button w-50 mt-3">
              {lang === "ar" ? "تسجيل حساب" : "Sign Up"}
            </button>

            <Link to="/login" className="link_auth">
              {lang === "ar" ? "تسجيل دخول" : "Sign In"}
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
