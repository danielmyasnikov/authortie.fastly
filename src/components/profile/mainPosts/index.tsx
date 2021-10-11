import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'components/common/card';
import { getLastPostings } from 'store/request/actions';
import { getCreatePost } from 'store/request/selectors';
import styles from './styles.module.less';
import { Button } from 'components/common/button';
import { Link } from 'react-router-dom';
import Loader from 'components/loader';
import { AppDispatch } from 'store/types';

interface Props {
  id?: string;
}

export const MainPosts: React.FC<Props> = ({ id }) => {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { lastPostings } = useSelector(getCreatePost);

  useEffect(() => {
    dispatch(getLastPostings()).finally(() => setLoading(false));
  }, []);

  if (lastPostings.length === 0 && !loading) {
    return (
      <div className={styles.emptyAplication}>
        <div className={styles.emptyAplicationTitle}>Здесь пока ничего нет</div>
        <div className={styles.emptyAplicationDesc}>
          но мы вам предлагаем создать свою первую заявку!
        </div>
        <Link to="/application">
          <Button className={styles.emptyAplicationBtn}>Создать заявку</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {loading && <Loader />}
      <div className={styles.wrapper}>
        <div className={loading ? styles.hidden : styles.cards}>
          {!!lastPostings.length &&
            lastPostings.map((item: any) => (
              <React.Fragment key={item.id + item.title}>
                <Card post={item} />
              </React.Fragment>
            ))}
        </div>
      </div>
    </>
  );
};
