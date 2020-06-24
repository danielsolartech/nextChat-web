import * as React from 'react';
import Form from '../../components/forms';
import { sendPatch } from '../../utils/routes';
import { useDispatch } from 'react-redux';
import { setHeaderMessage } from '../../data/actions/general';

const PasswordSettings: React.FC = () => {
  const [currentPassword, setCurrentPassword] = React.useState<string>('');
  const [currentPasswordMessage, setCurrentPasswordMessage] = React.useState<string>('');
  const [newPassword, setNewPassword] = React.useState<string>('');
  const [newPasswordMessage, setNewPasswordMessage] = React.useState<string>('');
  const [repeatNewPassword, setRepeatNewPassword] = React.useState<string>('');
  const [repeatNewPasswordMessage, setRepeatNewPasswordMessage] = React.useState<string>('');
  const dispatch = useDispatch();

  const sendForm = async (): Promise<void> => {
    try {
      setCurrentPasswordMessage('');
      setNewPasswordMessage('');
      setRepeatNewPasswordMessage('');

      const data: any = await sendPatch('users/settings/password', {
        current_password: currentPassword,
        new_password: newPassword,
        repeat_new_password: repeatNewPassword,
      });

      if (data.status === true) {
        dispatch(setHeaderMessage({
          message: 'Your password was changed correctly, you will be ably to change it again in 7 days.',
          color: 'Green',
          left_time: '4',
        }));

        setCurrentPassword('');
        setNewPassword('');
        setRepeatNewPassword('');

        return;
      } else {
        const [type, message] = data.message.split('||');
        if (type === 'current_password') {
          setCurrentPasswordMessage(message);
        } else if (type === 'new_password') {
          setNewPasswordMessage(message);
        } else if (type === 'repeat_new_password') {
          setRepeatNewPasswordMessage(message);
        } else {
          setCurrentPasswordMessage(type);
        }

        return;
      }
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(error);
      }
    }
  };

  return (
    <Form
      title="Change your password"
      inputs={[
        {
          name: 'profileCurrentPassword',
          type: 'password',
          icon: 'fas fa-lock',
          label: 'Current password',
          placeholder: '••••••••',
          message: currentPasswordMessage,
          defaultValue: currentPassword,
          onEnter: () => sendForm(),
          onChange: (value) => setCurrentPassword(value),
        },
        {
          name: 'profileNewPassword',
          type: 'password',
          icon: 'fas fa-lock',
          label: 'New password',
          placeholder: '••••••••',
          message: newPasswordMessage,
          defaultValue: newPassword,
          onEnter: () => sendForm(),
          onChange: (value) => setNewPassword(value),
        },
        {
          name: 'profileRepeatNewPassword',
          type: 'password',
          icon: 'fas fa-lock',
          label: 'Repeat the new password',
          placeholder: '••••••••',
          message: repeatNewPasswordMessage,
          defaultValue: repeatNewPassword,
          onEnter: () => sendForm(),
          onChange: (value) => setRepeatNewPassword(value),
        },
      ]}
      submitButton={{
        name: 'saveProfile',
        type: 'background',
        color: 'Purple',
        hoverColor: 'DEFAULT',
        text: 'Save changes',
        as: 'Button',
        extraProps: {
          'text-color': 'White',
        },
        onClick: () => sendForm(),
      }}
    />
  );
};

export default PasswordSettings;
