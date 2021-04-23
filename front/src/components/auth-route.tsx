import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Login } from 'screens/login';
import { validateToken } from 'services/auth';
import { tokenChange } from 'store/token/token.action';
import { userChange } from 'store/user/user.action';
import { ReducersType } from 'store/store';
import { getTokenName } from 'utils/get-token-name';
import { Loading } from './loading';

export const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: ReducersType) => state.user);
  const dispatch = useDispatch();
  // ler o token da session
  const token = localStorage.getItem(getTokenName());
  const [loading, setLoading] = useState(!!token);

  useEffect(() => {
    // if tiver token
    if (token) {
      // gravar token no redux
      dispatch(tokenChange(token));
      // chama back auth/validate pra ver se token é valido
      validateToken()
        .then((userResponse) => {
          // se token valido, grava user retornado do auth/validate no redux
          dispatch(userChange(userResponse));
        })
        .catch(() => {
          // se não token valido, limpa token do redux e da session
          localStorage.removeItem(getTokenName());
          dispatch(tokenChange(''));
        })
        .finally(() => setLoading(false));
    }
  }, []);

  if (loading) return <Loading />;
  if (user.id) return <>{children}</>;
  return <Login />;
};
