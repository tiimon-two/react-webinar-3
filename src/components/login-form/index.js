import './style.css';
import { useCallback} from 'react';
import PropTypes from "prop-types";

function LoginForm({onLogin, error}) {

  const callbacks = {
    onLogin: useCallback((e) => {
        e.preventDefault();
        onLogin(e.target.login.value, e.target.password.value);
        e.target.reset();
    }),
  }

  return(
    <div className='Login'>
      <h2 className='Login-title'>Вход</h2>
      <form className='Login-form' onSubmit={callbacks.onLogin}>
        <label className='Login-label'>
          <p className='Login-item'>Логин</p>
          <input id='login'></input>
        </label>
        <label className='Login-label'>
        <p className='Login-item'>Пароль</p>
          <input type='password' id='password' autoComplete='off'></input>
        </label>
        {error &&
          <p className='Login-error'>{error}</p>
        }
        <button className='Login-button' type='submit'>Войти</button>
      </form>
    </div>
  );
}

export default LoginForm;