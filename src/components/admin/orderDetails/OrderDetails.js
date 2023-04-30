import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import useFetchDocument from '../../../customHooks/useFetchDocument';
import styled from 'styled-components';
import OrderStatus from '../orderStatus/OrderStatus';
import {Title} from '../../shared/Title';
import {BackButton, BackLink} from '../../shared/Button';
import {OrderDetailsTable} from '../../shared/Table';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrderInfo = styled.span`
  margin-top: 0.5rem;
  font-size: 1.2rem;
`;

const BtnContainer = styled.div`
  margin-top: 0.5rem;
`;
const OrderDetails = () => {
  const {id} = useParams();
  const [order, setOrder] = useState(null);
  const {document} = useFetchDocument('orders', id);

  useEffect(() => {
    setOrder(document);
  }, [document]);
  return (
    <Container>
      <Title>Order Details</Title>
      <BtnContainer>
        <BackButton>
          <BackLink to="/admin/orders">&larr; Back To Orders</BackLink>
        </BackButton>
      </BtnContainer>
      {order === null ? (
        <>{/* <div>LOADER</div> */}</>
      ) : (
        <>
          <OrderInfo>
            <b style={{marginRight: '0.5rem'}}>Order ID:</b>
            {order.id}
          </OrderInfo>
          <OrderInfo>
            <b style={{marginRight: '0.5rem'}}>Order Amount:</b>
            {order.orderAmount}
          </OrderInfo>
          <OrderInfo>
            <b style={{marginRight: '0.5rem'}}>Order Status:</b>
            {order.orderStatus}
          </OrderInfo>
          <OrderInfo>
            <b style={{marginRight: '0.5rem'}}>Shipping Address:</b>
            <br />
            Address: {order.shippingAddress?.line1},
            {order.shippingAddress?.line2},{order.shippingAddress?.city}
            <br />
            State: {order.shippingAddress?.state}
            <br />
            Country: {order.shippingAddress?.country}
          </OrderInfo>
          <div style={{marginTop: '2rem', marginBottom: '2rem'}}>
            <OrderDetailsTable order={order} />
          </div>
          <OrderStatus order={order} id={id} />
        </>
      )}
    </Container>
  );
};

export default OrderDetails;
