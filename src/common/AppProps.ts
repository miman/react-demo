import { Theme } from '@material-ui/core/styles';

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