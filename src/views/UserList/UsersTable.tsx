import React from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { withStyles, Theme } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import { User } from 'stores/UserStore/UserModel'
import { observer, inject } from 'mobx-react';
import { UserStore, FETCH_STATUS } from 'stores/UserStore/UserStore'
import { AppStoresProps } from 'common/AppProps';

const styles = (theme: Theme) => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
});

@inject('store')
@observer
class UsersTable extends React.Component<AppStoresProps, any> {
  props: AppStoresProps;
  store: UserStore;
  rowsPerPage: number = 10;

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
  }

  /**
   * componentWillUnmount() is invoked immediately before a component is unmounted and destroyed.
   * Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests,
   *  or cleaning up any subscriptions that were created in
   */
  componentWillUnmount() {
  }

  render() {
    const users: User[] = this.store.users;
    return (
      <div>
        {
          (this.store.fetchUsersStatus === FETCH_STATUS.FETCH_ONGOING) ?
            <LinearProgress />
            :
            null
        }

        <Card
          className={clsx(this.props.classes.root)}
        >
          <CardContent className={this.props.classes.content}>
            <PerfectScrollbar>
              <div className={this.props.classes.inner}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Phone</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.slice(0, this.rowsPerPage).map(user => (
                      <TableRow
                        className={this.props.classes.tableRow}
                        hover
                        key={user.id}
                      >
                        <TableCell>
                          <div className={this.props.classes.nameContainer}>
                            <Avatar
                              className={this.props.classes.avatar}
                              src={user.avatarUrl}
                            >
                              {"A B"}
                            </Avatar>
                            <Typography variant="body1">{user.name}</Typography>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          {user.address?.city}, {user.address?.street},{' '}
                          {user.address?.zipcode}
                        </TableCell>
                        <TableCell>{user.phone}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </PerfectScrollbar>
          </CardContent>
          <CardActions className={this.props.classes.actions}>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(UsersTable);
