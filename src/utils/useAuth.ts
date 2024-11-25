import { useEffect, useState } from 'react';

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if the auth token exists in local storage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token); // Set to true if token exists, false otherwise
  }, []);

  // Function to manually update the auth status
  const updateAuthStatus = () => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  };

  return { isAuthenticated, updateAuthStatus };
}

export default useAuth;
