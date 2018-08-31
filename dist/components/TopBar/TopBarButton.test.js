'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _TopBarButton = require('./TopBarButton');

var _TopBarButton2 = _interopRequireDefault(_TopBarButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var internalLink = {
  iconClassName: 'g3-icon g3-icon--upload',
  link: '/submission',
  name: 'Data Submission'
};

var externalLink = {
  link: 'https://uc-cdis.github.io/gen3-user-doc/user-guide/guide-overview',
  name: 'Documentation'
};

var onActiveTab = jest.fn();
var activeClassName = '.top-bar-button .top-bar-button--active .body';

describe('<TopBar />', function () {
  var internalButton = (0, _enzyme.mount)(_react2.default.createElement(_TopBarButton2.default, {
    item: internalLink,
    onActiveTab: onActiveTab,
    tabIndex: 0,
    isActive: true
  }));

  var externalButton = (0, _enzyme.mount)(_react2.default.createElement(_TopBarButton2.default, {
    item: externalLink,
    onActiveTab: onActiveTab,
    tabIndex: 0
  }));

  it('renders', function () {
    expect(internalButton.find('TopBarButton').length).toBe(1);
  });

  it('applies the proper class name', function () {
    expect(internalButton.find('TopBarButton').props().isActive).toBe(true);
    expect(internalButton.find(activeClassName).length).toBe(1);

    expect(externalButton.find('TopBarButton').props().isActive).toBe(false);
    expect(externalButton.find(activeClassName).length).toBe(0);
  });
});