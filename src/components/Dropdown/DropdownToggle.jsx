import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DropdownToggle extends Component {
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
    return (
      <div ref={this.props.toggleElementRef} className={`g3-dropdown__toggle ${this.props.className || ''} ${this.props.disabled ? 'g3-dropdown__toggle--disabled' : ''}`}>
        <button
          type='button'
          className={`g3-dropdown__toggle-main ${this.props.separate ? 'g3-dropdown__toggle-main--with-separate' : 'g3-dropdown__toggle-main--without-separate'} g3-dropdown__toggle-main--${this.props.buttonType}`}
          onClick={this.props.separate ? this.handleClick : this.props.handleToggle}
          label={this.props.label}
        >
          {this.props.children}
          {
            this.props.separate || <i className='g3-dropdown__more-icon' />
          }
        </button>
        {
          this.props.separate && (
            <button
              type='button'
              className={`g3-dropdown__toggle-separated g3-dropdown__toggle-separated--${this.props.buttonType}`}
              onClick={this.props.handleToggle}
            >
              <i className={`g3-dropdown__toggle-icon ${this.props.menuOpen ? 'g3-dropdown__toggle-icon--shown' : ''}`} />
            </button>
          )
        }
      </div>
    );
  }
}

DropdownToggle.propTypes = {
  separate: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  handleToggle: PropTypes.func,
  menuOpen: PropTypes.bool,
  afterClick: PropTypes.func,
  toggleElementRef: PropTypes.object,
  buttonType: PropTypes.oneOf(['primary', 'secondary']),
  disabled: PropTypes.bool,
  children: PropTypes.any,
};

DropdownToggle.defaultProps = {
  separate: false,
  className: '',
  label: 'Dropdown Button',
  onClick: () => {},
  buttonType: 'primary',

  // override by Dropdown component:
  handleToggle: () => {},
  menuOpen: false,
  afterClick: () => {},
  toggleElementRef: {},
  disabled: false,
  children: '',
};

export default DropdownToggle;
