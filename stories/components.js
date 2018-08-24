import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../src/components/Button';

const clickFunction = (e) => {
  console.log('clicking on button ', e.target);
};

storiesOf('Components', module)
  .add('Button Primary White', () => (
    <React.Fragment>
      <Button type="primary" label="Primary Button" onClick={clickFunction} />
      <Button type="secondary" label="Secondary Button" onClick={clickFunction} />
      <Button type="primary" label="Disabled Button" onClick={clickFunction} enabled={false} />
    </React.Fragment>
  ));
