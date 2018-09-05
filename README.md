# Gen3 UI Component Library

UI library for Gen3 apps

## Quick Start
### Install 
```
Install with npm: npm install --save @gen3/ui-component
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
git clone git@github.com:uc-cdis/gen3-ui-component.git
npm run storybook
```

## For Developers
Run following script before commit: 
```
npm run prepare
```
This will do some compiling and parsing job and generate result scripts under `dist` directory. 
