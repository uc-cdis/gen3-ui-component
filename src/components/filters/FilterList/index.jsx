import React from 'react';
import PropTypes from 'prop-types';
import FilterSection from '../FilterSection';
import './FilterList.css';

class FilterList extends React.Component {
  handleSectionToggle(sectionIndex, newExpanded) {
    this.props.onToggle(sectionIndex, newExpanded);
  }

  handleSelectSingleFilter(
    sectionIndex,
    singleFilterIndex,
    singleFilterLabel,
    newSelected,
  ) {
    this.props.onSelect(sectionIndex, singleFilterIndex, singleFilterLabel, newSelected);
  }

  handleDragRangeFilter(sectionIndex, lowerBound, upperBound) {
    this.props.onAfterDrag(sectionIndex, lowerBound, upperBound);
  }

  render() {
    return (
      <div className='filter-list'>
        {
          this.props.sections.map((section, index) => (
            <FilterSection
              key={index}
              title={section.title}
              options={section.options}
              expanded={this.props.expandedStatus[index]}
              onToggle={newExpanded => this.handleSectionToggle(index, newExpanded)}
              filterStatus={this.props.filterStatus[index]}
              onSelect={
                (
                  singleFilterIndex,
                  singleFilterLabel,
                  newSelected,
                ) => this.handleSelectSingleFilter(
                  index,
                  singleFilterIndex,
                  singleFilterLabel,
                  newSelected,
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
    })),
  })).isRequired,
  expandedStatus: PropTypes.arrayOf(PropTypes.bool),
  onToggle: PropTypes.func,
  filterStatus: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.PropTypes.number,
  ]))),
  onSelect: PropTypes.func,
  onAfterDrag: PropTypes.func,
};

FilterList.defaultProps = {
  expandedStatus: [],
  onToggle: () => {},
  filterStatus: [],
  onSelect: () => {},
  onAfterDrag: () => {},
};

export default FilterList;
