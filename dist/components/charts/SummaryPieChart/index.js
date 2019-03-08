"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _recharts = require("recharts");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _helper = _interopRequireDefault(require("../helper"));

require("./SummaryPieChart.css");

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

var SummaryPieChart =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SummaryPieChart, _React$Component);

  function SummaryPieChart() {
    _classCallCheck(this, SummaryPieChart);

    return _possibleConstructorReturn(this, _getPrototypeOf(SummaryPieChart).apply(this, arguments));
  }

  _createClass(SummaryPieChart, [{
    key: "render",
    value: function render() {
      var _this = this;

      var useTwoColors = this.props.data.length === 2;
      var getColor = useTwoColors ? _helper.default.getCategoryColorFrom2Colors : _helper.default.getCategoryColor;

      var pieChartData = _helper.default.calculateChartData(this.props.data, this.props.showPercentage, this.props.percentageFixedPoint);

      var dataKey = _helper.default.getDataKey(this.props.showPercentage);

      return _react.default.createElement("div", {
        className: "summary-pie-chart"
      }, _react.default.createElement("div", {
        className: "summary-pie-chart__title-box"
      }, _react.default.createElement("p", {
        className: "summary-pie-chart__title h4-typo"
      }, this.props.title)), _react.default.createElement("div", {
        className: "summary-pie-chart__body"
      }, _react.default.createElement("div", {
        className: "summary-pie-chart__legend"
      }, pieChartData.map(function (entry) {
        return _react.default.createElement("div", {
          className: "summary-pie-chart__legend-item",
          key: 'text'.concat(entry.name)
        }, _react.default.createElement("div", {
          className: "summary-pie-chart__legend-item-name"
        }, entry.name), _react.default.createElement("div", {
          className: "summary-pie-chart__legend-item-value form-special-number"
        }, _helper.default.percentageFormatter(_this.props.showPercentage)(entry[dataKey])));
      })), _react.default.createElement(_recharts.PieChart, {
        width: this.props.outerRadius * 2,
        height: this.props.outerRadius * 2,
        style: this.props.pieChartStyle
      }, _react.default.createElement(_recharts.Pie, {
        dataKey: dataKey,
        isAnimationActive: false,
        data: pieChartData,
        innerRadius: this.props.innerRadius,
        outerRadius: this.props.outerRadius,
        fill: this.props.pieChartStyle.fill
      }, pieChartData.map(function (entry, index) {
        return _react.default.createElement(_recharts.Cell, {
          key: dataKey,
          dataKey: dataKey,
          fill: getColor(index)
        });
      })), _react.default.createElement(_recharts.Tooltip, {
        formatter: _helper.default.percentageFormatter(this.props.showPercentage)
      }))));
    }
  }]);

  return SummaryPieChart;
}(_react.default.Component);

var ChartDataShape = _propTypes.default.shape({
  name: _propTypes.default.string.isRequired,
  value: _propTypes.default.number.isRequired
});

SummaryPieChart.propTypes = {
  title: _propTypes.default.string.isRequired,
  data: _propTypes.default.arrayOf(ChartDataShape).isRequired,
  innerRadius: _propTypes.default.number,
  outerRadius: _propTypes.default.number,
  showPercentage: _propTypes.default.bool,
  percentageFixedPoint: _propTypes.default.number,
  pieChartStyle: _propTypes.default.object
};
SummaryPieChart.defaultProps = {
  innerRadius: 31.5,
  outerRadius: 43,
  showPercentage: true,
  percentageFixedPoint: 2,
  pieChartStyle: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '22px',
    fill: '#8884d8'
  }
};
var _default = SummaryPieChart;
exports.default = _default;