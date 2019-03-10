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

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    _this.state = {
      selectedTabIndex: 0,
      expandedStatus: initialExpandedStatus
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
    value: function handleToggle(tabIndex, sectionIndex) {
      this.setState(function (prevState) {
        var newExpandedStatus = prevState.expandedStatus.slice(0);
        newExpandedStatus[tabIndex][sectionIndex] = !newExpandedStatus[tabIndex][sectionIndex];
        return {
          expandedStatus: newExpandedStatus
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", {
        className: "filter-group"
      }, _react.default.createElement("div", {
        className: "filter-group__tabs"
      }, this.props.tabs.map(function (tab, index) {
        return _react.default.createElement("div", {
          key: index,
          role: "button",
          tabIndex: index,
          className: 'filter-group__tab'.concat(_this2.state.selectedTabIndex === index ? ' filter-group__tab--selected' : ''),
          onClick: function onClick() {
            return _this2.selectTab(index);
          },
          onKeyDown: function onKeyDown() {
            return _this2.selectTab(index);
          }
        }, _react.default.createElement("p", {
          className: "filter-group__tab-title"
        }, _this2.props.filterConfig.tabs[tab.key].title));
      })), _react.default.createElement("div", {
        className: "filter-group__filter-area"
      }, _react.default.cloneElement(this.props.tabs[this.state.selectedTabIndex], _objectSpread({}, this.props, {
        onToggle: function onToggle(sectionIndex) {
          return _this2.handleToggle(_this2.state.selectedTabIndex, sectionIndex);
        },
        expandedStatus: this.state.expandedStatus[this.state.selectedTabIndex]
      }))));
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
  }).isRequired
};
var _default = FilterGroup;
exports.default = _default;