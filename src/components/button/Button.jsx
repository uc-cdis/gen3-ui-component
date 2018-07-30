import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

class Button extends Component {
  render() {
    return (
      <button type="button" className="btn-normal">
        {this.props.label}
      </button>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Button;
