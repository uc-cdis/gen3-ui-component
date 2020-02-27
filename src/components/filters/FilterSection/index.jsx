import React from 'react';
import PropTypes from 'prop-types';

import StatelessFilterSection from '../StatelessFilterSection';
import StatelessSingleSelectFilter from '../SingleSelectFilter';
import RangeFilter from '../RangeFilter';

const filterVisibleStatusObj = (optionList, inputText) => {
  const res = {};
  optionList.forEach((o) => {
    if (typeof inputText === 'undefined' || inputText === '') {
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
      showingMore: false,
      filterStatus: {},
      searchInputValue: '',

      // option visible status filtered by the search inputbox
      optionsVisibleStatus: filterVisibleStatusObj(this.props.options),
    };
    this.inputElem = React.createRef();
  }

  handleSearchInputChange(searchInputValue) {
    this.setState({
      searchInputValue,
      optionsVisibleStatus: filterVisibleStatusObj(this.props.options, searchInputValue),
    });
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

  render() {
    // Takes in parent component's filterStatus or self state's filterStatus
    const filterStatus = this.props.filterStatus
      ? this.props.filterStatus : this.state.filterStatus;
    const isTextFilter = this.props.options.length > 0 && this.props.options[0].filterType === 'singleSelect';
    return (
      <StatelessFilterSection
        initExpandedState={this.props.expanded}
        initVisibleItemNumber={this.props.initVisibleItemNumber}
        expanded={this.props.expanded}
        searchEnabled={isTextFilter}
        onSearchInputChange={value => this.handleSearchInputChange(value)}
        searchInputValue={this.state.searchInputValue}
        title={this.props.title}
        tooltip={this.props.tooltip}
      >
        {
          this.props.options
            .filter(option => this.state.optionsVisibleStatus[option.text])
            .map((option, index) => {
              if (index >= this.props.initVisibleItemNumber && !this.state.showingMore) {
                return null;
              }
              if (option.filterType === 'singleSelect') {
                return (
                  <StatelessSingleSelectFilter
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
            })
        }
      </StatelessFilterSection>
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
  filterStatus: undefined,
  initVisibleItemNumber: 5,
  hideZero: true,
  tierAccessLimit: undefined,
  lockedTooltipMessage: '',
  disabledTooltipMessage: '',
};

export default FilterSection;
