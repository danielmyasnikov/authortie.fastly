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
  console.log(id);
  const { lastPostings } = useSelector(getCreatePost);

  useEffect(() => {
    dispatch(getLastPostings()).finally(() =>
      setTimeout(() => {
        setLoading(false);
      }, 1000),
    );
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
      {loading && (
        <Loader />
      )}
      <div className={styles.wrapper}>
        <div style={loading ? { display: 'none' } : { display: 'grid' }} className={styles.cards}>
          {lastPostings !== undefined &&
            lastPostings.map((item: any) => (
              <Card
                key={item.id}
                privateAccaunt={!item.is_profile_visible}
                id={item.id}
                keyWords={item.keyword_list}
                comment={item.comment}
                author={item.user && item.user.profile}
                title={item.title}
                fieldOfActivity=""
                workType={item.length ? item?.work_type_list[0] : ''}
                knowledgeArea={item.knowledge_area_list || ''}
                rewardType={item.reward_type_list || ''}
                rewardCurrency={item.reward_currency}
                rewardSum={item.reward_sum}
                rewardСomment={item.reward_comment}
                whois={item.whois}
                avatarUrl={item.user.profile.avatar_url}
              />
            ))}
        </div>
      </div>
    </>
  );
};
