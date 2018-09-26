import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Dropdown from '../src/components/Dropdown';

storiesOf('Dropdown', module)
  .add('Separate Dropdown', () => (
    <Dropdown buttonType='secondary' className='my-dropdown'>
      <Dropdown.Toggle separate onClick={action('item0 clicked')}>
          Separate Dropdown
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={action('item1 clicked')} leftIcon='datafile' rightIcon='download'>
item1
        </Dropdown.Item>
        <Dropdown.Item onClick={action('item2 clicked')} leftIcon='planet' rightIcon='download'>
item2
        </Dropdown.Item>
        <Dropdown.Item onClick={action('item3 clicked')} leftIcon='clinical' rightIcon='download'>
item3
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ))
  .add('Single Dropdown', () => (
    <Dropdown buttonType='primary' className='my-dropdown'>
      <Dropdown.Toggle onClick={action('item0 clicked')}>
          Dropdown
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={action('item1 clicked')} leftIcon='datafile'>
item1
        </Dropdown.Item>
        <Dropdown.Item onClick={action('item2 clicked')} leftIcon='upload'>
item2
        </Dropdown.Item>
        <Dropdown.Item onClick={action('item3 clicked')} leftIcon='clinical' disabled>
item3
        </Dropdown.Item>
        <Dropdown.MenuDivider />
        <Dropdown.Item onClick={action('item4 clicked')} leftIcon='workspace'>
item4
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ))
  .add('Disabled', () => (
    <Dropdown disabled buttonType='primary' className='my-dropdown'>
      <Dropdown.Toggle onClick={action('item0 clicked')}>
          Dropdown
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={action('item1 clicked')} leftIcon='datafile'>
item1
        </Dropdown.Item>
        <Dropdown.Item onClick={action('item2 clicked')} leftIcon='upload'>
item2
        </Dropdown.Item>
        <Dropdown.Item onClick={action('item3 clicked')} leftIcon='clinical'>
item3
        </Dropdown.Item>
        <Dropdown.MenuDivider />
        <Dropdown.Item onClick={action('item4 clicked')} leftIcon='workspace'>
item4
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ));
