import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import useFetchDocument from '../../../customHooks/useFetchDocument';
import styled from 'styled-components';
import OrderStatus from '../orderStatus/OrderStatus';

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
      <div>
        <Link to="/admin/orders">&larr; Back To Orders</Link>
      </div>
      {order === null ? (
        <>{/* <div>LOADER</div> */}</>
      ) : (
        <>
          <span>
            <b>Order ID:</b>
            {order.id}
          </span>
          <span>
            <b>Order Amount:</b>
            {order.orderAmount}
          </span>
          <span>
            <b>Order Status:</b>
            {order.orderStatus}
          </span>
          <span>
            <b>Shipping Address:</b>
            <br />
            Address: {order.shippingAddress?.line1},
            {order.shippingAddress?.line2},{order.shippingAddress?.city}
            <br />
            State: {order.shippingAddress?.state}
            <br />
            Country: {order.shippingAddress?.country}
          </span>
          <table
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            <thead>
              <tr>
                <th>s/n</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.cartItems.map((cart, index) => {
                const {id, name, price, imageURL, cartQuantity} = cart;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <p>
                        <b>{name}</b>
                      </p>
                      <img src={imageURL} alt={name} style={{width: '100px'}} />
                    </td>
                    <td>{`${price}`}</td>
                    <td>{cartQuantity}</td>
                    <td>{`${(price * cartQuantity).toFixed(2)}`}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <OrderStatus order={order} id={id} />
        </>
      )}
    </Container>
  );
};

export default OrderDetails;
