import { Publicador } from 'entities/publicador';

export function userChange(user: Publicador) {
  return {
    type: 'USER_CHANGE',
    payload: user,
  };
}
