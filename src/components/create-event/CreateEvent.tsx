import React, { useState } from 'react';
import styled from 'styled-components';
import { CreateEventContainer, Form, Input, Label, SubmitButton, TextArea, Title } from './CreateEvent.styled';



const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    console.log({ title, location, description });
    // Perform any further actions, such as submitting to the server
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
