import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import styled from 'styled-components';
import {
  ADD_TO_CART,
  DECREASE_CART,
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
} from '../../../redux/slice/cartSlice';
import {useDispatch, useSelector} from 'react-redux';
import useFetchDocument from '../../../customHooks/useFetchDocument';
import Card from '../../card/Card';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import StarsRating from 'react-star-rate';
import {
  BackButton,
  Button,
  DecreaseCartButton,
  IncreaseCartButton,
} from '../../shared/Button';
import {BackLink} from '../../shared/Button';
import {ProductLabel} from '../../shared/Text';
import {CartQuantity} from '../../shared/Container';

const Container = styled.div``;

const HeaderContainer = styled.div`
  height: 20%;
  padding-left: 5.5rem;
`;

const ProductContainer = styled.div`
  height: 80%;
  display: flex;
  flex-direction: row;
`;

const ImageContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const ProductContent = styled.div`
  width: 40%;
  margin-top: 0.5rem;
`;

const ImageWrapper = styled.div`
  width: 85%;
  margin-left: 5rem;
`;

const ReviewsContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const QuantityWrapper = styled.div`
  width: 10%;
  display: flex;
  flexdirection: row;
  height: 10%;
`;

const ReviewTitle = styled.h3`
  padding-left: 1rem;
  margin: 0;
  padding-top: 1rem;
`;

const ReviewMessage = styled.p`
  margin: 0;
`;

const Wrapper = styled.div`
  margin-top: -1.5rem;
  margin-bottom: 1rem;
`;

const ButtonWrapper = styled.div`
  margin-top: 2rem;
`;

const ProductDetails = () => {
  const {id} = useParams();
  const [product, setProduct] = useState({});
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const {document} = useFetchDocument('products', id);
  const {data} = useFetchCollection('reviews');
  const filteredReviews = data.filter(review => review.productId === id);

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
        <BackButton>
          <BackLink to="/#products">&larr; Back To Products</BackLink>
        </BackButton>
      </HeaderContainer>
      {product === null ? (
        <div></div>
      ) : (
        <ProductContainer>
          <ImageContainer>
            <ImageWrapper>
              <Card>
                <img
                  style={{width: '100%'}}
                  src={product.imageURL}
                  alt={product.name}
                />
              </Card>
            </ImageWrapper>
          </ImageContainer>
          <ProductContent>
            <ProductLabel fontSize="1.5rem" marginTop="0">
              <b>{product.name}</b>
            </ProductLabel>
            <ProductLabel fontSize="1.2rem">
              <b>Price:</b>
              {` ${product.price} MKD`}
            </ProductLabel>
            <ProductLabel fontSize="1.2rem">
              <b>Description: </b>
              {product.desc}
            </ProductLabel>
            <ProductLabel fontSize="1.2rem">
              <b>Brand:</b>
              {product.brand}
            </ProductLabel>
            <Wrapper>
              {isCartAdded < 0 ? null : (
                <>
                  <QuantityWrapper>
                    <DecreaseCartButton onClick={() => decreaseCart(product)}>
                      -
                    </DecreaseCartButton>
                    <CartQuantity>
                      <b>{cart.cartQuantity}</b>
                    </CartQuantity>
                    <IncreaseCartButton onClick={() => addToCart(product)}>
                      +
                    </IncreaseCartButton>
                  </QuantityWrapper>
                </>
              )}
            </Wrapper>
            <ButtonWrapper>
              <Button background="#ffae00" onClick={() => addToCart(product)}>
                Add To Cart
              </Button>
            </ButtonWrapper>
            <ReviewsContainer>
              <Card>
                <ReviewTitle>Product Reviews</ReviewTitle>
                <div style={{padding: '1rem'}}>
                  {filteredReviews.length === 0 ? (
                    <ReviewMessage>
                      There are no reviews for this product yet.
                    </ReviewMessage>
                  ) : (
                    <>
                      {filteredReviews.map((item, index) => {
                        const {rate, review, reviewDate, username} = item;
                        return (
                          <div>
                            <StarsRating value={rate} />
                            <p>{review}</p>
                            <p>{reviewDate}</p>
                            <p>{username}</p>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </Card>
            </ReviewsContainer>
          </ProductContent>
        </ProductContainer>
      )}
    </Container>
  );
};

export default ProductDetails;
