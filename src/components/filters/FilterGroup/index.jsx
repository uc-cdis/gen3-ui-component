import React from 'react';
import PropTypes from 'prop-types';
import './FilterGroup.css';

class FilterGroup extends React.Component {
  constructor(props) {
    super(props);
    const initialExpandedStatus = props.filterConfig.tabs
      .map(t => t.fields.map(() => (false)));
    this.state = {
      selectedTabIndex: 0,
      expandedStatus: initialExpandedStatus,
    };
  }

  selectTab(index) {
    this.setState({ selectedTabIndex: index });
  }

  handleToggle(tabIndex, sectionIndex) {
    this.setState((prevState) => {
      const newExpandedStatus = prevState.expandedStatus.slice(0);
      newExpandedStatus[tabIndex][sectionIndex] = !newExpandedStatus[tabIndex][sectionIndex];
      return {
        expandedStatus: newExpandedStatus,
      };
    });
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
                ...this.props,
                onToggle: sectionIndex => this.handleToggle(
                  this.state.selectedTabIndex,
                  sectionIndex,
                ),
                expandedStatus: this.state.expandedStatus[this.state.selectedTabIndex],
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
};

export default FilterGroup;
