export const GET_USER_INFO = 'GET_USER_INFO';

export const getUserInfo = (state) => ({
  type: GET_USER_INFO,
  ...state,
});
