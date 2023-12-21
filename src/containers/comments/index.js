import { useDispatch} from "react-redux";
import CommentList from "../../components/comment-list";
import NewComment from "../../components/new-comment";
import Spinner from "../../components/spinner";
import useInit from "../../hooks/use-init";
import commentActions from '../../store-redux/comment/actions';
import useSelector from '../../hooks/use-selector';
import { useCallback } from "react";


function Comments({id, commentList, waiting}) {
  const dispatch = useDispatch();

  const select = useSelector(state => ({
    exists: state.session.exists,
    user: state.session.user,
  }));

  useInit(() => {
    dispatch(commentActions.load(id));
  }, [id]);

  const callbacks = {
    onPost: useCallback((text, parent) => {
      dispatch(commentActions.post(text, id, parent))
      .then(() => {
        dispatch(commentActions.load(id));
      })
    }, [id])
  }

  return(
    <Spinner active={waiting}>
      <CommentList commentList={commentList} onPost={callbacks.onPost} exists={select.exists} user={select.user} id={id}/>
    </Spinner>
  );
}

export default Comments;