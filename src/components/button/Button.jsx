import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

class Button extends Component {
  render() {
    return (
      <button className="btn-normal">{this.props.label}</button>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
};

Button.defaultProps = {
  label: 'click me!',
};

export default Button;
