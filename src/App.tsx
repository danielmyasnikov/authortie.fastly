import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Menu } from 'components/menu';
import { Main } from 'components/main';
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
        <Route exact path="/" children={<Main />} />
      </Switch>
      {background && <Route path="/authorization" children={<Registration />} />}
      <Footer />
    </div>
  );
};

export default App;
