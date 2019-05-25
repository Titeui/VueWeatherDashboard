import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from "@/components/DashboardLayout.vue";

import NotFound from "@/views/Notfound.vue"
import Map from "@/views/map.vue"
import Dashboard from "@/views/Dashboard.vue"

// Admin pages
// const Dashboard = () => import(/* webpackChunkName: "dashboard" */"@/pages/Dashboard.vue");
// const Map = () => import(/* webpackChunkName: "common" */ "@/views/map.vue");


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardLayout,
      redirect : "/dashboard",
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: Dashboard 
        },
        {
          path: "map",
          name: "map",
          component: Map
        }
      ]
    },
    {
      path: "*", component: NotFound
    }
  ]
})
