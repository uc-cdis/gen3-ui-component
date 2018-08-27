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
        type='button'
        className={`${this.props.className} g3-button g3-button--${this.props.buttonType} ${this.props.enabled ? '' : 'g3-button--disabled'}`}
        onClick={e => this.handleClick(e)}
      >
        {this.props.leftIcon && (
          <i className={`g3-icon g3-icon--sm g3-icon--${this.props.leftIcon}`} />
        )}
        {this.props.label}
        {this.props.rightIcon && (
          <i className={`g3-icon g3-icon--sm g3-icon--${this.props.rightIcon}`} />
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
};

Button.defaultProps = {
  buttonType: 'primary',
  enabled: true,
  className: '',
  onClick: () => {},
  leftIcon: null,
  rightIcon: null,
};

export default Button;
