import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Select from 'react-select';
import { getIsAuth } from 'store/auth/selectors';
import { RadioButton } from 'components/common/radioBtn';
import { Checkbox } from 'components/common/checkbox';
import { DatePicker } from 'components/common/datePicker';
import { Button } from 'components/common/button';
import cn from 'classnames';
import format from 'date-fns/format';
import { createPostings, editPostings } from 'store/request/actions';
import { getDetailedApplication } from 'store/detailedApplication/actions';

import NoteModal from 'assets/note.svg';
import RoundRowRight from 'assets/roundRowRight.svg';
import RoundRowLeft from 'assets/roundRowLeft.svg';
import Pencil from 'assets/edit.svg';
import Note from 'assets/noteDescription.svg';
import KeyWord from 'assets/keyWord.svg';
import Stat from 'assets/stat.svg';

import { AppDispatch } from 'store/types';

import {
  workTypesDefault,
  knowledgeDefault,
  rewardTypestDefault,
  currencyOptions,
} from './constants';
import css from './css.module.less';

interface Option {
  label: string;
  value: string;
}

interface Props {
  isOffer?: boolean;
  requestId?: string;
  isEdit?: boolean;
  editData?: any; // TODO: типизировать
  addToArray?: () => void;
}

enum WhoIAm {
  CUSTOMER = 'demand', //спрос(я заказчик)
  EXECUTOR = 'supply', //предложение (я исполнитель)
}

