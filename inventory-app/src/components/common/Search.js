import React from 'react';
import styled from 'styled-components';
import OpenColor from '../../../node_modules/open-color/open-color.json';

const StyledSearch = styled.input`
  font-size: 1rem;
  border: 1px solid ${OpenColor.gray[3]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 30%;
  &:focus {
    color: black;
    border: 1px solid ${OpenColor.gray[5]};
  }
`;

const Search = ({onChange, value}) => {
  return (
    <StyledSearch
      onChange={onChange}
      value={value}
      autoComplete="search"
      placeholder="아이템명"
      name="search"
    />
  );
};

export default Search;