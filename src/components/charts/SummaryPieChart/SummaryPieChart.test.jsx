import React from 'react';
import { render, screen } from '@testing-library/react';
import SummaryPieChart from '.';

describe('<SummaryPieChart />', () => {
  const chartData = [
    { name: 'H1N1', value: 4000 },
    { name: 'VN1203', value: 3000 },
    { name: 'HIV', value: 2800 },
    { name: 'HuCoV_EMC', value: 2000 },
    { name: 'SARS_CoV', value: 2708 },
    { name: 'CA04', value: 1890 },
  ];

  it('renders title', () => {
    render(<SummaryPieChart title="test" data={chartData} />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('should render all pie sectors', () => {
    const { container } = render(<SummaryPieChart title="test" data={chartData} />);
    const pieSectors = container.querySelectorAll('.recharts-layer.recharts-pie-sector');
    expect(pieSectors.length).toBe(chartData.length);
  });

  it('should render all legend items', () => {
    const { container } = render(<SummaryPieChart title="test" data={chartData} />);
    const legendItems = container.querySelectorAll('.summary-pie-chart__legend-item');
    expect(legendItems.length).toBe(chartData.length);
  });
});
