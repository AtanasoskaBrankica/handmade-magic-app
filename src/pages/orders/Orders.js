import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import useFetchCollection from '../../customHooks/useFetchCollection';
import {selectUserId} from '../../redux/slice/authSlice';
import {selectOrders, STORE_ORDERS} from '../../redux/slice/orderSlice';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  padding-left: 3rem;
`;

const SubTitle = styled.p`
  padding-left: 3rem;
`;

const Orders = () => {
  const {data, isLoading} = useFetchCollection('orders');
  const orders = useSelector(selectOrders);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [data]);

  const handleClick = id => {
    navigate(`/order-details/${id}`);
  };

  const filteredOrdersByUser = orders.filter(order => order.userId === userId);
  return (
    <Container>
      <Title>Your Order History</Title>
      <SubTitle>
        Open an order to leave a <b>Product Review</b>
      </SubTitle>
      {/* {isLoading && <Loader>} */}
      <div style={{paddingLeft: '3rem', paddingRight: '3rem'}}>
        <h2>All Orders</h2>
        {orders.length === 0 ? (
          <p>No order found.</p>
        ) : (
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
                <th>Date</th>
                <th>Order ID</th>
                <th>Order Amount</th>
                <th>Order Status</th>
              </tr>
            </thead>
            <tbody style={{fontSize: '1.2rem'}}>
              {filteredOrdersByUser.map((order, index) => {
                const {id, orderDate, orderTime, orderAmount, orderStatus} =
                  order;
                return (
                  <tr
                    key={id}
                    style={{border: '1px solid lightgrey'}}
                    onClick={() => handleClick(id)}
                  >
                    <td>{index + 1}</td>
                    <td>
                      {orderDate} at {orderTime}
                    </td>
                    <td>{id}</td>
                    <td>{`$${orderAmount}`}</td>
                    <td>{orderStatus}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </Container>
  );
};

export default Orders;
