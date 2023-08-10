import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import store from './store';

// 引入router配置文件
import router from "./router" 
import 'element-ui/lib/theme-chalk/index.css';
import './api/mock'
import Cookie from "js-cookie"
Vue.config.productionTip = false

Vue.use(ElementUI)
router.beforeEach((to, from, next) => {
  // ...
  const token= Cookie.get("token")
  // 如果token不存在
  if(!token&& to.name!=="login"){
      next({name:"login"})
  }else if(token && to.name ==="login"){
    next({name:"home"})
  }else{
    next()
  }

})

Vue.use(router)
new Vue({
  store,
  router,
  mounted(){
    store.commit("addMenu",router)
  },
  render: h => h(App),
}).$mount('#app')
