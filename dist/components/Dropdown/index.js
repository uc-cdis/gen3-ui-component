'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DropdownButton = require('./DropdownButton');

var _DropdownButton2 = _interopRequireDefault(_DropdownButton);

var _DropdownItem = require('./DropdownItem');

var _DropdownItem2 = _interopRequireDefault(_DropdownItem);

var _DropdownMenu = require('./DropdownMenu');

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

var _DropdownMenuDivider = require('./DropdownMenuDivider');

var _DropdownMenuDivider2 = _interopRequireDefault(_DropdownMenuDivider);

require('./Dropdown.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropdown = function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

    _this.state = {
      menuOpen: false
    };
    _this.handleTriggerMenu = _this.handleTriggerMenu.bind(_this);
    _this.handleWindowClick = _this.handleWindowClick.bind(_this);
    _this.closeMenu = _this.closeMenu.bind(_this);
    _this.menuTriggerElementRef = _react2.default.createRef();
    return _this;
  }

  _createClass(Dropdown, [{
    key: 'handleTriggerMenu',
    value: function handleTriggerMenu() {
      if (this.props.disabled) {
        return;
      }
      this.setState(function (state) {
        return { menuOpen: !state.menuOpen };
      });
    }
  }, {
    key: 'closeMenu',
    value: function closeMenu() {
      this.setState({ menuOpen: false });
    }
  }, {
    key: 'handleWindowClick',
    value: function handleWindowClick(e) {
      if (!this.menuTriggerElementRef || !this.menuTriggerElementRef.current) {
        return;
      }
      if (!this.menuTriggerElementRef.current.contains(e.target)) {
        this.closeMenu();
      }
    }
  }, {
    key: 'bindCancellingEvent',
    value: function bindCancellingEvent() {
      window.addEventListener('click', this.handleWindowClick);
    }
  }, {
    key: 'unbindCancellingEvent',
    value: function unbindCancellingEvent() {
      window.removeEventListener('click', this.handleWindowClick);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.state.menuOpen) {
        this.bindCancellingEvent();
      } else {
        this.unbindCancellingEvent();
      }
      return _react2.default.createElement(
        'div',
        { className: 'g3-dropdown ' + (this.props.disabled ? 'g3-dropdown--disabled' : '') + ' ' + (this.props.className || '') },
        _react2.default.Children.map(this.props.children, function (child) {
          return _react2.default.cloneElement(child, {
            handleTriggerMenu: _this2.handleTriggerMenu,
            menuOpen: _this2.state.menuOpen,
            afterClick: _this2.closeMenu,
            menuTriggerElementRef: _this2.menuTriggerElementRef,
            buttonType: _this2.props.buttonType,
            disabled: _this2.props.disabled
          });
        })
      );
    }
  }]);

  return Dropdown;
}(_react.Component);

Dropdown.propTypes = {
  className: _propTypes2.default.string,
  buttonType: _propTypes2.default.oneOf(['primary', 'secondary']),
  disabled: _propTypes2.default.bool,
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]).isRequired
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
Dropdown.Button = _DropdownButton2.default;

/**
* Wrapper for a list of menu items
* props:
*   - className(string): class name
*/
Dropdown.Menu = _DropdownMenu2.default;

/**
* props:
*   - className(string): class name
*   - leftIcon(string): left icon name
*   - rightIcon(string): right icon name
*   - onClick(func): onclick function
*   - disabled(bool): whether disabled
*/
Dropdown.Item = _DropdownItem2.default;

Dropdown.MenuDivider = _DropdownMenuDivider2.default;

exports.default = Dropdown;