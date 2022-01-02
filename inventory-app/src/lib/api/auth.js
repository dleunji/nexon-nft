export const login = ({ userAddress, password }) => 
  fetch('/inventory/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({address: userAddress, password: password})
    });
export const logout = () =>
  fetch('/inventory/auth/logout', {
    method: 'POST'
  })
export const check = () => 
  fetch('inventory/auth/check', {
    method: 'GET'
  });