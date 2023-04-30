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
`;

const SubTitle = styled.p`
  padding-left: 3rem;
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
    navigate(`/order-details/${id}`);
  };

  const filteredOrdersByUser = orders.filter(order => order.userId === userId);
  return (
    <Container>
      <TitlePage>Your Order History</TitlePage>
      <SubTitle>
        Open an order to leave a <b>Product Review</b>
      </SubTitle>
      {/* {isLoading && <Loader>} */}
      <div style={{paddingLeft: '3rem', paddingRight: '3rem'}}>
        <h2>All Orders</h2>
        {orders.length === 0 ? (
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
