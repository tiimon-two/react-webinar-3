import { useParams } from "react-router-dom";
import useStore from "../../store/use-store";
import { useCallback, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import ProductItem from "../../components/product-item";
import useSelector from "../../store/use-selector";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import Basket from "../basket";
import Container from "../../components/container";
import Navigation from "../../components/navigation";

function Product() {
  const { id } = useParams();
  const store = useStore();

  useEffect(() => {
    store.actions.product.getData(id)
  }, [id]);

   const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    activeModal: state.modals.name,
    title: state.catalog.title,
    description: state.catalog.description,
    country: state.catalog.country,
    category: state.catalog.category,
    year: state.catalog.year,
    price: state.catalog.price,
    lang: state.language.lang,
    product: state.product.product,
  }));

  const callbacks = {
      addToBasket: useCallback((id) => store.actions.basket.addToBasket(id), [store]),
      openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
      // Смена языка
      changeLang: useCallback(() => {
        store.actions.language.changeLang();
      }, [store]),
    }

    return(
      <>
        <PageLayout>
          <Head title={select.product?.title} lang={select.lang} changeLang={callbacks.changeLang}/>
          <Container>
            <Navigation lang={select.lang}/>
            <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} lang ={select.lang}/>
          </Container>
          <ProductItem product={select.product} onAdd={callbacks.addToBasket} lang={select.lang}/>
        </PageLayout>
        {select.activeModal === 'basket' && <Basket/>}
      </>
    );
}

export default Product;