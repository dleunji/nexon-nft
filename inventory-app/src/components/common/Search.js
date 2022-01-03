import React from 'react';
import styled from 'styled-components';
import OpenColor from '../../../node_modules/open-color/open-color.json';

const StyledSearchForm = styled.form`
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  border: 1px solid ${OpenColor.gray[9]};
  input,
  button {
    outline: none;
    border: none;
    font-size: 1rem;
  }
  input {
    width: 20rem;
    padding: 0.5rem;
    border: none;
    font-size: 1rem;
  }
  button {
    cursor: pointer;
    padding-right: 1rem;
    padding-left: 1rem;
    border: none;
    background: ${OpenColor.gray[8]};
    color: white;
    font-weight:bold;
    &:hover {
      background: ${OpenColor.gray[6]};
    }
  }
`;

const SearchBox = ({onChange, value}) => {
  return (
    <StyledSearchForm>
      <input
        placeholder="아이템명을 입력하세요"
        value={value}
        onChange={onChange}
        autoComplete="search"
        name="search"
      />
      <button type="submit">검색</button>
    </StyledSearchForm>
  );
};

export default SearchBox;