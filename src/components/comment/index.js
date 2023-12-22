import { useCallback, useState } from 'react';
import NewComment from '../new-comment';
import './style.css';

function Comment({author, time, text, onPost, exists,  hideBottomForm, id, setActive, activeItem, lvl, parent, user}) {
  const [answer, setAnswer] = useState(false);

  const callbacks = {
    setAnswer: useCallback(() => {
      setActive(id);
      setAnswer(true);
      hideBottomForm(false);
    }),
    onCancel: useCallback(() => {
      setActive(null);
      setAnswer(false);
      hideBottomForm(true);
    })
  }

  return(
    // делаю отступ согласно вложенности элементов
    <div className='Comment'style={{paddingLeft: `${lvl * 30}px`}}>
      <div className='Comment-header'>
        <span className={author === user.profile.name ? 'Comment-author Comment-author_active' : 'Comment-author'}>{author}</span>
        <span className='Comment-time'>{time}</span>
      </div>
      <p className='Comment-text'>{text}</p>
      <button className='Comment-button' onClick={callbacks.setAnswer}>Ответить</button>
      {(answer && (activeItem === id))? <NewComment author={author} lvl={lvl} id={id} active={activeItem} answer={answer} onCancel={callbacks.onCancel} onPost={onPost} exists={exists} parent={parent}/> : ''}
    </div>
  );
}

export default Comment;