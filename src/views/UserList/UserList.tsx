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
  theme?: Theme;
  classes?: any;

  constructor(props: AppStoresProps) {
    super(props);
    this.props = props;
    this.store = this.props.store.userStore;
    this.theme = props.theme;
    this.classes = props.classes;
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
      <div className={this.classes.root} >
        <UsersToolbar {...this.props} />
        < div className={this.classes.content} >
          <UsersTable {...this.props} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(UserList);
