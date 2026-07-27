import React from 'react';
import { render } from '@testing-library/react';
import FilterList from '.';

describe('FilterList', () => {
  const filterOptions = [
    { text: 'test1', filterType: 'singleSelect' },
    { text: 'test2', filterType: 'singleSelect' },
    { text: 'test3', filterType: 'singleSelect' },
    { text: 'test4', filterType: 'range', min: 0, max: 100 },
  ];

  const filterSections = [
    { title: 'Section 1', options: [] },
    { title: 'Section 2', options: filterOptions },
  ];

  const onDrag = jest.fn();
  const onSelect = jest.fn();

  it('renders all filter sections', () => {
    const { container } = render(
      <FilterList sections={filterSections} onSelect={onSelect} onDrag={onDrag} />,
    );
    expect(container.querySelectorAll('.g3-filter-section').length).toBe(2);
  });

  it('hides empty filter sections when hideEmptyFilterSection is true', () => {
    const { container } = render(
      <FilterList
        sections={filterSections}
        onSelect={onSelect}
        onDrag={onDrag}
        hideEmptyFilterSection
      />,
    );
    expect(container.querySelectorAll('.g3-filter-section').length).toBe(1);
  });
});
