import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import User from '../../components/user';
import { memo, useCallback, useEffect} from "react";
import useSelector from "../../hooks/use-selector";
import ProfileContent from "../../components/profile-content";
import useStore from "../../hooks/use-store";
import Spinner from "../../components/spinner";

/**
 * Главная страница - первичная загрузка каталога
 */
function Profile() {

  const store = useStore();
  const {t} = useTranslate();

  const callbacks = {
    logOut: useCallback(() => {
      store.actions.login.logOut();
    })
  }

  const select = useSelector(state => ({
    user: state.login.user,
    authorized: state.login.authorized,
    waiting: state.login.waiting,
  }));

  useEffect(() => {store.actions.login.findUser()}, [store]);

  return (
      <PageLayout>
        <Spinner active={select.waiting}>
          <User profileLink='/profile' user={select.user.name} loginLink='/login' authorized={select.authorized} logOut={callbacks.logOut}/>
        </Spinner>
        <Head title={t('title')}>
          <LocaleSelect/>
        </Head>
        <Navigation/>
        <ProfileContent name={select.user?.name} phone={select.user?.phone} email={select.user?.email}/>
    </PageLayout>
  );
}

export default memo(Profile);
