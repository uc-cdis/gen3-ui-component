import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './DropdownButton.css';

class DropdownButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.disabled) {
      return;
    }
    this.props.onClick();
    this.props.afterClick();
  }

  render() {
    const wrapperDisableStatusClassName = this.props.disabled ? 'g3-dropdown-button__wrapper--disabled' : '';

    const buttonTypeClassName = `g3-dropdown-button__button--${this.props.buttonType}`;
    const buttonIsSplitClassName = this.props.split ? 'g3-dropdown-button__button--with-split-trigger' : 'g3-dropdown-button__button--without-split-trigger';

    const menuTriggerButtonTypeClassName = `g3-dropdown-button__menu-trigger--${this.props.buttonType}`;

    return (
      <div
        ref={this.props.menuTriggerElementRef}
        className={`g3-dropdown-button__wrapper ${wrapperDisableStatusClassName} ${this.props.className || ''}`}
      >

        {/* Render dropdown button  */}
        <button
          type='button'
          className={`g3-dropdown-button__button ${buttonIsSplitClassName} ${buttonTypeClassName}`}
          onClick={this.props.split ? this.handleClick : this.props.handleTriggerMenu}
          label={this.props.label}
        >
          {this.props.children}
          {
            this.props.split || <i className='g3-dropdown-button__icon' />
          }
        </button>

        {/* Render split menu trigger if need  */}
        {
          this.props.split && (
            <button
              type='button'
              className={`g3-dropdown-button__menu-trigger ${menuTriggerButtonTypeClassName}`}
              onClick={this.props.handleTriggerMenu}
            >
              <i className={`g3-dropdown-button__icon ${this.props.menuOpen ? 'g3-dropdown-button__icon--menu-opened' : ''}`} />
            </button>
          )
        }
      </div>
    );
  }
}

DropdownButton.propTypes = {
  split: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  handleTriggerMenu: PropTypes.func,
  menuOpen: PropTypes.bool,
  afterClick: PropTypes.func,
  menuTriggerElementRef: PropTypes.object,
  buttonType: PropTypes.oneOf(['primary', 'secondary']),
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

DropdownButton.defaultProps = {
  split: false,
  className: '',
  label: 'Dropdown Button',
  onClick: () => {},
  buttonType: 'primary',

  // override by Dropdown component:
  handleTriggerMenu: () => {},
  menuOpen: false,
  afterClick: () => {},
  menuTriggerElementRef: {},
  disabled: false,
};

export default DropdownButton;
