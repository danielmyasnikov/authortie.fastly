import { useTranslation } from 'react-i18next';

import Camera from 'assets/camera.svg';
import IDColor from 'assets/IDColor.png';
import Pencil from 'assets/pencil.svg';
import Star from 'assets/star.svg';

import styles from './styles.module.less';

interface Props {
  avatarURL: string;
  fileError: string;
  IDURL: string;
  regoDate: string;
  isMyProfile: boolean;
  handleUploadAvatarBtnClick: () => void;
  handleFileInputChanged: (event: React.FormEvent<HTMLInputElement>) => void;
  confirmOrcid: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  reputationScore: string | number;
}

export const Info: React.FC<Props> = ({
  avatarURL,
  handleUploadAvatarBtnClick,
  handleFileInputChanged,
  fileInputRef,
  fileError,
  confirmOrcid,
  IDURL,
  isMyProfile,
  regoDate,
  reputationScore,
}) => {
  const { t } = useTranslation('profile');
  return (
    <div className={styles.profileWrapper}>
      <div className={styles.profileImg}>
        {avatarURL ? (
          <img className={styles.img} src={avatarURL} alt="" />
        ) : (
          <Camera className={styles.defaultPhoto} />
        )}
        {isMyProfile && (
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
        )}
      </div>
      {fileError && <span className={styles.error}>{fileError}</span>}
      <div className={styles.linkWrap}>
        {!confirmOrcid ? (
          <a href={IDURL} className={styles.bigIcon}>
            <img src={IDColor} alt="" />
            <span className={styles.confirmOrcid}>{t('confirmOrcid')}</span>
          </a>
        ) : (
          <a href={IDURL} className={styles.bigIcon}>
            <img className={styles.bigIcon} src={IDColor} alt="" />
            <span className={styles.confirmedOrcid}>{t('confirmedOrcid')}</span>
            {' '}
          </a>
        )}
      </div>
      <div className={styles.rating}>
        <Star />
        <span>{reputationScore}</span>
      </div>
      <div className={styles.dateOfReg}>
        <span className={styles.ratingSubtitle}>Дата регистрации:</span>
        <span className={styles.date}>{regoDate}</span>
      </div>
    </div>
  );
};
