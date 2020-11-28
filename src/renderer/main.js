import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@/assets/reset.css'
import '@/assets/font/iconfont.css'
import ElementUI from 'element-ui';
import '@/assets/element-variables.scss'
import '@/assets/common.less'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
Vue.use(ElementUI);

console.log('process.env',process.env.APP_URL_API)

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
}).$mount('#app');


window.addEventListener("unhandledrejection", function (event) {
    if (event.reason && event.reason.type === "RequestError") {
        event.preventDefault();
        console.log('event', event)
        console.warn(
            "RequestError handled on unhandledrejection",
            event.reason.message
        );
    }
});

