import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const MiniNavbar = () => {
  const navigate = useNavigate();

  return (
    <Navbar>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="chat">Chat</NavLink>
      </div>
      <button onClick={() => navigate(-1)} style={{ background: "transparent", border: "none", color: "white", cursor: "pointer" }}>
        Back
      </button>
    </Navbar>
  );
};

export default MiniNavbar;
