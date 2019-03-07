"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _TopBarButton = _interopRequireDefault(require("./TopBarButton"));

require("./TopBar.css");

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

var TopBar =
/*#__PURE__*/
function (_Component) {
  _inherits(TopBar, _Component);

  function TopBar() {
    _classCallCheck(this, TopBar);

    return _possibleConstructorReturn(this, _getPrototypeOf(TopBar).apply(this, arguments));
  }

  _createClass(TopBar, [{
    key: "isActive",
    value: function isActive(id) {
      return this.props.activeTab === id;
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return _react.default.createElement("div", {
        className: "top-bar"
      }, _react.default.createElement("header", {
        className: "top-bar__header"
      }, _react.default.createElement("nav", {
        className: "top-bar__nav"
      }, this.props.tabItems.map(function (item, i) {
        return item.link.startsWith('http') ? _react.default.createElement("a", {
          className: "top-bar__link",
          key: item.link,
          href: item.link,
          target: "_blank",
          rel: "noopener noreferrer"
        }, _react.default.createElement(_TopBarButton.default, {
          item: item,
          isActive: _this.isActive(item.link),
          onActiveTab: function onActiveTab() {
            return _this.props.onActiveTab(item.link);
          },
          tabIndex: i
        })) : _react.default.createElement(_reactRouterDom.Link, {
          className: "top-bar__link",
          key: item.link,
          to: item.link
        }, _react.default.createElement(_TopBarButton.default, {
          item: item,
          isActive: _this.isActive(item.link),
          onActiveTab: function onActiveTab() {
            return _this.props.onActiveTab(item.link);
          },
          tabIndex: i
        }));
      }), this.props.user.username !== undefined && _react.default.createElement("button", {
        className: "top-bar__link",
        onClick: this.props.onLogout,
        type: "button"
      }, _react.default.createElement(_TopBarButton.default, {
        item: {
          name: this.props.user.username,
          iconClassName: 'g3-icon g3-icon--exit'
        },
        tabIndex: this.props.tabItems.length
      })))));
    }
  }]);

  return TopBar;
}(_react.Component);

TopBar.propTypes = {
  tabItems: _propTypes.default.array.isRequired,
  user: _propTypes.default.shape({
    username: _propTypes.default.string
  }).isRequired,
  activeTab: _propTypes.default.string,
  onActiveTab: _propTypes.default.func,
  onLogout: _propTypes.default.func.isRequired
};
TopBar.defaultProps = {
  activeTab: '',
  onActiveTab: function onActiveTab() {}
};
var _default = TopBar;
exports.default = _default;