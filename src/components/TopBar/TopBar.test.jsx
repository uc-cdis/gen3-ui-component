import React from 'react';
import { render } from '@testing-library/react';
import { StaticRouter } from 'react-router-dom';
import TopBar from './TopBar';

const tabItems = [
  { iconClassName: 'g3-icon g3-icon--upload', link: '/submission', name: 'Data Submission' },
  { link: 'https://uc-cdis.github.io/gen3-user-doc/user-guide/guide-overview', name: 'Documentation' },
  { iconClassName: 'g3-icon g3-icon--exploration', link: '/explorer', name: 'Explorer' },
];

const user = { username: 'test-user' };
const onActiveTab = jest.fn();
const onLogout = jest.fn();

describe('<TopBar />', () => {
  it('renders correctly', () => {
    const { container } = render(
      <StaticRouter location={{ pathname: '/' }} context={{}}>
        <TopBar
          tabItems={tabItems}
          user={user}
          onActiveTab={onActiveTab}
          onLogout={onLogout}
        />
      </StaticRouter>,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('maps external and internal links properly', () => {
    const { container } = render(
      <StaticRouter location={{ pathname: '/' }} context={{}}>
        <TopBar
          tabItems={tabItems}
          user={user}
          onActiveTab={onActiveTab}
          onLogout={onLogout}
        />
      </StaticRouter>,
    );

    const anchorTags = container.querySelectorAll('a');
    expect(anchorTags.length).toBe(tabItems.length);
  });

  it('wont show the user button if user object is empty/undefined', () => {
    const { container } = render(
      <StaticRouter location={{ pathname: '/' }} context={{}}>
        <TopBar
          tabItems={tabItems}
          user={{}}
          onActiveTab={onActiveTab}
          onLogout={onLogout}
        />
      </StaticRouter>,
    );

    expect(container.querySelectorAll('button').length).toBe(0);
  });
});
