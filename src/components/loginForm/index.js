import './style.css';
import useStore from '../../hooks/use-store';
import { useCallback, useEffect } from 'react';
import PropTypes from "prop-types";
import useSelector from '../../hooks/use-selector';
import select from '../select';

function LoginForm() {

  const store = useStore();

  const callbacks = {
    onLogin: useCallback((e) => {
        e.preventDefault();
        store.actions.login.authorization(e.target.login.value, e.target.password.value);
        e.target.reset();
    }),
  }

  const select = useSelector(state => ({
    error: state.login.error,
  }));

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
        {select.error &&
          <p className='Login-error'>{select.error}</p>
        }
        <button className='Login-button' type='submit'>Войти</button>
      </form>
    </div>
  );
}

window.history.replaceState({}, select.error);

LoginForm.propTypes = {
  onLogin: PropTypes.func,
};

export default LoginForm;