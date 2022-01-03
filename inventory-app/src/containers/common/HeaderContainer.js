import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';
import { changeField, initializeField } from '../../modules/search';
// import OrderDropdownContainer from './OrderDropdownContainer';
const HeaderContainer = () => {
  const dispatch = useDispatch();
  const { user, search } = useSelector(({ user, search }) => ({
    user: user.user,
    search: search.search
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

  // 컴포넌트가 처음 렌더링될 때 input 초기화
  useEffect(() => {
    dispatch(initializeField());
  }, [dispatch]);

  return (
    <Header 
      user={user}
      onLogout={onLogout} 
      onChange={onChange} 
      search={search}
    />
  );
};

export default HeaderContainer;