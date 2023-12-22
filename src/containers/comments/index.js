import { shallowEqual, useDispatch, useSelector as useReduxSelector} from "react-redux";
import CommentList from "../../components/comment-list";
import Spinner from "../../components/spinner";
import useInit from "../../hooks/use-init";
import commentActions from '../../store-redux/comment/actions';
import useSelector from '../../hooks/use-selector';
import { useCallback } from "react";

function Comments({id}) {
  const dispatch = useDispatch();

  const select = useSelector(state => ({
    exists: state.session.exists,
    user: state.session.user,
  }));

  // для состояния в redux завожу отдельную переменную
  const reduxSelect = useReduxSelector(state => ({
    comments: state.comment.data,
    waiting: state.comment.waiting,
    inAnswer: state.comment.inAnswer,
  }), shallowEqual);

  // загружаю комментарии для товара
  useInit(() => {
    dispatch(commentActions.load(id));
  }, [id]);

  const callbacks = {
    onPost: useCallback((text, parent) => {
      dispatch(commentActions.post(text, parent))
      .then(() => {
        dispatch(commentActions.load(id));
      })
    }, [id])
  }

  return(
    <Spinner active={reduxSelect.waiting}>
      <CommentList commentList={reduxSelect.comments} onPost={callbacks.onPost} exists={select.exists} user={select.user} id={id}/>
    </Spinner>
  );
}

export default Comments;