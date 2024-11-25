import { Container, Row, Col, Card, Carousel } from "react-bootstrap";
import customer from "../assets/customer.jpg";
import comment from "../assets/comment.png";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../App";

function HomeSection() {
  const lang = location.pathname.split("/")[1] || "en";
  const [blogsData, setblogsData] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  let linkToBlogs;
  if (location.pathname === "/") {
    linkToBlogs = `/${lang}/blogs`;
  } else if (location.pathname === "/en" || location.pathname === "/ar") {
    linkToBlogs = "blogs";
  }

  const getData = useCallback(async () => {
    try {
      const [blogsRes, feedbackRes] = await Promise.all([
        axios.get(`${API_URL}/blogs/getallblogs/${lang}`),
        axios.get(`${API_URL}/feedbacks/getallfeedbacks/${lang}`), // Added axios.get here to properly fetch feedbacks data
      ]);
      setblogsData(blogsRes.data);
      setFeedbacks(feedbackRes.data);
    } catch (error) {
      console.error("Error fetching blogs or feedbacks", error);
    }
  }, [lang]);

  useEffect(() => {
    if (lang) {
      getData();
    }
  }, [lang, getData]);

  return (
    <>
      <section className="main_margin_section">
        <Container>
          <h2 className="titleof_section_home text-center">
            {lang === "ar" ? "المقالات و المدونات" : " Blog And Articles "}
            <hr className="hr_line_home" />
          </h2>
          <Row>
            {blogsData.length > 0 ? (
              blogsData.map((blog) => (
                <Col xl={4} md={6} sm={12} className="cont_blog_home" key={blog.id}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src={`${API_URL}/uploads/${blog.image}`}
                      height={"200px"}
                      className="blog_img_home"
                    />
                    <Card.Body>
                      <Card.Title className="title_blog_home">
                        {blog.title}
                      </Card.Title>
                      <Card.Text className="blog_desc_home">
                        {blog.description}
                      </Card.Text>
                      <Link to={linkToBlogs}>
                        <button className="main_btn_home w-100">
                          {lang === "ar" ? "اقرأ المزيد" : "Read More"}
                        </button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>{lang === "ar" ? "لا توجد مقالات" : "No articles available"}</p>
            )}
          </Row>
        </Container>
      </section>

      {/* WHY OUR CUSTOMER SAY */}
      <section className="main_margin_section">
        <Carousel fade>
          {feedbacks && feedbacks.length > 0 ? (
            feedbacks.map((feedback) => (
              <Carousel.Item className="cont_slider" key={feedback.id}>
                <img src={customer} alt="slider" className="slider_img" />
                <div className="textof_slider_home">
                  <h4 className="titleof_slide_home">
                    {lang === "ar"
                      ? "ماذا يقول عملائنا عنا؟"
                      : "What our customers say about us?"}
                  </h4>
                  <div className="cont_customer_home">
                    <img src={comment} alt="" />
                    <h6 className="descof_slide_home">{feedback.description}</h6>
                  </div>
                </div>
              </Carousel.Item>
            ))
          ) : (
            <p>{lang === "ar" ? "لا توجد تعليقات" : "No feedback available"}</p>
          )}
        </Carousel>
      </section>
    </>
  );
}

export default HomeSection;
