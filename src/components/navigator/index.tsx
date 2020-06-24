import * as React from 'react';
import { checkAuthenticated } from '../../data/consts/data';
import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Reducers } from '../../data';
import { setCurrentPage, setSearchResults, setHeaderMessage, setAuthUser, setServiceWorker } from '../../data/actions/general';
import Input from '../forms/input';
import Button from '../forms/button';
import * as submits from './submits';
import './index.scss';

const Navigator: React.FC = () => {
  const [checked, setChecked] = React.useState<boolean>(false);
  const [checkedMessageTime, setCheckedMessageTime] = React.useState<boolean>(false);
  const [searchWord, setSearchWord] = React.useState<string>('');
  const [searchActive, setSearchActive] = React.useState<boolean>(false);
  const location = useLocation();
  const general = useSelector((state: Reducers) => state.general);
  const dispatch = useDispatch();

  if (!checked) {
    checkAuthenticated()
      .then((data) => dispatch(setAuthUser(data.user)))
      .catch(() => { });

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/assets/workers/sw.js')
        .then(async (register) => dispatch(setServiceWorker(register)))
        .catch(() => { });
    }

    setChecked(true);
    return null;
  }

  const currentPage = location.pathname.split('/')[1] || 'index';
  if (!general.currentPage || !general.currentPage.length || general.currentPage !== currentPage) {
    dispatch(setCurrentPage(currentPage));

    return null;
  }

  const isActive = (page: string): string => {
    if (page.startsWith('/')) {
      page = page.slice(1);
    }

    if (page.endsWith('/')) {
      page = page.slice(0, page.length - 1);
    }

    return general.currentPage === page ? 'active' : '';
  }

  const changePage = (page: string): void => {
    if (page.startsWith('/')) {
      page = page.slice(1);
    }

    if (page.endsWith('/')) {
      page = page.slice(0, page.length - 1);
    }

    dispatch(setCurrentPage(page));
  }

  const cancelSearch = (): void => {
    setSearchWord('');
    dispatch(setSearchResults([]));
  };

  if (general.auth_user && !general.header_message.left_time) {
    if (!general.auth_user.verified) {
      let data: {
        verify: string,
        button: 'true' | 'false',
      } = {
        verify: 'You need verified your account to enjoy our all features. Please check your e-mail or send a new code.',
        button: 'true',
      };

      if (general.auth_user.verified_sended) {
        data.verify = `The verification code was sent to your e-mail <b>${general.auth_user.email.slice(0, 3) + (general.auth_user.email.slice(4, general.auth_user.email.indexOf('@')).split('').map((_) => '*').join('')) + '@' + general.auth_user.email.split('@')[1]}</b>, please confirm it.`;
        data.button = 'false';
      }

      if (general.header_message.verify !== data.verify) {
        dispatch(setHeaderMessage(data));
      }
    }
  }

  if (general.header_message.left_time && general.header_message.left_time.length && !checkedMessageTime) {
    setTimeout(() => {
      dispatch(setHeaderMessage({}));

      if (!general.header_message.left_time) {
        setCheckedMessageTime(false);
      }
    }, Number(general.header_message.left_time) * 1000);

    setCheckedMessageTime(true);
  }

  return (
    <>
      <div className="nextChat-header nextChat-animation fadeInDown">
        <div className="header-left">
          <Link to="/" className="nextChat-logo" text-color="Purple">
            NextChat
          </Link>

          <div className={`header-search ${(searchActive && searchWord.length > 0) ? 'active' : ''}`} id="searchNavigatorBox">
            <div className="search-icon">
              <i className="fas fa-search" />
            </div>
            <input type="text" placeholder="Search in NextChat..." id="searchNavigatorInput" autoComplete="off" value={searchWord}
              onChange={(e) => { setSearchWord(e.target.value); setSearchActive(true); submits.submitSearch(); }} />
            <div className="search-cancel" onClick={() => cancelSearch()}>
              <i className="fas fa-times" />
            </div>
            <div className="search-content" id="searchNavigatorResults">
              {general.search_results.length === 0 && <p>No results for '{searchWord}'</p>}
              {general.search_results.length > 0 && general.search_results.map((user) => (
                <Link to={`/user/${user.username}`} key={`search_${user.id}_${user.username.toLowerCase()}`} onClick={() => setSearchActive(false)}>
                  <div className="user-avatar" style={{ backgroundImage: `url('${user.profile_image}')` }} />
                  <div className="user-info">
                    <div className="info-username text-hover" text-color="Purple">
                      {user.username}
                    </div>
                    {user.followers > 0 && <div className="info-followers">
                      {user.followers} follower{user.followers === 1 ? '' : 's'}
                    </div>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <ul className="header-right">
          {general.auth_user && <>
            <li className={isActive('dashboard') || isActive('index') || isActive('inicio')}>
              <Link to="/dashboard" onClick={() => changePage('dashboard')}>
                <i className="fas fa-home" />
                <span>Home</span>
              </Link>
            </li>
            <li><Link to="/messages">
              <i className="fas fa-bell" style={{ marginRight: '0', padding: '.25rem' }} />
              {general.notification_count > 0 && <div className="badge" />}
            </Link></li>
            <li><Link to={'/user/' + general.auth_user.username}>
              <div className="user-avatar" style={{ backgroundImage: 'url("' + general.auth_user.profile_image + '")' }} />
              <span>{general.auth_user.username}</span>
            </Link></li>
            <li className={isActive('messages')}><Link to="/messages" onClick={() => changePage('messages')}>
              <i className="fas fa-comments" />
              <span>Messages</span>
            </Link></li>
            <li className={isActive('settings')}><Link to="/settings" onClick={() => changePage('settings')}>
              <i className="fas fa-cog" style={{ marginRight: '0', padding: '.25rem' }} />
            </Link></li>
            <li><Link to="/signout">
              <i className="fas fa-sign-out-alt" style={{ marginRight: '0', padding: '.25rem' }} />
            </Link></li>
          </>}
          {!general.auth_user && <>
            <div className="right-signin" onKeyDown={(key) => key.keyCode === 13 && submits.submitSignIn()}>
              <div className="one">
                <Input
                  name="accountLogin"
                  type="text"
                  icon="fas fa-user"
                  placeholder="Username or e-mail adress"
                  message={true}
                />
              </div>
              <div className="two">
                <Input
                  name="passwordLogin"
                  type="password"
                  icon="fas fa-user-lock"
                  placeholder="••••••••"
                />
                <Button
                  name="forgot"
                  type="color"
                  color="Grey"
                  hoverColor="DEFAULT"
                  text="Forgot your account?"
                  as="Button"
                />
              </div>
              <div className="three">
                <Button
                  name="signin"
                  type="outline"
                  color="Purple"
                  hoverColor="DEFAULT"
                  text="Sign in"
                  as="Button"
                  onClick={() => submits.submitSignIn()}
                />
              </div>
              {(!isActive('index').length && !isActive('inicio').length) && <div style={{ marginLeft: '.5rem' }}>
                <Button
                  name="signup"
                  type="background"
                  color="Purple"
                  hoverColor="DEFAULT"
                  text="Sign up"
                  as="Link"
                  to="/"
                  extraProps={{
                    style: {
                      height: 'calc(2rem + 1px)',
                    },
                    'text-color': 'White',
                  }}
                />
              </div>}
            </div>
          </>}
        </ul>
      </div>
      {(general.auth_user && Object.keys(general.header_message).length > 0 && !isActive('verify').length) && (
        <div className="nextChat-header-message nextChat-animation fadeInDown" background-color={general.header_message.color || 'Purple'}>
          <p
            text-color="White"
            dangerouslySetInnerHTML={{
              __html: general.header_message.verify || general.header_message.message,
            }}
          />

          {(general.header_message.verify && general.header_message.button === 'true') && <Button
            name="verifyAccount"
            type="background"
            color="White"
            hoverColor="DEFAULT"
            text="Send verification"
            as="Button"
            extraProps={{
              'text-color': 'Purple',
            }}
            onClick={() => submits.submitVerifyAccount()}
          />}
        </div>
      )}
    </>
  );
};

export default Navigator;
