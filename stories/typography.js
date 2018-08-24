import React from 'react';
import { storiesOf } from '@storybook/react';
import '../src/css/base.css';

const typoDemoItemStyle = {
  height: '80px',
  borderBottom: 'solid gray 1px',
  paddingTop: '10px',
  paddingLeft: '10px',
};

storiesOf('General/Typography', module)
  .add('Typography normal', () => (
    <div>
      <div className="typo-demo-block" style={typoDemoItemStyle}>
        <h1 className="h1">
H1 - This is a main title
        </h1>
      </div>
      <div className="typo-demo-block" style={typoDemoItemStyle}>
        <h2 className="h2">
H2 - This is a main title
        </h2>
      </div>
      <div className="typo-demo-block" style={typoDemoItemStyle}>
        <h3 className="h3">
H3 - This is a main title
        </h3>
      </div>
      <div className="typo-demo-block" style={typoDemoItemStyle}>
        <h4 className="h4">
H4 - This is a main title
        </h4>
      </div>
      <div className="typo-demo-block" style={typoDemoItemStyle}>
        <div className="introduction">
This is some introduction:
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu 
          pretium. Mauris elit orci, ultricies id fermentum vel, porta et eros. Vestibulum 
          condimentum lectus
        </div>
      </div>
      <div className="typo-demo-block" style={typoDemoItemStyle}>
        <div className="body">
This is body: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam 
eu pretium. Mauris elit orci, ultricies id fermentum vel, porta et eros. Vestibulum condimentum 
lectus in convallis feugiat. Sed vulputate fringilla felis. Aliquam ut arcu et dui feugiat 
scelerisque eu quis diam. Mauris placerat congue dui
        </div>
      </div>
      <div className="typo-demo-block" style={typoDemoItemStyle}>
        <div className="caption">
Caption
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu 
          pretium. Mauris elit orci, ultricies id fermentum vel, porta et eros. Vestibulum 
          condimentum lectus in convallis feugiat. Sed vulputate fringilla felis. Aliquam ut arcu 
          et dui feugiat scelerisque eu quis diam. Mauris placerat congue dui sit amet blandit. 
          Phasellus condimentum libero vel velit auctor, sit amet tincidunt velit varius.
        </div>
      </div>
      <div className="typo-demo-block" style={typoDemoItemStyle}>
        <div className="special-number">
Special Number
        </div>
      </div>
    </div>
  ))
  .add('Typography for form', () => (
    <div>
      <div className="typo-demo-block" style={typoDemoItemStyle}>
        <div className="form-body">
Form Body - This is form body
        </div>
      </div>
      <div className="typo-demo-block" style={typoDemoItemStyle}>
        <div className="form-h1">
Form H1 - This is form h1
        </div>
      </div>
      <div className="typo-demo-block" style={typoDemoItemStyle}>
        <div className="form-h2">
Form H2 - This is form h2
        </div>
      </div>
      <div className="typo-demo-block" style={typoDemoItemStyle}>
        <div className="form-caption">
Form Caption - This is form caption
        </div>
      </div>
      <div className="typo-demo-block" style={typoDemoItemStyle}>
        <div className="form-special-number">
Form Special Number - This is form special number
        </div>
      </div>
    </div>
  ));
