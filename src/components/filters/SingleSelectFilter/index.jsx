import React from 'react';
import PropTypes from 'prop-types';

import StatelessSingleSelectFilter from '../StatelessSingleSelectFilter';

class SingleSelectFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: typeof props.selected === 'undefined' ? false : props.selected,
    };
  }

  handleCheck() {
    this.setState(prevState => ({ selected: !prevState.selected }));
    this.props.onSelect(this.props.label);
  }

  render() {
    return <StatelessSingleSelectFilter {...this.props} />;
  }
}

SingleSelectFilter.propTypes = {
  label: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  count: PropTypes.number,
  hideZero: PropTypes.bool,
  hideValue: PropTypes.number,
  tierAccessLimit: PropTypes.number,
  accessible: PropTypes.bool,
  disabled: PropTypes.bool,
  lockedTooltipMessage: PropTypes.string,
  disabledTooltipMessage: PropTypes.string,
};

SingleSelectFilter.defaultProps = {
  selected: undefined,
  count: 0,
  hideZero: true,
  hideValue: -1,
  tierAccessLimit: undefined,
  accessible: true,
  disabled: false,
  lockedTooltipMessage: '',
  disabledTooltipMessage: '',
};

export default SingleSelectFilter;
