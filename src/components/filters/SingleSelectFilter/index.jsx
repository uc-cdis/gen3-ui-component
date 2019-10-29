import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';
import { FaInfoCircle } from 'react-icons/fa/';
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
    let inputDisabled = this.props.disabled;
    let lockIconComponent = <React.Fragment />;
    let countIconComponent = <React.Fragment />;
    let tooltipComponent = <React.Fragment />;

    if (!this.props.accessible) {
      lockIconComponent = <i className='g3-icon g3-icon--md g3-icon--lock g3-icon-color__gray' />;
    }

    if (this.props.count === this.props.hideValue) {
      countIconComponent = this.props.tierAccessLimit ? (
        <span className='g3-badge g3-single-select-filter__count'>
          {this.props.tierAccessLimit}
          <i className='g3-icon--under g3-icon g3-icon--sm g3-icon-color__base-blue' />
        </span>
      ) : (
        <span className='g3-single-select-filter__icon-background'>
          <i className='g3-icon--under g3-icon g3-icon--sm g3-icon-color__base-blue' />
        </span>
      );
      inputDisabled = true;
    } else if (this.props.accessible) {
      countIconComponent = <span className='g3-badge g3-single-select-filter__count'>{this.props.count}</span>;
    }

    const showToolTip = inputDisabled || !this.props.accessible;
    const newLineComponent = (inputDisabled && !this.props.accessible)
      ? <br /> : <React.Fragment />;
    const lockTooltipComponent = (!this.props.accessible) ? <span>{'Access to this resource is limited because you don\'t have permission'}</span> : <React.Fragment />;
    const disabledTooltipComponent = (inputDisabled) ? <span>{'Access to this resource is disabled because you don\'t have permission and it\'s total count is less than the access limit value'}</span> : <React.Fragment />;
    const tooltipOverlayComponent = (
      <div>
        {lockTooltipComponent}
        {newLineComponent}
        {disabledTooltipComponent}
      </div>
    );
    if (showToolTip) {
      tooltipComponent = (
        <React.Fragment>
          {
            <Tooltip
              placement='right'
              overlay={tooltipOverlayComponent}
              arrowContent={<div className='rc-tooltip-arrow-inner' />}
              trigger={['hover', 'focus']}
            >
              <FaInfoCircle className='g3-icon g3-icon--md g3-single-select-filter__tooltip-icon' style={{ cursor: 'pointer', verticalAlign: 'none' }} />
            </Tooltip>
          }
        </React.Fragment>
      );
    }

    return (
      <div className='g3-single-select-filter'>
        <input
          className='g3-single-select-filter__checkbox'
          type='checkbox'
          onChange={() => this.handleCheck()}
          checked={selected}
          disabled={inputDisabled}
        />
        {
          inputDisabled ? (
            <span
              className='g3-single-select-filter__label g3-single-select-filter__label--disabled'
              role='button'
              tabIndex={0}
            >
              {this.props.label}
            </span>
          ) : (
            <span
              className='g3-single-select-filter__label'
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
        { tooltipComponent }
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
  disabled: PropTypes.bool,
};

SingleSelectFilter.defaultProps = {
  selected: undefined,
  count: 0,
  hideZero: true,
  hideValue: -1,
  tierAccessLimit: undefined,
  accessible: true,
  disabled: false,
};

export default SingleSelectFilter;
