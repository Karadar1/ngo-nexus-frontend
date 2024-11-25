import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, Input, InputContainer, Label } from './Login.styled';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../context/UserContext';

type LoginProps = {
  setLoginState: Dispatch<SetStateAction<boolean>>;
};

const Login: React.FC<LoginProps> = ({ setLoginState }) => {
  const navigate = useNavigate();
  const { login, user } = useUser();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8181/login',
        {
          identifier: identifier,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response:', response.data);
      const token = response.data.token;
      const userObj = {
        name: response.data.username,
        email: identifier,
        isNgo: response.data.isNgo,
      };

      login(userObj);
      console.log(user)
      setLoginState(true); // Update login state
      localStorage.setItem('authToken', token);
      console.log('Token stored in localStorage:', token);
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <InputContainer>
      <Label htmlFor="identifier" className="required">Email/Username</Label>
      <Input 
        id="identifier" 
        type="text" 
        value={identifier} 
        onChange={(e) => setIdentifier(e.target.value)} 
      />
      <Label htmlFor="password" className="required">Password</Label>
      <Input 
        id="password" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <Button onClick={handleLogin}>Login</Button>
    </InputContainer>
  );
};

export default Login;