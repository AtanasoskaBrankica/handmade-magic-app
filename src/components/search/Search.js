import React from 'react';
import {BiSearch} from 'react-icons/bi';
import styled from 'styled-components';

const SearchContainer = styled.div`
  border: 1px solid black;
  padding: 5px;
  height: 60%;
  display: flex;
  flex-direction: row;
  border-radius: 15px;
`;

const SearchInput = styled.input`
  border: none;
  font-size: 1.1rem;
  outline: none;
`;

const SearchIcon = styled.div`
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
