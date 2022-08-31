export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const GET_EXPENSES = 'GET_EXPENSES';
export const CURRENT_EXPENSE = 'CURRENT_EXPENSE';

export const getUserInfo = (state) => ({
  type: GET_USER_INFO,
  ...state,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const recieveCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies: [...currencies],
});

export function fetchCurrenciesKeys() {
  return async (dispatch) => {
    dispatch(requestCurrencies());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await response.json();
    delete currencies.USDT;
    return dispatch(recieveCurrencies(Object.keys(currencies))) && currencies;
  };
}

export const getExpenses = (state) => ({
  type: GET_EXPENSES,
  ...state,
});

export const getCurrentExpense = (totalExpenseValue) => ({
  type: CURRENT_EXPENSE,
  totalExpenseValue,
});
