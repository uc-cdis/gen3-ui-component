"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _SingleSelectFilter = _interopRequireDefault(require("../SingleSelectFilter"));

var _RangeFilter = _interopRequireDefault(require("../RangeFilter"));

require("./FilterSection.css");

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

var FilterSection =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FilterSection, _React$Component);

  function FilterSection(props) {
    var _this;

    _classCallCheck(this, FilterSection);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FilterSection).call(this, props));
    _this.state = {
      isExpanded: _this.props.expanded
    };
    return _this;
  }

  _createClass(FilterSection, [{
    key: "toggleSection",
    value: function toggleSection() {
      this.props.onToggle(!this.state.isExpanded);
      this.setState(function (prevState) {
        return {
          isExpanded: !prevState.isExpanded
        };
      });
    }
  }, {
    key: "handleSelectSingleSelectFilter",
    value: function handleSelectSingleSelectFilter(index, label, newSelected) {
      this.props.onSelect(index, label, newSelected);
    }
  }, {
    key: "handleDragRangeFilter",
    value: function handleDragRangeFilter(lowerBound, upperBound) {
      this.props.onAfterDrag(lowerBound, upperBound);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", {
        className: "filter-section"
      }, _react.default.createElement("div", {
        className: "filter-section__header",
        onClick: function onClick() {
          return _this2.toggleSection();
        },
        onKeyPress: function onKeyPress() {
          return _this2.toggleSection();
        },
        tabIndex: 0,
        role: "button"
      }, _react.default.createElement("p", {
        className: "filter-section__title"
      }, this.props.title), _react.default.createElement("i", {
        className: "filter-section__toggle-icon g3-icon g3-icon--sm g3-icon--chevron-".concat(this.state.isExpanded ? 'up' : 'down')
      })), _react.default.createElement("div", {
        className: "filter-section__options"
      }, this.state.isExpanded ? this.props.options.map(function (option, index) {
        if (option.filterType === 'singleSelect') {
          var selected = typeof _this2.props.filterStatus[index] === 'undefined' ? false : _this2.props.filterStatus[index];
          return _react.default.createElement(_SingleSelectFilter.default, {
            key: index,
            label: option.text,
            onSelect: function onSelect(label, newSelected) {
              return _this2.handleSelectSingleSelectFilter(index, label, newSelected);
            },
            selected: selected
          });
        }

        var lowerBound = typeof _this2.props.filterStatus === 'undefined' || _this2.props.filterStatus.length !== 2 ? option.min : _this2.props.filterStatus[0];
        var upperBound = typeof _this2.props.filterStatus === 'undefined' || _this2.props.filterStatus.length !== 2 ? option.max : _this2.props.filterStatus[1];
        return _react.default.createElement(_RangeFilter.default, {
          key: index,
          label: option.text,
          min: option.min,
          max: option.max,
          onAfterDrag: function onAfterDrag(lb, ub) {
            return _this2.handleDragRangeFilter(lb, ub);
          },
          lowerBound: lowerBound,
          upperBound: upperBound
        });
      }) : null));
    }
  }]);

  return FilterSection;
}(_react.default.Component);

FilterSection.propTypes = {
  title: _propTypes.default.string,
  options: _propTypes.default.arrayOf(_propTypes.default.shape({
    filterType: _propTypes.default.oneOf(['singleSelect', 'range']).isRequired,
    text: _propTypes.default.string,
    // for range filter
    min: _propTypes.default.number,
    max: _propTypes.default.number
  })),
  onSelect: _propTypes.default.func.isRequired,
  onAfterDrag: _propTypes.default.func.isRequired,
  expanded: _propTypes.default.bool,
  onToggle: _propTypes.default.func,
  filterStatus: _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.number]))
};
FilterSection.defaultProps = {
  title: '',
  options: [],
  expanded: false,
  onToggle: function onToggle() {},
  filterStatus: []
};
var _default = FilterSection;
exports.default = _default;