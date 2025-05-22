/**
 * @format
 */

import {name as appName} from './app.json';
import {AppRegistry} from "react-native";
import './src/i18n';
import App from "./src/App";

AppRegistry.registerComponent(appName, () => App);
