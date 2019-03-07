"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./DropdownButton.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DropdownButton =
/*#__PURE__*/
function (_Component) {
  _inherits(DropdownButton, _Component);

  function DropdownButton() {
    _classCallCheck(this, DropdownButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(DropdownButton).apply(this, arguments));
  }

  _createClass(DropdownButton, [{
    key: "handleClick",
    value: function handleClick() {
      if (this.props.disabled) {
        return;
      }

      this.props.onClick();
      this.props.afterClick();
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var wrapperDisableStatusClassName = this.props.disabled ? 'g3-dropdown-button__wrapper--disabled' : '';
      var buttonTypeClassName = "g3-dropdown-button__button--".concat(this.props.buttonType);
      var buttonIsSplitClassName = this.props.split ? 'g3-dropdown-button__button--with-split-trigger' : 'g3-dropdown-button__button--without-split-trigger';
      var menuTriggerButtonTypeClassName = "g3-dropdown-button__menu-trigger--".concat(this.props.buttonType);
      return _react.default.createElement("div", {
        ref: this.props.menuTriggerElementRef,
        className: "g3-dropdown-button__wrapper ".concat(wrapperDisableStatusClassName, " ").concat(this.props.className || '')
      }, _react.default.createElement("button", {
        type: "button",
        className: "g3-dropdown-button__button ".concat(buttonIsSplitClassName, " ").concat(buttonTypeClassName),
        onClick: this.props.split ? function (e) {
          return _this.handleClick(e);
        } : this.props.handleTriggerMenu,
        label: this.props.label
      }, this.props.children, this.props.split || _react.default.createElement("i", {
        className: "g3-dropdown-button__icon"
      })), this.props.split && _react.default.createElement("button", {
        type: "button",
        className: "g3-dropdown-button__menu-trigger ".concat(menuTriggerButtonTypeClassName),
        onClick: this.props.handleTriggerMenu
      }, _react.default.createElement("i", {
        className: "g3-dropdown-button__icon ".concat(this.props.menuOpen ? 'g3-dropdown-button__icon--menu-opened' : '')
      })));
    }
  }]);

  return DropdownButton;
}(_react.Component);

DropdownButton.propTypes = {
  split: _propTypes.default.bool,
  className: _propTypes.default.string,
  label: _propTypes.default.string,
  onClick: _propTypes.default.func,
  handleTriggerMenu: _propTypes.default.func,
  menuOpen: _propTypes.default.bool,
  afterClick: _propTypes.default.func,
  menuTriggerElementRef: _propTypes.default.object,
  buttonType: _propTypes.default.oneOf(['primary', 'secondary']),
  disabled: _propTypes.default.bool,
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]).isRequired
};
DropdownButton.defaultProps = {
  split: false,
  className: '',
  label: 'Dropdown Button',
  onClick: function onClick() {},
  buttonType: 'primary',
  // override by Dropdown component:
  handleTriggerMenu: function handleTriggerMenu() {},
  menuOpen: false,
  afterClick: function afterClick() {},
  menuTriggerElementRef: {},
  disabled: false
};
var _default = DropdownButton;
exports.default = _default;