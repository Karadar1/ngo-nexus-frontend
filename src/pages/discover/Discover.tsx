import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import EventCard from '../../components/event-card/EventCard';
import { useIntersectionObserver } from '../../utils/useIntersectionObserver';

const ITEMS_PER_API_CALL = 10

interface Event {
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
}

const EventsPage = () => {

    const [events, setEvents] = useState<Event[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false); // Track if a fetch is in progress
    const pageRef = useRef(0); // Track current page
    const {ref} = useIntersectionObserver({onChange:(isIntersecting)=>{if(isIntersecting && hasMore) fetchEvents()}})

    const fetchEvents = async () => {
        if (loading || !hasMore) return; // Prevent duplicate calls
        setLoading(true);

        try {
            console.log('Fetching page:', pageRef.current);
            const response = await axios.get('http://localhost:8000/api/events', {
                params: { page: pageRef.current, limit: ITEMS_PER_API_CALL },
            });

            const { data, metadata } = response.data;

            setEvents((prevEvents) => {
                const uniqueEvents = data.filter(
                    (event:any) => !prevEvents.some((prevEvent) => prevEvent._id === event._id)
                );
                return [...prevEvents, ...uniqueEvents];
            });

            if (data.length <ITEMS_PER_API_CALL|| events.length + data.length >= metadata.total) {
                setHasMore(false); // No more data to fetch
            }

            pageRef.current += 1; // Increment page number
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     if (events.length === 0) fetchEvents(); // Initial fetch
    // }, []); // Only run on mount

    return (
        <div style={{ padding: '20px' }}>
            <h1>Events</h1>
            {/* <InfiniteScroll
                dataLength={events.length}
                next={fetchEvents} // Fetch next page
                hasMore={hasMore} // Check if more data exists
                loader={<p>Loading more events...</p>}
                endMessage={<p>No more events to show.</p>}
            >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {events.map((event) => (
                        <EventCard key={event._id} event={event} discover={true} />
                    ))}
                </div>
            </InfiniteScroll> */}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {events.map((event) => (
                        <EventCard key={event._id} event={event} discover={true} />
                    ))}
                </div>
                {/* <div style={{height:2000}}></div> */}
                <div ref={ref} />
        </div>
    );
};

export default EventsPage;
