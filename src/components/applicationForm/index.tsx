import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Select from 'react-select';
import { getIsAuth } from 'store/auth/selectors';
import { RadioButton } from 'components/common/radioBtn';
import { Checkbox } from 'components/common/checkbox';
import { DatePicker } from 'components/common/datePicker';
import { Button } from 'components/common/button';
import cn from 'classnames';

import RoundRowRight from 'assets/roundRowRight.svg';
import RoundRowLeft from 'assets/roundRowLeft.svg';
import Pencil from 'assets/edit.svg';
import Note from 'assets/noteDescription.svg';
import KeyWord from 'assets/keyWord.svg';
import Stat from 'assets/stat.svg';

import { AppDispatch } from 'store/types';

import {
  radioItemsListDefault,
  knowledgeDefault,
  checkboxListDefault,
  currencyOptions,
} from './constants';
import css from './css.module.less';

interface Props {
  isOffer?: boolean;
  requestId?: string;
}

enum WhoIAm {
  CUSTOMER = 'customer',
  EXECUTOR = 'executor',
}

export const ApplicationForm: React.FC<Props> = ({ isOffer, requestId }) => {
  const { t } = useTranslation('application');
  const dispatch: AppDispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  const location = useLocation();

  const [whoIAm, setWhoIAm] = useState<WhoIAm>(WhoIAm.CUSTOMER);

  const [approxDate, setApproxDate] = useState(new Date(Date.now()));
  const [radioItemsList, setRadioItemsList] = useState(radioItemsListDefault);
  const [checkboxList, setCheckboxList] = useState(checkboxListDefault);
  const [knowledge, setKnowledge] = useState(knowledgeDefault);

  const [sumCheck, setSumCheck] = useState(false);
  const [sum, setSum] = useState();
  const [currency, setCurrency] = useState(currencyOptions);

  const [workName, setWorkName] = useState('');
  const [workDescription, setWorkDescription] = useState('');
  const [keyWords, setKeyWords] = useState('');

  const handleDateChange = (date: any) => {
    setApproxDate(date);
  };

  function handleRadioList(id: string) {
    const newRadioItemsList = radioItemsList.map((item: any) =>
      item.id === id ? { ...item, checked: true } : { ...item, checked: false },
    );
    setRadioItemsList(newRadioItemsList);
  }

  function handleCheckedList(id: string) {
    const newCheckedItemsList = checkboxList.map((item: any) =>
      item.id === id ? { ...item, checked: !item.checked } : { ...item },
    );
    setCheckboxList(newCheckedItemsList);
  }

  function handleKnowledgeList(id: string) {
    const newKnowledge = knowledge.map((item: any) =>
      item.id === id ? { ...item, checked: !item.checked } : { ...item },
    );
    setKnowledge(newKnowledge);
  }

  const renderHeaderBtnsGroup = () => (
    <div className={css.rowBtnContainer}>
      <div className={css.headerBtns}>
        <button
          className={cn(css.headerBtn, { [css.headerBtnFocus]: whoIAm === WhoIAm.CUSTOMER })}
          onClick={() => setWhoIAm(WhoIAm.CUSTOMER)}
        >
          Я заказчик
        </button>
        <button
          className={cn(css.headerBtn, { [css.headerBtnFocus]: whoIAm === WhoIAm.EXECUTOR })}
          onClick={() => setWhoIAm(WhoIAm.EXECUTOR)}
        >
          Я исполнитель
        </button>
      </div>
      <span className={css.authDescription}>
        Для публикации заявки вам необходимо{' '}
        <Link
          to={{
            pathname: '/authorization',
            state: { background: location },
          }}
          className={css.authLink}
        >
          зарегистрироваться
        </Link>
        .
      </span>
    </div>
  );

  const renderRadioBlock = () => (
    <div className={css.radioBlock}>
      <span className={css.subtile}>
        <RoundRowRight className={css.subtileIcon} />
        {whoIAm === WhoIAm.CUSTOMER ? 'Я хочу' : 'Я предлагаю'}
      </span>
      <div className={css.block}>
        {radioItemsList.map(({ checked, id, value }) => (
          <RadioButton
            checked={!!checked}
            id={String(id)}
            name={String(id)}
            label={value}
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
        {whoIAm === WhoIAm.EXECUTOR ? 'Я хочу' : 'Я предлагаю'}
      </span>
      <div className={css.block}>
        <div className={css.checkWrapper}>
          <div className={css.checkBlock}>
            {checkboxList.map(({ checked, id, value }) => (
              <Checkbox
                checked={!!checked}
                id={String(id)}
                name={String(id)}
                label={value}
                onChange={() => handleCheckedList(id)}
                // isColor
              />
            ))}
          </div>

          <div className={css.sumBlock}>
            <Checkbox
              checked={sumCheck}
              id={String('id')}
              name={String('id')}
              label={'Оплатить деньгами'}
              onChange={() => setSumCheck(!sumCheck)}
              isColor
            />
            <div className={css.inputWrapper}>
              <input
                type="text"
                className={css.sumInput}
                value={sum}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSum(e.target.value)}
              />
              <Select
                classNamePrefix="CustomSelect"
                defaultValue={currency[0]}
                options={currency}
                onChange={(option) => setCurrency(option)}
                // selected={}
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
        Название работы
      </span>
      <textarea
        placeholder={'Введите название'}
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
        Описание работы
      </span>
      <textarea
        placeholder={'Введите описание'}
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
        Ключевые слова
      </span>
      <textarea
        className={css.textareaKeyWords}
        onChange={(e) => setKeyWords(e.target.value)}
        value={keyWords}
      />
      <span className={css.keyWordsInfo}>
        Пример: <b>Первый ключ; Второй ключ;</b>
      </span>
    </div>
  );

  const renderKnowledge = () => (
    <div className={css.blockWrapperKnowledge}>
      <span className={css.subtile}>
        <Stat className={css.subtileIcon} />
        Область знаний
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
      <span className={css.subtile}>Срок исполнения</span>
      <DatePicker value={approxDate} onChange={handleDateChange} />
    </div>
  );

  return (
    <div className={css.wrapper}>
      <div className={css.content}>
        <h1 className={css.title}>Создание заявки</h1>

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
        </div>
        <div className={css.btnWrapper}>
          <div className={css.btnBlock}>
            <button className={css.outlineBtn}>+ добавить заявку</button>
            <Button>{isAuth  ? "Опубликовать" : "Зарегистрироваться и Опубликовать"}</Button>
          </div>
          <span className={css.info}>
            Вам не придется заново заполнять форму, после регистрации ваша заявка будет отправлена
            на публикацию.
          </span>
        </div>
      </div>
    </div>
  );
};
