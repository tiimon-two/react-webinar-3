import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function Cart({list, onDelete, closeModal, amount, count}) {
    return(
      <>
        <div className='Cart'>
          <div className='Cart-header'>
            <h2 className='Cart-title'>Корзина</h2>
            <button onClick={closeModal}>
              Закрыть
            </button>
          </div>
          <div className='Cart-list'>{
            list.map(item =>
              item.inCart?
              <div key={item.code} className='List-item'>
                <Item item={item} onDelete={onDelete} isInCart={true}/>
              </div> : ''
            )}
            {count ? <p className='Cart-final'>Итого <span className='Cart-amount'>{new Intl.NumberFormat().format(amount)} ₽</span></p> : <p className='Cart-final_empty'>Корзина пуста</p>}
          </div>
        </div>
      </>
    );
  }

Cart.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDelete: PropTypes.func,
  closeModal: PropTypes.func,
  isShow: PropTypes.bool,
  amount: PropTypes.number,
  count: PropTypes.number
};

Cart.defaultProps = {
  onDelete: () => {
  },

  closeModal: () => {
  }
}

export default Cart;