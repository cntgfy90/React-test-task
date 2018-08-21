import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/smart/Header';

export const PrivateRoute = ({
  user,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      user.uid ? ( // check isAuthenticated
        <div>
          <Header />
          <Component {...props} />
        </div>
      ) : (
          <Redirect to="/login" />
        )
    )} />
  );

const mapStateToProps = (state) => ({
  user: !!state.auth.user
});

export default connect(mapStateToProps)(PrivateRoute);
