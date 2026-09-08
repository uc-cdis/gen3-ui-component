import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterGroup from '.';
import FilterList from '../FilterList';

describe('FilterGroup', () => {
  const filterOptions = [
    { text: 'test1', filterType: 'singleSelect' },
    { text: 'test2', filterType: 'singleSelect' },
    { text: 'test3', filterType: 'singleSelect' },
    { text: 'test4', filterType: 'range', min: 0, max: 100 },
  ];

  const filterSections = [{ title: 'Section 1', options: filterOptions }];
  const filterSections2 = [{ title: 'Section 3', options: filterOptions }];
  const filterSections3 = [{ title: 'Section 5', options: filterOptions }];

  const tabs = [
    <FilterList key={0} sections={filterSections} />,
    <FilterList key={1} sections={filterSections2} />,
    <FilterList key={2} sections={filterSections3} />,
  ];

  const filterConfig = {
    tabs: [
      { title: 'Project', fields: ['project', 'study'] },
      { title: 'Subject', fields: ['race', 'ethnicity', 'gender', 'vital_status'] },
      { title: 'File', fields: ['file_type'] },
    ],
  };

  const renderFilterGroup = () =>
    render(
      <FilterGroup
        tabs={tabs}
        filterConfig={filterConfig}
        onFilterChange={jest.fn()}
      />,
    );

  it('renders without crashing', () => {
    const { container } = renderFilterGroup();
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays the correct number of tabs and tab titles', () => {
    const { container } = renderFilterGroup();
    const tabElems = container.querySelectorAll('.g3-filter-group__tab');
    const tabTitleElems = container.querySelectorAll('.g3-filter-group__tab-title');

    expect(tabElems.length).toBe(tabs.length);
    expect(tabTitleElems.length).toBe(3);

    filterConfig.tabs.forEach((tab, index) => {
      expect(tabTitleElems[index]).toHaveTextContent(tab.title);
    });
  });

  it('selects the tab and updates CSS selection class on click', () => {
    const { container } = renderFilterGroup();
    const tabElems = container.querySelectorAll('.g3-filter-group__tab');

    expect(tabElems[0]).toHaveClass('g3-filter-group__tab--selected');

    fireEvent.click(tabElems[2]);

    expect(tabElems[2]).toHaveClass('g3-filter-group__tab--selected');
  });
});
