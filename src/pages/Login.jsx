import React from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserInfo } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disableEnter: true,
  };

  checkAllForm = () => {
    const { email, password } = this.state;
    const minCaractere = 6;
    const errors = [
      password.length < minCaractere,
      !email.length,
      !password.length,
      !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email),
    ];
    const checkErrors = errors.every((error) => error === false);
    this.setState({ disableEnter: !checkErrors });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.checkAllForm);
  };

  handleClick = () => {
    const { history, userInfo } = this.props;
    userInfo(this.state);
    history.push('/carteira');
  };

  render() {
    const { disableEnter } = this.state;
    return (
      <div className="login">
        <div className="form">
          <form action="">
            <label htmlFor="email">
              email
              <br />
              <input
                onChange={ this.handleChange }
                name="email"
                id="email"
                type="text"
                data-testid="email-input"
              />
            </label>
            <br />
            <br />
            Senha
            <br />
            <label htmlFor="password">
              <input
                onChange={ this.handleChange }
                name="password"
                id="password"
                data-testid="password-input"
                type="text"
              />
            </label>
            <br />
            <br />
            <button
              onClick={ this.handleClick }
              disabled={ disableEnter }
              id="enter-button"
              type="submit"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userInfo: (state) => dispatch(getUserInfo(state)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  userInfo: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Login);
