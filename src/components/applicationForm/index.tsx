import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import cn from 'classnames';
import DateFnsUtils from '@date-io/date-fns';
import { Button } from 'components/common/button';
import Select from 'react-select';

import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import styles from './styles.module.less';

const CATEGORY_DEFAULT = [
  { value: 'Повысить цитируемость своих работ', checked: true },
  { value: 'Стать соавтором/соисполнителем', checked: false },
  { value: 'Найти рецензента/эксперта/эдвайзора', checked: false },
];

const knowledgeDefault = [
  { value: 'Biology/Genetics', checked: false, id: 1 },
  { value: 'Neuro/Psycho', checked: false, id: 2 },
  { value: 'Medicine/Pharma', checked: false, id: 3 },
  { value: 'Chemistry', checked: false, id: 4 },
  { value: 'Math/Computer', checked: false, id: 5 },
  { value: 'Physics/Astronomy', checked: false, id: 6 },
  { value: 'Engineering/Material', checked: false, id: 7 },
  { value: 'Earth/Environment', checked: false, id: 8 },
  { value: 'Social', checked: false, id: 9 },
  { value: 'Humanities/Arts', checked: false, id: 10 },
  { value: 'Management/Economics', checked: false, id: 11 },
];

const responsiveCheckedDefault = [
  { value: 'Стать рецензентом', checked: true },
  { value: 'Процитировать других в своей работе', checked: false },
  { value: 'Предложить соавторство', checked: false },
  { value: 'Стать эдвайзером', checked: false },
];

const materialTheme = createMuiTheme({
  overrides: {
    // @ts-ignore
    MuiPickersDay: {
      day: {
        color: '#2c80ff',
      },
      daySelected: {
        backgroundColor: '#2c80ff',
      },

      current: {
        color: 'grey',
      },
    },
  },
});

const inputDateStyle = {
  width: '300px',
  background: '#f2f7ff',
  padding: '11px 30px 9px 30px',
  margin: 0,
  borderBottom: '5px solid #e9f1ff',
  borderTopLeftRadius: '12px',
  borderTopRightRadius: '12px',
};

