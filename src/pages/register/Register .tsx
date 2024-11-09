import React, { useState } from 'react'
import { Button, Input, InputContainer, Label } from '../login/Login.styled'
import RadioGroup from '../../components/RadioGroup'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
    const navigate = useNavigate() 

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [selectedValue,setSelectedValue] = useState("volunteer")

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
      };

   
      const handleRegister = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
      
        try {
          const response = await axios.post(
            'http://localhost:8181/register',
            {
              username: username,
              email: email,
              password: password,
              isNgo: selectedValue === "ngo" ? true : false, // Assuming `isNgo` is the key expected by the backend
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
      
          console.log('Response:', response.data);
          navigate('/login')
        } catch (error) {
          console.error('Error:', error);
        }
      };
   
  return (
   <InputContainer>
    <Label htmlFor="username" className="required">Username</Label>
    <Input id="username" type='username'value={username} onChange={(e)=>setUsername(e.target.value)}/>

    <Label htmlFor="email" className="required">Email</Label>
    <Input id="email" type='email'value={email} onChange={(e)=>setEmail(e.target.value)}/>
    
    <Label htmlFor="password" className="required">Password</Label>
    <Input id='password' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
    
    <Label htmlFor="confirm-password" className="required">Confirm Password</Label>
    <Input id='confirm-password' type='password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
   
    <h2>Select your role:</h2>
    <RadioGroup selectedValue={selectedValue} onChange={handleRadioChange}/>
    <p>Selected: {selectedValue}</p>
    <Button formAction='sumbmit' onClick={(event)=>{handleRegister(event)}}>Login</Button>
   </InputContainer>
)
}

export default Register