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
  .add('w/ Tooltip', () => (
    <Button buttonType='primary' label='Tooltip Button' onClick={action('button click')} leftIcon='download' rightIcon='copy' tooltipEnabled={true} tooltipText='This is a tooltip a user could use to display a message.'/>
  ));
