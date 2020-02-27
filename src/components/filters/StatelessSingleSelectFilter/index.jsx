import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';
import './SingleSelectFilter.css';

const StatelessSingleSelectFilter = (props) => {
  if (props.count === 0 && props.hideZero) {
    return null;
  }

  // Takes in parent component's selected or self state's selected
  let inputDisabled = props.disabled;
  let lockIconComponent = <React.Fragment />;
  let countIconComponent = <React.Fragment />;

  const showLockedTooltip = !props.accessible && props.lockedTooltipMessage !== '';

  if (!props.accessible) {
    lockIconComponent = <i className='g3-icon g3-icon--md g3-icon--lock g3-icon-color__gray' />;
    if (showLockedTooltip) {
      lockIconComponent = (
        <React.Fragment>
          {
            <Tooltip
              placement='right'
              overlay={<span>{props.lockedTooltipMessage}</span>}
              arrowContent={<div className='rc-tooltip-arrow-inner' />}
              trigger={['hover', 'focus']}
            >
              {lockIconComponent}
            </Tooltip>
          }
        </React.Fragment>
      );
    }
  }

  if (props.count === props.hideValue) {
    // we don't disable selected filters
    inputDisabled = !props.selected;
    countIconComponent = props.tierAccessLimit ? (
      <span className='g3-badge g3-single-select-filter__count'>
        {props.tierAccessLimit}
        <i className='g3-icon--under g3-icon g3-icon--sm g3-icon-color__base-blue' />
      </span>
    ) : (
      <span className='g3-single-select-filter__icon-background'>
        <i className='g3-icon--under g3-icon g3-icon--sm g3-icon-color__base-blue' />
      </span>
    );
    const showDisabledTooltip = inputDisabled && props.disabledTooltipMessage !== '';
    if (showDisabledTooltip) {
      countIconComponent = (
        <React.Fragment>
          {
            <Tooltip
              placement='right'
              overlay={<span>{props.disabledTooltipMessage}</span>}
              arrowContent={<div className='rc-tooltip-arrow-inner' />}
              trigger={['hover', 'focus']}
            >
              {countIconComponent}
            </Tooltip>
          }
        </React.Fragment>
      );
    }
  } else if (props.accessible) {
    countIconComponent = <span className='g3-badge g3-single-select-filter__count'>{props.count}</span>;
  }

  return (
    <div className='g3-single-select-filter'>
      <input
        className='g3-single-select-filter__checkbox'
        type='checkbox'
        onChange={props.onSelect}
        checked={props.selected}
        disabled={inputDisabled}
      />
      {
        inputDisabled ? (
          <span
            className='g3-single-select-filter__label g3-single-select-filter__label--disabled'
            role='button'
            tabIndex={0}
          >
            {props.label}
          </span>
        ) : (
          <span
            className='g3-single-select-filter__label'
            onClick={props.onSelect}
            onKeyPress={props.onSelect}
            role='button'
            tabIndex={0}
          >
            {props.label}
          </span>
        )
      }
      { countIconComponent }
      { lockIconComponent }
    </div>
  );
};

StatelessSingleSelectFilter.propTypes = {
  label: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  count: PropTypes.number,
  hideZero: PropTypes.bool,
  hideValue: PropTypes.number,
  tierAccessLimit: PropTypes.number,
  accessible: PropTypes.bool,
  disabled: PropTypes.bool,
  lockedTooltipMessage: PropTypes.string,
  disabledTooltipMessage: PropTypes.string,
};

StatelessSingleSelectFilter.defaultProps = {
  selected: undefined,
  count: 0,
  hideZero: true,
  hideValue: -1,
  tierAccessLimit: undefined,
  accessible: true,
  disabled: false,
  lockedTooltipMessage: '',
  disabledTooltipMessage: '',
};

export default StatelessSingleSelectFilter;
