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

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

  function FilterList(props) {
    var _this;

    _classCallCheck(this, FilterList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FilterList).call(this, props));
    var initialExpandedStatus = props.expandedStatus.length > 0 ? props.expandedStatus : props.sections.map(function () {
      return false;
    });
    _this.state = {
      expandedStatus: initialExpandedStatus
    };
    return _this;
  }

  _createClass(FilterList, [{
    key: "handleSectionToggle",
    value: function handleSectionToggle(index) {
      this.setState(function (prevState) {
        var tmp = prevState.expandedStatus[index];
        var newExpandedStatus = prevState.expandedStatus.slice(0);
        newExpandedStatus.splice(index, 1, !tmp);
        return {
          expandedStatus: newExpandedStatus
        };
      });
      this.props.onToggle(index);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", {
        className: "filter-list"
      }, this.props.sections.map(function (section, index) {
        return _react.default.createElement(_FilterSection.default, _extends({}, _this2.props, {
          key: index,
          title: section.title,
          options: section.options,
          expanded: _this2.state.expandedStatus[index],
          onToggle: function onToggle() {
            return _this2.handleSectionToggle(index);
          }
        }));
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
  onToggle: _propTypes.default.func
};
FilterList.defaultProps = {
  expandedStatus: [],
  onToggle: function onToggle() {}
};
var _default = FilterList;
exports.default = _default;