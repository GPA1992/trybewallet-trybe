// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES_KEY,
  GET_CURRENCIES, GET_EXPENSES, CURRENT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currenciesKey: [],
  currencies: {},
  expenses: [],
  totalExpenseValue: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES_KEY: {
    return {
      ...state,
      currenciesKey: [...action.currenciesKey],
    };
  }
  case GET_CURRENCIES: {
    return {
      ...state,
      currencies: action.currencies,
    };
  }
  case GET_EXPENSES: {
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  }
  case CURRENT_EXPENSE: {
    return {
      ...state,
      ...action,
    };
  }
  default:
    return state;
  }
};

export default wallet;
