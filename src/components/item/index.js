import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const callbacks = {
    onAdd: (e) => {
      e.stopPropagation();
      props.onAdd(props.item);
    },

    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    }
  }

  return (
    <div className={cn()}
         onClick={callbacks.onClick}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {props.item.price} ₽
      </div>
      {props.item.inCart ?
        <div className={cn('count')}>
          {props.item.count} шт
        </div> : ''}
      <div className={cn('actions')}>
        {props.item.inCart ?
          <button className={cn('button')} onClick={callbacks.onDelete}>
            Удалить
          </button> :
          <button className={cn('button')} onClick={callbacks.onAdd}>
            Добавить
          </button>
        }
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string
  }).isRequired,
  onDelete: PropTypes.func
};

Item.defaultProps = {
  onDelete: () => {
  }
}

export default React.memo(Item);
