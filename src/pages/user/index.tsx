import React from 'react';
import { useSelector } from 'react-redux';
import { Reducers } from '../../data';
import { useLocation } from 'react-router-dom';
import { User, getIcon } from '../../types';
import { sendPost } from '../../utils/routes';
import Footer from '../../components/footer';
import Button from '../../components/forms/button';
import * as Submits from './submits';
import './index.scss';

interface UserProfile {
  isAuthenticated: boolean;
  info?: User;
  isOwner: boolean;
  isFollowing: boolean;
  isFollower: boolean;
  isFriend: boolean;
  isFriendRequest: boolean;
  optionsFriendRequest: boolean;
}

const UserPage: React.FC = () => {
  const general = useSelector((state: Reducers) => state.general);
  const location = useLocation();
  const [checked, setChecked] = React.useState<boolean>(false);
  const [userProfile, setUserProfile] = React.useState<UserProfile>({
    isAuthenticated: false,
    isOwner: false,
    isFollowing: false,
    isFollower: false,
    isFriend: false,
    isFriendRequest: false,
    optionsFriendRequest: false,
  });
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
        isFollowing: data.is_following || false,
        isFollower: data.is_follower || false,
        isFriend: data.is_friend || false,
        isFriendRequest: data.is_friend_request || false,
        optionsFriendRequest: data.options_friend_request || false,
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

  if (general.profile_settings.friend_request != undefined && userProfile.isFriendRequest !== general.profile_settings.friend_request) {
    setUserProfile({
      ...userProfile,
      isFriendRequest: general.profile_settings.friend_request,
    });
  }

  if (general.profile_settings.options_friend_request != undefined && userProfile.optionsFriendRequest !== general.profile_settings.options_friend_request) {
    setUserProfile({
      ...userProfile,
      optionsFriendRequest: general.profile_settings.options_friend_request,
    });
  }

  if (general.profile_settings.is_follower != undefined && userProfile.isFollower !== general.profile_settings.is_follower) {
    setUserProfile({
      ...userProfile,
      isFollower: general.profile_settings.is_follower,
    });
  }

  return (
    <>
      <div className="nextChat-user-page">
        <div className="user-header nextChat-animation fadeInDown">
          <div className="header-banner" style={{ backgroundImage: `url('${userProfile.info.profile_banner}')` }}></div>
          <div className="header-avatar" style={{ backgroundImage: `url('${userProfile.info.profile_image}')` }}></div>
          {(userProfile.info.links || []).length > 0 && <ul className="header-links">
            {userProfile.info.links.map((link) => (
              <li key={`${userProfile.info?.username}_${link.name}`}><a href={`https://www.${link.name.toLowerCase()}.com/${link.link}`} target="_blank" rel="noopener noreferrer">
                <i className={getIcon(link)} />
              </a></li>
            ))}
          </ul>}
        </div>
        <div className="user-body nextChat-animation fadeInDown" style={{ animationDelay: '.1s' }}>
          <div className={`body-left ${userProfile.isAuthenticated ? 'on-auth' : ''}`}>
            <div className="left-header">
              <div className="header-username" text-color="Purple">
                {userProfile.info.username}

                {userProfile.info.verified && <div className="verified">
                  <i className="fas fa-certificate" />
                  <i className="fas fa-check" />
                </div>}

                {userProfile.isOwner && <div className="profile-edit">
                  <Button
                    name="settings-profile"
                    type="outline"
                    color="Purple"
                    hoverColor="DEFAULT"
                    text="Edit your profile"
                    as="Link"
                    to="/settings"
                    extraProps={{
                      'text-color': 'White',
                    }}
                  />
                </div>}
              </div>
              {!userProfile.isOwner && <div className="header-actions">
                {(!userProfile.isFriend && !userProfile.isFriendRequest) && <Button
                  name="friend-request-profile"
                  type="outline"
                  color="Purple"
                  hoverColor="DEFAULT"
                  text="Send friend request"
                  as="Button"
                  extraProps={{
                    'text-color': 'White',
                    style: {
                      marginRight: '.5rem',
                    },
                  }}
                  onClick={() => Submits.friendRequest(userProfile.info?.username || '')}
                />}
                {userProfile.isFriend && <Button
                  name="friend-delete-profile"
                  type="outline"
                  color="Purple"
                  hoverColor="DEFAULT"
                  text="Delete friend"
                  as="Button"
                  extraProps={{
                    'text-color': 'White',
                    style: {
                      marginRight: '.5rem',
                    },
                  }}
                  onClick={() => Submits.deleteFriend(userProfile.info?.username || '')}
                />}
                {(userProfile.isFriendRequest && userProfile.optionsFriendRequest) && <Button
                  name="delete-friend-request-profile"
                  type="outline"
                  color="Purple"
                  hoverColor="DEFAULT"
                  text="Cancel friend request"
                  as="Button"
                  extraProps={{
                    'text-color': 'White',
                    style: {
                      marginRight: '.5rem',
                    },
                  }}
                  onClick={() => Submits.declineFriendRequest(userProfile.info?.username || '')}
                />}
                {(userProfile.isFriendRequest && !userProfile.optionsFriendRequest) && <>
                  <Button
                    name="accept-friend-request-profile"
                    type="background"
                    color="Purple"
                    hoverColor="DEFAULT"
                    text="Accept friend request"
                    as="Button"
                    extraProps={{
                      'text-color': 'White',
                      style: {
                        marginRight: '.5rem',
                        marginBottom: '.5rem',
                      },
                    }}
                    onClick={() => Submits.acceptFriendRequest(userProfile.info?.username || '')}
                  />
                  <Button
                    name="decline-friend-request-profile"
                    type="color"
                    color="Purple"
                    hoverColor="DEFAULT"
                    text="Decline friend request"
                    as="Button"
                    extraProps={{
                      'text-color': 'White',
                      style: {
                        marginRight: '.5rem',
                        marginBottom: '.5rem'
                      },
                    }}
                    onClick={() => Submits.declineFriendRequest(userProfile.info?.username || '')}
                  />
                </>}
                <Button
                  name="toggle-follow-profile"
                  type="outline"
                  color="Purple"
                  hoverColor="DEFAULT"
                  text={userProfile.isFollowing ? 'Unfollow' : userProfile.isFollower ? 'Follow too' : 'Follow'}
                  as="Button"
                  extraProps={{
                    'text-color': 'White',
                    style: {
                      marginRight: '.5rem',
                    },
                  }}
                  onClick={() => userProfile.isFollowing ? Submits.unFollow(userProfile.info?.username || '') : Submits.follow((userProfile.info?.username || ''))}
                />
                {userProfile.isFriend && <Button
                  name="message-profile"
                  type="background"
                  color="Purple"
                  hoverColor="DEFAULT"
                  text="Send message"
                  as="Link"
                  to={`/message/${userProfile.info.username}`}
                  extraProps={{
                    'text-color': 'White',
                  }}
                />}
              </div>}
            </div>

            <div className={`left-body ${userProfile.isOwner ? 'on-owner' : ''}`}>
              {userProfile.info.biography.length > 0 && <div className="user-biography" dangerouslySetInnerHTML={{
                __html: `<p>${userProfile.info.biography.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>`,
              }} />}

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

          <div className={`body-right ${userProfile.isAuthenticated ? 'on-auth' : ''}`}>
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
