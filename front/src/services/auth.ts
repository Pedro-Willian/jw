import { Publicador } from 'entities/publicador';
import { Dispatch } from 'react';
import type { LoginData } from 'screens/login';
import { userChange } from 'store/user/user.action';
import { getTokenName } from 'utils/get-token-name';
import { RequestBuilder } from 'utils/request-builder';
import { History } from 'history';

const validateToken = () =>
  new RequestBuilder<Publicador>().withUrl('/auth/validate').call();

type LoginDataPayload = {
  id: string;
  password: string;
};
const login = (data: LoginData) => {
  const payload: LoginDataPayload = {
    id: `${data.id}#${data.pin}`,
    password: data.password,
  };
  return new RequestBuilder<
    { publicador: Publicador; accessToken: string },
    LoginDataPayload
  >()
    .withMethod('POST')
    .withUrl('/auth/login')
    .withBody(payload)
    .call();
};

const logout = (history: History, dispatch: Dispatch<unknown>) => {
  localStorage.removeItem(getTokenName());
  history.push('/');
  dispatch(userChange({} as Publicador));
};

export { validateToken, login, logout };
