// @author Claude Code (kimi-k2.5)

/**
 * Taro React Native 入口文件
 */

import { AppRegistry } from 'react-native';
import { createReactNativeApp } from '@tarojs/runtime-rn';
import App from './src/app';
import appConfig from './src/app.config';

// Import pages
import IndexPage from './src/pages/index/index';
import ProfilePage from './src/pages/profile/index';

console.log('[index.js] Loading index.js');

const pages = [
  { name: 'pagesIndexIndex', component: IndexPage, pagePath: '/pages/index/index' },
  { name: 'pagesProfileIndex', component: ProfilePage, pagePath: '/pages/profile/index' },
];

const config = {
  appConfig: appConfig.default || appConfig,
  pageList: pages,
};

console.log('[index.js] Creating Taro RN App with config:', config);

const TaroApp = createReactNativeApp(App, config, IndexPage);

console.log('[index.js] App component:', TaroApp);

AppRegistry.registerComponent('taroApp', () => TaroApp);
