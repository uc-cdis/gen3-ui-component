import React from 'react';
import { render } from '@testing-library/react';
import Footer from '.';
import gen3Logo from '../../images/logos/gen3.png';

describe('<Footer />', () => {
  it('renders correctly', () => {
    const { container } = render(<Footer logoSrc={gen3Logo} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
