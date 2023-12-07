import item from "../../components/item";
import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      activePage: 1
    }
  }

  async load(skip) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${(skip - 1) * 10}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
      activePage: skip,
    }, 'Загружены товары из АПИ');
  }

  async getData(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
        title: json.result.title,
        description: json.result.description,
        country: json.result.madeIn.title,
        category: json.result.category.title,
        year: json.result.edition,
        price: json.result.price
    }, 'Загружены данные товара из АПИ');
  }
}

export default Catalog;
