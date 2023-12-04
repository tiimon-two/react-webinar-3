import item from "./components/item";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  addToCart(item) {
    this.setState({
      ...this.state,
      total: this.state.total? this.state.total + item.price : item.price,
      list: this.state.list.map((itemInCart) => {
        if(itemInCart.code === item.code) {
          return {
            ...itemInCart,
            count : itemInCart.count? itemInCart.count + 1 : 1
          };
        } else {
            return itemInCart
          }
      })
    })

    this.state.list.map(item => {
      if(item.count && !item.inCart) {
        this.setState({
          ...this.state,
          count: this.state.count? this.state.count + 1 : 1
        })
        item.inCart = true;
      }
    })
  };

  deleteFromCart(code) {
    this.state.list.map(item => {
      if(item.code === code) {
        item.inCart = false;
        this.setState({
          ...this.state,
          count: this.state.count - 1,
          total: this.state.total - (item.price * item.count)
        })
        item.count = 0;
      }
    })
  };
}

export default Store;
