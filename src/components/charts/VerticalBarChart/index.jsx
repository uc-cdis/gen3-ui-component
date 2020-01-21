import PropTypes from 'prop-types';
import React from 'react';
import ReactEcharts from 'echarts-for-react';
import LockedContent from '../LockedContent';
import EmptyContent from '../EmptyContent';
import helper from '../helper';

class VerticalBarChart extends React.Component {
  getItemColor(index) {
    if (this.props.useCustomizedColorMap) {
      return this.props.customizedColorMap[index % this.props.customizedColorMap.length];
    }
    if (this.props.color) {
      return this.props.color;
    }
    return helper.getCategoryColor(index);
  }

  render() {
    const option = {
      xAxis: {
        type: 'category',
        data: this.props.data.map(d => d.name),
      },
      yAxis: {
        type: 'value',
      },
      series: [{
        data: this.props.data.map(d => d.value),
        type: 'bar',
      }],
      tooltip: {},
      color: this.props.color,
    };
    let chart;
    if (this.props.chartIsEmpty) {
      chart = (<EmptyContent message={this.props.chartEmptyMessage} />);
    } else if (helper.shouldHideChart(this.props.data, this.props.lockValue)) {
      chart = (<LockedContent lockMessage={this.props.lockMessage} />);
    } else {
      chart = (
        <ReactEcharts
          option={option}
        />
      );
    }
    return (
      <div className='summary-horizontal-bar-chart'>
        <div className='summary-horizontal-bar-chart__title-box'>
          <p className='summary-horizontal-bar-chart__title h4-typo'>
            {this.props.title}
          </p>
        </div>
        {chart}
      </div>
    );
  }
}

const ChartDataShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
});

VerticalBarChart.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(ChartDataShape).isRequired,
  color: PropTypes.string,
  useCustomizedColorMap: PropTypes.bool,
  customizedColorMap: PropTypes.arrayOf(PropTypes.string),
  lockValue: PropTypes.number, // if one of the value is equal to `lockValue`, lock the chart
  lockMessage: PropTypes.string,
  chartIsEmpty: PropTypes.bool,
  chartEmptyMessage: PropTypes.string,
};

VerticalBarChart.defaultProps = {
  color: '#3283c8',
  useCustomizedColorMap: false,
  customizedColorMap: ['#3283c8'],
  lockValue: -1,
  lockMessage: 'This chart is hidden because it contains fewer than 1000 subjects',
  chartIsEmpty: false,
  chartEmptyMessage: 'Cannot render this chart because some fields don\'t apply',
};

export default VerticalBarChart;
