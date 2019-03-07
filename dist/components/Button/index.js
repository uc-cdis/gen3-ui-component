"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rcTooltip = _interopRequireDefault(require("rc-tooltip"));

var _Spinner = _interopRequireDefault(require("../Spinner/Spinner"));

require("rc-tooltip/assets/bootstrap_white.css");

require("./Button.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Button =
/*#__PURE__*/
function (_Component) {
  _inherits(Button, _Component);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, _getPrototypeOf(Button).apply(this, arguments));
  }

  _createClass(Button, [{
    key: "handleClick",
    value: function handleClick(e) {
      if (this.props.enabled && this.props.onClick && !this.props.isPending) {
        this.props.onClick(e);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var buttonTypeClassName = !this.props.enabled || this.props.isPending ? 'g3-button--disabled' : "g3-button--".concat(this.props.buttonType);
      var otherAttrs = {};
      if (this.props.id) otherAttrs.id = this.props.id;
      if (this.props.value) otherAttrs.value = this.props.value;

      var button = _react.default.createElement("button", _extends({
        type: "button",
        className: "".concat(this.props.className, " g3-button ").concat(buttonTypeClassName),
        onClick: function onClick(e) {
          return _this.handleClick(e);
        }
      }, otherAttrs), this.props.leftIcon && _react.default.createElement("i", {
        className: "g3-icon g3-icon--sm g3-icon--".concat(this.props.leftIcon, " g3-button__icon g3-button__icon--left")
      }), this.props.label, this.props.rightIcon && !this.props.isPending ? _react.default.createElement("i", {
        className: "g3-icon g3-icon--sm g3-icon--".concat(this.props.rightIcon, " g3-button__icon g3-button__icon--right")
      }) : null, this.props.isPending ? _react.default.createElement("div", {
        className: "g3-button__spinner g3-button__icon--right"
      }, _react.default.createElement(_Spinner.default, null)) : null);

      return _react.default.createElement(_react.default.Fragment, null, this.props.tooltipEnabled ? _react.default.createElement(_rcTooltip.default, {
        placement: "bottom",
        overlay: this.props.tooltipText,
        arrowContent: _react.default.createElement("div", {
          className: "rc-tooltip-arrow-inner"
        })
      }, button) : button);
    }
  }]);

  return Button;
}(_react.Component);

Button.propTypes = {
  label: _propTypes.default.string.isRequired,
  buttonType: _propTypes.default.oneOf(['primary', 'secondary', 'default']),
  enabled: _propTypes.default.bool,
  className: _propTypes.default.string,
  onClick: _propTypes.default.func,
  leftIcon: _propTypes.default.string,
  rightIcon: _propTypes.default.string,
  type: _propTypes.default.oneOf(['button', 'submit', 'reset']),
  id: _propTypes.default.string,
  value: _propTypes.default.string,
  tooltipEnabled: _propTypes.default.bool,
  tooltipText: _propTypes.default.string,
  isPending: _propTypes.default.bool
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
  tooltipText: null,
  isPending: false
};
var _default = Button;
exports.default = _default;