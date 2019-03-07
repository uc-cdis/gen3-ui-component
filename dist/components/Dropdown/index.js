"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DropdownButton = _interopRequireDefault(require("./DropdownButton"));

var _DropdownItem = _interopRequireDefault(require("./DropdownItem"));

var _DropdownMenu = _interopRequireDefault(require("./DropdownMenu"));

var _DropdownMenuDivider = _interopRequireDefault(require("./DropdownMenuDivider"));

require("./Dropdown.css");

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

var Dropdown =
/*#__PURE__*/
function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown(props) {
    var _this;

    _classCallCheck(this, Dropdown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dropdown).call(this, props));
    _this.state = {
      menuOpen: false
    };
    _this.menuTriggerElementRef = _react.default.createRef();
    return _this;
  }

  _createClass(Dropdown, [{
    key: "handleTriggerMenu",
    value: function handleTriggerMenu() {
      if (this.props.disabled) {
        return;
      }

      this.setState(function (state) {
        return {
          menuOpen: !state.menuOpen
        };
      });
    }
  }, {
    key: "closeMenu",
    value: function closeMenu() {
      this.setState({
        menuOpen: false
      });
    }
  }, {
    key: "handleWindowClick",
    value: function handleWindowClick(e) {
      if (!this.menuTriggerElementRef || !this.menuTriggerElementRef.current) {
        return;
      }

      if (!this.menuTriggerElementRef.current.contains(e.target)) {
        this.closeMenu();
      }
    }
  }, {
    key: "bindCancellingEvent",
    value: function bindCancellingEvent() {
      var _this2 = this;

      window.addEventListener('click', function (e) {
        return _this2.handleWindowClick(e);
      });
    }
  }, {
    key: "unbindCancellingEvent",
    value: function unbindCancellingEvent() {
      var _this3 = this;

      window.removeEventListener('click', function (e) {
        return _this3.handleWindowClick(e);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      if (this.state.menuOpen) {
        this.bindCancellingEvent();
      } else {
        this.unbindCancellingEvent();
      }

      return _react.default.createElement("div", {
        className: "g3-dropdown ".concat(this.props.disabled ? 'g3-dropdown--disabled' : '', " ").concat(this.props.className || '')
      }, _react.default.Children.map(this.props.children, function (child) {
        return _react.default.cloneElement(child, {
          handleTriggerMenu: function handleTriggerMenu(e) {
            return _this4.handleTriggerMenu(e);
          },
          menuOpen: _this4.state.menuOpen,
          afterClick: function afterClick(e) {
            return _this4.closeMenu(e);
          },
          menuTriggerElementRef: _this4.menuTriggerElementRef,
          buttonType: _this4.props.buttonType,
          disabled: _this4.props.disabled
        });
      }));
    }
  }]);

  return Dropdown;
}(_react.Component);

Dropdown.propTypes = {
  className: _propTypes.default.string,
  buttonType: _propTypes.default.oneOf(['primary', 'secondary', 'default']),
  disabled: _propTypes.default.bool,
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]).isRequired
};
Dropdown.defaultProps = {
  className: '',
  buttonType: 'primary',
  disabled: false
};
/**
* props:
*   - split(bool): if true, the trigger button is split
*   - label(stirng): label of the button
*   - onClick(func): onclick function, ignored when split=false (onClick=triggerMenu)
*   - className(string): class name
*   - disabled(bool): whether disabled
*/

Dropdown.Button = _DropdownButton.default;
/**
* Wrapper for a list of menu items
* props:
*   - className(string): class name
*/

Dropdown.Menu = _DropdownMenu.default;
/**
* props:
*   - className(string): class name
*   - leftIcon(string): left icon name
*   - rightIcon(string): right icon name
*   - onClick(func): onclick function
*   - disabled(bool): whether disabled
*/

Dropdown.Item = _DropdownItem.default;
Dropdown.MenuDivider = _DropdownMenuDivider.default;
var _default = Dropdown;
exports.default = _default;