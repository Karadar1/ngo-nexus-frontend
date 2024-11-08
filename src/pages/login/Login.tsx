import React, { useState } from 'react'
import { Button, Input, InputContainer, Label } from './Login.styled'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

  return (
   <InputContainer>
   <Label htmlFor="email" className="required">Name</Label>
    <Input id="email" type='email'value={email} onChange={(e)=>setEmail(e.target.value)}/>
   <Label htmlFor="password" className="required">Password</Label>
    <Input id='password' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
    <Button formAction='sumbmit'>Login</Button>
   </InputContainer>
)
}

export default Login