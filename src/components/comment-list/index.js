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

    // метод для перебора дочерних элементов и добавления в массив после родительского
    const sortlist = (children, list, paddinglvl=0) => {
      if(children) {
        children.map(item => {
          console.log();
          list.push(<Comment key={item._id} lvl={paddinglvl + 1} text={item.text} author={item.author.profile.name} time={DateFormat(item.dateCreate)}
            parent={{_id: item.parent._id, _type: item.parent._type}} children={item.children} id={item._id}
            onPost={onPost} exists={exists} hideBottomForm={callbacks.hideBottomForm} hild={true} setActive={setActive} activeItem={active} user={user}/>)
            sortlist(item.children, list, paddinglvl + 1);
        });
      }
    }

    // добавляю корневые элементы и запускаю для вложенных элементов метод перебора
    for (let i = 0; i < length; i++) {
      if(commentList[i].parent._id === id) {
        // console.log(new Intl.DateTimeFormat('ru-Ru', {day: '2-digit', month: '2-digit', year: '2-digit'}).format(commentList[i].dateCreate));
        // console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(today));
        list.push(<Comment key={commentList[i]._id} lvl={0} text={commentList[i].text} author={commentList[i].author.profile.name} time={DateFormat(commentList[i].dateCreate)}
          parent={{_id: commentList[i].parent._id, _type: commentList[i].parent._type}} children={commentList[i].children} id={commentList[i]._id}
          onPost={onPost} exists={exists} hideBottomForm={callbacks.hideBottomForm} setActive={setActive} activeItem={active} user={user}/>)
          sortlist(commentList[i].children, list);
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