import React from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

import { categoryOtions } from './constants';
import { otions } from './constants';
import styles from './styles.module.less';

export const ApplicationForm = () => {
  const { t } = useTranslation('application');


  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('title')}</h1>

        <div className={styles.selectWrapper}>
          <div className={styles.block}>
            <span className={styles.label}>{t('category')}</span>
            <Select placeholder={t('choose')} options={categoryOtions} className={styles.select} />
          </div>
          <div className={styles.block}>
            <span className={styles.label}>{t('category')}</span>
            <Select placeholder={t('choose')} options={otions} className={styles.select} />
          </div>
        </div>

        <span className={styles.label}>{t('workName')}</span>
        <textarea className={styles.textarea} />
      </div>
    </div>
  );
};
