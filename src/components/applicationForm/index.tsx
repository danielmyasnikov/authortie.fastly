import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIsAuth } from 'store/auth/selectors';
import { authSlice } from 'store/auth/slice';
import { Link } from 'react-router-dom';
import { createPostingsApp } from 'store/request/actions';
import { AppDispatch } from 'store/types';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/common/button';
import NoteModal from 'assets/note.svg';
import { Modal } from 'components/common/modal';
import { getCreatePost } from 'store/request/selectors';
import { createPost } from 'store/request/slice';
import { ApplicationForm } from './applicationForm';
import css from './css.module.less';

export const Application = () => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation('application');
  const isAuth = useSelector(getIsAuth);
  const [applicationsArray, setApplicationsArray] = useState<number[]>([0]);
  const [modal, setModal] = useState<boolean>(false);
  const [pushValidation, setPushvalidation] = useState(false);
  const [error, setError] = useState('');
  const { dataArray, errorIndex } = useSelector(getCreatePost);

  function addToArray() {
    setApplicationsArray([...applicationsArray, applicationsArray.length]);
  }

  function createPostItems({ data, index }: { data: any; index: number }) {
    if (!dataArray.length || index === dataArray.length) {
      dispatch(createPost.actions.setDataArray([...dataArray, data]));
    } else {
      const newDataArray = dataArray.map((item: any, i: number) => {
        if (i === index) {
          return data;
        }
        return item;
      });
      dispatch(createPost.actions.setDataArray(newDataArray));
    }
  }

  function removeItem(index: number) {
    const arrayWithRemove = applicationsArray.filter((item) => item !== index);
    const newDataArray = dataArray.filter((item: any, i: number) => i !== index);
    dispatch(createPost.actions.setDataArray(newDataArray));
    setApplicationsArray(arrayWithRemove);
  }

  function getErrorIndex(index: number) {
    dispatch(createPost.actions.setErrorIndex([...errorIndex, index]));
  }

  async function createPostsApp() {
    const resultConf = await dispatch(createPostingsApp(dataArray));
    if (createPostingsApp.fulfilled.match(resultConf)) {
      setModal(true);
    }
  }

  const renderModal = () => (
    <Modal open={modal} onClose={setModal}>
      <NoteModal className={css.noteIcon} />
      <span className={css.subtitle}>{t('confirmTitle')}</span>
      <span className={css.modalInfo}>{t('confirmInfo')}</span>
      <Link to="/community">
        <Button>{t('toPostings')}</Button>
      </Link>
      <Link to="/">
        <Button className={css.btnBorder}>{t('toMain')}</Button>
      </Link>
    </Modal>
  );

  return (
    <div className={css.wrapper}>
      <div className={css.indent} />
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
              setErrorIndex={createPost.actions.setDataArray}
              setError={setError}
              error={error}
              isAlone={applicationsArray.length === 1}
            />
          </React.Fragment>
        ))}
      </div>
      <div className={css.indent} />
      {modal && renderModal()}
    </div>
  );
};
