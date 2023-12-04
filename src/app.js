import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from './components/cart';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */

function App({store}) {
  const list = store.getState().list;
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
    console.log(show);
  }

  return (
    <>
      <PageLayout>
        <Head title='Магазин'/>
        <Controls onShowBasket={changeModal} count={count} total={total}/>
        <List list={list} onAdd={callbacks.addToCart} />
      </PageLayout>
      <Modal isShow={show}>
        <Cart list={list} onDelete={callbacks.deleteFromCart} isShow={show} closeModal={changeModal} amount={total} count={count}/>
      </Modal>
    </>
  );
}

export default App;
