"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

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

var DropdownItem =
/*#__PURE__*/
function (_Component) {
  _inherits(DropdownItem, _Component);

  function DropdownItem() {
    _classCallCheck(this, DropdownItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(DropdownItem).apply(this, arguments));
  }

  _createClass(DropdownItem, [{
    key: "handleClick",
    value: function handleClick() {
      if (this.props.disabled) {
        return;
      }

      this.props.onClick();
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return _react.default.createElement("div", {
        role: "button",
        tabIndex: this.props.tabIndex,
        className: "".concat(this.props.className, " g3-dropdown__item ").concat(this.props.disabled ? 'g3-dropdown__item--disabled' : ''),
        onClick: function onClick(e) {
          return _this.handleClick(e);
        },
        onKeyPress: function onKeyPress(e) {
          return _this.handleClick(e);
        }
      }, this.props.leftIcon && _react.default.createElement("i", {
        className: "g3-icon g3-icon--sm g3-icon--".concat(this.props.leftIcon, " g3-dropdown__item-icon g3-dropdown__item-icon--left")
      }), this.props.children, this.props.rightIcon && _react.default.createElement("i", {
        className: "g3-icon g3-icon--sm g3-icon--".concat(this.props.rightIcon, " g3-dropdown__item-icon g3-dropdown__item-icon--right")
      }));
    }
  }]);

  return DropdownItem;
}(_react.Component);

DropdownItem.propTypes = {
  className: _propTypes.default.string,
  leftIcon: _propTypes.default.string,
  rightIcon: _propTypes.default.string,
  onClick: _propTypes.default.func,
  tabIndex: _propTypes.default.number,
  disabled: _propTypes.default.bool,
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]).isRequired
};
DropdownItem.defaultProps = {
  className: '',
  leftIcon: null,
  rightIcon: null,
  onClick: function onClick() {},
  disabled: false,
  tabIndex: 0 // override by Dropdown component

};
var _default = DropdownItem;
exports.default = _default;