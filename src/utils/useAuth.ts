import { useEffect, useState } from 'react';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        setIsAuthenticated(!!token); // Set true if token exists, false otherwise
    }, []);

    const updateAuthStatus = () => {
        const token = localStorage.getItem('jwt');
        setIsAuthenticated(!!token);
    };

    return { isAuthenticated, updateAuthStatus };
};