import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {Btn} from '../../components/shared/Button';

const Content = styled.div`
  padding: 2rem 8rem;
  height: 40vh;
`;

const BtnWrapper = styled.div`
  width: 23%;
  margin-left: -1rem;
`;

const Text = styled.p`
  font-size: 1.2rem;
`;
const CheckoutSuccess = () => {
  return (
    <Content>
      <h1>Checkout Successful</h1>
      <Text>Thank you for your purchase</Text>
      <BtnWrapper>
        <Link to="/order-history">
          <Btn>View Order Status</Btn>
        </Link>
      </BtnWrapper>
    </Content>
  );
};

export default CheckoutSuccess;
