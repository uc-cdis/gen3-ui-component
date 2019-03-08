"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _SummaryPieChart = _interopRequireDefault(require("../SummaryPieChart"));

var _SummaryHorizontalBarChart = _interopRequireDefault(require("../SummaryHorizontalBarChart"));

require("./SummaryChartGroup.css");

var _helper = _interopRequireDefault(require("../helper.js"));

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

var SummaryChartGroup =
/*#__PURE__*/
function (_Component) {
  _inherits(SummaryChartGroup, _Component);

  function SummaryChartGroup() {
    _classCallCheck(this, SummaryChartGroup);

    return _possibleConstructorReturn(this, _getPrototypeOf(SummaryChartGroup).apply(this, arguments));
  }

  _createClass(SummaryChartGroup, [{
    key: "render",
    value: function render() {
      var _this = this;

      var width = _helper.default.parseParamWidth(this.props.width);

      return _react.default.createElement("div", {
        className: "summary-chart-group",
        style: {
          width: width
        }
      }, this.props.summaries.map(function (item, index) {
        return _react.default.createElement("div", {
          className: "summary-chart-group__column",
          key: item.title
        }, index > 0 && _react.default.createElement("div", {
          className: "summary-chart-group__column-left-border"
        }), item.type === 'pie' ? _react.default.createElement(_SummaryPieChart.default, {
          data: item.data,
          title: item.title
        }) : _react.default.createElement(_SummaryHorizontalBarChart.default, {
          data: item.data,
          title: item.title,
          vertical: true,
          color: _this.props.barChartColor
        }));
      }));
    }
  }]);

  return SummaryChartGroup;
}(_react.Component);

SummaryChartGroup.propTypes = {
  summaries: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  barChartColor: _propTypes.default.string
};
SummaryChartGroup.defaultProps = {
  width: '100%',
  barChartColor: '#3283c8'
};
var _default = SummaryChartGroup;
exports.default = _default;