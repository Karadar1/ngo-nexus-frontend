import React from 'react';
import styled from 'styled-components';
import { CustomRadio, RadioContainer, RadioInput, RadioLabel } from '../pages/login/Login.styled';

// Define the type for props
interface RadioGroupProps {
  selectedValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


// Use the props type in the component
const RadioGroup: React.FC<RadioGroupProps> = ({ selectedValue, onChange }) => (
  <RadioContainer>
    <RadioLabel>
      <RadioInput
        name="role"
        value="volunteer"
        checked={selectedValue === 'volunteer'}
        onChange={onChange}
      />
      <CustomRadio />
      Volunteer
    </RadioLabel>
    <RadioLabel>
      <RadioInput
        name="role"
        value="ngo"
        checked={selectedValue === 'ngo'}
        onChange={onChange}
      />
      <CustomRadio />
      NGO
    </RadioLabel>
  </RadioContainer>
);

export default RadioGroup;
