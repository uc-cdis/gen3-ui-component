import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropdownButton from './DropdownButton';
import DropdownItem from './DropdownItem';
import DropdownMenu from './DropdownMenu';
import DropdownMenuDivider from './DropdownMenuDivider';
import './Dropdown.css';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
    this.handleTriggerMenu = this.handleTriggerMenu.bind(this);
    this.handleWindowClick = this.handleWindowClick.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.menuTriggerElementRef = React.createRef();
  }

  handleTriggerMenu() {
    if (this.props.disabled) {
      return;
    }
    this.setState(state => (
      { menuOpen: !state.menuOpen }
    ));
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  handleWindowClick(e) {
    if (!this.menuTriggerElementRef || !this.menuTriggerElementRef.current) {
      return;
    }
    if (!this.menuTriggerElementRef.current.contains(e.target)) {
      this.closeMenu();
    }
  }

  bindCancellingEvent() {
    window.addEventListener('click', this.handleWindowClick);
  }

  unbindCancellingEvent() {
    window.removeEventListener('click', this.handleWindowClick);
  }

  render() {
    if (this.state.menuOpen) {
      this.bindCancellingEvent();
    } else {
      this.unbindCancellingEvent();
    }
    return (
      <div className={`g3-dropdown ${this.props.disabled ? 'g3-dropdown--disabled' : ''} ${this.props.className || ''}`}>
        {
          React.Children.map(this.props.children, child => React.cloneElement(child, {
            handleTriggerMenu: this.handleTriggerMenu,
            menuOpen: this.state.menuOpen,
            afterClick: this.closeMenu,
            menuTriggerElementRef: this.menuTriggerElementRef,
            buttonType: this.props.buttonType,
            disabled: this.props.disabled,
          }),
          )
        }
      </div>
    );
  }
}

Dropdown.propTypes = {
  className: PropTypes.string,
  buttonType: PropTypes.oneOf(['primary', 'secondary']),
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Dropdown.defaultProps = {
  className: '',
  buttonType: 'primary',
  disabled: false,
};

/**
* props:
*   - split(bool): if true, the trigger button is split
*   - label(stirng): label of the button
*   - onClick(func): onclick function, ignored when split=false (onClick=triggerMenu)
*   - className(string): class name
*   - disabled(bool): whether disabled
*/
Dropdown.Button = DropdownButton;

/**
* Wrapper for a list of menu items
* props:
*   - className(string): class name
*/
Dropdown.Menu = DropdownMenu;

/**
* props:
*   - className(string): class name
*   - leftIcon(string): left icon name
*   - rightIcon(string): right icon name
*   - onClick(func): onclick function
*   - disabled(bool): whether disabled
*/
Dropdown.Item = DropdownItem;

Dropdown.MenuDivider = DropdownMenuDivider;

export default Dropdown;
