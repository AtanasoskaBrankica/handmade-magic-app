import {doc, setDoc, Timestamp} from 'firebase/firestore';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import styled from 'styled-components';
import {db} from '../../../firebase/config';
import {Button} from '../../shared/Button';

const Container = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid lightgrey;
  border-radius: 10px;
`;

const Title = styled.h4`
  font-size: 1.5rem;
  margin: 0;
  margin-bottom: 1rem;
`;

const Select = styled.select`
  font-size: 1.2rem;
  padding: 0.8rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const BtnWrapper = styled.div`
  margin-top: 1rem;
`;

const OrderStatus = ({order, id}) => {
  const [orderStatus, setOrderStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const changeOrderStatus = (event, id) => {
    event.preventDefault();
    setIsLoading(true);
    const orderConfig = {
      ...order,
      orderStatus: orderStatus,
      editedAt: Timestamp.now().toDate(),
    };

    try {
      setDoc(doc(db, 'orders', id), orderConfig);
      toast.success('Order status changed successfully');
      navigate('/admin/orders');
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Container>
        <Title>Update Order Status</Title>
        <form onSubmit={event => changeOrderStatus(event, id)}>
          <ContentWrapper>
            <Select
              value={orderStatus}
              onChange={event => setOrderStatus(event.target.value)}
            >
              <option value="" disabled>
                -- Select one --
              </option>
              <option value="Order Placed...">Order Placed...</option>
              <option value="Processing...">Processing...</option>
              <option value="Shipped...">Shipped...</option>
              <option value="Delivered">Delivered</option>
            </Select>
            <BtnWrapper>
              <Button background="#ffae00" type="submit">
                Update Status
              </Button>
            </BtnWrapper>
          </ContentWrapper>
        </form>
      </Container>
    </>
  );
};

export default OrderStatus;
