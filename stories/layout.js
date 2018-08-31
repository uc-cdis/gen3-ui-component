import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { StaticRouter } from 'react-router-dom';
import TopBar from '../src/components/TopBar/TopBar';

const topItems = [
  { iconClassName: 'g3-icon g3-icon--upload', link: '/submission', name: 'Data Submission' },
  { link: 'https://uc-cdis.github.io/gen3-user-doc/user-guide/guide-overview', name: 'Documentation' },
];

const user = {
  username: 'test-user',
};

storiesOf('Layout', module)
  .add('TopBar', () => (
    <StaticRouter location={{ pathname: '/' }} context={{}}>
      <TopBar
        topItems={topItems}
        user={user}
        onActiveTab={action('link-click')}
        onLogoutClick={action('logout')}
      />
    </StaticRouter>
  ));
