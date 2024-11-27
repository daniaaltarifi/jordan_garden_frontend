import { Container, Row, Col, Card } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../App";

function HomeSection() {
  const lang = location.pathname.split("/")[1] || "en";
  const [blogsData, setblogsData] = useState([]);

  let linkToBlogs;
  if (location.pathname === "/") {
    linkToBlogs = `/${lang}/blogs`;
  } else if (location.pathname === "/en" || location.pathname === "/ar") {
    linkToBlogs = "blogs";
  }

  const getData = useCallback(async () => {
    try {
      const [blogsRes] = await Promise.all([
        axios.get(`${API_URL}/blogs/getallblogs/${lang}`),
      ]);
      setblogsData(blogsRes.data);
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

   
    </>
  );
}

export default HomeSection;
