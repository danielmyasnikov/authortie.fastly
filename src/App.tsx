import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import getUnixTime from 'date-fns/getUnixTime';
import Container from 'components/container';
import { Menu } from 'components/menu';
import { Main } from 'components/main';
import { Postings } from 'components/postings';
import { Application } from 'components/applicationForm';
import { DetailedApplication } from 'components/detailedApplication';
import { AuthorProfile } from 'components/autorProfile';
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
    const expiry = localStorage.getItem('expiry');
    if (!!uid && !!client && !!accessToken && !!expiry) {
      if (Number(expiry) > getUnixTime(Date.now())) {
        dispatch(authSlice.actions.getAuth());
      }
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
          <Container Component={Application} />
        </Route>
        <Route exact path="/community">
          <Container Component={Postings} />
        </Route>
        <Route exact path="/profile">
          <Container Component={Profile} />
        </Route>
        <Route exact path="/profile/:id">
          <Container Component={AuthorProfile} />
        </Route>
        <Route exact path="/community/:id(\d+)">
          <Container Component={DetailedApplication} />
        </Route>
      </Switch>
      {/* <Registration /> */}
      {background && <Route exact path="/authorization" component={Registration} />}
    </div>
  );
};

export default App;
