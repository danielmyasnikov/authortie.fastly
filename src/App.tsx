import React from 'react';
import { Main } from './components/main';
import styles from './app.module.css';

const App: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Main />
    </div>
  );
};

export default App;
