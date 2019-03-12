import React from 'react';
import PropTypes from 'prop-types';
import './SingleSelectFilter.css';

class SingleSelectFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
    };
  }

  handleCheck() {
    this.setState(prevState => ({
      selected: !prevState.selected,
    }), () => {
      this.props.onSelect(this.props.label, this.state.selected);
    });
  }

  render() {
    return (
      <div className='single-select-filter'>
        <input
          className='single-select-filter__checkbox'
          type='checkbox'
          onChange={() => this.handleCheck()}
          checked={this.state.selected}
        />
        <p className='single-select-filter__label'>{this.props.label}</p>
        {
          (this.props.count === 0 && this.props.hideZero) ? null : (
            <span className='g3-badge single-select-filter__count'>{this.props.count}</span>
          )
        }
      </div>
    );
  }
}

SingleSelectFilter.propTypes = {
  label: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  count: PropTypes.number,
  hideZero: PropTypes.bool,
};

SingleSelectFilter.defaultProps = {
  selected: false,
  count: 0,
  hideZero: true,
};

export default SingleSelectFilter;
