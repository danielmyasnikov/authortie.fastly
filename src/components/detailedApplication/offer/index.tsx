import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getIsAuth } from 'store/auth/selectors';
import { Button } from 'components/common/button';
import { ApplicationForm } from 'components/applicationForm/applicationForm';
import { getLastPostings } from 'store/request/actions';
import { getDetailedApplication, submitBids } from 'store/detailedApplication/actions';

import { AppDispatch } from 'store/types';
import { getCreatePost } from 'store/request/selectors';
import Select from 'react-select';

import styles from './styles.module.less';

interface Params {
  id: string;
}

enum OfferType {
  THERE_ARE_PUBLICATION = 'THERE_ARE_PUBLICATION',
  NEW_PUBLICATION = 'NEW_PUBLICATION',
  INITIAL = 'INITIAL',
}

export const Offer = () => {
  const dispatch: AppDispatch = useDispatch();
  const params = useParams<Params>();
  const [offerType, setOfferType] = useState<OfferType>(OfferType.INITIAL);
  const [work, setWork] = useState();
  const [lastPostingsOptions, setLastPostingsOptions] = useState<any[]>([]);
  const { lastPostings } = useSelector(getCreatePost);
  const isAuth = useSelector(getIsAuth);
  const { t } = useTranslation('card');

  useEffect(() => {
    if (isAuth) dispatch(getLastPostings());
  }, []);

  useEffect(() => {
    const newLastOptions = lastPostings.map((item: any) => ({
      value: String(item.id),
      label: item.title,
    }));
    setLastPostingsOptions(newLastOptions);
  }, [lastPostings]);

  function selectWork(option: { label: string; value: string }) {
    const selectPost = lastPostings.filter((item: any) => String(item.id) === option.value)[0];
    setWork(selectPost);
  }

  async function submitOffer() {
    // @ts-ignore
    const supplyId = String(work?.id);
    const requestId = params.id;
    const agreementType = null;

    const resultConf = await dispatch(submitBids({ requestId, supplyId, agreementType }));
    if (submitBids.fulfilled.match(resultConf)) {
      dispatch(getDetailedApplication(params.id));
    }
  }

  const renderListOffer = () => (
    <div className={styles.selectWrapper}>
      {!lastPostingsOptions.length ? (
        <span className={styles.info}>{t('emptyList')}</span>
      ) : (
        <Select
          classNamePrefix="CustomSelectOffer"
          defaultValue={lastPostingsOptions[0] && lastPostingsOptions[0].value}
          options={lastPostingsOptions}
          placeholder="changeWork"
          onChange={selectWork}
        />
      )}

      {!!work && <Button onClick={submitOffer}>{t('suggest')}</Button>}
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.btnWrapper}>
        <Button onClick={() => setOfferType(OfferType.THERE_ARE_PUBLICATION)}>
          {t('hasApplication')}
        </Button>
        <Button onClick={() => setOfferType(OfferType.NEW_PUBLICATION)}>
          {t('newApplication')}
        </Button>
      </div>
      {offerType === OfferType.NEW_PUBLICATION && <ApplicationForm isOffer requestId={params.id} />}
      {offerType === OfferType.THERE_ARE_PUBLICATION && renderListOffer()}
    </div>
  );
};
