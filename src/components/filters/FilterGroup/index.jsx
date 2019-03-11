import React from 'react';
import PropTypes from 'prop-types';
import './FilterGroup.css';

class FilterGroup extends React.Component {
  constructor(props) {
    super(props);
    const initialExpandedStatus = props.filterConfig.tabs
      .map(t => t.fields.map(() => (false)));
    const initialFilterStatus = props.filterConfig.tabs
      .map(t => t.fields.map(() => ([])));
    this.state = {
      selectedTabIndex: 0,
      expandedStatus: initialExpandedStatus,
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
  }

  selectTab(index) {
    this.setState({ selectedTabIndex: index });
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

  handleSelect(sectionIndex, singleFilterIndex, singleFilterLabel, newSelected) {
    this.setState((prevState) => {
      // update filter status
      const newFilterStatus = prevState.filterStatus.slice(0);
      newFilterStatus[prevState.selectedTabIndex][sectionIndex][singleFilterIndex] = newSelected;

      // update filter results
      const newFilterResults = prevState.filterResults;
      const field = this.props.filterConfig.tabs[prevState.selectedTabIndex].fields[sectionIndex];
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

      // update component state
      return {
        filterStatus: newFilterStatus,
        filterResults: newFilterResults,
      };
    }, () => {
      this.callOnFilterChange();
    });
  }

  handleDrag(sectionIndex, lowerBound, upperBound) {
    this.setState((prevState) => {
      // update filter status
      const newFilterStatus = prevState.filterStatus.slice(0);
      newFilterStatus[prevState.selectedTabIndex][sectionIndex] = [lowerBound, upperBound];

      // update filter results
      const newFilterResults = prevState.filterResults;
      const field = this.props.filterConfig.tabs[prevState.selectedTabIndex].fields[sectionIndex];
      newFilterResults[field] = { lowerBound, upperBound };
    }, () => {
      this.callOnFilterChange();
    });
  }

  callOnFilterChange() {
    this.props.onFilterChange(this.state.filterResults);
  }

  render() {
    return (
      <div className='filter-group'>
        <div className='filter-group__tabs'>
          {
            this.props.tabs.map((tab, index) => (
              <div
                key={index}
                role='button'
                tabIndex={index}
                className={'filter-group__tab'.concat(this.state.selectedTabIndex === index ? ' filter-group__tab--selected' : '')}
                onClick={() => this.selectTab(index)}
                onKeyDown={() => this.selectTab(index)}
              >
                <p className='filter-group__tab-title'>
                  {this.props.filterConfig.tabs[tab.key].title}
                </p>
              </div>
            ))
          }
        </div>
        <div className='filter-group__filter-area'>
          {
            React.cloneElement(
              this.props.tabs[this.state.selectedTabIndex],
              {
                onToggle: (sectionIndex, newSectionExpandedStatus) => this.handleToggle(
                  this.state.selectedTabIndex,
                  sectionIndex,
                  newSectionExpandedStatus,
                ),
                expandedStatus: this.state.expandedStatus[this.state.selectedTabIndex],
                filterStatus: this.state.filterStatus[this.state.selectedTabIndex],
                onSelect: this.handleSelect.bind(this),
                onAfterDrag: this.handleDrag.bind(this),
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
};

FilterGroup.defaultProps = {
  onFilterChange: () => {},
};

export default FilterGroup;
