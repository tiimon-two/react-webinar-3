// Начальное состояние
export const initialState = {
  data: {},
  waiting: false, // признак ожидания загрузки
  isAnswer: false,
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...state, data: {}, waiting: true};

    case "comments/load-success":
      return {...state, data: action.payload.data, waiting: false};

    case "comments/load-error":
      return {...state, data: {}, waiting: false};

    case "comments/post-start":
      return {...state, data: {}, waiting: true};

    case "comments/post-success":
      return {...state, data: action.payload.data, waiting: false}

    case "comments/post-error":
      return {...state, data: action.payload.data, waiting: false};

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
