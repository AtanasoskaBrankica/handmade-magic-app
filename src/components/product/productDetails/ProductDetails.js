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

const Container = styled.div`
  height: 80vh;
`;

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
`;

const ProductContent = styled.div`
  width: 40%;
`;
const Button = styled.button`
  background: #ffae00;
  color: white;
  padding: 0.5rem;
  font-size: 1.2rem;
  border-radius: 8px;
  border: none;
`;

const ImageWrapper = styled.div`
  width: 75%;
`;

const BackButton = styled.button`
  background: lightgrey;

  padding: 0.5rem;
  font-size: 1.2rem;
  border-radius: 8px;
  border: none;
`;

const BackLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const ReviewsContainer = styled.div`
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
        //SPINNER
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
            <h3 style={{fontSize: '1.5rem', marginTop: '0'}}>{product.name}</h3>
            <p style={{fontSize: '1rem'}}>
              <b>Price:</b>
              {`$${product.price}`}
            </p>
            <p style={{fontSize: '1.2rem'}}>{product.desc}</p>
            <p style={{fontSize: '1.2rem'}}>
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
            <ReviewsContainer>
              <Card>
                <h3>Product Reviews</h3>
                <div>
                  {filteredReviews.length === 0 ? (
                    <p>There are no reviews for this product yet.</p>
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
