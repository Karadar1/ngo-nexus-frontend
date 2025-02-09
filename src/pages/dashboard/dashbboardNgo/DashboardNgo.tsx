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
} from './DashboardNgo.styled'; // Import styled components
import EventCard from '../../../components/event-card/EventCard';
import { Button } from '../../login/Login.styled';
import CreateEvent from '../../../components/create-event/CreateEvent';
import { Event } from '../../../types/Event';

const DashboardNgo = () => {
    const [events, setEvents] = useState<Event[]>([]); 
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false); // Track if a fetch is in progress
    const [showCreate, setShowCreate] = useState(false)
    

    const fetchEvents = async () => {
        if (loading) return; // Prevent multiple simultaneous fetches
        setLoading(true);

        try {
            const token = localStorage.getItem('jwt');
            const response = await axios.get('http://localhost:8000/api/events/dashboardNgo', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    page,
                    limit: 10,
                },
            });

            const fetchedEvents = response.data.data;
            const { total } = response.data.metadata;

            // Avoid duplicates by ensuring unique events based on `_id`
            setEvents((prevEvents) => {
                const newEvents = fetchedEvents.filter(
                    (event:any) => !prevEvents.some((prevEvent) => prevEvent._id === event._id)
                );
                return [...prevEvents, ...newEvents];
            });

            // Determine if more data exists
            if (events.length + fetchedEvents.length >= total) {
                setHasMore(false);
            }

            setPage((prevPage) => prevPage + 1); // Increment the page
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false); // Mark fetch as complete
        }
    };

    useEffect(() => {
        fetchEvents(); // Initial fetch
    }, []);

    const addEventToList = (newEvent: Event) => {
        setEvents((prevEvents) => [newEvent, ...prevEvents]); 
    };
   

    return (
        <>
        <Button onClick={()=>setShowCreate((prev)=>!prev)}>Create Event</Button>
        {showCreate && <CreateEvent setShow={setShowCreate} addEventToList={addEventToList}/>}
        <DashboardContainer>
            <Title>NGO Dashboard</Title>
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
        </>
    );
};

export default DashboardNgo;
