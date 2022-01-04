import React, { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import { changeField, initializeForm, login } from '../../modules/auth';
import { check } from '../../modules/user';

const LoginForm = ({ history }) => {
  const dispatch = useDispatch();
  const  { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth : auth.auth,
    authError: auth.authError,
    user: user.user
  }));

  // 인풋 변경 이벤트 핸들러
  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        key: name,
        value
      })
    )
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = e => {
    e.preventDefault();
    const {userAddress, password } = form;
    dispatch(login({ userAddress, password }));
  }
  // 컴포넌트가 처음 렌더링될 때 form을 초기화
  useEffect(() => {
    dispatch(initializeForm());
  }, [dispatch]);

  // 로그인 시도 시
  useEffect(() => {
    if(authError) {
      console.log('오류 발생');
      console.log(authError);
      return;
    }
    if(auth) {
      console.log('로그인 성공');
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(()=> {
    if(user){
      history.push('/');
      try {
        localStorage.setItem('user', user);
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [history, user]);

  return (
    <AuthForm
      form= {form}
      onChange = {onChange}
      onSubmit = {onSubmit}
    />
  );
};

export default withRouter(LoginForm);

