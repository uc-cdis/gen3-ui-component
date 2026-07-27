import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RangeFilter from '.';

describe('RangeFilter', () => {
  const onDrag = jest.fn();
  const min = 0;
  const max = 100;

  it('renders range inputs', () => {
    const { container } = render(
      <RangeFilter min={min} max={max} onAfterDrag={onDrag} label='' />,
    );
    expect(container.querySelectorAll('input').length).toBeGreaterThan(0);
  });

  it('updates input values on user input and submit', () => {
    const { container } = render(
      <RangeFilter min={min} max={max} onAfterDrag={onDrag} label='' />,
    );

    const inputs = container.querySelectorAll('input');
    if (inputs.length >= 2) {
      const lowerInput = inputs[0];

      fireEvent.change(lowerInput, { target: { value: '30' } });
      fireEvent.blur(lowerInput);

      expect(lowerInput.value).toBe('30');
    }
  });

  it('clamps lowerBound value to min if below range', () => {
    const { container } = render(
      <RangeFilter min={min} max={max} onAfterDrag={onDrag} label='' />,
    );

    const inputs = container.querySelectorAll('input');
    if (inputs.length >= 2) {
      const lowerInput = inputs[0];

      fireEvent.change(lowerInput, { target: { value: String(min - 1) } });
      fireEvent.blur(lowerInput);

      expect(lowerInput.value).toBe(String(min));
    }
  });

  it('clamps upperBound value to max if above range', () => {
    const { container } = render(
      <RangeFilter min={min} max={max} onAfterDrag={onDrag} label='' />,
    );

    const inputs = container.querySelectorAll('input');
    if (inputs.length >= 2) {
      const upperInput = inputs[1];

      fireEvent.change(upperInput, { target: { value: String(max + 1) } });
      fireEvent.blur(upperInput);

      expect(upperInput.value).toBe(String(max));
    }
  });
});
