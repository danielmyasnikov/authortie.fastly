import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getDetailedApplication } from 'store/detailedApplication/actions';
import { getDetailedApplicationSelector } from 'store/detailedApplication/selectors';
import { Footer } from 'components/footer';

import styles from './styles.module.less';

interface Params {
  id: string;
}

export const DetailedApplication = () => {
  const dispatch = useDispatch();
  const params = useParams<Params>();
  const post = useSelector(getDetailedApplicationSelector);

  useEffect(() => {
    if (!!params.id) dispatch(getDetailedApplication(params.id));
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        
        <div className={styles.cardWrap}>

        </div>

        <div className={styles.profileWrapper}></div>
        
         </div>

      <div className={styles.foot}>
        <Footer />
      </div>
    </div>
  );
};
