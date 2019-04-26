import {
  BarChart, Bar, Tooltip, XAxis, YAxis,
  CartesianGrid, LabelList,
} from 'recharts';
import PropTypes from 'prop-types';
import React from 'react';
import helper from '../helper';
import './PercentageStackedBarChart.css';
import LockedContent from '../LockedContent';

const getPercentageDataLabels = chartData => chartData.map(entry => entry.name);

// FIXME: add back in animation (https://github.com/recharts/recharts/issues/1083)
class PercentageStackedBarChart extends React.Component {
  render() {
    if (helper.shouldHideChart(this.props.data, this.props.lockValue)) {
      return (
        <div className='percentage-bar-chart__locked'>
          <LockedContent lockMessage={this.props.lockMessage} />
        </div>
      );
    }
    const percentageData = helper.getPercentageData(
      this.props.data,
      this.props.percentageFixedPoint,
    );
    const percentageDataLabels = getPercentageDataLabels(this.props.data);
    const { barChartStyle, xAxisStyle, labelListStyle } = this.props;
    return (
      <div className='percentage-bar-chart'>
        <BarChart data={percentageData} {...barChartStyle}>
          <Tooltip />
          <CartesianGrid />
          <XAxis
            type='number'
            style={xAxisStyle}
            tickFormatter={helper.addPercentage}
            {...xAxisStyle}
          />
          <YAxis axisLine={false} tickLine={false} dataKey='name' type='category' hide />
          {
            percentageDataLabels.map((name, index) => (
              <Bar
                key={name}
                dataKey={name}
                stackId='a'
                isAnimationActive={false}
                fill={helper.getCategoryColor(index)}
              >
                <LabelList
                  dataKey={name}
                  position={labelListStyle.position}
                  style={labelListStyle}
                  formatter={helper.addPercentage}
                  className='percentage-bar-chart__label-list'
                />
              </Bar>
            ))
          }
        </BarChart>
        <div className='percentage-bar-chart__legend'>
          <ul>
            {
              percentageDataLabels.map((name, index) => (
                <li className='percentage-bar-chart__legend-item' key={`label-${name}`}>
                  <span
                    className='percentage-bar-chart__legend-color'
                    style={{
                      background: helper.getCategoryColor(index),
                    }}
                  />
                  <span className='percentage-bar-chart__legend-name'>
                    {name}
                  </span>
                  <span className='percentage-bar-chart__legend-value'>
                    {'('.concat(Number(this.props.data[index].value).toLocaleString()).concat(')')}
                  </span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

const ChartDataShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
});

PercentageStackedBarChart.propTypes = {
  data: PropTypes.arrayOf(ChartDataShape).isRequired,
  percentageFixedPoint: PropTypes.number,
  barChartStyle: PropTypes.object,
  xAxisStyle: PropTypes.object,
  labelListStyle: PropTypes.object,
  lockValue: PropTypes.number, // if one of the value is equal to `lockValue`, lock the chart
  lockMessage: PropTypes.string,
};

PercentageStackedBarChart.defaultProps = {
  percentageFixedPoint: 2,
  barChartStyle: {
    width: 510,
    height: 155,
    layout: 'vertical',
    margins: {
      top: 28,
      right: 12,
      bottom: 8,
      left: 12,
    },
    barSize: 30,
  },
  xAxisStyle: {
    fontSize: '10px',
    fontWeight: 600,
    lineHeight: '1em',
    letterSpacing: '.02rem',
    color: '#3283c8',
    axisLine: false,
    tickLine: false,
    ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    domain: [0, 100],
    tickMargin: 10,
  },
  labelListStyle: {
    fill: '#FFFFFF',
    fontSize: '14px',
    fontWeight: 600,
    position: 'center',
  },
  lockValue: -1,
  lockMessage: 'You cannot see this chart because it contains cohort under 1000 subjects',
};

export default PercentageStackedBarChart;
