import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TopBarButton from './TopBarButton';

const internalLink = {
  iconClassName: 'g3-icon g3-icon--upload',
  link: '/submission',
  name: 'Data Submission',
};

const externalLink = {
  link: 'https://uc-cdis.github.io/gen3-user-doc/user-guide/guide-overview',
  name: 'Documentation',
};

const onActiveTab = jest.fn();

describe('<TopBarButton />', () => {
  it('renders component text', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <TopBarButton
          item={internalLink}
          onActiveTab={onActiveTab}
          tabIndex={0}
          isActive
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('Data Submission')).toBeInTheDocument();
  });

  it('applies the active class name based on isActive prop', () => {
    const { container: activeContainer } = render(
      <MemoryRouter initialEntries={['/']}>
        <TopBarButton
          item={internalLink}
          onActiveTab={onActiveTab}
          tabIndex={0}
          isActive
        />
      </MemoryRouter>,
    );
    expect(activeContainer.querySelector('.top-bar-button--active')).toBeInTheDocument();

    const { container: inactiveContainer } = render(
      <MemoryRouter initialEntries={['/']}>
        <TopBarButton
          item={externalLink}
          onActiveTab={onActiveTab}
          tabIndex={0}
        />
      </MemoryRouter>,
    );
    expect(inactiveContainer.querySelector('.top-bar-button--active')).not.toBeInTheDocument();
  });
});
