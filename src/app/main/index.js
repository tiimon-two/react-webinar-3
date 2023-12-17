import {memo, useCallback, useEffect} from 'react';
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
import Spinner from '../../components/spinner';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();

  const callbacks = {
    logOut: useCallback(() => {
      store.actions.login.logOut();
    }, [store])
  }

  const select = useSelector(state => ({
    authorized: state.login.authorized,
    user: state.login.user,
    waiting: state.login.waiting,
  }))

  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);

  const {t} = useTranslate();

  return (
    <PageLayout>
      <Spinner active={select.waiting}>
        <User profileLink='/profile' user={select.user.name} loginLink='/login' authorized={select.authorized} logOut={callbacks.logOut}/>
      </Spinner>
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
