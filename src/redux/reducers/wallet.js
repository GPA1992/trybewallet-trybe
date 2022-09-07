// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES_KEY,
  GET_CURRENCIES, GET_EXPENSES,
  REMOVE_EXPENSE, START_EXPENSE_EDIT,
  SELECT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  currenciesFull: {},
  expenses: [],
  inEditing: true,
  inEditingExpense: {
    id: 0,
    currency: '',
    exchangeRates: {},
    value: '',
    description: '',
    method: '',
    tag: '',
  },
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES_KEY: {
    return {
      ...state,
      currencies: [...action.currenciesKey],
    };
  }
  case GET_CURRENCIES: {
    return {
      ...state,
      currenciesFull: action.currencies,
    };
  }
  case GET_EXPENSES: {
    return {
      ...state,
      expenses: [...state.expenses, action.payload].sort((xID, yID) => xID.id - yID.id),
    };
  }
  case REMOVE_EXPENSE: {
    return {
      ...state,
      expenses: state.expenses.filter((exp) => exp.id !== action.payload),
    };
  }
  case START_EXPENSE_EDIT: {
    return {
      ...state,
      inEditing: action.toggle,
    };
  }
  case SELECT_EXPENSE: {
    return {
      ...state,
      inEditingExpense: state.expenses.find((exp) => exp.id === action.payload),
    };
  }
  default:
    return state;
  }
};

export default wallet;
