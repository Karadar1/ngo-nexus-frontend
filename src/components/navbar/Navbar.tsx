import React from 'react';
import { NavContainer, NavItem } from './Navbar.styled';
import { useUser } from '../../context/UserContext';

type NavbarProps = {
    loggedIn: boolean;
    onLogout: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ loggedIn, onLogout }) => {
    const {user} = useUser()
    
    return (
        <NavContainer>
            <NavItem href="/">Home</NavItem>
            <NavItem href="/dashboard">Dashboard</NavItem>
            <NavItem href="/discover">Discover</NavItem>


            {loggedIn ? (
                <>
                <NavItem href={`/user/${user?.id}`}>Account</NavItem>
                <NavItem as="button" onClick={onLogout}>
                    Logout
                </NavItem>
                </>
            ) : (
                <>
                    <NavItem href="/login">Login</NavItem>
                    <NavItem href="/register">Register</NavItem>
                </>
            )}
        </NavContainer>
    );
};

export default Navbar;
