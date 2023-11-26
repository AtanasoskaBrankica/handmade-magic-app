import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  CALCULATE_SUBTOTAL,
  CLEAR_CART,
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
  SAVE_URL,
} from '../../redux/slice/cartSlice';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Card from '../../components/card/Card';
import {
  BackButton,
  BackLink,
  Btn,
  Button,
} from '../../components/shared/Button';
import {ShoppingCartTable} from '../../components/shared/Table';

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 3rem;
  margin-top: 1rem;
`;

const SubTotalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CardContainer = styled.div`
  width: 25%;
  margin-left: 72%;
  font-size: 1rem;
`;

const ShoppingCartTitle = styled.h1`
  padding-left: 3rem;
  font-size: 1.5rem;
`;

const BtnWrapper = styled.div`
  padding-left: 3rem;
  margin-bottom: 1rem;
`;

const CartQuantity = styled.p`
  font-weight: bold;
  margin: 0;
  margin-top: 1rem;
  margin-left: 1rem;
`;

const CartAmount = styled.p`
  margin: 0;
  margin-top: 0.5rem;
  margin-left: 5rem;
  font-size: 1.5rem;
  color: red;
  margin-right: 1rem;
`;

const SubTotalTitle = styled.h4`
  margin: 0;
  margin-top: 1rem;
  margin-left: 1rem;
`;

const Text = styled.p`
  font-size: 1.5rem;
  margin-left: 3rem;
  text-align: center;
  font-weight: bold;
`;

const Container = styled.div`
  height: 51vh;
`;

const ShoppingCart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(SAVE_URL(''));
  }, [dispatch, cartItems]);

  const url = window.location.href;

  const checkout = () => {
    if (isLoggedIn) {
      navigate('/checkout-details');
    } else {
      dispatch(SAVE_URL(url));
      navigate('/login');
    }
  };
  return (
    <div>
      <ShoppingCartTitle>Shopping Cart</ShoppingCartTitle>
      <BtnWrapper>
        <BackButton>
          <BackLink to="/#products">&larr;Continue shopping</BackLink>
        </BackButton>
      </BtnWrapper>

      {cartItems.length === 0 ? (
        <>
          <Container>
            <Text>Your cart is currently empty</Text>
          </Container>
        </>
      ) : (
        <>
          <div style={{paddingLeft: '3rem', paddingRight: '3rem'}}>
            <ShoppingCartTable cartItems={cartItems}></ShoppingCartTable>
          </div>
          <ButtonsWrapper>
            <Button background="#ffae00" onClick={clearCart}>
              Clear Cart
            </Button>
          </ButtonsWrapper>
          <CardContainer>
            <Card>
              <CartQuantity>{`Cart item(s): ${cartTotalQuantity}`}</CartQuantity>
              <SubTotalWrapper>
                <SubTotalTitle>Subtotal:</SubTotalTitle>
                <CartAmount>{`${cartTotalAmount.toFixed(2)} MKD`}</CartAmount>
              </SubTotalWrapper>
              <p style={{marginLeft: '1rem'}}>
                Taxes and shipping calculated at checkout
              </p>
              <Btn onClick={checkout}>Checkout</Btn>
            </Card>
          </CardContainer>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
