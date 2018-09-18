import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <div className='header'>
        <div className='header__logo-container'>
          <img className='header__logo' src={this.props.logoSrc} alt={`${this.props.title} logo`} />
        </div>
        <h1 className='header__title'>
          {this.props.title}
        </h1>
        <div className='header__logo-container' />
      </div>
    );
  }
}

Header.propTypes = {
  logoSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
