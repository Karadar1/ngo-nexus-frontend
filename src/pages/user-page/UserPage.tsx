import React, { useState } from "react";
import styled from "styled-components";
import { useUser } from "../../context/UserContext";

// Styled Components
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f7;
`;

const UserCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 350px;
`;

const UserName = styled.h1`
  font-size: 22px;
  font-weight: 600;
  color: #333;
`;

const UserEmail = styled.p`
  font-size: 14px;
  color: #666;
  margin: 5px 0;
`;

const UserRole = styled.p`
  font-size: 16px;
  color: #444;
  text-transform: capitalize;
  margin-bottom: 10px;
`;

const UserMeta = styled.p`
  font-size: 12px;
  color: #888;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-top: 15px;
`;

const EventList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 5px 0;
`;

const EventItem = styled.li`
  font-size: 14px;
  color: #555;
  margin: 2px 0;
`;

const Button = styled.button`
  margin-top: 15px;
  padding: 10px 16px;
  background: black;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #333;
  }
`;

const QRContainer = styled.div`
  margin-top: 15px;
  padding: 10px;
  background: #f0f0f0;
  border-radius: 12px;
`;

const UserPage = () => {
  const [showQR, setShowQR] = useState(false);

  // Example User Data (Replace with API or Props)
  const { user } = useUser();


  return (
    <PageContainer>
      <UserCard>
        <UserName>{user?.name}</UserName>
        <UserEmail>{user?.email}</UserEmail>
        <UserRole>{user?.role}</UserRole>

        {user?.role == "ngo" ? (
          <>
            <SectionTitle>Created Events</SectionTitle>
            <EventList>
              {user.participatingEvents.length > 0 ? (
                user.participatingEvents.map((event, index) => (
                  <EventItem key={index}>{event}</EventItem>
                ))
              ) : (
                <p>No events created.</p>
              )}
            </EventList>
          </>
        ) : (
          <>
            <SectionTitle>Created Events</SectionTitle>
            <EventList>
              {(user?.participatingEvents ?? []).length > 0 ? (
                (user?.participatingEvents ?? []).map((event, index) => (
                  <EventItem key={index}>{event}</EventItem>
                ))
              ) : (
                <p>No events joined.</p>
              )}
            </EventList>
          </>
        )}

        {user?.role == "ngo" && (
          <Button onClick={() => setShowQR(!showQR)}>
            {showQR ? "Hide QR Code" : "Generate QR Code"}
          </Button>
        )}
      </UserCard>
    </PageContainer>
  );
};

export default UserPage;
