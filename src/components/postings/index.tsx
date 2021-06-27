import React, { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { getPostings } from 'store/postings/actions';
import { getPostingsSelector } from 'store/postings/selectors';
import { Card } from 'components/common/card';
import { debounce } from 'lodash';
import { CATEGORY_OPTIONS, KNOWLEDGE_OPTIONS } from './contants';
import styles from './styles.module.less';

export const Postings = () => {
  const dispatch = useDispatch();
  const pageRef = useRef<HTMLTableElement>(null);
  const { postings, isLoadNecessary } = useSelector(getPostingsSelector);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    dispatch(getPostings(page));
  }, []);

  useEffect(() => {
    dispatch(getPostings(page));
  }, [page]);

  const handleScroll = debounce(() => {
    const ref = pageRef.current;
    if (ref && ref.scrollHeight >= ref.scrollHeight - ref.scrollHeight * 0.1) {
      if (isLoadNecessary) {
        setPage((prev) => prev + 1);
      }
    }
  }, 100);

  return (
    <div className={styles.wrapper} ref={pageRef} onScroll={handleScroll}>
      <div className={styles.content}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>Сообщество</h1>
          <span className={styles.info}>Тысячи учёных уже предлагают свою помощь</span>
        </div>
        <div className={styles.filterWrapper}>
          <Select className={styles.filter} options={CATEGORY_OPTIONS} placeholder="Категория" />
          <Select
            className={styles.filter}
            options={KNOWLEDGE_OPTIONS}
            placeholder="Область знания"
          />
        </div>
        <div className={styles.cards}>
          {postings.map((item: any) => (
            <Card
              key={item.id}
              privateAccaunt={false}
              id={item.id}
              keyWords={item.keyword_list}
              comment={item.comment}
              author=""
              institution=""
              authorStatus=""
              title={item.title}
              fieldOfActivity=""
              workType={item.work_type || ''}
              knowledgeArea={item.knowledge_area || ''}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// approx_date: "2021-08-01"
// comment: "Some string with random text"
// count_views: 0
// id: 2
// keyword_list: "string;string1"
// knowledge_area: "biology"
// poster: {id: 2, first_name: null, last_name: null, middle_name: null, about: null, country: null, lang: null,…}
// revert_posting: {work_type: "become_coathor", knowledge_area: "biology", title: "Title #1. So it's about this.",…}
// reward_comment: null
// reward_currency: null
// reward_sum: 500
// reward_type: "return_help"
// secreted: true
// title: "Title #0. So it's about that"
// work_type: "invite_coathor"
