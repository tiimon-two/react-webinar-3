import { Link } from 'react-router-dom';
import './style.css';
import { useState } from 'react';

function NewComment ({exists, onPost, onCancel, answer, author, parent, id}) {
  const [text, setText] = useState('');
  const gap = 30;
  const data = {
    _id: id,
    _type: 'comment'
  }

  // если это не новый комментарий отправляю на сервер объект с id комментария на который формируется ответ
  // и типом comment
  const callbacks = {
    onPost: (e) => {
      e.preventDefault();
      onPost(text, id? data : parent);
    }
  }

  return(
    // если пользователь авторизован вывожу форму иначе предлагаю авторизоваться
    (exists)?
    <div className={answer? 'New-comment New-comment_answer' : 'New-comment'} style={{paddingLeft: `${answer? gap: 0}px`}}>
      <form className='New-comment-form' onSubmit={callbacks.onPost}>
        <p className='New-comment-title'>Новый комментарий</p>
        <textarea className='New-comment-text' placeholder={author? `Мой ответ для ${author}` : 'Текст'} value={text} onChange={e => setText(e.target.value)}></textarea>
        <button className='New-comment-button' type='submit'>Отправить</button>
        {answer? <button className='New-comment-button' type='button' onClick={onCancel}>Отмена</button> : ''}
      </form>
    </div> : <p className='New-comment-warning'><Link to='/login' className='New-comment-link'>Войдите</Link>, чтобы иметь возможность комментировать</p>
  );
}

export default NewComment;