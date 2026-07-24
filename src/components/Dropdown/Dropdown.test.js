import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dropdown from '.';

describe('<Dropdown />', () => {
  const func1 = jest.fn();
  const func2 = jest.fn();
  const func3 = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders standard dropdown and toggles menu on click', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Dropdown>
        <Dropdown.Button>Dropdown</Dropdown.Button>
        <Dropdown.Menu>
          <Dropdown.Item onClick={func1}>item1</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    );

    const mainButton = container.querySelector('.g3-dropdown-button__button');
    expect(mainButton).toBeInTheDocument();

    await user.click(mainButton);
    const item = container.querySelector('.g3-dropdown__item');
    await user.click(item);

    expect(func1).toHaveBeenCalledTimes(1);
  });

  it('handles split dropdown behavior correctly', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Dropdown>
        <Dropdown.Button split onClick={func2}>
          Dropdown
        </Dropdown.Button>
        <Dropdown.Menu>
          <Dropdown.Item onClick={func3}>item1</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    );

    const mainButton = container.querySelector('.g3-dropdown-button__button');
    const menuTrigger = container.querySelector('.g3-dropdown-button__menu-trigger');

    await user.click(mainButton);
    expect(func2).toHaveBeenCalledTimes(1);

    await user.click(menuTrigger);
    const item = container.querySelector('.g3-dropdown__item');
    await user.click(item);

    expect(func3).toHaveBeenCalledTimes(1);
  });
});
