import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { CreateEventContainer, Form, Input, Label, SubmitButton, TextArea, Title } from './CreateEvent.styled';
import axios from 'axios';

type CreateComponentProps = {
  setShow: Dispatch<SetStateAction<boolean>>;
};

const CreateEvent : React.FC<CreateComponentProps> = ({setShow}) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false)


  const fetchData = async () => {
    const token = localStorage.getItem('authToken');
    
    try {
      setLoading(true); // Start loading
      
      // Sending a POST request with axios
      const response = await axios.post(
        'http://localhost:8181/api/event',
        {
          name: title,           // Data payload for the POST request
          location: location,
          description: description,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Bearer token for authorization
          },
        }
      );
  
      console.log(response.data); // Log the response data (or update state)
    } catch (err) {
    } finally {
      setLoading(false);
      setShow(false);
    }
  };
  

  const handleSubmit = async (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    fetchData()
    console.log({ title, location, description });
    // Perform any further actions, such as submitting to the server\
  };

  return (
    <CreateEventContainer>
      <Title>Create Event</Title>
      <Form >
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter event title"
          />
        </div>
        
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter event location"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter event description"
          />
        </div>

        <SubmitButton type="submit" onClick={(event)=>handleSubmit(event)}>Create Event</SubmitButton>
      </Form>
    </CreateEventContainer>
  );
};

export default CreateEvent;
function setError(arg0: any) {
  throw new Error('Function not implemented.');
}

