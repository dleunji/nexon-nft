import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import OpenColor from '../../../node_modules/open-color/open-color.json';

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${OpenColor.gray[8]};
  &:hover {
    background: ${OpenColor.gray[6]};
  }

  ${props =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${props => 
    props.green && 
    css`
      background: ${OpenColor.green[8]};
      &:hover {
        background: ${OpenColor.green[6]};
      }
    `}
  }
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const Button = props => {
  return props.to ? (
    <StyledLink {...props} green={props.green ? 1 : 0}/>
  ) : (
    <StyledButton {...props} />
  );
};
export default Button;