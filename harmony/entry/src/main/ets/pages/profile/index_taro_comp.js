import { createPageConfig } from '../../npm/@tarojs/plugin-framework-react/dist/runtime';
import Profile from './index_comp.js';
import '../../npm/react';
import '../../npm/@tarojs/react';

var config = {
  "navigationBarTitleText": "我的"
};
const index = (function () {
  return createPageConfig(Profile, 'pages/profile/index', config);
});

export { config, index as default };
//# sourceMappingURL=index_taro_comp.js.map
