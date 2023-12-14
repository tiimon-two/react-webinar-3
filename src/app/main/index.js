import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import User from '../../components/user';
import useSelector from '../../hooks/use-selector';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();

  const callbacks = {
    logOut: useCallback(() => {
      store.actions.login.logOut();
    })
  }

  const select = useSelector(state => ({
    authorized: state.login.authorized,
    user: state.login.user
  }))

  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);

  const {t} = useTranslate();

  return (
    <PageLayout>
      <User profileLink='/profile' user={select.authorized? select.user?.name : ''} loginLink='/login' authorized={select.authorized} logOut={callbacks.logOut}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
