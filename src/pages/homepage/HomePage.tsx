import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #ffffff;
  padding: 4rem;
  font-family: "SF Pro Display", sans-serif;
`;

const LeftSection = styled(motion.div)`
  flex: 1;
  max-width: 50%;
  text-align: left;
`;

const RightSection = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: #555;
  max-width: 500px;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
`;

const Button = styled.a`
  padding: 12px 24px;
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  display: inline-block;
`;

const PrimaryButton = styled(Button)`
  background-color: #000;
  color: #fff;
  &:hover {
    background-color: #333;
  }
`;

const SecondaryButton = styled(Button)`
  border: 1.5px solid #000;
  color: #000;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const Image = styled(motion.img)`
  width: 90%;
  max-width: 600px;
  height: auto;
  border-radius: 10px;
`;

const Homepage = () => {
  return (
    <Container>
      {/* Left Section */}
      <LeftSection
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <Title>Empower Change, One Event at a Time</Title>
        <Description>
          Connect with volunteers, organize impactful events, and make a
          difference in your community with our powerful NGO event management
          platform.
        </Description>
        <ButtonContainer>
          <PrimaryButton href="/discover">Explore Events</PrimaryButton>
          <SecondaryButton href="/register">Get Started</SecondaryButton>
        </ButtonContainer>
      </LeftSection>

      {/* Right Section with Sliding Image */}
      <RightSection
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Image src="/homepage-image.png" alt="NGO Event Management Illustration" />
      </RightSection>
    </Container>
  );
};

export default Homepage;
