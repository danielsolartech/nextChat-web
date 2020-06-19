import CommunicationManager from '../../communication';
import { Authenticated } from '../../types';

export const API_URL: string = process.env.NODE_ENV === 'production' ? 'https://api.danielsolartech.com/' : 'http://192.168.1.69:3000/';

let communication: CommunicationManager | null = null;

export const checkAuthenticated = async (): Promise<Authenticated> => {
  try {
    const auth_id: string | null = localStorage.getItem('nextchat_user_id');
    const auth_token: string | null = localStorage.getItem('nextchat_token');

    if (!auth_id || !auth_token || isNaN(Number(auth_id))) {
      throw new Error('No authenticated.');
    }

    const res: any = await (await fetch(API_URL + 'users/auth', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ auth_id, auth_token }),
    })).json();

    if (!res.status && !res.data) {
      throw new Error('No authenticated.');
    }

    if (!communication) {
      communication = new CommunicationManager(res.data);
      communication.handleEvents();
    }

    return {
      auth: res.status,
      user: res.data,
      communication,
    };
  } catch (error) {
    return {
      auth: false,
      user: null,
      communication: null,
    };
  }
};
