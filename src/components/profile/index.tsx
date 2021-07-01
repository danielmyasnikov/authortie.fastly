import React, { useRef, useState } from 'react';
import { Footer } from 'components/footer';
import { STATUS_OPTIONS, STUDENT_OPTIONS, GRADE_OPTIONS, COUNTRIES } from './constansts';
import { Button } from 'components/common/button';
import { Textarea } from 'components/common/textarea';
import Select from 'react-select';
import Camera from 'assets/camera.svg';
import Pencil from 'assets/pencil.svg';
import styles from './styles.module.less';

export const Profile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarURL, setAvatarURL] = useState<string>('');
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState<string>('');
  const [affiliation, setAffiliation] = useState<string>('');
  const [status, setStatus] = useState<string | undefined>('scientist');
  const [student, setStudent] = useState<string | undefined>('');
  const [grade, setGrade] = useState<string | undefined>('');
  const [about, setAbout] = useState<string>('');
  const [country, setCountry] = useState<string | undefined>('');
  const [linkArray, setLinkArray] = useState([1, 2]);

  const [privateAnc, setPrivateAnc] = useState(true);
  const [privateAff, setPrivateAff] = useState(true);
  const [notificationsEmail, setNotificationsEmail] = useState(true);
  const [notificationsBrow, setNotificationsBrow] = useState(true);

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

  function submitProfile() {
    const data = {
      affiliation,
      avatar,
      about,
      country,
      privateAnc,
      privateAff,
      notificationsEmail,
      notificationsBrow,
    };
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

        <span className={styles.subtitle}>Имя</span>
        <input
          value={name}
          name="name"
          id="name"
          className={styles.input}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <span className={styles.subtitle}>Статус</span>
        <Select
          onChange={(option) => setStatus(option?.value)}
          className={styles.block}
          defaultValue={STATUS_OPTIONS[0]}
          options={STATUS_OPTIONS}
        />
        {(status === 'scientist' || status === 'student') && (
          <Select
            options={status === 'student' ? STUDENT_OPTIONS : GRADE_OPTIONS}
            defaultValue={status === 'student' ? STUDENT_OPTIONS[0] : GRADE_OPTIONS[0]}
            onChange={(option) =>
              status === 'student' ? setStudent(option?.label) : setGrade(option?.label)
            }
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
        <Select options={COUNTRIES} onChange={(option) => setCountry(option?.label)} />

        <span className={styles.subtitle}>Ссылки</span>

        {linkArray.map((item) => (
          <input
            //   value={}
            name={`link${item}`}
            id={`link${item}`}
            className={styles.inputLink}
            type="text"
            //   onChange={handleChange}
          />
        ))}
        <button
          className={styles.btnLink}
          onClick={() => setLinkArray([...linkArray, linkArray.length])}
        >
          Добавить ссылку
        </button>
        <span className={styles.title}>Настройки</span>
        <span className={styles.subtitle}>Приватность</span>
        <div>
          <input
            className={styles.responsiveRadioInput}
            type="checkbox"
            name="privateAnc"
            id="privateAnc"
            checked={privateAnc}
            onChange={() => setPrivateAnc(!privateAnc)}
          />
          <label htmlFor={'demandRequest'}>Видимость анкеты в сети</label>
        </div>
        <div>
          <input
            className={styles.responsiveRadioInput}
            type="checkbox"
            name="privateAff"
            id="privateAff"
            checked={privateAff}
            onChange={() => setPrivateAff(!privateAff)}
          />
          <label htmlFor={'demandRequest'}>Показывать аффилиацию</label>
        </div>

        <span className={styles.subtitle}>Уведомления</span>
        <div>
          <input
            className={styles.responsiveRadioInput}
            type="checkbox"
            name="notificationsEmail"
            id="notificationsEmail"
            checked={notificationsEmail}
            onChange={() => setNotificationsEmail(!notificationsEmail)}
          />
          <label htmlFor={'demandRequest'}>Уведомления по Email</label>
        </div>
        <div>
          <input
            className={styles.responsiveRadioInput}
            type="checkbox"
            name="notificationsBrow"
            id="notificationsBrow"
            checked={notificationsBrow}
            onChange={() => setNotificationsBrow(!notificationsBrow)}
          />
          <label htmlFor={'demandRequest'}>Уведомления в браузере</label>
        </div>
        <Button>Сохранить</Button>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};
