"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./SingleSelectFilter.css");

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

var SingleSelectFilter =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SingleSelectFilter, _React$Component);

  function SingleSelectFilter(props) {
    var _this;

    _classCallCheck(this, SingleSelectFilter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SingleSelectFilter).call(this, props));
    _this.state = {
      selected: props.selected
    };
    return _this;
  }

  _createClass(SingleSelectFilter, [{
    key: "handleCheck",
    value: function handleCheck() {
      var _this2 = this;

      this.setState(function (prevState) {
        return {
          selected: !prevState.selected
        };
      }, function () {
        _this2.props.onSelect(_this2.props.label, _this2.state.selected);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react.default.createElement("div", {
        className: "single-select-filter"
      }, _react.default.createElement("input", {
        className: "single-select-filter__checkbox",
        type: "checkbox",
        onChange: function onChange() {
          return _this3.handleCheck();
        },
        checked: this.state.selected
      }), _react.default.createElement("p", {
        className: "single-select-filter__label"
      }, this.props.label), this.props.count === 0 && this.props.hideZero ? null : _react.default.createElement("span", {
        className: "g3-badge single-select-filter__count"
      }, this.props.count));
    }
  }]);

  return SingleSelectFilter;
}(_react.default.Component);

SingleSelectFilter.propTypes = {
  label: _propTypes.default.string.isRequired,
  onSelect: _propTypes.default.func.isRequired,
  selected: _propTypes.default.bool,
  count: _propTypes.default.number,
  hideZero: _propTypes.default.bool
};
SingleSelectFilter.defaultProps = {
  selected: false,
  count: 0,
  hideZero: true
};
var _default = SingleSelectFilter;
exports.default = _default;