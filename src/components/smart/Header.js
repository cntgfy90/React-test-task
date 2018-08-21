import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

class Header extends React.Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}

export default connect(null, { logout})(Header);
