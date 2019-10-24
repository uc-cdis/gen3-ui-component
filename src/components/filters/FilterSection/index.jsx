import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';
import SingleSelectFilter from '../SingleSelectFilter';
import RangeFilter from '../RangeFilter';
import './FilterSection.css';

class FilterSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: this.props.expanded,
      showingMore: false,
      filterStatus: {},
    };
  }

  getShowMoreButton() {
    if (this.state.isExpanded) {
      const totalCount = this.props.options
        .filter(o => (o.count > 0 || !this.props.hideZero || o.count === -1)).length;
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

  toggleShowMore() {
    this.setState(prevState => ({ showingMore: !prevState.showingMore }));
  }

  render() {
    // Takes in parent component's filterStatus or self state's filterStatus
    const filterStatus = this.props.filterStatus
      ? this.props.filterStatus : this.state.filterStatus;
    const tooltipConf = {};
    if (this.props.tooltip) {
      tooltipConf['data-tip'] = true;
      tooltipConf['data-for'] = this.props.tooltip;
    }
    const sectionHeader = (
      <div
        className='g3-filter-section__header'
        onClick={() => this.toggleSection()}
        onKeyPress={() => this.toggleSection()}
        tabIndex={0}
        role='button'
      >
        <p className='g3-filter-section__title'>{this.props.title}</p>
        <i
          className={`g3-filter-section__toggle-icon g3-icon g3-icon--sm g3-icon--chevron-${this.state.isExpanded ? 'up' : 'down'}`}
        />
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
        <div className='g3-filter-section__options'>
          {
            this.state.isExpanded
              ? this.props.options.map((option, index) => {
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
                    key={this.props.title}
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
};

export default FilterSection;
