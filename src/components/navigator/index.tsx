import React from 'react';
import { User } from '../../types';
import { checkAuthenticated } from '../../data/consts/data';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Reducers } from '../../data';
import { setCurrentPage } from '../../data/actions/general';
import Input from '../forms/input';
import Button from '../forms/button';
import './index.scss';

const Navigator: React.FC = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [checked, setChecked] = React.useState<boolean>(false);
  const location = useLocation();
  const general = useSelector((state: Reducers) => state.general);
  const dispatch = useDispatch();

  if (!user && !checked) {
    checkAuthenticated()
      .then((data) => {
        setUser(data.user);
        setChecked(true);
      }).catch(() => setChecked(true));

    return null;
  }

  const currentPage = location.pathname.split('/')[1] || 'index';
  if (!general.currentPage || !general.currentPage.length || general.currentPage !== currentPage) {
    dispatch(setCurrentPage(currentPage));
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

  return (
    <div className="nextChat-header nextChat-animation fadeInDown">
      <div className="header-left">
        <div className="nextChat-logo" text-color="Purple">
          NextChat
        </div>

        <div className="header-search">
          <div className="search-icon">
            <i className="fas fa-search" />
          </div>
          <input type="text" placeholder="Search in NextChat..." />
        </div>
      </div>
      <ul className="header-right">
        {!user && <>
          <div className="right-signin">
            <div className="one">
              <Input
                name="accountLogin"
                type="text"
                icon="fas fa-user"
                placeholder="Username or e-mail adress"
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
                extraProps={{
                  'text-color': 'White',
                }}
              />
            </div>
          </div>
        </>}
      </ul>
    </div>
  );
};

export default Navigator;
