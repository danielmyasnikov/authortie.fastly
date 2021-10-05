// todo: слишком большой компонент, разбить на несколько
import React, { useState, useEffect, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { getIsAuth } from 'store/auth/selectors';
import { authSlice } from 'store/auth/slice';
import { Checkbox } from 'components/common/checkbox';
import { DatePicker } from 'components/common/datePicker';
import { Button } from 'components/common/button';
import cn from 'classnames';
import format from 'date-fns/format';
import { createPostings, editPostings } from 'store/request/actions';
import { getDetailedApplication } from 'store/detailedApplication/actions';
import { KeyWords } from 'components/common/keywords';
import { createPost as createPostSlice } from 'store/request/slice';
import NoteModal from 'assets/note.svg';
import Pencil from 'assets/edit.svg';
import Note from 'assets/noteDescription.svg';
import KeyWord from 'assets/keyWord.svg';
import Stat from 'assets/stat.svg';
import Close from 'assets/close.svg';
import Delete from 'assets/delete.svg';

import { AppDispatch } from 'store/types';
import { RadioTypes } from './RadioTypes';
import { CheckboxTypes } from './CheckboxTypes';

import {
  knowledgeDefault,
  rewardTypestDefault,
  currencyOptions,
  workTypesDefaultAllList,
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
  index?: number;
  isLastCard?: boolean;
  removeItem?: (index: number) => void;
  getErrorIndex?: (index: number) => void;
  createPostItems?: ({ data, index }: { data: any; index: number }) => void;
  createPostsApp?: () => void;
  pushValidation?: boolean;
  setPushvalidation?: (val: boolean) => void;
  setErrorIndex?: (value: number[]) => void;
  setError?: (val: string) => void;
  error?: string;
  isAlone?: boolean;
}

export enum WhoIAm {
  CUSTOMER = 'demand', // спрос(я заказчик)
  EXECUTOR = 'supply', // предложение (я исполнитель)
}

export const ApplicationForm: React.FC<Props> = ({
  isEdit,
  isOffer,
  requestId,
  addToArray,
  editData,
  index,
  isLastCard,
  removeItem,
  createPostItems,
  createPostsApp,
  pushValidation,
  setPushvalidation,
  getErrorIndex,
  setErrorIndex,
  setError,
  isAlone,
}) => {
  const { t } = useTranslation('application');
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  const location = useLocation();

  const [whoIAm, setWhoIAm] = useState<WhoIAm>(WhoIAm.CUSTOMER);

  const [approxDate, setApproxDate] = useState<Date | string | null>(null);
  const [workTypes, setWorkTypes] = useState(workTypesDefaultAllList);
  const [rewardTypes, setRewardTypes] = useState(rewardTypestDefault);
  const [knowledge, setKnowledge] = useState(knowledgeDefault);

  const [sumCheck, setSumCheck] = useState(false);
  const [sum, setSum] = useState<string>();
  const [currency, setCurrency] = useState<Option>(currencyOptions[0]);

  const [workName, setWorkName] = useState('');
  const [workDescription, setWorkDescription] = useState('');
  const [keyWords, setKeyWords] = useState<string[]>([]);

  const [hideFromOtherUsers, setHideFromOtherUsers] = useState(false);
  const [hideFromSearch, setHideFromSearch] = useState(false);

  const [modal, setModal] = useState<boolean>(false);

  const [moreList, setMoreList] = useState(false);

  useEffect(() => {
    if (pushValidation) {
      validation();
    } else unsetValid();
  }, [pushValidation]);

  // состояние для валидации
  const [valid, setValid] = useState({
    radioBlock: '',
    checboxBlock: '',
    workName: '',
    workDescription: '',
    keyWords: '',
    knowledge: '',
    approxDate: '',
  });

  useEffect(() => {
    if (!!editData && isEdit) {
      const editKnowledge = knowledgeDefault.map((item) => ({
        ...item,
        checked:
          Array.isArray(editData.knowledge_area_list) &&
          editData.knowledge_area_list.includes(item.id),
      }));

      const editWorkTypes = workTypesDefaultAllList.map((item: any) => {
        const newList = item.list.map((itemList: any) => ({
          ...itemList,
          checked:
            Array.isArray(editData.work_type_list) && editData.work_type_list.includes(item.id),
        }));
        return { ...item, list: newList };
      });

      const editRewardTypes = rewardTypestDefault.map((item: any) => {
        const newList = item.list.map((itemList: any) => ({
          ...itemList,
          checked:
            Array.isArray(editData.reward_type_list) && editData.reward_type_list.includes(item.id),
        }));
        return { ...item, list: newList };
      });

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

  function unsetValid() {
    setValid({
      radioBlock: '',
      checboxBlock: '',
      workName: '',
      workDescription: '',
      keyWords: '',
      knowledge: '',
      approxDate: '',
    });
    // @ts-ignore
    setPushvalidation(false);
    // @ts-ignore
    setErrorIndex([]);
    // @ts-ignore
    setError('');
  }

  function validation() {
    let validValue = valid;
    if (!workName.length) {
      validValue = { ...validValue, workName: 'Поле обязательно для заполнения' };
    }
    if (workName.length > 455) {
      validValue = { ...validValue, workName: 'Название не должно превышать 455 символов' };
    }
    if (!workDescription.length) {
      validValue = { ...validValue, workDescription: 'Поле обязательно для заполнения' };
    }
    if (workDescription.length > 2500) {
      validValue = { ...validValue, workDescription: 'Описание не должно превышать 455 символов' };
    }
    const vaildRadioBlock = workTypes
      .map(({ list }) => list.map((itemList) => itemList))
      .flat()
      .find((item) => item.checked);
    if (!vaildRadioBlock) {
      validValue = { ...validValue, radioBlock: 'Поле обязательно для заполнения' };
    }
    const vaildChecboxBlock = rewardTypes
      .map(({ list }) => list.map((itemList) => itemList))
      .flat()
      .filter((item) => item.checked);
    if (!vaildChecboxBlock.length && !sumCheck) {
      validValue = { ...validValue, checboxBlock: 'Поле обязательно для заполнения' };
    }

    if (vaildChecboxBlock.length + Number(sumCheck) > 3) {
      validValue = { ...validValue, checboxBlock: 'Выберете не более 3 пунктов' };
    }

    if (sumCheck && !sum) {
      validValue = {
        ...validValue,
        checboxBlock: 'При выборое пункта "Оплатить деньгам" необходимо ввести сумму',
      };
    }

    if (!keyWords.length) {
      validValue = { ...validValue, keyWords: 'Поле обязательно для заполнения' };
    }
    const vaildKnowledge = knowledge.filter((item) => item.checked);
    if (!vaildKnowledge.length) {
      validValue = { ...validValue, knowledge: 'Поле обязательно для заполнения' };
    }
    if (vaildKnowledge.length > 3) {
      validValue = { ...validValue, knowledge: 'Выберете не более 3 пунктов' };
    }

    if (!keyWords.length) {
      validValue = { ...validValue, keyWords: 'Поле обязательно для заполнения' };
    }

    if (!approxDate) {
      validValue = { ...validValue, approxDate: 'Поле обязательно для заполнения' };
    }

    setValid(validValue);
    if (
      !validValue.radioBlock &&
      !validValue.checboxBlock &&
      !validValue.workName &&
      !validValue.workDescription &&
      !validValue.keyWords &&
      !validValue.knowledge &&
      !validValue.approxDate
    ) {
      return true;
    }
  }

  useEffect(() => {
    const checkedWorkTypes = workTypes
      .map(({ list }) => list.map((itemList) => itemList))
      .flat()
      .filter((el) => el.checked)
      .map((item) => item.id);
    const checkedRewardTypes = rewardTypes
      .map(({ list }) => list.map((itemList) => itemList))
      .flat()
      .filter((el) => el.checked)
      .map((item) => item.id);
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
      approx_date: !!approxDate && format(new Date(approxDate), 'dd/MM/yyyy'),
      hide_from_other_users: hideFromOtherUsers,
      hide_from_search: hideFromSearch,
      request_posting_id: whoIAm !== WhoIAm.CUSTOMER && requestId ? requestId : '',
      supply_posting_id: whoIAm !== WhoIAm.EXECUTOR && requestId ? requestId : '',
    };
    // @ts-ignore
    createPostItems({ data, index });
  }, [
    whoIAm,
    approxDate,
    workTypes,
    rewardTypes,
    knowledge,
    sumCheck,
    sum,
    currency,
    workName,
    workDescription,
    keyWords,
    hideFromOtherUsers,
    hideFromSearch,
  ]);

  async function submitForm() {
    validation();
    const checkedWorkTypes = workTypes
      .map(({ list }) => list.map((itemList) => itemList))
      .flat()
      .filter((el) => el.checked)
      .map((item) => item.id);
    const checkedRewardTypes = rewardTypes
      .map(({ list }) => list.map((itemList) => itemList))
      .flat()
      .filter((el) => el.checked)
      .map((item) => item.id);
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
      approx_date: !!approxDate && format(new Date(approxDate), 'dd/MM/yyyy'),
      hide_from_other_users: hideFromOtherUsers,
      hide_from_search: hideFromSearch,
      request_posting_id: whoIAm !== WhoIAm.CUSTOMER && requestId ? requestId : '',
      supply_posting_id: whoIAm !== WhoIAm.EXECUTOR && requestId ? requestId : '',
    };
    // @ts-ignore
    setPushvalidation(true);
    if (!validation()) {
      // @ts-ignore
      getErrorIndex(index);
    }
    if (isAuth) {
      if (validation()) {
        if (isEdit) {
          editPost(data);
        }
        if (createPostsApp) {
          createPostsApp();
        } else {
          createPost(data);
        }
      }
    } else {
      dispatch(authSlice.actions.setRegistrationTab(true));
      dispatch(createPostSlice.actions.getSubmitData(true));
      history.push({
        pathname: '/authorization',
        state: { background: location },
      });
    }
  }

  async function editPost(data: any) {
    const resultConf = await dispatch(editPostings({ data, id: editData.id }));
    if (editPostings.fulfilled.match(resultConf)) {
      if (isOffer && requestId) {
        dispatch(getDetailedApplication(requestId));
      } else setModal(true);
    }
  }

  async function createPost(data: any) {
    const resultConf = await dispatch(createPostings(data));
    if (createPostings.fulfilled.match(resultConf)) {
      if (isOffer && requestId) {
        dispatch(getDetailedApplication(requestId));
      } else setModal(true);
    }
  }

  function addArray() {
    if (addToArray) {
      addToArray();
    }
  }

  const handleDateChange = (date: any) => {
    unsetValid();
    setApproxDate(date);
  };

  function handleRadioList(id: string) {
    unsetValid();

    const newWorkTypes = workTypes.map((item: any) => {
      const newList = item.list.map((itemList: any) =>
        itemList.id === id ? { ...itemList, checked: true } : { ...itemList, checked: false },
      );
      return { ...item, list: newList };
    });
    setWorkTypes(newWorkTypes);
  }

  function handleCheckedList(id: string) {
    unsetValid();
    const newRewardTypes = rewardTypes.map((item: any) => {
      const newList = item.list.map((itemList: any) =>
        itemList.id === id ? { ...itemList, checked: !itemList.checked } : { ...itemList },
      );
      return { ...item, list: newList };
    });

    setRewardTypes(newRewardTypes);
  }

  function handleKnowledgeList(id: string) {
    unsetValid();
    const newKnowledge = knowledge.map((item: any) =>
      item.id === id ? { ...item, checked: !item.checked } : { ...item },
    );
    setKnowledge(newKnowledge);
  }

  function setCustomer() {
    setWhoIAm(WhoIAm.CUSTOMER);
    setWorkTypes(workTypesDefaultAllList);
    setRewardTypes(rewardTypestDefault);
  }

  function setExecutor() {
    setWhoIAm(WhoIAm.EXECUTOR);
    setWorkTypes(rewardTypestDefault);
    setRewardTypes(workTypesDefaultAllList);
  }

  function handleSum(e: React.ChangeEvent<HTMLInputElement>) {
    unsetValid();
    const valueNum = e.target.value.replace(/[^0-9|,|.]/, '');
    setSum(valueNum);
    if (valueNum) {
      setSumCheck(true);
    }
    if (!e.target.value) {
      setSumCheck(false);
    }
  }

  function handleWorkName(e: any) {
    unsetValid();
    setWorkName(e.target.value);
  }
  function handleWorkDescription(e: any) {
    unsetValid();
    setWorkDescription(e.target.value);
  }
  function handleKeyWords(value: string[]) {
    unsetValid();
    setKeyWords(value);
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
            onClick={() => dispatch(authSlice.actions.setRegistrationTab(true))}
          >
            {t('registration')}
          </Link>
          .
        </span>
      )}
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
        className={cn(css.textarea, { [css.errorWrapper]: !!valid.workName })}
        onChange={handleWorkName}
        value={workName}
      />
      {!!valid.workName && <span className={css.error}>{valid.workName}</span>}
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
        className={cn(css.textareaHight, { [css.errorWrapper]: !!valid.workDescription })}
        onChange={handleWorkDescription}
        value={workDescription}
      />
      {!!valid.workDescription && <span className={css.error}>{valid.workDescription}</span>}
    </div>
  );

  const renderKeyWords = () => (
    <div className={css.blockWrapper}>
      <span className={css.subtile}>
        <KeyWord className={css.subtileIcon} />
        {t('keyWords')}
      </span>
      {/* <textarea
        className={cn(css.textareaKeyWords, { [css.errorWrapper]: !!valid.keyWords })}
        onChange={handleKeyWords}
        value={keyWords}
      /> */}
      <KeyWords onChange={handleKeyWords} />
      <span className={css.keyWordsInfo}>
        {t('keyWordsExpl')}
        <b>{t('keyWordsExpl_2')}</b>
      </span>
      {!!valid.keyWords && <span className={css.error}>{valid.keyWords}</span>}
    </div>
  );

  const renderKnowledge = () => (
    <div className={css.blockWrapperKnowledge}>
      <span className={css.subtile}>
        <Stat className={css.subtileIcon} />
        {t('knowledge')}
      </span>
      <div className={cn(css.knowledgeBlock, { [css.errorWrapper]: !!valid.knowledge })}>
        {knowledge.map(({ checked, id, value }) => (
          <Fragment key={id + index}>
            <Checkbox
              className={css.knowledgeItem}
              checked={!!checked}
              id={`${String(id)}_${index}`}
              name={`${String(id)}_${index}`}
              label={value}
              onChange={() => handleKnowledgeList(id)}
              isColor
            />
          </Fragment>
        ))}
      </div>
      {!!valid.knowledge && <span className={css.error}>{valid.knowledge}</span>}
    </div>
  );

  const renderDate = () => (
    <div className={css.blockDeadLine}>
      <span className={css.subtile}>{t('periodOfExecution')}</span>
      <div className={cn({ [css.errorWrapper]: !!valid.approxDate })}>
        <DatePicker value={approxDate} onChange={handleDateChange} />
      </div>
      {!!valid.approxDate && <span className={css.error}>{valid.approxDate}</span>}
    </div>
  );

  const renderModal = () => (
    <div className={css.modalWrapper}>
      <div className={css.modalContaier}>
        <Close className={css.exit} onClick={() => setModal(false)} />
        <NoteModal className={css.noteIcon} />
        <span className={css.subtitle}>{t('confirmTitle')}</span>
        <span className={css.modalInfo}>{t('confirmInfo')}</span>
        <Link to="/community">
          <Button>{t('toPostings')}</Button>
        </Link>
        <Link to="/">
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
          <RadioTypes
            whoIAm={whoIAm}
            valid={valid}
            moreList={moreList}
            workTypes={workTypes}
            index={index}
            handleRadioList={handleRadioList}
            setMoreList={setMoreList}
          />
          <CheckboxTypes
            whoIAm={whoIAm}
            valid={valid}
            moreList={moreList}
            rewardTypes={rewardTypes}
            index={index}
            handleCheckedList={handleCheckedList}
            sumCheck={sumCheck}
            setSumCheck={setSumCheck}
            currencyOptions={currencyOptions}
            currency={currency}
            setCurrency={setCurrency}
            sum={sum}
            handleSum={handleSum}
            setMoreList={setMoreList}
          />
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
            id={`hideFromOtherUsers_${index}`}
            name={`hideFromOtherUsers_${index}`}
            label={t('hideFromOtherUsers')}
            onChange={() => setHideFromOtherUsers(!hideFromOtherUsers)}
          />
          <Checkbox
            checked={hideFromSearch}
            id={`hideFromSearch_${index}`}
            name={`hideFromSearch_${index}`}
            label={t('hideFromSearch')}
            onChange={() => setHideFromSearch(!hideFromSearch)}
          />
          {index !== undefined && !!removeItem && !isAlone && (
            <div className={css.delete} onClick={() => removeItem(index)}>
              <Delete className={css.deleteIcon} />
              Удалить заявку
            </div>
          )}
        </div>
      </div>
      <div className={cn(css.btnWrapper, { [css.bottomStep]: !isLastCard })}>
        <div className={css.btnBlock}>
          {!isEdit && (
            <>
              {isLastCard && (
                <>
                  <Button className={css.outlineBtn} onClick={addArray}>
                    {t('addApplication')}
                  </Button>
                  <Button className={css.btn} onClick={submitForm}>
                    {isAuth ? t('publish') : t('regAndPublish')}
                  </Button>
                </>
              )}
            </>
          )}

          {isEdit && <Button onClick={submitForm}>{t('edit')}</Button>}
        </div>
        {!isAuth && isLastCard && <span className={css.info}>{t('info')}</span>}
        {modal && renderModal()}
      </div>
    </>
  );
};
