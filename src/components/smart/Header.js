import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../routers/AppRouter';
import { logout } from '../../actions/auth';

class Header extends React.Component {

  handleLogout = (e) => {
    e.preventDefault();
    this.props.logout()
      .then(() => history.push('/'))
  }

  render() {
    const { logoutError } = this.props;
    return (
      <nav className="navbar navbar-dark bg-primary">
        <a className="navbar-brand">ReactApp</a>
        {
          logoutError && (
            <p>{logoutError}</p>
          )
        }
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          type="submit"
          onClick={this.handleLogout}
        >
          Logout
        </button>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  logoutError: state.auth.didInvalidate
});

export default connect(mapStateToProps, { logout })(Header);
