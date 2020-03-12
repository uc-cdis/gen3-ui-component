import React from 'react';
import PropTypes from 'prop-types';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './RangeFilter.css';

class RangeFilter extends React.Component {
  constructor(props) {
    super(props);
    // Set lowerBound and upperBound inputs to min or max if lower/upper bounds are
    // undefined or outside the range of [min, max]
    const lowerBoundInputValue = (props.lowerBound && props.lowerBound >= props.min)
      ? props.lowerBound
      : props.min;
    const upperBoundInputValue = (props.upperBound && props.upperBound <= props.max)
      ? props.upperBound
      : props.max;
    this.state = {
      lowerBound: props.lowerBound,
      upperBound: props.upperBound,
      lowerBoundInputValue,
      upperBoundInputValue,
    };
  }

  onSliderChange(range) {
    this.setState((prevState) => {
      const lowerBound = (this.props.count === this.props.hideValue
        && prevState.lowerBound < range[0])
        ? prevState.lowerBound
        : range[0];
      const upperBound = (this.props.count === this.props.hideValue
        && prevState.upperBound > range[1])
        ? prevState.upperBound
        : range[1];
      return {
        lowerBound,
        upperBound,
        lowerBoundInputValue: lowerBound,
        upperBoundInputValue: upperBound,
      };
    },
    () => {
      if (this.props.onDrag) {
        this.props.onDrag(this.state.lowerBound, this.state.upperBound);
      }
    },
    );
  }

  onAfterSliderChange() {
    if (this.props.onAfterDrag) {
      this.props.onAfterDrag(
        this.state.lowerBound,
        this.state.upperBound,
        this.props.min,
        this.props.max,
        this.props.rangeStep,
      );
    }
  }

  getNumberToFixed(num) {
    return Number.isInteger(num) ? num
      : Number.parseFloat((Number.parseFloat(num).toFixed(this.props.decimalDigitsLen)));
  }

  handleLowerBoundInputChange(ev) {
    this.setState({
      lowerBoundInputValue: ev.currentTarget.value,
    });
  }

  handleUpperBoundInputChange(ev) {
    this.setState({
      upperBoundInputValue: ev.currentTarget.value,
    });
  }

  handleLowerBoundInputBlur() {
    // Validate that this.state.lowerBound is a number
    let newLowerBound = Number.parseFloat(this.state.lowerBoundInputValue);
    if (Number.isNaN(newLowerBound)) {
      // If the validation fails, set lowerBoundInputValue to current lowerBound.
      this.setState(prevState => ({
        lowerBoundInputValue: prevState.lowerBound,
      }));
      return;
    }
    // Clamp newLowerBound to [min, upperBound]
    if (newLowerBound < this.props.min) {
      newLowerBound = this.props.min;
    }
    const upperBound = this.state.upperBound === undefined
      ? this.props.max
      : this.state.upperBound;
    if (newLowerBound > upperBound) {
      newLowerBound = upperBound;
    }

    // Set state.lowerBound to newLowerBound and call onAfterDrag
    this.setState({
      lowerBound: newLowerBound,
      lowerBoundInputValue: newLowerBound,
    }, () => {
      this.props.onAfterDrag(
        newLowerBound,
        this.state.upperBound,
        this.props.min,
        this.props.max,
        this.props.rangeStep,
      );
    });
  }

  handleUpperBoundInputBlur() {
    let newUpperBound = Number.parseFloat(this.state.upperBoundInputValue);
    if (Number.isNaN(newUpperBound)) {
      // If the value of the input cannot be parsed to a number,
      // reset upperBoundInputValue to previous upperBound.
      this.setState(prevState => ({
        upperBoundInputValue: prevState.upperBound,
      }));
      return;
    }
    // Clamp newUpperBound to [lowerBound, max]
    const lowerBound = this.state.lowerBound === undefined
      ? this.props.min
      : this.state.lowerBound;
    if (newUpperBound < lowerBound) {
      newUpperBound = lowerBound;
    }
    if (newUpperBound > this.props.max) {
      newUpperBound = this.props.max;
    }

    // Set state.upperBound to newUpperBound and call onAfterDrag
    this.setState({
      upperBound: newUpperBound,
      upperBoundInputValue: newUpperBound,
    }, () => {
      this.props.onAfterDrag(
        this.state.lowerBound,
        newUpperBound,
        this.props.min,
        this.props.max,
        this.props.rangeStep,
      );
    });
  }

  render() {
    const rangeMin = this.getNumberToFixed(this.props.min);
    const rangeMax = this.getNumberToFixed(this.props.max);

    const displayLowerBound = this.state.lowerBound === undefined
      ? rangeMin
      : this.getNumberToFixed(this.state.lowerBound);
    const displayUpperBound = this.state.upperBound === undefined
      ? rangeMax
      : this.getNumberToFixed(this.state.upperBound);

    const boundsAreUndefined = this.state.lowerBound === undefined
      && this.state.upperBound === undefined;

    return (
      <div className='g3-range-filter'>
        { this.props.label
          && <p className='g3-range-filter__title'>{this.props.label}</p>
        }
        <div className='g3-range-filter__bounds'>
          <input
            type='number'
            value={this.state.lowerBoundInputValue}
            onChange={ev => this.handleLowerBoundInputChange(ev)}
            onBlur={() => this.handleLowerBoundInputBlur()}
            className='g3-range-filter__bound g3-range-filter__bound--lower'
          />
          <input
            type='number'
            value={this.state.upperBoundInputValue}
            onChange={ev => this.handleUpperBoundInputChange(ev)}
            onBlur={() => this.handleUpperBoundInputBlur()}
            className='g3-range-filter__bound g3-range-filter__bound--lower'
          />
        </div>
        <Range
          className={`g3-range-filter__slider ${boundsAreUndefined ? 'g3-range-filter__slider--inactive' : ''}`}
          min={rangeMin}
          max={rangeMax}
          value={[displayLowerBound, displayUpperBound]}
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
  lowerBound: undefined,
  upperBound: undefined,
  onDrag: () => {},
  decimalDigitsLen: 2,
  rangeStep: 1,
  hideValue: -1,
  count: 0,
};

export default RangeFilter;
