import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Profile from './profile';
import Login from './login';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const select = useSelector(state => ({
    activeModal: state.modals.name,
    authorized: state.login.authorized,
  }))

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/profile'} element={select.authorized? <Profile/> : <Login/>}/>
        <Route path={'/login'} element={<Login/>}/>
      </Routes>

      {select.activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
