import client from './client';

export const login = ({ userAddress, password }) => 
  client.post('/auth/login', {userAddress, password});

export const check = () => client.get('/auth/check');