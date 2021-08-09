import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as T from 'store/profile/types';
import {
  STATUS_OPTIONS,
  STUDENT_OPTIONS,
  GRADE_OPTIONS,
  COUNTRIES,
} from 'src/constants/profileConstants';
import { Button } from 'components/common/button';
import { setProfile, getProfile } from 'store/profile/actions';
import { getProfileSelector } from 'store/profile/selectors';
import { AppDispatch } from 'store/types';
import { Textarea } from 'components/common/textarea';
import Select from 'react-select';
import Camera from 'assets/camera.svg';
import IDColor from 'assets/IDColor.png';
import Pencil from 'assets/pencil.svg';
import Close from 'assets/close.svg';
import Note from 'assets/note.svg';
import styles from './styles.module.less';
import { useEffect } from 'react';

const FILE_MAX_SIZE = 5242880;

const LINKS_DEFAULT = [
  { url: '', id: 1 },
  { url: '', id: 2 },
];

export const MyProfile = () => {
  const { t } = useTranslation('profile');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const [avatarURL, setAvatarURL] = useState<string>('');
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [middleName, setMiddleName] = useState<string>('');
  const [affiliation, setAffiliation] = useState<string>('');
  const [status, setStatus] = useState<T.Option>({ value: 'scientist', label: 'Учёный' });
  const [grade, setGrade] = useState<T.Option>({ value: '', label: '' });
  const [about, setAbout] = useState<string>('');
  const [country, setCountry] = useState<T.Option>({ value: '', label: '' });
  const [linkArray, setLinkArray] = useState<T.Links[]>(LINKS_DEFAULT);
  const [privateAnc, setPrivateAnc] = useState(false);
  const [notificationsEmail, setNotificationsEmail] = useState(true);
  const [notificationsBrow, setNotificationsBrow] = useState(true);
  const [fileError, setFileError] = useState('');
  const [nameError, setNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [modal, setModal] = useState<boolean>(false);
  const { profile } = useSelector(getProfileSelector);
  console.log(profile)


  const IDURL =
    'https://authortie-app.herokuapp.com/auth/orcid?front_url=https://authorties-sky.herokuapp.com/profile';

  useEffect(() => {
    setAvatarURL(profile.avatarUrl);
    setName(profile.name);
    setLastName(profile.lastName);
    setMiddleName(profile.middleName);
    setAffiliation(profile.affiliation);
    setAbout(profile.about);
    setPrivateAnc(profile.privateAnc);
    setNotificationsEmail(profile.notificationsEmail);
    setNotificationsBrow(profile.notificationsBrow);
    setCountry(profile.country);
    setStatus(profile.status);
    setGrade(profile.grade);
    setLinkArray(profile.links);
  }, [profile]);

  useEffect(() => {
    dispatch(getProfile());
  }, []);

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
    if (file.size > FILE_MAX_SIZE) {
      setFileError(t('maxSize'));
    } else setFileError('');

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

  function handleBlur(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === 'name' && value === '') {
      setNameError(t('inputName'));
    }
    if (name === 'last_name' && value === '') {
      setLastNameError(t('Введите фамилию'));
    }
  }

  async function submitProfile() {
    const linksForData = linkArray.map((item) => ({ url: item.url }));
    const data = {
      name,
      lastName,
      middleName,
      affiliation,
      avatar,
      about,
      country: country?.label,
      privateAnc,
      notificationsEmail,
      notificationsBrow,
      status: status.value,
      grade: grade.label,
      linksForData,
    };
    const resultConf = await dispatch(setProfile(data));
    if (setProfile.fulfilled.match(resultConf)) {
      setModal(true);
    }
  }

  function deleteLink(id?: number) {
    const newLinkArray = linkArray.filter((link) => link.id !== id);
    setLinkArray(newLinkArray);
  }

  const isValid = !fileError && !!name && !!lastName;

  const renderModal = () => (
    <div className={styles.modalWrapper}>
      <div className={styles.contaier}>
        <Close className={styles.exit} onClick={() => setModal(false)} />
        <Note className={styles.noteIcon} />
        <span className={styles.subtitle}>{t('applicationHasBeenGenerated')}</span>
      </div>
      <div className={styles.overlay} />
    </div>
  );
  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>{t('title')}</span>
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
      {fileError && <span className={styles.error}>{fileError}</span>}
      <div className={styles.linkWrap}>
        {!profile.confirmOrcid ? (
          <>
            <a href={IDURL} className={styles.bigIcon}>
              <img src={IDColor} alt="" />
            </a>
            <span className={styles.subtitle}>{t('confirmOrcid')}</span>
          </>
        ) : (
          <>
            <img className={styles.bigIcon} src={IDColor} alt="" />
            <span className={styles.subtitle}>{t('confirmedOrcid')}</span>{' '}
          </>
        )}
      </div>
      <span className={styles.subtitle}>{t('name')}</span>
      <input
        value={name}
        name="name"
        id="name"
        className={styles.input}
        onBlur={handleBlur}
        type="text"
        onChange={(e) => setName(e.target.value)}
      />
      {nameError && <span className={styles.error}>{nameError}</span>}
      <span className={styles.subtitle}>{t('lastName')}</span>
      <input
        value={lastName}
        name="last_name"
        onBlur={handleBlur}
        id="last_name"
        className={styles.input}
        type="text"
        onChange={(e) => setLastName(e.target.value)}
      />
      {lastNameError && <span className={styles.error}>{lastNameError}</span>}
      <span className={styles.subtitle}>{t('middleName')}</span>
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
        onChange={(option: any) => setStatus(option)}
        value={status}
        className={styles.block}
        defaultValue={STATUS_OPTIONS[0]}
        options={STATUS_OPTIONS}
      />
      {(status?.value === 'scientist' || status?.value === 'student') && (
        <Select
          classNamePrefix="CustomSelect"
          options={status.value === 'student' ? STUDENT_OPTIONS : GRADE_OPTIONS}
          defaultValue={status.value === 'student' ? STUDENT_OPTIONS[0] : GRADE_OPTIONS[0]}
          value={grade}
          onChange={(option: any) => setGrade(option)}
        />
      )}
      <span className={styles.subtitle}>{t('affiliation')}</span>
      <input
        value={affiliation}
        name="affiliation"
        id="affiliation"
        className={styles.input}
        type="text"
        onChange={(e) => setAffiliation(e.target.value)}
      />
      <span className={styles.subtitle}>{t('about')}</span>
      <Textarea value={about} onChange={setAbout} />
      <span className={styles.subtitle}>{t('country')}</span>
      {console.log(country)}
      <Select
        placeholder={t('changeContry')}
        classNamePrefix="CustomSelect"
        value={country}
        options={COUNTRIES}
        onChange={(option: any) => setCountry(option)}
      />
      <span className={styles.subtitle}>{t('links')}</span>
      {linkArray.map((item) => (
        <div key={item.id + item.url} className={styles.linksWrapper}>
          <input
            value={item.url}
            name={String(item.id)}
            id={String(item.id)}
            className={styles.inputLink}
            type="text"
            onChange={handleLinkChange}
          />
          <button onClick={() => deleteLink(item.id)} className={styles.deleteBtn}>
            {t('delete')}
          </button>
        </div>
      ))}
      <button
        className={styles.btnLink}
        onClick={() => setLinkArray([...linkArray, { url: '', id: linkArray.length + 1 }])}
      >
        {t('addLink')}
      </button>
      <span className={styles.title}>{t('setings')}</span>
      <div>
        <input
          className={styles.checkboxInput}
          type="checkbox"
          name="privateAnc"
          id="privateAnc"
          checked={privateAnc}
          onChange={() => setPrivateAnc(!privateAnc)}
        />
        <label htmlFor="privateAnc">{t('privateAnc')}</label>
      </div>
      <div>
        <input
          className={styles.checkboxInput}
          type="checkbox"
          name="notificationsEmail"
          id="notificationsEmail"
          checked={notificationsEmail}
          onChange={() => setNotificationsEmail(!notificationsEmail)}
        />
        <label htmlFor="notificationsEmail">{t('notificationsEmail')}</label>
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
        <label htmlFor="notificationsBrow">{t('notificationsBrow')}</label>
      </div>
      <div className={styles.saveBtn}>
        <Button disabled={!isValid} onClick={submitProfile}>
          {t('save')}
        </Button>
      </div>

      {modal && renderModal()}
    </div>
  );
};
