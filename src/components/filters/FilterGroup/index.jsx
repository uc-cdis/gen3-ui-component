import React from 'react';
import PropTypes from 'prop-types';
import './FilterGroup.css';

const removeEmptyFilter = (filterResults) => {
  const newFilterResults = {};
  Object.keys(filterResults).forEach((field) => {
    if (typeof filterResults[field].lowerBound !== 'undefined'
      || (filterResults[field].selectedValues
        && filterResults[field].selectedValues.length > 0)
      || field.startsWith('__')) {
      newFilterResults[field] = filterResults[field];
    } 
  });
  return newFilterResults;
};

const tabHasActiveFilters = (tabFilterStatus) => {
  /**
   * tabFilterStatus[sectionIndex] = { [field]: true/false/[upperBound,lowerBound]}
   */
  let hasActiveFilters = false;
  tabFilterStatus.forEach((section) => {
    const fieldStatuses = Object.values(section);
    if (fieldStatuses.some(status => status !== undefined && status !== false)) {
      hasActiveFilters = true;
    }
  });
  return hasActiveFilters;
};

class FilterGroup extends React.Component {
  constructor(props) {
    super(props);
    const initialExpandedStatusControl = true;
    const initialExpandedStatus = props.filterConfig.tabs
      .map(t => t.fields.map(() => (initialExpandedStatusControl)));
    const initialFilterStatus = props.filterConfig.tabs
      .map(t => t.fields.map(() => ({})));
    this.state = {
      selectedTabIndex: 0,
      expandedStatus: initialExpandedStatus,
      expandedStatusText: 'Collapse all',
      expandedStatusControl: initialExpandedStatusControl,

      /**
       * Current selected status for filters,
       * filterStatus[tabIndex][sectionIndex] = { [field]: true | false } | [upperBound,lowerBound]
       */
      filterStatus: initialFilterStatus,

      /**
       * Currently filtered items, example:
       *   {
       *     'file_format': {
       *        'selectedValues': ['CSV', 'TAR'],
       *     },
       *     'file_count': {
       *        'lowerBound': 5,
       *        'upperBound': 30,
       *     },
       *     ...
       *   }
       */
      filterResults: {},
    };
    this.currentFilterListRef = React.createRef();
  }

  selectTab(index) {
    this.setState({ selectedTabIndex: index });
  }

  resetFilter() {
    this.setState((prevState) => {
      const oldFilterStatus = prevState.filterStatus;
      const resetStatus = oldFilterStatus.map((oldSectionStatus) => {
        const sectionStatus = oldSectionStatus.map((oldEntry) => {
          if (!oldEntry || Object.keys(oldEntry).length === 0) return oldEntry;
          const newEntry = Object.keys(oldEntry).reduce((res, key) => {
            res[key] = false;
            return res;
          }, {});
          return newEntry;
        });
        return sectionStatus;
      });
      return {
        filterStatus: resetStatus,
        filterResults: {},
      };
    });
  }

  handleToggle(tabIndex, sectionIndex, newSectionExpandedStatus) {
    this.setState((prevState) => {
      const newExpandedStatus = prevState.expandedStatus.slice(0);
      newExpandedStatus[tabIndex][sectionIndex] = newSectionExpandedStatus;
      return {
        expandedStatus: newExpandedStatus,
      };
    });
  }

  handleSectionClear(tabIndex, sectionIndex) {
    this.setState((prevState) => {
      // update filter status
      const newFilterStatus = prevState.filterStatus.slice(0);
      newFilterStatus[tabIndex][sectionIndex] = {};

      // update filter results; clear the results for this filter
      let newFilterResults = Object.assign({}, prevState.filterResults);
      const field = this.props.filterConfig.tabs[tabIndex].fields[sectionIndex];
      newFilterResults[field] = {};
      newFilterResults = removeEmptyFilter(newFilterResults);

      // update component state
      return {
        filterStatus: newFilterStatus,
        filterResults: newFilterResults,
      };
    }, () => {
      this.callOnFilterChange();
    });
  }

  handleCombineOptionToggle(sectionIndex, combineModeFieldName, combineModeValue) {
    console.log('(FilterGroup) inside handleCombineOptionToggle');
    console.log('(FilterGroup) handleCombineOptionToggle sectionIndex: ', sectionIndex);
    console.log('(FilterGroup) handleCombineOptionToggle combineModeFieldName: ', combineModeFieldName);
    console.log('(FilterGroup) handleCombineOptionToggle combineModeValue: ', combineModeValue);
    // this.handleSelect(sectionIndex, singleFilterLabel);
    this.setState((prevState) => {
      // update filter status
      const newFilterStatus = prevState.filterStatus.slice(0);
      const tabIndex = prevState.selectedTabIndex;
      newFilterStatus[tabIndex][sectionIndex][combineModeFieldName] = combineModeValue;

      // update filter results
      let newFilterResults = prevState.filterResults;
      const field = this.props.filterConfig.tabs[tabIndex].fields[sectionIndex];
      if (typeof newFilterResults[field] === 'undefined') {
        newFilterResults[field] = { combineMode: combineModeValue };
      } else {
        newFilterResults[field].combineMode = combineModeValue;
      }

      newFilterResults = removeEmptyFilter(newFilterResults);
      // update component state
      return {
        filterStatus: newFilterStatus,
        filterResults: newFilterResults,
      };
    }, () => {
      this.callOnFilterChange();
    });
  }

