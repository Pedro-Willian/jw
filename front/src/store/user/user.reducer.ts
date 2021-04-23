import { Publicador } from 'entities/publicador';
import type { ReducerType } from 'store/store';

export const UserReducer = (
  state: Publicador = {} as Publicador,
  action: ReducerType<'USER_CHANGE', Publicador>,
) => {
  switch (action.type) {
    case 'USER_CHANGE':
      return { ...action.payload };
    default:
      return state;
  }
};
