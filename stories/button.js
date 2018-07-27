import React from 'react';
import { storiesOf } from '@storybook/react';
import '../src/css/base.css'

storiesOf('Components/Buttons', module)
  .add('Button Primary White', () => (
    <button className="btn-primary-white">btn-primay-white</button>
  ))
  .add('Button Primary Orange', () => (
    <button className="btn-primary-orange">btn-primay-white</button>
  ));
