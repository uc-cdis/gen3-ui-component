import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../src/components/Button';

storiesOf('Buttons', module)
  .add('Primary', () => (
    <Button buttonType='primary' label='Primary Button' onClick={action('button click')} leftIcon='download' rightIcon='copy' />
  ))
  .add('Secondary', () => (
    <Button buttonType='secondary' label='Secondary Button' onClick={action('button click')} leftIcon='download' rightIcon='copy' />
  ))
  .add('Default', () => (
    <Button buttonType='default' label='Default Button' onClick={action('button click')} leftIcon='download' rightIcon='copy' />
  ))
  .add('Disabled', () => (
    <Button buttonType='primary' label='Disabled Button' onClick={action('button click')} enabled={false} leftIcon='download' rightIcon='copy' />
  ))
  .add('Multiple w/ Tooltip', () => (
    <div>
      <Button buttonType='primary' label='Tooltip Button 1' onClick={action('button click')} leftIcon='download' rightIcon='copy' tooltipEnabled={true} tooltipText='This is a tooltip a user could use to display a message.'/>
      <Button buttonType='primary' label='Tooltip Button 2' enabled={false} onClick={action('button click')} leftIcon='download' rightIcon='copy' tooltipEnabled={true} tooltipText='This would describe why the button is disabled.'/>
      <Button buttonType='primary' label='Tooltip Button 3' onClick={action('button click')} leftIcon='download' rightIcon='copy' tooltipEnabled={true} tooltipText='This is a tooltip a user could use to display a message.'/>
    </div>
  ));
