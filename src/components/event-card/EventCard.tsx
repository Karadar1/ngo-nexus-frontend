import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
    CardContainer,
    Description,
    Title,
    Location,
    Tags,
    ParticipateButton,
    DateElement,
} from './EventCard.styled';
import axios from 'axios';
import { useUser } from '../../context/UserContext';

interface EventCardProps {
    event: {
        _id: string;
        title: string;
        description: string;
        location: string;
        date: string;
        tags: string[];
        status: string;
        createdBy: {
            id: string;
            name: string;
            role: string;
        };
    };
    discover?: boolean; // Add discover parameter
}
interface User {
    id: string;
    name: string;
    email: string;
    role: 'ngo' | 'volunteer';
    participatingEvents:[]
}

const EventCard: React.FC<EventCardProps> = ({ event, discover = false }) => {
    const navigate = useNavigate();
    const { user, setUser } = useUser();

    const handleCardClick = () => {
        navigate(`/event/${event._id}`); // Navigate to event details page
    };

    const participateInEvent = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const token = localStorage.getItem('jwt'); // Get the JWT token from local storage
    
        if (!token) {
            console.error('User is not authenticated. No token found.');
            alert('You need to log in to participate in events.');
            return;
        }
    
        try {
            const response = await axios.post(
                `http://localhost:8000/api/events/participate?id=${event._id}`, // Event ID as query param
                {}, // Empty body
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach the token for authentication
                    },
                }
            );
    
            console.log('Participation successful:', response.data);
    
            // Update the user context with the new event
            
    
            alert('You have successfully joined the event!');
        } catch (error: any) {
            // Handle specific error cases
            if (error.response?.status === 400 && error.response?.data?.message) {
                console.warn('Error:', error.response.data.message);
                alert(error.response.data.message); // Display a user-friendly message
            } else {
                console.error('Unexpected error:', error.response?.data || error.message);
                alert('Something went wrong. Please try again later.');
            }
        }
    };

    return (
        <CardContainer onClick={handleCardClick}>
            <Title>{event.title}</Title>
            <Description>{event.description}</Description>
            <Location>Location: {event.location}</Location>
            <DateElement>
                Date: {new Date(event.date as string).toLocaleDateString()}
            </DateElement>
            <Tags>
                {event.tags.map((tag, index) => (
                    <span key={index}>{tag}</span>
                ))}
            </Tags>
            {discover && (
                <ParticipateButton onClick={(e) => participateInEvent(e)}>
                    Participate
                </ParticipateButton>
            )}
        </CardContainer>
    );
};

export default EventCard;
