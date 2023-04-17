import {collection, doc, setDoc, Timestamp} from 'firebase/firestore';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import styled from 'styled-components';
import {db} from '../../../firebase/config';

const Container = styled.div`
  border: 1px solid red;
  width: 40%;
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
      {/* {isLoading && LOADER} */}
      <Container>
        <h4>Update Order Status</h4>
        <form onSubmit={event => changeOrderStatus(event, id)}>
          <select
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
          </select>
          <button type="submit">Update Status</button>
        </form>
      </Container>
    </>
  );
};

export default OrderStatus;
