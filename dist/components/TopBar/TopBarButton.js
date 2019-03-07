"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./TopBarButton.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TopBarButton = function TopBarButton(_ref) {
  var item = _ref.item,
      _ref$onActiveTab = _ref.onActiveTab,
      onActiveTab = _ref$onActiveTab === void 0 ? function () {} : _ref$onActiveTab,
      _ref$isActive = _ref.isActive,
      isActive = _ref$isActive === void 0 ? false : _ref$isActive,
      tabIndex = _ref.tabIndex;
  return _react.default.createElement("div", {
    className: isActive ? 'top-bar-button top-bar-button--active body' : 'top-bar-button body',
    onClick: onActiveTab,
    onKeyDown: onActiveTab,
    role: "button",
    tabIndex: tabIndex
  }, item.name, item.iconClassName ? _react.default.createElement("i", {
    className: "top-bar-button__icon ".concat(item.iconClassName)
  }) : null);
};

TopBarButton.propTypes = {
  item: _propTypes.default.shape({
    name: _propTypes.default.string.isRequired,
    iconClassName: _propTypes.default.string
  }).isRequired,
  isActive: _propTypes.default.bool,
  onActiveTab: _propTypes.default.func,
  tabIndex: _propTypes.default.number.isRequired
};
TopBarButton.defaultProps = {
  onActiveTab: function onActiveTab() {},
  isActive: false
};
var _default = TopBarButton;
exports.default = _default;