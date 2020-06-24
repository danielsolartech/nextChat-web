import CommunicationManager from '../communication';

export enum Gender {
  FEMALE = 'F',
  MALE = 'M',
  UNKNOWN = 'U',
}

export interface Link {
  name: string;
  link: string;
}

export const getIcon = (link: Link): string => {
  switch (link.name.toLowerCase()) {
    case 'facebook': {
      return 'fab fa-facebook-f';
    }

    case 'twitter': {
      return 'fab fa-twitter';
    }

    case 'whatsapp': {
      return 'fab fa-whatsapp';
    }

    case 'instagram': {
      return 'fab fa-instagram';
    }

    case 'github': {
      return 'fab fa-github';
    }

    default: {
      return 'fas fa-link';
    }
  }
}

export interface User {
  id: number;
  username: string;
  email: string;
  gender: Gender;
  biography: string;
  verified: boolean;
  verified_sended: boolean;
  account_created: number;
  online: boolean;
  last_online: number;
  online_time: number;
  profile_image: string;
  profile_banner: string;
  links: Link[];
  followers: number;
  following: number;
  friends: number;
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
