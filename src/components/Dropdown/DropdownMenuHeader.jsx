import React from 'react';
import PropTypes from 'prop-types';

const DropdownMenuHeader = props => (
  <div
    className={`g3-dropdown__menu-header ${props.className || ''}`}
  >
    {props.children}
  </div>
);

DropdownMenuHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

DropdownMenuHeader.defaultProps = {
  className: '',
  children: '',
};

export default DropdownMenuHeader;
