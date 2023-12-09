import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, lang, changeLang}) {

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <button className="Head-button" onClick={changeLang}>{lang === 'ru' ? 'Сменить язык' : 'Change language'}</button>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
