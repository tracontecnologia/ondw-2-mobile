import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DateTime } from 'luxon';

import { StorageHelper } from '../helpers';
import { IAuthContext, ISignUpPayload, IUser } from '../interfaces';
import { setBearerToken } from '../providers';
import { AuthService } from '../services';

const AuthContext = createContext<IAuthContext>(undefined!);

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | undefined>();
  const [token, setToken] = useState<string | undefined>();
  const [expiresIn, setExpiresIn] = useState<string | undefined>();

  async function login(email: string, password: string) {
    const { status, data } = await AuthService.login(email, password);
    if (status === 200) {
      setToken(data.token);
      setUser(data.user);
      setExpiresIn(data.expiresIn);
      StorageHelper.setItem('user', data.user);
      StorageHelper.setItem('token', data.token);
      StorageHelper.setItem('expiresIn', data.expiresIn);
    }
  }

  async function signUp(payload: ISignUpPayload) {
    const { status, data } = await AuthService.signUp(payload);
    if (status === 201) {
      setUser(data);
    }
  }

  async function logout() {
    await Promise.all([
      StorageHelper.removeItem('user'),
      StorageHelper.removeItem('token'),
      StorageHelper.removeItem('expiresIn'),
    ]);
    setUser(undefined);
    setToken(undefined);
    setExpiresIn(undefined);
  }

  function checkExpiresIn() {
    let result = false;
    if (expiresIn) {
      const exp = DateTime.fromISO(expiresIn).diffNow('seconds').seconds;
      result = exp > 0;
    }
    if (!result) {
      logout();
    }
    return result;
  }

  useEffect(() => {
    if (token) {
      setBearerToken(token);
    }
  }, [token]);

  useEffect(() => {
    async function loadDefaultData() {
      const [user, token] = await Promise.all([
        StorageHelper.getItem('user'),
        StorageHelper.getItem('token'),
      ]);
      setUser(user);
      setToken(token);
    }
    loadDefaultData();
  }, []);

  const isAuth = useMemo(() => !!user && !!token, [user, token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        login,
        signUp,
        logout,
        checkExpiresIn,
        isAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
