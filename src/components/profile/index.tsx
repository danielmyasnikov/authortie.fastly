import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Footer } from 'components/footer';
import { STATUS_OPTIONS, STUDENT_OPTIONS, GRADE_OPTIONS, COUNTRIES } from './constansts';
import { Button } from 'components/common/button';
import { setProfile } from 'store/profile/actions';
import { Textarea } from 'components/common/textarea';
import Select from 'react-select';
import Camera from 'assets/camera.svg';
import IDColor from 'assets/IDColor.png';
import Pencil from 'assets/pencil.svg';
import styles from './styles.module.less';

export const Profile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [avatarURL, setAvatarURL] = useState<string>('');
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [middleName, setMiddleName] = useState<string>('');
  const [affiliation, setAffiliation] = useState<string>('');
  const [status, setStatus] = useState<string | undefined>('scientist');
  const [grade, setGrade] = useState<string | undefined>('');
  const [about, setAbout] = useState<string>('');
  const [country, setCountry] = useState<string | undefined>('');
  const [linkArray, setLinkArray] = useState<{ url: string; id: number }[]>([
    { url: '', id: 1 },
    { url: '', id: 2 },
  ]);
  const [privateAnc, setPrivateAnc] = useState(true);
  const [privateAff, setPrivateAff] = useState(true);
  const [notificationsEmail, setNotificationsEmail] = useState(true);
  const [notificationsBrow, setNotificationsBrow] = useState(true);

  const IDURL =
    'https://authortie-app.herokuapp.com/auth/orcid?front_url=https://authorties-sky.herokuapp.com/';

  const getDataUrlFromFile = (file: File | Blob): Promise<string> =>
    new Promise((resolve) => {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        resolve(reader.result as string);
      });

      reader.readAsDataURL(file);
    });

  function handleFileInputChanged(event: React.FormEvent<HTMLInputElement>) {
    // @ts-ignore
    const [file] = event.target.files || [];

    setAvatar(file);

    getDataUrlFromFile(file).then((fileUrl) => setAvatarURL(`${fileUrl}`));
  }

  const handleUploadAvatarBtnClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  function handleLinkChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const newLinkValue = linkArray.map((item) =>
      String(item.id) === name ? { ...item, url: value } : item,
    );
    setLinkArray(newLinkValue);
  }

  function submitProfile() {
    const data = {
      name,
      lastName,
      middleName,
      affiliation,
      avatar,
      about,
      country,
      privateAnc,
      privateAff,
      notificationsEmail,
      notificationsBrow,
      status,
      grade,
    };
    dispatch(setProfile(data));
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <span className={styles.title}>Личная информация</span>

        <div className={styles.profileWrapper}>
          {avatarURL ? (
            <img className={styles.img} src={avatarURL} alt="" />
          ) : (
            <Camera className={styles.defaultPhoto} />
          )}

          <div className={styles.pencil} onClick={handleUploadAvatarBtnClick}>
            <form>
              <input
                hidden
                onChange={handleFileInputChanged}
                ref={fileInputRef}
                type="file"
                id="avatar"
                accept=".png, .jpg, .jpeg"
              />
            </form>

            <Pencil />
          </div>
        </div>
        <a href={IDURL} className={styles.bigIcon}>
          <img src={IDColor} alt="" />
        </a>
        <span className={styles.subtitle}>Имя</span>
        <input
          value={name}
          name="name"
          id="name"
          className={styles.input}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <span className={styles.subtitle}>Фамилия</span>
        <input
          value={lastName}
          name="last_name"
          id="last_name"
          className={styles.input}
          type="text"
          onChange={(e) => setLastName(e.target.value)}
        />
        <span className={styles.subtitle}>Отчество</span>
        <input
          value={middleName}
          name="middle_name"
          id="middle_name"
          className={styles.input}
          type="text"
          onChange={(e) => setMiddleName(e.target.value)}
        />
        <span className={styles.subtitle}>Статус</span>
        <Select
          classNamePrefix="CustomSelect"
          onChange={(option) => setStatus(option?.value)}
          className={styles.block}
          defaultValue={STATUS_OPTIONS[0]}
          options={STATUS_OPTIONS}
        />
        {(status === 'scientist' || status === 'student') && (
          <Select
            classNamePrefix="CustomSelect"
            options={status === 'student' ? STUDENT_OPTIONS : GRADE_OPTIONS}
            defaultValue={status === 'student' ? STUDENT_OPTIONS[0] : GRADE_OPTIONS[0]}
            onChange={(option) => setGrade(option?.label)}
          />
        )}

        <span className={styles.subtitle}>Аффилиация</span>
        <input
          value={affiliation}
          name="affiliation"
          id="affiliation"
          className={styles.input}
          type="text"
          onChange={(e) => setAffiliation(e.target.value)}
        />
        <span className={styles.subtitle}>О себе</span>

        <Textarea value={about} onChange={setAbout} />

        <span className={styles.subtitle}>Страна </span>

        <Select
          placeholder={'Выберите страну'}
          classNamePrefix="CustomSelect"
          options={COUNTRIES}
          onChange={(option) => setCountry(option?.label)}
        />

        <span className={styles.subtitle}>Ссылки</span>

        {linkArray.map((item) => (
          <input
            value={item.url}
            name={String(item.id)}
            id={String(item.id)}
            className={styles.inputLink}
            type="text"
            onChange={handleLinkChange}
          />
        ))}
        <button
          className={styles.btnLink}
          onClick={() => setLinkArray([...linkArray, { url: '', id: linkArray.length }])}
        >
          Добавить ссылку
        </button>
        <span className={styles.title}>Настройки</span>
        <span className={styles.subtitle}>Приватность</span>
        <div>
          <input
            className={styles.checkboxInput}
            type="checkbox"
            name="privateAnc"
            id="privateAnc"
            checked={privateAnc}
            onChange={() => setPrivateAnc(!privateAnc)}
          />
          <label htmlFor="privateAnc">Видимость анкеты в сети</label>
        </div>
        <div>
          <input
            className={styles.checkboxInput}
            type="checkbox"
            name="privateAff"
            id="privateAff"
            checked={privateAff}
            onChange={() => setPrivateAff(!privateAff)}
          />
          <label htmlFor="privateAff">Показывать аффилиацию</label>
        </div>

        <span className={styles.subtitle}>Уведомления</span>
        <div>
          <input
            className={styles.checkboxInput}
            type="checkbox"
            name="notificationsEmail"
            id="notificationsEmail"
            checked={notificationsEmail}
            onChange={() => setNotificationsEmail(!notificationsEmail)}
          />
          <label htmlFor="notificationsEmail">Уведомления по Email</label>
        </div>
        <div>
          <input
            className={styles.checkboxInput}
            type="checkbox"
            name="notificationsBrow"
            id="notificationsBrow"
            checked={notificationsBrow}
            onChange={() => setNotificationsBrow(!notificationsBrow)}
          />
          <label htmlFor="notificationsBrow">Уведомления в браузере</label>
        </div>
        <div className={styles.saveBtn}>
          <Button onClick={submitProfile}>Сохранить</Button>
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};
