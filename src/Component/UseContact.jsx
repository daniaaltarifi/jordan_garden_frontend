import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../App"; 

const UseContact = (lang) => {
  const [contact, setcontact] = useState([]);

  useEffect(() => {
    const fetchcontact = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/contacts/getallcontacts/${lang}`
        );
        setcontact(response.data); 
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };

    fetchcontact();
  }, [lang]); 

  return { contact };
};

export default UseContact;
