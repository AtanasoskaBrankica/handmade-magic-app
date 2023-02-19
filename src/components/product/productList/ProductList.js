import React, {useState} from 'react';
import styled from 'styled-components';
import {BsFillGridFill} from 'react-icons/bs';
import {FaListAlt} from 'react-icons/fa';
import Search from '../../search/Search';
import ProductItem from '../productItem/ProductItem';
const Container = styled.div`
  border: 1px solid green;
  height: 100%;
`;
const TopContainer = styled.div`
  height: 10%;
  border: 1px solid blue;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const GridWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid blue;
  flex: 1;
`;

const Icon = styled.div`
  margin-right: 1rem;
`;
const SearchWrapper = styled.div`
  border: 1px solid green;
  flex: 1;
`;

const SortWrapper = styled.div`
  border: 1px solid red;
  flex: 1;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 300px 300px;
  grid-gap: 20px;
`;

const ProductList = ({products}) => {
  const [grid, setGrid] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  console.log('products==>', products);
  return (
    <Container id="product">
      <TopContainer>
        <GridWrapper>
          <Icon>
            <BsFillGridFill
              size={25}
              color="orangered"
              onClick={() => setGrid(true)}
            />
          </Icon>
          <Icon>
            <FaListAlt size={25} color="blue" onClick={() => setGrid(false)} />
          </Icon>
          <p>15 Products found</p>
        </GridWrapper>
        <SearchWrapper>
          <Search
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
        </SearchWrapper>
        <SortWrapper>
          <label>Sort by:</label>
          <select>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </SortWrapper>
      </TopContainer>
      <Grid>
        {products.map(product => {
          return (
            <div key={product.id}>
              <ProductItem {...product} product={product} />
            </div>
          );
        })}
      </Grid>
    </Container>
  );
};

export default ProductList;
