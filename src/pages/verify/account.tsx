import * as React from 'react';
import { useRouteMatch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setHeaderMessage } from '../../data/actions/general';
import Footer from '../../components/footer';
import { sendPatch } from '../../utils/routes';

const Account: React.FC = () => {
  const [checked, setChecked] = React.useState<boolean>(false);
  const [sended, setSended] = React.useState<boolean>(false);
  const [isValid, setIsValid] = React.useState<boolean>(false);
  const [leftTime, setLeftTime] = React.useState<number>(10);
  const match = useRouteMatch<{ token: string }>();
  const dispatch = useDispatch();

  if (!sended) {
    setSended(true);

    sendPatch('users/verify', {
      token: match.params.token,
    }).then((data) => {
      setIsValid(data.status);
      setChecked(true);
    }).catch(() => { });

    return null;
  }

  if (!checked) {
    return null;
  }

  if (!isValid) {
    dispatch(setHeaderMessage({
      verify: 'The verification code is invalid.',
      left_time: '4',
      color: 'Red',
      button: 'false',
    }));

    document.location.href = '/';

    return null;
  }

  const time = (): void => {
    if (leftTime > 0) {
      setLeftTime(leftTime - 1);
    } else {
      document.location.href = '/';
    }
  };

  if (leftTime > -1) {
    setTimeout(time, 1000);
  }

  return (
    <>
      <div className="nextChat-verify account nextChat-animation fadeIn" style={{ animationDelay: '.5s' }}>
        <div className="verify-icon" text-color="Purple">
          <i className="fas fa-certificate" />
          <i className="fas fa-check" />
        </div>
        <h1 text-color="Purple">
          Verify your account
        </h1>
        <p>
          Thank you for verify your account, now you can enjoy more features.
        </p>
        <div className="verify-redirect" background-color="Purple" text-color="White">
          <i className="fas fa-link" />
          <span>
            Redirect in {leftTime} second${leftTime === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Account;
