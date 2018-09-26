import React from 'react';
import { mount } from 'enzyme';
import Dropdown from '.';

describe('<Dropdown />', () => {
  const func1 = jest.fn();
  const func2 = jest.fn();
  const func3 = jest.fn();
  const connectedWrapper = mount(
    <Dropdown>
      <Dropdown.Toggle>
        Dropdown
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={func1}>
item1
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>,
  );
  const separateWrapper = mount(
    <Dropdown>
      <Dropdown.Toggle separate onClick={func2}>
        Dropdown
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={func3}>
item1
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>,
  );

  it('renders', () => {
    expect(connectedWrapper.find(Dropdown).length).toBe(1);
    expect(connectedWrapper.state().menuOpen).toEqual(false);
  });

  it('could toggle correctly', () => {
    connectedWrapper.find('.g3-dropdown__toggle-main').simulate('click');
    expect(connectedWrapper.state().menuOpen).toBe(true);
    connectedWrapper.find('.g3-dropdown__item').simulate('click');
    expect(func1.mock.calls.length).toBe(1);

    separateWrapper.find('.g3-dropdown__toggle-main').simulate('click');
    expect(separateWrapper.state().menuOpen).toBe(false);
    expect(func2.mock.calls.length).toBe(1);
    separateWrapper.find('.g3-dropdown__toggle-separated').simulate('click');
    expect(separateWrapper.state().menuOpen).toBe(true);
    separateWrapper.find('.g3-dropdown__item').simulate('click');
    expect(func3.mock.calls.length).toBe(1);
  });
});
