'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<Button />', function () {
  var btn = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { label: 'test-button' })).find(_2.default);

  it('renders', function () {
    expect(btn.length).toBe(1);
  });
});