import React, {useEffect, useState} from 'react';
import {PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {toast} from 'react-toastify';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserEmail, selectUserId} from '../../redux/slice/authSlice';
import {
  CLEAR_CART,
  selectCartItems,
  selectCartTotalAmount,
} from '../../redux/slice/cartSlice';
import {selectShippingAddress} from '../../redux/slice/checkoutSlice';
import {addDoc, collection, Timestamp} from 'firebase/firestore';
import {db} from '../../firebase/config';

const Container = styled.div`
  display: flex;
  flexdirection: row;
  height: 70vh;
`;

const Title = styled.h1`
  padding-left: 4rem;
  font-size: 1.5rem;
`;

const CheckoutStripeWrapper = styled.div`
  width: 50%;
  padding: 0rem 4rem;
`;

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const userEmail = useSelector(selectUserEmail);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const cartTotalAmount = useSelector(selectCartTotalAmount);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const saveOrder = () => {
    const today = new Date();
    const currentDate = today.toDateString();
    const currentTime = today.toLocaleTimeString();
    const orderConfig = {
      userId,
      userEmail,
      orderDate: currentDate,
      orderTime: currentTime,
      orderAmount: cartTotalAmount,
      orderStatus: 'Order Placed...',
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, 'orders'), orderConfig);
      dispatch(CLEAR_CART());
      toast.success('Order Saved');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const confirmPayment = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: 'http://localhost:3000/checkout-success',
        },
        redirect: 'if_required',
      })
      .then(result => {
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === 'succeeded') {
            setIsLoading(false);
            toast.success('Payment successful');
            navigate('/order-history');
            saveOrder();
          }
        }
      });

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <div>
      <Title>Checkout</Title>
      <form onSubmit={handleSubmit}>
        <Container>
          <CheckoutStripeWrapper>
            <h2 style={{fontSize: '1.3rem'}}>Stripe Checkout</h2>
            <PaymentElement options={paymentElementOptions} />
            <button
              disabled={isLoading || !stripe || !elements}
              id="submit"
              style={{
                background: 'cornflowerblue',
                padding: '0.8rem',
                border: 'none',
                borderRadius: '0.5rem',
                width: '7rem',
                color: 'white',
                fontSize: '0.8rem',
                marginTop: '1rem',
              }}
            >
              <span id="button-text">
                {isLoading ? (
                  <div className="spinner" id="spinner"></div>
                ) : (
                  'Pay now'
                )}
              </span>
            </button>
            {message && <div id="payment-message">{message}</div>}
          </CheckoutStripeWrapper>
        </Container>
      </form>
    </div>
  );
};

export default CheckoutForm;
