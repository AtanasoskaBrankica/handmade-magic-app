import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
  SORT_PRODUCTS,
} from '../../../redux/slice/filterSlice';
import {
  selectMaxPrice,
  selectMinPrice,
  selectProducts,
} from '../../../redux/slice/productSlice';
import {RiArrowDropRightFill} from 'react-icons/ri';

const FilterContainer = styled.div``;

const CategoriesWrapper = styled.div`
  height: 50%;
`;

const SortWrapper = styled.div``;

const BrandWrapper = styled.div`
  height: 20%;
`;

const PriceWrapper = styled.div`
  height: 20%;
`;
const Button = styled.button`
  background: #ffae00;
  color: white;
  padding: 0.7rem;
  font-size: 1rem;
  margin-left: 7rem;
  border-radius: 10px;
  border: none;
`;

const CategoriesTitle = styled.h1`
  text-align: center;
`;
const CategoriesContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-left: 1.5rem;
`;

const CategoriesButton = styled.button`
  border: none;
  background: white;
  border-bottom: 1px solid lightgrey;
  font-size: 1.2rem;
  width: 50%;
  text-align: left;
  margin-bottom: 2.5rem;
`;

const BrandTitle = styled.h1`
  padding-left: 7rem;
  margin-top: 0;
`;

const SortTitle = styled.h1`
  padding-left: 7rem;
`;

const SortContent = styled.div`
  padding-left: 7rem;
`;
const BrandContent = styled.div`
  padding-left: 7rem;
`;
const Select = styled.select`
  border-radius: 15px;
  padding: 0.5rem;
  font-size: 1.2rem;
`;

const PriceTitle = styled.h1`
  padding-left: 7rem;
`;

const PriceContent = styled.div`
  padding-left: 7rem;
  font-size: 1.2rem;
`;
const ProductFilter = () => {
  const [category, setCategory] = useState('All');
  const [brand, setBrand] = useState('All');
  const [price, setPrice] = useState(3000);
  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);
  const [sort, setSort] = useState('latest');
  const allCategories = [
    'All',
    ...new Set(products.map(product => product.category)),
  ];
  const allBrands = ['All', ...new Set(products.map(product => product.brand))];
  console.log('allBrands', allBrands);
  const dispatch = useDispatch();
  console.log('allCategories', allCategories);
  const filterProducts = category => {
    setCategory(category);
    dispatch(FILTER_BY_CATEGORY({products, category}));
  };

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({products, brand}));
  }, [products, brand]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({products, price}));
  }, [products, price]);

  useEffect(() => {
    dispatch(SORT_PRODUCTS({products, sort}));
  }, [sort, products]);

  const clearFilters = () => {
    setCategory('All');
    setBrand('All');
    setPrice(maxPrice);
  };
  return (
    <FilterContainer>
      <CategoriesWrapper>
        <CategoriesTitle>Categories</CategoriesTitle>
        <CategoriesContent>
          {allCategories.map((category, index) => {
            return (
              <CategoriesButton
                key={index}
                type="button"
                onClick={() => filterProducts(category)}
              >
                <RiArrowDropRightFill />
                {category}
              </CategoriesButton>
            );
          })}
        </CategoriesContent>
      </CategoriesWrapper>
      <BrandWrapper>
        <BrandTitle>Brand</BrandTitle>
        <BrandContent>
          <Select value={brand} onChange={e => setBrand(e.target.value)}>
            {allBrands.map((brand, index) => {
              return (
                <option key={index} value={brand}>
                  {brand}
                </option>
              );
            })}
          </Select>
        </BrandContent>
      </BrandWrapper>
      <SortWrapper>
        <SortTitle>Sort By</SortTitle>
        <SortContent>
          <Select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </Select>
        </SortContent>
      </SortWrapper>
      <PriceWrapper>
        <PriceTitle>Price</PriceTitle>
        <PriceContent>
          <p style={{marginBottom: '0'}}>{`$${price}`}</p>
          <div>
            <input
              type="range"
              value={price}
              onChange={e => setPrice(e.target.value)}
              min={minPrice}
              max={maxPrice}
            />
          </div>
        </PriceContent>
      </PriceWrapper>
      <Button onClick={clearFilters}>Clear Filters</Button>
    </FilterContainer>
  );
};

export default ProductFilter;
