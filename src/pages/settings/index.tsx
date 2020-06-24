import * as React from 'react';
import { useRouteMatch, Link, Redirect } from 'react-router-dom';
import ProfileSettings from './profile';
import PasswordSettings from './password';
import Footer from '../../components/footer';
import './index.scss';

const Settings: React.FC = () => {
  const match = useRouteMatch<{ category: string }>();

  if (!match.params.category || match.params.category === '') {
    return (<Redirect to="/settings/profile" />);
  }

  const isActive = (category: string): string => match.params.category === category ? 'active' : '';

  return (
    <>
      <div className="nextChat-settings nextChat-animation fadeIn">
        <ul className="settings-navigation">
          <li className={isActive('profile')}><Link to="/settings/profile">
            <i className="fas fa-user" />
            Your profile
          </Link></li>
          <li className={isActive('account')}><Link to="/settings/account">
            <i className="fas fa-user-edit" />
            Your account
          </Link></li>
          <li className={isActive('password')}><Link to="/settings/password">
            <i className="fas fa-user-lock" />
            Change your password
          </Link></li>
          <li className={isActive('privacy')}><Link to="/settings/privacy">
            <i className="fas fa-user-secret" />
            Privacy and Security
          </Link></li>
        </ul>
        <div className="settings-content">
          {match.params.category === 'profile' && <ProfileSettings />}
          {match.params.category === 'password' && <PasswordSettings />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Settings;
