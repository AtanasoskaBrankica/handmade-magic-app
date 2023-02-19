import React from 'react';
import Card from '../../card/Card';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {connectAuthEmulator} from 'firebase/auth';

const Container = styled.div`
  border: 1px solid;
  height: 100%;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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
  font-size: 20px;
`;
const ProductPrice = styled.div`
  display: flex;

  justify-content: center;
  height: 50%;
  color: red;
`;
const ProductName = styled.div`
  display: flex;

  justify-content: center;
  height: 50%;
`;

const Button = styled.button`
  background: orangered;
  color: white;
  padding: 0.5rem;
  font-size: 1rem;
`;
const ProductItem = ({product, id, name, price, desc, imageURL}) => {
  const shorthenText = (text, n) => {
    if (text.lenght > 15) {
      const shorthenedText = text.substring(0, n).concat('...');
      return shorthenedText;
    }
    return text;
  };
  return (
    <Card>
      <Item>
        <ImageContainer>
          <Link to={`/product-details/${id}`}>
            <img style={{width: '200px'}} src={imageURL} alt={name} />
          </Link>
        </ImageContainer>

        <ProductInfoContainer>
          <ProductPrice>{`$${price}`}</ProductPrice>
          <ProductName>{shorthenText(name, 18)}</ProductName>
        </ProductInfoContainer>
        <Button>Add To Cart</Button>
      </Item>
    </Card>
  );
};

export default ProductItem;
