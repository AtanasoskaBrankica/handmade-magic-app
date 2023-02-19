import React, {useEffect} from 'react';
import ProductList from './productList/ProductList';
import ProductFilter from './productFilter/ProductFilter';
import styled from 'styled-components';
import useFetchCollection from '../../customHooks/useFetchCollection';
import {useDispatch, useSelector} from 'react-redux';
import {selectProducts, STORE_PRODUCTS} from '../../redux/slice/productSlice';
import Loader from '../loader/Loader';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid green;
  margin-bottom: 2rem;
`;

const Aside = styled.aside`
  width: 20%;
`;
const ContainerProductList = styled.div`
  width: 80%;
`;
const Product = () => {
  const {data, isLoading} = useFetchCollection('products');
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [data]);
  return (
    <Container>
      <Aside style={{border: '1px solid red'}}>
        <ProductFilter />
      </Aside>
      <ContainerProductList style={{border: '1px solid blue'}}>
        {isLoading ? <Loader /> : <ProductList products={products} />}
      </ContainerProductList>
    </Container>
  );
};

export default Product;
