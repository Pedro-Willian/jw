import { combineReducers, createStore } from 'redux';
import { PayloadMenuType } from './menu/menu.action';
import { MenuReducer } from './menu/menu.reducer';

export type ReducersType = {
  menu: PayloadMenuType;
};

const rootReducer = combineReducers<ReducersType>({
  menu: MenuReducer,
});

const store = createStore(rootReducer);

export default store;
