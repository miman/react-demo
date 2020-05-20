import React from 'react';
import clsx from 'clsx';
import { withStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { AppProps } from 'common/AppProps';

import { observer } from 'mobx-react';

const styles = (theme: Theme) => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
});

@observer
class UsersToolbar extends React.Component<any, any> {
  props: AppProps;

  constructor(props: any) {
    super(props);
    this.props = props;
    this.handleDashboardClick = this.handleDashboardClick.bind(this);
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

  handleDashboardClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("> handleDashboardClick");
    this.props.history.push('/dashboard');
  };

  render() {
    return (
      <div
      className={clsx(this.props.classes.root)}
    >
      <div className={this.props.classes.row}>
        <span className={this.props.classes.spacer} />
        <Button
          color="primary"
          variant="contained"
          onClick={this.handleDashboardClick}
        >
          Dashboard
        </Button>
      </div>
    </div>
    );
  }
}
export default withStyles(styles)(UsersToolbar);
