import React from 'react';
import { storiesOf } from '@storybook/react';
import '../src/css/base.css'

const systemColorBlockStyle = {
  width: '50px', 
  height: '50px', 
  display: 'inline-block',
};

const visColorBlockStyle = {
  width: '50px', 
  height: '50px', 
  display: 'inline-block',
};

const coreSystemColors = [
  [
    {name: 'base-blue', color: 'base-blue'}, 
    {name: 'base-blue-light', color: 'base-blue-light'},
  ],
  [
    {name: 'highlight-orange', color: 'highlight-orange'},
    {name: 'highlight-orange-light', color: 'highlight-orange-light'},
  ],
  [
    {name: 'bg-coal', color: 'bg-coal'},
    {name: 'bg-cloud', color: 'bg-cloud'},
  ],
];

const supportSystemColors = [
  [
    {name: 'gray', color: 'gray'},
    {name: 'lightgray', color: 'lightgray'},
  ],
  [
    {name: 'smoke', color: 'smoke'},
    {name: 'silver', color: 'silver'},
  ],
];

const extendSystemColors = [
  [
    {name: 'black', color: 'black'},
    {name: 'white', color: 'white'},
  ],
];

const visColors = [
  {name: 'base-blue', color: 'base-blue'},
  {name: 'lime', color: 'lime'},
  {name: 'iris', color: 'iris'},
  {name: 'rose', color: 'rose'},
  {name: 'bee', color: 'bee'},
  {name: 'base-blue-light', color: 'base-blue-light'},
  {name: 'pink', color: 'pink'},
  {name: 'highlight-orange', color: 'highlight-orange'},
  {name: 'mint', color: 'mint'},
];

storiesOf('General/Colors', module)
  .add('System Colors', () => (
    <div>
      <div>
        <h4>Core System Colors</h4>
        {
          coreSystemColors.map(group => (
            <div>
              {
                group.map(entry => (
                  <div>
                    <div style={systemColorBlockStyle} className={'gen3-color-'+entry.color}></div>
                    <span>{entry.name}</span>
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
      <div>
        <h4>Support System Colors</h4>
        {
          supportSystemColors.map(group => (
            <div>
              {
                group.map(entry => (
                  <div>
                    <div style={systemColorBlockStyle} className={'gen3-color-'+entry.color}></div>
                    <span>{entry.name}</span>
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
      <div>
        <h4>Extended Colors</h4>
        {
          extendSystemColors.map(group => (
            <div>
              {
                group.map(entry => (
                  <div>
                    <div style={systemColorBlockStyle} className={'gen3-color-'+entry.color}></div>
                    <span>{entry.name}</span>
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  ))
  .add('Data Visualization Colors', () => (
    <div>
    {
      visColors.map(entry => (
        <div>
          <div style={visColorBlockStyle} className={'gen3-color-'+entry.color}></div>
          <span className="body">{entry.name}</span>
        </div>
      ))
    }
    </div>
  ));
  
