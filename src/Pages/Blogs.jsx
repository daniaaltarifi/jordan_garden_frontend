import { Col, Container, Row } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../App";
import { useCallback, useEffect, useMemo, useState } from "react";
function Blogs() {
  const lang = location.pathname.split("/")[1] || "en";
  const [blogsData, setblogsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const getBlogs = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/blogs/getallblogs/${lang}`);
      setblogsData(response.data);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  }, [lang]); 

  // const memoizedBlogsData = useMemo(() => blogsData, [blogsData]);
 
  const memoizedBlogsData = useMemo(() => {
    return searchQuery ? searchResults : blogsData;
  }, [searchQuery, searchResults, blogsData]);

  useEffect(() => {
    if (lang) {
      getBlogs();
    }
  }, [lang, getBlogs]);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter the blogs based on the search query
    const filteredResults = memoizedBlogsData.filter((blog) =>
      blog.title.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filteredResults);
  };
  return (
    <>
      <section className="main_margin_section">
        <Container>
          <h2 className="titleof_section_home m-0">
            {lang === "ar" ? "المدونات" : "  Blogs"}
            <hr className="hr_line_home m-0 my-3" />
          </h2>
            <form className="container-fluid">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="form-control "
                  placeholder= {lang==='ar'? "بحث عن":" Search ..."}
                  aria-label="search"
                  aria-describedby="basic-addon1"
                  value={searchQuery}
                  onChange={handleInputChange}
                />
               
              </div>
            </form>
          <Row>
          {memoizedBlogsData.length > 0 ? (
        memoizedBlogsData.map((blog) => (
          <Col xl={6} md={6} sm={12} key={blog.id}>
            <div className="card mb-3 blog_card">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={`${API_URL}/uploads/${blog.image}`}
                    className="rounded"
                    height="100%"
                    width="100%"
                    alt={blog.title}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h4 className="card-title title_blog">{blog.title}</h4>
                    <p className="card-text desc_blogs">{blog.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        ))
      ) : (
        <div className="text-center">No Blogs Found</div>
      )}

          </Row>
        </Container>
      </section>
    </>
  );
}

export default Blogs;
