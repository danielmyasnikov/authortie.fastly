import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { Container } from 'components/container';
import { Menu } from 'components/menu';
import { Main } from 'components/main';
import { Postings } from 'components/postings';
import { ApplicationForm } from 'components/applicationForm';
import { Footer } from 'components/footer';
import { Profile } from 'components/profile';
import { Registration } from 'components/auth/registration';
import { authSlice } from 'store/auth/slice';
import styles from './app.module.css';
import './styles/colors.module.css';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  // @ts-ignore
  const background = location.state && location.state.background;
  const history = useHistory();

  const params = new URLSearchParams(history.location.search);
  const pathNoSlash = location.pathname.substr(location.pathname.indexOf('/') + 1);
  useEffect(() => {
    if (location.pathname === '/authorization' && !background) {
      history.push({
        pathname: location.pathname,
        state: { background: location.pathname },
      });
    }
  }, []);

  useEffect(() => {
    const uid = params.get('uid');
    const client = params.get('client');
    const accessToken = params.get('access-token');
    if (!!uid && !!client && !!accessToken) {
      localStorage.setItem('uid', uid);
      localStorage.setItem('access-token', accessToken);
      localStorage.setItem('client', client);
      dispatch(authSlice.actions.getAuth());
      history.push(pathNoSlash);
    }
  }, [history.location.search]);

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    const client = localStorage.getItem('client');
    const accessToken = localStorage.getItem('access-token');
    if (!!uid && !!client && !!accessToken) {
      dispatch(authSlice.actions.getAuth());
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <Menu />
      <Switch location={background || location}>
        <Route exact path="/">
          <Container Component={Main} />
        </Route>
        <Route exact path="/application">
          <Container Component={ApplicationForm} />
        </Route>
        <Route exact path="/community">
          <Container Component={Postings} />
        </Route>
        <Route exact path="/profile">
          <Container Component={Profile} />
        </Route>
      </Switch>
      {background && <Route path="/authorization" component={Registration} />}
    </div>
  );
};

export default App;
