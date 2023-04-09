import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from '../../../redux/slice/filterSlice';
import {
  selectMaxPrice,
  selectMinPrice,
  selectProducts,
} from '../../../redux/slice/productSlice';

const FilterContainer = styled.div`
  height: 100%;
`;

const CategoriesWrapper = styled.div`
  height: 50%;
  border: 1px solid black;
`;
const BrandWrapper = styled.div`
  height: 20%;
  border: 1px solid black;
`;

const PriceWrapper = styled.div`
  height: 20%;
  border: 1px solid black;
`;
const Button = styled.button`
  background: orangered;
  color: white;
  padding: 0.5rem;
  font-size: 1rem;
`;

const ProductFilter = () => {
  const [category, setCategory] = useState('All');
  const [brand, setBrand] = useState('All');
  const [price, setPrice] = useState(3000);
  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);
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

  const clearFilters = () => {
    setCategory('All');
    setBrand('All');
    setPrice(maxPrice);
  };
  return (
    <FilterContainer>
      <CategoriesWrapper>
        <h4>Categories</h4>
        {allCategories.map((category, index) => {
          return (
            <button
              key={index}
              type="button"
              onClick={() => filterProducts(category)}
            >
              {category}
            </button>
          );
        })}
      </CategoriesWrapper>
      <BrandWrapper>
        <h4>Brand</h4>
        <select value={brand} onChange={e => setBrand(e.target.value)}>
          {allBrands.map((brand, index) => {
            return (
              <option key={index} value={brand}>
                {brand}
              </option>
            );
          })}
        </select>
      </BrandWrapper>
      <PriceWrapper>
        <h4>Price</h4>
        <p>{`$${price}`}</p>
        <div>
          <input
            type="range"
            value={price}
            onChange={e => setPrice(e.target.value)}
            min={minPrice}
            max={maxPrice}
          />
        </div>
      </PriceWrapper>
      <Button onClick={clearFilters}>Clear Filters</Button>
    </FilterContainer>
  );
};

export default ProductFilter;
