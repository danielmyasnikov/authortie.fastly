import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { Container } from 'components/container';
import { Menu } from 'components/menu';
import { Main } from 'components/main';
import { ApplicationForm } from 'components/applicationForm';
import { Footer } from 'components/footer';
import { Registration } from 'components/auth/registration';
import { authSlice } from 'store/auth/slice';
import styles from './app.module.css';
import './styles/colors.module.css';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  // @ts-ignore
  let background = location.state && location.state.background;
  const history = useHistory();

  const params = new URLSearchParams(history.location.search);

  useEffect(() => {
    const uid = params.get('uid');
    const client = params.get('client');
    const accessToken = params.get('access-token');
    if (!!uid && !!client && !!accessToken) {
      localStorage.setItem('uid', uid);
      localStorage.setItem('access-token', accessToken);
      localStorage.setItem('client', client);
      dispatch(authSlice.actions.getAuth());
      history.push('/');
    }
  }, [history.location.search]);

  return (
    <div className={styles.wrapper}>
      <Menu />
      <Switch location={background || location}>
        <Route exact path="/">
          <Container Component={Main} />
        </Route>
        <Route exact path="/:id">
          <Container Component={Main} />
        </Route>
        <Route path="/application">
          <Container Component={ApplicationForm} />
        </Route>
      </Switch>
      {background && <Route path="/authorization" component={Registration} />}

      <Footer />
    </div>
  );
};

export default App;
