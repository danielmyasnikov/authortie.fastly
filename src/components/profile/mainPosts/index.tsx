import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'components/common/card';
import { getLastPostings } from 'store/request/actions';
import { getCreatePost } from 'store/request/selectors';

import styles from './styles.module.less';

export const MainPosts = () => {
  const dispatch = useDispatch();

  const { lastPostings } = useSelector(getCreatePost);

  useEffect(() => {
    dispatch(getLastPostings());
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.cards}>
        {lastPostings.map((item: any) => (
          <Card
            key={item.id}
            privateAccaunt={!item.is_profile_visible}
            id={item.id}
            keyWords={item.keyword_list}
            comment={item.comment}
            author={item.user && item.user.profile}
            title={item.title}
            fieldOfActivity=""
            workType={item.work_type || ''}
            knowledgeArea={item.knowledge_area_list || ''}
            rewardType={item.reward_type}
            rewardCurrency={item.reward_currency}
            rewardSum={item.reward_sum}
            rewardСomment={item.reward_comment}
          />
        ))}
      </div>
    </div>
  );
};