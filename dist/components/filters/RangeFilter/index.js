"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rcSlider = require("rc-slider");

require("rc-slider/assets/index.css");

require("./RangeFilter.css");

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

var RangeFilter =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RangeFilter, _React$Component);

  function RangeFilter(props) {
    var _this;

    _classCallCheck(this, RangeFilter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RangeFilter).call(this, props));
    _this.state = {
      lowerBound: props.lowerBound ? props.lowerBound : props.min,
      upperBound: props.upperBound ? props.upperBound : props.max
    };
    return _this;
  }

  _createClass(RangeFilter, [{
    key: "onSliderChange",
    value: function onSliderChange(range) {
      var _this2 = this;

      this.setState({
        lowerBound: range[0],
        upperBound: range[1]
      }, function () {
        if (_this2.props.onDrag) {
          _this2.props.onDrag(_this2.state.lowerBound, _this2.state.upperBound);
        }
      });
    }
  }, {
    key: "onAfterSliderChange",
    value: function onAfterSliderChange(range) {
      var _this3 = this;

      this.setState({
        lowerBound: range[0],
        upperBound: range[1]
      }, function () {
        if (_this3.props.onAfterDrag) {
          _this3.props.onAfterDrag(_this3.state.lowerBound, _this3.state.upperBound);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return _react.default.createElement("div", {
        className: "range-filter"
      }, _react.default.createElement("p", {
        className: "range-filter__title"
      }, this.props.label), _react.default.createElement("div", {
        className: "range-filter__bounds"
      }, _react.default.createElement("p", {
        className: "range-filter__bound range-filter__bound--lower"
      }, this.state.lowerBound), _react.default.createElement("p", {
        className: "range-filter__bound range-filter__bound--higher"
      }, this.state.upperBound)), _react.default.createElement(_rcSlider.Range, {
        className: "range-filter__slider",
        min: this.props.min,
        max: this.props.max,
        value: [this.state.lowerBound, this.state.upperBound],
        onChange: function onChange(e) {
          return _this4.onSliderChange(e);
        },
        onAfterChange: function onAfterChange(e) {
          return _this4.onAfterSliderChange(e);
        }
      }));
    }
  }]);

  return RangeFilter;
}(_react.default.Component);

RangeFilter.propTypes = {
  label: _propTypes.default.string,
  onDrag: _propTypes.default.func,
  onAfterDrag: _propTypes.default.func.isRequired,
  min: _propTypes.default.number.isRequired,
  max: _propTypes.default.number.isRequired,
  lowerBound: _propTypes.default.number,
  upperBound: _propTypes.default.number
};
RangeFilter.defaultProps = {
  label: '',
  lowerBound: 0,
  upperBound: 0,
  onDrag: function onDrag() {}
};
var _default = RangeFilter;
exports.default = _default;