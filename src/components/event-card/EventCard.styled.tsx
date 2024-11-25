// Styled components
import styled from "styled-components";

export const CardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  max-width: 300px;
  margin: 16px;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const EventName = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  color: #333;
`;

export const EventLocation = styled.p`
  font-size: 1rem;
  color: #777;
  margin: 4px 0;
`;

export const EventDescription = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin: 8px 0 0;
  line-height: 1.4;
`;