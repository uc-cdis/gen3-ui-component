"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _recharts = require("recharts");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _helper = _interopRequireDefault(require("../helper"));

require("./SummaryHorizontalBarChart.css");

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

// FIXME: add back in animation (https://github.com/recharts/recharts/issues/1083)
var SummaryBarChart =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SummaryBarChart, _React$Component);

  function SummaryBarChart() {
    _classCallCheck(this, SummaryBarChart);

    return _possibleConstructorReturn(this, _getPrototypeOf(SummaryBarChart).apply(this, arguments));
  }

  _createClass(SummaryBarChart, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          barChartStyle = _this$props.barChartStyle,
          labelValueStyle = _this$props.labelValueStyle,
          xAxisStyle = _this$props.xAxisStyle;
      var barChartHeight = this.props.data.length * barChartStyle.barSize + (this.props.data.length + 1) * barChartStyle.barGap + 2;

      var barChartData = _helper.default.calculateChartData(this.props.data, this.props.showPercentage, this.props.percentageFixedPoint);

      var dataKey = _helper.default.getDataKey(this.props.showPercentage);

      return _react.default.createElement("div", {
        className: "summary-horizontal-bar-chart"
      }, _react.default.createElement("div", {
        className: "summary-horizontal-bar-chart__title-box"
      }, _react.default.createElement("p", {
        className: "summary-horizontal-bar-chart__title h4-typo"
      }, this.props.title)), _react.default.createElement("div", null, _react.default.createElement("div", {
        className: "summary-horizontal-bar-chart__legend"
      }, barChartData.map(function (entry, i) {
        return _react.default.createElement("div", {
          key: i,
          className: "summary-horizontal-bar-chart__legend-item"
        }, entry.name);
      })), _react.default.createElement("div", {
        className: "summary-horizontal-bar-chart__responsive-container"
      }, _react.default.createElement(_recharts.ResponsiveContainer, {
        width: "100%",
        height: barChartHeight
      }, _react.default.createElement(_recharts.BarChart, {
        layout: barChartStyle.layout,
        data: barChartData,
        barCategoryGap: barChartStyle.barGap,
        barSize: barChartStyle.barSize,
        margin: barChartStyle.margins
      }, _react.default.createElement(_recharts.Tooltip, {
        formatter: _helper.default.percentageFormatter(this.props.showPercentage)
      }), _react.default.createElement(_recharts.XAxis, _extends({}, xAxisStyle, {
        type: "number",
        hide: true
      })), _react.default.createElement(_recharts.YAxis, {
        axisLine: false,
        tickLine: false,
        dataKey: "name",
        type: "category",
        hide: true
      }), _react.default.createElement(_recharts.Bar, {
        dataKey: dataKey,
        isAnimationActive: false
      }, barChartData.map(function (entry, index) {
        return _react.default.createElement(_recharts.Cell, {
          key: dataKey,
          fill: _this.props.color || _helper.default.getCategoryColor(index)
        });
      }), _react.default.createElement(_recharts.LabelList, {
        dataKey: dataKey,
        position: labelValueStyle.position,
        offset: labelValueStyle.offset,
        style: labelValueStyle,
        formatter: _helper.default.percentageFormatter(this.props.showPercentage)
      })))))));
    }
  }]);

  return SummaryBarChart;
}(_react.default.Component);

var ChartDataShape = _propTypes.default.shape({
  name: _propTypes.default.string.isRequired,
  value: _propTypes.default.number.isRequired
});

SummaryBarChart.propTypes = {
  title: _propTypes.default.string.isRequired,
  data: _propTypes.default.arrayOf(ChartDataShape).isRequired,
  color: _propTypes.default.string,
  showPercentage: _propTypes.default.bool,
  percentageFixedPoint: _propTypes.default.number,
  xAxisStyle: _propTypes.default.object,
  labelValueStyle: _propTypes.default.object,
  barChartStyle: _propTypes.default.object
};
SummaryBarChart.defaultProps = {
  color: undefined,
  showPercentage: true,
  percentageFixedPoint: 2,
  xAxisStyle: {
    axisLine: false,
    tickLine: false
  },
  labelValueStyle: {
    fontSize: '10px',
    fontWeight: 600,
    lineHeight: '1em',
    letterSpacing: '.02rem',
    color: '#3283c8',
    position: 'right',
    offset: 8
  },
  barChartStyle: {
    margins: {
      top: 4,
      right: 35,
      left: 15
    },
    layout: 'vertical',
    barSize: 11,
    barGap: 8
  }
};
var _default = SummaryBarChart;
exports.default = _default;