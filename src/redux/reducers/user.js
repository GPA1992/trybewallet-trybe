import { GET_USER_INFO } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_USER_INFO: {
    return {
      ...state,
      email: action.email,
    };
  }
  default:
    return state;
  }
};

export default user;
