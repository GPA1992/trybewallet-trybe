export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_CURRENCIES_KEY = 'GET_CURRENCIES_KEY';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const GET_EXPENSES = 'GET_EXPENSES';
export const CURRENT_EXPENSE_VALUE = 'CURRENT_EXPENSE_VALUE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const START_EXPENSE_EDIT = 'START_EXPENSE_EDIT';
export const SELECT_EXPENSE = 'SELECT_EXPENSE';

export const getUserInfo = (state) => ({
  type: GET_USER_INFO,
  ...state,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const recieveCurrenciesKeys = (currenciesKey) => ({
  type: GET_CURRENCIES_KEY,
  currenciesKey: [...currenciesKey],
});

export function fetchCurrenciesKeys() {
  return async (dispatch) => {
    dispatch(requestCurrencies());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await response.json();
    delete currencies.USDT;
    return dispatch(recieveCurrenciesKeys(Object.keys(currencies)));
  };
}

export const recieveCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(requestCurrencies());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await response.json();
    delete currencies.USDT;
    return dispatch(recieveCurrencies(currencies));
  };
}

export const getExpenses = (expense) => ({
  type: GET_EXPENSES,
  payload: expense,
});

export const removeExpense = (expenseID) => ({
  type: REMOVE_EXPENSE,
  payload: expenseID,
});

export const startExpenseEdit = (toggle) => ({
  type: START_EXPENSE_EDIT,
  toggle,
});

export const selectExpense = (expenseID) => ({
  type: SELECT_EXPENSE,
  payload: expenseID,
});
