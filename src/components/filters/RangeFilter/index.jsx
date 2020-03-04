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
      lowerBoundInputValue: props.lowerBound,
      upperBoundInputValue: props.upperBound,
      isDragging: false,
    };
  }

  // When component receives new props, update state.lowerBound and state.upperBound
  static getDerivedStateFromProps(props, prevState) {
    if (!prevState.isDragging) {
      return {
        lowerBound: props.lowerBound,
        upperBound: props.upperBound,
      };
    }
    return null;
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
      isDragging: true,
      lowerBoundInputValue: ev.currentTarget.value,
    });
  }

  handleLowerBoundInputBlur() {
    // Try to convert lowerBoundInputValue to number.
    // If the conversion succeeds, update state.lowerBound and call props.onAfterDrag.
    // If the conversion fails, reset state.lowerBoundInputValue to state.lowerBound.
    const newLowerBound = this.getNumberToFixed(this.state.lowerBoundInputValue);
    if (Number.isNaN(newLowerBound)) {
      this.setState(prevState => ({
        isDragging: false,
        lowerBoundInputValue: prevState.lowerBound,
      }));
      return;
    }

    this.setState(prevState => ({
      isDragging: false,
      lowerBound: this.getNumberToFixed(prevState.lowerBoundInputValue),
    }), () => {
      this.props.onAfterDrag(
        this.state.lowerBound,
        this.state.upperBound,
        this.props.min,
        this.props.max,
        this.props.rangeStep,
      );
    });
  }

  render() {
    const rangeMin = this.getNumberToFixed(this.props.min);
    const rangeMax = this.getNumberToFixed(this.props.max);

    let displayLowerBound = '';
    let displayUpperBound = '';
    const boundsAreUndefined = this.state.lowerBound === undefined
      || this.state.upperBound === undefined;
    if (boundsAreUndefined) {
      displayLowerBound = rangeMin;
      displayUpperBound = rangeMax;
    } else {
      const lowerBound = this.state.isDragging ? this.state.lowerBound // eslint-disable-line
        : (this.props.lowerBound ? this.props.lowerBound : this.state.lowerBound);
      const upperBound = this.state.isDragging ? this.state.upperBound // eslint-disable-line
        : (this.props.upperBound ? this.props.upperBound : this.state.upperBound);
      displayLowerBound = this.getNumberToFixed(lowerBound);
      displayUpperBound = this.getNumberToFixed(upperBound);
    }

    return (
      <div className='g3-range-filter'>
        { this.props.label
          && <p className='g3-range-filter__title'>{this.props.label}</p>
        }
        <div className='g3-range-filter__bounds'>
          <input
            type='number'
            value={displayLowerBound}
            onChange={ev => this.handleLowerBoundInputChange(ev)}
            onBlur={() => this.handleLowerBoundInputBlur()}
            className='g3-range-filter__bound g3-range-filter__bound--lower'
          />
          <input type='number' value={displayUpperBound} onBlur={() => this.handleLowerBoundInputBlur()} className='g3-range-filter__bound g3-range-filter__bound--higher' />
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
