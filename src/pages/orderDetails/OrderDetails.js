import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import useFetchDocument from '../../customHooks/useFetchDocument';
import styled from 'styled-components';
import {OrderDetailsTable} from '../../components/shared/Table';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
  padding-right: 2rem;
`;

const OrderInfo = styled.span`
  margin-top: 0.5rem;
  font-size: 1rem;
`;

const BackButton = styled.button`
  background: lightgrey;
  width: 190px;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
`;

const BackLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const TableWrapper = styled.div`
  margin-top: 1rem;
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
      <h1 style={{fontSize: '1.5rem'}}>Order Details</h1>
      <BackButton>
        <BackLink to="/order-history">&larr; Back To Orders</BackLink>
      </BackButton>
      {order === null ? (
        <></>
      ) : (
        <>
          <OrderInfo>
            <b style={{marginRight: '0.5rem'}}>Order Amount:</b>
            {`${order.orderAmount} MKD`}
          </OrderInfo>
          <OrderInfo>
            <b style={{marginRight: '0.5rem'}}>Order Status:</b>
            {order.orderStatus}
          </OrderInfo>
          <TableWrapper>
            <OrderDetailsTable order={order} review={true}></OrderDetailsTable>
          </TableWrapper>
        </>
      )}
    </Container>
  );
};

export default OrderDetails;
