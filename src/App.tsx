import React from 'react';
import { Menu } from 'components/menu';
import { Main } from 'components/main';
import {Footer} from 'components/footer'
import styles from './app.module.css';
import './styles/colors.module.css'

const App: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Menu />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
