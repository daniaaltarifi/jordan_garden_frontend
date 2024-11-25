import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../App'; // Adjust this path if necessary

// Custom hook for fetching services
const UseServices = (lang) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API_URL}/services/allservices/${lang}`);
        setServices(response.data); // Set the fetched services data
      } catch (error) {
        console.error('Error fetching services:', error);
     
      }
    };

    fetchServices();
  }, [lang]); // Run this effect when `lang` changes

  return { services};
};

export default UseServices;
