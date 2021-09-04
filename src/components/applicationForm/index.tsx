import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getIsAuth } from 'store/auth/selectors';
import { Link } from 'react-router-dom';
import { ApplicationForm } from './applicationForm';
import { useTranslation } from 'react-i18next';
import css from './css.module.less';

export const Application = () => {
  const { t } = useTranslation('application');
  const isAuth = useSelector(getIsAuth);
  const [applicationsArray, setApplicationsArray] = useState<number[]>([0]);

  function addToArray() {
    setApplicationsArray([...applicationsArray, applicationsArray.length]);
  }

  return (
    <div className={css.wrapper}>
      <div className={css.content}>
        <h1 className={css.title}>{t('title')}</h1>
        {!isAuth && (
        <span className={css.authDescriptionTop}>
          {t('registrationInfo')}
          <Link
            to={{
              pathname: '/authorization',
              state: { background: location },
            }}
            className={css.authLink}
          >
            {t('registration')}
          </Link>
          .
        </span>
        )}

        {applicationsArray.map((_, index) => (
          <React.Fragment key={index}>
            <ApplicationForm addToArray={addToArray} index={index} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
