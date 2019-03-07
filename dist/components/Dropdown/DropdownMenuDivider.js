"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropdownMenuDivider = function DropdownMenuDivider(props) {
  return _react.default.createElement("hr", {
    className: "g3-dropdown__menu-divider ".concat(props.className || '')
  });
};

DropdownMenuDivider.propTypes = {
  className: _propTypes.default.string
};
DropdownMenuDivider.defaultProps = {
  className: ''
};
var _default = DropdownMenuDivider;
exports.default = _default;