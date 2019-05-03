import React from 'react';
import PropTypes from 'prop-types';
import FilterSection from '../FilterSection';
import './FilterList.css';

class FilterList extends React.Component {
  constructor(props) {
    super(props);
    const initialFilterStatus = props.sections
      .map(() => ({}));
    this.state = {
      /**
       * Current selected status for filters,
       * filterStatus[sectionIndex] = { [field]: true/false/[upperBound,lowerBound]}
       */
      filterStatus: initialFilterStatus,
    };
    this.sectionRefs = props.sections.map(() => React.createRef());
  }

  handleSectionToggle(sectionIndex, newExpanded) {
    this.props.onToggle(sectionIndex, newExpanded);
  }

  handleSelectSingleFilter(
    sectionIndex,
    singleFilterIndex,
    singleFilterLabel,
  ) {
    this.setState((prevState) => {
      const newFilterStatus = prevState.filterStatus.slice(0);
      const oldSelected = newFilterStatus[sectionIndex][singleFilterLabel];
      const newSelected = typeof oldSelected === 'undefined' ? true : !oldSelected;
      newFilterStatus[sectionIndex][singleFilterLabel] = newSelected;
      return {
        filterStatus: newFilterStatus,
      };
    });
    this.props.onSelect(sectionIndex, singleFilterIndex, singleFilterLabel);
  }

  handleDragRangeFilter(sectionIndex, lowerBound, upperBound) {
    this.setState((prevState) => {
      const newFilterStatus = prevState.filterStatus.slice(0);
      newFilterStatus[sectionIndex] = [lowerBound, upperBound];
      return {
        filterStatus: newFilterStatus,
      };
    });
    this.props.onAfterDrag(sectionIndex, lowerBound, upperBound);
  }

  toggleFilters(openAll) {
    this.sectionRefs.forEach((ref) => {
      ref.current.toggleSection(openAll);
    });
  }

  render() {
    // Takes in parent component's filterStatus or self state's filterStatus
    const filterStatus = this.props.filterStatus
      ? this.props.filterStatus : this.state.filterStatus;

    return (
      <div className='filter-list'>
        {
          this.props.sections.map((section, index) => (
            <FilterSection
              key={index}
              ref={this.sectionRefs[index]}
              title={section.title}
              options={section.options}
              expanded={this.props.expandedStatus[index]}
              onToggle={newExpanded => this.handleSectionToggle(index, newExpanded)}
              filterStatus={filterStatus[index]}
              onSelect={
                (
                  singleFilterIndex,
                  singleFilterLabel,
                ) => this.handleSelectSingleFilter(
                  index,
                  singleFilterIndex,
                  singleFilterLabel,
                )
              }
              onAfterDrag={
                (
                  lowerBound,
                  upperBound,
                ) => this.handleDragRangeFilter(
                  index,
                  lowerBound,
                  upperBound,
                )
              }
              hideZero={this.props.hideZero}
              tierAccessLimit={this.props.tierAccessLimit}
            />
          ))
        }
      </div>
    );
  }
}

FilterList.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      filterType: PropTypes.oneOf(['singleSelect', 'range']),

      // for single select filter
      count: PropTypes.number,
      hideZero: PropTypes.bool,
      accessible: PropTypes.bool,

      // for range filter
      min: PropTypes.number,
      max: PropTypes.number,
    })),
  })).isRequired,
  expandedStatus: PropTypes.arrayOf(PropTypes.bool),
  onToggle: PropTypes.func,
  filterStatus: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.number),
  ])),
  onSelect: PropTypes.func,
  onAfterDrag: PropTypes.func,
  hideZero: PropTypes.bool,
  tierAccessLimit: PropTypes.number,
};

FilterList.defaultProps = {
  expandedStatus: [],
  onToggle: () => {},
  filterStatus: undefined,
  onSelect: () => {},
  onAfterDrag: () => {},
  hideZero: true,
  tierAccessLimit: undefined,
};

export default FilterList;
