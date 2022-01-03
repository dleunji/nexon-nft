import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Responsive from './Responsive';
import Button from './Button';
import OpenColor from '../../../node_modules/open-color/open-color.json';
import SearchBox from './Search';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

/**
 * Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
 */

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 1.6rem;
    font-weight: bold;
    letter-spacing: 2px;
    font-family: 'Bungee Shade', cursive;
    color: ${OpenColor.gray[9]};
  }

  .right {
    display: flex;
    aligh-items: center;
  }
`;

/**
 * 헤더가 fixed로 되어있기 때문에 페이지의 콘텐츠가 4rem 아래에 나타나도록 해주는 컴포넌트
 */

const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

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

const Header = ({ user, onLogout, onChange, search, OrderDropdown }) => {
  return(
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo">Nexon Inventory</Link>
          {/* 검색창 */}
          <SearchBox
            onChange={onChange}
            value={search}
          />
          {/* 정렬 기준 */}
          <OrderDropdown />
          {user? (
            <div className="right">
              <UserInfo>{user.userAddress}</UserInfo>
              <Button onClick={onLogout}>로그아웃</Button>
            </div>
          ): (
            <div className="right">
              <Button to="/login">로그인</Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
    </>
  );
};

export default Header;