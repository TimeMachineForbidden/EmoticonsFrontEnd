import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Test from '../components/test.vue'
import icon from '../components/icon.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: "/test",
    name: 'test',
    component: Test
  },
  {
    path: "/icon",
    name: 'icon',
    component: icon
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    if (to.path === '/detail') {
      let token = localStorage.getItem('Authorization');
      console.log(token + 'token aaaa')
      if (token === null || token === '') {
        next('/login');
      } else {
        next();
      }
    }
    else {
      next();
    }
  }
});
export default router
