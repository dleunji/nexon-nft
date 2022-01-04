import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Responsive from './Responsive';
import OpenColor from '../../../node_modules/open-color/open-color.json';
import SearchBox from './Search';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
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
    margin-left: 6rem;
    
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
    :hover {
      color: ${OpenColor.gray[6]};
    }
  }
  .in {
    margin-left: 20rem;
  }
`;

/**
 * Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
 */

const Wrapper = styled(Responsive)`
  padding: 0 2rem;
  height: 4rem;
  display: flex;
  align-items: center;
  // justify-content: space-between;
  .logo {
    font-size: 1.6rem;
    font-weight: bold;
    letter-spacing: 2px;
    font-family: 'Bungee Shade', cursive;
    color: ${OpenColor.gray[9]};
  }
  .rightBlock {
    padding-left: 10rem;
    .right {
      display: flex;
      aligh-items: center;
    }
  }
`;

/**
 * 헤더가 fixed로 되어있기 때문에 페이지의 콘텐츠가 4rem 아래에 나타나도록 해주는 컴포넌트
 */

const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  font-size : 1rem;
  display: flex;
  justify-content: end;
  width: 20rem;
  overflow: hidden;
  text-overflow: ellipsis;
  align-items: center;
  .balance {
    overflow: hidden;
    text-overflow: ellipsis;
    width: 10rem;
    text-align: center;
    align-items: center;
    margin: 0 0.5rem;
    .fa-ethereum {
      padding-right: 0.5rem;
    }
    .ether-num {
      padding-right: 0.1rem;
      overflow: hidden;
      text-overflow: 
      width: 5rem;
    }
  }
`;

const orderList = [
  {
    label: '정렬 조건을 선택하세요',
    value: 0
  },
  {
    label :'낮은 금액순',
    value: 1
  },
  {
    label: '높은 금액순',
    value: 2
  },
  {
    label: '근력 높은순',
    value: 3
  },
  {
    label: '지능 높은순',
    value: 4
  },
  {
    label: '민첩 높은순',
    value: 5
  },
  {
    label: '운 높은순',
    value: 6
  },
];

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

const userAddress = localStorage.getItem('user');

const Header = ({ user, onLogout, onChange, search, onChangeOrder, order, balance }) => {
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
                    // 안내문구 생략
                    if (item.value!=0){
                      return (
                        <Dropdown.Item
                          key={item.value} 
                          href="#"
                          onClick={() => onChangeOrder(item.value)}
                        > 
                          {item.label} 
                        </Dropdown.Item>
                      );
                    }
                  })}
              </DropdownButton>
            </div>
          </div>
          {/* 주소와 이더 잔고 */}
          <div className="rightBlock">
            {user? (
              <div className="right">
                <UserInfo>
                  {/* <div className="wrapper wallet">
                    <i className="fas fa-wallet"></i>
                      <b>{userAddress}</b>
                  </div> */}
                  <div className="balance">
                    <OverlayTrigger
                      placement="bottom"
                      overlay={ <Tooltip id="button-tooltip-2">{userAddress}</Tooltip> }
                    >
                      {({ref, ...triggerHandler}) => (
                        <div {...triggerHandler}>
                          <i className="fab fa-ethereum" ref={ref} /> 
                            <b className="ether-num"> {balance.toFixed(4)}Ether</b>
                        </div>
                      )}
                    </OverlayTrigger>
                </div>
                {/* 잔고 */}
                </UserInfo>
                <LoginButton className="log out"onClick={onLogout} to="/#">로그아웃</LoginButton>
              </div>
            ): (
              <div className="right">
                <LoginButton className="log in" to="/login">로그인</LoginButton>
              </div>
            )}
          </div>
        </Wrapper>
      </HeaderBlock>
      <Spacer/>
    </>
  );
};

export default Header;