import './style.css';

function ProductItem(props) {
  const callbacks = {
    onAdd: () => props.onAdd(props.product?.id)
  }

  return(
    <div className='Product'>
      <div className='Product-content'>
        <p className='Product-description Product-field'>{props.product?.description}</p>
        <p className='Product-maker Product-field'>Страна производитель: <b>{props.product?.country}</b></p>
        <p className='Product-category Product-field'>Категория: <b>{props.product?.category}</b></p>
        <p className='Product-year Product-field'>Год выпуска: <b>{props.product?.year}</b></p>
        <p className='Product-price Product-field'>Цена:  {props.product?.price} ₽</p>
      </div>
      <button className='Product-button' onClick={callbacks.onAdd}>{props.lang === 'ru' ? 'Добавить' : 'Add'}</button>
    </div>
  );
}

export default ProductItem;