'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _reactRouterDom = require('react-router-dom');

var _TopBar = require('./TopBar');

var _TopBar2 = _interopRequireDefault(_TopBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tabItems = [{ iconClassName: 'g3-icon g3-icon--upload', link: '/submission', name: 'Data Submission' }, { link: 'https://uc-cdis.github.io/gen3-user-doc/user-guide/guide-overview', name: 'Documentation' }, { iconClassName: 'g3-icon g3-icon--exploration', link: '/explorer', name: 'Explorer' }];

var user = {
  username: 'test-user'
};

var onActiveTab = jest.fn();
var onLogout = jest.fn();

describe('<TopBar />', function () {
  var component = (0, _enzyme.mount)(_react2.default.createElement(
    _reactRouterDom.StaticRouter,
    { location: { pathname: '/' }, context: {} },
    _react2.default.createElement(_TopBar2.default, {
      tabItems: tabItems,
      user: user,
      onActiveTab: onActiveTab,
      onLogout: onLogout
    })
  ));

  it('renders', function () {
    expect(component.find('TopBar').length).toBe(1);
  });

  it('maps external and internal links properly', function () {
    expect(component.find('Link').length).toBe(2);
    expect(component.find('a').length).toBe(tabItems.length);
  });

  it('wont show the user if undefined', function () {
    var noUserComponent = (0, _enzyme.mount)(_react2.default.createElement(
      _reactRouterDom.StaticRouter,
      { location: { pathname: '/' }, context: {} },
      _react2.default.createElement(_TopBar2.default, {
        tabItems: tabItems,
        user: {},
        onActiveTab: onActiveTab,
        onLogout: onLogout
      })
    ));
    expect(noUserComponent.find('button').length).toBe(0);
  });
});