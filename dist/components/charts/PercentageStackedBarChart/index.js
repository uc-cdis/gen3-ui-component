"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _recharts = require("recharts");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _helper = _interopRequireDefault(require("../helper"));

require("./PercentageStackedBarChart.css");

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

var getPercentageDataLabels = function getPercentageDataLabels(chartData) {
  return chartData.map(function (entry) {
    return entry.name;
  });
}; // FIXME: add back in animation (https://github.com/recharts/recharts/issues/1083)


var PercentageStackedBarChart =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PercentageStackedBarChart, _React$Component);

  function PercentageStackedBarChart() {
    _classCallCheck(this, PercentageStackedBarChart);

    return _possibleConstructorReturn(this, _getPrototypeOf(PercentageStackedBarChart).apply(this, arguments));
  }

  _createClass(PercentageStackedBarChart, [{
    key: "render",
    value: function render() {
      var _this = this;

      var percentageData = _helper.default.getPercentageData(this.props.data, this.props.percentageFixedPoint);

      var percentageDataLabels = getPercentageDataLabels(this.props.data);
      var _this$props = this.props,
          barChartStyle = _this$props.barChartStyle,
          xAxisStyle = _this$props.xAxisStyle,
          labelListStyle = _this$props.labelListStyle;
      return _react.default.createElement("div", {
        className: "percentage-bar-chart"
      }, _react.default.createElement(_recharts.BarChart, _extends({
        data: percentageData
      }, barChartStyle), _react.default.createElement(_recharts.Tooltip, null), _react.default.createElement(_recharts.CartesianGrid, null), _react.default.createElement(_recharts.XAxis, _extends({
        type: "number",
        style: xAxisStyle,
        tickFormatter: _helper.default.addPercentage
      }, xAxisStyle)), _react.default.createElement(_recharts.YAxis, {
        axisLine: false,
        tickLine: false,
        dataKey: "name",
        type: "category",
        hide: true
      }), percentageDataLabels.map(function (name, index) {
        return _react.default.createElement(_recharts.Bar, {
          key: name,
          dataKey: name,
          stackId: "a",
          isAnimationActive: false,
          fill: _helper.default.getCategoryColor(index)
        }, _react.default.createElement(_recharts.LabelList, {
          dataKey: name,
          position: labelListStyle.position,
          style: labelListStyle,
          formatter: _helper.default.addPercentage,
          className: "percentage-bar-chart__label-list"
        }));
      })), _react.default.createElement("div", {
        className: "percentage-bar-chart__legend"
      }, _react.default.createElement("ul", null, percentageDataLabels.map(function (name, index) {
        return _react.default.createElement("li", {
          className: "percentage-bar-chart__legend-item",
          key: "label-".concat(name)
        }, _react.default.createElement("span", {
          className: "percentage-bar-chart__legend-color",
          style: {
            background: _helper.default.getCategoryColor(index)
          }
        }), _react.default.createElement("span", {
          className: "percentage-bar-chart__legend-name"
        }, name), _react.default.createElement("span", {
          className: "percentage-bar-chart__legend-value"
        }, '('.concat(Number(_this.props.data[index].value).toLocaleString()).concat(')')));
      }))));
    }
  }]);

  return PercentageStackedBarChart;
}(_react.default.Component);

var ChartDataShape = _propTypes.default.shape({
  name: _propTypes.default.string.isRequired,
  value: _propTypes.default.number.isRequired
});

PercentageStackedBarChart.propTypes = {
  data: _propTypes.default.arrayOf(ChartDataShape).isRequired,
  percentageFixedPoint: _propTypes.default.number,
  barChartStyle: _propTypes.default.object,
  xAxisStyle: _propTypes.default.object,
  labelListStyle: _propTypes.default.object
};
PercentageStackedBarChart.defaultProps = {
  percentageFixedPoint: 2,
  barChartStyle: {
    width: 510,
    height: 155,
    layout: 'vertical',
    margins: {
      top: 28,
      right: 12,
      bottom: 8,
      left: 12
    },
    barSize: 30
  },
  xAxisStyle: {
    fontSize: '10px',
    fontWeight: 600,
    lineHeight: '1em',
    letterSpacing: '.02rem',
    color: '#3283c8',
    axisLine: false,
    tickLine: false,
    ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    domain: [0, 100],
    tickMargin: 10
  },
  labelListStyle: {
    fill: '#FFFFFF',
    fontSize: '14px',
    fontWeight: 600,
    position: 'center'
  }
};
var _default = PercentageStackedBarChart;
exports.default = _default;