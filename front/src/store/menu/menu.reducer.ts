import { ActionListMenu, PayloadMenuType } from './menu.action';

export const MenuReducer = (
  state: PayloadMenuType = { menuVisible: false, screenSmall: false },
  action: ActionListMenu,
) => {
  switch (action.type) {
    case 'CHANGE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
