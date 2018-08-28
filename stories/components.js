import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../src/components/Button';

const clickFunction = (e) => {
  console.log('clicking on button ', e.target);
};

storiesOf('Components', module)
  .add('Buttons', () => (
    <React.Fragment>
      <Button buttonType='primary' label='Primary Button' onClick={clickFunction} leftIcon='download' rightIcon='copy' />
      <Button buttonType='secondary' label='Secondary Button' onClick={clickFunction} leftIcon='download' rightIcon='copy' />
      <Button buttonType='primary' label='Disabled Button' onClick={clickFunction} enabled={false} leftIcon='download' rightIcon='copy' />
    </React.Fragment>
  ));
