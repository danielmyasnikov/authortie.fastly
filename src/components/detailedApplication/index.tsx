import React from 'react';
import { Footer } from 'components/footer';

import styles from './styles.module.less';

export const DetailedApplication = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}> </div>

      <div className={styles.foot}>
        <Footer />
      </div>
    </div>
  );
};
