"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SuggestionItem = exports.getSuggestionItemHTML = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./AutoCompleteSuggestions.css");

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
var getSuggestionItemHTML = function getSuggestionItemHTML(suggestionItem) {
  var fullString = suggestionItem.fullString,
      matchedPieceIndices = suggestionItem.matchedPieceIndices;
  var cursor = 0;
  var currentHighlighPieceIndex = 0;
  var resultHTMLSnippits = [];

  while (currentHighlighPieceIndex < matchedPieceIndices.length) {
    var highlightStartPos = matchedPieceIndices[currentHighlighPieceIndex][0];
    var highlightEndPos = matchedPieceIndices[currentHighlighPieceIndex][1];

    if (cursor < highlightStartPos) {
      resultHTMLSnippits.push(_react.default.createElement("span", {
        key: cursor
      }, fullString.substring(cursor, highlightStartPos)));
    }

    resultHTMLSnippits.push(_react.default.createElement("span", {
      key: highlightStartPos,
      className: "auto-complete-suggestions__highlight"
    }, fullString.substring(highlightStartPos, highlightEndPos)));
    cursor = highlightEndPos;
    currentHighlighPieceIndex += 1;
  }

  if (cursor < fullString.length) {
    resultHTMLSnippits.push(_react.default.createElement("span", {
      key: cursor
    }, fullString.substring(cursor)));
  }

  return resultHTMLSnippits;
};

exports.getSuggestionItemHTML = getSuggestionItemHTML;

var AutoCompleteSuggestions =
/*#__PURE__*/
function (_Component) {
  _inherits(AutoCompleteSuggestions, _Component);

  function AutoCompleteSuggestions() {
    _classCallCheck(this, AutoCompleteSuggestions);

    return _possibleConstructorReturn(this, _getPrototypeOf(AutoCompleteSuggestions).apply(this, arguments));
  }

  _createClass(AutoCompleteSuggestions, [{
    key: "handleClickItem",
    value: function handleClickItem(suggestionItem, i) {
      this.props.onSuggestionItemClick(suggestionItem, i);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return _react.default.createElement("div", null, this.props.suggestionList.map(function (suggestionItem, i) {
        return _react.default.createElement("div", {
          key: "".concat(i, "-").concat(suggestionItem.fullString),
          className: "auto-complete-suggestions__item body",
          onClick: function onClick() {
            _this.handleClickItem(suggestionItem, i);
          },
          onKeyPress: function onKeyPress() {
            _this.handleClickItem(suggestionItem, i);
          },
          role: "button",
          tabIndex: 0
        }, getSuggestionItemHTML(suggestionItem));
      }));
    }
  }]);

  return AutoCompleteSuggestions;
}(_react.Component);

var SuggestionItem = {
  fullString: _propTypes.default.string.isRequired,
  matchedPieceIndices: _propTypes.default.arrayOf(_propTypes.default.arrayOf(_propTypes.default.number)).isRequired
};
exports.SuggestionItem = SuggestionItem;
AutoCompleteSuggestions.propTypes = {
  suggestionList: _propTypes.default.arrayOf(_propTypes.default.shape(SuggestionItem)),
  onSuggestionItemClick: _propTypes.default.func
};
AutoCompleteSuggestions.defaultProps = {
  suggestionList: [],
  onSuggestionItemClick: function onSuggestionItemClick() {}
};
var _default = AutoCompleteSuggestions;
exports.default = _default;