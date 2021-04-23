import type { ReducerType } from 'store/store';
import { PayloadMenuType } from './menu.action';

export const MenuReducer = (
  state: PayloadMenuType = { menuVisible: false, screenSmall: false },
  action: ReducerType<'MENU_CHANGE', PayloadMenuType>,
) => {
  switch (action.type) {
    case 'MENU_CHANGE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
