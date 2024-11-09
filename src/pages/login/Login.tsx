import React, { useEffect, useState } from 'react'
import { Button, Input, InputContainer, Label } from './Login.styled'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useUser } from '../../context/UserContext'
function Login() {
    const navigate = useNavigate()
    const {login} = useUser()
    const [identifier, setIdentifier] = useState("")
    const [password, setPassword] = useState("")
    
   
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
                'Content-Type': 'application/json', // Set content type to JSON
              },
            }
          );
      
          console.log('Response:', response.data);
          const token = response.data.token; 
          localStorage.setItem('authToken', token); 
          console.log('Token stored in localStorage:', token);
          navigate('/')
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
  return (
   <InputContainer>
   <Label htmlFor="identifier" className="required">Email/Username</Label>
   <Input id="identifier" type='identifier'value={identifier} onChange={(e)=>setIdentifier(e.target.value)}/>
   <Label htmlFor="password" className="required">Password</Label>
    <Input id='password' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
    <Button type='submit' onClick={(event)=>handleLogin(event)}>Login</Button>
   </InputContainer>
)
}

export default Login