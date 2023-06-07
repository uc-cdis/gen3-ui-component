import React from 'react';
import { action } from '@storybook/addon-actions';
import CommonsLogin from '../src/components/CommonsLogin/.';
import kfLogo from '../src/images/logos/kf-logo.png';

export default {
  title: 'Login',
};

export const _CommonsLogin = () => (
  <div style={{ width: '250px' }}>
    <CommonsLogin
      title="KidsFirst"
      logoSrc={kfLogo}
      buttonTitle="Connect"
      onButtonClick={() => action('login click')('kf')}
    />
  </div>
);

_CommonsLogin.story = {
  name: 'CommonsLogin',
};

export const CommonsLoginWithMessage = () => (
  <div style={{ width: '250px' }}>
    <CommonsLogin
      title="KidsFirst"
      logoSrc={kfLogo}
      buttonTitle="Disconnect"
      onButtonClick={() => action('logout click')('kf')}
      message="Connected!"
      buttonType="primary"
    />
  </div>
);

CommonsLoginWithMessage.story = {
  name: 'CommonsLogin with message',
};
