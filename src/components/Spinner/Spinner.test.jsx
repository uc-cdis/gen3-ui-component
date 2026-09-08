import React from 'react';
import { render } from '@testing-library/react';
import Spinner from './Spinner';

it('Spinner displaying', () => {
  const { container } = render(<Spinner />);
  expect(container.querySelector('svg')).toBeInTheDocument();
  expect(container.querySelector('div')).toBeInTheDocument();
});
