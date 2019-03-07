"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _AutoCompleteInput = _interopRequireDefault(require("./AutoCompleteInput"));

var _AutoCompleteSuggestions = _interopRequireWildcard(require("./AutoCompleteSuggestions"));

require("./AutoComplete.css");

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

var AutoComplete =
/*#__PURE__*/
function (_Component) {
  _inherits(AutoComplete, _Component);

  function AutoComplete(props) {
    var _this;

    _classCallCheck(this, AutoComplete);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AutoComplete).call(this, props));
    _this.inputRef = _react.default.createRef();
    return _this;
  }

  _createClass(AutoComplete, [{
    key: "setInputText",
    value: function setInputText(text) {
      this.inputRef.current.setInputText(text);
    }
  }, {
    key: "clearInput",
    value: function clearInput() {
      this.inputRef.current.clearInput();
    }
  }, {
    key: "render",
    value: function render() {
      var emptySuggestionsClassModifier = this.props.suggestionList.length === 0 ? 'auto-complete--empty-suggestion-list' : '';
      return _react.default.createElement("div", {
        className: "auto-complete ".concat(emptySuggestionsClassModifier)
      }, _react.default.createElement("div", {
        className: "auto-complete__input-wrapper"
      }, _react.default.createElement(_AutoCompleteInput.default, {
        ref: this.inputRef,
        placeHolderText: this.props.inputPlaceHolderText,
        icon: this.props.inputIcon,
        onInputChange: this.props.onInputChange,
        onSubmitInput: this.props.onSubmitInput
      })), _react.default.createElement(_AutoCompleteSuggestions.default, {
        className: "auto-complete__suggestions",
        suggestionList: this.props.suggestionList,
        onSuggestionItemClick: this.props.onSuggestionItemClick
      }));
    }
  }]);

  return AutoComplete;
}(_react.Component);

AutoComplete.propTypes = {
  onInputChange: _propTypes.default.func,
  suggestionList: _propTypes.default.arrayOf(_propTypes.default.shape(_AutoCompleteSuggestions.SuggestionItem)),
  inputPlaceHolderText: _propTypes.default.string,
  inputIcon: _propTypes.default.string,
  onSuggestionItemClick: _propTypes.default.func,
  onSubmitInput: _propTypes.default.func
};
AutoComplete.defaultProps = {
  onInputChange: function onInputChange() {},
  suggestionList: [],
  inputPlaceHolderText: 'Search',
  inputIcon: 'search',
  onSuggestionItemClick: function onSuggestionItemClick() {},
  onSubmitInput: function onSubmitInput() {}
};
var _default = AutoComplete;
exports.default = _default;