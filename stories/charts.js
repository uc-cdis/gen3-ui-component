import React from 'react';
import { storiesOf } from '@storybook/react';
import SummaryHorizontalBarChart from '../src/components/charts/SummaryHorizontalBarChart';
import SummaryPieChart from '../src/components/charts/SummaryPieChart';
import SummaryChartGroup from '../src/components/charts/SummaryChartGroup';
import PercentageStackedBarChart from '../src/components/charts/PercentageStackedBarChart';
import VerticalBarChart from '../src/components/charts/VerticalBarChart';
import LineChart from '../src/components/charts/LineChart';

const virusData = [
  { name: 'H1N1', value: 4000 },
  { name: 'VN1203', value: 3000 },
  { name: 'HIV', value: 2800 },
  { name: 'HuCoV_EMC', value: 2000 },
  { name: 'SARS_CoV', value: 2708 },
  { name: 'CA04', value: 1890 },
];

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

const categoryBarChartData = [
  { name: 'NIC', value: 14 },
  { name: '<5', value: 30 },
  { name: '5-100', value: 45 },
  { name: '100-500', value: 80 },
  { name: '500+', value: 100 },
];

const lineChartData = [
  { name: '<50', value: 5000 },
  { name: '50', value: 6600 },
  { name: '60', value: 8000 },
  { name: '70', value: 14000 },
  { name: '80', value: 20000 },
  { name: '90+', value: 10000 },
];

const summaries = [
  { type: 'bar', title: 'Dose', data: categoryBarChartData },
  { type: 'pie', title: 'Dose', data: categoryBarChartData },
  { type: 'bar-vertical', title: 'Dose', data: categoryBarChartData },
  { type: 'bar', title: 'Age', data: lineChartData },
  { type: 'line', title: 'Age', data: lineChartData },
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
  { type: 'bar', title: 'Gender', data: genderData, chartIsEmpty: true },
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
    <SummaryHorizontalBarChart data={virusData} title='bar chart title' showPercentage={false} />
  ))
  .add('SummaryHorizontalBarChart with single color and percentage', () => (
    <SummaryHorizontalBarChart data={virusData} title='bar chart title' color='#3283c8' />
  ))
  .add('SummaryHorizontalBarChart with customized colors', () => (
    <SummaryHorizontalBarChart data={virusData} title='bar chart title' showPercentage={false} useCustomizedColorMap customizedColorMap={customizedColorMap} />
  ))
  .add('SummaryPieChart', () => (
    <SummaryPieChart data={virusData} title='pie chart title' showPercentage />
  ))
  .add('SummaryPieChart with customized colors', () => (
    <SummaryPieChart data={virusData} title='pie chart title' showPercentage useCustomizedColorMap customizedColorMap={customizedColorMap} />
  ))
  .add('SummaryChartGroup', () => (
    <SummaryChartGroup summaries={summaries} width={1240} />
  ))
  .add('SummaryChartGroup with only showing 2 at first', () => (
    <SummaryChartGroup summaries={summaries} width={1240} maximumDisplayItem={2} />
  ))
  .add('SummaryChartGroup with a Locked Chart', () => (
    <SummaryChartGroup summaries={lockedSummaries} width={1240} lockValue={-1} lockMessage='This chart is locked!' />
  ))
  .add('SummaryChartGroup with an Empty Chart', () => (
    <SummaryChartGroup summaries={summariesWithOneEmpty} width={1240} chartEmptyMessage='This chart is empty!' />
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
  ))
  .add('Bar Chart', () => (
    <VerticalBarChart data={categoryBarChartData} title='Bar chart' />
  ))
  .add('Line Chart', () => (
    <LineChart data={lineChartData} title='Line chart' />
  ));
