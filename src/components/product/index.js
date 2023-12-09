import { useCallback, useEffect } from "react";
import Basket from "../../app/basket";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import BasketTool from "../basket-tool";
import { useParams } from "react-router-dom";
import './style.css';

function Product() {
  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    activeModal: state.modals.name,
    title: state.catalog.title,
    description: state.catalog.description,
    country: state.catalog.country,
    category: state.catalog.category,
    year: state.catalog.year,
    price: state.catalog.price,
    lang: state.language.lang,
  }));

  const {id} = useParams();

  useEffect(() => {
    store.actions.catalog.getData(id);
  }, []);

  return(
    <>
      <div className='Product'>
        <div className='Product-head'>
          <h1 className='Product-title'>{select.title}</h1>
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} lang={select.lang}/>
        </div>
        <div className='Product-content'>
          <p className='Product-description Product-field'>{select.description}</p>
          <p className='Product-maker Product-field'>Страна производитель: <b>{select.country}</b></p>
          <p className='Product-category Product-field'>Категория: <b>{select.category}</b></p>
          <p className='Product-year Product-field'>Год выпуска <b>{select.year}</b></p>
          <p className='Product-price Product-field'>Цена: {select.price} ₽</p>
        </div>
        <button className='Product-button' onClick={callbacks.addToBasket}>{select.lang === 'ru' ? 'Добавить' : 'Add'}</button>
      </div>
      {select.activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default Product;