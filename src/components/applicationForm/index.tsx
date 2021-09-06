import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIsAuth } from 'store/auth/selectors';
import { authSlice } from 'store/auth/slice';
import { Link } from 'react-router-dom';
import { ApplicationForm } from './applicationForm';
import { useTranslation } from 'react-i18next';
import css from './css.module.less';

export const Application = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('application');
  const isAuth = useSelector(getIsAuth);
  const [applicationsArray, setApplicationsArray] = useState<number[]>([0]);

  function addToArray() {
    setApplicationsArray([...applicationsArray, applicationsArray.length]);
  }

  console.log(applicationsArray);

  function removeItem(index: number) {
    const arrayWithRemove = applicationsArray.filter((item) => item !== index);
    console.log(index, arrayWithRemove);
    setApplicationsArray(arrayWithRemove);
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
              onClick={() => dispatch(authSlice.actions.setRegistrationTab(true))}
            >
              {t('registration')}
            </Link>
            .
          </span>
        )}

        {applicationsArray.map((item, index) => (
          <React.Fragment key={item}>
            <ApplicationForm
              addToArray={addToArray}
              index={index}
              isLastCard={applicationsArray.length - 1 === index}
              removeItem={removeItem}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
