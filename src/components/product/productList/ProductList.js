import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Search from '../../search/Search';
import ProductItem from '../productItem/ProductItem';
import {useDispatch, useSelector} from 'react-redux';
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
} from '../../../redux/slice/filterSlice';
import Pagination from '../../pagination/Pagination';

const Container = styled.div``;

const TopContainer = styled.div`
  height: 10%;
  width: 40%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 1.6rem;
`;

const GridWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.2rem;
  padding-top: 2px;
  width: 30%;
  margin-right: 6rem;
`;

const SearchWrapper = styled.div`
  width: 50%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 400px 450px;
  grid-gap: 15px;
  margin-top: 1rem;
  height: 100%;
`;

const ProductList = ({products}) => {
  const [searchValue, setSearchValue] = useState('');
  const filteredProducts = useSelector(selectFilteredProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(15);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({products, searchValue}));
  }, [searchValue, products]);

  return (
    <Container id="product">
      <TopContainer>
        <SearchWrapper>
          <Search
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
        </SearchWrapper>
        <GridWrapper>
          <p style={{margin: '0'}}>
            <b>{filteredProducts.length}</b>
            <span style={{marginLeft: '5px'}}>Products found</span>
          </p>
        </GridWrapper>
      </TopContainer>
      <div>
        <Grid>
          {currentProducts.map(product => {
            return (
              <div key={product.id}>
                <ProductItem {...product} product={product} />
              </div>
            );
          })}
        </Grid>
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
      ></Pagination>
    </Container>
  );
};

export default ProductList;
