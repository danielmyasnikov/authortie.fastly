import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import cn from 'classnames';
import DateFnsUtils from '@date-io/date-fns';
import { Button } from 'components/common/button';

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
const materialTheme = createMuiTheme({
  overrides: {
    // @ts-ignore
    MuiPickersDay: {
      day: {
        color: 'blue',
      },
      daySelected: {
        backgroundColor: '#E5E5E5',
      },
      dayDisabled: {
        color: 'red',
      },
      current: {
        color: 'green',
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: 'pink',
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
}

export const ApplicationForm = () => {
  const { t } = useTranslation('application');

  const [iWont, setIWont] = useState(true);
  const [category, setCategory] = useState(CATEGORY_DEFAULT);
  const [knowledge, setKnowledge] = useState(knowledgeDefault);

  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));

  function changeCategory(value: string) {
    const newCategory = category.map((item) =>
      value === item.value ? { ...item, checked: true } : { ...item, checked: false },
    );
    setCategory(newCategory);
  }

  const  changeKnowledge = (id: number) => {
    // console.log(id)
    const newKnowledge = knowledge.map((item) =>
      id === item.id ? { ...item, checked: !item.checked } : item,
    );
    console.log(newKnowledge)
    setKnowledge(newKnowledge);
  }

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

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
          <div className={styles.category}>
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

          <div className={styles.workName}>
            <textarea placeholder="Введите название" className={styles.textarea} />
          </div>

          <div className={styles.keyWords}>
            <textarea placeholder="Введите название" className={styles.textarea} />
          </div>

          <div className={styles.reward}>
            <button className={styles.rewardBtn}>Деньги</button>
            <button className={styles.rewardBtn}>Услуга</button>
            <button className={styles.rewardBtn}>Ответная Помощь</button>
            <button className={styles.rewardBtn}>Ничего</button>
          </div>

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
      <div className={styles.btnCont}>
        <Button>Зарегистрироваться и Опубликовать</Button>
      </div>
    </div>
  );
};
