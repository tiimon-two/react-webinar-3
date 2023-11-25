/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.maxCode = 0;
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

  /**
   * Поиск максимального значения code среди существующих элементов
   * и установление нового значения для нового элемента
   */
  searchMaxCode() {
    this.state.list.map(item => {
      if (item.code > this.maxCode) {
        this.maxCode = item.code;
      }
    })
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.searchMaxCode();
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: ++this.maxCode, title: 'Новая запись', selectCount : 0}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          if (item.selected) item.selectCount++;
        } else {
          item.selected = false;
        }
        return item;
      })
    })
  }
}

export default Store;
