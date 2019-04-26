import React from 'react';
import PropTypes from 'prop-types';
import './SingleSelectFilter.css';

class SingleSelectFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: typeof props.selected === 'undefined' ? false : props.selected,
    };
  }

  handleCheck() {
    this.setState(prevState => ({ selected: !prevState.selected }));
    this.props.onSelect(this.props.label);
  }

  render() {
    if (this.props.count === 0 && this.props.hideZero) {
      return null;
    }
    // Takes in parent component's selected or self state's selected
    const selected = typeof this.props.selected === 'undefined' ? this.state.selected : this.props.selected;
    let rightIcon;
    let inputDisabled = false;

    if (this.props.count === this.props.hideValue) {
      rightIcon = (
        <React.Fragment>
          <span className='g3-badge single-select-filter__count'>{this.props.hideLimit}</span>
          <i className='g3-icon g3-icon--md g3-icon--under g3-color__black' />
        </React.Fragment>
      );
      inputDisabled = true;
    } else {
      rightIcon = <span className='g3-badge single-select-filter__count'>{this.props.count}</span>;
    }

    if (this.props.displayLock) {
      rightIcon = <i className='g3-icon g3-icon--md g3-icon--lock g3-color__black' />;
    }

    return (
      <div className='single-select-filter'>
        <input
          className='single-select-filter__checkbox'
          type='checkbox'
          onChange={() => this.handleCheck()}
          checked={selected}
          disabled={inputDisabled}
        />
        <p className='single-select-filter__label'>{this.props.label}</p>
        { rightIcon }
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
  hideValue: PropTypes.number,
  hideLimit: PropTypes.number,
  displayLock: PropTypes.number,
};

SingleSelectFilter.defaultProps = {
  selected: undefined,
  count: 0,
  hideZero: true,
  hideValue: -1,
  hideLimit: 1000,
  displayLock: 0,
};

export default SingleSelectFilter;
