'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DropdownToggle = require('./DropdownToggle');

var _DropdownToggle2 = _interopRequireDefault(_DropdownToggle);

var _DropdownItem = require('./DropdownItem');

var _DropdownItem2 = _interopRequireDefault(_DropdownItem);

var _DropdownMenu = require('./DropdownMenu');

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

var _DropdownMenuHeader = require('./DropdownMenuHeader');

var _DropdownMenuHeader2 = _interopRequireDefault(_DropdownMenuHeader);

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
    _this.handleToggle = _this.handleToggle.bind(_this);
    _this.handleWindowClick = _this.handleWindowClick.bind(_this);
    _this.closeMenu = _this.closeMenu.bind(_this);
    _this.toggleElementRef = _react2.default.createRef();
    return _this;
  }

  _createClass(Dropdown, [{
    key: 'handleToggle',
    value: function handleToggle() {
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
      if (!this.toggleElementRef || !this.toggleElementRef.current) {
        return;
      }
      if (!this.toggleElementRef.current.contains(e.target)) {
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
            handleToggle: _this2.handleToggle,
            menuOpen: _this2.state.menuOpen,
            afterClick: _this2.closeMenu,
            toggleElementRef: _this2.toggleElementRef,
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
  children: _propTypes2.default.any,
  className: _propTypes2.default.string,
  buttonType: _propTypes2.default.oneOf(['primary', 'secondary']),
  disabled: _propTypes2.default.bool
};

Dropdown.defaultProps = {
  children: '',
  className: '',
  buttonType: 'primary',
  disabled: false
};

Dropdown.Toggle = _DropdownToggle2.default;
Dropdown.Menu = _DropdownMenu2.default;
Dropdown.Item = _DropdownItem2.default;
Dropdown.MenuHeader = _DropdownMenuHeader2.default;
Dropdown.MenuDivider = _DropdownMenuDivider2.default;

exports.default = Dropdown;