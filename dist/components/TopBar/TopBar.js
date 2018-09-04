'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TopBarButton = require('./TopBarButton');

var _TopBarButton2 = _interopRequireDefault(_TopBarButton);

require('./TopBar.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TopBar = function (_Component) {
  _inherits(TopBar, _Component);

  function TopBar() {
    _classCallCheck(this, TopBar);

    return _possibleConstructorReturn(this, (TopBar.__proto__ || Object.getPrototypeOf(TopBar)).apply(this, arguments));
  }

  _createClass(TopBar, [{
    key: 'isActive',
    value: function isActive(id) {
      return this.props.activeTab === id;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'top-bar' },
        _react2.default.createElement(
          'header',
          { className: 'top-bar__header' },
          _react2.default.createElement(
            'nav',
            { className: 'top-bar__nav' },
            this.props.tabItems.map(function (item, i) {
              return item.link.startsWith('http') ? _react2.default.createElement(
                'a',
                {
                  className: 'top-bar__link',
                  key: item.link,
                  href: item.link,
                  target: '_blank',
                  rel: 'noopener noreferrer'
                },
                _react2.default.createElement(_TopBarButton2.default, {
                  item: item,
                  isActive: _this2.isActive(item.link),
                  onActiveTab: function onActiveTab() {
                    return _this2.props.onActiveTab(item.link);
                  },
                  tabIndex: i
                })
              ) : _react2.default.createElement(
                _reactRouterDom.Link,
                {
                  className: 'top-bar__link',
                  key: item.link,
                  to: item.link
                },
                _react2.default.createElement(_TopBarButton2.default, {
                  item: item,
                  isActive: _this2.isActive(item.link),
                  onActiveTab: function onActiveTab() {
                    return _this2.props.onActiveTab(item.link);
                  },
                  tabIndex: i
                })
              );
            }),
            this.props.user.username !== undefined && _react2.default.createElement(
              'button',
              {
                className: 'top-bar__link',
                onClick: this.props.onLogout,
                type: 'button'
              },
              _react2.default.createElement(_TopBarButton2.default, {
                item: {
                  name: this.props.user.username,
                  iconClassName: 'g3-icon g3-icon--exit'
                },
                tabIndex: this.props.tabItems.length
              })
            )
          )
        )
      );
    }
  }]);

  return TopBar;
}(_react.Component);

TopBar.propTypes = {
  tabItems: _propTypes2.default.array.isRequired,
  user: _propTypes2.default.shape({ username: _propTypes2.default.string }).isRequired,
  activeTab: _propTypes2.default.string,
  onActiveTab: _propTypes2.default.func,
  onLogout: _propTypes2.default.func.isRequired
};

TopBar.defaultProps = {
  activeTab: '',
  onActiveTab: function onActiveTab() {}
};

exports.default = TopBar;