import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';
import Account from './account';
import './index.scss';

const Verify: React.FC = () => {
  const match = useRouteMatch<{ type: string }>();

  if (match.params.type === 'account') {
    return <Account />
  }

  return (
    <div>
      Type: {match.params.type}
    </div>
  );
};

export default Verify;
