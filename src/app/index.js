import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Profile from './profile';
import Login from './login';
import useStore from '../hooks/use-store';
import { useEffect } from 'react';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const store = useStore();

  const select = useSelector(state => ({
    activeModal: state.modals.name,
    error: state.login.error,
  }))

  useEffect(() => {store.actions.login.findUser()}, [store]);

  useEffect(() => {store.actions.login.deleteErrorMessage()}, [store.listeners]);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>} action={select.error = false}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/profile'} element={<Profile/>}/>
        <Route path={'/login'} element={<Login/>}/>
      </Routes>

      {select.activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
