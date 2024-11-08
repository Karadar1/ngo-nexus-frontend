import React, { useState } from 'react'
import { Button, Input, InputContainer, Label } from '../login/Login.styled'
import RadioGroup from '../../components/RadioGroup'

function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [selectedValue,setSelectedValue] = useState("volunteer")

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
      };

   const handleLogin = (e:any)=>{
    e.preventDefault()
    console.log(username,email,password,selectedValue )
   }

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
    <Button formAction='sumbmit' onClick={handleLogin}>Login</Button>
   </InputContainer>
)
}

export default Register