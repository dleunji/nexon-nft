import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import OpenColor from 'open-color';
import Button from './Button';

const MenuContainer = styled.div`
  position: relative;
`;
const Nav = styled.nav`
  .menu {
    position: absolute;
    visibility: hidden;
    transform: translateY(-20px);
  }
  .menu.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  .menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .menu li {
    border-bottom: 1px solid #dddddd;
    cursor: pointer;
  }
`;

const Order = ({ onMouseOver, onChange, onClick, display }) => {
  return(
    <MenuContainer>
      <Button onClick={onClick}>정렬 기준</Button>
      <Nav className={`menu ${display ? 'active' : 'inactive'}`}>
        <ul>
          <li>최신 발행순</li>
          <li>STR 내림차순</li>
          <li>DEX 내림차순</li>
          <li>LUK 내림차순</li>
          <li>가격 내림차순</li>
          <li>가격 오름차순</li>
        </ul>
      </Nav>
    </MenuContainer>
  );
}

export default Order;