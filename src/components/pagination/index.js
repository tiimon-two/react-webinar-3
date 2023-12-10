import { useCallback } from 'react';
import './style.css';

function Pagination({pageCount, activePage, changePage, productCount}) {

  const callbacks = {
    changePage: useCallback((page) => {
      changePage(page, productCount)
    })
  }

const length = Math.ceil(pageCount / 10);
const defaultPage = 1;
const prevPage = activePage - 1;
const nextPage = activePage + 1;
const thirdPage = activePage + 2;

  return(
    <div className='Pagination'>
      {activePage >= 3 ? <button className='Pagination-button' onClick={() => callbacks.changePage(defaultPage)}>{defaultPage}</button> : '' }
      {activePage >= 4 ? <span className='Pagination-split'>...</span> : ''}
      {activePage > 1 ? <button className='Pagination-button' onClick={() => callbacks.changePage(prevPage)}>{prevPage}</button> : '' }
      <button className='Pagination-button Pagination-button_active' onClick={() => callbacks.changePage(activePage)}>{activePage}</button>
      {activePage < length - 1 ? <button className='Pagination-button' onClick={() => callbacks.changePage(nextPage)}>{nextPage}</button> : '' }
      {activePage === 1 ? <button className='Pagination-button' onClick={() => callbacks.changePage(thirdPage)}>{thirdPage}</button> : '' }
      {activePage < length - 2 ? <span className='Pagination-split'>...</span> : '' }
      {activePage <= length - 1 ? <button className='Pagination-button' onClick={() => callbacks.changePage(length)}>{length}</button> : '' }
    </div>
  );
}

export default Pagination;