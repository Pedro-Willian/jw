export type PayloadMenuType = {
  menuVisible: boolean;
  screenSmall: boolean;
};

export type ActionListMenu = {
  type: 'CHANGE';
  payload: Partial<PayloadMenuType>;
};

export function menuChange(select: Partial<PayloadMenuType>): ActionListMenu {
  return {
    type: 'CHANGE',
    payload: select,
  };
}
