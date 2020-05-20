import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import TestView from 'views/Main/TestView';
import LoginView from 'views/Login/LoginView';
import UserList from 'views/UserList/UserList';

import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

/**
 * https://reacttraining.com/react-router/web/guides/quick-start
 */
const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <ProtectedRoute
        component={TestView}
        exact
        path="/dashboard"
      />
      <Route
        component={LoginView}
        exact
        path="/login"
      />
      <ProtectedRoute
        component={TestView}
        exact
        path="/protected"
      />
      <ProtectedRoute
        component={UserList}
        exact
        path="/users"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
