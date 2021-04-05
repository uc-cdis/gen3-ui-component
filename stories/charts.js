import React from 'react';
import { storiesOf } from '@storybook/react';
import SummaryHorizontalBarChart from '../src/components/charts/SummaryHorizontalBarChart';
import SummaryPieChart from '../src/components/charts/SummaryPieChart';
import SummaryChartGroup from '../src/components/charts/SummaryChartGroup';
import PercentageStackedBarChart from '../src/components/charts/PercentageStackedBarChart';

const virusData = [
  { name: 'H1N1', value: 4000 },
  { name: 'VN1203', value: 3000 },
  { name: 'HIV', value: 2800 },
  { name: 'HuCoV_EMC', value: 2000 },
  { name: 'SARS_CoV', value: 2708 },
  { name: 'CA04', value: 1890 },
];
const virusDataTotal = virusData.reduce((a, entry) => a + entry.value, 0);

const genderData = [
  { name: 'female', value: 400 },
  { name: 'male', value: 300 },
];

const birthData = [
  { name: '10-20', value: 400 },
  { name: '20-30', value: 300 },
  { name: '30-40', value: 300 },
];

const raceData = [
  { name: 'race1', value: 400 },
  { name: 'race2', value: 300 },
  { name: 'race3', value: 300 },
];

const speciesData = [
  { name: 'spicies1', value: 400 },
  { name: 'spicies2', value: 300 },
  { name: 'spicies3', value: 300 },
];

const bigSet = [];
const NUM_OPTIONS = 2000;
for (let i = 0; i < NUM_OPTIONS; i += 1) {
  bigSet.push({
    name: `item-${i}`,
    value: Math.random(),
  });
}

const summaries = [
  { type: 'bar', title: 'Gender', data: genderData },
  { type: 'pie', title: 'Birth-Year', data: birthData },
  { type: 'fullPie', title: 'Species', data: speciesData },
  { type: 'bar', title: 'Race', data: raceData },
  { type: 'bar', title: 'Virus', data: virusData },
  { type: 'bar', title: 'Big Set', data: bigSet },
];

const lockedVirus = [
  { name: 'H1N1', value: -1 },
  { name: 'VN1203', value: 3000 },
  { name: 'HIV', value: 2800 },
  { name: 'HuCoV_EMC', value: 2000 },
  { name: 'SARS_CoV', value: 2708 },
  { name: 'CA04', value: 1890 },
];

const lockedBirth = [
  { name: '10-20', value: -1 },
  { name: '20-30', value: 300 },
  { name: '30-40', value: 300 },
];

const lockedSummaries = [
  { type: 'bar', title: 'Gender', data: genderData },
  { type: 'pie', title: 'Birth-Year', data: lockedBirth },
  { type: 'pie', title: 'Species', data: speciesData },
  { type: 'bar', title: 'Race', data: raceData },
  { type: 'bar', title: 'Virus', data: lockedVirus },
];

const summariesWithOneEmpty = [
  {
    type: 'bar', title: 'Gender', data: genderData, chartIsEmpty: true,
  },
  { type: 'pie', title: 'Birth-Year', data: lockedBirth },
  { type: 'pie', title: 'Species', data: speciesData },
  { type: 'bar', title: 'Race', data: raceData },
  { type: 'bar', title: 'Virus', data: virusData },
];

const customizedColorMap = [
  '#c02f42',
  '#175676',
  '#59CD90',
  '#F2DC5D',
  '#40476D',
  '#FFA630',
  '#AE8799',
  '#1A535C',
  '#462255',
];

storiesOf('Chart', module)
  .add('SummaryHorizontalBarChart', () => (
    <SummaryHorizontalBarChart data={virusData} title='bar chart title' showPercentage={false} totalCount={virusDataTotal} />
  ))
  .add('SummaryHorizontalBarChart no total', () => (
    <SummaryHorizontalBarChart data={virusData} title='bar chart title' showPercentage={false} />
  ))
  .add('SummaryHorizontalBarChart with single color and percentage', () => (
    <SummaryHorizontalBarChart data={virusData} title='bar chart title' color='#3283c8' totalCount={virusDataTotal} />
  ))
  .add('SummaryHorizontalBarChart with customized colors', () => (
    <SummaryHorizontalBarChart data={virusData} title='bar chart title' showPercentage={false} useCustomizedColorMap customizedColorMap={customizedColorMap} totalCount={virusDataTotal} />
  ))
  .add('SummaryPieChart', () => (
    <SummaryPieChart data={virusData} title='pie chart title' showPercentage totalCount={virusDataTotal} />
  ))
  .add('SummaryPieChart no total', () => (
    <SummaryPieChart data={virusData} title='pie chart title' showPercentage />
  ))
  .add('SummaryPieChart missing data', () => (
    <SummaryPieChart data={virusData} title='pie chart title' showPercentage totalCount={virusDataTotal * 2} />
  ))
  .add('SummaryPieChart with customized colors', () => (
    <SummaryPieChart data={virusData} title='pie chart title' showPercentage useCustomizedColorMap customizedColorMap={customizedColorMap} totalCount={virusDataTotal} />
  ))
  .add('SummaryFullPieChart', () => (
    <SummaryPieChart data={virusData} title='pie chart title' innerRadius={0} showPercentage totalCount={virusDataTotal} />
  ))
  .add('SummaryChartGroup', () => (
    <SummaryChartGroup summaries={summaries} width={1010} />
  ))
  .add('SummaryChartGroup total set', () => (
    <SummaryChartGroup summaries={summaries} width={1010} totalCount={1000} />
  ))
  .add('SummaryChartGroup with only showing 2 at first', () => (
    <SummaryChartGroup summaries={summaries} width={1010} maximumDisplayItem={2} />
  ))
  .add('SummaryChartGroup with a Locked Chart', () => (
    <SummaryChartGroup summaries={lockedSummaries} width={1010} lockValue={-1} lockMessage='This chart is locked!' />
  ))
  .add('SummaryChartGroup with an Empty Chart', () => (
    <SummaryChartGroup summaries={summariesWithOneEmpty} width={1010} chartEmptyMessage='This chart is empty!' />
  ))
  .add('PercentageStackedBarChart', () => (
    <PercentageStackedBarChart data={virusData} title='percentage stacked bar chart title' />
  ))
  .add('PercentageStackedBarChart with customized colors', () => (
    <PercentageStackedBarChart
      data={virusData}
      title='percentage stacked bar chart title'
      useCustomizedColorMap
      customizedColorMap={customizedColorMap}
    />
  ))
  .add('PercentageStackedBarChart Locked', () => (
    <PercentageStackedBarChart data={lockedVirus} title='percentage stacked bar chart title' />
  ));
