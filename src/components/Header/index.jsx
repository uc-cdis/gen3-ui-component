import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <div className='header'>
        <img className='header__logo' src={this.props.logoSrc} alt='logo' />
        <h1 className='header__title'>
          {this.props.title}
        </h1>
        <div className='header__logo' />
      </div>
    );
  }
}

Header.propTypes = {
  logoSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
