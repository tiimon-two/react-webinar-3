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
      json.result.items.map(item => {
        item.value = item._id;
        // Если нет родителя это корневой элемент
        if (!item.parent) {
          item.children = [];
          categories.push(item);
        } else {
          categories.map(category => {
            // Если родитель корневой элемент то это его прямой потомок
            if(item.parent._id === category._id) {
              item.children = [];
              category.children.push(item);
            } else (category.children.map(subCategory => {
              // Если родитель потомок корневого элемента то это потомок второго уровня
              if(item.parent._id === subCategory._id) {
                subCategory.children.push(item);
              }
            }))
          });
        }
      });

      // Выводим категории в порядке вложенности и добавляем дефисы согласно иерархии
      const getCategories = () => {
        const list = [];
        list.push({value: '', title: 'Все'});
        categories.map(item => {
        list.push(item);
        if(item.children) {
          item.children.map(item => {
            item.title = `- ${item.title}`;
            list.push(item);
            if(item.children) {
              item.children.map(item => {
                item.title = `-- ${item.title}`;
                list.push(item);
              })
            }
          })
        }
      });
      return list;
    }
      this.setState({
        ...this.getState(),
        list: getCategories(),
      })
    }
}

export default CategoriesState;