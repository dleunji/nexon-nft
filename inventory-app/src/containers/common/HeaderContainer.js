import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';
import { changeField, initializeField } from '../../modules/search';
import { initializeOrder, toggleOrder, changeOrder } from "../../modules/order";

const HeaderContainer = () => {
  const dispatch = useDispatch();
  const { user, search, display, order  } = useSelector(({ user, search, order }) => ({
    user: user.user,
    search: search.search,
    display: order.display,
    order: order.order
  }));


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

  // hover 효과
  const onToggle = () => {
    dispatch((toggleOrder()));
  };

  // Toggle show / hide
  // const onToggle = () => {
  //   dispatch((toggleOrder()));
  // };

  // 정렬 기준 변경
  const onChangeOrder = (idx) => {
    dispatch(changeOrder(idx));
  }

  // 컴포넌트가 처음 렌더링될 때 input 초기화
  useEffect(() => {
    dispatch(initializeField());
    dispatch(initializeOrder());
  }, [dispatch]);

  return (
    <Header 
      user={user}
      onLogout={onLogout} 
      onChange={onChange}
      search={search}
      onChangeOrder={onChangeOrder}
      // onToggle={onToggle}
      onToggle={onToggle}
      display={display}
      order={order}
    />
  );
};

export default HeaderContainer;