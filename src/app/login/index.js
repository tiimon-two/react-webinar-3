import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import User from '../../components/user';
import LoginForm from '../../components/loginForm';
import { memo, useCallback, useEffect} from "react";
import useSelector from "../../hooks/use-selector";
import Spinner from "../../components/spinner";

/**
 * Главная страница - первичная загрузка каталога
 */
function Login() {
  const store = useStore();
  const {t} = useTranslate();

  const callbacks = {
    logOut: useCallback(() => {
      store.actions.login.logOut();
    })
  }

  const select = useSelector(state => ({
    error: state.login.error,
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
        <Spinner active={select.waiting}>
          {!select.authorized &&<LoginForm error={select.error}/>}
        </Spinner>
      </PageLayout>
  );
}

export default memo(Login);
