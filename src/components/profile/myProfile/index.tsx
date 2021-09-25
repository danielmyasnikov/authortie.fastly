import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import * as T from 'store/profile/types';
import {
  STATUS_OPTIONS,
  STUDENT_OPTIONS,
  GRADE_OPTIONS,
  COUNTRIES,
  // @ts-ignore
} from 'src/constants/profileConstants';
import { Button } from 'components/common/button';
import { setProfile, getProfile } from 'store/profile/actions';
import { getProfileSelector } from 'store/profile/selectors';
import { AppDispatch } from 'store/types';
import { Textarea } from 'components/common/textarea';
import Select from 'react-select';

import { Modal } from 'components/common/modal';

import Note from 'assets/note.svg';
import styles from './styles.module.less';
import { useEffect } from 'react';

import { Info } from './info';
import { Widget } from './widget';

const FILE_MAX_SIZE = 5242880;

const LINKS_DEFAULT = [
  { url: '', id: 1 },
  { url: '', id: 2 },
  { url: '', id: 3 },
  { url: '', id: 4 },
  { url: '', id: 5 },
  { url: '', id: 6 },
];

interface Props {
  id?: string;
}

export const MyProfile: React.FC<Props> = ({ id }) => {
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
  const isMyProfile = !id;

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
    if (isMyProfile) {
      dispatch(getProfile());
    } else dispatch(getProfile(id));
  }, []);

  useEffect(() => {
    if (isMyProfile) {
      dispatch(getProfile());
    } else dispatch(getProfile(id));
  }, [id]);

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
      country: country?.label || '',
      privateAnc,
      notificationsEmail,
      notificationsBrow,
      status: status.value,
      grade: grade?.label || '',
      linksForData,
    };
    console.log('fghjk');
    const resultConf = await dispatch(setProfile(data));
    if (setProfile.fulfilled.match(resultConf)) {
      setModal(true);
    }
  }

  // function deleteLink(id?: number) {
  //   const newLinkArray = linkArray.filter((link) => link.id !== id);
  //   setLinkArray(newLinkArray);
  // }

  const isValid = !fileError && !!name && !!lastName;

  const renderModal = () => (
    <Modal onClose={setModal} open={modal}>
      <Note className={styles.noteIcon} />
      <span className={styles.subtitle}>{'Профиль обнавлен'}</span>
    </Modal>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.gridContainer}>
        <Info
          avatarURL={avatarURL}
          handleUploadAvatarBtnClick={handleUploadAvatarBtnClick}
          handleFileInputChanged={handleFileInputChanged}
          fileInputRef={fileInputRef}
          fileError={fileError}
          confirmOrcid={profile.confirmOrcid}
          IDURL={IDURL}
          isMyProfile={isMyProfile}
          regoDate={profile.regoDate}
          reputationScore={profile.reputationScore}
        />
        <div className={cn(styles.content, styles.line)}>
          <div className={styles.contentRow}>
            <div className={styles.contentItem}>
              <div className={styles.item}>
                <span className={styles.subtitle}>{t('name')}</span>
                {isMyProfile && (
                  <input
                    value={name}
                    name="name"
                    id="name"
                    className={styles.input}
                    onBlur={handleBlur}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                )}
                {!isMyProfile && name && <span className={styles.userInfo}>{name}</span>}
                {!isMyProfile && !name && <div className={styles.noConntentLine} />}
                {nameError && <span className={styles.error}>{nameError}</span>}
              </div>
              <div className={styles.item}>
                <span className={styles.subtitle}>Статус</span>
                {isMyProfile && (
                  <Select
                    classNamePrefix="CustomSelect"
                    onChange={(option: any) => setStatus(option)}
                    value={status}
                    className={styles.block}
                    defaultValue={STATUS_OPTIONS[0]}
                    options={STATUS_OPTIONS}
                  />
                )}

                {!isMyProfile && status.label && (
                  <span className={styles.userInfo}>{status.label}</span>
                )}
                {!isMyProfile && !status.label && <div className={styles.noConntentLine} />}

                {(status?.value === 'scientist' || status?.value === 'student') && isMyProfile && (
                  <Select
                    classNamePrefix="CustomSelect"
                    options={status.value === 'student' ? STUDENT_OPTIONS : GRADE_OPTIONS}
                    defaultValue={
                      status.value === 'student' ? STUDENT_OPTIONS[0] : GRADE_OPTIONS[0]
                    }
                    value={grade}
                    onChange={(option: any) => setGrade(option)}
                  />
                )}

                {!isMyProfile && grade?.label && (
                  <span className={styles.userInfo}>{grade.label}</span>
                )}
                {!isMyProfile && !grade?.label && <div className={styles.noConntentLine} />}
              </div>
            </div>
            <div className={styles.contentItem}>
              <div className={styles.item}>
                <span className={styles.subtitle}>{t('lastName')}</span>
                {isMyProfile && (
                  <input
                    value={lastName}
                    name="last_name"
                    onBlur={handleBlur}
                    id="last_name"
                    className={styles.input}
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                )}
                {!isMyProfile && lastName && <span className={styles.userInfo}>{lastName}</span>}
                {!isMyProfile && !lastName && <div className={styles.noConntentLine} />}
                {lastNameError && <span className={styles.error}>{lastNameError}</span>}
              </div>
              <div className={styles.item}>
                <span className={styles.subtitle}>{t('affiliation')}</span>
                {isMyProfile && (
                  <input
                    value={affiliation}
                    name="affiliation"
                    id="affiliation"
                    className={styles.input}
                    type="text"
                    onChange={(e) => setAffiliation(e.target.value)}
                  />
                )}
                {!isMyProfile && affiliation && (
                  <span className={styles.userInfo}>{affiliation}</span>
                )}
                {!isMyProfile && !affiliation && <div className={styles.noConntentLine} />}
              </div>
            </div>
            <div className={styles.contentItem}>
              <div className={styles.columnItem}>
                <div className={styles.item}>
                  <span className={styles.subtitle}>{t('middleName')}</span>
                  {isMyProfile && (
                    <input
                      value={middleName}
                      name="middle_name"
                      id="middle_name"
                      className={styles.input}
                      type="text"
                      onChange={(e) => setMiddleName(e.target.value)}
                    />
                  )}
                  {!isMyProfile && middleName && (
                    <span className={styles.userInfo}>{middleName}</span>
                  )}
                  {!isMyProfile && !middleName && <div className={styles.noConntentLine} />}
                </div>
                <div className={styles.item}>
                  <span className={styles.subtitle}>{t('country')}</span>
                  {isMyProfile && (
                    <Select
                      placeholder={t('changeContry')}
                      classNamePrefix="CustomSelect"
                      value={country}
                      options={COUNTRIES}
                      onChange={(option: any) => setCountry(option)}
                    />
                  )}
                  {!isMyProfile && country?.label && (
                    <span className={styles.userInfo}>{country.label}</span>
                  )}
                  {!isMyProfile && !country?.label && <div className={styles.noConntentLine} />}
                </div>
              </div>
              <div className={styles.item}>
                <span className={styles.subtitle}>{t('about')}</span>
                {isMyProfile && <Textarea value={about} onChange={setAbout} />}
                {!isMyProfile && about && <span className={styles.userInfo}>{about}</span>}
                {!isMyProfile && !about && <div className={styles.noConntentLine} />}
              </div>
            </div>
          </div>
        </div>

        {isMyProfile && (
          <Widget
            privateAnc={privateAnc}
            notificationsEmail={notificationsEmail}
            notificationsBrow={notificationsBrow}
            setPrivateAnc={setPrivateAnc}
            setNotificationsEmail={setNotificationsEmail}
            setNotificationsBrow={setNotificationsBrow}
          />
        )}

        <div className={styles.linksBlock}>
          {((!!linkArray[0].url && !isMyProfile) || isMyProfile) && (
            <span className={styles.linksTitle}>{t('links')}</span>
          )}
          <div className={styles.linksContainer}>
            {linkArray.map((item) => (
              <div key={item.id + item.url} className={styles.linksItem}>
                <div className={styles.linksWrapper}>
                  {isMyProfile && (
                    <input
                      value={item.url}
                      name={String(item.id)}
                      id={String(item.id)}
                      className={styles.inputLink}
                      type="text"
                      onChange={handleLinkChange}
                    />
                  )}
                  {/* <button onClick={() => deleteLink(item.id)} className={styles.deleteBtn}>
                    {t('delete')}
                  </button> */}
                </div>
              </div>
            ))}
            {!isMyProfile &&
              !!linkArray.length &&
              linkArray.map((item) => (
                <a target="_blank" href={item.url} className={styles.userInfoLink}>
                  {item.url}
                </a>
              ))}
          </div>
          {/* <button
            className={styles.btnLink}
            onClick={() => setLinkArray([...linkArray, { url: '', id: linkArray.length + 1 }])}
          >
            {t('addLink')}
          </button> */}
          {renderModal()}
        </div>

        {isMyProfile && (
          <div className={styles.saveBtn}>
            <Button className={styles.variantPrimary} onClick={submitProfile}>
              {t('save')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
