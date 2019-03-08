import React from 'react';
import PropTypes from 'prop-types';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './RangeFilter.css';

class RangeFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lowerBound: this.props.min,
      upperBound: this.props.max,
    };
  }

  onSliderChange(range) {
    this.setState({ lowerBound: range[0], upperBound: range[1] }, () => {
      if (this.props.onDrag) {
        this.props.onDrag(this.state.lowerBound, this.state.upperBound);
      }
    });
  }

  render() {
    return (
      <div className='range-filter'>
        <p className='range-filter__title'>{this.props.label}</p>
        <div className='range-filter__bounds'>
          <p className='range-filter__bound range-filter__bound--lower'>{this.state.lowerBound}</p>
          <p className='range-filter__bound range-filter__bound--higher'>{this.state.upperBound}</p>
        </div>
        <Range
          className='range-filter__slider'
          min={this.props.min}
          max={this.props.max}
          value={[this.state.lowerBound, this.state.upperBound]}
          onChange={e => this.onSliderChange(e)}
        />
      </div>
    );
  }
}

RangeFilter.propTypes = {
  label: PropTypes.string.isRequired,
  onDrag: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

export default RangeFilter;
