import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { getIsAuth } from 'store/auth/selectors';
import { authSlice } from 'store/auth/slice';
import { Link, useParams } from 'react-router-dom';
import { createPostingsApp, editPostings } from 'store/request/actions';
import { AppDispatch } from 'store/types';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/common/button';
import NoteModal from 'assets/note.svg';
import { getDetailedApplication } from 'store/detailedApplication/actions';
import { Modal } from 'components/common/modal';
import { getCreatePost } from 'store/request/selectors';
import { getDetailedApplicationSelector } from 'store/detailedApplication/selectors';
import { createPost } from 'store/request/slice';
import { ApplicationForm } from './applicationForm';
import css from './css.module.less';

interface Params {
  id: string;
}

interface Props {
  isOffer: any;
  requestId: any;
  requestType: any;
}

export const Application: React.FC<Props> = ({ isOffer, requestId, requestType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation('application');
  const isAuth = useSelector(getIsAuth);
  const [postData, setPostData] = useState<any>(null);
  const [applicationsArray, setApplicationsArray] = useState<number[]>([0]);
  const [modal, setModal] = useState<boolean>(false);
  const [pushValidation, setPushvalidation] = useState(false);
  const [error, setError] = useState('');
  const { dataArray, errorIndex } = useSelector(getCreatePost);
  const { post }: any = useSelector(getDetailedApplicationSelector);

  const params = useParams<Params>();

  const isNewOffer = !isOffer && !params.id;
  const isEdit = !!params.id;

  useEffect(() => {
    if (isEdit) {
      setPostData(post);
    }
  }, [post]);

  useEffect(() => {
    if (params.id) {
      dispatch(getDetailedApplication(params.id));
    }
  }, [params.id]);

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
    if (!isEdit) {
      const resultConf = await dispatch(createPostingsApp(dataArray));
      console.log(createPostingsApp.fulfilled.match(resultConf));
      if (createPostingsApp.fulfilled.match(resultConf)) {
        setModal(true);
      }
    } else editPost(dataArray[0]);
  }

  async function editPost(data: any) {
    const resultConfEdit = await dispatch(editPostings({ data, id: params.id }));
    console.log(resultConfEdit.payload);
    if (editPostings.fulfilled.match(resultConfEdit) && !resultConfEdit.payload) {
      console.log(1234567);
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
    <div className={cn(css.wrapper, { [css.isOffer]: isOffer })}>
      <div className={css.indent} />
      <div className={css.content}>
        {(isNewOffer || isEdit) && (
          <h1 className={css.title}>{isEdit ? t('editTitle') : t('title')}</h1>
        )}
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
              isOffer={isOffer}
              requestType={requestType}
              requestId={requestId}
              isEdit={isEdit}
              editData={postData}
            />
          </React.Fragment>
        ))}
      </div>
      <div className={css.indent} />
      {modal && renderModal()}
    </div>
  );
};
