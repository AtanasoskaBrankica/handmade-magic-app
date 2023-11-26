import React from 'react';
import {useSelector} from 'react-redux';
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from '../../redux/slice/cartSlice';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const CheckoutSummaryContainer = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1rem;
`;

const SubTotalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ProductContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 10px;
  margin-bottom: 0.5rem;
  padding: 1rem;
`;

const CartQuantity = styled.p`
  font-weight: bold;
  margin: 0;
  margin-top: 1rem;
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
`;

const CheckoutSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  return (
    <CheckoutSummaryContainer>
      <h2 style={{fontSize: '1.3rem'}}>Checkout Summary</h2>
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
            <CartQuantity>{`Cart item(s): ${cartTotalQuantity}`}</CartQuantity>
            <SubTotalWrapper>
              <SubTotalTitle>Subtotal:</SubTotalTitle>
              <CartAmount>{`${cartTotalAmount.toFixed(2)} MKD`}</CartAmount>
            </SubTotalWrapper>
            {cartItems.map((item, index) => {
              const {id, name, price, cartQuantity} = item;
              return (
                <ProductContainer key={id}>
                  <h3 style={{margin: '0'}}>Product: {name}</h3>
                  <p>Quantity: {cartQuantity}</p>
                  <p>Unit Price: {price} MKD </p>
                  <p>Price: {price * cartQuantity} MKD</p>
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
