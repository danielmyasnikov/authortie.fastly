export interface State {
  profile: Profile;
}

export interface Profile {
  id: number | string;
  name: string;
  lastName: string;
  middleName: string;
  affiliation: string;
  about: string;
  country: Option;
  privateAnc: boolean;
  notificationsEmail: boolean;
  notificationsBrow: boolean;
  avatar?: File;
  avatarUrl: string;
  status: Option;
  grade: Option;
  links: Links[];
  confirmOrcid: boolean;
  regoDate: string;
  reputationScore: string | number;
}

export interface Links {
  url: string;
  id?: number;
}

export interface Option {
  value: string;
  label: string;
}
