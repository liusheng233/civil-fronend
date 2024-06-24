import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import piniaStore from './store';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import '@/styles/index.less';
import '@/styles/reset.less';
import 'uno.css';
// 支持SVG
import 'virtual:svg-icons-register';

//vue3的挂载方式
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router);
app.use(piniaStore);

app.mount('#app');
