import { initPxTransform } from './npm/@tarojs/taro';
import { createReactApp } from './npm/@tarojs/plugin-framework-react/dist/runtime';
import App from './app_comp.js';
import * as React from './npm/react';
import ReactDOM from './npm/@tarojs/react';

var config = {
  "pages": ["pages/index/index", "pages/profile/index"],
  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "Taro App",
    "navigationBarTextStyle": "black"
  },
  "tabBar": {
    "color": "#999",
    "selectedColor": "#6190e8",
    "backgroundColor": "#fff",
    "borderStyle": "black",
    "list": [{
      "pagePath": "pages/index/index",
      "text": "首页",
      "iconPath": "assets/images/home.png",
      "selectedIconPath": "assets/images/home-active.png"
    }, {
      "pagePath": "pages/profile/index",
      "text": "我的",
      "iconPath": "assets/images/profile.png",
      "selectedIconPath": "assets/images/profile-active.png"
    }]
  }
};
initPxTransform({
  designWidth: 750,
  deviceRatio: {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  },
  baseFontSize: undefined,
  unitPrecision: undefined,
  targetUnit: undefined
});
const app = (function () {
  return createReactApp(App, React, ReactDOM, config);
});

export { config, app as default };
//# sourceMappingURL=app_taro_comp.js.map
