import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';
import './StatelessFilterSection.css';

class StatelessFilterSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: this.props.initExpandedState,
      showingMore: false,
      searchInputEmpty: true,
      showingSearch: false,
    };
  }

  toggleSection() {
    this.setState(prevState => ({ isExpanded: !prevState.isExpanded }));
  }

  toggleShowMore() {
    this.setState(prevState => ({ showingMore: !prevState.showingMore }));
  }

  render() {
    const sectionHeader = (
      <div className='g3-filter-section__header'>
        <div
          className='g3-filter-section__title'
          onClick={() => this.toggleSection()}
          onKeyPress={() => this.toggleSection()}
          tabIndex={0}
          role='button'
        >
          {this.props.title}
        </div>
        {
          this.props.searchEnabled && (
            <i
              className='g3-filter-section__search-icon g3-icon g3-icon--sm g3-icon--search'
              onClick={this.handleSearchIconClick}
              onKeyPress={this.hanldeSearchIconClick}
              tabIndex={0}
              role='button'
            />
          )
        }
        <i
          onClick={() => this.toggleSection()}
          onKeyPress={() => this.toggleSection()}
          tabIndex={0}
          role='button'
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
        {
          this.props.searchEnabled && (
            <div className={`g3-filter-section__search-input ${this.state.showingSearch && 'g3-filter-section__search-input--hidden'}`}>
              <input
                className='g3-filter-section__search-input-box body'
                value={this.props.searchInputValue}
                onChange={(ev) => { this.props.onSearchInputChange(ev.currentTarget.value); }}
              />
              <i
                className={`g3-icon g3-icon--${this.state.searchInputEmpty ? 'search' : 'cross'} g3-filter-section__search-input-close`}
                onClick={() => this.props.onSearchInputChange('')}
                onKeyPress={() => this.props.onSearchInputChange('')}
                role='button'
                tabIndex={0}
              />
            </div>
          )
        }
        <div className={`g3-filter-section__options ${this.state.isExpanded ? '' : 'g3-filter-section__options--hidden'}`}>
          {
            this.state.showingMore && this.props.children
              ? this.props.children.slice(0, this.props.initVisibleItemNumber)
              : this.props.children
          }
          {
            (this.props.children && this.props.children.length > this.props.initVisibleItemNumber)
            && (
              <div
                className='g3-filter-section__show-more'
                role='button'
                onClick={() => this.toggleShowMore()}
                onKeyPress={() => this.toggleShowMore()}
                tabIndex={0}
              >
                { this.state.showingMore ? 'less' : `${this.props.children.length - this.props.initVisibleItemNumber} more` }
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

StatelessFilterSection.propTypes = {
  children: PropTypes.node,
  initExpandedState: PropTypes.bool,
  initVisibleItemNumber: PropTypes.number,
  searchEnabled: PropTypes.bool,
  onSearchInputChange: PropTypes.func,
  searchInputValue: PropTypes.string,
  title: PropTypes.string,
  tooltip: PropTypes.string,
};

StatelessFilterSection.defaultProps = {
  children: null,
  initExpandedState: true,
  initVisibleItemNumber: 10,
  searchEnabled: false,
  onSearchInputChange: () => {},
  searchInputValue: '',
  title: '',
  tooltip: null,
};

export default StatelessFilterSection;
