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
    const selected = (typeof this.props.selected === 'undefined') ? this.state.selected : this.props.selected;
    let inputDisabled = false;
    let lockIconComponent = <React.Fragment />;
    let countIconComponent = <React.Fragment />;


    if (!this.props.accessible) {
      lockIconComponent = <i className='g3-icon g3-icon--md g3-icon--lock g3-icon-color__gray' />;
    }

    if (this.props.count === this.props.hideValue) {
      countIconComponent = this.props.tierAccessLimit ? (
        <span className='g3-badge single-select-filter__count'>
          {this.props.tierAccessLimit}
          <i className='g3-icon--under g3-icon g3-icon--sm g3-icon-color__base-blue' />
        </span>
      ) : (
        <span className='single-select-filter__icon-background'>
          <i className='g3-icon--under g3-icon g3-icon--sm g3-icon-color__base-blue' />
        </span>
      );
      inputDisabled = true;
    } else if (this.props.accessible) {
      countIconComponent = <span className='g3-badge single-select-filter__count'>{this.props.count}</span>;
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
        {
          inputDisabled ? (
            <span
              className='single-select-filter__label single-select-filter__label--disabled'
              role='button'
              tabIndex={0}
            >
              {this.props.label}
            </span>
          ) : (
            <span
              className='single-select-filter__label'
              onClick={() => this.handleCheck()}
              onKeyPress={() => this.handleCheck()}
              role='button'
              tabIndex={0}
            >
              {this.props.label}
            </span>
          )
        }
        { countIconComponent }
        { lockIconComponent }
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
  tierAccessLimit: PropTypes.number,
  accessible: PropTypes.bool,
};

SingleSelectFilter.defaultProps = {
  selected: undefined,
  count: 0,
  hideZero: true,
  hideValue: -1,
  tierAccessLimit: undefined,
  accessible: true,
};

export default SingleSelectFilter;
