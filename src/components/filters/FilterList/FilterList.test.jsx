import React from 'react';
import { mount } from 'enzyme';
import FilterList from '.';

describe('FilterList', () => {
  const filterOptions = [
    { text: 'test1', filterType: 'singleSelect' },
    { text: 'test2', filterType: 'singleSelect' },
    { text: 'test3', filterType: 'singleSelect' },
    {
      text: 'test4',
      filterType: 'range',
      min: 0,
      max: 100,
    },
  ];

  const filterSections = [
    { title: 'Section 1', options: [] },
    { title: 'Section 2', options: filterOptions },
  ];

  const onDrag = jest.fn();
  const onSelect = jest.fn();
  const component = mount(
    <FilterList
      sections={filterSections}
      onSelect={onSelect}
      onDrag={onDrag}
    />,
  );
  const componentEmpty = mount(
    <FilterList
      sections={filterSections}
      onSelect={onSelect}
      onDrag={onDrag}
      hideEmptyFilterSection
    />,
  );

  it('renders', () => {
    expect(component.find(FilterList).length).toBe(1);
  });
  it('renders', () => {
    expect(component.find('.g3-filter-section').length).toBe(2);
  });
  it('renders', () => {
    expect(componentEmpty.find('.g3-filter-section').length).toBe(1);
  });
});
