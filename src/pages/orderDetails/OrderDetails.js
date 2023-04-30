import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import useFetchDocument from '../../customHooks/useFetchDocument';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;
const OrderInfo = styled.span`
  margin-top: 0.5rem;
  font-size: 1.2rem;
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

const Button = styled.button`
  background: cornflowerblue;
  color: white;
  padding: 0.5rem;
  font-size: 1.2rem;
  border-radius: 8px;
  border: none;
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
        <BackLink to="/order-history">&larr; Back To Orders</BackLink>
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
                <th>Review</th>
              </tr>
            </thead>
            <tbody style={{fontSize: '1.2rem'}}>
              {order.cartItems.map((cart, index) => {
                const {id, name, price, imageURL, cartQuantity} = cart;
                return (
                  <tr key={id} style={{border: '1px solid lightgrey'}}>
                    <td>{index + 1}</td>
                    <td>
                      <p>
                        <b>{name}</b>
                      </p>
                      <img src={imageURL} alt={name} style={{width: '150px'}} />
                    </td>
                    <td>{`${price}`}</td>
                    <td>{cartQuantity}</td>
                    <td>{`${(price * cartQuantity).toFixed(2)}`}</td>
                    <td>
                      <Link to={`/review-product/${id}`}>
                        <Button>Review Product</Button>
                      </Link>
                    </td>
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
