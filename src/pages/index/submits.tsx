import { API_URL } from '../../data/consts/data';

export const submitSignUp = async (): Promise<void> => {
  const username: HTMLInputElement | null = document.querySelector<HTMLInputElement>('input#usernameRegisterInput');
  const usernameError: HTMLDivElement | null = document.querySelector<HTMLDivElement>('#usernameRegisterMessage');
  const email: HTMLInputElement | null = document.querySelector<HTMLInputElement>('input#emailRegisterInput');
  const emailError: HTMLDivElement | null = document.querySelector<HTMLDivElement>('#emailRegisterMessage');
  const password: HTMLInputElement | null = document.querySelector<HTMLInputElement>('input#passwordRegisterInput');
  const passwordError: HTMLDivElement | null = document.querySelector<HTMLDivElement>('#passwordRegisterMessage');
  const repeatPassword: HTMLInputElement | null = document.querySelector<HTMLInputElement>('input#repeatPasswordRegisterInput');
  const repeatPasswordError: HTMLDivElement | null = document.querySelector<HTMLDivElement>('#repeatPasswordRegisterMessage');
  const gender: HTMLInputElement | null = document.querySelector<HTMLInputElement>('input[name="genderRegisterInput"]:checked');

  if (username && usernameError && email && emailError && password && passwordError && repeatPassword && repeatPasswordError && gender) {
    try {
      const data: any = await (await fetch(API_URL + 'users/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.value,
          email: email.value,
          password: password.value,
          repeat_password: repeatPassword.value,
          gender: gender.value,
        }),
      })).json();

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

        usernameError.innerHTML = '';
        emailError.innerHTML = '';
        passwordError.innerHTML = '';
        repeatPasswordError.innerHTML = '';

        switch (type) {
          case 'username': {
            usernameError.innerHTML = message;
            break;
          }

          case 'email': {
            emailError.innerHTML = message;
            break;
          }

          case 'password': {
            passwordError.innerHTML = message;
            break;
          }

          case 'repeat_password': {
            repeatPasswordError.innerHTML = message;
            break;
          }

          default: {
            usernameError.innerHTML = type;
            break;
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
};
