import React from 'react';
import styled from 'styled-components';

const LoginStyledButton  = styled.button`
  border : none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 025rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

`

const LoginButton = props => <LoginStyledButton {...props} />;