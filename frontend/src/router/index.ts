import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import TeamsView from '@/views/TeamsView.vue'
import PlayersView from '@/views/PlayersView.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component:  HomeView
  },
  {
    path: '/Login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/teams',
    name: 'teams',
    component: TeamsView,
    meta: { requiresAuth: true } // Indica que esta ruta requiere autenticación
  },
  {
    path: '/players',
    name: 'players',
    component: PlayersView,
    meta: { requiresAuth: true } // Indica que esta ruta requiere autenticación
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Middleware para verificar si el usuario tiene un token JWT al intentar acceder a rutas protegidas
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth) {
    const token = localStorage.getItem('token');
    if (!token) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
