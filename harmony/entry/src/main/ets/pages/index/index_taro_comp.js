import { createPageConfig } from '../../npm/@tarojs/plugin-framework-react/dist/runtime';
import Index from './index_comp.js';
import '../../npm/react';
import '../../npm/@tarojs/react';

var config = {
  "navigationBarTitleText": "首页"
};
const index = (function () {
  return createPageConfig(Index, 'pages/index/index', config);
});

export { config, index as default };
//# sourceMappingURL=index_taro_comp.js.map
