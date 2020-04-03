import React from 'react';
import { mount } from 'enzyme';
import FilterSection from '.';

describe('FilterSection', () => {
  const singleSelectOptions = [
    { text: 'test1', filterType: 'singleSelect' },
    { text: 'test2', filterType: 'singleSelect' },
    { text: 'test3', filterType: 'singleSelect' },
    { text: 'test4', filterType: 'singleSelect' },
  ];

  const rangeFilterOption = [
    {
      text: 'test2',
      filterType: 'range',
      min: 0,
      max: 100,
    },
  ];

  const onDrag = jest.fn();
  const onSelect = jest.fn();
  let component;
  beforeEach(() => {
    component = mount(
      <FilterSection
        title='Section Title'
        options={singleSelectOptions}
        onSelect={onSelect}
        onAfterDrag={onDrag}
        hideZero={false}
      />,
    );
  });

  it('renders', () => {
    expect(component.find(FilterSection).length).toBe(1);
  });

  it('picks the right kind of filter to display', () => {
    expect(component.find('.g3-single-select-filter').length).toBe(singleSelectOptions.length);
    expect(component.find('.g3-range-filter').length).toBe(0);
    const rangeFilterComponent = mount(
      <FilterSection
        title='Section Title'
        options={rangeFilterOption}
        onSelect={onSelect}
        onAfterDrag={onDrag}
        hideZero={false}
      />,
    );
    expect(rangeFilterComponent.find('.g3-single-select-filter').length).toBe(0);
    expect(rangeFilterComponent.find('.g3-range-filter').length).toBe(1);
  });

  it('toggles expand on click', () => {
    expect(component.instance().state.isExpanded).toBe(true);
    expect(component.find('.g3-filter-section__header').length).toBe(1);
    component.find('.g3-filter-section__title').simulate('click');
    expect(component.instance().state.isExpanded).toBe(false);
  });

  it('shows the number of currently selected filters', () => {
    // expect the filterChip to not be shown
    expect(component.find('.g3-filter-section__selected-count-chip').length).toBe(0);

    // select two options
    const option1 = singleSelectOptions[0];
    const option2 = singleSelectOptions[1];
    component.instance().handleSelectSingleSelectFilter(option1.text);
    component.instance().handleSelectSingleSelectFilter(option2.text);

    // expect the filterChip to appear
    component.update();
    expect(component.find('.g3-filter-section__selected-count-chip').length).toBe(1);
    // expect the filterChip to display that 2 filters are selected
    const filterChip = component.find('.g3-filter-section__selected-count-chip').first();
    expect(filterChip.find('.g3-filter-section__selected-count-chip-text-emphasis').first().instance().text === '2');
  });

  it('clears all selected filters on clear button click', () => {
    // select two options
    const option1 = singleSelectOptions[0];
    const option2 = singleSelectOptions[1];
    component.instance().handleSelectSingleSelectFilter(option1.text);
    component.instance().handleSelectSingleSelectFilter(option2.text);

    // expect options to be selected
    expect(component.state('filterStatus')).toEqual({
      [option1.text]: true,
      [option2.text]: true,
    });

    // click the clear button
    const mockEvent = { stopPropagation: () => {} };
    component.instance().handleClearButtonClick(mockEvent);

    // expect all options to be unselected
    expect(component.state('filterStatus')).toEqual({});
  });

  it('does not display singleSelectFilter options with a count of -1', () => {
    const options = [
      { text: 'test1', filterType: 'singleSelect', count: -1 },
      { text: 'test2', filterType: 'singleSelect', count: 1 },
    ];
    component = mount(
      <FilterSection
        title='Section Title'
        options={options}
        onSelect={onSelect}
        onAfterDrag={onDrag}
        hideZero={false}
      />);

    // expect filter to only display one option
    expect(component.find('.g3-single-select-filter').length).toBe(1);
  });

  it('does not display options with a count of 0 if hideZero is true', () => {
    const options = [
      { text: 'test1', filterType: 'singleSelect', count: 0 },
      { text: 'test2', filterType: 'singleSelect', count: 1 },
    ];
    component = mount(
      <FilterSection
        title='Section Title'
        options={options}
        onSelect={onSelect}
        onAfterDrag={onDrag}
        hideZero
      />);

    // expect filter to only display one option
    expect(component.find('.g3-single-select-filter').length).toBe(1);
  });

  it('filters options through the search input', (done) => {
    const searchTerm = 'searchTerm';
    const options = [
      { text: `contains-${searchTerm}`, filterType: 'singleSelect', count: 1 },
      { text: `${searchTerm}-found-here`, filterType: 'singleSelect', count: 2 },
      { text: `h-hewwo? ${searchTerm}?`, filterType: 'singleSelect', count: 2 },
      { text: 'just-some-other-text', filterType: 'singleSelect', count: 3 },
    ];
    component = mount(
      <FilterSection
        title='Section Title'
        options={options}
        onSelect={onSelect}
        onAfterDrag={onDrag}
      />);

    // expect filter to display all the options before search changes
    expect(component.find('.g3-single-select-filter').length).toBe(4);

    // Enter a search term
    component.instance().handleSearchInputChange({ currentTarget: { value: searchTerm } });
    // After a delay, expect the filter to only display the filters with the search term.
    setTimeout(() => {
      component.update();
      expect(component.find('.g3-single-select-filter').length).toBe(3);
      done();
    }, 1000);
  });
});
