import React from 'react';
import { storiesOf } from '@storybook/react';
import '../src/css/icon.css';
import './icon-story.css';

const iconClassList = [
  'g3-icon--upload-white',
  'g3-icon--download',
  'g3-icon--upload',
  'g3-icon--back',
  'g3-icon--copy',
  'g3-icon--key',
  'g3-icon--cross-key',
  'g3-icon--cross',
  'g3-icon--delete',
  'g3-icon--exit',
  'g3-icon--link',
  'g3-icon--profile g3-icon--lg',
  'g3-icon--query g3-icon--lg',
  'g3-icon--workspace g3-icon--lg',
  'g3-icon--analysis g3-icon--lg',
  'g3-icon--dictionary g3-icon--lg',
  'g3-icon--exploration g3-icon--lg',
  'g3-icon--files g3-icon--lg',
  'g3-icon--graph g3-icon--lg',
];

storiesOf('General/Icons and Images', module)
  .add('Icons', () => (
    <div className="icon-demo">
      {
        iconClassList.map(iconClass => (
          <div className="icon-demo__card">
            <div className="icon-demo__icon-wrap">
              <i className={`icon-demo__icon g3-icon ${iconClass}`} />
            </div>
            <div>
              {iconClass.split(' ').map(iconClassName => (
                <p className="icon-demo__text">
                  {iconClassName}
                </p>
              ))}
            </div>
          </div>
        ))
      }
    </div>
  ));
