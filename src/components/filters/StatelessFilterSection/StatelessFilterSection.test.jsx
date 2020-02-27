import React from 'react';
import { mount } from 'enzyme';
import StatelessFilterSection from '.';

describe('StatelessFilterSection', () => {
  const component = mount(
    <StatelessFilterSection
      title='Section Title'
    />,
  );

  it('renders', () => {
    expect(component.find(StatelessFilterSection).length).toBe(1);
  });

  it('toggles expand on click', () => {
    expect(component.instance().state.isExpanded).toBe(true);
    expect(component.find('.g3-filter-section__header').length).toBe(1);
    component.find('.g3-filter-section__title').simulate('click');
    expect(component.instance().state.isExpanded).toBe(false);
  });
});
