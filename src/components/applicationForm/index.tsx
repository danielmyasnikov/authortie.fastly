import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIsAuth } from 'store/auth/selectors';
import { authSlice } from 'store/auth/slice';
import { Link } from 'react-router-dom';
import { createPostingsApp } from 'store/request/actions';
import { ApplicationForm } from './applicationForm';
import { AppDispatch } from 'store/types';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/common/button';
import NoteModal from 'assets/note.svg';
import Close from 'assets/close.svg';
import css from './css.module.less';

export const Application = () => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation('application');
  const isAuth = useSelector(getIsAuth);
  const [applicationsArray, setApplicationsArray] = useState<number[]>([0]);
  const [dataArray, setDataArray] = useState<any>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [errorIndex, setErrorIndex] = useState<number[]>([]);
  const [pushValidation, setPushvalidation] = useState(false);
  const [error, setError] = useState('');
  function addToArray() {
    setApplicationsArray([...applicationsArray, applicationsArray.length]);
  }

  function createPostItems({ data, index }: { data: any; index: number }) {
    if (!dataArray.length || index === dataArray.length) {
      setDataArray([...dataArray, data]);
    } else {
      const newDataArray = dataArray.map((item: any, i: number) => {
        if (i === index) {
          return data;
        }
        return item;
      });
      setDataArray(newDataArray);
    }
  }

  function removeItem(index: number) {
    const arrayWithRemove = applicationsArray.filter((item) => item !== index);
    const newDataArray = dataArray.filter((item: any, i: number) => i !== index);
    setDataArray(newDataArray);
    setApplicationsArray(arrayWithRemove);
  }

  function getErrorIndex(index: number) {
    setErrorIndex([...errorIndex, index]);
  }

  async function createPostsApp() {
    const resultConf = await dispatch(createPostingsApp(dataArray));
    if (createPostingsApp.fulfilled.match(resultConf)) {
      setModal(true);
    }
  }

  const renderModal = () => (
    <div className={css.modalWrapper}>
      <div className={css.modalContaier}>
        <Close className={css.exit} onClick={() => setModal(false)} />
        <NoteModal className={css.noteIcon} />
        <span className={css.subtitle}>{t('confirmTitle')}</span>
        <span className={css.modalInfo}>{t('confirmInfo')}</span>
        <Link to={'/community'}>
          <Button>{t('toPostings')}</Button>
        </Link>
        <Link to={'/'}>
          <Button className={css.btnBorder}>{t('toMain')}</Button>
        </Link>
      </div>
      <div className={css.overlay} />
    </div>
  );

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
              createPostItems={createPostItems}
              createPostsApp={createPostsApp}
              pushValidation={pushValidation}
              setPushvalidation={setPushvalidation}
              getErrorIndex={getErrorIndex}
              setErrorIndex={setErrorIndex}
              setError={setError}
              error={error}
            />
          </React.Fragment>
        ))}
      </div>
      {modal && renderModal()}
    </div>
  );
};
