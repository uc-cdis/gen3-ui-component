import React from 'react';
import PropTypes from 'prop-types';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './RangeFilter.css';

class RangeFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lowerBound: props.lowerBound ? props.lowerBound : props.min,
      upperBound: props.upperBound ? props.upperBound : props.max,
      isDragging: false,
    };
  }

  onSliderChange(range) {
    this.setState(prevState => ({
      isDragging: true,
      lowerBound: (this.props.count === this.props.hideValue
        && prevState.lowerBound < range[0]) ? prevState.lowerBound : range[0],
      upperBound: (this.props.count === this.props.hideValue
        && prevState.upperBound > range[1]) ? prevState.upperBound : range[1],
    }),
    () => {
      if (this.props.onDrag) {
        this.props.onDrag(this.state.lowerBound, this.state.upperBound);
      }
    },
    );
  }

  onAfterSliderChange() {
    this.setState({ isDragging: false });
    if (this.props.onAfterDrag) {
      this.props.onAfterDrag(this.state.lowerBound, this.state.upperBound);
    }
  }

  getNumberToFixed(num) {
    return Number.isInteger(num) ? num
      : Number.parseFloat((Number.parseFloat(num).toFixed(this.props.decimalDigitsLen)));
  }

  render() {
    const rangeMin = this.getNumberToFixed(this.props.min);
    const rangeMax = this.getNumberToFixed(this.props.max);
    const lowerBound = this.state.isDragging ? this.state.lowerBound // eslint-disable-line
      : (this.props.lowerBound ? this.props.lowerBound : this.state.lowerBound);
    const upperBound = this.state.isDragging ? this.state.upperBound // eslint-disable-line
      : (this.props.upperBound ? this.props.upperBound : this.state.upperBound);
    const prettifiedLowerBound = this.getNumberToFixed(lowerBound);
    const prettifiedUpperBound = this.getNumberToFixed(upperBound);
    return (
      <div className='range-filter'>
        <p className='range-filter__title'>{this.props.label}</p>
        <div className='range-filter__bounds'>
          <p className='range-filter__bound range-filter__bound--lower'>{prettifiedLowerBound}</p>
          <p className='range-filter__bound range-filter__bound--higher'>{prettifiedUpperBound}</p>
        </div>
        <Range
          className='range-filter__slider'
          min={rangeMin}
          max={rangeMax}
          value={[prettifiedLowerBound, prettifiedUpperBound]}
          onChange={e => this.onSliderChange(e)}
          onAfterChange={() => this.onAfterSliderChange()}
          step={this.props.rangeStep}
        />
      </div>
    );
  }
}

RangeFilter.propTypes = {
  label: PropTypes.string,
  onDrag: PropTypes.func,
  onAfterDrag: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  lowerBound: PropTypes.number,
  upperBound: PropTypes.number,
  decimalDigitsLen: PropTypes.number,
  rangeStep: PropTypes.number,
  hideValue: PropTypes.number,
  count: PropTypes.number,
};

RangeFilter.defaultProps = {
  label: '',
  lowerBound: 0,
  upperBound: 0,
  onDrag: () => {},
  decimalDigitsLen: 2,
  rangeStep: 1,
  hideValue: -1,
  count: 0,
};

export default RangeFilter;
