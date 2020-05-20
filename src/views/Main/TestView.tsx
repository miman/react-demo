import logo from '../../logo.svg';

import React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import { UserStore } from 'stores/UserStore/UserStore';
import { observer, inject } from 'mobx-react';
import { AppStoresProps } from 'common/AppProps';
import { Button } from '@material-ui/core';
import{ SessionStore } from 'stores/SessionStore/SessionStore';

const styles = (theme: Theme) => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    },
    button: {
        marginRight: theme.spacing(1)
    },
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1)
    },
});

@inject('store')
@observer
class TestView extends React.Component<AppStoresProps, any> {
    store: UserStore;
    props: AppStoresProps;
    sessionStore: SessionStore;

    constructor(props: AppStoresProps) {
        super(props);
        this.props = props;
        this.store = props.store.userStore;
        this.sessionStore = props.store.sessionStore;
        this.handleUsersClick = this.handleUsersClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
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

    handleUsersClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("> handleUsersClick");
        this.props.history.push('/users');
    };

    handleLogoutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("> handleLogoutClick");
        this.sessionStore.logout();
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div className={this.props.classes.row}>
                        <Button className={this.props.classes.button}
                            color="primary"
                            variant="contained"
                            onClick={this.handleUsersClick}>
                            Users
                    </Button>
                        <Button className={this.props.classes.button}
                            color="primary"
                            variant="contained"
                            onClick={this.handleLogoutClick}>
                            Logout
                    </Button>
                    </div>
                </header>
            </div>
        );
    }
}

export default withStyles(styles)(TestView);

