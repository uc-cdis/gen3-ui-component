# Gen3 UI Component Library

UI library for Gen3 apps

## Quick Start
### Install
Install with npm:
```
$ npm install --save @gen3/ui-component
```
### Usage
```
import Button from '@gen3/ui-component/dist/components/Button';
const myFunc = () => {
  console.log('clicked!');
};

<Button buttonType='primary' label='Primary Button' onClick={myFunc} leftIcon=’download’ />
```

### API
Clone the repo and try more components:
```
$ git clone git@github.com:uc-cdis/gen3-ui-component.git
npm run storybook
```

## For Developers
Run following scripts before commit:
```
$ npm version patch
```
It will bump the version of the npm package and commit the change.
