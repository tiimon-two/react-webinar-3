import { useCallback, useState } from 'react';
import NewComment from '../new-comment';
import './style.css';
import DateFormat from '../../utils/date-format';
import { useRef } from 'react';

function Comment({author, time, text, onPost, exists,  hideBottomForm, id, setActive, activeItem, lvl, parent, user, children, child}) {
  const [answer, setAnswer] = useState(false);
  const ref = useRef(null);
  const gap = 30;

  const checkLvl = (lvl) => {
    if (lvl < 5) {
      return gap;
    } else {
      return 0;
    }
  }

  const callbacks = {
    setAnswer: useCallback(() => {
      setActive(id);
      setAnswer(true);
      hideBottomForm(false);
      if(ref.current) {
        ref.current.scrollIntoView({block: 'center'});
      }
    }),
    onCancel: useCallback(() => {
      setActive(null);
      setAnswer(false);
      hideBottomForm(true);
    }),
  }

  return(
    <div className={child? 'Comment Comment_child' : "Comment"}style={{paddingLeft: `${checkLvl(lvl)}px`}}>
      <div className='Comment-header'>
        <span className={author === user?.profile?.name ? 'Comment-author Comment-author_active' : 'Comment-author'}>{author}</span>
        <span className='Comment-time'>{time}</span>
      </div>
      <p className='Comment-text'>{text}</p>
      <button className='Comment-button' onClick={callbacks.setAnswer}>Ответить</button>
      {children.map(item => {
        return (<Comment key={item._id} author={item.author.profile.name} text={item.text} time={DateFormat(item.dateCreate)}
        parent={{_id: id, _type: 'comment'}} children={item.children} id={item._id} onPost={onPost} exists={exists} hideBottomForm={hideBottomForm} setActive={setActive} activeItem={activeItem} user={user} lvl={lvl + 1} child={true}/>)
        })
      }
      <div ref={ref}>
      {(answer && (activeItem === id))? <NewComment lvl={lvl} id={id} active={activeItem} answer={answer} onCancel={callbacks.onCancel} onPost={onPost} exists={exists} parent={parent}/> : ''}
      </div>
    </div>
  );
}

export default Comment;