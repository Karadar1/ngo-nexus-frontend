import axios from 'axios'
import React, { useLayoutEffect, useState } from 'react'

function Discover() {
    const [events, setEvents] = useState()

    const fetchEvents = async () =>{
        try {
            const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
        
            const response = await axios.get('http://localhost:8181/api/event/all', {
              headers: {
                Authorization: `Bearer ${token}`, // Add Bearer token to headers
              },
            });
        
            console.log('Events:', response.data); // Log or process the response data as needed
            return response.data; // Return the data if you want to use it elsewhere
          } catch (error) {
            console.error('Error fetching events:', error);
            throw error; // Rethrow if you want to handle it in the calling function
          }
    }

    useLayoutEffect(() => {
      fetchEvents()
      
    }, [])

  return (
    <div>Discover</div>
  )
}

export default Discover