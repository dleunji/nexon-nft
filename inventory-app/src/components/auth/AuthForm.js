import React from 'react';
import styled from 'styled-components';
import OpenColor from '../../../node_modules/open-color/open-color.json';


const lightGray = OpenColor.gray[2];
const deepGray = OpenColor.gray[7];

/**
 * 로그인 폼
 */
const AuthFormBlock = styled.div`
`;



const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${lightGray};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: black;
    border-bottom: 1px solid ${deepGray};
  }
  & + & {
    margin-top: 1rem;
  }
`;

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
`;

const AuthForm = () => {
  return(
    <AuthFormBlock>
      <h3>로그인</h3>
      <form>
        <StyledInput autoComplete="userAddress" name="userAddress" placeholder="지갑 주소" />
        <StyledInput
          autoComplete="password"
          name="password"
          placeholder="비밀번호"
          type="password"
        />
        <StyledButton>로그인</StyledButton>
      </form>
    </AuthFormBlock>
  );
};

export default AuthForm;