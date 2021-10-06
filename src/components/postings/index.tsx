import React, { useEffect, useState, useRef, Fragment } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store/types';
import { getPostings } from 'store/postings/actions';
import * as Slice from 'store/postings/slice';
import { getPostingsSelector } from 'store/postings/selectors';
import { Card } from 'components/common/card';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';
import { CATEGORY_LIST, KNOWLEDGE_OPTIONS } from './contants';
import styles from './styles.module.less';
import { Button } from 'components/common/button';
import { RadioButton } from 'components/common/radioBtn';
import { useHistory, useLocation } from 'react-router-dom';
export const Postings = () => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation('postings');
  const pageRef = useRef<HTMLTableElement>(null);
  const { postings, isLoadNecessary } = useSelector(getPostingsSelector);
  const [page, setPage] = useState<number>(1);
  const [load, setLoad] = useState(false);
  const [postingsList, setPostingsList] = useState<any[]>([]);
  const [workType, setWorkType] = useState<string | undefined>('');
  const [workTypeList, setWorkTypeList] = useState(CATEGORY_LIST);
  const [knowledgeArea, setKnowledgeArea] = useState<string | undefined>('');
  const [knowledgeAreaOption, setKnowledgeAreaOption] = useState<any>('');
  const [workTypeOpen, setWorkTypeOpen] = useState(false);
  const search = useLocation().search;
  const history = useHistory();

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
    const knowledgeAreaPrm = new URLSearchParams(search).get('knowledge_area');
    const workTypePrm = new URLSearchParams(search).get('work_type');
    if (knowledgeAreaPrm) {
      setKnowledgeArea(knowledgeAreaPrm);
      setKnowledgeAreaOption({label: knowledgeAreaPrm, value: knowledgeAreaPrm})
    }
    if (workTypePrm) {
      setWorkType(workTypePrm);
    }
    if (!knowledgeAreaPrm && !workTypePrm) {
      loadData();
    }
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
    if (val) {
      history.push({
        search: '?' + new URLSearchParams({ work_type: val, knowledge_area: knowledgeArea || ''}).toString(),
      });
    }
    setWorkType(val);
    setPage(1);
    dispatch(Slice.postings.actions.cleanPostings());
  }

  function setKnowledgeAreaChange(val?: string) {
    if (val) {
      history.push({
        search: '?' + new URLSearchParams({ knowledge_area: val, work_type: workType || '' }).toString(),
      });
    }
    setKnowledgeArea(val);
    setPage(1);
    dispatch(Slice.postings.actions.cleanPostings());
  }

  function dismissFilter() {
    setWorkType('');
    setKnowledgeArea('');
    setKnowledgeAreaOption('');
    setPage(1);
    dispatch(Slice.postings.actions.cleanPostings());
    dispatch(getPostings({ page: 1, workType: '', knowledgeArea: '' }));
    history.push({
      search: '?' + new URLSearchParams({ knowledge_area: '', work_type: '' }).toString(),
    });
    const newWorkTypes = workTypeList.map((item: any) => {
      const newList = item.list.map((itemList: any) =>
      itemList.checked === true ? { ...itemList, checked: false } : { ...itemList, checked: false },
      );
      return { ...item, list: newList };
    });
    setWorkTypeList(newWorkTypes);
  }

  function handleRadioBtn(id: string) {
    const newWorkTypes = workTypeList.map((item: any) => {
      const newList = item.list.map((itemList: any) =>
        itemList.id === id ? { ...itemList, checked: true } : { ...itemList, checked: false },
      );
      return { ...item, list: newList };
    });
    setWorkTypeList(newWorkTypes);
    setWorkType(id);
  }

  return (
    <div className={styles.wrapper} ref={pageRef} onScroll={handleScroll}>
      <div className={styles.content}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>{t('community')}</h1>
          <span className={styles.info}>{t('info')}</span>
        </div>
        <div className={styles.filterWrapper}>
          <Button className={styles.btn} onClick={() => setWorkTypeOpen(true)}>
            Категории
          </Button>
          <Select
            classNamePrefix="CustomSelect"
            className={styles.filter}
            options={KNOWLEDGE_OPTIONS}
            value={knowledgeAreaOption}
            placeholder={t('knowledgeArea')}
            onChange={(option) => {
              setKnowledgeAreaOption(option)
              setKnowledgeAreaChange(option?.value)
            }}
          />
          <button className={styles.lineBtn} onClick={dismissFilter}>
            {t('reset')}
          </button>
          <div
            className={workTypeOpen ? styles.listBlock : styles.hidden}
          >
            {workTypeList.map(
              ({ category, list }: { category: string; list: any[] }, i: number) => (
                <div key={category + i}>
                  <p className={styles.subtileList}>{category}</p>
                  {list &&
                    list.length &&
                    list.map(
                      (
                        { checked, id, value }: { checked: boolean; id: string; value: string },
                        i: number,
                      ) => (
                        <Fragment key={category + id + i}>
                          {value && (
                            <RadioButton
                              checked={!!checked}
                              id={`${String(id)}_${i}`}
                              name={`${String(id)}_${i}`}
                              label={t(value)}
                              onChange={() => {
                                workTypeChange(id);
                                handleRadioBtn(id);
                              }}
                              isColor
                            />
                          )}
                        </Fragment>
                      ),
                    )}
                </div>
              ),
            )}
            <span className={styles.closeList} onClick={() => setWorkTypeOpen(false)}>
              Закрыть список
            </span>
          </div>
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
                  workType={item.length ? item?.work_type_list[0] : ''}
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
