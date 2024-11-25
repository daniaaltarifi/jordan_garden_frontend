import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../App"; // Adjust this path if necessary

// Custom hook for fetching projects
const Useprojects = (lang) => {
  const [projects, setprojects] = useState([]);

  useEffect(() => {
    const fetchprojects = async () => {
      try {
        const response = await axios.get(`${API_URL}/projects/getallprojects/${lang}`);
        setprojects(response.data); // Set the fetched projects data
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchprojects();
  }, [lang]); // Run this effect when `lang` changes

  return { projects };
};

export default Useprojects;
