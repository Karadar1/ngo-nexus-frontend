import styled from "styled-components";

export const NavContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px 20px;
  background-color: #333;
  color: #fff;
`;

export const NavItem = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }

  &.active {
    font-weight: bold;
    color: #00d1b2;
  }

  &:not([href]) {
    cursor: pointer;
    background: none;
    border: none;
    font-size: 1rem;
    color: #fff;
  }
`;
