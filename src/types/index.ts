import CommunicationManager from '../communication';

export enum Gender {
  FEMALE = 'F',
  MALE = 'M',
  UNKNOWN = 'U',
}

export interface User {
  id: number;
  username: string;
  email: string;
  gender: Gender;
  account_created: number;
  online: boolean;
  last_online: number;
  online_time: number;
  profile_image: string;
  profile_banner: string;
  followers: number;
}

export interface Authenticated {
  auth: boolean,
  user: User | null,
  communication: CommunicationManager | null,
}

export type Colors =
  'Red' |
  'Pink' |
  'Purple' |
  'DeepPurple' |
  'Indigo' |
  'Blue' |
  'LightBlue' |
  'Cyan' |
  'Teal' |
  'Green' |
  'LightGreen' |
  'Lime' |
  'Yellow' |
  'Amber' |
  'Orange' |
  'DeepOrange' |
  'Brown' |
  'Grey' |
  'White' |
  'Black' |
  'Light';
