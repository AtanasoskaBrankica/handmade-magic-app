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
} from '../../redux/slice/cartSlice';
import {BsTrash} from 'react-icons/bs';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Card from '../../components/card/Card';

const QuantityWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  border: 1px solid red;
  flex-direction: row;
  justify-content: space-between;
`;
const Button = styled.button`
  background: orangered;
  color: white;
  padding: 0.5rem;
  font-size: 1rem;
`;
const SubTotalWrapper = styled.div`
  border: 1px solid green;
  display: flex;

  flex-direction: row;
`;
const CardContainer = styled.div`
  border: 1px solid blue;
  width: 30%;
  margin-left: 70%;
`;

const CheckoutButton = styled.button`
  background: blue;
  color: white;
  width: 70%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 1rem;
`;

const ShoppingCart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const dispatch = useDispatch();
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
  }, [dispatch, cartItems]);
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <>
          <p>Your cart in currently empty</p>
          <br />
          <Link to="/#products">&larr;Continue shopping</Link>
        </>
      ) : (
        <>
          <table
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            <thead>
              <tr>
                <th>s/n</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cartItem, index) => {
                const {id, name, price, cartQuantity, imageURL} = cartItem;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <p>
                        <b>{name}</b>
                      </p>
                      <img src={imageURL} alt={name} style={{width: '100px'}} />
                    </td>
                    <td>{`$${price}`}</td>
                    <td>
                      <QuantityWrapper>
                        <button onClick={() => decreaseCart(cartItem)}>
                          -
                        </button>
                        <p>
                          <b>{cartQuantity}</b>
                        </p>
                        <button onClick={() => increaseCart(cartItem)}>
                          +
                        </button>
                      </QuantityWrapper>
                    </td>
                    <td>{(price * cartQuantity).toFixed(2)}</td>

                    <td>
                      <BsTrash
                        onClick={() => removeFromCart(cartItem)}
                        size={18}
                        color="red"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <ButtonsWrapper>
            <Button onClick={clearCart}>Clear Cart</Button>
            <Link to="/#products">&larr;Continue shopping</Link>
          </ButtonsWrapper>
          <CardContainer>
            <Card>
              <p>{`Cart item(s): ${cartTotalQuantity}`}</p>
              <SubTotalWrapper>
                <h4>Subtotal:</h4>
                <p>{`$${cartTotalAmount.toFixed(2)}`}</p>
              </SubTotalWrapper>
              <p>Taxes and shipping calculated at checkout</p>
              <CheckoutButton>Checkout</CheckoutButton>
            </Card>
          </CardContainer>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
