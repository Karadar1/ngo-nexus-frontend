import React from 'react';
import styled from 'styled-components';
import { NavContainer, NavItem } from './Navbar.styled';

type NavbarProps = {
  loggedIn: boolean;
  onLogout: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ loggedIn, onLogout }) => {
  return (
    <NavContainer>
      <NavItem href="/">Home</NavItem>
      <NavItem href="/dashboard">Dashboard</NavItem>
      <NavItem href="/discover">Discover</NavItem>

      {loggedIn ? (
        <NavItem as="button" onClick={onLogout}>
          Logout
        </NavItem>
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
