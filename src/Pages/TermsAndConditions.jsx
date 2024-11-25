import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { API_URL } from "../App";
function TermsAndConditions() {
  const lang = location.pathname.split("/")[1] || "en";
  const [termsandconditions, settermsandconditions] = useState([]);
  const gettermsandconditions = useCallback(async () => {
    try {
      const response = await axios
      .get(
        `${API_URL}/termsandconditions/getalltermsAndConditions/${lang}`
      );
      settermsandconditions(response.data);
    } catch (error) {
      console.log("error: ", error);
    }
  },[lang]);
  useEffect(() => {
    if(lang){
      gettermsandconditions();
    }
  }, [lang,termsandconditions]);
  return (
    <>
      <section className="main_margin_section">
        <Container>
          <Row>
            <Col xl={12} md={12} sm={12}>
              <h1 className="mb-3">
                {lang === "ar" ? "الشروط والاحكام" : "Terms And Conditions"}
              </h1>
              {termsandconditions.map((terms) => (
                <>
                  <h6>
                    {terms.description}
                  </h6>
                </>
              ))}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default TermsAndConditions;
