import StoreModule from "../module";

class ProductData extends StoreModule {
  initState() {
    return {
      product: null
    }
  }

  async getData(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
        product: {
          id: json.result._id,
          title: json.result.title,
          description: json.result.description,
          country: json.result.madeIn.title,
          category: json.result.category.title,
          year: json.result.edition,
          price: json.result.price,
        }
    }, 'Загружены данные товара из АПИ');
  }
}

export default ProductData;