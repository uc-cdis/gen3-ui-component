import React from 'react';
import PropTypes from 'prop-types';
import './Toaster.css';

class Toaster extends React.Component {

  render() {
    return this.props.isEnabled() ?
      (
        <div className='toaster__div'>
          {this.props.children}
        </div>
      )
      : null
  }

}

Toaster.propTypes = {
  isEnabled: PropTypes.func.isRequired,
};

export default Toaster;
