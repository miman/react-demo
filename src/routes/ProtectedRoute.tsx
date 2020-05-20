import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {getAsInjectionContext} from 'common/InjectionContext';
import { observer, inject } from 'mobx-react';
import { SessionStore } from 'stores/SessionStore/SessionStore'

/**
 * This router should be used onm routes that you must be logged in to see.
 * It will redirect you to the login page if you aren't logged in.
 * 
 * https://tylermcginnis.com/react-router-protected-routes-authentication/
 */
@inject('store')
@observer
class ProtectedRoute extends React.Component<any, any> {
  sessionStore: SessionStore;

  constructor(props: any) {
    super(props);
    this.sessionStore = getAsInjectionContext(this.props).sessionStore;
  }

  /**
   * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). 
   * Initialization that requires DOM nodes should go here.
   */
  componentDidMount() {
  }

  /**
   * componentWillUnmount() is invoked immediately before a component is unmounted and destroyed.
   * Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests,
   *  or cleaning up any subscriptions that were created in
   */
  componentWillUnmount() {
  }

  render() {

    if (!this.sessionStore.isLoggedIn) {
      // If we are logged in -> redirect to the dashboard
      return (<Redirect to="/login" />);
    }

    return (
        <Route
          {...this.props}
        />
    );
  }
}

export default ProtectedRoute;

/*
export const ProtectedRoute = inject("store")(observer(props => {

  let isLoggedIn = getAsInjectionContext(props).sessionStore.isLoggedIn;
  return (
    isLoggedIn?
    <Route
      {...props}
    />
    :
      <Redirect to='/login'/>
    )}
  )
);
*/