import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, Input, InputContainer, Label } from './Login.styled';
import { redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../context/UserContext';

type ComponentProps = {
  updateAuthStatus: () => void;
};

const Login: React.FC<ComponentProps> = ({updateAuthStatus}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const {setUser} = useUser()

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // Input validation
    if (!email || !password) {
        setErrorMessage('Email and password are required.');
        return;
    }

    const userData = {
        email,
        password,
    };

    try {
        setLoading(true); // Start loading
        setErrorMessage(null); // Clear previous error

        // Send login request
        const response = await axios.post('http://localhost:8000/api/users/login', userData);

        // Handle successful response
        console.log('Login successful:', response.data);
        updateAuthStatus()
        // Store the JWT token
        const token = response.data.token;
        localStorage.setItem('jwt', token); // Save token for future requests

        const {userCredentials} = response.data
        setUser(userCredentials)
        console.log(userCredentials)

        

        // Optionally redirect the user
        navigate('/dashboard')
    } catch (err: any) {
        // Extract meaningful error message
        if (err.response && err.response.data && err.response.data.message) {
            setErrorMessage(err.response.data.message);
        } else {
            setErrorMessage('An unexpected error occurred.');
        }
    } finally {
        setLoading(false); // Stop loading
    }
};

  return (
    <InputContainer>
      <Label htmlFor="email" className="required">Email/Username</Label>
      <Input 
        id="email" 
        type="text" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <Label htmlFor="password" className="required">Password</Label>
      <Input 
        id="password" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error messages */}
      <Button onClick={(event)=>handleLogin(event)} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </InputContainer>
  );
};

export default Login;
