import React from 'react';
import {useSelector} from 'react-redux';
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from '../../redux/slice/cartSlice';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Card from '../card/Card';

const CheckoutSummaryContainer = styled.div``;

const SubTotalWrapper = styled.div`
  display: flex;

  flex-direction: row;
`;

const ProductContainer = styled.div`
  border: 1px solid black;
  margin-bottom: 0.5rem;
`;
const CheckoutSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  console.log('cartitems', cartItems);
  console.log(cartTotalQuantity);
  console.log(cartTotalAmount);
  return (
    <CheckoutSummaryContainer>
      <h2>Checkout Summary</h2>
      <div>
        {cartItems.lenght === 0 ? (
          <>
            <p>No items in your cart.</p>
            <button>
              <Link to="/#products">Back To Shop</Link>
            </button>
          </>
        ) : (
          <>
            <p>
              <b>{`Cart item(s): ${cartTotalQuantity}`}</b>
            </p>
            <SubTotalWrapper>
              <h4>Subtotal:</h4>
              <p>{`$${cartTotalAmount.toFixed(2)}`}</p>
            </SubTotalWrapper>
            {cartItems.map((item, index) => {
              const {id, name, price, cartQuantity} = item;
              return (
                <ProductContainer key={id}>
                  <h4>Product: {name}</h4>
                  <p>Quantity: {cartQuantity}</p>
                  <p>Unit Price: {price}</p>
                  <p>Price: {price * cartQuantity}</p>
                </ProductContainer>
              );
            })}
          </>
        )}
      </div>
    </CheckoutSummaryContainer>
  );
};

export default CheckoutSummary;
