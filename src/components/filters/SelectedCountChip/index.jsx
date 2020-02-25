import React from 'react';
import PropTypes from 'prop-types';

import './SelectedCountChip.css';

const SelectedCountChip = props => (
  <div className='g3-selected-count-chip'>
    <div className='g3-selected-count-chip__left'>
      <span className='g3-selected-count-chip__text-emphasis'>{props.count}</span>
      &nbsp;selected
    </div>
    <button className='g3-selected-count-chip__clear-btn' type='button' onClick={props.onClearButtonClick}>
      <i className='g3-icon g3-icon-color__gray g3-icon--sm g3-icon--cross' />
    </button>
  </div>
);

SelectedCountChip.propTypes = {
  count: PropTypes.number.isRequired,
  onClearButtonClick: PropTypes.func.isRequired,
};

export default SelectedCountChip;
