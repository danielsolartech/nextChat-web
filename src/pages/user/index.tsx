import React from 'react';
import { useLocation } from 'react-router-dom';
import { User, getIcon } from '../../types';
import { sendPost } from '../../utils/routes';
import Footer from '../../components/footer';
import Button from '../../components/forms/button';
import './index.scss';

interface UserProfile {
  isAuthenticated: boolean;
  info?: User;
  isOwner: boolean;
}

const UserPage: React.FC = () => {
  const location = useLocation();
  const [checked, setChecked] = React.useState<boolean>(false);
  const [userProfile, setUserProfile] = React.useState<UserProfile>({ isAuthenticated: false, isOwner: false });
  const currentUser: string = location.pathname.split('/')[2] || '';

  if (!currentUser || !currentUser.length) {
    return <div>Invalid profile</div>;
  }

  const checkUser = async (): Promise<void> => sendPost('users/info/' + currentUser).then((data) => {
    if (data.status === true && data.profile) {
      setUserProfile({
        isAuthenticated: data.authenticated || false,
        info: data.profile,
        isOwner: data.is_owner || false,
      });
    }

    setChecked(true);
  }).catch(() => setChecked(true));

  if (!checked) {
    checkUser();
    return null;
  }

  if (!userProfile.info) {
    return <div>Invalid profile</div>;
  }

  if (userProfile.info.username !== currentUser) {
    checkUser();
    return null;
  }

  return (
    <>
      <div className="nextChat-user-page">
        <div className="user-header nextChat-animation fadeInDown">
          <div className="header-banner" style={{ backgroundImage: `url('${userProfile.info.profile_banner}')` }}></div>
          <div className="header-avatar" style={{ backgroundImage: `url('${userProfile.info.profile_image}')` }}></div>
          {userProfile.info.links.length > 0 && <ul className="header-links">
            {userProfile.info.links.map((link) => (
              <li key={`${userProfile.info?.username}_${link.name}`}><a href={link.link} target="_blank" rel="noopener noreferrer">
                <i className={getIcon(link)} />
              </a></li>
            ))}
          </ul>}
        </div>
        <div className="user-body nextChat-animation fadeInDown" style={{ animationDelay: '.1s' }}>
          <div className="body-left">
            <div className="left-header">
              <div className="header-username" text-color="Purple">
                {userProfile.info.username}

                {userProfile.info.verified && <div className="verified">
                  <i className="fas fa-certificate" />
                  <i className="fas fa-check" />
                </div>}
              </div>
            </div>

            <div className="left-body">
              {userProfile.info.biography.length > 0 && <div className="user-biography">
                {userProfile.info.biography}
              </div>}

              <ul className="user-stats">
                <li>
                  <div className="icon">
                    <i className="fas fa-users" />
                  </div>
                  <span>
                    {userProfile.info.following} following
                  </span>
                </li>
                <li>
                  <div className="icon">
                    <i className="fas fa-users" />
                  </div>
                  <span>
                    {userProfile.info.followers} followers
                  </span>
                </li>
                <li>
                  <div className="icon">
                    <i className="fas fa-user-friends" />
                  </div>
                  <span>
                    {userProfile.info.friends} friends
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="body-right">
            {!userProfile.isAuthenticated && <div className="right-signup">
              <h1 text-color="Purple">
                Join to us!
              </h1>
              <p>
                If you create an account you can enjoy more features like follow an user, send a message to any user, be a friend of a user,
                join to groups and other things a lot. Click the button below and sign up free!
              </p>
              <Button
                name="signup-profile"
                type="background"
                color="Purple"
                hoverColor="DEFAULT"
                text="Sign up"
                as="Link"
                to="/"
                extraProps={{
                  'text-color': 'White',
                }}
              />
            </div>}
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserPage;
