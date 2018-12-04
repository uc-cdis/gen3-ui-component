'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuggestionItem = exports.getSuggestionItemHTML = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./AutoCompleteSuggestions.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Wrap suggestion item into HTML, take following as an e.g.:
 *   suggestionsItem={
 *     fullString: 'abcdea',
 *     matchedPieceIndices: [
 *       [0, 1],
 *       [5, 6]
 *     ];
 *   };
 * Return HTML should be:
 *     <span className='auto-complete-suggestions__highlight'>
 *       a
 *     </span>
 *     <span>bcde</span>
 *     <span className='auto-complete-suggestions__highlight'>
 *       a
 *     </span>
 */
var getSuggestionItemHTML = exports.getSuggestionItemHTML = function getSuggestionItemHTML(suggestionItem) {
  var fullString = suggestionItem.fullString,
      matchedPieceIndices = suggestionItem.matchedPieceIndices;

  var cursor = 0;
  var currentHighlighPieceIndex = 0;
  var resultHTMLSnippits = [];
  while (currentHighlighPieceIndex < matchedPieceIndices.length) {
    var highlightStartPos = matchedPieceIndices[currentHighlighPieceIndex][0];
    var highlightEndPos = matchedPieceIndices[currentHighlighPieceIndex][1];
    if (cursor < highlightStartPos) {
      resultHTMLSnippits.push(_react2.default.createElement(
        'span',
        { key: cursor },
        fullString.substring(cursor, highlightStartPos)
      ));
    }
    resultHTMLSnippits.push(_react2.default.createElement(
      'span',
      { key: highlightStartPos, className: 'auto-complete-suggestions__highlight' },
      fullString.substring(highlightStartPos, highlightEndPos)
    ));
    cursor = highlightEndPos;
    currentHighlighPieceIndex += 1;
  }
  if (cursor < fullString.length) {
    resultHTMLSnippits.push(_react2.default.createElement(
      'span',
      { key: cursor },
      fullString.substring(cursor)
    ));
  }
  return resultHTMLSnippits;
};

var AutoCompleteSuggestions = function (_Component) {
  _inherits(AutoCompleteSuggestions, _Component);

  function AutoCompleteSuggestions() {
    _classCallCheck(this, AutoCompleteSuggestions);

    return _possibleConstructorReturn(this, (AutoCompleteSuggestions.__proto__ || Object.getPrototypeOf(AutoCompleteSuggestions)).apply(this, arguments));
  }

  _createClass(AutoCompleteSuggestions, [{
    key: 'handleClickItem',
    value: function handleClickItem(suggestionItem, i) {
      this.props.onSuggestionItemClick(suggestionItem, i);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        this.props.suggestionList.map(function (suggestionItem, i) {
          return _react2.default.createElement(
            'div',
            {
              key: i + '-' + suggestionItem.fullString,
              className: 'auto-complete-suggestions__item body',
              onClick: function onClick() {
                _this2.handleClickItem(suggestionItem, i);
              },
              onKeyPress: function onKeyPress() {
                _this2.handleClickItem(suggestionItem, i);
              },
              role: 'button',
              tabIndex: 0
            },
            getSuggestionItemHTML(suggestionItem)
          );
        })
      );
    }
  }]);

  return AutoCompleteSuggestions;
}(_react.Component);

var SuggestionItem = exports.SuggestionItem = {
  fullString: _propTypes2.default.string.isRequired,
  matchedPieceIndices: _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.number)).isRequired
};

AutoCompleteSuggestions.propTypes = {
  suggestionList: _propTypes2.default.arrayOf(_propTypes2.default.shape(SuggestionItem)),
  onSuggestionItemClick: _propTypes2.default.func
};

AutoCompleteSuggestions.defaultProps = {
  suggestionList: [],
  onSuggestionItemClick: function onSuggestionItemClick() {}
};

exports.default = AutoCompleteSuggestions;