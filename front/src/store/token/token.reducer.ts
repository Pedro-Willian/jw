import type { ReducerType } from 'store/store';

export const TokenReducer = (
  state: string = '',
  action: ReducerType<'TOKEN_CHANGE', string>,
) => {
  switch (action.type) {
    case 'TOKEN_CHANGE':
      return action.payload;
    default:
      return state;
  }
};
