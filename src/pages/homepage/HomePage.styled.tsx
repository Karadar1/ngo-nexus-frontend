// src/pages/HomePage.js

import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f4f8;
  color: #333;
`;

export const Title = styled.h1`
   font-size: 3rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0.5rem 0;
`;

export const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #34495e;
  margin: 0.5rem 0 2rem 0;
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: #ffffff;
  background-color: #3498db;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;