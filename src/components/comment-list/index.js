import { useCallback, useState } from 'react';
import Comment from '../comment';
import './style.css';
import NewComment from '../new-comment';

function CommentList({commentList, onPost, exists, id}) {

  const list = [];
  const [answer, setListAnswer] = useState(true);

  const callbacks = {
    hideBottomForm: useCallback((status) => {
      setListAnswer(status);
    })
  }

  const makeList = () => {
    let length = 0;
    let limit = 50;
    commentList.length > limit ? length = limit : length = commentList.length;

    for(let i = 0; i < length; i++) {
      commentList[i].children = [];
    }

    for(let i = 0; i < length; i++) {
      if(commentList[i].parent._id != id) {
        commentList.find(item => item._id === commentList[i].parent._id)?.children.push(<Comment key={commentList[i]._id} text={commentList[i].text} author={commentList[i].author.profile.name} time={commentList[i].dateCreate}
          type={commentList[i].parent._type} id={commentList[i]._id} onPost={onPost} exists={exists} hideBottomForm={callbacks.hideBottomForm}/>);
      }
    }

    for (let i = 0; i < length; i++) {
      if(commentList[i].parent._id === id) {
        list.push(<Comment key={commentList[i]._id} text={commentList[i].text} author={commentList[i].author.profile.name} time={commentList[i].dateCreate}
          type={commentList[i].parent._type} id={commentList[i]._id} onPost={onPost} exists={exists} hideBottomForm={callbacks.hideBottomForm}/>)
          for (let j = 0; j < commentList[i]?.children?.length; j++) {
            list.push(<Comment key={commentList[i].children[j].props.id} text={commentList[i].children[j].props.text} author={commentList[i].children[j].props.author} time={commentList[i].children[j].props.time}
              type={commentList[i].children[j].props.type} id={commentList[i].children[j].props.id} onPost={onPost} exists={exists} hideBottomForm={callbacks.hideBottomForm}/>)
          }
      }
    }

    return list;
  }

  return(
    <div className='Comment-list'>
      <p className='Comment-list-count'>Комментарии ({commentList.length})</p>
      <div className='Comment-list-list'>
        {makeList()}
        {answer ? <NewComment id={id} onPost={onPost} exists={exists} answer={false} />: ''}
      </div>
    </div>
  );
}

export default CommentList;