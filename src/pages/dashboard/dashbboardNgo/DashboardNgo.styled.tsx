import styled from 'styled-components';

export const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
    min-height: 100vh;
`;

export const Title = styled.h1`
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 20px;
`;

export const EventList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    max-width: 800px;
`;

export const EventItem = styled.li`
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

export const EventTitle = styled.h3`
    font-size: 1.5rem;
    margin: 0 0 8px;
    color: #0077cc;
`;

export const EventDetails = styled.p`
    font-size: 1rem;
    margin: 4px 0;
    color: #555;
`;

export const EventDate = styled.small`
    font-size: 0.9rem;
    color: #888;
`;

export const Loader = styled.div`
    font-size: 1rem;
    color: #0077cc;
    margin-top: 20px;
`;

export const EndMessage = styled.div`
    font-size: 1rem;
    color: #555;
    margin-top: 20px;
`;