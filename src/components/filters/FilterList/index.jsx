import React from 'react';
import PropTypes from 'prop-types';
import FilterSection from '../FilterSection';
import './FilterList.css';

class FilterList extends React.Component {
  constructor(props) {
    super(props);
    const initialExpandedStatus = props.expandedStatus.length > 0 ? props.expandedStatus
      : props.sections.map(() => (false));
    this.state = {
      expandedStatus: initialExpandedStatus,
    };
  }

  handleSectionToggle(index) {
    this.setState((prevState) => {
      const tmp = prevState.expandedStatus[index];
      const newExpandedStatus = prevState.expandedStatus.slice(0);
      newExpandedStatus.splice(index, 1, !tmp);
      return {
        expandedStatus: newExpandedStatus,
      };
    });
    this.props.onToggle(index);
  }

  render() {
    return (
      <div className='filter-list'>
        {
          this.props.sections.map((section, index) => (
            <FilterSection
              {...this.props}
              key={index}
              title={section.title}
              options={section.options}
              expanded={this.state.expandedStatus[index]}
              onToggle={() => this.handleSectionToggle(index)}
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
};

FilterList.defaultProps = {
  expandedStatus: [],
  onToggle: () => {},
};

export default FilterList;
