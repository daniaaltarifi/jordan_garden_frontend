import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../App"; // Adjust this path if necessary

// Custom hook for fetching logo
const UseLogo = (lang) => {
  const [logo, setlogo] = useState([]);

  useEffect(() => {
    const fetchlogo = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/logoes/getalllogos/${lang}`
        );
        setlogo(response.data); // Set the fetched logo data
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };

    fetchlogo();
  }, [lang]); // Run this effect when `lang` changes

  return { logo };
};

export default UseLogo;
