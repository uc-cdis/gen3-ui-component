'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _AutoCompleteInput = require('./AutoCompleteInput');

var _AutoCompleteInput2 = _interopRequireDefault(_AutoCompleteInput);

var _AutoCompleteSuggestions = require('./AutoCompleteSuggestions');

var _AutoCompleteSuggestions2 = _interopRequireDefault(_AutoCompleteSuggestions);

require('./AutoComplete.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoComplete = function (_Component) {
  _inherits(AutoComplete, _Component);

  function AutoComplete(props) {
    _classCallCheck(this, AutoComplete);

    var _this = _possibleConstructorReturn(this, (AutoComplete.__proto__ || Object.getPrototypeOf(AutoComplete)).call(this, props));

    _this.inputRef = _react2.default.createRef();
    return _this;
  }

  _createClass(AutoComplete, [{
    key: 'setInputText',
    value: function setInputText(text) {
      this.inputRef.current.setInputText(text);
    }
  }, {
    key: 'clearInput',
    value: function clearInput() {
      this.inputRef.current.clearInput();
    }
  }, {
    key: 'render',
    value: function render() {
      var emptySuggestionsClassModifier = this.props.suggestionList.length === 0 ? 'auto-complete--empty-suggestion-list' : '';
      return _react2.default.createElement(
        'div',
        { className: 'auto-complete ' + emptySuggestionsClassModifier },
        _react2.default.createElement(
          'div',
          { className: 'auto-complete__input-wrapper' },
          _react2.default.createElement(_AutoCompleteInput2.default, {
            ref: this.inputRef,
            placeHolderText: this.props.inputPlaceHolderText,
            icon: this.props.inputIcon,
            onInputChange: this.props.onInputChange,
            onSubmitInput: this.props.onSubmitInput
          })
        ),
        _react2.default.createElement(_AutoCompleteSuggestions2.default, {
          className: 'auto-complete__suggestions',
          suggestionList: this.props.suggestionList,
          onSuggestionItemClick: this.props.onSuggestionItemClick
        })
      );
    }
  }]);

  return AutoComplete;
}(_react.Component);

AutoComplete.propTypes = {
  onInputChange: _propTypes2.default.func,
  suggestionList: _propTypes2.default.arrayOf(_propTypes2.default.shape(_AutoCompleteSuggestions.SuggestionItem)),
  inputPlaceHolderText: _propTypes2.default.string,
  inputIcon: _propTypes2.default.string,
  onSuggestionItemClick: _propTypes2.default.func,
  onSubmitInput: _propTypes2.default.func
};

AutoComplete.defaultProps = {
  onInputChange: function onInputChange() {},
  suggestionList: [],
  inputPlaceHolderText: 'Search',
  inputIcon: 'search',
  onSuggestionItemClick: function onSuggestionItemClick() {},
  onSubmitInput: function onSubmitInput() {}
};

exports.default = AutoComplete;