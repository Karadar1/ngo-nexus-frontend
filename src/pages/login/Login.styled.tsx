import styled from 'styled-components';

export const Input = styled.input`
  padding: 10px 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }

  &:hover {
    border-color: #0056b3;
  }

  &::placeholder {
    color: #aaa;
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const InputContainer = styled.form`
  display: flex;
  flex-direction:column;

  gap: 15px; /* Space between the two inputs */
  width: 80vw;
  
  /* Stack inputs vertically on smaller screens */
  @media (max-width: 600px) {
    flex-direction: column;
  }

`;
export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;

  &:focus-within {
    color: #007bff;
  }

  &.required::after {
    content: '*';
    color: #ff4d4d;
    margin-left: 4px;
  }
`;
export const RadioContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  color: #333;
`;

export const RadioInput = styled.input.attrs({ type: 'radio' })`
  display: none;

  &:checked + span {
    background-color: #007bff;
    border-color: #007bff;
  }

  &:checked + span::after {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    background: #fff;
    border-radius: 50%;
    margin: auto;
  }
`;

export const CustomRadio = styled.span`
  width: 20px;
  height: 20px;
  border: 2px solid #007bff;
  border-radius: 50%;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;