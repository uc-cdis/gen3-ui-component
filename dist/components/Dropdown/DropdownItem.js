'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropdownItem = function (_Component) {
  _inherits(DropdownItem, _Component);

  function DropdownItem() {
    _classCallCheck(this, DropdownItem);

    return _possibleConstructorReturn(this, (DropdownItem.__proto__ || Object.getPrototypeOf(DropdownItem)).apply(this, arguments));
  }

  _createClass(DropdownItem, [{
    key: 'handleClick',
    value: function handleClick() {
      if (this.props.disabled) {
        return;
      }
      this.props.onClick();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        {
          role: 'button',
          tabIndex: this.props.tabIndex,
          className: this.props.className + ' g3-dropdown__item ' + (this.props.disabled ? 'g3-dropdown__item--disabled' : ''),
          onClick: function onClick(e) {
            return _this2.handleClick(e);
          },
          onKeyPress: function onKeyPress(e) {
            return _this2.handleClick(e);
          }
        },
        this.props.leftIcon && _react2.default.createElement('i', { className: 'g3-icon g3-icon--sm g3-icon--' + this.props.leftIcon + ' g3-dropdown__item-icon g3-dropdown__item-icon--left' }),
        this.props.children,
        this.props.rightIcon && _react2.default.createElement('i', { className: 'g3-icon g3-icon--sm g3-icon--' + this.props.rightIcon + ' g3-dropdown__item-icon g3-dropdown__item-icon--right' })
      );
    }
  }]);

  return DropdownItem;
}(_react.Component);

DropdownItem.propTypes = {
  className: _propTypes2.default.string,
  leftIcon: _propTypes2.default.string,
  rightIcon: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  tabIndex: _propTypes2.default.number,
  disabled: _propTypes2.default.bool,
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]).isRequired
};

DropdownItem.defaultProps = {
  className: '',
  leftIcon: null,
  rightIcon: null,
  onClick: function onClick() {},
  disabled: false,
  tabIndex: 0 // override by Dropdown component
};

exports.default = DropdownItem;