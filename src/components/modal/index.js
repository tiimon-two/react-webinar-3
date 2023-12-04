import React from "react";
import PropTypes from "prop-types";
import './style.css';


function Modal({children, isShow}) {
  return (
    <div className={'Modal' + (isShow? ' Modal_show ' : '')}>
      <div className='Modal-content'>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node
}

export default React.memo(Modal);