import React from 'react';
import { render } from '@testing-library/react';
import Toaster from '.';

describe('<Toaster />', () => {
  it('updates when isEnabled prop changes', () => {
    const { container, rerender } = render(
      <Toaster isEnabled={false}>
        <div>Test</div>
      </Toaster>,
    );

    expect(container.querySelector('.toaster__div')).not.toBeInTheDocument();

    rerender(
      <Toaster isEnabled={true}>
        <div>Test</div>
      </Toaster>,
    );
    expect(container.querySelector('.toaster__div')).toBeInTheDocument();

    rerender(
      <Toaster isEnabled={false}>
        <div>Test</div>
      </Toaster>,
    );
    expect(container.querySelector('.toaster__div')).not.toBeInTheDocument();
  });
});
