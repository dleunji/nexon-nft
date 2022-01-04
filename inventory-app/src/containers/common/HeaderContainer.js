import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/common/Header';
import { changeBalance, logout } from '../../modules/user';
import { changeField, initializeField } from '../../modules/search';
import { initializeOrder, changeOrder } from "../../modules/order";
import { getBalance } from '../../lib/api/user';

const HeaderContainer = () => {
  const dispatch = useDispatch();
  const { user, balance, search, order  } = useSelector(({ user, search, order }) => ({
    user: user.user,
    balance : user.balance,
    search: search.search,
    order: order.order,
  }));

  const userAddress = localStorage.getItem('user');

  const onLogout = () => {
    dispatch(logout());
  };

  // 인풋 변경 이벤트 핸들러
  const onChange = e => {
    const { value, name } = e.target;
    console.log(name, value);
    dispatch(
      changeField({
        key: name,
        value
      })
    );
  };

  // 정렬 기준 변경
  const onChangeOrder = (idx) => {
    dispatch(changeOrder(idx));
  }

  const getBalanceFunc = async (userAddress) => {
    getBalance(userAddress)
    .then(res => res.json())
    .then(data => {
      dispatch(changeBalance(data.value));
    });

    // console.log(_balance['value']);
    // return _balance;
  };

  // 컴포넌트가 처음 렌더링될 때 input 초기화
  useEffect(() => {
    dispatch(initializeField());
    dispatch(initializeOrder());
  }, [dispatch]);

  //user가 생기면 user에 해당하는 balance 상태값 변경
  useEffect(()=>{
    if(userAddress) {
      getBalanceFunc(userAddress);
    }
  }, [userAddress])

  return (
    <Header 
      user={user}
      onLogout={onLogout} 
      onChange={onChange}
      search={search}
      onChangeOrder={onChangeOrder}
      order={order}
      balance={balance}
    />
  );
};

export default HeaderContainer;