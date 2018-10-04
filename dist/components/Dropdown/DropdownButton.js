'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./DropdownButton.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropdownButton = function (_Component) {
  _inherits(DropdownButton, _Component);

  function DropdownButton() {
    _classCallCheck(this, DropdownButton);

    return _possibleConstructorReturn(this, (DropdownButton.__proto__ || Object.getPrototypeOf(DropdownButton)).apply(this, arguments));
  }

  _createClass(DropdownButton, [{
    key: 'handleClick',
    value: function handleClick() {
      if (this.props.disabled) {
        return;
      }
      this.props.onClick();
      this.props.afterClick();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var wrapperDisableStatusClassName = this.props.disabled ? 'g3-dropdown-button__wrapper--disabled' : '';

      var buttonTypeClassName = 'g3-dropdown-button__button--' + this.props.buttonType;
      var buttonIsSplitClassName = this.props.split ? 'g3-dropdown-button__button--with-split-trigger' : 'g3-dropdown-button__button--without-split-trigger';

      var menuTriggerButtonTypeClassName = 'g3-dropdown-button__menu-trigger--' + this.props.buttonType;

      return _react2.default.createElement(
        'div',
        {
          ref: this.props.menuTriggerElementRef,
          className: 'g3-dropdown-button__wrapper ' + wrapperDisableStatusClassName + ' ' + (this.props.className || '')
        },
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            className: 'g3-dropdown-button__button ' + buttonIsSplitClassName + ' ' + buttonTypeClassName,
            onClick: this.props.split ? function (e) {
              return _this2.handleClick(e);
            } : this.props.handleTriggerMenu,
            label: this.props.label
          },
          this.props.children,
          this.props.split || _react2.default.createElement('i', { className: 'g3-dropdown-button__icon' })
        ),
        this.props.split && _react2.default.createElement(
          'button',
          {
            type: 'button',
            className: 'g3-dropdown-button__menu-trigger ' + menuTriggerButtonTypeClassName,
            onClick: this.props.handleTriggerMenu
          },
          _react2.default.createElement('i', { className: 'g3-dropdown-button__icon ' + (this.props.menuOpen ? 'g3-dropdown-button__icon--menu-opened' : '') })
        )
      );
    }
  }]);

  return DropdownButton;
}(_react.Component);

DropdownButton.propTypes = {
  split: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  label: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  handleTriggerMenu: _propTypes2.default.func,
  menuOpen: _propTypes2.default.bool,
  afterClick: _propTypes2.default.func,
  menuTriggerElementRef: _propTypes2.default.object,
  buttonType: _propTypes2.default.oneOf(['primary', 'secondary']),
  disabled: _propTypes2.default.bool,
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]).isRequired
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

exports.default = DropdownButton;