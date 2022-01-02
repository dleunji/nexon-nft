import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import OpenColor from '../../../node_modules/open-color/open-color.json';
/**
 * 로그인 페이지의 레이아웃을 담당하는 컴포넌트
 */

const AuthTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  right: 0;
  background-image : linear-gradient(
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.4)
    ),url('/images/login_wallpaper.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const WhiteBox = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
    font-family: 'Bungee Shade', cursive;
    font-size: 1.8rem;
    color: ${OpenColor.gray[9]};
  }
  box-shadow: 0 0 8px rgba(0,0,0,0.025);
  padding: 2rem;
  background: white;
  border-radius: 2px;
`;

const AuthTemplate = ({ children }) => {
  return(
    <AuthTemplateBlock> 
      <WhiteBox>
        <div className="logo-area">
          <Link to="/">
              Nexon Inventory
          </Link>
        </div>
        {children}
      </WhiteBox>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;