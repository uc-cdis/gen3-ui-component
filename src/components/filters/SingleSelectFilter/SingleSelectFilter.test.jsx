import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SingleSelectFilter from '.';

describe('SingleSelectFilter', () => {
  const onSelect = jest.fn();

  it('renders checkbox input and calls onSelect when clicked', () => {
    const { container } = render(
      <SingleSelectFilter label="test1" onSelect={onSelect} hideZero={false} />,
    );

    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();

    fireEvent.click(input);
    expect(onSelect).toHaveBeenCalled();
  });
});
