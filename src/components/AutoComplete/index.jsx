import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoCompleteInput from './AutoCompleteInput';
import AutoCompleteSuggestions, { SuggestionItem } from './AutoCompleteSuggestions';
import './AutoComplete.css';

class AutoComplete extends Component {
  render() {
    const emptySuggestionsClassModifier = this.props.suggestionList.length === 0 ? 'auto-complete--empty-suggestion-list' : '';
    return (
      <div className={`auto-complete ${emptySuggestionsClassModifier}`}>
        <div className='auto-complete__input-wrapper'>
          <AutoCompleteInput
            placeHolderText={this.props.inputPlaceHolderText}
            icon={this.props.inputIcon}
            onInputChange={this.props.onInputChange}
            onSubmitInput={this.props.onSubmitInput}
          />
        </div>
        <AutoCompleteSuggestions
          className='auto-complete__suggestions'
          suggestionList={this.props.suggestionList}
          onSuggestionItemClick={this.props.onSuggestionItemClick}
        />
      </div>
    );
  }
}

AutoComplete.propTypes = {
  onInputChange: PropTypes.func,
  suggestionList: PropTypes.arrayOf(PropTypes.shape(SuggestionItem)),
  inputPlaceHolderText: PropTypes.string,
  inputIcon: PropTypes.string,
  onSuggestionItemClick: PropTypes.func,
  onSubmitInput: PropTypes.func,
};

AutoComplete.defaultProps = {
  onInputChange: () => {},
  suggestionList: [],
  inputPlaceHolderText: 'Search',
  inputIcon: 'search',
  onSuggestionItemClick: () => {},
  onSubmitInput: () => {},
};

export default AutoComplete;
