export function tokenChange(token: string) {
  return {
    type: 'TOKEN_CHANGE',
    payload: token,
  };
}
