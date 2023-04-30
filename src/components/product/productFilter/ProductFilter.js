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
import {FilterContent, FilterWrapper} from '../../shared/Container';
import {FilterTitle} from '../../shared/Title';
import {Button} from '../../shared/Button';

const FilterContainer = styled.div``;

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

const Select = styled.select`
  border-radius: 15px;
  padding: 0.5rem;
  font-size: 1.2rem;
`;

const ButtonWrapper = styled.div`
  margin-left: 7rem;
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
      <FilterWrapper height="50%">
        <FilterTitle>Categories</FilterTitle>
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
      </FilterWrapper>
      <FilterWrapper height="20%">
        <FilterTitle marginTop="0">Brand</FilterTitle>
        <FilterContent>
          <Select value={brand} onChange={e => setBrand(e.target.value)}>
            {allBrands.map((brand, index) => {
              return (
                <option key={index} value={brand}>
                  {brand}
                </option>
              );
            })}
          </Select>
        </FilterContent>
      </FilterWrapper>
      <FilterWrapper height="20%">
        <FilterTitle>Sort By</FilterTitle>
        <FilterContent>
          <Select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </Select>
        </FilterContent>
      </FilterWrapper>
      <FilterWrapper height="20%">
        <FilterTitle>Price</FilterTitle>
        <FilterContent fontSize="1.2rem">
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
        </FilterContent>
      </FilterWrapper>
      <ButtonWrapper>
        <Button background="#ffae00" onClick={clearFilters}>
          Clear Filters
        </Button>
      </ButtonWrapper>
    </FilterContainer>
  );
};

export default ProductFilter;
