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

  it('renders options added through props after mount', () => {
    component.setProps({
      options: [
        ...singleSelectOptions,
        { text: 'new option', filterType: 'singleSelect' },
      ],
    });
    component.update();

    const labels = component.find('.g3-single-select-filter__label')
      .map((node) => node.text());
    expect(labels).toContain('new option');
  });

  it('applies an active search to options added through props', () => {
    const searchInput = component.find('.g3-filter-section__search-input-box');
    searchInput.getDOMNode().value = 'test1';
    searchInput.simulate('change');
    component.update();

    expect(component.find('.g3-single-select-filter__label')
      .map((node) => node.text())).toEqual(['test1']);

    component.setProps({
      options: [
        ...singleSelectOptions,
        { text: 'another test1', filterType: 'singleSelect' },
        { text: 'unmatched option', filterType: 'singleSelect' },
        { text: 'constructor', filterType: 'singleSelect' },
        { text: '__proto__', filterType: 'singleSelect' },
      ],
    });
    component.update();

    expect(component.find('.g3-single-select-filter__label')
      .map((node) => node.text())).toEqual(['test1', 'another test1']);
  });

  it('renders a range option added to an initially empty section', () => {
    const rangeComponent = mount(
      <FilterSection
        title='Range Section'
        options={[]}
        onSelect={onSelect}
        onAfterDrag={onDrag}
      />,
    );

    rangeComponent.setProps({
      options: [{ min: 2, max: 97, filterType: 'range' }],
    });
    rangeComponent.update();

    expect(rangeComponent.find('.g3-range-filter')).toHaveLength(1);
  });
});
