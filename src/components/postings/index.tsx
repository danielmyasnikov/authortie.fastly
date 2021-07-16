import React, { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store/types';
import { getPostings } from 'store/postings/actions';
import * as Slice from 'store/postings/slice';
import { getPostingsSelector } from 'store/postings/selectors';
import { Card } from 'components/common/card';
import { debounce } from 'lodash';
import { CATEGORY_OPTIONS, KNOWLEDGE_OPTIONS } from './contants';
import styles from './styles.module.less';

export const Postings = () => {
  const dispatch: AppDispatch = useDispatch();
  const pageRef = useRef<HTMLTableElement>(null);
  const { postings, isLoadNecessary } = useSelector(getPostingsSelector);
  const [page, setPage] = useState<number>(1);
  const [load, setLoad] = useState(false);
  const [workType, setWorkType] = useState<string | undefined>('');
  const [knowledgeArea, setKnowledgeArea] = useState<string | undefined>('');

  async function loadData() {
    const resultConf = await dispatch(getPostings({ page, workType, knowledgeArea }));
    if (getPostings.fulfilled.match(resultConf)) {
      setLoad(false);
    }
  }
  useEffect(() => {
    loadData();
  }, [page]);

  useEffect(() => {
    if (workType || knowledgeArea) {
      dispatch(getPostings({ page, workType, knowledgeArea }));
    }
  }, [workType, knowledgeArea]);

  const handleScroll = debounce(() => {
    const ref = pageRef.current;
    if (ref && ref.scrollHeight >= ref.scrollHeight - ref.scrollHeight * 0.1) {
      if (!load && isLoadNecessary) {
        setPage((prev) => prev + 1);
        setLoad(true);
      }
    }
  }, 100);

  function workTypeChange(val?: string) {
    setWorkType(val);
    setPage(1);
    dispatch(Slice.postings.actions.cleanPostings());
  }

  function setKnowledgeAreaChange(val?: string) {
    setKnowledgeArea(val);
    setPage(1);
    dispatch(Slice.postings.actions.cleanPostings());
  }

  return (
    <div className={styles.wrapper} ref={pageRef} onScroll={handleScroll}>
      <div className={styles.content}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>Сообщество</h1>
          <span className={styles.info}>Тысячи учёных уже предлагают свою помощь</span>
        </div>
        <div className={styles.filterWrapper}>
          <Select
            classNamePrefix="CustomSelect"
            className={styles.filter}
            options={CATEGORY_OPTIONS}
            placeholder="Категория"
            onChange={(option) => workTypeChange(option?.value)}
          />
          <Select
            classNamePrefix="CustomSelect"
            className={styles.filter}
            options={KNOWLEDGE_OPTIONS}
            placeholder="Область знания"
            onChange={(option) => setKnowledgeAreaChange(option?.value)}
          />
        </div>
        <div className={styles.cards}>
          {postings.map((item: any) => (
            <Card
              key={item.id + item.title}
              privateAccaunt={false}
              id={item.id}
              keyWords={item.keyword_list}
              comment={item.comment}
              author={item.user.profile}
              institution=""
              authorStatus=""
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
    </div>
  );
};

// approx_date: "2021-08-01"
// comment: "Some string with random text"
// count_views: 0
// id: 2
// keyword_list: "string;string1"
// knowledge_area_list: "biology"
// poster: {id: 2, first_name: null, last_name: null, middle_name: null, about: null, country: null, lang: null,…}
// revert_posting: {work_type: "become_coathor", knowledge_area_list: "biology", title: "Title #1. So it's about this.",…}
// reward_comment: null
// reward_currency: null
// reward_sum: 500
// reward_type: "return_help"
// secreted: true
// title: "Title #0. So it's about that"
// work_type: "invite_coathor"
