import { useState } from 'react';

export const familyAuthToken = 'family-token-xxx';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem(familyAuthToken);
    const userToken = JSON.parse(tokenString);
    return userToken
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem(familyAuthToken, JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  }
}