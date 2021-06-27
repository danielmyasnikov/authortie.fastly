import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core';
import { Footer } from 'components/footer';
import { ThemeProvider } from '@material-ui/styles';
import cn from 'classnames';
import { AppDispatch } from 'store/types';
import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/format';
import { getIsAuth } from 'store/auth/selectors';
import { getCreatePost } from 'store/request/selectors';
import { Button } from 'components/common/button';
import Select from 'react-select';
import { getLastPostings, createPostings } from 'store/request/actions';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Note from 'assets/note.svg';
import styles from './styles.module.less';
import {
  CATEGORY_DEFAULT,
  knowledgeDefault,
  responsiveCheckedDefault,
  currencyOptions,
} from './constants';

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
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const isAuth = useSelector(getIsAuth);
  const { lastPostings } = useSelector(getCreatePost);
  const [lastPostingsOptions, setLastPostingsOptions] = useState<any>([]);
  const [iWont, setIWont] = useState(true);
  const [category, setCategory] = useState(CATEGORY_DEFAULT);
  const [knowledge, setKnowledge] = useState(knowledgeDefault);
  const [responsiveKnowledge, setResponsiveKnowledge] = useState(knowledgeDefault);
  const [responsiveChecked, setResponsiveChecked] = useState(responsiveCheckedDefault);
  const [rewardType, setRewardType] = useState('');
  const [comment, setcomment] = useState('');
  const [sum, setSum] = useState('');
  const [currency, setCurrency] = useState<string | undefined>('');
  const [title, setTitle] = useState('');
  const [serviceRewardDescription, setServiceRewardDescription] = useState('');
  const [rewardComment, setRewardComment] = useState('');
  const [rewardTitle, setRewardTitle] = useState('');
  const [keywordList, setKeywordList] = useState('');
  const [demandRequest, setDemandRequest] = useState(false);
  const [approxDate, setApproxDate] = useState(new Date(Date.now()));
  const [rewordApproxDate, setRewardApproxDate] = useState(new Date(Date.now()));
  const [modal, setModal] = useState<boolean>(false);
  const [secreted, setSecreted] = useState<boolean>(false);

  useEffect(() => {
    const newLastOptions = lastPostings.map((item: any) => ({
      value: String(item.id),
      label: item.title,
    }));
    setLastPostingsOptions(newLastOptions);
  }, [lastPostings]);

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

  const changeKnowledge = (id: string) => {
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
    setApproxDate(date);
  };

  const handleRewardDateChange = (date: any) => {
    setRewardApproxDate(date);
  };

  function checkLastPostings(value: boolean) {
    setDemandRequest(value);
    if (value) {
      dispatch(getLastPostings());
    }
  }

  function selectWork(option: { label: string; value: string }) {
    const selectPost = lastPostings.filter((item: any) => String(item.id) === option.value)[0];
    setRewardComment(selectPost.comment);
    setRewardTitle(selectPost.title);
    setRewardApproxDate(selectPost.approx_date);
    const newResponsiveKnowledge = responsiveKnowledge.map((item) => ({
      ...item,
      checked: selectPost.knowledge_area[item.id],
    }));
    setResponsiveKnowledge(newResponsiveKnowledge);
  }

  async function createPost() {
    const knowledgeArea = knowledge
      .filter((item) => item.checked)
      .map((el) => el.id)
      .join(';');

    const rewardnNowledgeArea = responsiveKnowledge
      .filter((item) => item.checked)
      .map((el) => el.id)
      .join(';');

    const workType = category
      .filter((item) => item.checked)
      .map((el) => (iWont ? el.workType : el.workTypeRevert))[0];

    const rewardWorkType = responsiveChecked
      .filter((item) => item.checked)
      .map((el) => el.workType);
    // responsiveChecked
    const postData = {
      knowledgeArea,
      title,
      approxDate: format(approxDate, 'dd/MM/yyyy'),
      workType,
      keywordList,
      rewardType,
      serviceRewardDescription,
      comment,
      sum,
      currency,
      secreted,
      // данные для обратной заяки
      rewardWorkType,
      rewardTitle,
      rewordApproxDate: format(rewordApproxDate, 'dd/MM/yyyy'),
      rewardComment,
      rewardnNowledgeArea,
    };

    if (isAuth) {
      const resultConf = await dispatch(createPostings(postData));
      if (createPostings.fulfilled.match(resultConf)) {
        setModal(true);
      }
    } else {
      history.push({
        pathname: 'authorization',
        state: { background: location },
      });
    }
  }

  function changeReward(type: string) {
    setRewardType(type);
  }

  const renderModal = () => (
    <div className={styles.modalWrapper}>
      <div className={styles.contaier}>
        <Note className={styles.noteIcon} />
        <span className={styles.subtitle}>Заявка сформирована!</span>
        <span className={styles.modalInfo}>
          Ваша заявка отправлена на модерацию. После проверки вам придет оповещение о её публикации.
        </span>
        <Link to={'/community'}>
          <Button>Перейти к заявкам</Button>
        </Link>
        <Link to={'/'}>
          <Button className={styles.btnBorder}>На главную</Button>
        </Link>
      </div>
      <div className={styles.overlay} />
    </div>
  );

  const renderMoney = () => (
    <div className={styles.moneyWrapper}>
      <input
        className={styles.input}
        type="text"
        placeholder="Введите сумму"
        onChange={(e) => setSum(e.target.value)}
      />
      <div className={styles.selectMoney}>
        <Select
          defaultValue={currencyOptions[0]}
          options={currencyOptions}
          onChange={(option) => setCurrency(option?.value)}
        />
      </div>
    </div>
  );

  const renderService = () => (
    <div className={styles.serviceBlock}>
      <textarea
        placeholder="Опишите услугу, которую хотите предложить"
        className={styles.textarea}
        onChange={(e) => setServiceRewardDescription(e.target.value)}
      />
    </div>
  );

  // рендер обратной заявки
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
          onChange={() => checkLastPostings(!demandRequest)}
        />
        <label htmlFor={'demandRequest'}>
          У меня есть сохраненные работы, могу выбрать из списка
        </label>
      </div>

      <div className={styles.select}>
        {lastPostingsOptions.length > 0 && (
          <Select
            defaultValue={lastPostingsOptions[0] && lastPostingsOptions[0].value}
            options={lastPostingsOptions}
            placeholder="Выберите работу"
            onChange={selectWork}
          />
        )}
      </div>

      <div className={styles.responsiveTitle}>Заявка предложения</div>
      <div className={styles.responsiveBlock}>
        <span className={styles.subtitle}>Название работы</span>
        <textarea
          placeholder="Введите название"
          className={styles.textarea}
          onChange={(e) => setRewardTitle(e.target.value)}
          value={rewardTitle}
        />
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
        <textarea
          placeholder="Введите комментарий"
          className={styles.textarea}
          onChange={(e) => setRewardComment(e.target.value)}
          value={rewardComment}
        />
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
              value={rewordApproxDate}
              onChange={handleRewardDateChange}
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
            Обращаем ваше внимание, что для публикации заявки вам необходимо
            <Link
              className={styles.link}
              to={{
                pathname: 'authorization',
                state: { background: location },
              }}
            >
              {` зарегистрироваться`}
            </Link>
            .
          </span>
        </div>

        <div className={styles.content}>
          <div className={styles.categoryWrap}>
            <div className={styles.category}>
              <span className={styles.subtitle}>Категория</span>
              <div className={styles.categoryBtnBlock}>
                <button
                  onClick={() => setIWont(true)}
                  className={cn(styles.categoryBtn, { [styles.iWontFocus]: iWont })}
                >
                  Я хочу
                </button>
                <button
                  onClick={() => setIWont(false)}
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
            <textarea
              placeholder="Введите название"
              className={styles.textarea}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div className={styles.keyWords}>
            <span className={styles.subtitle}>Ключевые слова</span>
            <textarea
              placeholder="Введите ключевые слова через ;"
              className={styles.textarea}
              onChange={(e) => setKeywordList(e.target.value)}
              value={keywordList}
            />
          </div>
          <div className={styles.comment}>
            <span className={styles.subtitle}>Комментарий</span>
            <textarea
              placeholder="Введите комментарий"
              className={styles.textarea}
              onChange={(e) => setcomment(e.target.value)}
              value={comment}
            />
          </div>

          <div className={styles.rewardBtnsWrap}>
            <span className={styles.subtitle}>Вознаграждение</span>
            <div className={styles.rewardBtns}>
              <button
                onClick={() => changeReward('money')}
                className={cn(styles.rewardBtn, {
                  [styles.rewardBtnFocus]: rewardType === 'money',
                })}
              >
                Деньги
              </button>
              <button
                onClick={() => changeReward('service')}
                className={cn(styles.rewardBtn, {
                  [styles.rewardBtnFocus]: rewardType === 'service',
                })}
              >
                Услуга
              </button>
              <button
                onClick={() => changeReward('return_help')}
                className={cn(styles.rewardBtn, {
                  [styles.rewardBtnFocus]: rewardType === 'return_help',
                })}
              >
                Ответная Помощь
              </button>
              <button
                onClick={() => changeReward('nothing')}
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
                  value={approxDate}
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
            {rewardType === 'return_help' && renderResponsiveHelp()}
            {rewardType === 'money' && renderMoney()}
          </div>
          <div className={styles.public}>
            <input
              className={styles.responsiveRadioInput}
              type="checkbox"
              name={'public'}
              id={'public'}
              checked={secreted}
              onChange={() => setSecreted(!secreted)}
            />
            <label htmlFor={'public'}>Публичная заявка</label>
          </div>
        </div>
      </div>
      <div className={styles.btnCont}>
        <Button onClick={createPost}>
          {isAuth ? 'Опубликовать' : 'Зарегистрироваться и Опубликовать'}
        </Button>
      </div>
      {modal && renderModal()}
      <div className={styles.foot}>
        <Footer />
      </div>
    </div>
  );
};
