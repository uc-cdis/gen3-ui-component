'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropdownMenuDivider = function DropdownMenuDivider(props) {
  return _react2.default.createElement('hr', {
    className: 'g3-dropdown__menu-divider ' + (props.className || '')
  });
};

DropdownMenuDivider.propTypes = {
  className: _propTypes2.default.string
};

DropdownMenuDivider.defaultProps = {
  className: ''
};

exports.default = DropdownMenuDivider;