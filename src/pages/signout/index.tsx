import React from 'react';
import { API_URL } from '../../data/consts/data';

const SignOut: React.FC = () => {
  const [checked, setChecked] = React.useState<boolean>(false);
  const [completed, setCompleted] = React.useState<boolean>(false);

  if (!checked && !completed) {
    const auth_id: string | null = localStorage.getItem('nextchat_user_id');
    const auth_token: string | null = localStorage.getItem('nextchat_token');


    fetch(API_URL + 'users/signout', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        auth_id,
        auth_token,
      }),
    }).then((res) => res.json()).then((data) => {
      if (data.status) {
        localStorage.removeItem('nextchat_user_id');
        localStorage.removeItem('nextchat_token');
      }

      setChecked(true);
      setCompleted(data.status);
      document.location.href = '/signin';
    }).catch(() => setChecked(true));
  }

  return null;
};

export default SignOut;
