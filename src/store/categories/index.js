import StoreModule from "../module";

class CategoriesState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */

  initState() {
    return {
      list: [],
    }
  }

  // Загружаем список категорий
  async loadCategories() {
    const response = await fetch('api/v1/categories?fields=_id,title,parent(_id)&limit=*');
      const json = await response.json();
      const categories = [];

      //Ищем
     json.result.items.map(item => {
      item.value = item._id;
      if(item.parent) {
        let category = json.result.items.find(catalogItem => catalogItem._id === item.parent._id);
          if(!category.children) {
            category.children = [];
          }
          category.children.push(item);
      } else {
        categories.push(item);
        return;
      }
     });

    // Выводим категории в порядке вложенности и добавляем дефисы согласно иерархии
    const list = [];
    list.push({value: '', title: 'Все'});
    const filterCategories = (items, list, nextLvl=0) => {
      nextLvl++;
      if(items) {
        items.map(item => {
          item.title = '- '.repeat(nextLvl-1) + item.title;
          list.push(item);
          if(item.children) {
            filterCategories(item.children, list, nextLvl);
          }
        });
      }
      return list;
    }

    this.setState({
      ...this.getState(),
      list: filterCategories(categories, list),
    })
  }
}

export default CategoriesState;