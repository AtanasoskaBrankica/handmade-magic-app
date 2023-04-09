import React, {useEffect, useState} from 'react';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import Checkout from '../../pages/checkout/Checkout';
import CheckoutSummary from '../checkoutSummary/CheckoutSummary';
import {toast} from 'react-toastify';
import '../checkoutForm/CheckoutForm.css';
import styled from 'styled-components';
import {Navigate, useNavigate} from 'react-router-dom';
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
`;

const Title = styled.h1`
  padding-left: 4rem;
`;
const CheckoutSummaryWrapper = styled.div`
  width: 50%;

  padding: 4rem 4rem;
`;

const CheckoutStripeWrapper = styled.div`
  width: 50%;

  padding: 4rem 4rem;
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
          // Make sure to change this to your payment completion page
          return_url: 'http://localhost:3000/checkout-success',
        },
        redirect: 'if_required',
      })
      .then(result => {
        //bad result - error
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        //ok -paymentIntent
        if (result.paymentIntent) {
          if (result.paymentIntent.status === 'succeeded') {
            setIsLoading(false);
            toast.success('Payment successful');
            navigate('/checkout-success');
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
          <CheckoutSummaryWrapper>
            <CheckoutSummary />
          </CheckoutSummaryWrapper>
          <CheckoutStripeWrapper>
            <h2>Stripe Checkout</h2>
            <PaymentElement
              //   id="payment-element"
              //   style={{marginBbottom: '24px'}}

              options={paymentElementOptions}
            />
            <button disabled={isLoading || !stripe || !elements} id="submit">
              <span id="button-text">
                {isLoading ? (
                  <div className="spinner" id="spinner"></div>
                ) : (
                  'Pay now'
                )}
              </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
          </CheckoutStripeWrapper>
        </Container>
      </form>
    </div>
  );
};
export default CheckoutForm;
