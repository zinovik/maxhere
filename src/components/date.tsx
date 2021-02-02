import React from 'react';
import styled from 'styled-components';

const DateContainer = styled.p`
  text-align: right;
  margin-bottom: 0;
`;

interface DateProps {
  date: string;
}

const Date: React.FC<DateProps> = ({ date }) => {
  return (
    <DateContainer>
      <small>{date}</small>
    </DateContainer>
  );
};

export default Date;