  handleSelect(sectionIndex, singleFilterLabel) {
    console.log('(FilterGroup) handleSelect singleFilterLabel: ', singleFilterLabel);
    console.log('(FilterGroup) handleSelect sectionIndex:  ', sectionIndex);
    console.log('(FilterGroup) handleSelect prevState.filterStatus', this.state.filterStatus)
    this.setState((prevState) => {
      // update filter status
      const newFilterStatus = prevState.filterStatus.slice(0);
      const tabIndex = prevState.selectedTabIndex;
      const oldSelected = newFilterStatus[tabIndex][sectionIndex][singleFilterLabel];
      console.log('(FilterGroup) newFilterStatus[tabIndex][sectionIndex][singleFilterLabel] : ', oldSelected);
      const newSelected = typeof oldSelected === 'undefined' ? true : !oldSelected;
      newFilterStatus[tabIndex][sectionIndex][singleFilterLabel] = newSelected;

      // update filter results
      let newFilterResults = prevState.filterResults;
      const field = this.props.filterConfig.tabs[tabIndex].fields[sectionIndex];
      if (typeof newFilterResults[field] === 'undefined') {
        newFilterResults[field] = { selectedValues: [singleFilterLabel] };
      } else {
        const findIndex = newFilterResults[field].selectedValues.indexOf(singleFilterLabel);
        if (findIndex >= 0 && !newSelected) {
          newFilterResults[field].selectedValues.splice(findIndex, 1);
        } else if (findIndex < 0 && newSelected) {
          newFilterResults[field].selectedValues.push(singleFilterLabel);
        }
      }

      newFilterResults = removeEmptyFilter(newFilterResults);
      // update component state
      return {
        filterStatus: newFilterStatus,
        filterResults: newFilterResults,
      };
    }, () => {
      this.callOnFilterChange();
    });
  }

  handleDrag(sectionIndex, lowerBound, upperBound, minValue, maxValue, rangeStep = 1) {
    this.setState((prevState) => {
      // update filter status
      const newFilterStatus = prevState.filterStatus.slice(0);
      newFilterStatus[prevState.selectedTabIndex][sectionIndex] = [lowerBound, upperBound];

      // update filter results
      let newFilterResults = prevState.filterResults;
      const field = this.props.filterConfig.tabs[prevState.selectedTabIndex].fields[sectionIndex];
      newFilterResults[field] = { lowerBound, upperBound };

      // if lowerbound and upperbound values are min and max,
      // remove this range from filter
      const jsEqual = (a, b) => (Math.abs(a - b) < rangeStep);
      if (jsEqual(lowerBound, minValue) && jsEqual(upperBound, maxValue)) {
        delete newFilterResults[field];
      }

      newFilterResults = removeEmptyFilter(newFilterResults);
      return {
        filterStatus: newFilterStatus,
        filterResults: newFilterResults,
      };
    }, () => {
      this.callOnFilterChange();
    });
  }

  callOnFilterChange() {
    console.log('(FilterGroup) callOnFilterChange() filterResults: ', this.state.filterResults);
    this.props.onFilterChange(this.state.filterResults);
  }

  toggleFilters() {
    this.setState((prevState) => {
      this.currentFilterListRef.current.toggleFilters(!prevState.expandedStatusControl);
      return {
        expandedStatus: this.props.filterConfig.tabs
          .map(t => t.fields.map(() => (!prevState.expandedStatusControl))),
        expandedStatusText: (!prevState.expandedStatusControl) ? 'Collapse all' : 'Open all',
        expandedStatusControl: !prevState.expandedStatusControl,
      };
    });
  }

  render() {
    return (
      <div className={`g3-filter-group ${this.props.className}`}>
        <div className='g3-filter-group__tabs'>
          {
            this.props.tabs.map((tab, index) => (
              <div
                key={index}
                role='button'
                tabIndex={index}
                className={'g3-filter-group__tab'.concat(this.state.selectedTabIndex === index ? ' g3-filter-group__tab--selected' : '')}
                onClick={() => this.selectTab(index)}
                onKeyDown={() => this.selectTab(index)}
              >
                <p className={`g3-filter-group__tab-title ${tabHasActiveFilters(this.state.filterStatus[index]) ? 'g3-filter-group__tab-title--has-active-filters' : ''}`}>
                  {this.props.filterConfig.tabs[index].title}
                </p>
              </div>
            ))
          }
        </div>
        <div className='g3-filter-group__collapse'>
          <span
            className='g3-link g3-filter-group__collapse-link'
            onClick={() => this.toggleFilters()}
            onKeyPress={() => this.toggleFilters()}
            role='button'
            tabIndex={0}
          >
            {this.state.expandedStatusText}
          </span>
        </div>
        <div className='g3-filter-group__filter-area'>
          {
            React.cloneElement(
              this.props.tabs[this.state.selectedTabIndex],
              {
                onToggle: (sectionIndex, newSectionExpandedStatus) => this.handleToggle(
                  this.state.selectedTabIndex,
                  sectionIndex,
                  newSectionExpandedStatus,
                ),
                onClear: sectionIndex => this.handleSectionClear(
                  this.state.selectedTabIndex,
                  sectionIndex,
                ),
                expandedStatus: this.state.expandedStatus[this.state.selectedTabIndex],
                filterStatus: this.state.filterStatus[this.state.selectedTabIndex],
                onSelect: this.handleSelect.bind(this),
                onCombineOptionToggle: this.handleCombineOptionToggle.bind(this),
                onAfterDrag: this.handleDrag.bind(this),
                hideZero: this.props.hideZero,
                ref: this.currentFilterListRef,
              },
            )
          }
        </div>
      </div>
    );
  }
}

FilterGroup.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterConfig: PropTypes.shape({
    tabs: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      fields: PropTypes.arrayOf(PropTypes.string),
    })),
  }).isRequired,
  onFilterChange: PropTypes.func,
  hideZero: PropTypes.bool,
  className: PropTypes.string,
};

FilterGroup.defaultProps = {
  onFilterChange: () => {},
  hideZero: true,
  className: '',
};

export default FilterGroup;
