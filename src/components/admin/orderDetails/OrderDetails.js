import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import useFetchDocument from '../../../customHooks/useFetchDocument';
import styled from 'styled-components';
import OrderStatus from '../orderStatus/OrderStatus';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const BackButton = styled.button`
  background: lightgrey;
  width: 190px;
  padding: 0.5rem;
  font-size: 1.2rem;
  border-radius: 8px;
  border: none;
`;

const BackLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const OrderInfo = styled.span`
  margin-top: 0.5rem;
  font-size: 1.2rem;
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
      <h1>Order Details</h1>
      <BackButton>
        <BackLink to="/admin/orders">&larr; Back To Orders</BackLink>
      </BackButton>
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
            <table
              style={{
                width: '100%',
                textAlign: 'center',
                border: '1px solid grey',
                borderCollapse: 'collapse',
              }}
            >
              <thead
                style={{
                  fontSize: '1.2rem',

                  background: 'lightgrey',
                  color: 'white',
                }}
              >
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody style={{fontSize: '1.2rem'}}>
                {order.cartItems.map((cart, index) => {
                  const {id, name, price, imageURL, cartQuantity} = cart;
                  return (
                    <tr key={id} style={{border: '1px solid lightgrey'}}>
                      <td>{index + 1}</td>
                      <td>
                        <p style={{margin: '0'}}>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{width: '200px'}}
                        />
                      </td>
                      <td>{`${price}`}</td>
                      <td>{cartQuantity}</td>
                      <td>{`${(price * cartQuantity).toFixed(2)}`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <OrderStatus order={order} id={id} />
        </>
      )}
    </Container>
  );
};

export default OrderDetails;
