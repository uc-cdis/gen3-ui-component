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
    };
  }

  onSliderChange(range) {
    this.setState({ lowerBound: range[0], upperBound: range[1] }, () => {
      if (this.props.onDrag) {
        this.props.onDrag(this.state.lowerBound, this.state.upperBound);
      }
    });
  }

  onAfterSliderChange(range) {
    this.setState({ lowerBound: range[0], upperBound: range[1] }, () => {
      if (this.props.onAfterDrag) {
        this.props.onAfterDrag(this.state.lowerBound, this.state.upperBound);
      }
    });
  }

  getNumberToFixed(num) {
    return Number.isInteger(num) ? num
      : Number.parseFloat((Number.parseFloat(num).toFixed(this.props.decimalDigitsLen)));
  }

  render() {
    const rangeMin = this.getNumberToFixed(this.props.min);
    const rangeMax = this.getNumberToFixed(this.props.max);
    const lowerBound = this.getNumberToFixed(this.state.lowerBound);
    const upperBound = this.getNumberToFixed(this.state.upperBound);
    return (
      <div className='range-filter'>
        <p className='range-filter__title'>{this.props.label}</p>
        <div className='range-filter__bounds'>
          <p className='range-filter__bound range-filter__bound--lower'>{lowerBound}</p>
          <p className='range-filter__bound range-filter__bound--higher'>{upperBound}</p>
        </div>
        <Range
          className='range-filter__slider'
          min={rangeMin}
          max={rangeMax}
          value={[lowerBound, upperBound]}
          onChange={e => this.onSliderChange(e)}
          onAfterChange={e => this.onAfterSliderChange(e)}
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
};

RangeFilter.defaultProps = {
  label: '',
  lowerBound: 0,
  upperBound: 0,
  onDrag: () => {},
  decimalDigitsLen: 2,
  rangeStep: 1,
};

export default RangeFilter;
