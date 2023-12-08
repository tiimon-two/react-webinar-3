import Main from "./main";
import useSelector from "../store/use-selector";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './errorPage/errorPage';
import Product from '../components/product';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main/>,
      errorElement: <ErrorPage/>
    },
    {
      path: '/components/product/:id',
      element: <Product/>
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
