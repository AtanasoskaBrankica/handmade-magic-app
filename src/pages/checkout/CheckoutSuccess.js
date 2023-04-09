import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Content = styled.div`
  padding: 2rem 8rem;
`;
const Button = styled.button`
  color: white;
  background: blue;
  padding: 5px 10px;
  font-size: 14px;
  border: none;
`;
const CheckoutSuccess = () => {
  return (
    <Content>
      <h1>Checkout Successful</h1>
      <p>Thank you for your purchase</p>
      <Link to="/order-history">
        <Button>View Order Status</Button>
      </Link>
    </Content>
  );
};

export default CheckoutSuccess;
