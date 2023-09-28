import React, {useEffect, useState} from 'react';
import {
  selectProducts,
  STORE_PRODUCTS,
} from '../../../redux/slice/productSlice';
import {useDispatch, useSelector} from 'react-redux';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import Pagination from '../../pagination/Pagination';
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
} from '../../../redux/slice/filterSlice';
import styled from 'styled-components';
import Search from '../../search/Search';
import {Title} from '../../shared/Title';
import {ProductsTable} from '../../shared/Table';
import Loader from '../../loader/Loader';

const TopContainer = styled.div`
  height: 10%;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const GridWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.2rem;
  padding-top: 2px;
  width: 30%;
  padding-bottom: 0.5rem;
  margin-right: 6rem;
`;

const SearchWrapper = styled.div`
  width: 60%;
`;

const Products = () => {
  const [searchValue, setSearchValue] = useState('');
  const {data, isLoading} = useFetchCollection('products');
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(2);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [data]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({products, searchValue}));
  }, [searchValue, products]);

  return (
    <>
      {products.length === 0 && <Loader />}
      <div>
        <Title>All Products</Title>
        <TopContainer>
          <GridWrapper>
            <p style={{margin: '0'}}>
              <b>{filteredProducts.length}</b>
              <span style={{marginLeft: '5px'}}>Products found</span>
            </p>
          </GridWrapper>
          <SearchWrapper>
            <Search
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
          </SearchWrapper>
        </TopContainer>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <>
            <ProductsTable filteredProducts={filteredProducts} />
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              productsPerPage={productsPerPage}
              totalProducts={products.length}
            ></Pagination>
          </>
        )}
      </div>
    </>
  );
};

export default Products;
