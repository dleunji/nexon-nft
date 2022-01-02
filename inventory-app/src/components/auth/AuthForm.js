import React from 'react';
import styled from 'styled-components';
import OpenColor from '../../../node_modules/open-color/open-color.json';
import Button from '../common/Button';

const lightGray = OpenColor.gray[2];
const deepGray = OpenColor.gray[7];

/**
 * 로그인 폼
 */
const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${OpenColor.gray[8]};
    margin-bottom: 1rem;
  }
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
const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const AuthForm = ({form, onChange, onSubmit }) => {
  return(
    <AuthFormBlock>
      <h3>로그인</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="userAddress"
          name="userAddress"
          placeholder="지갑 주소"
          onChange={onChange}
          value={form.userAddress}
        />
        <StyledInput
          autoComplete="password"
          name="password"
          placeholder="비밀번호"
          type="password"
          onChange={onChange}
          value={form.password}
        />
        <ButtonWithMarginTop green fullWidth>로그인</ButtonWithMarginTop>
      </form>
    </AuthFormBlock>
  );
};

export default AuthForm;