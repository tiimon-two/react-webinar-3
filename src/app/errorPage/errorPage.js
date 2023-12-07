import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return(
    <div className='Error'>
      <h1>Извините</h1>
      <p>
        Произошла ошибка
        {error.statusText || error.message}
      </p>
    </div>
  );
}

export default ErrorPage;