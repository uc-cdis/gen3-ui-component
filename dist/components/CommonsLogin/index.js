'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

require('./CommonsLogin.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommonsLogin = function (_React$Component) {
  _inherits(CommonsLogin, _React$Component);

  function CommonsLogin() {
    _classCallCheck(this, CommonsLogin);

    return _possibleConstructorReturn(this, (CommonsLogin.__proto__ || Object.getPrototypeOf(CommonsLogin)).apply(this, arguments));
  }

  _createClass(CommonsLogin, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'commons-login' },
        _react2.default.createElement(
          'p',
          { className: 'commons-login__title' },
          this.props.title
        ),
        _react2.default.createElement('img', {
          className: 'commons-login__logo',
          src: this.props.logoSrc,
          alt: this.props.title + ' logo'
        }),
        _react2.default.createElement(_Button2.default, {
          className: 'commons-login__button',
          label: this.props.buttonTitle,
          buttonType: 'secondary',
          onClick: this.props.onButtonClick,
          enabled: this.props.buttonEnabled
        })
      );
    }
  }]);

  return CommonsLogin;
}(_react2.default.Component);

CommonsLogin.propTypes = {
  title: _propTypes2.default.string.isRequired,
  logoSrc: _propTypes2.default.string.isRequired,
  buttonTitle: _propTypes2.default.string.isRequired,
  onButtonClick: _propTypes2.default.func.isRequired,
  buttonEnabled: _propTypes2.default.bool
};

CommonsLogin.defaultProps = {
  buttonEnabled: true
};

exports.default = CommonsLogin;