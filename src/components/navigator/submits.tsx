import { sendPost } from '../../utils/routes';
import store from '../../data/index';
import { setSearchResults, setHeaderMessage } from '../../data/actions/general';

export const submitSearch = async (): Promise<void> => {
  const search: HTMLInputElement | null = document.querySelector<HTMLInputElement>('input#searchNavigatorInput');

  if (search) {
    try {
      const data: any = await sendPost('users/search', { search: search.value });
      store.dispatch(setSearchResults(data.data || []));
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(error);
      }
    }
  }
};

export const submitSignIn = async (): Promise<void> => {
  const account: HTMLInputElement | null = document.querySelector<HTMLInputElement>('input#accountLoginInput');
  const accountError: HTMLDivElement | null = document.querySelector<HTMLDivElement>('#accountLoginMessage');
  const password: HTMLInputElement | null = document.querySelector<HTMLInputElement>('input#passwordLoginInput');

  if (account && accountError && password) {
    try {
      const data: any = await sendPost('users/signin', {
        account: account.value,
        password: password.value,
      });

      if (data.status === true && data.user_id && data.token) {
        if (localStorage.getItem('nextchat_user_id')) {
          localStorage.removeItem('nextchat_user_id');
        }

        if (localStorage.getItem('nextchat_token')) {
          localStorage.removeItem('nextchat_token');
        }

        localStorage.setItem('nextchat_user_id', data.user_id);
        localStorage.setItem('nextchat_token', data.token);

        document.location.href = '/dashboard';
        return;
      } else {
        const [type, message] = data.message.split('||');

        if (type === 'account' || type === 'pasword') {
          accountError.innerHTML = message;
          return;
        } else {
          accountError.innerHTML = type;
          return;
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(error);
      }
    }
  }
};

export const submitVerifyAccount = async (): Promise<void> => {
  try {
    const data: any = await sendPost('users/verify');
    if (data.status === true) {
      store.dispatch(setHeaderMessage({
        verify: `The verification code was sent to <b>${data.email}</b>`,
        left_time: '8',
        button: 'false',
      }));

      return;
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }
  }
};
