import { useCallback } from 'react';
import './style.css';

function Pagination({count, activePage, changePage}) {
  const length = Math.ceil(count / 10);

  const defaultPage = 1;
  let page = Number(activePage);
  const callbacks = {
    changePage: useCallback(e => {
      changePage(e.target.textContent);
    }, [changePage])
  };

  return(
    <div className="Pagination">
      {page >= 3? <button className='Pagination-button' onClick={callbacks.changePage}>{defaultPage}</button> : ''}
      {page >= 4? <span className='Pagination-split'>...</span> : ''}
      {page > 1 ? <button className='Pagination-button' onClick={callbacks.changePage}>{page - 1}</button> : ''}
      <button className="Pagination-button Pagination-button_active" onClick={callbacks.changePage}>{page}</button>
      { page < length - 1 ? <button className='Pagination-button' onClick={callbacks.changePage}>{page + 1}</button> : ''}
      {page === 1 ? <button className='Pagination-button' onClick={callbacks.changePage}>{page + 2}</button> : ''}
      { page < length - 1 ? <span className='Pagination-split'>...</span> : '' }
      {page <= length - 1 ? <button className='Pagination-button' onClick={callbacks.changePage}>{length}</button> : ''}
    </div>
  );
}

export default Pagination;