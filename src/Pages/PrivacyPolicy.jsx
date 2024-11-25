import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { API_URL } from "../App";
function PrivacyPolicy() {
  const lang = location.pathname.split("/")[1] || "en";
  const [privacypolicies, setPrivacypolicies] = useState([]);
  const getPrivacypolicy = useCallback( async () => {
    try {
      const response = await axios.get(
        `${API_URL}/privacypolicy/getallprivacypolicy/${lang}`
      );
      setPrivacypolicies(response.data);
    } catch (error) {
      console.log("error: ", error);
    }
  },[lang]);
  useEffect(()=>{
if(lang){
  getPrivacypolicy()
}
  },[lang,getPrivacypolicy]);
  return (
    <>
      <section className="main_margin_section">
        <Container>
          <Row>
            <Col xl={12} md={12} sm={12}>
              <h1 className="mb-3">
                {lang === "ar" ? "سيا��ة الخصوصية" : "Privacy Policy"}
              </h1>
              {privacypolicies.map((privacy) => (
                <>
                  <h6>
                    {privacy.description}
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

export default PrivacyPolicy;
