import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/smart/Header';

export const PublicRoute = ({
  user,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      user.uid ? ( // check isAuthenticated
        <Redirect to="/calendar" />
      ) : (
          <div>
            <Header />
            <Component {...props} />
          </div>
        )
    )} />
  );

const mapStateToProps = (state) => ({
  user: !!state.auth.user
});

export default connect(mapStateToProps)(PublicRoute);
