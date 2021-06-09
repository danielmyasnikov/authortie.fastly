import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Container } from 'components/container';
import { Menu } from 'components/menu';
import { Main } from 'components/main';
import { ApplicationForm } from 'components/applicationForm';
import { Footer } from 'components/footer';
import { Registration } from 'components/auth/registration';
import styles from './app.module.css';
import './styles/colors.module.css';

const App: React.FC = () => {
  const location = useLocation();
  // @ts-ignore
  let background = location.state && location.state.background;

  return (
    <div className={styles.wrapper}>
      <Menu />
      <Switch location={background || location}>
        <Route exact path="/">
          <Container Component={Main} />
        </Route>
        <Route  path="/application">
          <Container Component={ApplicationForm} />
        </Route>
      </Switch>
      {background && <Route path="/authorization" component={Registration} />}

      <Footer />
    </div>
  );
};

export default App;
