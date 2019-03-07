"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./AutoCompleteInput.css");

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

var AutoCompleteInput =
/*#__PURE__*/
function (_Component) {
  _inherits(AutoCompleteInput, _Component);

  function AutoCompleteInput(props) {
    var _this;

    _classCallCheck(this, AutoCompleteInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AutoCompleteInput).call(this, props));
    _this.state = {
      closeIconHidden: true
    };
    _this.inputElem = _react.default.createRef();
    return _this;
  }

  _createClass(AutoCompleteInput, [{
    key: "setInputText",
    value: function setInputText(text) {
      this.inputElem.current.value = text;
      this.updateCloseIcon();
    }
  }, {
    key: "handleChange",
    value: function handleChange() {
      var currentInput = this.inputElem.current.value;
      this.props.onInputChange(currentInput);
      this.updateCloseIcon();
    }
  }, {
    key: "handleClear",
    value: function handleClear() {
      this.inputElem.current.value = '';
      this.updateCloseIcon();
      this.props.onInputChange('');
    }
  }, {
    key: "updateCloseIcon",
    value: function updateCloseIcon() {
      var currentInput = this.inputElem.current.value;
      this.setState({
        closeIconHidden: !currentInput || currentInput.length === 0
      });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      if (e && e.preventDefault) e.preventDefault();
      this.props.onSubmitInput(this.inputElem.current.value);
    }
  }, {
    key: "clearInput",
    value: function clearInput() {
      this.inputElem.current.value = '';
      this.updateCloseIcon();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", {
        className: "auto-complete-input"
      }, _react.default.createElement("form", {
        className: "auto-complete-input__form",
        onSubmit: function onSubmit(e) {
          return _this2.handleSubmit(e);
        }
      }, _react.default.createElement("input", {
        className: "auto-complete-input__input-box body",
        onChange: function onChange() {
          _this2.handleChange();
        },
        placeholder: this.props.placeHolderText,
        ref: this.inputElem
      })), !this.state.closeIconHidden && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("i", {
        className: "g3-icon g3-icon--cross auto-complete-input__close",
        onClick: function onClick() {
          _this2.handleClear();
        },
        onKeyPress: function onKeyPress() {
          _this2.handleClear();
        },
        role: "button",
        tabIndex: 0
      }), _react.default.createElement("i", {
        className: "auto-complete-input__separator"
      })), _react.default.createElement("i", {
        className: "g3-icon g3-icon--".concat(this.props.icon, " auto-complete-input__icon"),
        onClick: function onClick() {
          return _this2.handleSubmit();
        },
        onKeyPress: function onKeyPress() {
          return _this2.handleSubmit();
        },
        role: "button",
        tabIndex: 0
      }));
    }
  }]);

  return AutoCompleteInput;
}(_react.Component);

AutoCompleteInput.propTypes = {
  onInputChange: _propTypes.default.func,
  placeHolderText: _propTypes.default.string,
  icon: _propTypes.default.string,
  onSubmitInput: _propTypes.default.func
};
AutoCompleteInput.defaultProps = {
  onInputChange: function onInputChange() {},
  placeHolderText: 'Search',
  icon: 'search',
  onSubmitInput: function onSubmitInput() {}
};
var _default = AutoCompleteInput;
exports.default = _default;