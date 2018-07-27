import React from 'react';
import { mount } from 'enzyme';
import Button from './Button';

describe('<Button />', () => {
  const btn = mount(<Button label="test-button"></Button>).find(Button);

  it('renders', () => {
    expect(btn.length).toBe(1);
  });
});
