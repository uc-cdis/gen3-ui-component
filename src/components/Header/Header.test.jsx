import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '.';
import gen3Logo from '../../images/logos/gen3.png';

describe('<Header />', () => {
  it('renders title correctly', () => {
    render(<Header logoSrc={gen3Logo} title="Header" />);
    expect(screen.getByText('Header')).toBeInTheDocument();
  });
});
