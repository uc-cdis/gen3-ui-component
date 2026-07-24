import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getSuggestionItemHTML } from './AutoCompleteSuggestions';
import AutoComplete from '.';

describe('<AutoComplete />', () => {
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

  const suggestionList = [suggestionItem1, suggestionItem2];

  const suggestionItemClickFunc = jest.fn();
  const inputChangeFunc = jest.fn();
  const submitInputFunc = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props = {}) => {
    return render(
      <AutoComplete
        suggestionList={suggestionList}
        onSuggestionItemClick={suggestionItemClickFunc}
        onInputChange={inputChangeFunc}
        onSubmitInput={submitInputFunc}
        {...props}
      />,
    );
  };

  it('renders correctly', () => {
    const { container } = renderComponent();
    expect(container.firstChild).toBeInTheDocument();
  });

  it('calls onInputChange function when typing', async () => {
    const user = userEvent.setup();
    const { container } = renderComponent();

    const inputElem = container.querySelector('.auto-complete-input__input-box');
    const testInput = 'test';

    await user.type(inputElem, testInput);

    expect(inputChangeFunc).toHaveBeenCalledTimes(testInput.length);
  });

  it('calls onSubmitInput function when submitting form or clicking icon', async () => {
    const user = userEvent.setup();
    const { container } = renderComponent();

    const formElem = container.querySelector('.auto-complete-input__form');
    fireEvent.submit(formElem);
    expect(submitInputFunc).toHaveBeenCalledTimes(1);

    const iconElem = container.querySelector('.auto-complete-input__icon');
    await user.click(iconElem);
    expect(submitInputFunc).toHaveBeenCalledTimes(2);
  });

  it('calls onSuggestionItemClick when clicking suggestion items', async () => {
    const user = userEvent.setup();
    const { container } = renderComponent();

    const firstItemElem = container.querySelector('.auto-complete-suggestions__item');
    await user.click(firstItemElem);

    expect(suggestionItemClickFunc).toHaveBeenCalledTimes(1);
  });

  it('builds html for suggestion items', () => {
    const { container } = render(<div>{getSuggestionItemHTML(suggestionItem1)}</div>);
    const highlightElems = container.querySelectorAll('.auto-complete-suggestions__highlight');

    expect(highlightElems.length).toBe(suggestionItem1.matchedPieceIndices.length);
  });

  it('could clear input', async () => {
    const user = userEvent.setup();
    const { container } = renderComponent();

    const inputElem = container.querySelector('.auto-complete-input__input-box');

    await user.type(inputElem, 'test');
    expect(inputElem.value).toBe('test');

    await user.clear(inputElem);
    expect(inputElem.value).toBe('');
  });
});
