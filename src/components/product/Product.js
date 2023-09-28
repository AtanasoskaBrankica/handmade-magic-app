import React, {useEffect} from 'react';
import ProductList from './productList/ProductList';
import ProductFilter from './productFilter/ProductFilter';
import styled from 'styled-components';
import useFetchCollection from '../../customHooks/useFetchCollection';
import {useDispatch, useSelector} from 'react-redux';
import {
  GET_PRICE_RANGE,
  selectProducts,
  STORE_PRODUCTS,
} from '../../redux/slice/productSlice';

const Container = styled.div`
  display: flex;
  flex-direction: row;
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
    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [data]);

  return (
    <Container>
      <Aside>
        <ProductFilter />
      </Aside>
      <ContainerProductList>
        <ProductList products={products} />
      </ContainerProductList>
    </Container>
  );
};

export default Product;
