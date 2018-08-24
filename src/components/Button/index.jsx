import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

class Button extends Component {
  handleClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  render() {
    return (
      <button
        type="button"
        className={`${this.props.className} g3-button g3-button--${this.props.type} g3-button--${this.props.enabled ? 'enabled' : 'disabled'}`}
        onClick={e => this.handleClick(e)}
      >
        {this.props.label}
      </button>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary']),
  enabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'primary',
  enabled: true,
  className: '',
  onClick: () => {},
};

export default Button;
