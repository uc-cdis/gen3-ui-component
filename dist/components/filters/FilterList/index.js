"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _FilterSection = _interopRequireDefault(require("../FilterSection"));

require("./FilterList.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FilterList =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FilterList, _React$Component);

  function FilterList() {
    _classCallCheck(this, FilterList);

    return _possibleConstructorReturn(this, _getPrototypeOf(FilterList).apply(this, arguments));
  }

  _createClass(FilterList, [{
    key: "handleSectionToggle",
    value: function handleSectionToggle(sectionIndex, newExpanded) {
      this.props.onToggle(sectionIndex, newExpanded);
    }
  }, {
    key: "handleSelectSingleFilter",
    value: function handleSelectSingleFilter(sectionIndex, singleFilterIndex, singleFilterLabel, newSelected) {
      this.props.onSelect(sectionIndex, singleFilterIndex, singleFilterLabel, newSelected);
    }
  }, {
    key: "handleDragRangeFilter",
    value: function handleDragRangeFilter(sectionIndex, lowerBound, upperBound) {
      this.props.onAfterDrag(sectionIndex, lowerBound, upperBound);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return _react.default.createElement("div", {
        className: "filter-list"
      }, this.props.sections.map(function (section, index) {
        return _react.default.createElement(_FilterSection.default, {
          key: index,
          title: section.title,
          options: section.options,
          expanded: _this.props.expandedStatus[index],
          onToggle: function onToggle(newExpanded) {
            return _this.handleSectionToggle(index, newExpanded);
          },
          filterStatus: _this.props.filterStatus[index],
          onSelect: function onSelect(singleFilterIndex, singleFilterLabel, newSelected) {
            return _this.handleSelectSingleFilter(index, singleFilterIndex, singleFilterLabel, newSelected);
          },
          onAfterDrag: function onAfterDrag(lowerBound, upperBound) {
            return _this.handleDragRangeFilter(index, lowerBound, upperBound);
          }
        });
      }));
    }
  }]);

  return FilterList;
}(_react.default.Component);

FilterList.propTypes = {
  sections: _propTypes.default.arrayOf(_propTypes.default.shape({
    title: _propTypes.default.string,
    options: _propTypes.default.arrayOf(_propTypes.default.shape({
      text: _propTypes.default.string,
      filterType: _propTypes.default.oneOf(['singleSelect', 'range'])
    }))
  })).isRequired,
  expandedStatus: _propTypes.default.arrayOf(_propTypes.default.bool),
  onToggle: _propTypes.default.func,
  filterStatus: _propTypes.default.arrayOf(_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.PropTypes.number]))),
  onSelect: _propTypes.default.func,
  onAfterDrag: _propTypes.default.func
};
FilterList.defaultProps = {
  expandedStatus: [],
  onToggle: function onToggle() {},
  filterStatus: [],
  onSelect: function onSelect() {},
  onAfterDrag: function onAfterDrag() {}
};
var _default = FilterList;
exports.default = _default;