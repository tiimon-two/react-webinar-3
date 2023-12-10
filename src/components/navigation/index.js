import { Link } from "react-router-dom";
import "./style.css";

function Navigation(props) {
  return(
    <div className='Nav'>
      <Link to={'/'} className='Nav-link'>{props.lang === 'ru' ? 'Главная' : 'Main'}</Link>
    </div>
  );
}

export default Navigation;