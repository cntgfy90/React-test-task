import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { history } from '../../routers/AppRouter';
import { logout } from '../../actions/auth';

class Header extends React.Component {

  handleLogout = (e) => {
    e.preventDefault();
    this.props.logout()
      .then(() => {
        history.push('/login');
      })
  }

  render() {
    const { auth } = this.props;
    return (
      <nav className="navbar navbar-dark bg-primary">
        <a className="navbar-brand">ReactApp</a>
        {
          !_.isEmpty(auth.user) ? (
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={this.handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={() => history.push('/login')}
            >
              Login
            </button>
          )
        }
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
