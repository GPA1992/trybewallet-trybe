export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';

export const getUserInfo = (state) => ({
  type: GET_USER_INFO,
  ...state,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

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
    return dispatch(recieveCurrencies(Object.keys(currencies)));
  };
}
