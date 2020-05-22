import React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import { UserStore } from 'stores/UserStore/UserStore'
import { observer, inject } from 'mobx-react';
import { AppStoresProps } from 'common/AppProps';
import UsersToolbar from './UsersToolbar';
import UsersTable from './UsersTable';

const styles = (theme: Theme) => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
});

@inject('store')
@observer
class UserList extends React.Component<AppStoresProps, any> {
  props: AppStoresProps;
  store: UserStore;

  constructor(props: AppStoresProps) {
    super(props);
    this.props = props;
    this.store = this.props.store.userStore;
  }

  /**
   * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). 
   * Initialization that requires DOM nodes should go here.
   */
  componentDidMount() {
    this.store.fetchUsers();
  }

  /**
   * componentWillUnmount() is invoked immediately before a component is unmounted and destroyed.
   * Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests,
   *  or cleaning up any subscriptions that were created in
   */
  componentWillUnmount() {
  }

  render() {
    return (
      <div className={this.props.classes.root} >
        <UsersToolbar {...this.props} />
        < div className={this.props.classes.content} >
          <UsersTable {...this.props} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(UserList);
