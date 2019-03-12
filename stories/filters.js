import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SingleSelectFilter from '../src/components/filters/SingleSelectFilter';
import RangeFilter from '../src/components/filters/RangeFilter';
import FilterSection from '../src/components/filters/FilterSection';
import FilterList from '../src/components/filters/FilterList';
import FilterGroup from '../src/components/filters/FilterGroup';

const projectOptions = [
  { text: 'ndh-CHARLIE', filterType: 'singleSelect', count: 123 },
  { text: 'ndh-dait-microbiome', filterType: 'singleSelect', count: 123 },
  { text: 'ndh-dmid-LMV', filterType: 'singleSelect', count: 123 },
  { text: 'ndh-vir-simulation', filterType: 'singleSelect', count: 123 },
  { text: 'ndh-test', filterType: 'singleSelect', count: 123 },
];

const studyOptions = [
  { text: 'MACS', filterType: 'singleSelect', count: 123 },
  { text: 'WIHS', filterType: 'singleSelect', count: 123 },
];

const genderOptions = [
  { text: 'Male', filterType: 'singleSelect', count: 123 },
  { text: 'Female', filterType: 'singleSelect', count: 123 },
];

const raceOptions = [
  { text: 'White', filterType: 'singleSelect', count: 123 },
  { text: 'Black', filterType: 'singleSelect', count: 123 },
  {
    text: 'American Indian or Alaskan Nativ',
    filterType: 'singleSelect',
    count: 123,
  },
  { text: 'Asian/Pacific Islander', filterType: 'singleSelect', count: 123 },
  { text: 'Multiracial', filterType: 'singleSelect', count: 123 },
  { text: 'Other', filterType: 'singleSelect', count: 123 },
];

const ethnicityOptions = [
  { text: 'Hispanic or Latino', filterType: 'singleSelect', count: 123 },
  { text: 'Not Hispanic or Latino', filterType: 'singleSelect', count: 123 },
  { text: 'Unknown', filterType: 'singleSelect', count: 123 },
];

const fileTypeOptions = [
  { text: 'mRNA Array', filterType: 'singleSelect', count: 123 },
  { text: 'Unaligned Reads', filterType: 'singleSelect', count: 123 },
  { text: 'Lipidomic MS', filterType: 'singleSelect', count: 123 },
  { text: 'Proteomic MS', filterType: 'singleSelect', count: 123 },
  { text: 'Metabolomic MS', filterType: 'singleSelect', count: 123 },
];

const fileCountOptions = [
  { min: 2, max: 97, filterType: 'range' },
];

const projectSections = [
  { title: 'Project', options: projectOptions },
  { title: 'Study', options: studyOptions },
];

const subjectSections = [
  { title: 'Gender', options: genderOptions },
  { title: 'Race', options: raceOptions },
  { title: 'Ethnicity', options: ethnicityOptions },
];

const fileSections = [
  { title: 'File Types', options: fileTypeOptions },
  { title: 'File Counts', options: fileCountOptions },
];

const tabs = [
  <FilterList key={0} sections={projectSections} />,
  <FilterList key={1} sections={subjectSections} />,
  <FilterList key={2} sections={fileSections} />,
];

const filterConfig = {
  tabs: [{
    title: 'Project',
    fields: [
      'project',
      'study',
    ],
  },
  {
    title: 'Subject',
    fields: [
      'race',
      'ethnicity',
      'gender',
    ],
  },
  {
    title: 'File',
    fields: [
      'file_type',
    ],
  }],
};

storiesOf('Filters', module)
  .add('SingleSelectFilter', () => (
    <div>
      <SingleSelectFilter label='Male' onSelect={action('checked')} />
      <SingleSelectFilter label='Female' onSelect={action('checked')} />
    </div>
  ))
  .add('RangeFilter', () => (
    <div>
      <RangeFilter
        label='Age'
        onAfterDrag={action('range change')}
        min={0}
        max={100}
      />
    </div>
  ))
  .add('FilterSection', () => (
    <FilterSection
      title={'Ethnicity'}
      options={ethnicityOptions}
      onSelect={action('checked')}
      onAfterDrag={action('range change')}
    />
  ))
  .add('FilterList', () => (
    <FilterList
      sections={subjectSections}
      onSelect={action('checked')}
      onAfterDrag={action('range change')}
    />
  ))
  .add('FilterGroup', () => (
    <FilterGroup
      tabs={tabs}
      filterConfig={filterConfig}
      onFilterChange={action('filter change')}
    />
  ));
