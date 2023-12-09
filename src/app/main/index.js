import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import Basket from '../basket';

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load(1);
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    skip: state.catalog.activePage,
    activeModal: state.modals.name,
    lang: state.language.lang,
  }));

  useEffect(() => {
    store.actions.modals.name === 'basket'
  })

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Смена страницы товаров
    changePage: useCallback((skip) => {
      store.actions.catalog.load(skip);
    }, [store]),
    // Смена языка
    changeLang: useCallback(() => {
      store.actions.language.changeLang();
    }, [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} lang={select.lang}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <>
      <PageLayout>
        <Head title={select.lang === 'ru' ? 'Магазин' : 'Shop'} lang={select.lang} changeLang={callbacks.changeLang}/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum} lang ={select.lang}/>
        <List list={select.list} renderItem={renders.item}/>
        <Pagination count={select.count} activePage={(select.skip)} changePage={callbacks.changePage}/>
      </PageLayout>
      {select.activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default memo(Main);
