// Composables
import { createRouter, createWebHistory } from 'vue-router'
import ProductsView from '@/views/ProductsView.vue'
import ShowProductView from '@/views/ShowProductView.vue'
import CartView from '@/views/CartView.vue'
import Error404 from '@/views/404.vue'

const routes = [
  {
    path: '/',
    name: 'ProductsView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ProductsView
  },
  {
    path: '/show-product',
    name: 'ShowProductView',
    component: ShowProductView
  },
  {
    path: '/cart',
    name: 'CartView',
    component: CartView
  },
  {
    path: '/:notFound(.*)',
    component: Error404,
    name: 'Error404'
},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
