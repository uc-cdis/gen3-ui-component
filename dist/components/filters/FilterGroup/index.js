"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./FilterGroup.css");

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

var FilterGroup =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FilterGroup, _React$Component);

  function FilterGroup(props) {
    var _this;

    _classCallCheck(this, FilterGroup);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FilterGroup).call(this, props));
    var initialExpandedStatus = props.filterConfig.tabs.map(function (t) {
      return t.fields.map(function () {
        return false;
      });
    });
    var initialFilterStatus = props.filterConfig.tabs.map(function (t) {
      return t.fields.map(function () {
        return [];
      });
    });
    _this.state = {
      selectedTabIndex: 0,
      expandedStatus: initialExpandedStatus,
      filterStatus: initialFilterStatus,

      /**
       * Currently filtered items, example:
       *   {
       *     'file_format': {
       *        'selectedValues': ['CSV', 'TAR'],
       *     },
       *     'file_count': {
       *        'lowerBound': 5,
       *        'upperBound': 30,
       *     },
       *     ...
       *   }
       */
      filterResults: {}
    };
    return _this;
  }

  _createClass(FilterGroup, [{
    key: "selectTab",
    value: function selectTab(index) {
      this.setState({
        selectedTabIndex: index
      });
    }
  }, {
    key: "handleToggle",
    value: function handleToggle(tabIndex, sectionIndex, newSectionExpandedStatus) {
      this.setState(function (prevState) {
        var newExpandedStatus = prevState.expandedStatus.slice(0);
        newExpandedStatus[tabIndex][sectionIndex] = newSectionExpandedStatus;
        return {
          expandedStatus: newExpandedStatus
        };
      });
    }
  }, {
    key: "handleSelect",
    value: function handleSelect(sectionIndex, singleFilterIndex, singleFilterLabel, newSelected) {
      var _this2 = this;

      this.setState(function (prevState) {
        // update filter status
        var newFilterStatus = prevState.filterStatus.slice(0);
        newFilterStatus[prevState.selectedTabIndex][sectionIndex][singleFilterIndex] = newSelected; // update filter results

        var newFilterResults = prevState.filterResults;
        var field = _this2.props.filterConfig.tabs[prevState.selectedTabIndex].fields[sectionIndex];

        if (typeof newFilterResults[field] === 'undefined') {
          newFilterResults[field] = {
            selectedValues: [singleFilterLabel]
          };
        } else {
          var findIndex = newFilterResults[field].selectedValues.indexOf(singleFilterLabel);

          if (findIndex >= 0 && !newSelected) {
            newFilterResults[field].selectedValues.splice(findIndex, 1);
          } else if (findIndex < 0 && newSelected) {
            newFilterResults[field].selectedValues.push(singleFilterLabel);
          }
        } // update component state


        return {
          filterStatus: newFilterStatus,
          filterResults: newFilterResults
        };
      }, function () {
        _this2.callOnFilterChange();
      });
    }
  }, {
    key: "handleDrag",
    value: function handleDrag(sectionIndex, lowerBound, upperBound) {
      var _this3 = this;

      this.setState(function (prevState) {
        // update filter status
        var newFilterStatus = prevState.filterStatus.slice(0);
        newFilterStatus[prevState.selectedTabIndex][sectionIndex] = [lowerBound, upperBound]; // update filter results

        var newFilterResults = prevState.filterResults;
        var field = _this3.props.filterConfig.tabs[prevState.selectedTabIndex].fields[sectionIndex];
        newFilterResults[field] = {
          lowerBound: lowerBound,
          upperBound: upperBound
        };
      }, function () {
        _this3.callOnFilterChange();
      });
    }
  }, {
    key: "callOnFilterChange",
    value: function callOnFilterChange() {
      this.props.onFilterChange(this.state.filterResults);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return _react.default.createElement("div", {
        className: "filter-group"
      }, _react.default.createElement("div", {
        className: "filter-group__tabs"
      }, this.props.tabs.map(function (tab, index) {
        return _react.default.createElement("div", {
          key: index,
          role: "button",
          tabIndex: index,
          className: 'filter-group__tab'.concat(_this4.state.selectedTabIndex === index ? ' filter-group__tab--selected' : ''),
          onClick: function onClick() {
            return _this4.selectTab(index);
          },
          onKeyDown: function onKeyDown() {
            return _this4.selectTab(index);
          }
        }, _react.default.createElement("p", {
          className: "filter-group__tab-title"
        }, _this4.props.filterConfig.tabs[tab.key].title));
      })), _react.default.createElement("div", {
        className: "filter-group__filter-area"
      }, _react.default.cloneElement(this.props.tabs[this.state.selectedTabIndex], {
        onToggle: function onToggle(sectionIndex, newSectionExpandedStatus) {
          return _this4.handleToggle(_this4.state.selectedTabIndex, sectionIndex, newSectionExpandedStatus);
        },
        expandedStatus: this.state.expandedStatus[this.state.selectedTabIndex],
        filterStatus: this.state.filterStatus[this.state.selectedTabIndex],
        onSelect: this.handleSelect.bind(this),
        onAfterDrag: this.handleDrag.bind(this)
      })));
    }
  }]);

  return FilterGroup;
}(_react.default.Component);

FilterGroup.propTypes = {
  tabs: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  filterConfig: _propTypes.default.shape({
    tabs: _propTypes.default.arrayOf(_propTypes.default.shape({
      title: _propTypes.default.string,
      fields: _propTypes.default.arrayOf(_propTypes.default.string)
    }))
  }).isRequired,
  onFilterChange: _propTypes.default.func
};
FilterGroup.defaultProps = {
  onFilterChange: function onFilterChange() {}
};
var _default = FilterGroup;
exports.default = _default;