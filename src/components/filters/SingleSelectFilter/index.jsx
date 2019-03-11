import React from 'react';
import PropTypes from 'prop-types';
import './SingleSelectFilter.css';

class SingleSelectFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
    };
  }

  handleCheck() {
    this.setState(prevState => ({
      selected: !prevState.selected,
    }), () => {
      this.props.onSelect(this.props.label, this.state.selected);
    });
  }

  render() {
    return (
      <div className='single-select-filter'>
        <input
          className='single-select-filter__checkbox'
          type='checkbox'
          onChange={() => this.handleCheck()}
          checked={this.state.selected}
        />
        <p className='single-select-filter__label'>{this.props.label}</p>
      </div>
    );
  }
}

SingleSelectFilter.propTypes = {
  label: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

SingleSelectFilter.defaultProps = {
  selected: false,
};

export default SingleSelectFilter;
