import Vue from 'vue'
import VueRouter from 'vue-router'
import Dasboard from '../views/Dashboard.vue'
import Purchases from '../views/Purchases.vue'
import Materials from '../views/Materials.vue'
import Sales from '../views/Sales.vue'
import Reports from '../views/Reports.vue'


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dasboard
    },
    {
        path: '/purchases',
        name: 'purchases',
        component: Purchases
    },
    {
        path: '/materials',
        name: 'materials',
        component: Materials
    },
    {
        path: '/sales',
        name: 'sales',
        component: Sales
    },
    {
        path: '/reports',
        name: 'reports',
        component: Reports
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  
  export default router