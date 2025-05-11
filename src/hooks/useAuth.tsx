import User from '@/interfaces/User';
import { useEffect, useState } from 'react';
import { login, setAuthToken } from '@/http/user';

function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  const loginUser = async (username: string, password: string) => {
    let response;
    try {
      response = await login(username, password);
    } catch (e) {
      alert(`Error ${e}`);
      return;
    }

    localStorage.setItem('name', response.data.username);
    localStorage.setItem('username', response.data.username);
    setAuthToken(response.data.token);
    
    setUser({
      name: response.data.name,
      username: response.data.username,
    });
    setIsLogged(true);

    return response;
  };

  const logoutUser = async () => {
    setUser(null);
    setIsLogged(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('name');
    const username = localStorage.getItem('username');

    if (token && username && user) {
      setUser({ name: user, username });
      setIsLogged(true);
      setAuthToken(token);
    }
    setIsLoading(false);
  }, []);

  return { user, isLogged, loginUser, logoutUser, isLoading };
}

export default useAuth;
