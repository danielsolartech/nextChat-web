import React from 'react';
import { sendDelete } from '../../utils/routes';

const SignOut: React.FC = () => {
  const [checked, setChecked] = React.useState<boolean>(false);
  const [completed, setCompleted] = React.useState<boolean>(false);

  if (!checked && !completed) {
    sendDelete('users/signout').then((data) => {
      if (data.status) {
        localStorage.removeItem('nextchat_user_id');
        localStorage.removeItem('nextchat_token');
      }

      setChecked(true);
      setCompleted(data.status);
      document.location.href = '/';
    }).catch(() => setChecked(true));
  }

  return null;
};

export default SignOut;
