import { Container, Row, Col } from "react-bootstrap";
function TermsAndConditions() {
  const lang = location.pathname.split("/")[1] || "en";

  return (
    <>
      <section className="main_margin_section">
        <Container>
          <Row>
            <Col xl={12} md={12} sm={12}>
              <h1 className="mb-3">
                {lang === "ar" ? "الشروط والاحكام" : "Terms And Conditions"}
              </h1>
              <h6>
                A privacy policy is a statement or legal document (in privacy
                law) that discloses some or all of the ways a party gathers,
                uses, discloses, and manages a customer or clients data.[1]
                Personal information can be anything that can be used to
                identify an individual, not limited to the persons name,
                address, date of birth, marital status, contact information, ID
                issue, and expiry date, financial records, credit information,
                medical history, where one travels, and intentions to acquire
                goods and services.[2] In the case of a business, it is often a
                statement that declares a partys policy on how it collects,
                stores, and releases personal information it collects. It
                informs the client what specific information is collected, and
                whether it is kept confidential, shared with partners, or sold
                to other firms or enterprises.[3][4] Privacy policies typically
                represent a broader, more generalized treatment, as opposed to
                data use statements, which tend to be more detailed and
                specific. The exact contents of a certain privacy policy will
                depend upon the applicable law and may need to address
                requirements across geographical boundaries and legal
                jurisdictions. Most countries have own legislation and
                guidelines of who is covered, what information can be collected,
                and what it can be used for. In general, data protection laws in
                Europe cover the private sector, as well as the public sector.
                Their privacy laws apply not only to government operations but
                also to private enterprises and commercial transactions.
              </h6>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default TermsAndConditions;
