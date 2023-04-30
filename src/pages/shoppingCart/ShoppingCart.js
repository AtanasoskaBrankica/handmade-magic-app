import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
  SAVE_URL,
} from '../../redux/slice/cartSlice';
import {BsTrash} from 'react-icons/bs';
import {Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Card from '../../components/card/Card';

const QuantityWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Button = styled.button`
  background: #ffae00;
  color: white;
  padding: 0.7rem;
  font-size: 1rem;
  margin-left: 3rem;
  margin-top: 1rem;
  border-radius: 10px;
  border: none;
`;
const SubTotalWrapper = styled.div`
  display: flex;

  flex-direction: row;
  justify-content: space-between;
`;
const CardContainer = styled.div`
  width: 25%;
  margin-left: 72%;

  font-size: 1.3rem;
`;

const CheckoutButton = styled.button`
  background: cornflowerblue;
  color: white;
  width: 70%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 1.2rem;
  border-radius: 10px;
  margin-left: 1rem;
  border: none;
`;

const ShoppingCartTitle = styled.h2`
  padding-left: 3rem;
`;

const DecreaseCartButton = styled.button`
  width: 20px;
  height: 30px;
  margin-top: 1.5rem;
  margin-right: 0.5rem;
  border: none;
`;

const IncreaseCartButton = styled.button`
  width: 20px;
  height: 30px;
  margin-top: 1.5rem;
  margin-left: 0.5rem;
  border: none;
`;

const ContinueShoppingButton = styled.button`
  background: lightgrey;
  margin-left: 3rem;
  margin-bottom: 2rem;
  padding: 0.5rem;
  font-size: 1.2rem;
  border-radius: 8px;
  border: none;
`;
const ContinueShoppingLink = styled(Link)`
  text-decoration: none;
  color: white;
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
  font-size: 2rem;
  color: red;
  margin-right: 1rem;
`;

const SubTotalTitle = styled.h4`
  margin: 0;
  margin-top: 1rem;
  margin-left: 1rem;
`;
const ShoppingCart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const increaseCart = cartItem => {
    dispatch(ADD_TO_CART(cartItem));
  };
  const decreaseCart = cartItem => {
    dispatch(DECREASE_CART(cartItem));
  };

  const removeFromCart = cartItem => {
    dispatch(REMOVE_FROM_CART(cartItem));
  };
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
      <ContinueShoppingButton>
        <ContinueShoppingLink to="/#products">
          &larr;Continue shopping
        </ContinueShoppingLink>
      </ContinueShoppingButton>
      {cartItems.length === 0 ? (
        <>
          <p>Your cart in currently empty</p>
          <br />
          <Link to="/#products">&larr;Continue shopping</Link>
        </>
      ) : (
        <>
          <div style={{paddingLeft: '3rem', paddingRight: '3rem'}}>
            <table
              style={{
                width: '100%',
                textAlign: 'center',
                border: '1px solid grey',
                borderCollapse: 'collapse',
              }}
            >
              <thead
                style={{
                  fontSize: '1.2rem',
                  background: 'lightgrey',
                  color: 'white',
                }}
              >
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody style={{fontSize: '1.3rem'}}>
                {cartItems.map((cartItem, index) => {
                  const {id, name, price, cartQuantity, imageURL} = cartItem;
                  return (
                    <tr key={id} style={{border: '1px solid lightgrey'}}>
                      <td>{index + 1}</td>
                      <td>
                        <p style={{margin: '0'}}>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{width: '200px'}}
                        />
                      </td>
                      <td>{`$${price}`}</td>
                      <td>
                        <QuantityWrapper>
                          <DecreaseCartButton
                            onClick={() => decreaseCart(cartItem)}
                          >
                            -
                          </DecreaseCartButton>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <IncreaseCartButton
                            onClick={() => increaseCart(cartItem)}
                          >
                            +
                          </IncreaseCartButton>
                        </QuantityWrapper>
                      </td>
                      <td>{(price * cartQuantity).toFixed(2)}</td>
                      <td>
                        <BsTrash
                          onClick={() => removeFromCart(cartItem)}
                          size={20}
                          color="red"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <ButtonsWrapper>
            <Button onClick={clearCart}>Clear Cart</Button>
          </ButtonsWrapper>
          <CardContainer>
            <Card>
              <CartQuantity>{`Cart item(s): ${cartTotalQuantity}`}</CartQuantity>
              <SubTotalWrapper>
                <SubTotalTitle>Subtotal:</SubTotalTitle>
                <CartAmount>{`$${cartTotalAmount.toFixed(2)}`}</CartAmount>
              </SubTotalWrapper>
              <p style={{marginLeft: '1rem'}}>
                Taxes and shipping calculated at checkout
              </p>
              <CheckoutButton onClick={checkout}>Checkout</CheckoutButton>
            </Card>
          </CardContainer>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
