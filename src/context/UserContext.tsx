// src/context/UserContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the user object
interface User {
  name: string;
  email: string;
}

// Define the shape of the context
interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Create the UserContext with an initial value of undefined
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook for easy access to the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Props type for UserProvider
interface UserProviderProps {
  children: ReactNode;
}

// UserProvider component that wraps around the app and provides user state
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Function to log in a user
  const login = (userData: User) => {
    setUser(userData);
  };

  // Function to log out a user
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
