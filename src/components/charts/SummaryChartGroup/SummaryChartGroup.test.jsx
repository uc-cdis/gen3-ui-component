import React from 'react';
import { render, screen } from '@testing-library/react';
import SummaryChartGroup from '.';

jest.mock('../SummaryPieChart', () => {
  return function MockSummaryPieChart() {
    return <div data-testid="summary-pie-chart" />;
  };
});

jest.mock('../SummaryHorizontalBarChart', () => {
  return function MockSummaryHorizontalBarChart() {
    return <div data-testid="summary-bar-chart" />;
  };
});

describe('<SummaryChartGroup />', () => {
  const chartData = [
    { name: 'H1N1', value: 4000 },
    { name: 'VN1203', value: 3000 },
    { name: 'HIV', value: 2800 },
    { name: 'HuCoV_EMC', value: 2000 },
    { name: 'SARS_CoV', value: 2708 },
    { name: 'CA04', value: 1890 },
  ];

  const chartData1 = [
    { name: 'H1N1', value: 400 },
    { name: 'VN1203', value: 300 },
  ];

  const chartData2 = [
    { name: 'H1N1', value: 400 },
    { name: 'VN1203', value: 300 },
    { name: 'HIV', value: 300 },
  ];

  const summaries = [
    { type: 'bar', title: 'Gender', data: chartData1 },
    { type: 'pie', title: 'Birth-Year', data: chartData },
    { type: 'pie', title: 'Empty Pie', data: [] },
    { type: 'bar', title: 'Empty Bar', data: [] },
    { type: 'pie', title: 'Species', data: chartData1 },
    { type: 'bar', title: 'Race', data: chartData2 },
    { type: 'bar', title: 'Virus', data: chartData },
  ];

  it('renders without crashing', () => {
    const { container } = render(
      <SummaryChartGroup summaries={summaries} width={1010} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render 4 bar charts', () => {
    render(<SummaryChartGroup summaries={summaries} width={1010} />);
    expect(screen.getAllByTestId('summary-bar-chart')).toHaveLength(4);
  });

  it('should render 3 pie charts', () => {
    render(<SummaryChartGroup summaries={summaries} width={1010} />);
    expect(screen.getAllByTestId('summary-pie-chart')).toHaveLength(3);
  });
});
