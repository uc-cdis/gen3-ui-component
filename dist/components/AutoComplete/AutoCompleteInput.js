'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./AutoCompleteInput.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoCompleteInput = function (_Component) {
  _inherits(AutoCompleteInput, _Component);

  function AutoCompleteInput(props) {
    _classCallCheck(this, AutoCompleteInput);

    var _this = _possibleConstructorReturn(this, (AutoCompleteInput.__proto__ || Object.getPrototypeOf(AutoCompleteInput)).call(this, props));

    _this.state = {
      closeIconHidden: true
    };
    _this.inputElem = _react2.default.createRef();
    return _this;
  }

  _createClass(AutoCompleteInput, [{
    key: 'handleChange',
    value: function handleChange() {
      var currentInput = this.inputElem.current.value;
      this.props.onInputChange(currentInput);
      this.updateCloseIcon();
    }
  }, {
    key: 'handleClear',
    value: function handleClear() {
      this.inputElem.current.value = '';
      this.updateCloseIcon();
    }
  }, {
    key: 'updateCloseIcon',
    value: function updateCloseIcon() {
      var currentInput = this.inputElem.current.value;
      this.setState({
        closeIconHidden: !currentInput || currentInput.length === 0
      });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      if (e && e.preventDefault) e.preventDefault();
      this.props.onSubmitInput(this.inputElem.current.value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'auto-complete-input' },
        _react2.default.createElement(
          'form',
          { className: 'auto-complete-input__form', onSubmit: function onSubmit(e) {
              return _this2.handleSubmit(e);
            } },
          _react2.default.createElement('input', {
            className: 'auto-complete-input__input-box body',
            onChange: function onChange() {
              _this2.handleChange();
            },
            placeholder: this.props.placeHolderText,
            ref: this.inputElem
          })
        ),
        !this.state.closeIconHidden && _react2.default.createElement(
          _react2.default.Fragment,
          null,
          _react2.default.createElement('i', {
            className: 'g3-icon g3-icon--cross auto-complete-input__close',
            onClick: function onClick() {
              _this2.handleClear();
            },
            onKeyPress: function onKeyPress() {
              _this2.handleClear();
            },
            role: 'button',
            tabIndex: 0
          }),
          _react2.default.createElement('i', { className: 'auto-complete-input__separator' })
        ),
        _react2.default.createElement('i', {
          className: 'g3-icon g3-icon--' + this.props.icon + ' auto-complete-input__icon',
          onClick: function onClick() {
            return _this2.handleSubmit();
          },
          onKeyPress: function onKeyPress() {
            return _this2.handleSubmit();
          },
          role: 'button',
          tabIndex: 0
        })
      );
    }
  }]);

  return AutoCompleteInput;
}(_react.Component);

AutoCompleteInput.propTypes = {
  onInputChange: _propTypes2.default.func,
  placeHolderText: _propTypes2.default.string,
  icon: _propTypes2.default.string,
  onSubmitInput: _propTypes2.default.func
};

AutoCompleteInput.defaultProps = {
  onInputChange: function onInputChange() {},
  placeHolderText: 'Search',
  icon: 'search',
  onSubmitInput: function onSubmitInput() {}
};

exports.default = AutoCompleteInput;