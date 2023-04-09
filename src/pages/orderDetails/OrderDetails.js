import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import useFetchDocument from '../../customHooks/useFetchDocument';
import styled from 'styled-components';

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
        <Link to="/order-history">&larr; Back To Orders</Link>
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
                <th>Actions</th>
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
                    <td>{/* <div>Review Product</div> */}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </Container>
  );
};

export default OrderDetails;
