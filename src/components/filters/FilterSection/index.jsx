import React from 'react';
import PropTypes from 'prop-types';
import SingleSelectFilter from '../SingleSelectFilter';
import RangeFilter from '../RangeFilter';
import './FilterSection.css';

class FilterSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: this.props.expanded,
    };
  }

  toggleSection() {
    this.props.onToggle(!this.state.isExpanded);
    this.setState(prevState => ({ isExpanded: !prevState.isExpanded }));
  }

  handleSelectSingleSelectFilter(index, label, newSelected) {
    this.props.onSelect(index, label, newSelected);
  }

  handleDragRangeFilter(lowerBound, upperBound) {
    this.props.onAfterDrag(lowerBound, upperBound);
  }

  render() {
    return (
      <div className='filter-section'>
        <div
          className='filter-section__header'
          onClick={() => this.toggleSection()}
          onKeyPress={() => this.toggleSection()}
          tabIndex={0}
          role='button'
        >
          <p className='filter-section__title'>{this.props.title}</p>
          <i
            className={`filter-section__toggle-icon g3-icon g3-icon--sm g3-icon--chevron-${this.state.isExpanded ? 'up' : 'down'}`}
          />
        </div>
        <div className='filter-section__options'>
          {
            this.state.isExpanded
              ? this.props.options.map((option, index) => {
                if (option.filterType === 'singleSelect') {
                  const selected = typeof this.props.filterStatus[index] === 'undefined' ? false : this.props.filterStatus[index];
                  return (
                    <SingleSelectFilter
                      key={index}
                      label={option.text}
                      onSelect={(label, newSelected) => this.handleSelectSingleSelectFilter(
                        index,
                        label,
                        newSelected,
                      )}
                      selected={selected}
                    />
                  );
                }
                const lowerBound = (typeof this.props.filterStatus === 'undefined'
                  || this.props.filterStatus.length !== 2)
                  ? option.min : this.props.filterStatus[0];
                const upperBound = (typeof this.props.filterStatus === 'undefined'
                  || this.props.filterStatus.length !== 2)
                  ? option.max : this.props.filterStatus[1];
                return (
                  <RangeFilter
                    key={index}
                    label={option.text}
                    min={option.min}
                    max={option.max}
                    onAfterDrag={(lb, ub) => this.handleDragRangeFilter(lb, ub)}
                    lowerBound={lowerBound}
                    upperBound={upperBound}
                  />
                );
              }) : null
          }
        </div>
      </div>
    );
  }
}

FilterSection.propTypes = {
  title: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    filterType: PropTypes.oneOf(['singleSelect', 'range']).isRequired,
    text: PropTypes.string,

    // for range filter
    min: PropTypes.number,
    max: PropTypes.number,

  })),
  onSelect: PropTypes.func.isRequired,
  onAfterDrag: PropTypes.func.isRequired,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  filterStatus: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ])),
};

FilterSection.defaultProps = {
  title: '',
  options: [],
  expanded: false,
  onToggle: () => {},
  filterStatus: [],
};

export default FilterSection;
