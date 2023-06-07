import React from 'react';
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
  { type: 'pie', title: 'Empty Pie', data: [] },
  { type: 'bar', title: 'Empty Bar', data: [] },
  { type: 'fullPie', title: 'Empty FullPie', data: [] },
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
    type: 'bar',
    title: 'Gender',
    data: [],
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

export default {
  title: 'Chart',
};

export const _SummaryHorizontalBarChart = () => (
  <SummaryHorizontalBarChart data={virusData} title="bar chart title" showPercentage={false} />
);

_SummaryHorizontalBarChart.story = {
  name: 'SummaryHorizontalBarChart',
};

export const SummaryHorizontalBarChartWithSingleColorAndPercentage = () => (
  <SummaryHorizontalBarChart data={virusData} title="bar chart title" color="#3283c8" />
);

SummaryHorizontalBarChartWithSingleColorAndPercentage.story = {
  name: 'SummaryHorizontalBarChart with single color and percentage',
};

export const SummaryHorizontalBarChartWithCustomizedColors = () => (
  <SummaryHorizontalBarChart
    data={virusData}
    title="bar chart title"
    showPercentage={false}
    useCustomizedColorMap
    customizedColorMap={customizedColorMap}
  />
);

SummaryHorizontalBarChartWithCustomizedColors.story = {
  name: 'SummaryHorizontalBarChart with customized colors',
};

export const _SummaryPieChart = () => (
  <SummaryPieChart data={virusData} title="pie chart title" showPercentage />
);

_SummaryPieChart.story = {
  name: 'SummaryPieChart',
};

export const SummaryPieChartWithCustomizedColors = () => (
  <SummaryPieChart
    data={virusData}
    title="pie chart title"
    showPercentage
    useCustomizedColorMap
    customizedColorMap={customizedColorMap}
  />
);

SummaryPieChartWithCustomizedColors.story = {
  name: 'SummaryPieChart with customized colors',
};

export const SummaryFullPieChart = () => (
  <SummaryPieChart data={virusData} title="pie chart title" innerRadius={0} showPercentage />
);

SummaryFullPieChart.story = {
  name: 'SummaryFullPieChart',
};

export const _SummaryChartGroup = () => <SummaryChartGroup summaries={summaries} width={1010} />;

_SummaryChartGroup.story = {
  name: 'SummaryChartGroup',
};

export const SummaryChartGroupWithOnlyShowing2AtFirst = () => (
  <SummaryChartGroup summaries={summaries} width={1010} maximumDisplayItem={2} />
);

SummaryChartGroupWithOnlyShowing2AtFirst.story = {
  name: 'SummaryChartGroup with only showing 2 at first',
};

export const SummaryChartGroupWithALockedChart = () => (
  <SummaryChartGroup
    summaries={lockedSummaries}
    width={1010}
    lockValue={-1}
    lockMessage="This chart is locked!"
  />
);

SummaryChartGroupWithALockedChart.story = {
  name: 'SummaryChartGroup with a Locked Chart',
};

export const SummaryChartGroupWithAnEmptyChart = () => (
  <SummaryChartGroup
    summaries={summariesWithOneEmpty}
    width={1010}
    chartEmptyMessage="This chart is empty!"
  />
);

SummaryChartGroupWithAnEmptyChart.story = {
  name: 'SummaryChartGroup with an Empty Chart',
};

export const _PercentageStackedBarChart = () => (
  <PercentageStackedBarChart data={virusData} title="percentage stacked bar chart title" />
);

_PercentageStackedBarChart.story = {
  name: 'PercentageStackedBarChart',
};

export const PercentageStackedBarChartWithCustomizedColors = () => (
  <PercentageStackedBarChart
    data={virusData}
    title="percentage stacked bar chart title"
    useCustomizedColorMap
    customizedColorMap={customizedColorMap}
  />
);

PercentageStackedBarChartWithCustomizedColors.story = {
  name: 'PercentageStackedBarChart with customized colors',
};

export const PercentageStackedBarChartLocked = () => (
  <PercentageStackedBarChart data={lockedVirus} title="percentage stacked bar chart title" />
);

PercentageStackedBarChartLocked.story = {
  name: 'PercentageStackedBarChart Locked',
};
