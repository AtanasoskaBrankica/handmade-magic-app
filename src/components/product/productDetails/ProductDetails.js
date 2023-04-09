import {doc, getDoc} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {db} from '../../../firebase/config';
import styled from 'styled-components';
import {
  ADD_TO_CART,
  DECREASE_CART,
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
} from '../../../redux/slice/cartSlice';
import {useDispatch, useSelector} from 'react-redux';
import useFetchDocument from '../../../customHooks/useFetchDocument';

const Container = styled.div`
  height: 80vh;
`;

const HeaderContainer = styled.div`
  height: 20%;
`;
const ProductContainer = styled.div`
  height: 80%;
  display: flex;
  flex-direction: row;
`;

const ImageContainer = styled.div`
  width: 30%;
`;

const ProductContent = styled.div`
  width: 70%;
`;
const Button = styled.button`
  background: orangered;
  color: white;
  padding: 0.5rem;
  font-size: 1rem;
`;
const ProductDetails = () => {
  const {id} = useParams();
  const [product, setProduct] = useState({});
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const {document} = useFetchDocument('products', id);

  const cart = cartItems.find(item => item.id === id);

  const isCartAdded = cartItems.findIndex(item => {
    return item.id === id;
  });

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const addToCart = product => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const decreaseCart = product => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };
  return (
    <Container>
      <HeaderContainer>
        <h1>Product Details</h1>
        <Link to="/#products">&larr; Back To Products</Link>
      </HeaderContainer>
      {product === null ? (
        //SPINNER
        <div></div>
      ) : (
        <ProductContainer>
          <ImageContainer>
            <img
              style={{width: '100%'}}
              src={product.imageURL}
              alt={product.name}
            />
          </ImageContainer>
          <ProductContent>
            <h3>{product.name}</h3>
            <p>
              <b>Price:</b>
              {`$${product.price}`}
            </p>
            <p>{product.desc}</p>
            <p>
              <b>SKU:</b>
              {product.id}
            </p>
            <p>
              <b>Brand:</b>
              {product.brand}
            </p>
            <div>
              {isCartAdded < 0 ? null : (
                <>
                  <button onClick={() => decreaseCart(product)}>-</button>
                  <p>
                    <b>{cart.cartQuantity}</b>
                  </p>
                  <button onClick={() => addToCart(product)}>+</button>
                </>
              )}
            </div>
            <Button onClick={() => addToCart(product)}>Add To Cart</Button>
          </ProductContent>
        </ProductContainer>
      )}
    </Container>
  );
};

export default ProductDetails;
