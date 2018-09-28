import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

class Button extends Component {
  handleClick(e) {
    if (this.props.enabled && this.props.onClick) {
      this.props.onClick(e);
    }
  }

  render() {
    const buttonTypeClassName = !this.props.enabled ? 'g3-button--disabled' : `g3-button--${this.props.buttonType}`;
    return (
      <button
        type='button'
        className={`${this.props.className} g3-button ${buttonTypeClassName}`}
        onClick={e => this.handleClick(e)}
        {...this.props}
      >
        {this.props.leftIcon && (
          <i className={`g3-icon g3-icon--sm g3-icon--${this.props.leftIcon} g3-button__icon g3-button__icon--left`} />
        )}
        {this.props.label}
        {this.props.rightIcon && (
          <i className={`g3-icon g3-icon--sm g3-icon--${this.props.rightIcon} g3-button__icon g3-button__icon--right`} />
        )}
      </button>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  buttonType: PropTypes.oneOf(['primary', 'secondary']),
  enabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

Button.defaultProps = {
  buttonType: 'primary',
  enabled: true,
  className: '',
  onClick: () => {},
  leftIcon: null,
  rightIcon: null,
  type: 'button',
};

export default Button;
