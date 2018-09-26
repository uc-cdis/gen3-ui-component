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

var DropdownToggle = function (_Component) {
  _inherits(DropdownToggle, _Component);

  function DropdownToggle(props) {
    _classCallCheck(this, DropdownToggle);

    var _this = _possibleConstructorReturn(this, (DropdownToggle.__proto__ || Object.getPrototypeOf(DropdownToggle)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(DropdownToggle, [{
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
      return _react2.default.createElement(
        'div',
        { ref: this.props.toggleElementRef, className: 'g3-dropdown__toggle ' + (this.props.className || '') + ' ' + (this.props.disabled ? 'g3-dropdown__toggle--disabled' : '') },
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            className: 'g3-dropdown__toggle-main ' + (this.props.separate ? 'g3-dropdown__toggle-main--with-separate' : 'g3-dropdown__toggle-main--without-separate') + ' g3-dropdown__toggle-main--' + this.props.buttonType,
            onClick: this.props.separate ? this.handleClick : this.props.handleToggle,
            label: this.props.label
          },
          this.props.children,
          this.props.separate || _react2.default.createElement('i', { className: 'g3-dropdown__more-icon' })
        ),
        this.props.separate && _react2.default.createElement(
          'button',
          {
            type: 'button',
            className: 'g3-dropdown__toggle-separated g3-dropdown__toggle-separated--' + this.props.buttonType,
            onClick: this.props.handleToggle
          },
          _react2.default.createElement('i', { className: 'g3-dropdown__toggle-icon ' + (this.props.menuOpen ? 'g3-dropdown__toggle-icon--shown' : '') })
        )
      );
    }
  }]);

  return DropdownToggle;
}(_react.Component);

DropdownToggle.propTypes = {
  separate: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  label: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  handleToggle: _propTypes2.default.func,
  menuOpen: _propTypes2.default.bool,
  afterClick: _propTypes2.default.func,
  toggleElementRef: _propTypes2.default.object,
  buttonType: _propTypes2.default.oneOf(['primary', 'secondary']),
  disabled: _propTypes2.default.bool,
  children: _propTypes2.default.any
};

DropdownToggle.defaultProps = {
  separate: false,
  className: '',
  label: 'Dropdown Button',
  onClick: function onClick() {},
  buttonType: 'primary',

  // override by Dropdown component:
  handleToggle: function handleToggle() {},
  menuOpen: false,
  afterClick: function afterClick() {},
  toggleElementRef: {},
  disabled: false,
  children: ''
};

exports.default = DropdownToggle;