export const ApplicationForm = () => {
  const { t } = useTranslation('application');

  const [iWont, setIWont] = useState(true);
  const [category, setCategory] = useState(CATEGORY_DEFAULT);
  const [knowledge, setKnowledge] = useState(knowledgeDefault);
  const [responsiveKnowledge, setResponsiveKnowledge] = useState(knowledgeDefault);
  const [responsiveChecked, setResponsiveChecked] = useState(responsiveCheckedDefault);
  const [rewardType, setRewardType] = useState('responsiveHelp');
  const [demandRequest, setDemandRequest] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));

  function changeCategory(value: string) {
    const newCategory = category.map((item) =>
      value === item.value ? { ...item, checked: true } : { ...item, checked: false },
    );
    setCategory(newCategory);
  }

  function changeResponsiveChecked(value: string) {
    const newResponsiveChecked = responsiveChecked.map((item) =>
      value === item.value ? { ...item, checked: true } : { ...item, checked: false },
    );
    setResponsiveChecked(newResponsiveChecked);
  }

  const changeKnowledge = (id: number) => {
    const newKnowledge = knowledge.map((item) =>
      id === item.id ? { ...item, checked: !item.checked } : item,
    );
    setKnowledge(newKnowledge);
  };

  const changeResponsiveKnowledge = (value: string) => {
    const newResponsiveKnowledge = responsiveKnowledge.map((item) =>
      value === item.value ? { ...item, checked: !item.checked } : item,
    );
    setResponsiveKnowledge(newResponsiveKnowledge);
  };

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const renderService = () => (
    <div className={styles.serviceBlock}>
      <textarea
        placeholder="Опишите услугу, которую хотите предложить"
        className={styles.textarea}
      />
    </div>
  );

  const renderResponsiveHelp = () => (
    <div className={styles.responsiveHelpBlock}>
      <div className={styles.responsiveRadioWrapper}>
        {responsiveChecked.map(({ value, checked }) => (
          <div
            className={cn(styles.responsiveRadioInputBlock, {
              [styles.responsiveRadioInputChecked]: checked,
            })}
            key={value}
          >
            <input
              className={styles.responsiveRadioInput}
              type="radio"
              name={value}
              id={value}
              checked={checked}
              onChange={() => changeResponsiveChecked(value)}
            />
            <label htmlFor={value}>{value}</label>
          </div>
        ))}
      </div>
      <div className={styles.demandRequestTitle}>Заявка спроса</div>
      <div
        className={cn(styles.demandRequest, {
          [styles.responsiveRadioInputChecked]: demandRequest,
        })}
      >
        <input
          className={styles.responsiveRadioInput}
          type="checkbox"
          name={'value'}
          id={'demandRequest'}
          checked={demandRequest}
          onChange={() => setDemandRequest(!demandRequest)}
        />
        <label htmlFor={'demandRequest'}>
          У меня есть сохраненные работы, могу выбрать из списка
        </label>
      </div>

      <div className={styles.select}>
        <Select />
      </div>

      <div className={styles.responsiveTitle}>Заявка предложения</div>
      <div className={styles.responsiveBlock}>
        <span className={styles.subtitle}>Название работы</span>
        <textarea placeholder="Введите название" className={styles.textarea} />
      </div>

      <div className={styles.responsiveKnowledgeWrap}>
        <span className={styles.subtitle}>Категория</span>
        <div className={styles.responsiveKnowledge}>
          <div className={styles.checkboxWrapper}>
            {responsiveKnowledge.map(({ value, checked, id }) => (
              <div
                key={value + id}
                className={cn(styles.checkboxInputBlock, {
                  [styles.checkboxInputBlockCheck]: checked,
                })}
              >
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  name={value + id}
                  id={value + id}
                  checked={checked}
                  onChange={() => changeResponsiveKnowledge(value)}
                />
                <label htmlFor={value + id}>{value}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.responsiveComment}>
        <span className={styles.subtitle}>Комментарий</span>
        <textarea placeholder="Введите комментарий" className={styles.textarea} />
      </div>

      <div className={styles.responsiveDatePicker}>
        <span className={styles.subtitle}>Желаемая дата</span>
        <ThemeProvider theme={materialTheme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              InputProps={{
                disableUnderline: true,
              }}
              style={inputDateStyle}
            />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </div>
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>{t('title')}</h1>
          <span className={styles.info}>
            Обращаем ваше внимание, что для публикации заявки вам необходимо зарегистрироваться.
          </span>
        </div>

        <div className={styles.content}>
          <div className={styles.categoryWrap}>
            <div className={styles.category}>
              <span className={styles.subtitle}>Категория</span>
              <div className={styles.categoryBtnBlock}>
                <button
                  onClick={() => setIWont(!iWont)}
                  className={cn(styles.categoryBtn, { [styles.iWontFocus]: iWont })}
                >
                  Я хочу
                </button>
                <button
                  onClick={() => setIWont(!iWont)}
                  className={cn(styles.categoryBtn, { [styles.iWontFocus]: !iWont })}
                >
                  Я предлагаю
                </button>
              </div>
              <div className={styles.radioWrapper}>
                {category.map(({ value, checked }) => (
                  <div
                    className={cn(styles.radioInputBlock, { [styles.radioInputChecked]: checked })}
                    key={value}
                  >
                    <input
                      className={styles.radioInput}
                      type="radio"
                      name={value}
                      id={value}
                      checked={checked}
                      onChange={() => changeCategory(value)}
                    />
                    <label htmlFor={value}>{value}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.knowledgeWrap}>
            <span className={styles.subtitle}>Область знания</span>
            <div className={styles.knowledge}>
              <div className={styles.checkboxWrapper}>
                {knowledge.map(({ value, checked, id }) => (
                  <div
                    key={value}
                    className={cn(styles.checkboxInputBlock, {
                      [styles.checkboxInputBlockCheck]: checked,
                    })}
                  >
                    <input
                      className={styles.checkboxInput}
                      type="checkbox"
                      name={value}
                      id={value}
                      checked={checked}
                      onChange={() => changeKnowledge(id)}
                    />
                    <label htmlFor={value}>{value}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.workName}>
            <span className={styles.subtitle}>Название работы</span>
            <textarea placeholder="Введите название" className={styles.textarea} />
          </div>

          <div className={styles.keyWords}>
            <span className={styles.subtitle}>Ключевые слова</span>
            <textarea placeholder="Введите название" className={styles.textarea} />
          </div>

          <div className={styles.rewardBtnsWrap}>
            <span className={styles.subtitle}>Вознаграждение</span>
            <div className={styles.rewardBtns}>
              <button
                onClick={() => setRewardType('money')}
                className={cn(styles.rewardBtn, {
                  [styles.rewardBtnFocus]: rewardType === 'money',
                })}
              >
                Деньги
              </button>
              <button
                onClick={() => setRewardType('service')}
                className={cn(styles.rewardBtn, {
                  [styles.rewardBtnFocus]: rewardType === 'service',
                })}
              >
                Услуга
              </button>
              <button
                onClick={() => setRewardType('responsiveHelp')}
                className={cn(styles.rewardBtn, {
                  [styles.rewardBtnFocus]: rewardType === 'responsiveHelp',
                })}
              >
                Ответная Помощь
              </button>
              <button
                onClick={() => setRewardType('nothing')}
                className={cn(styles.rewardBtn, {
                  [styles.rewardBtnFocus]: rewardType === 'nothing',
                })}
              >
                Ничего
              </button>
            </div>
          </div>

          <div className={styles.datePicker}>
            <span className={styles.subtitle}>Желаемая дата</span>

            <ThemeProvider theme={materialTheme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  style={inputDateStyle}
                />
              </MuiPickersUtilsProvider>
            </ThemeProvider>
          </div>

          <div className={styles.reward}>
            {rewardType === 'service' && renderService()}
            {rewardType === 'responsiveHelp' && renderResponsiveHelp()}
          </div>
        </div>
      </div>
      <div className={styles.btnCont}>
        <Button>Зарегистрироваться и Опубликовать</Button>
      </div>
    </div>
  );
};
