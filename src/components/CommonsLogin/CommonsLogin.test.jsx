import React from 'react';
import { render, screen } from '@testing-library/react';
import CommonsLogin from '.';
import kfLogo from '../../images/logos/kf-logo.png';

describe('<CommonsLogin />', () => {
  it('renders title and button', () => {
    render(
      <CommonsLogin
        title="KidsFirst"
        logoSrc={kfLogo}
        buttonTitle="Connect"
        onButtonClick={() => {}}
      />,
    );

    expect(screen.getByText('KidsFirst')).toBeInTheDocument();
    expect(screen.getByText('Connect')).toBeInTheDocument();
  });
});
