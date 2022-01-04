// userAddress의 이더 잔액
export const getBalance = ({ userAddress }) =>
  fetch(`/inventory/users/${userAddress}/balance`);

