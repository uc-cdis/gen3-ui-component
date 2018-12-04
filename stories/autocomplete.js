import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AutoComplete from '../src/components/AutoComplete';

const suggestionItem1 = {
  fullString: 'abcdea',
  matchedPieceIndices: [
    [0, 1],
    [5, 6],
  ],
};

const suggestionItem2 = {
  fullString: 'abcdefga',
  matchedPieceIndices: [
    [0, 1],
    [7, 8],
  ],
};

const suggestionList = [
  suggestionItem1,
  suggestionItem2,
];

const suggestionItemClickFunc = (suggestionItem, i) => {
  console.log(suggestionItem, i);
};

const inputChangeFunc = (inputText) => {
  console.log(inputText);
};

const submitInputFunc = inputText => {
  console.log('submit ', inputText);
};

storiesOf('AutoComplete', module)
  .add('autocomplete', () => (
    <AutoComplete
      suggestionList={suggestionList}
      inputPlaceHolderText='Search in Dictionary'
      onSuggestionItemClick={suggestionItemClickFunc}
      onInputChange={inputChangeFunc}
      onSubmitInput={submitInputFunc}
    />
  ));
