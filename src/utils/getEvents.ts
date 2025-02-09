import axios from "axios";

export const getEvents = async (page: number, limit: number) => {
    const response = await axios.get('http://localhost:8000/api/events', {
        params: { page, limit },
    });
    return response.data;
};