import { useCallback, useState } from 'react';
import NewComment from '../new-comment';
import './style.css';

function Comment({author, time, text, onPost, exists,  hideBottomForm, id}) {
  const [answer, setAnswer] = useState(false);
  const [active, setActive] = useState(false);

  const callbacks = {
    setAnswer: useCallback(() => {
      setActive(true);
      setAnswer(true);
      hideBottomForm(false);
    }),
    onCancel: useCallback(() => {
      setActive(false);
      setAnswer(false);
      hideBottomForm(true);
    })
  }

  return(
    <div className='Comment'>
      <div className='Comment-header'>
        <span className='Comment-author'>{author}</span>
        <span className='Comment-time'>{time}</span>
      </div>
      <p className='Comment-text'>{text}</p>
      <button className='Comment-button' onClick={callbacks.setAnswer}>Ответить</button>
      {(answer && active)? <NewComment author={author} id={id} active={active} answer={answer} onCancel={callbacks.onCancel} onPost={onPost} exists={exists}/> : ''}
    </div>
  );
}

export default Comment;