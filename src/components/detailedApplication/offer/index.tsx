import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import styles from './styles.module.less';

interface Params {
  id: string;
}

export const Offer = () => {
  const dispatch = useDispatch();
  const params = useParams<Params>();
  const { t } = useTranslation('card');

  const [offerCooperation, setOfferCooperation] = useState(false);

  return <div className={styles.wrapper}>helllllo</div>;
};
