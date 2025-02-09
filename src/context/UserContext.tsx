import React, { createContext, useContext, useState } from 'react';

// Define User and Context types
interface User {
    id: string;
    name: string;
    email: string;
    role: 'ngo' | 'volunteer';
    participatingEvents: string[];
    createdEvents:string[];
}

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    logout: () => void; // Logout function
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        // Load user from localStorage on initialization
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Persist the user to localStorage whenever it changes
    React.useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    // Logout function: Clears user data and localStorage
    const logout = () => {
        setUser(null); // Clear user context
        localStorage.clear() // Remove the token if stored separately
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
