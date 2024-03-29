import React from 'react';
import Card from '../../card/Card';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
} from '../../../redux/slice/cartSlice';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';

const Item = styled.div`
  display: flex;
  flex-direction: column;
  height: 280px;
  background-color: white;
`;

const ImageContainer = styled.div`
  display: flex;
  height: 70%;
  justify-content: center;
`;

const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 30%;
  font-size: 1rem;
`;

const ProductPrice = styled.div`
  display: flex;
  justify-content: center;
  height: 50%;
`;

const ProductName = styled.div`
  display: flex;
  font-size: 1rem;
  justify-content: center;
  height: 50%;
`;

const Button = styled.button`
  background: #ffae00;
  color: white;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;

const ProductItem = ({product, id, name, price, desc, imageURL}) => {
  const isActiveUser = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const shorthenText = (text, n) => {
    if (text.lenght > 15) {
      const shorthenedText = text.substring(0, n).concat('...');
      return shorthenedText;
    }
    return text;
  };

  const addToCart = product => {
    if (isActiveUser) {
      dispatch(ADD_TO_CART(product));
      dispatch(CALCULATE_TOTAL_QUANTITY());
    } else {
      toast.warning('Please log in to add products to your shopping cart.');
      return;
    }
  };

  return (
    <Card>
      <Item>
        <ImageContainer>
          <Link to={`/product-details/${id}`}>
            <img
              style={{width: '200px', height: '180px'}}
              src={imageURL}
              alt={name}
            />
          </Link>
        </ImageContainer>
        <ProductInfoContainer>
          <ProductName>{shorthenText(name, 18)}</ProductName>
          <ProductPrice>{`${price} MKD`}</ProductPrice>
        </ProductInfoContainer>
        <Button onClick={() => addToCart(product)}>Add To Cart</Button>
      </Item>
    </Card>
  );
};

export default ProductItem;
