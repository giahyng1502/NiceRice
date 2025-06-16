/**
 * @format
 */
import {name as appName} from './app.json';
import {AppRegistry} from "react-native";
import './src/i18n';
import App from "./src/App";

import {registerBackgroundNotificationHandler} from './src/config/notifee/customNotifee';

registerBackgroundNotificationHandler();

AppRegistry.registerComponent(appName, () => App);

