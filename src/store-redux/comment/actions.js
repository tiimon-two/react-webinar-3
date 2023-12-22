export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Установка признака ожидания загрузки
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });
        // Комментарии загружены успешно
        dispatch({type: 'comments/load-success', payload: {data: res.data.result.items}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  post: (text, parent) => {
    return async (dispatch, getState, services) => {
      // установка признака ожидания отправки комментария
      dispatch({type: 'comments/post-start'});

      try {
        const body = {
          "text": text,
          "parent": {
            "_id": parent._id,
            "_type": parent._type
          }
        }
        const res = await services.api.request({
          url: `/api/v1/comments?lang=ru&fields=*`,
          method: 'POST',
          body: JSON.stringify(body),
        });
        // комментарий отправлен успешно
        dispatch({type: '/comments/post-success', payload: {data: res.data.result}});

      } catch (e) {
        // ошибка
        dispatch({type: '/comments/post-error'});
      }
    }
  }
}
