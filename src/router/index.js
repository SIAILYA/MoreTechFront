import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search/:searchQuery',
    name: 'Search',
    component: () => import("../views/Search.vue")
  },
  {
    path: '/popular',
    name: 'Popular',
    component: () => import("../views/Popular.vue")
  },
  {
    path: '/dataset/:did',
    name: 'Dataset',
    component: () => import("../views/Dataset.vue")
  },
  {
    path: '/task/:tid',
    name: 'Task',
    component: () => import("../views/Task.vue")
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("../views/Login.vue")
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import("../views/Logout.vue")
  },
  {
    path: '/lk',
    name: 'Cabinet',
    component: () => import("../views/Cabinet.vue")
  },
  {
    path: '/learn',
    name: 'Learn',
    component: () => import("../views/Learn.vue")
  },

]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router
