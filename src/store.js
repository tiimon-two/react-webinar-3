/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.setState({
      ...this.state,
      cart: []
    })
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
    let notInCart = true;

    this.state.cart.map(itemInCart => {
      if(itemInCart.title === item.title) {
        notInCart = false;
        item.count = itemInCart.count + 1;
        this.setState({
          ...this.state,
          cart: this.state.cart.filter(itemInCart => itemInCart.code !== item.code),
        })
      }
    });

    if(notInCart) {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, {code: item.code, title: item.title, price: item.price, inCart: true, count: 1}],
        count: this.state.count? this.state.count + 1 : 1,
        total: this.state.total? this.state.total + item.price : item.price
      })
    } else {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, {code: item.code, title: item.title, price: item.price, inCart: true, count: item.count}],
        total: this.state.total + item.price
      })
    }
  }

  deleteFromCart(code) {
    this.state.cart.map(item => {
      if(item.code === code) {
        let cost = item.price * item.count;
        this.setState({
          ...this.state,
          total: this.state.total - cost,
          cart: this.state.cart.filter(item => item.code !== code),
          count: this.state.count - 1
        })
      }
    })
  }
}

export default Store;
