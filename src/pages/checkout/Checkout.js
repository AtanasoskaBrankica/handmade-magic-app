import React, {useState, useEffect} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import {useDispatch, useSelector} from 'react-redux';
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from '../../redux/slice/cartSlice';
import {
  selectBillingAddress,
  selectShippingAddress,
} from '../../redux/slice/checkoutSlice';
import {selectUserEmail} from '../../redux/slice/authSlice';
import {toast} from 'react-toastify';
import CheckoutForm from '../../components/checkoutForm/CheckoutForm';
import Loader from '../../components/loader/Loader';
import styled from 'styled-components';

const Container = styled.div`
  height: 70vh;
`;

const stripePromise = loadStripe(
  'pk_test_51MnPNlFS83r3DyGH1uynH70p8mcV9hcWnxiZji7hA3XVfuYdwzbvM4KPDy9E3tPJCQJerX39AtJUFD8zyMOC42Yh001uYEZDFa'
);
const Checkout = () => {
  const [message, setMessage] = useState('Initializing checkout...');
  const [clientSecret, setClientSecret] = useState('');
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const customerEmail = useSelector(selectUserEmail);
  const shippingAddress = useSelector(selectShippingAddress);
  // const billingAddress = useSelector(selectBillingAddress);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  const description = `Payment: email: ${customerEmail}, Amount: ${cartTotalAmount}`;
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('http://localhost:4242/create-payment-intent', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        items: cartItems,
        userEmail: customerEmail,
        shipping: shippingAddress,
        // billing: billingAddress,
        description,
      }),
    })
      .then(res => {
        if (res.ok) {
          console.log('res', res);
          return res.json();
        }
        return res.json().then(json => Promise.reject(json));
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      })
      .catch(error => {
        setMessage('Failed to initialize checkout');
        toast.error('Something went wrong');
      });
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {/* <section> */}
      <div>
        {!clientSecret && (
          <Container>
            <Loader />
          </Container>
        )}
      </div>
      {/* </section> */}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Checkout;
