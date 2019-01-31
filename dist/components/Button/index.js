'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _rcTooltip = require('rc-tooltip');

var _rcTooltip2 = _interopRequireDefault(_rcTooltip);

require('rc-tooltip/assets/bootstrap_white.css');

require('./Button.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_Component) {
  _inherits(Button, _Component);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
  }

  _createClass(Button, [{
    key: 'handleClick',
    value: function handleClick(e) {
      if (this.props.enabled && this.props.onClick) {
        this.props.onClick(e);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var buttonTypeClassName = !this.props.enabled ? 'g3-button--disabled' : 'g3-button--' + this.props.buttonType;
      var otherAttrs = {};
      if (this.props.id) otherAttrs.id = this.props.id;
      if (this.props.value) otherAttrs.value = this.props.value;
      var button = _react2.default.createElement(
        'button',
        _extends({
          type: 'button',
          className: this.props.className + ' g3-button ' + buttonTypeClassName,
          onClick: function onClick(e) {
            return _this2.handleClick(e);
          }
        }, otherAttrs),
        this.props.leftIcon && _react2.default.createElement('i', { className: 'g3-icon g3-icon--sm g3-icon--' + this.props.leftIcon + ' g3-button__icon g3-button__icon--left' }),
        this.props.label,
        this.props.rightIcon && _react2.default.createElement('i', { className: 'g3-icon g3-icon--sm g3-icon--' + this.props.rightIcon + ' g3-button__icon g3-button__icon--right' })
      );

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        this.props.tooltipEnabled ? _react2.default.createElement(
          _rcTooltip2.default,
          {
            placement: 'bottom',
            overlay: this.props.tooltipText,
            arrowContent: _react2.default.createElement('div', { className: 'rc-tooltip-arrow-inner' })
          },
          button
        ) : button
      );
    }
  }]);

  return Button;
}(_react.Component);

Button.propTypes = {
  label: _propTypes2.default.string.isRequired,
  buttonType: _propTypes2.default.oneOf(['primary', 'secondary', 'default']),
  enabled: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  leftIcon: _propTypes2.default.string,
  rightIcon: _propTypes2.default.string,
  type: _propTypes2.default.oneOf(['button', 'submit', 'reset']),
  id: _propTypes2.default.string,
  value: _propTypes2.default.string,
  tooltipEnabled: _propTypes2.default.bool,
  tooltipText: _propTypes2.default.string
};

Button.defaultProps = {
  buttonType: 'primary',
  enabled: true,
  className: '',
  onClick: function onClick() {},
  leftIcon: null,
  rightIcon: null,
  type: 'button',
  id: null,
  value: null,
  tooltipEnabled: false,
  tooltipText: null
};

exports.default = Button;