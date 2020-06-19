import React from 'react';
import { User } from '../../types';
import { Link } from 'react-router-dom';
import './index.scss';

interface UsersProps {
  name: string;
  type: 'followers_top';
  users: User[];
  noData: string;
}

const Users: React.FC<UsersProps> = (props: UsersProps) => {
  return (
    <ul className="nextChat-users-box">
      {props.users.length === 0 && <p>{props.noData}</p>}
      {props.users.length > 0 && props.users.map((user: User) => (
        <li key={'users_' + name + '_' + user.id + '_' + user.username}>
          <a href={'/user/' + user.username} className="user-avatar" style={{ backgroundImage: 'url("' + user.profile_image + '")' }} />
          <div className="user-info">
            <Link to={'/user/' + user.username} className="info-username text-hover" text-color="Purple">
              {user.username}
            </Link>
            <div className="info-extra">
              {props.type === 'followers_top' && <div className="extra-icon">
                <i className="fas fa-users" />
                <span>{user.followers} follower{user.followers === 1 ? '' : 's'}</span>
              </div>}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Users;
