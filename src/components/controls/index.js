import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural } from "../../utils";

function Controls({onShowBasket, count, total}) {
  return (
    <div className='Controls'>
      <p className='Controls-cart'>В корзине: <b>{count > 0 &&(`${count} ${plural(count, {
        one: 'товар',
        few: 'товара',
        many: 'товаров'
      })} / ${new Intl.NumberFormat().format(total)} ₽`)} {!count &&(`пусто`)}</b></p>
      <button className='Controls-button' onClick={() => onShowBasket()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onShowBasket: PropTypes.func,
  count: PropTypes.number,
  total: PropTypes.number
};

Controls.defaultProps = {
  onShowBasket: () => {}
}

export default React.memo(Controls);
