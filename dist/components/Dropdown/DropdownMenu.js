'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DropdownItem = require('./DropdownItem');

var _DropdownItem2 = _interopRequireDefault(_DropdownItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropdownMenu = function (_Component) {
  _inherits(DropdownMenu, _Component);

  function DropdownMenu() {
    _classCallCheck(this, DropdownMenu);

    return _possibleConstructorReturn(this, (DropdownMenu.__proto__ || Object.getPrototypeOf(DropdownMenu)).apply(this, arguments));
  }

  _createClass(DropdownMenu, [{
    key: 'render',
    value: function render() {
      var count = 0;
      return _react2.default.createElement(
        'div',
        { className: 'g3-dropdown__menu ' + (this.props.menuOpen ? 'g3-dropdown__menu--shown' : '') + ' ' + (this.props.className || '') },
        _react2.default.Children.map(this.props.children, function (child) {
          if (child.type === _DropdownItem2.default) {
            count += 1;
            return _react2.default.cloneElement(child, {
              tabIndex: count
            });
          }
          return child;
        })
      );
    }
  }]);

  return DropdownMenu;
}(_react.Component);

DropdownMenu.propTypes = {
  children: _propTypes2.default.any,
  className: _propTypes2.default.string,
  menuOpen: _propTypes2.default.bool
};

DropdownMenu.defaultProps = {
  children: '',
  className: '',
  menuOpen: false // override by Dropdown component
};

exports.default = DropdownMenu;