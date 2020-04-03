import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';
import { FixedSizeList } from 'react-window';
import debounce from 'lodash.debounce';
import SingleSelectFilter from '../SingleSelectFilter';
import Chip from '../Chip';
import Spinner from '../../Spinner/Spinner';
import RangeFilter from '../RangeFilter';
import './FilterSection.css';


const getNumValuesSelected = (filterStatus) => {
  let numSelected = 0;
  if (Array.isArray(filterStatus)) {
    numSelected = 1;
    return numSelected;
  }
  const statuses = Object.values(filterStatus);
  statuses.forEach((status) => {
    if (status === true || Array.isArray(status)) {
      numSelected += 1;
    }
  });
  return numSelected;
};

class FilterSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: this.props.expanded,
      showingMore: false,
      filterStatus: {}, // shape: { [fieldName]: true | false } | [number, number]
      searchInputValue: '',
      searchIsPending: false,
      showingSearch: false,

      // used for rerendering child components when reset button is clicked
      resetClickCounter: 0,

      // option visible status filtered by the search inputbox
      visibleOptions: this.getVisibleOptions(this.props.options),
    };

    // If there are a lot of options, debounce the search input for performance.
    this.hasManyOptions = this.state.visibleOptions.length > 100;
    const debounceTime = this.hasManyOptions
      ? 750 // ms
      : 0; // ms
    this.debouncedUpdateVisibleOptions = debounce(
      this.updateVisibleOptions,
      debounceTime,
    );

    // Calculate the height of the list element:
    // When collapsed, show up to initVisibleItemNumber elements. When expanded, show up to
    // expandedVisibleItemNumber elements.
    // If there are more items than can be displayed,
    // show half of the next item as an indicator that the list can be scrolled.
    this.listItemHeight = 25; // px
    const expandedVisibleItemNumber = 15;
    this.listHeight = this.state.visibleOptions.length <= this.props.initVisibleItemNumber
      ? this.listItemHeight * this.state.visibleOptions.length
      : (this.listItemHeight * this.props.initVisibleItemNumber) + (this.listItemHeight / 2);
    this.expandedListHeight = this.state.visibleOptions.length <= expandedVisibleItemNumber
      ? this.listItemHeight * this.state.visibleOptions.length
      : (this.listItemHeight * expandedVisibleItemNumber) + (this.listItemHeight / 2);
  }

  // getVisibleOptions returns the indices of the elements in optionList that are visible.
  getVisibleOptions(optionList, inputText) {
    const options = [];
    optionList.forEach((o, i) => {
      // Options with count of 0 are not visible if props.hideZero is true,
      // and options with count of -1 are never visible.
      if (this.props.hideZero && o.count === 0) {
        return;
      }
      if (o.count === -1) {
        return;
      }
      // If the input text is empty, all other options are visible.
      if (typeof inputText === 'undefined') {
        options.push(i);
      } else {
        const matched = o.text.toLowerCase().indexOf(inputText.toLowerCase()) >= 0;
        if (matched) {
          options.push(i);
        }
      }
    });
    return options;
  }

  getSearchInput() {
    const isHidden = !this.state.showingSearch || !this.state.isExpanded;
    return (
      <div className={`g3-filter-section__search-input ${isHidden && 'g3-filter-section__search-input--hidden'}`}>
        <input
          className='g3-filter-section__search-input-box body'
          value={this.state.searchInputValue}
          onChange={ev => this.handleSearchInputChange(ev)}
        />
        { (this.state.searchIsPending && this.hasManyOptions)
          ? (
            <div className='g3-filter-section__search-input-spinner'>
              <Spinner />
            </div>
          )
          : (
            <i
              className={`g3-icon g3-icon--${this.state.searchInputValue === '' ? 'search' : 'cross'} g3-filter-section__search-input-close`}
              onClick={() => this.state.searchInputValue === '' || this.clearSearchInput()}
              onKeyPress={() => this.state.searchInputValue === '' || this.clearSearchInput()}
              role='button'
              tabIndex={0}
            />
          )
        }
      </div>
    );
  }

  getShowMoreButton() {
    if (this.state.isExpanded) {
      const totalCount = this.state.visibleOptions.length;
      if ((totalCount > this.props.initVisibleItemNumber)) {
        return (
          <div
            className='g3-filter-section__show-more'
            role='button'
            onClick={() => this.toggleShowMore()}
            onKeyPress={() => this.toggleShowMore()}
            tabIndex={0}
          >
            {this.state.showingMore ? 'collapse' : 'expand'}
          </div>
        );
      }
      return null;
    }
    return null;
  }


  handleClearButtonClick(ev) {
    // Prevent this click from triggering any onClick events in parent component
    ev.stopPropagation();
    // Clear the filters
    this.setState(prevState => ({
      filterStatus: {},
      resetClickCounter: prevState.resetClickCounter + 1,
    }));
    this.props.onClear();
  }

  handleSearchInputChange(ev) {
    const searchInputValue = ev.currentTarget.value;
    this.setState({
      searchInputValue,
      searchIsPending: true,
    });
    this.debouncedUpdateVisibleOptions(searchInputValue);
  }

  clearSearchInput() {
    this.setState({
      searchInputValue: '',
    });
    // We don't use the debounced version of updateVisibleOptions here
    // because we don't expect the clear button to be pressed repeatedly.
    this.updateVisibleOptions();
  }

  updateVisibleOptions(inputText) {
    // if empty input, all should be visible
    if (typeof inputText === 'undefined' || inputText.trim() === '') {
      this.setState({
        visibleOptions: this.getVisibleOptions(this.props.options),
        searchIsPending: false,
      });
    }

    // if not empty, filter out those matched
    this.setState({
      visibleOptions: this.getVisibleOptions(this.props.options, inputText),
      searchIsPending: false,
    });
  }

  toggleSection(open) {
    let targetStatus;
    if (typeof open === 'undefined') {
      targetStatus = !this.state.isExpanded;
    } else {
      targetStatus = open;
    }
    this.props.onToggle(targetStatus);
    this.setState({ isExpanded: targetStatus });
  }

  handleSelectSingleSelectFilter(label) {
    this.setState((prevState) => {
      const newFilterStatus = Object.assign({}, prevState.filterStatus);
      const oldSelected = newFilterStatus[label];
      const newSelected = typeof oldSelected === 'undefined' ? true : !oldSelected;
      newFilterStatus[label] = newSelected;
      return {
        filterStatus: newFilterStatus,
      };
    });
    this.props.onSelect(label);
  }

  handleDragRangeFilter(lowerBound, upperBound, minValue, maxValue, rangeStep) {
    this.setState(() => {
      const newFilterStatus = [lowerBound, upperBound];
      return {
        filterStatus: newFilterStatus,
      };
    });
    this.props.onAfterDrag(lowerBound, upperBound, minValue, maxValue, rangeStep);
  }

  toggleShowSearch() {
    this.setState(prevState => ({ showingSearch: !prevState.showingSearch }));
  }

  toggleShowMore() {
    this.setState(prevState => ({ showingMore: !prevState.showingMore }));
  }


  render() {
    // Takes in parent component's filterStatus or self state's filterStatus
    const filterStatus = this.props.filterStatus
      ? this.props.filterStatus : this.state.filterStatus;
    const isTextFilter = this.props.options.length > 0 && this.props.options[0].filterType === 'singleSelect';
    const isRangeFilter = !isTextFilter;
    const lowerBound = (typeof filterStatus === 'undefined' || filterStatus.length !== 2)
      ? undefined
      : filterStatus[0];
    const upperBound = (typeof filterStatus === 'undefined' || filterStatus.length !== 2)
      ? undefined
      : filterStatus[1];
    const numSelected = getNumValuesSelected(filterStatus);
    const sectionHeader = (
      <div className='g3-filter-section__header'>
        <div className='g3-filter-section__toggle-icon-container'>
          <i
            onClick={() => this.toggleSection()}
            onKeyPress={() => this.toggleSection()}
            tabIndex={0}
            role='button'
            className={`g3-filter-section__toggle-icon g3-icon g3-icon-color__coal g3-icon--sm g3-icon--chevron-${this.state.isExpanded ? 'down' : 'right'}`}
          />
        </div>
        <div
          className='g3-filter-section__title-container'
          onClick={() => this.toggleSection()}
          onKeyPress={() => this.toggleSection()}
          tabIndex={0}
          role='button'
        >
          <div className={`g3-filter-section__title ${numSelected !== 0 ? 'g3-filter-section__title--active' : ''}`}>
            {this.props.title}
          </div>
          { (isRangeFilter && numSelected !== 0)
            && (
              <div className='g3-filter-section__selected-count-chip'>
                <div
                  tabIndex={0}
                  role='button'
                  onClick={ev => this.handleClearButtonClick(ev)}
                  onKeyPress={ev => this.handleClearButtonClick(ev)}
                  className='g3-filter-section__range-filter-clear-btn'
                >
                  <div
                    className='g3-filter-section__range-filter-clear-btn-text'
                  >
                    reset
                  </div>
                  <div
                    className='g3-filter-section__range-filter-clear-btn-icon'
                  >
                    <i className='g3-icon g3-icon--sm g3-icon-color__lightgray g3-icon--sm g3-icon--undo' />
                  </div>
                </div>
              </div>
            )
          }
          { (isTextFilter && numSelected !== 0)
            && (
              <div className='g3-filter-section__selected-count-chip'>
                <Chip
                  text={
                    (
                      <React.Fragment>
                        <span className='g3-filter-section__selected-count-chip-text-emphasis'>{numSelected}</span>
                        &nbsp;selected
                      </React.Fragment>
                    )
                  }
                  onClearButtonClick={ev => this.handleClearButtonClick(ev)}
                />
              </div>
            )
          }
        </div>
        {
          isTextFilter && (
            <div
              tabIndex={0}
              role='button'
              onClick={() => this.toggleShowSearch()}
              onKeyPress={() => this.toggleShowSearch()}
            >
              <i
                className='g3-filter-section__search-icon g3-icon g3-icon--sm g3-icon--search'
              />
            </div>
          )
        }
      </div>
    );

    const FixedSizeListItem = ({ style, index }) => {
      const optionIndex = this.state.visibleOptions[index];
      const option = this.props.options[optionIndex];
      return (
        // We use the 'key' prop to force the SingleSelectFilter
        // to rerender on filterStatus change.
        // See https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
        <div style={style}>
          <SingleSelectFilter
            key={`${option.text}-${filterStatus[option.text] ? 'enabled' : 'disabled'}`}
            label={option.text}
            onSelect={label => this.handleSelectSingleSelectFilter(label)}
            selected={filterStatus[option.text]}
            count={option.count}
            hideZero={this.props.hideZero}
            accessible={option.accessible}
            tierAccessLimit={this.props.tierAccessLimit}
            disabled={option.disabled}
            lockedTooltipMessage={this.props.lockedTooltipMessage}
            disabledTooltipMessage={this.props.disabledTooltipMessage}
          />
        </div>
      );
    };

    return (
      <div className='g3-filter-section'>
        {
          this.props.tooltip ? (
            <Tooltip
              placement='topLeft'
              overlay={(<span>{this.props.tooltip}</span>)}
              arrowContent={<div className='rc-tooltip-arrow-inner' />}
              overlayClassName='g3-filter-section__tooltip'
            >
              {sectionHeader}
            </Tooltip>
          ) : sectionHeader
        }
        {
          isTextFilter && this.getSearchInput()
        }
        { this.state.isExpanded
          && (
            <div className='g3-filter-section__options'>
              { isTextFilter && (
                <FixedSizeList
                  itemCount={this.state.visibleOptions.length}
                  itemSize={this.listItemHeight}
                  height={this.state.showingMore
                    ? this.expandedListHeight
                    : this.listHeight
                  }
                >
                  {FixedSizeListItem}
                </FixedSizeList>
              )}
              { isRangeFilter && (
                // NOTE: We use the 'key' prop to force the RangeFilter
                // to rerender if the `reset` button is clicked.
                // Each reset button click increments the counter and changes the key.
                // See https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
                // NOTE: We set hideValue={-1} here because Guppy returns a count of -1
                // when the count is hidden from the end user.
                <RangeFilter
                  key={`${this.props.options[0].text}-${this.state.resetClickCounter}`}
                  label={this.props.options[0].text}
                  min={this.props.options[0].min}
                  max={this.props.options[0].max}
                  onAfterDrag={(lb, ub, min, max, step) => this.handleDragRangeFilter(
                    lb, ub, min, max, step)}
                  lowerBound={lowerBound}
                  upperBound={upperBound}
                  inactive={lowerBound === undefined && upperBound === undefined}
                  count={this.props.options[0].count}
                  hideValue={-1}
                />
              )}
              {this.getShowMoreButton()}
            </div>
          )
        }
      </div>
    );
  }
}

FilterSection.propTypes = {
  title: PropTypes.string,
  tooltip: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    filterType: PropTypes.oneOf(['singleSelect', 'range']).isRequired,
    text: PropTypes.string,
    count: PropTypes.number, // both filters need this for access control

    // for single select filter
    accessible: PropTypes.bool,
    disabled: PropTypes.bool,

    // for range filter
    min: PropTypes.number,
    max: PropTypes.number,
    rangeStep: PropTypes.number, // by default 1

  })),
  onSelect: PropTypes.func.isRequired,
  onAfterDrag: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  filterStatus: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  initVisibleItemNumber: PropTypes.number,
  hideZero: PropTypes.bool,
  tierAccessLimit: PropTypes.number,
  lockedTooltipMessage: PropTypes.string,
  disabledTooltipMessage: PropTypes.string,
};

FilterSection.defaultProps = {
  title: '',
  tooltip: null,
  options: [],
  expanded: true,
  onToggle: () => {},
  onClear: () => {},
  filterStatus: undefined,
  initVisibleItemNumber: 5,
  hideZero: true,
  tierAccessLimit: undefined,
  lockedTooltipMessage: '',
  disabledTooltipMessage: '',
};

export default FilterSection;
