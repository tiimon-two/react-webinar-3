import { Link } from 'react-router-dom';
import './style.css';
import { useState } from 'react';

function NewComment ({exists, onPost, onCancel, answer, author}) {
  const [text, setText] = useState('');

  const callbacks = {
    onPost: (e) => {
      e.preventDefault();
      onPost(text, parent);
    }
  }

  return(
    exists ?
    <div className='New-comment'>
      <form onSubmit={callbacks.onPost}>
        <p className='New-comment-title'>Новый комментарий</p>
        <textarea className='New-comment-text' placeholder={author? `Мой ответ для ${author}` : 'Текст'} value={text} onChange={e => setText(e.target.value)}></textarea>
        <button className='New-comment-button' type='submit'>Отправить</button>
        {answer? <button className='New-comment-button' type='button' onClick={onCancel}>Отмена</button> : ''}
      </form>
    </div> : <p className='New-comment-warning'><Link to='/login' className='New-comment-link'>Войдите</Link>, чтобы иметь возможность комментировать</p>
  );
}

export default NewComment;