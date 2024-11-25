import { Container, Row, Col } from "react-bootstrap";
import UseContact from "./UseContact";
import { API_URL } from "../App";
function TopHeader() {
  const lang = location.pathname.split("/")[1] || "en";
const{contact}=UseContact(lang)
  return (
    <Container fluid className="cont_topheader">
      <Row>
        <Col xl={6} md={6} sm={12} className="mt-2">
          Gardens Coordinating in Amman
        </Col>
        <Col xl={6} md={6} sm={12} className="d-flex mt-2">
        {contact.map((soc) => (
            <>
              <div className="d-flex ms-2">
                {/* <Ri24HoursFill className="mt-1" /> */}
                <img
                        src={`${API_URL}/uploads/${soc.icon}`}
                        alt="phone"
                        height={"20px"}
                        width={"20px"}
                      />
                <p className="mx-3"> {soc.content}</p>|
              </div>
            </>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default TopHeader;
