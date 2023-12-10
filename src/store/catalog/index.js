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
      activePage: 1,
      product: null,
    }
  }

  async load(skip, count) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${(skip - 1) * count}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
      activePage: skip,
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
