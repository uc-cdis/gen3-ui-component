import {
  PieChart, Pie, Tooltip, Cell,
} from 'recharts';
import PropTypes from 'prop-types';
import React from 'react';
import LockedContent from '../LockedContent';
import EmptyContent from '../EmptyContent';
import helper from '../helper';
import './SummaryPieChart.css';

class SummaryPieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
    };
  }

  getItemColor(index, tempDataArr) {
    const useTwoColors = tempDataArr.length === 2;
    if (useTwoColors) {
      return helper.getCategoryColorFrom2Colors(index);
    }
    if (this.props.useCustomizedColorMap) {
      return this.props.customizedColorMap[index % this.props.customizedColorMap.length];
    }
    return helper.getCategoryColor(index);
  }

  toggle() {
    this.setState(prevState => ({ showMore: !prevState.showMore }));
  }

  render() {
    const tempDataArr = [...this.props.data];
    let tempDataTotal = this.props.totalCount;
    // if chart is missing total add it
    const dataSum = tempDataArr.reduce((a, entry) => a + entry.value, 0);
    if (!tempDataTotal) {
      tempDataTotal = dataSum;

    // if chart is missing data add it
    } else if (tempDataTotal > dataSum) {
      tempDataArr.push({
        name: 'No Data',
        value: tempDataTotal - dataSum,
      });
      // sort data by value
      tempDataArr.sort((a, b) => b.value - a.value);
    }

    const pieChartData = helper.calculateChartData(
      tempDataTotal,
      tempDataArr,
      this.props.percentageFixedPoint,
    );
    const dataKey = helper.getDataKey(this.props.showPercentage);
    let chart = null;
    if (this.props.chartIsEmpty) {
      chart = (<EmptyContent message={this.props.chartEmptyMessage} />);
    } else if (helper.shouldHideChart(tempDataArr, this.props.lockValue)) {
      chart = <LockedContent lockMessage={this.props.lockMessage} />;
    } else {
      chart = (
        <div className='summary-pie-chart__body'>
          <div className='summary-pie-chart__legend'>
            {
              pieChartData.map((entry, index) => {
                if (this.state.showMore || index < this.props.maximumDisplayItem) {
                  return (
                    <div className='summary-pie-chart__legend-item' key={'text'.concat(entry.name)}>
                      <div className='summary-pie-chart__legend-item-name'>
                        {entry.name}
                      </div>
                      <div className='summary-pie-chart__legend-item-value form-special-number'>
                        <span className='summary-pie-chart__legend-item-value-number'>
                          { Number(entry.value).toLocaleString() }
                        </span>
                        <br />
                        <span className='summary-pie-chart__legend-item-value-percentage'>
                          (
                          { helper.percentageFormatter(this.props.showPercentage)(entry[dataKey]) }
                          )
                        </span>
                      </div>
                    </div>
                  );
                }
                return (<React.Fragment key={'text'.concat(entry.name)} />);
              })
            }
            {
              pieChartData.length > this.props.maximumDisplayItem ? (
                <React.Fragment>
                  {
                    this.state.showMore ? (
                      <div
                        className='summary-pie-chart__toggle g3-link'
                        onClick={() => this.toggle()}
                        onKeyPress={() => this.toggle()}
                        role='button'
                        tabIndex={0}
                      >
                        <span>Show less</span>
                      </div>
                    ) : (
                      <div
                        className='summary-pie-chart__toggle g3-link'
                        onClick={() => this.toggle()}
                        onKeyPress={() => this.toggle()}
                        role='button'
                        tabIndex={0}
                      >
                        {`And ${(pieChartData.length - this.props.maximumDisplayItem).toLocaleString()} more`}
                      </div>
                    )
                  }
                </React.Fragment>
              ) : (<React.Fragment />)
            }
          </div>
          <PieChart
            width={this.props.outerRadius * 2}
            height={this.props.outerRadius * 2}
            style={this.props.pieChartStyle}
          >
            <Pie
              dataKey={dataKey}
              isAnimationActive={false}
              data={pieChartData}
              innerRadius={this.props.innerRadius}
              outerRadius={this.props.outerRadius}
              fill={this.props.pieChartStyle.fill}
            >
              {
                pieChartData.map((entry, index) => (
                  <Cell
                    key={dataKey}
                    dataKey={dataKey}
                    fill={this.getItemColor(index, tempDataArr)}
                  />
                ))
              }
            </Pie>
            <Tooltip formatter={helper.percentageFormatter(this.props.showPercentage)} />
          </PieChart>
        </div>
      );
    }

    return (
      <div className='summary-pie-chart'>
        <div className='summary-pie-chart__title-box'>
          <p className='summary-pie-chart__title h4-typo'>{this.props.title}</p>
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

SummaryPieChart.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(ChartDataShape).isRequired,
  totalCount: PropTypes.number,
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
  showPercentage: PropTypes.bool,
  percentageFixedPoint: PropTypes.number,
  pieChartStyle: PropTypes.object,
  lockValue: PropTypes.number, // if one of the value is equal to `lockValue`, lock the chart
  lockMessage: PropTypes.string,
  useCustomizedColorMap: PropTypes.bool,
  customizedColorMap: PropTypes.arrayOf(PropTypes.string),
  maximumDisplayItem: PropTypes.number,
  chartIsEmpty: PropTypes.bool,
  chartEmptyMessage: PropTypes.string,
};

SummaryPieChart.defaultProps = {
  totalCount: null,
  innerRadius: 31.5,
  outerRadius: 43,
  showPercentage: true,
  percentageFixedPoint: 2,
  pieChartStyle: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '22px',
    fill: '#8884d8',
  },
  lockValue: -1,
  lockMessage: 'This chart is hidden because it contains fewer than 1000 subjects',
  useCustomizedColorMap: false,
  customizedColorMap: ['#3283c8'],
  maximumDisplayItem: 15,
  chartIsEmpty: false,
  chartEmptyMessage: 'Cannot render this chart because some fields don\'t apply',
};

export default SummaryPieChart;
