import { Publicador } from 'entities/publicador';
import { combineReducers, createStore } from 'redux';
import { PayloadMenuType } from './menu/menu.action';
import { MenuReducer } from './menu/menu.reducer';
import { TokenReducer } from './token/token.reducer';
import { UserReducer } from './user/user.reducer';

export type ReducersType = {
  menu: PayloadMenuType;
  user: Publicador;
  token: string;
};
export type ReducerType<T, P> = {
  type: T;
  payload: P;
};

const rootReducer = combineReducers<ReducersType>({
  menu: MenuReducer,
  user: UserReducer,
  token: TokenReducer,
});

const store = createStore(rootReducer);

export default store;
