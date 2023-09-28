import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import {selectUserId} from '../../../redux/slice/authSlice';
import {selectOrders, STORE_ORDERS} from '../../../redux/slice/orderSlice';
import {OrdersTable} from '../../shared/Table';
import {Title} from '../../shared/Title';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubTitle = styled.p`
  font-size: 1.2rem;
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
    navigate(`/admin/order-details/${id}`);
  };

  return (
    <Container>
      <Title>All Orders</Title>
      <SubTitle>
        Open an order to <b>Change Order Status</b>
      </SubTitle>
      <div>
        {orders.length === 0 ? (
          <p>No order found.</p>
        ) : (
          <OrdersTable orders={orders} handleClick={handleClick} />
        )}
      </div>
    </Container>
  );
};

export default Orders;
