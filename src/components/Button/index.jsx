import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTooltip: false,
    };
    this.toggleToolTip = this.toggleToolTip.bind(this);
    this.button = React.createRef();
  }

  toggleToolTip() {
    this.setState({ showTooltip: !this.state.showTooltip });
  }

  handleClick(e) {
    if (this.props.enabled && this.props.onClick) {
      this.props.onClick(e);
    }
  }

  render() {
    const buttonTypeClassName = !this.props.enabled ? 'g3-button--disabled' : `g3-button--${this.props.buttonType}`;
    const otherAttrs = {};
    if (this.props.id) otherAttrs.id = this.props.id;
    if (this.props.value) otherAttrs.value = this.props.value;
    return (
      <div className='g3-button__wrapper'>
        <button
          ref={this.button}
          type='button'
          className={`${this.props.className} g3-button ${buttonTypeClassName}`}
          onClick={e => this.handleClick(e)}
          onMouseEnter={this.props.tooltipEnabled ? this.toggleToolTip : null}
          onMouseLeave={this.props.tooltipEnabled ? this.toggleToolTip : null}
          {...otherAttrs}
        >
          {this.props.leftIcon && (
            <i className={`g3-icon g3-icon--sm g3-icon--${this.props.leftIcon} g3-button__icon g3-button__icon--left`} />
          )}
          {this.props.label}
          {this.props.rightIcon && (
            <i className={`g3-icon g3-icon--sm g3-icon--${this.props.rightIcon} g3-button__icon g3-button__icon--right`} />
          )}
        </button>
        <div
          className={'g3-button__tooltip'.concat(this.state.showTooltip ? '' : '--hidden')}
          style={ this.button.current ? { maxWidth: this.button.current.offsetWidth - 20 } : {} }
        >
          {this.props.tooltipText}
        </div>
      </div>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  buttonType: PropTypes.oneOf(['primary', 'secondary', 'default']),
  enabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  id: PropTypes.string,
  value: PropTypes.string,
  tooltipEnabled: PropTypes.bool,
  tooltipText: PropTypes.string,
};

Button.defaultProps = {
  buttonType: 'primary',
  enabled: true,
  className: '',
  onClick: () => {},
  leftIcon: null,
  rightIcon: null,
  type: 'button',
  id: null,
  value: null,
  tooltipEnabled: false,
  tooltipText: null,
};

export default Button;
