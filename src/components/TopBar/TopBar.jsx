import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TopIconButton from './TopIconButton';
import './TopBar.css';

class TopBar extends Component {
  isActive = id => this.props.activeTab === id;

  render() {
    return (
      <div className='top-bar'>
        <header className='top-bar__header'>
          <nav className='top-bar__nav'>
            {
              this.props.topItems.map(
                (item, i) => (
                  (item.link.startsWith('http')) ?
                    <a
                      className='top-bar__link'
                      key={item.link}
                      href={item.link}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <TopIconButton
                        item={item}
                        isActive={this.isActive(item.link)}
                        onActiveTab={() => this.props.onActiveTab(item.link)}
                        tabIndex={i}
                      />
                    </a> :
                    <Link
                      className='top-bar__link'
                      key={item.link}
                      to={item.link}
                    >
                      <TopIconButton
                        item={item}
                        isActive={this.isActive(item.link)}
                        onActiveTab={() => this.props.onActiveTab(item.link)}
                        tabIndex={i}
                      />
                    </Link>
                ),
              )
            }
            {
              this.props.user.username !== undefined
              && <Link className='top-bar__link' to='#' onClick={this.props.onLogoutClick}>
                <TopIconButton
                  item={{
                    name: this.props.user.username,
                    iconClassName: 'g3-icon g3-icon--exit'
                  }}
                  tabIndex={this.props.topItems.length}
                />
              </Link>
            }
          </nav>
        </header>
      </div>
    );
  }
}

TopBar.propTypes = {
  topItems: PropTypes.array.isRequired,
  user: PropTypes.shape({ username: PropTypes.string }).isRequired,
  activeTab: PropTypes.string,
  onActiveTab: PropTypes.func,
  onLogoutClick: PropTypes.func.isRequired,
};

TopBar.defaultProps = {
  activeTab: '',
  onActiveTab: () => {},
};

export default TopBar;
