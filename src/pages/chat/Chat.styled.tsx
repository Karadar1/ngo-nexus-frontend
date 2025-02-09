import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 10px;
`;

export const MessagesContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 20px;
  gap: 10px; /* Space between messages */
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: #4a5568 transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #4a5568;
    border-radius: 10px;
  }
`;

export const MessageWrapper = styled.div<{ isUser: boolean }>`
  display: flex;
  justify-content: ${props => props.isUser ? "flex-end" : "flex-start"};
`;

export const MessageBubble = styled.div<{ isUser: boolean }>`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 15px;
  font-size: 16px;
  word-wrap: break-word;
  white-space: pre-wrap;
  background-color: ${props => (props.isUser ? "#4a5568" : "#2d3748")};
  color: white;
  text-align: left;
`;

export const InputContainer = styled.form`
  display: flex;
  padding: 15px;
  background-color: #2d3748;
  border-radius: 10px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: none;
  border-radius: 25px;
  background-color: #4a5568;
  color: #ffffff;
  font-size: 16px;

  &:focus {
    outline: none;
    box-shadow: 0 0 5px #63b3ed;
  }
`;

export const SendButton = styled.button`
  margin-left: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  background-color: #4299e1;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3182ce;
  }

  &:disabled {
    background-color: #718096;
    cursor: not-allowed;
  }
`;
