import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */

function App({store}) {
  const list = store.getState().list;
  const cart = store.getState().cart;
  const count = store.getState().count;
  const total = store.getState().total;
  const [show, setShow] = useState(false);

  const callbacks = {
    addToCart: useCallback((item) => {
      store.addToCart(item);
    }, [store]),
    deleteFromCart: useCallback((code) => {
      store.deleteFromCart(code);
    }, [store])
  }

  const changeModal = () => {
    setShow(!show);
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls onShowBasket={changeModal} count={count} total={total}/>
      <List list={list} onAdd={callbacks.addToCart} />
      <Cart list={cart} onDelete={callbacks.deleteFromCart} isShow={show} closeModal={changeModal} amount={total} count={count}/>
    </PageLayout>
  );
}

export default App;
