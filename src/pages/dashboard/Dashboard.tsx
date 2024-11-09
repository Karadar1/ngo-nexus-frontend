import React, { useState } from 'react'
import axios from 'axios';
import { Button } from '../login/Login.styled';
import CreateEvent from '../../components/create-event/CreateEvent';

function Dashboard() {
  const [showCreate, setShowCreate] = useState(false)

  const fetchData = async () => {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
  
    try {
      const response = await axios.get('http://localhost:8181/api/event', {
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token in headers
        },
      });
      console.log('Response data:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (<>
    <div>Dashboard</div>
    <Button onClick={fetchData}>Click me</Button>
    <Button onClick={()=>setShowCreate(!showCreate)}>Click me</Button>
    {showCreate && <CreateEvent />}
  </>
  )
}

export default Dashboard