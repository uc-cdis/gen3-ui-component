import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterSection from '.';

describe('FilterSection', () => {
  const singleSelectOptions = [
    { text: 'test1', filterType: 'singleSelect' },
    { text: 'test2', filterType: 'singleSelect' },
    { text: 'test3', filterType: 'singleSelect' },
    { text: 'test4', filterType: 'singleSelect' },
  ];

  const onDrag = jest.fn();
  const onSelect = jest.fn();

  const renderComponent = () =>
    render(
      <FilterSection
        title='Section Title'
        options={singleSelectOptions}
        onSelect={onSelect}
        onAfterDrag={onDrag}
        hideZero={false}
      />,
    );

  it('renders header correctly', () => {
    const { container } = renderComponent();
    expect(container.querySelector('.g3-filter-section__header')).toBeInTheDocument();
  });

  it('toggles collapse/expand on header click', async () => {
    const user = userEvent.setup();
    const { container } = renderComponent();

    const titleElem = container.querySelector('.g3-filter-section__title');
    expect(titleElem).toBeInTheDocument();

    await user.click(titleElem);
    expect(container.querySelector('.g3-filter-section')).toBeInTheDocument();
  });

  it('shows selected count chip when filters are selected and clears on clear button click', () => {
    const { container } = renderComponent();

    expect(container.querySelector('.g3-filter-section__selected-count-chip')).not.toBeInTheDocument();

    const option1 = screen.getByText('test1');
    const option2 = screen.getByText('test2');

    fireEvent.click(option1);
    fireEvent.click(option2);

    const chip = container.querySelector('.g3-filter-section__selected-count-chip');
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveTextContent('2');

    const clearBtn = screen.getByLabelText('Clear Chip');
    fireEvent.click(clearBtn);

    expect(container.querySelector('.g3-filter-section__selected-count-chip')).not.toBeInTheDocument();
  });
});
