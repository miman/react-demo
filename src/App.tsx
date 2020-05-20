import React from 'react';
import './App.css';

import { Provider } from 'mobx-react';
import { Router } from 'react-router-dom';
import Routes from 'routes/Routes';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';

import { UserStore } from 'stores/UserStore/UserStore';
import { UiStore } from 'stores/UiStore/UiStore'
import { SessionStore } from 'stores/SessionStore/SessionStore'
import { InjectionContext } from 'common/InjectionContext';

let userStore: UserStore = new UserStore();
let uiStore: UiStore = new UiStore();
let sessionStore: SessionStore = new SessionStore();
let context: InjectionContext = {
  userStore: userStore,
  uiStore: uiStore,
  sessionStore: sessionStore
};

const browserHistory = createBrowserHistory();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={context}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
