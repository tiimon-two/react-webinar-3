import './style.css';
import PropTypes from "prop-types";

function ProfileContent(props) {
  return(
    <div className='Profile'>
      <h2 className='Profile-title'>Профиль</h2>
      <p className='Profile-item'>Имя: <b>{props.name}</b></p>
      <p className='Profile-item'>Телефон: <b>{props.phone}</b></p>
      <p className='Profile-item'>email: <b>{props.email}</b></p>
    </div>
  );
}


ProfileContent.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
};
export default ProfileContent;