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
  ) {
    this.props.onSelect(sectionIndex, singleFilterIndex, singleFilterLabel);
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
};

FilterList.defaultProps = {
  expandedStatus: [],
  onToggle: () => {},
  filterStatus: [],
  onSelect: () => {},
  onAfterDrag: () => {},
  hideZero: true,
};

export default FilterList;
