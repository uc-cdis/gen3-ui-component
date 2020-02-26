import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';
import SingleSelectFilter from '../SingleSelectFilter';
import SelectedCountChip from '../SelectedCountChip';
import RangeFilter from '../RangeFilter';
import './FilterSection.css';

const filterVisibleStatusObj = (optionList, inputText) => {
  const res = {};
  optionList.forEach((o) => {
    if (typeof inputText === 'undefined') {
      res[o.text] = true;
    } else {
      const matched = o.text.toLowerCase().indexOf(inputText.toLowerCase()) >= 0;
      res[o.text] = matched;
    }
  });
  return res;
};

class FilterSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: this.props.expanded,
      showingMore: false,
      filterStatus: {},
      searchInputEmpty: true,
      showingSearch: false,

      // option visible status filtered by the search inputbox
      optionsVisibleStatus: filterVisibleStatusObj(this.props.options),
    };
    this.inputElem = React.createRef();
  }

  getSearchInput() {
    const isHidden = !this.state.showingSearch || !this.state.isExpanded;
    return (
      <div className={`g3-filter-section__search-input ${isHidden && 'g3-filter-section__search-input--hidden'}`}>
        <input
          className='g3-filter-section__search-input-box body'
          onChange={() => { this.handleSearchInputChange(); }}
          ref={this.inputElem}
        />
        <i
          className={`g3-icon g3-icon--${this.state.searchInputEmpty ? 'search' : 'cross'} g3-filter-section__search-input-close`}
          onClick={() => this.state.searchInputEmpty || this.clearSearchInput()}
          onKeyPress={() => this.state.searchInputEmpty || this.clearSearchInput()}
          role='button'
          tabIndex={0}
        />
      </div>
    );
  }

  getShowMoreButton() {
    if (this.state.isExpanded) {
      const totalCount = this.props.options
        .filter(o => (o.count > 0 || !this.props.hideZero || o.count === -1))
        .filter(o => this.state.optionsVisibleStatus[o.text])
        .length;
      if ((totalCount > this.props.initVisibleItemNumber)) {
        if (this.state.showingMore) {
          return (
            <div
              className='g3-filter-section__show-more'
              role='button'
              onClick={() => this.toggleShowMore()}
              onKeyPress={() => this.toggleShowMore()}
              tabIndex={0}
            >
              less
            </div>
          );
        }
        const moreCount = totalCount - this.props.initVisibleItemNumber;
        return (
          <div
            className='g3-filter-section__show-more'
            role='button'
            onClick={() => this.toggleShowMore()}
            onKeyPress={() => this.toggleShowMore()}
            tabIndex={0}
          >
            {moreCount}
            &nbsp;more
          </div>
        );
      }
      return null;
    }
    return null;
  }

  // hasAnyValueSelected returns true if any values are selected in this filterStatus.
  getNumValuesSelected = (filterStatus) => {
    let numSelected = 0;
    const filterValues = Object.keys(filterStatus);
    for (let i = 0; i < filterValues.length; i += 1) {
      const value = filterValues[i];
      if (filterStatus[value] === true) {
        numSelected += 1;
      }
    }
    return numSelected;
  }

  handleClearButtonClick = (ev) => {
    // Prevent this click from triggering any onClick events in parent component
    ev.stopPropagation();
    // Clear the filters
    this.setState({
      filterStatus: {},
    });
  }

  handleSearchInputChange() {
    const currentInput = this.inputElem.current.value;
    this.setState({
      searchInputEmpty: !currentInput || currentInput.length === 0,
    });
    this.updateVisibleOptions(currentInput);
  }

  clearSearchInput() {
    this.inputElem.current.value = '';
    this.setState({
      searchInputEmpty: true,
    });
    this.updateVisibleOptions();
  }

  updateVisibleOptions(inputText) {
    // if empty input, all should be visible
    if (typeof inputText === 'undefined' || inputText.trim === '') {
      this.setState({
        optionsVisibleStatus: filterVisibleStatusObj(this.props.options),
      });
    }

    // if not empty, filter out those matched
    this.setState({
      optionsVisibleStatus: filterVisibleStatusObj(this.props.options, inputText),
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
    let numSelected = 0;
    if (isTextFilter) {
      numSelected = this.getNumValuesSelected(filterStatus);
    }
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
          <div className='g3-filter-section__selected-count-chip'>
            {numSelected !== 0 && <SelectedCountChip count={numSelected} onClearButtonClick={this.handleClearButtonClick} />}
          </div>
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
        <div className='g3-filter-section__options'>
          {
            this.state.isExpanded
              ? this.props.options
                .filter(option => this.state.optionsVisibleStatus[option.text])
                .map((option, index) => {
                  if (index >= this.props.initVisibleItemNumber && !this.state.showingMore) {
                    return null;
                  }
                  if (option.filterType === 'singleSelect') {
                    return (
                      <SingleSelectFilter
                        key={option.text}
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
                    );
                  }
                  const lowerBound = (typeof filterStatus === 'undefined'
                  || filterStatus.length !== 2)
                    ? option.min : filterStatus[0];
                  const upperBound = (typeof filterStatus === 'undefined'
                  || filterStatus.length !== 2)
                    ? option.max : filterStatus[1];
                  return (
                    <RangeFilter
                      key={option.text}
                      label={option.text}
                      min={option.min}
                      max={option.max}
                      onAfterDrag={(lb, ub, min, max, step) => this.handleDragRangeFilter(
                        lb, ub, min, max, step)}
                      lowerBound={lowerBound}
                      upperBound={upperBound}
                      count={option.count}
                    />
                  );
                }) : null
          }
          {this.getShowMoreButton()}
        </div>
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
  filterStatus: undefined,
  initVisibleItemNumber: 5,
  hideZero: true,
  tierAccessLimit: undefined,
  lockedTooltipMessage: '',
  disabledTooltipMessage: '',
};

export default FilterSection;
