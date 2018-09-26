'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropdownMenuHeader = function DropdownMenuHeader(props) {
  return _react2.default.createElement(
    'div',
    {
      className: 'g3-dropdown__menu-header ' + (props.className || '')
    },
    props.children
  );
};

DropdownMenuHeader.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.any
};

DropdownMenuHeader.defaultProps = {
  className: '',
  children: ''
};

exports.default = DropdownMenuHeader;