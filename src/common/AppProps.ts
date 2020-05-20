import { Theme } from '@material-ui/core/styles';

import { UserStore } from 'stores/UserStore/UserStore'
import { UiStore } from 'stores/UiStore/UiStore'
import{ SessionStore } from 'stores/SessionStore/SessionStore';

/**
 * The properites sent to the views by the framework
 */
export interface AppProps {
    theme?: Theme;
    classes?: any;
    history?: any;
    location?: any;
    match?: any;
    width?: string;
}

/**
 * The dependency injection context to get the typecasting of what can be injected into a class
 */
export interface InjectionContext {
    userStore: UserStore;
    uiStore: UiStore;
    sessionStore: SessionStore;
}

/**
 * The properites sent to the views by the framework
 */
export interface AppStoresProps extends AppProps {
    store: InjectionContext;
}
