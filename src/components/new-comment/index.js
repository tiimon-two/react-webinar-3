import { Link, useLocation } from 'react-router-dom';
import './style.css';
import { useState } from 'react';
import { forwardRef } from 'react';

const NewComment = forwardRef(function NewComment ({exists, onPost, onCancel, answer, parent, id, lvl}, ref) {
  const [text, setText] = useState('');
  const gap = lvl >= 5 ? 0 : 30;
  let correctText = true;
  const location = useLocation();

  if((text.length === 0) || (text.replace(/^\s+|\s+$/g, '').length == 0)) {
    correctText = false;
  }

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
    },
    warning: (e) => {
      e.preventDefault();
      setText('Введённый текст не корректен !');
      setTimeout(() => setText(''), 1000);
    }
  }

  return(
    // если пользователь авторизован вывожу форму иначе предлагаю авторизоваться
    (exists)?
    <div ref={ref} className={answer? 'New-comment New-comment_answer' : 'New-comment'} style={{paddingLeft: `${answer? gap: 0}px`}}>
      <form className='New-comment-form' onSubmit={correctText? callbacks.onPost : callbacks.warning}>
        <p className='New-comment-title'>Новый комментарий</p>
        <textarea className='New-comment-text' value={text} onChange={e => setText(e.target.value)}></textarea>
        <button className='New-comment-button' type='submit'>Отправить</button>
        {answer? <button className='New-comment-button' type='button' onClick={onCancel}>Отмена</button> : ''}
      </form>
    </div> :
     <div ref={ref} className='New-comment-warning'>
      <Link to='/login' className='New-comment-link' state={{back: location.pathname}}>Войдите</Link>, чтобы иметь возможность комментировать.
      {answer? <button className='New-comment-button New-comment-button_notExist' type='button' onClick={onCancel}>Отмена</button> : ''}
    </div>
  );
});

export default NewComment;