import { useCallback, useState } from 'react';
import Comment from '../comment';
import './style.css';
import NewComment from '../new-comment';
import DateFormat from '../../utils/date-format';

function CommentList({commentList, onPost, exists, id, user}) {

  const list = [];
  const [answer, setListAnswer] = useState(true);
  const [active, setActive] = useState(null);

  const callbacks = {
    hideBottomForm: useCallback((status) => {
      setListAnswer(status);
    })
  }

  const makeList = () => {
    // показываю limit комментариев
    let length = 0;
    let limit = 200;
    commentList.length > limit ? length = limit : length = commentList.length;

    for(let i = 0; i < length; i++) {
      commentList[i].children = [];
      commentList[i].lvl = 0;
    }

    // ищу родителей у комментариев
    for(let i = 0; i < length; i++) {
      if(commentList[i].parent._id != id) {
        commentList.find(item => item._id === commentList[i].parent._id)?.children.push(commentList[i]);
      }
    }

    // добавляю корневые элементы
    for (let i = 0; i < length; i++) {
      if(commentList[i].parent._id === id) {
        list.push(<Comment key={commentList[i]._id} lvl={0} text={commentList[i].text} author={commentList[i].author.profile.name} time={DateFormat(commentList[i].dateCreate)}
          parent={{_id: commentList[i].parent._id, _type: commentList[i].parent._type}} children={commentList[i].children} id={commentList[i]._id}
          onPost={onPost} exists={exists} hideBottomForm={callbacks.hideBottomForm} setActive={setActive} activeItem={active} user={user}/>)
      }
    }

    return list;
  }

  return(
    <div className='Comment-list'>
      <p className='Comment-list-count'>Комментарии ({commentList.length})</p>
      <div className='Comment-list-list'>
        {makeList()}
        {answer ? <NewComment onPost={onPost} exists={exists} answer={false} parent={{_id: id, _type: 'article'}}/>: ''}
      </div>
    </div>
  );
}

export default CommentList;