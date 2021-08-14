import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApplicationForm } from 'components/applicationForm/applicationForm';
import { getDetailedApplication } from 'store/detailedApplication/actions';
import { getDetailedApplicationSelector } from 'store/detailedApplication/selectors';
import { AppDispatch } from 'store/types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import css from './css.module.less';

interface Params {
  id: string;
}

export const EditApplication = () => {
  const dispatch: AppDispatch = useDispatch();
  const [postData, setPostData] = useState<any>(null);
  const { t } = useTranslation('application');

  const params = useParams<Params>();
  const { post }: any = useSelector(getDetailedApplicationSelector);

  useEffect(() => {
    setPostData(post);
  }, [post]);

  useEffect(() => {
    if (!!params.id) {
      dispatch(getDetailedApplication(params.id));
    }
  }, [params.id]);

  return (
    <div className={css.wrapper}>
      <div className={css.content}>
        <h1 className={css.title}>{t('editTitle')}</h1>

        <ApplicationForm isEdit editData={postData} />
      </div>
    </div>
  );
};
