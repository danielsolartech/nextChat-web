import * as React from 'react';
import { GeneralState } from '../../data/reducers/general';
import { useSelector } from 'react-redux';
import { Reducers } from '../../data/';
import { Link } from 'react-router-dom';
import Form from '../../components/forms';
import Button from '../../components/forms/button';
import { User } from '../../types';
import { API_URL } from '../../data/consts/data';
import { submitSignUp } from './submits';
import Footer from '../../components/footer';
import './index.scss';

const Index: React.FC = () => {
  const [checked, setChecked] = React.useState<boolean>(false);
  const [followersTop, setFollowersTop] = React.useState<User[]>([]);
  const general: GeneralState = useSelector((state: Reducers) => state.general);

  if (!checked) {
    fetch(API_URL + 'tops/followers', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        if (data.status && data.data) {
          setFollowersTop(data.data);
        }

        setChecked(true);
      }).catch(() => setChecked(true));

    return null;
  }

  return (
    <>
      <div className="nextChat-index-page middle">
        {(general.currentPage === 'index' || general.currentPage === 'inicio') && <div className="index-left">
          <img src="/assets/images/index_image.svg" alt="Index image" className="nextChat-animation fadeInDown" />
          <div className="left-info nextChat-animation fadeInDown">
            <p>
              With <b text-color="Purple">NextChat</b> you can connect with others countries friends in real time.
              Send stickers, emojis, images or videos to them.
              Besides, make groups to connect some of your friends or workmates.
            </p>
            <div className="info-actions">
              <Button
                name="explore"
                type="background"
                color="Purple"
                hoverColor="DEFAULT"
                text="Explore"
                as="Link"
                to="/explore"
                extraProps={{
                  'text-color': 'White',
                }}
              />
              <Button
                name="news"
                type="color"
                color="Purple"
                hoverColor="DEFAULT"
                text="What's new?"
                as="Link"
                to="/news"
                extraProps={{
                  style: { backgroundColor: 'white' },
                }}
              />
            </div>
          </div>
        </div>}
      </div>
      <div className="nextChat-index-page middle">
        <div className="index-right nextChat-animation fadeInLeft" onKeyDown={(key) => key.keyCode === 13 && submitSignUp()}>
          <Form
            title="Sign up"
            description="If you do not have an account complete this form and sign up free."
            inputs={[
              {
                name: 'usernameRegister',
                type: 'text',
                icon: 'fas fa-user',
                label: 'Username',
                description: 'Your username will be how your friends or workmates find you in NextChat. It must be between 4 and 25 characters.',
                placeholder: 'Example: nextChat',
                message: true,
              },
              {
                name: 'emailRegister',
                type: 'email',
                icon: 'fas fa-envelope',
                label: 'E-mail address',
                description: 'You will use this e-mail address to verify your account and get more features.',
                placeholder: 'Example: info@nextchat.com',
                message: true,
              },
              {
                name: 'passwordRegister',
                type: 'password',
                icon: 'fas fa-user-lock',
                label: 'New password',
                description: 'Enter a new password for your account, you do not tell it with others because we are not responsable for your acts. It must be between 8 and 20 characters.',
                placeholder: '••••••••',
                message: true,
              },
              {
                name: 'repeatPasswordRegister',
                type: 'password',
                icon: 'fas fa-user-lock',
                label: 'Repeat your new password',
                description: 'It is only for security.',
                placeholder: '••••••••',
                message: true,
              },
              {
                name: 'genderRegister',
                type: 'radio',
                label: 'Gender',
                description: 'If you do not sure of what are you, so choose \'Other\' or you can choose the other options.',
                defaultChecked: 'otherGender',
                options: [
                  {
                    name: 'femaleGender',
                    value: 'F',
                    label: 'Female',
                    className: 'gender',
                  },
                  {
                    name: 'maleGender',
                    value: 'M',
                    label: 'Male',
                    className: 'gender',
                  },
                  {
                    name: 'otherGender',
                    value: 'U',
                    label: 'Other',
                    className: 'gender',
                  },
                ],
              }
            ]}
            extra={<p>
              If you click 'Sign up', will be accepting our
              {' '}
              <Link to="/terms" className="text-hover" text-color="Purple">Terms of Service</Link>
              {' and '}
              <Link to="/privacy" className="text-hover" text-color="Purple">Privacy Policy</Link>.
            </p>}
            submitButton={{
              name: 'signUp',
              type: 'background',
              color: 'Purple',
              hoverColor: 'DEFAULT',
              text: 'Sign Up',
              as: 'Button',
              extraProps: {
                'text-color': 'White',
              },
              onClick: () => submitSignUp(),
            }}
          />
        </div>
      </div>
      <div className="nextChat-index-page middle nextChat-animation fadeInLeft">
        <div className="index-feedbacks">
          <div className="feedbacks-title">
            Users feedbacks
          </div>
          <div className="feedbacks-content">
            <ul>
              <li>
                <div className="user-avatar" style={{ backgroundImage: 'url("https://danielsolartech.com/avatars/d.png")' }} />
                <div className="user-info">
                  <div className="info-feedback">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint obcaecati error ipsum aut suscipit omnis accusantium quisquam sed sit fugit ab, quibusdam aliquid placeat alias eligendi fuga saepe sunt cupiditate!
                  </div>
                  <a href="/" className="info-username">
                    danielsolartech
                  </a>
                </div>
              </li>
              <li>
                <div className="user-avatar" style={{ backgroundImage: 'url("https://danielsolartech.com/avatars/d.png")' }} />
                <div className="user-info">
                  <div className="info-feedback">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint obcaecati error ipsum aut suscipit omnis accusantium quisquam sed sit fugit ab, quibusdam aliquid placeat alias eligendi fuga saepe sunt cupiditate!
                  </div>
                  <a href="/" className="info-username">
                    danielsolartech
                  </a>
                </div>
              </li>
              <li>
                <div className="user-avatar" style={{ backgroundImage: 'url("https://danielsolartech.com/avatars/d.png")' }} />
                <div className="user-info">
                  <div className="info-feedback">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint obcaecati error ipsum aut suscipit omnis accusantium quisquam sed sit fugit ab, quibusdam aliquid placeat alias eligendi fuga saepe sunt cupiditate!
                  </div>
                  <a href="/" className="info-username">
                    danielsolartech
                  </a>
                </div>
              </li>
              <li>
                <div className="user-avatar" style={{ backgroundImage: 'url("https://danielsolartech.com/avatars/d.png")' }} />
                <div className="user-info">
                  <div className="info-feedback">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint obcaecati error ipsum aut suscipit omnis accusantium quisquam sed sit fugit ab, quibusdam aliquid placeat alias eligendi fuga saepe sunt cupiditate!
                  </div>
                  <a href="/" className="info-username">
                    danielsolartech
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <div className="feedback-buttons">
            <span className="active"></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div className="nextChat-index-page middle index-illustration nextChat-animation fadeInRight">
        <img src="/assets/images/index_image_1.svg" />
        <div className="illustration-top">
          <div className="top-title">
            Most followed users
          </div>
          {followersTop.length > 0 && followersTop.map((user) => (
            <a key={user.username} href={'/user/' + user.username}>
              <div className="user-avatar" style={{ backgroundImage: 'url("' + user.profile_image + '")' }} />
              <div className="user-info">
                <div className="info-username text-hover" text-color="Purple">
                  {user.username}
                </div>
                <div className="info-followers">
                  {user.followers} follower{user.followers === 1 ? '' : 's'}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Index;
