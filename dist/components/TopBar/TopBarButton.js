'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./TopBarButton.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TopBarButton = function TopBarButton(_ref) {
  var item = _ref.item,
      _ref$onActiveTab = _ref.onActiveTab,
      onActiveTab = _ref$onActiveTab === undefined ? function () {} : _ref$onActiveTab,
      _ref$isActive = _ref.isActive,
      isActive = _ref$isActive === undefined ? false : _ref$isActive,
      tabIndex = _ref.tabIndex;
  return _react2.default.createElement(
    'div',
    {
      className: isActive ? 'top-bar-button top-bar-button--active body' : 'top-bar-button body',
      onClick: onActiveTab,
      onKeyDown: onActiveTab,
      role: 'button',
      tabIndex: tabIndex
    },
    item.name,
    _react2.default.createElement('i', { className: item.iconClassName })
  );
};

TopBarButton.propTypes = {
  item: _propTypes2.default.object.isRequired,
  isActive: _propTypes2.default.bool,
  onActiveTab: _propTypes2.default.func,
  tabIndex: _propTypes2.default.number.isRequired
};

TopBarButton.defaultProps = {
  onActiveTab: function onActiveTab() {},
  isActive: false
};

exports.default = TopBarButton;