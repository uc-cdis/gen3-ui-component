import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '.';

describe('<Button />', () => {
  it('renders correctly with label', () => {
    render(<Button label='test-button' />);
    expect(screen.getByText('test-button')).toBeInTheDocument();
  });
});
