import { API_URL } from '../data/consts/data';

const send = async (url: string, method: 'DELETE' | 'PATCH' | 'POST' | 'PUT', body?: { [key: string]: any }): Promise<any> => {
  try {
    return await (await fetch(API_URL + url, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...body,
        auth_id: localStorage.getItem('nextchat_user_id'),
        auth_token: localStorage.getItem('nextchat_token'),
      }),
    })).json();
  } catch (error) {
    await Promise.reject(error);
    return {};
  }
};

export const sendDelete = async (url: string, body?: { [key: string]: any }): Promise<any> => await send(url, 'DELETE', body);

export const sendPatch = async (url: string, body?: { [key: string]: any }): Promise<any> => await send(url, 'PATCH', body);

export const sendPost = async (url: string, body?: { [key: string]: any }): Promise<any> => await send(url, 'POST', body);

export const sendPut = async (url: string, body?: { [key: string]: any }): Promise<any> => await send(url, 'PUT', body);
