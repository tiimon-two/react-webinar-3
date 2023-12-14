import { Link, useNavigate } from 'react-router-dom';
import './style.css'
import { useCallback } from 'react';
import PropTypes from "prop-types";


function User(props) {
  const navigate = useNavigate();

  const callbacks = {
    onClick: props.authorized? useCallback(() => {
        props.logOut()
      }) : useCallback(() => {
        navigate(props.loginLink);
      })
  }

  return(
    <div className='User'>
      {props.authorized &&<Link to={props.profileLink} className='User-link'>{props.user}</Link>}
      <button className='User-button' onClick={callbacks.onClick}>{(props.authorized)? 'Выход' : 'Вход'}</button>
    </div>
  );
}

User.propTypes = {
  onClick: PropTypes.func,
  user: PropTypes.string,
  profileLink: PropTypes.string,
  authorized: PropTypes.bool,
}

export default User;