import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
    DashboardContainer,
    Title,
    EventList,
    EventItem,
    EventTitle,
    EventDetails,
    EventDate,
    Loader,
    EndMessage,
} from './DashboardVolunteer.styled';
import { useUser } from '../../../context/UserContext';
import EventCard from '../../../components/event-card/EventCard';
import { Event } from '../../../types/Event';

const DashboardVolunteer = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const {user} = useUser()
    
    const fetchEvents = async () => {
        const token = localStorage.getItem('jwt');
        if (!user?.participatingEvents) return;

        try {
            const fetchedEvents = await Promise.all(
                user.participatingEvents.map(async (eventId) => {
                    const response = await axios.get(
                        `http://localhost:8000/api/events/${eventId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    return response.data;
                })
            );

            setEvents(fetchedEvents); // Update state with events
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };
    useEffect(() => {
        

        fetchEvents();
    }, [user]);

    return (
        <DashboardContainer>
            <Title>Volunteer Dashboard</Title>
            <InfiniteScroll
                dataLength={events.length}
                next={fetchEvents}
                hasMore={hasMore}
                loader={<Loader>Loading more events...</Loader>}
                endMessage={<EndMessage>No more events to show.</EndMessage>}
            >
                <EventList>
                    {events.map((event) => (
                        // <EventItem key={event._id}>
                        //     <EventTitle>{event.title}</EventTitle>
                        //     <EventDetails>{event.description}</EventDetails>
                        //     <EventDetails>Location: {event.location}</EventDetails>
                        //     <EventDate>
                        //         Date: {new Date(event.date).toLocaleDateString()}
                        //     </EventDate>
                        //     <EventDetails>Status: {event.status}</EventDetails>
                        // </EventItem>
                        <EventCard key={event._id} event={event} discover={false}/>
                    ))}
                </EventList>
            </InfiniteScroll>
        </DashboardContainer>
    );
};

export default DashboardVolunteer;