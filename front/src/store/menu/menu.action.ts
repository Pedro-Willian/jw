export type PayloadMenuType = {
  menuVisible: boolean;
  screenSmall: boolean;
};

export function menuChange(menuData: Partial<PayloadMenuType>) {
  return {
    type: 'MENU_CHANGE',
    payload: menuData,
  };
}
