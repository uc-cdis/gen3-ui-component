import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropdownToggle from './DropdownToggle';
import DropdownItem from './DropdownItem';
import DropdownMenu from './DropdownMenu';
import DropdownMenuHeader from './DropdownMenuHeader';
import DropdownMenuDivider from './DropdownMenuDivider';
import './Dropdown.css';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleWindowClick = this.handleWindowClick.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.toggleElementRef = React.createRef();
  }

  handleToggle() {
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
    if (!this.toggleElementRef || !this.toggleElementRef.current) {
      return;
    }
    if (!this.toggleElementRef.current.contains(e.target)) {
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
            handleToggle: this.handleToggle,
            menuOpen: this.state.menuOpen,
            afterClick: this.closeMenu,
            toggleElementRef: this.toggleElementRef,
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
  children: PropTypes.any,
  className: PropTypes.string,
  buttonType: PropTypes.oneOf(['primary', 'secondary']),
  disabled: PropTypes.bool,
};

Dropdown.defaultProps = {
  children: '',
  className: '',
  buttonType: 'primary',
  disabled: false,
};

Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
Dropdown.MenuHeader = DropdownMenuHeader;
Dropdown.MenuDivider = DropdownMenuDivider;

export default Dropdown;
