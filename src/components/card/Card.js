import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  border: 1px solid transparent;
  border-radius: 5px;
  box-shadow: 0 0 10px grey;
  height: 100%;
`;
const Card = ({children}) => {
  return <CardWrapper>{children}</CardWrapper>;
};

export default Card;
