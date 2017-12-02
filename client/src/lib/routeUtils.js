import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={ props => (
    localStorage.auth_token ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/authenticate',
        state: { from: props.location },
      }}/>
    )
  )} />
);
