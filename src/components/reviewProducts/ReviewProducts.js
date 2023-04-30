import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {selectUserId, selectUsername} from '../../redux/slice/authSlice';
import {selectProducts} from '../../redux/slice/productSlice';
import styled from 'styled-components';
import Card from '../card/Card';
import StarsRating from 'react-star-rate';
import {addDoc, collection, Timestamp} from 'firebase/firestore';
import {db} from '../../firebase/config';
import {toast} from 'react-toastify';
import useFetchDocument from '../../customHooks/useFetchDocument';
// import spinnerImg
const ReviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 10rem;
`;

const ProductName = styled.p`
  font-size: 1.2rem;
`;

const ReviewContent = styled.div`
  width: 40%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const ReviewTitle = styled.h1`
  padding-left: 10rem;
`;

const Form = styled.form`
  padding: 1rem;
`;

const ReviewButton = styled.button`
  background: cornflowerblue;
  color: white;
  width: 25%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 1.2rem;
  border-radius: 10px;

  border: none;
`;
const ReviewProducts = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState('');
  const [product, setProduct] = useState(null);
  const {id} = useParams();
  const {document} = useFetchDocument('products', id);
  const userId = useSelector(selectUserId);
  const username = useSelector(selectUsername);

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const submitProductReview = e => {
    e.preventDefault();
    console.log(review, rate);
    const today = new Date();
    const currentDate = today.toDateString();

    const reviewProductConfig = {
      userId,
      username,
      productId: id,
      rate,
      review,
      reviewDate: currentDate,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, 'reviews'), reviewProductConfig);
      toast.success('Review submitted successfully');
      setRate(0);
      setReview('');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <ReviewTitle>Rate this product</ReviewTitle>
      <ReviewContainer>
        <ProductInfo>
          <ProductName>
            <b>Product Name:</b>
            {product?.name}
          </ProductName>
          <img src={product?.imageURL} alt={product?.name} width="300px" />
        </ProductInfo>

        <ReviewContent>
          <Card>
            <Form onSubmit={e => submitProductReview(e)}>
              <p>Rating:</p>
              <StarsRating
                value={rate}
                onChange={value => {
                  setRate(value);
                }}
              />
              <p>Review:</p>
              <textarea
                cols="30"
                rows="10"
                value={review}
                required
                onChange={e => setReview(e.target.value)}
              ></textarea>

              <ReviewButton type="submit">Submit Review</ReviewButton>
            </Form>
          </Card>
        </ReviewContent>
      </ReviewContainer>
    </>
  );
};

export default ReviewProducts;
