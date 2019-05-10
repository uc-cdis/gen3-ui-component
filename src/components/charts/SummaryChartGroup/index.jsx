import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SummaryPieChart from '../SummaryPieChart';
import SummaryHorizontalBarChart from '../SummaryHorizontalBarChart';
import './SummaryChartGroup.css';
import helper from '../helper.js';

class SummaryChartGroup extends Component {
  render() {
    const width = helper.parseParamWidth(this.props.width);
    return (
      <div className='summary-chart-group' style={{ width }}>
        {
          this.props.summaries.map((item, index) => (
            <div className='summary-chart-group__column' key={item.title}>
              {
                index > 0 && <div className='summary-chart-group__column-left-border' />
              }
              {
                item.type === 'pie'
                  ? (
                    <SummaryPieChart
                      data={item.data}
                      title={item.title}
                      lockValue={this.props.lockValue}
                      lockMessage={this.props.lockMessage}
                    />
                  ) : (
                    <SummaryHorizontalBarChart
                      data={item.data}
                      title={item.title}
                      vertical
                      color={this.props.barChartColor}
                      lockValue={this.props.lockValue}
                      lockMessage={this.props.lockMessage}
                    />
                  )
              }
            </div>
          ))
        }
      </div>
    );
  }
}

SummaryChartGroup.propTypes = {
  summaries: PropTypes.arrayOf(PropTypes.object).isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  barChartColor: PropTypes.string,
  lockValue: PropTypes.number, // if one of the value is equal to `lockValue`, lock the chart
  lockMessage: PropTypes.string,
};

SummaryChartGroup.defaultProps = {
  width: '100%',
  barChartColor: '#3283c8',
  lockValue: -1,
  lockMessage: 'This chart is hidden because it contains fewer than 1000 subjects',
};

export default SummaryChartGroup;
