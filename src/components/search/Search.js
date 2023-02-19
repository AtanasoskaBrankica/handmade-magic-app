import React from 'react';
import {BiSearch} from 'react-icons/bi';
import styled from 'styled-components';

const SearchContainer = styled.div`
  border: 1px solid black;
  width: 60%;
  height: 60%;
  display: flex;
  flex-direction: row;
`;
const SearchInput = styled.input`
  border: none;
  font-size: 1rem;
`;

const SearchIcon = styled.div`
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  margin-left: 1rem;
`;
const Search = ({value, onChange}) => {
  return (
    <SearchContainer>
      <SearchIcon>
        <BiSearch size={20} />
      </SearchIcon>

      <SearchInput
        type="text"
        placeholder="Search by name"
        value={value}
        onChange={onChange}
      />
    </SearchContainer>
  );
};

export default Search;
