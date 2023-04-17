import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import {selectUserId} from '../../../redux/slice/authSlice';
import {selectOrders, STORE_ORDERS} from '../../../redux/slice/orderSlice';

const Container = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1``;

const SubTitle = styled.p``;

const Orders = () => {
  const {data, isLoading} = useFetchCollection('orders');
  console.log('data', data);
  const orders = useSelector(selectOrders);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [data]);

  const handleClick = id => {
    navigate(`/admin/order-details/${id}`);
  };

  return (
    <Container>
      <Title>All Orders</Title>
      <SubTitle>
        Open an order to <b>Change Order Status</b>
      </SubTitle>
      {/* {isLoading && <Loader>} */}
      <div>
        <h2>All Products</h2>
        {orders.length === 0 ? (
          <p>No order found.</p>
        ) : (
          <table
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            <thead>
              <tr>
                <th>s/n</th>
                <th>Date</th>
                <th>Order ID</th>
                <th>Order Amount</th>
                <th>Order Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                const {id, orderDate, orderTime, orderAmount, orderStatus} =
                  order;
                return (
                  <tr key={id} onClick={() => handleClick(id)}>
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
