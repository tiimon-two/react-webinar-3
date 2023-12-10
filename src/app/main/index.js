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
import Container from '../../components/container';
import Navigation from '../../components/navigation';

function Main() {

  const store = useStore();
  const productCount = 10;

  useEffect(() => {
    store.actions.catalog.load(select.skip, productCount);
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
    changePage: useCallback((page, productCount) => {
      store.actions.catalog.load(page, productCount);
    }, [store]),
    // Смена языка
    changeLang: useCallback(() => {
      store.actions.language.changeLang();
    }, [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} lang={select.lang} link={'/components/product/'}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <>
      <PageLayout>
        <Head title={select.lang === 'ru' ? 'Магазин' : 'Shop'} lang={select.lang} changeLang={callbacks.changeLang}/>
        <Container>
          <Navigation lang={select.lang}/>
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} lang ={select.lang}/>
        </Container>
        <List list={select.list} renderItem={renders.item}/>
        <Pagination pageCount={select.count} activePage={(select.skip)} changePage={callbacks.changePage} productCount={productCount}/>
      </PageLayout>
      {select.activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default memo(Main);
