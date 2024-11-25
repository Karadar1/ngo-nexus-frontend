import React from 'react';
import styled from 'styled-components';
import { CardContainer, EventDescription, EventLocation, EventName } from './EventCard.styled';

type EventCardProps = {
  name: string;
  location: string;
  description: string;
};

const EventCard: React.FC<EventCardProps> = ({ name, location, description }) => {
  return (
    <CardContainer>
      <EventName>{name}</EventName>
      <EventLocation>{location}</EventLocation>
      <EventDescription>{description}</EventDescription>
    </CardContainer>
  );
};

export default EventCard;


