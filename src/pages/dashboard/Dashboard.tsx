import React, { useState } from 'react'
import axios from 'axios';
import { Button } from '../login/Login.styled';
import CreateEvent from '../../components/create-event/CreateEvent';
import { useUser } from '../../context/UserContext';
import EventCard from '../../components/event-card/EventCard';

function Dashboard() {
  const {user} = useUser()
  console.log(user?.email)

  const [showCreate, setShowCreate] = useState(false)
  const [ngoEvents, setNgoEvents] = useState<{ name: string; location: string; description: string; id: string }[] | undefined>(undefined);
  const fetchData = async () => {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    try {
      const response = await axios.get('http://localhost:8181/api/event', {
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token in headers
        },
      });
      if(user?.isNgo){
        setNgoEvents(response.data.NGO)
      }
      console.log('Response data:', response.data);
      console.log(ngoEvents)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderedNgoEvents = () => {
    return (
      ngoEvents?.map((event: any) => (
        <EventCard 
          key={event.id}  // Adding a unique key if there's an id property
          name={event.name} 
          location={event.location} 
          description={event.description} 
        />
      )) || null // Return null if ngoEvents is undefined
    );
  };

  return (<>
    <div>Dashboard</div>
    {user?.isNgo? (
    <div>
      <div>NGO</div>
      <Button onClick={()=>setShowCreate(!showCreate)}>Create Event</Button>
      {renderedNgoEvents()}
      {showCreate && <CreateEvent setShow={setShowCreate} />}
      
    </div>
  ):(<div>
      Volunteer
    </div>)} 

    <Button onClick={fetchData}>Fetch data</Button>
  </>
  )
}

export default Dashboard