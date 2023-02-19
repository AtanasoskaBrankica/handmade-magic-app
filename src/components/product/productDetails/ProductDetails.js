import {doc, getDoc} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {db} from '../../../firebase/config';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid red;
  height: 80vh;
`;

const HeaderContainer = styled.div`
  border: 1px solid blue;
  height: 20%;
`;
const ProductContainer = styled.div`
  border: 1px solid green;
  height: 80%;
  display: flex;
  flex-direction: row;
`;

const ImageContainer = styled.div`
  border: 1px solid yellow;
  width: 30%;
`;

const ProductContent = styled.div`
  border: 1px solid green;
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

  const getProduct = async () => {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log('Document data:', docSnap.data());
      const obj = {
        id: id,
        ...docSnap.data(),
      };
      setProduct(obj);
    } else {
      toast.error('Product not found');
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
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
              <button>-</button>
              <p>
                <b>1</b>
              </p>
              <button>+</button>
            </div>
            <Button>Add To Cart</Button>
          </ProductContent>
        </ProductContainer>
      )}
    </Container>
  );
};

export default ProductDetails;
