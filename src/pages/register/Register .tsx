import React, { useState } from 'react';
import { Button, Input, InputContainer, Label } from '../login/Login.styled';
import RadioGroup from '../../components/radio-group/RadioGroup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [selectedValue, setSelectedValue] = useState("volunteer");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage,setErrorMessage] = useState("")

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    const handleRegister = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }
    
        if (!username || !email || !password || !selectedValue) {
            setErrorMessage("All fields are required");
            return;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("Invalid email format");
            return;
        }
    
        const userData = {
            name: username,
            email,
            password,
            role: selectedValue,
        };
    
        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:8000/api/users/register', userData);
            console.log('User created successfully:', response.data);
    
            // Reset form fields
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setSelectedValue('');
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Failed to register user");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <InputContainer>
            <Label htmlFor="username" className="required">Username</Label>
            <Input id="username" type='username' value={username} onChange={(e) => setUsername(e.target.value)} />

            <Label htmlFor="email" className="required">Email</Label>
            <Input id="email" type='email' value={email} onChange={(e) => setEmail(e.target.value)} />

            <Label htmlFor="password" className="required">Password</Label>
            <Input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

            <Label htmlFor="confirm-password" className="required">Confirm Password</Label>
            <Input id='confirm-password' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

            <h2>Select your role:</h2>
            <RadioGroup selectedValue={selectedValue} onChange={handleRadioChange} />
            <p>Selected: {selectedValue}</p>

            {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error messages */}
            <Button
                formAction='submit'
                onClick={handleRegister}
                disabled={isLoading}
            >
                {isLoading ? "Registering..." : "Register"}
            </Button>
        </InputContainer>
    );
}

export default Register;