export const ApplicationForm: React.FC<Props> = ({
  isEdit,
  isOffer,
  requestId,
  addToArray,
  editData,
}) => {
  const { t } = useTranslation('application');
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  const location = useLocation();

  const [whoIAm, setWhoIAm] = useState<WhoIAm>(WhoIAm.CUSTOMER);

  const [approxDate, setApproxDate] = useState(new Date(Date.now()));
  const [workTypes, setWorkTypes] = useState(workTypesDefault);
  const [rewardTypes, setRewardTypes] = useState(rewardTypestDefault);
  const [knowledge, setKnowledge] = useState(knowledgeDefault);

  const [sumCheck, setSumCheck] = useState(false);
  const [sum, setSum] = useState<string>();
  const [currency, setCurrency] = useState<Option>();

  const [workName, setWorkName] = useState('');
  const [workDescription, setWorkDescription] = useState('');
  const [keyWords, setKeyWords] = useState('');

  const [hideFromOtherUsers, setHideFromOtherUsers] = useState(false);
  const [hideFromSearch, setHideFromSearch] = useState(false);

  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    if (!!editData && isEdit) {
      const editKnowledge = knowledgeDefault.map((item) => ({
        ...item,
        checked:
          Array.isArray(editData.knowledge_area_list) &&
          editData.knowledge_area_list.includes(item.id),
      }));
      const editWorkTypes = workTypesDefault.map((item) => ({
        ...item,
        checked:
          Array.isArray(editData.work_type_list) && editData.work_type_list.includes(item.id),
      }));

      const editRewardTypes = rewardTypestDefault.map((item) => ({
        ...item,
        checked:
          Array.isArray(editData.reward_type_list) && editData.reward_type_list.includes(item.id),
      }));

      if (editData.request_type === WhoIAm.CUSTOMER) {
        setWorkTypes(editWorkTypes);
        setRewardTypes(editRewardTypes);
      } else {
        setWorkTypes(editRewardTypes);
        setRewardTypes(editWorkTypes);
      }

      setKnowledge(editKnowledge);
      setSum(editData.reward_sum);
      setCurrency({ label: editData.reward_currency, value: editData.reward_currency });
      setSumCheck(
        Array.isArray(editData.reward_type_list) &&
          editData.reward_type_list.find((item: string) => item === 'money'),
      );

      setApproxDate(editData.approx_date);
      setWorkName(editData.title);
      setWorkDescription(editData.comment);

      setKeyWords(Array.isArray(editData.keyword_list) && editData.keyword_list.join(';'));
      setHideFromSearch(editData.hide_from_other_users);
      setHideFromSearch(editData.hide_from_search);
    }
  }, [editData]);

  async function submitForm() {
    const checkedWorkTypes = workTypes.filter((el) => el.checked).map((item) => item.id);
    const checkedRewardTypes = rewardTypes.filter((el) => el.checked).map((item) => item.id);
    const checkedRewardTypesWithMoney = sumCheck
      ? [...checkedRewardTypes, 'money']
      : checkedRewardTypes;
    const checkedKnowledgeList = knowledge.filter((el) => el.checked).map((item) => item.id);
    const data = {
      request_type: whoIAm,
      work_types: checkedWorkTypes,
      reward_types: checkedRewardTypesWithMoney,
      reward_sum: sum,
      knowledge_areas: checkedKnowledgeList,
      title: workName,
      comment: workDescription,
      reward_currency: currency?.value,
      keyword_list: keyWords,
      approx_date: format(new Date(approxDate), 'dd/MM/yyyy'),
      hide_from_other_users: hideFromOtherUsers,
      hide_from_search: hideFromSearch,
      request_posting_id: whoIAm === WhoIAm.CUSTOMER && requestId ? requestId : '',
      supply_posting_id: whoIAm === WhoIAm.EXECUTOR && requestId ? requestId : '',
    };
    if (isAuth) {
      if (isEdit) {
        editPost(data);
      } else {
        createPost(data);
      }
    }
  }

  async function editPost(data: any) {
    const resultConf = await dispatch(editPostings({ data, id: editData.id }));
    if (editPostings.fulfilled.match(resultConf)) {
      if (isOffer && requestId) {
        dispatch(getDetailedApplication(requestId));
      } else setModal(true);
    } else {
      history.push({
        pathname: 'authorization',
        state: { background: location },
      });
    }
  }

  async function createPost(data: any) {
    const resultConf = await dispatch(createPostings(data));
    if (createPostings.fulfilled.match(resultConf)) {
      if (isOffer && requestId) {
        dispatch(getDetailedApplication(requestId));
      } else setModal(true);
    } else {
      history.push({
        pathname: 'authorization',
        state: { background: location },
      });
    }
  }

  function addArray() {
    if (!!addToArray) {
      addToArray();
    }
  }

  const handleDateChange = (date: any) => {
    setApproxDate(date);
  };

  function handleRadioList(id: string) {
    const newWorkTypes = workTypes.map((item: any) =>
      item.id === id ? { ...item, checked: true } : { ...item, checked: false },
    );
    setWorkTypes(newWorkTypes);
  }

  function handleCheckedList(id: string) {
    const newRewardTypes = rewardTypes.map((item: any) =>
      item.id === id ? { ...item, checked: !item.checked } : { ...item },
    );
    setRewardTypes(newRewardTypes);
  }

  function handleKnowledgeList(id: string) {
    const newKnowledge = knowledge.map((item: any) =>
      item.id === id ? { ...item, checked: !item.checked } : { ...item },
    );
    setKnowledge(newKnowledge);
  }

  function setCustomer() {
    setWhoIAm(WhoIAm.CUSTOMER);
    setWorkTypes(workTypesDefault);
    setRewardTypes(rewardTypestDefault);
  }

  function setExecutor() {
    setWhoIAm(WhoIAm.EXECUTOR);
    setWorkTypes(rewardTypestDefault);
    setRewardTypes(workTypesDefault);
  }

  const renderHeaderBtnsGroup = () => (
    <div className={css.rowBtnContainer}>
      <div className={css.headerBtns}>
        <button
          className={cn(css.headerBtn, { [css.headerBtnFocus]: whoIAm === WhoIAm.CUSTOMER })}
          onClick={setCustomer}
        >
          {t('customer')}
        </button>
        <button
          className={cn(css.headerBtn, { [css.headerBtnFocus]: whoIAm === WhoIAm.EXECUTOR })}
          onClick={setExecutor}
        >
          {t('executor')}
        </button>
      </div>
      {!isAuth && (
        <span className={css.authDescription}>
          {t('registrationInfo')}
          <Link
            to={{
              pathname: '/authorization',
              state: { background: location },
            }}
            className={css.authLink}
          >
            {t('registration')}
          </Link>
          .
        </span>
      )}
    </div>
  );

  const renderRadioBlock = () => (
    <div className={css.radioBlock}>
      <span className={css.subtile}>
        <RoundRowRight className={css.subtileIcon} />
        {whoIAm === WhoIAm.CUSTOMER ? t('want') : t('suggest')}
      </span>
      <div className={css.block}>
        {workTypes.map(({ checked, id, value }) => (
          <RadioButton
            checked={!!checked}
            id={String(id)}
            name={String(id)}
            label={t(value)}
            onChange={() => handleRadioList(id)}
            isColor
          />
        ))}
      </div>
    </div>
  );

  const renderChecboxBlock = () => (
    <div className={css.checkboxBlock}>
      <span className={css.subtile}>
        <RoundRowLeft className={css.subtileIcon} />
        {whoIAm === WhoIAm.EXECUTOR ? t('want') : t('suggest')}
      </span>
      <div className={css.block}>
        <div className={css.checkWrapper}>
          <div className={css.checkBlock}>
            {rewardTypes.map(({ checked, id, value }) => (
              <Checkbox
                checked={!!checked}
                id={String(id)}
                name={String(id)}
                label={t(value)}
                onChange={() => handleCheckedList(id)}
              />
            ))}
          </div>

          <div className={css.sumBlock}>
            <Checkbox
              checked={sumCheck}
              id={String('id')}
              name={String('id')}
              label={t('pay')}
              onChange={() => setSumCheck(!sumCheck)}
            />
            <div className={css.inputWrapper}>
              <input
                type="text"
                className={css.sumInput}
                value={sum}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSum(e.target.value)}
              />
              <Select
                defaultValue={currencyOptions[0]}
                classNamePrefix="CustomSelect"
                value={currency}
                options={currencyOptions}
                onChange={(option: any) => setCurrency(option)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWorkName = () => (
    <div className={css.blockWrapper}>
      <span className={css.subtile}>
        <Pencil className={css.subtileIcon} />
        {t('workName')}
      </span>
      <textarea
        placeholder={t('addWorkName')}
        className={css.textarea}
        onChange={(e) => setWorkName(e.target.value)}
        value={workName}
      />
    </div>
  );

  const renderWorkDescription = () => (
    <div className={css.blockWrapper}>
      <span className={css.subtile}>
        <Note className={css.subtileIcon} />
        {t('workDescription')}
      </span>
      <textarea
        placeholder={t('addDescription')}
        className={css.textareaHight}
        onChange={(e) => setWorkDescription(e.target.value)}
        value={workDescription}
      />
    </div>
  );

  const renderKeyWords = () => (
    <div className={css.blockWrapper}>
      <span className={css.subtile}>
        <KeyWord className={css.subtileIcon} />
        {t('keyWords')}
      </span>
      <textarea
        className={css.textareaKeyWords}
        onChange={(e) => setKeyWords(e.target.value)}
        value={keyWords}
      />
      <span className={css.keyWordsInfo}>
        {t('keyWordsExpl')}
        <b>{t('keyWordsExpl_2')}</b>
      </span>
    </div>
  );

  const renderKnowledge = () => (
    <div className={css.blockWrapperKnowledge}>
      <span className={css.subtile}>
        <Stat className={css.subtileIcon} />
        {t('knowledge')}
      </span>
      <div className={css.knowledgeBlock}>
        {knowledge.map(({ checked, id, value }) => (
          <Checkbox
            className={css.knowledgeItem}
            checked={!!checked}
            id={String(id)}
            name={String(id)}
            label={value}
            onChange={() => handleKnowledgeList(id)}
            isColor
          />
        ))}
      </div>
    </div>
  );

  const renderDate = () => (
    <div className={css.blockWrapper}>
      <span className={css.subtile}>{t('periodOfExecution')}</span>
      <DatePicker value={approxDate} onChange={handleDateChange} />
    </div>
  );

  const renderModal = () => (
    <div className={css.modalWrapper}>
      <div className={css.modalContaier}>
        <NoteModal className={css.noteIcon} />
        <span className={css.subtitle}>{t('confirmTitle')}</span>
        <span className={css.modalInfo}>{t('confirmInfo')}</span>
        <Link to={'/community'}>
          <Button>{t('toPostings')}</Button>
        </Link>
        <Link to={'/'}>
          <Button className={css.btnBorder}>{t('toMain')}</Button>
        </Link>
      </div>
      <div className={css.overlay} />
    </div>
  );

  return (
    <>
      {renderHeaderBtnsGroup()}
      <div className={css.container}>
        <div className={css.rowContainer}>
          {renderRadioBlock()}
          {renderChecboxBlock()}
        </div>
        <div className={css.workName}>{renderWorkName()}</div>
        {renderWorkDescription()}
        <div className={css.bottomBlock}>
          <div className={css.rowContainer}>
            {renderKeyWords()}
            {renderKnowledge()}
            {renderDate()}
          </div>
        </div>

        <div className={css.privateCheckWrapper}>
          <Checkbox
            checked={hideFromOtherUsers}
            id="hideFromOtherUsers"
            name="hideFromOtherUsers"
            label={t('hideFromOtherUsers')}
            onChange={() => setHideFromOtherUsers(!hideFromOtherUsers)}
          />
          <Checkbox
            checked={hideFromSearch}
            id="hideFromSearch"
            name="hideFromSearch"
            label={t('hideFromSearch')}
            onChange={() => setHideFromSearch(!hideFromSearch)}
          />
        </div>
      </div>
      <div className={css.btnWrapper}>
        <div className={css.btnBlock}>
          {!isEdit && (
            <>
              <button className={css.outlineBtn} onClick={addArray}>
                {t('addApplication')}
              </button>

              <Button onClick={submitForm}>{isAuth ? t('publish') : t('regAndPublish')}</Button>
            </>
          )}

          {isEdit && <Button onClick={submitForm}>{t('edit')}</Button>}
        </div>
        {!isAuth && <span className={css.info}>{t('info')}</span>}
        {modal && renderModal()}
      </div>
    </>
  );
};
