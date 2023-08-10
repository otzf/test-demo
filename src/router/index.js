import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home.vue"
import User from "../views/User.vue"
import Main from "../views/Main.vue"
import Mall from "../views/Mall.vue"
import PageOne from "../views/PageOne.vue"
import PageTwo from "../views/PageTwo.vue"
import Login from "../views/Login.vue"
// import { Main } from 'element-ui'

Vue.use(VueRouter)
const routes = [
    {
        path: '/',  component: Main , name:"Main",redirect:'/home',
        children:[
        ]
    },
    {
      path:"/login",
      name:"login",
      component: Login
    }
 
  ]
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
  })
export default router