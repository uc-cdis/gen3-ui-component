import React from 'react';
import PropTypes from 'prop-types';

import './SelectedCountChip.css';

const SelectedCountChip = props => (
  <div className='g3-selected-count-chip'>
    <div className='g3-selected-count-chip__left'>
      <span className='g3-selected-count-chip__text-emphasis'>{props.count}</span>
      &nbsp;selected
    </div>
    <div
      className='g3-selected-count-chip__clear-btn'
      role='button'
      tabIndex={0}
      onClick={props.onClearButtonClick}
      onKeyPress={props.onClearButtonClick}
    >
      <i className='g3-icon g3-icon--sm g3-icon-color__lightgray g3-icon--sm g3-icon--cross' />
    </div>
  </div>
);

SelectedCountChip.propTypes = {
  count: PropTypes.number.isRequired,
  onClearButtonClick: PropTypes.func.isRequired,
};

export default SelectedCountChip;
