import React, { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store/types';
import { getPostings } from 'store/postings/actions';
import * as Slice from 'store/postings/slice';
import { getPostingsSelector } from 'store/postings/selectors';
import { Card } from 'components/common/card';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';
import { CATEGORY_OPTIONS, KNOWLEDGE_OPTIONS } from './contants';
import styles from './styles.module.less';

export const Postings = () => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation('postings');
  const pageRef = useRef<HTMLTableElement>(null);
  const { postings, isLoadNecessary } = useSelector(getPostingsSelector);
  const [page, setPage] = useState<number>(1);
  const [load, setLoad] = useState(false);
  const [postingsList, setPostingsList] = useState<any[]>([]);
  const [workType, setWorkType] = useState<string | undefined>('');
  const [knowledgeArea, setKnowledgeArea] = useState<string | undefined>('');

  useEffect(() => {
    setPostingsList(postings);
  }, [postings]);

  async function loadData() {
    const resultConf = await dispatch(getPostings({ page, workType, knowledgeArea }));
    if (getPostings.fulfilled.match(resultConf)) {
      setLoad(false);
    }
  }
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (page > 1) {
      loadData();
    }
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

  function dismissFilter() {
    setWorkType('');
    setKnowledgeArea('');
    setPage(1);
    dispatch(Slice.postings.actions.cleanPostings());
    dispatch(getPostings({ page: 1, workType: '', knowledgeArea: '' }));
  }

  return (
    <div className={styles.wrapper} ref={pageRef} onScroll={handleScroll}>
      <div className={styles.content}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>{t('community')}</h1>
          <span className={styles.info}>{t('info')}</span>
        </div>
        <div className={styles.filterWrapper}>
          <Select
            classNamePrefix="CustomSelect"
            className={styles.filter}
            options={CATEGORY_OPTIONS}
            placeholder={t('category')}
            onChange={(option) => workTypeChange(option?.value)}
          />
          <Select
            classNamePrefix="CustomSelect"
            className={styles.filter}
            options={KNOWLEDGE_OPTIONS}
            placeholder={t('knowledgeArea')}
            onChange={(option) => setKnowledgeAreaChange(option?.value)}
          />
          <button className={styles.lineBtn} onClick={dismissFilter}>
            {t('reset')}
          </button>
        </div>
        <div className={styles.cards}>
          {!!postingsList &&
            !!postingsList.length &&
            postingsList.map((item: any) => (
              <React.Fragment key={item.id + item.title}>
                <Card
                  privateAccaunt={!item.is_profile_visible}
                  id={item.id}
                  keyWords={item.keyword_list}
                  comment={item.comment}
                  author={item.user && item.user.profile}
                  title={item.title}
                  fieldOfActivity=""
                  workType={item.work_type_list[0] || ''}
                  knowledgeArea={item.knowledge_area_list || ''}
                  rewardType={item.reward_type}
                  rewardCurrency={item.reward_currency}
                  rewardSum={item.reward_sum}
                  rewardСomment={item.reward_comment}
                  whois={item.whois}
                />
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};
