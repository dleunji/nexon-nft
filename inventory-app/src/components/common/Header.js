import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Responsive from './Responsive';
import Button from './Button';
import OpenColor from '../../../node_modules/open-color/open-color.json';
import SearchBox from './Search';
import { Dropdown, DropdownButton, Item, Menu, Toggle } from 'react-bootstrap';
const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  a {
    text-decoration: none;
  }
  .middleBlock {
    display: flex;
    align-items: center;
    margin-left: 3rem;
    
    // 정렬버튼 CSS 커스터마이징
    #input-group-dropdown-1 {
      border: none;
      :hover {
        background: none;
        color : ${OpenColor.gray[8]};
      }
      :focus {
        box-shadow: none;
      }
    }
    .dropdown-item {
      :focus {
        background-color: ${OpenColor.green[8]};
        opacity : 0.7;
      }
    }
  }
  .dropdownBlock {
    width: 12rem;
  }
  .log {
    color: ${OpenColor.gray[8]};
  }
  .
`;

/**
 * Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
 */

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
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

const orderList = [

  {
    label: '정렬 조건을 선택하세요',
    value: 0
  },
  {
    label :'가격 오름차순',
    value: 1
  },
  {
    label: 'STR 내림차순',
    value: 2
  },
  {
    label: 'LUK 내림차순',
    value: 3
  },
  {
    label: 'INT 내림차순',
    value: 4
  }
];

const orderStyle = {
  wrapper: { 
    fontSize: '1rem',
    width:'6rem',
  },
  header: {
    border:'none',
  },
  headerTitle : {
    margin: 0,
    padding: '0px 0rem 0 1rem',
    color: OpenColor.gray[8],
    fontWeight: 'normal'
  },
  listItem: {
    fontSize: '1rem',
    color: OpenColor.gray[8],
    fontWeight: 'normal'
  },
  list :{
    fontSize: '1rem',
    color: OpenColor.gray[8],
    fontWeight: 'normal'
  }
};

const LoginButton = styled(Link)`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: ${OpenColor.gray[8]};
  outline: none;
  cursor: pointer;
  padding-right: 1rem;
  padding-left: 1rem;
`;


const Header = ({ user, onLogout, onChange, search, onChangeOrder, onToggle, display, order }) => {
  return(
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo">Nexon Inventory</Link>
          <div className="middleBlock">
            {/* 검색창 */}
            <SearchBox
              onChange={onChange}
              value={search}
            />
            <div className="dropdownBlock">
              <DropdownButton
                variant="outline-secondary"
                title={orderList[order].label}
                id="input-group-dropdown-1"
              > 
                {orderList.map((item)=>
                  { 
                    return (
                      <Dropdown.Item
                        key={item.value} 
                        href="#"
                        onClick={() => onChangeOrder(item.value)}
                      > 
                        {item.label} 
                      </Dropdown.Item>
                    );
                  })}
              </DropdownButton>
            </div>
          </div>
          {/* 주소와 이더 잔고 */}
          <div className="rightBlock">
            {user? (
              <div className="right">
                <UserInfo>{user.userAddress}</UserInfo> 
                <span> 님의 잔액 0</span>
                {/* 잔고 */}
                <LoginButton className="log in"onClick={onLogout}>로그아웃</LoginButton>
              </div>
            ): (
              <div className="right">
                <LoginButton className="log out" to="/login">로그인</LoginButton>
              </div>
            )}
          </div>
        </Wrapper>
      </HeaderBlock>
    </>
  );
};

export default Header;