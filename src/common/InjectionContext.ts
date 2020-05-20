import { UserStore } from 'stores/UserStore/UserStore'
import { UiStore } from 'stores/UiStore/UiStore'
import{ SessionStore } from 'stores/SessionStore/SessionStore';

/**
 * The dependency injection context to get the typecasting of what can be injected into a class
 */
export interface InjectionContext {
    userStore: UserStore;
    uiStore: UiStore;
    sessionStore: SessionStore;
}

/**
 * The function that converts the given props to the injection interface.
 * 
 * This function is only here because we cannot add these elements as required in the properties class 
 * given to React.Component because then it will enforce us to supply it when this class is 
 * instantiated and if we set it as optional we must handle it everywhere as if it can be undefined.
 * 
 * @param prop The property that is a InjectionContext
 */
export function getAsInjectionContext(prop: any): InjectionContext {
    return prop.store as InjectionContext;
}
