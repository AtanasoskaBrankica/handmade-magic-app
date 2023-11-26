import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {OrdersTable} from '../../components/shared/Table';
import {TitlePage} from '../../components/shared/Title';
import useFetchCollection from '../../customHooks/useFetchCollection';
import {selectUserId} from '../../redux/slice/authSlice';
import {selectOrders, STORE_ORDERS} from '../../redux/slice/orderSlice';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  height: 60vh;
`;

const SubTitle = styled.p`
  padding-left: 3rem;
  font-size: 1rem;
  margin-bottom: 0;
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
    <Container filteredOrdersByUser>
      <TitlePage>Your Order History</TitlePage>
      <SubTitle>
        Open an order to leave a <b>Product Review</b>
      </SubTitle>
      <div style={{paddingLeft: '3rem', paddingRight: '3rem'}}>
        <h2 style={{fontSize: '1.2rem'}}>All Orders</h2>
        {filteredOrdersByUser.length === 0 ? (
          <p>No order found.</p>
        ) : (
          <OrdersTable
            orders={filteredOrdersByUser}
            handleClick={handleClick}
          ></OrdersTable>
        )}
      </div>
    </Container>
  );
};

export default Orders;
