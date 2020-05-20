import React from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { withStyles, Theme } from '@material-ui/core/styles';

import {
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  LinearProgress
} from '@material-ui/core';

import { observer, inject } from 'mobx-react';
import { AppProps } from 'common/AppProps'
import {getAsInjectionContext} from 'common/InjectionContext';
import { observable, computed } from 'mobx';
import{ SessionStore, LOGIN_STATUS } from 'stores/SessionStore/SessionStore';

const styles = (theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 500,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }

});

@inject('store')
@observer
class LoginView extends React.Component<AppProps, any> {
  sessionStore: SessionStore;
  theme?: Theme;
  classes?: any;
  formState: any = {
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  };
  @observable password: string = "";
  @observable email: string = "";

  constructor(props: AppProps) {
    super(props);
    this.sessionStore = getAsInjectionContext(this.props).sessionStore;
    this.theme = props.theme;
    this.classes = props.classes;
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  /**
   * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). 
   * Initialization that requires DOM nodes should go here.
   */
  componentDidMount() {
    this.email = this.sessionStore.userid;
  }

  /**
   * componentWillUnmount() is invoked immediately before a component is unmounted and destroyed.
   * Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests,
   *  or cleaning up any subscriptions that were created in
   */
  componentWillUnmount() {
  }

  /**
   * This function sets the login button enabled or dispabled depending on if the email & password fields are populated ok or not
   */
  @computed get enableLoginButton(): boolean {
    if (this.email.length > 0 && this.password.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  hasError(field:any): boolean {
//    console.log("hasError: " + JSON.stringify(field));
    return false;
  }

  handleBack() {
    console.log("handleBack");
//    history.goBack();
  };

  handleSignIn(event: React.FormEvent) {
    console.log("> handleSignIn");
    event.preventDefault();
    this.sessionStore.login(this.email, this.password);
//    history.push('/');
  };

  render() {

    if (this.sessionStore.isLoggedIn) {
      // If we are logged in -> redirect to the dashboard
      return (<Redirect to="/dashboard" />);
    }

    return (
      <div className={this.classes.root}>
        { 
          (this.sessionStore.loginStatus === LOGIN_STATUS.LOGIN_ONGOING)?
            <LinearProgress color="secondary" />
          : 
            null
        }

      <Grid
        className={this.classes.grid}
        container
      >
        <Grid
          className={this.classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={this.classes.content}>
            <div className={this.classes.contentBody}>
              <form
                className={this.classes.form}
                onSubmit={this.handleSignIn}
              >
                <Typography
                  className={this.classes.title}
                  variant="h2"
                >
                  Login
                </Typography>
                <Typography
                  align="center"
                  className={this.classes.sugestion}
                  color="textSecondary"
                  variant="body1"
                >
                  Login with email address
                </Typography>
                <TextField
                  className={this.classes.textField}
                  error={this.hasError('email')}
                  fullWidth
                  helperText={
                    this.hasError('email') ? this.email : null
                  }
                  label="Email address"
                  name="email"
                  onChange={event => this.email = event.target.value}
                  type="text"
                  value={this.email || ''}
                  variant="outlined"
                />
                <TextField
                  className={this.classes.textField}
                  error={this.hasError('password')}
                  fullWidth
                  helperText={
                    this.hasError('password') ? this.formState.errors.password[0] : null
                  }
                  label="Password"
                  name="password"
                  onChange={event => this.password = event.target.value}
                  type="password"
                  value={this.password}
                  variant="outlined"
                />
                <Button
                  className={this.classes.signInButton}
                  color="primary"
                  disabled={!this.enableLoginButton}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Login
                </Button>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don't have an account?{' '}
                  <Link
                    component={RouterLink}
                    to="/sign-up"
                    variant="h6"
                  >
                    Sign up
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
    );
  }
}

export default withStyles(styles)(LoginView);
