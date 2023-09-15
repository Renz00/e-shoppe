import { storeToRefs } from "pinia";
import { useProductStore } from '@/store/product-store'

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import ProductsView from '@/views/ProductsView.vue'
import ShowProductView from '@/views/ShowProductView.vue'
import CartView from '@/views/CartView.vue'
import OrderView from '@/views/OrderView.vue'
import TrackOrdersView from '@/views/TrackOrdersView.vue'
import CatalogView from '@/views/CatalogView.vue'
import FavouritesView from '@/views/FavouritesView.vue'
import Error404 from '@/views/404.vue'

const routes = [
  {
    path: '/',
    name: 'ProductsView',
    component: ProductsView
  },
  {
    path: '/products/:productCategory',
    name: 'CatalogView',
    component: CatalogView,
    props: true
  },
  {
    path: '/product/id',
    name: 'ShowProductView',
    component: ShowProductView
  },
  {
    path: '/cart',
    name: 'CartView',
    component: CartView,
    props: { disableOrderSummaryButtons: false, cartItemsHeight: 690 }
  },
  {
    path: '/my-favourites',
    name: 'FavouritesView',
    component: FavouritesView
  },
  {
    path: '/my-orders',
    name: 'TrackOrdersView',
    component: TrackOrdersView
  },
  {
    path: '/order/id',
    name: 'OrderView',
    component: OrderView,
    props: { disableOrderSummaryButtons: true, disableCartItemsButtons: true,  cartItemsHeight: 600}
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

router.beforeEach(async (to, from) => {
  const { cartItemCount } = storeToRefs(useProductStore())
  const cartRoutes = ['CartView', 'OrderView']
  const authGuardRoutes = ['OrderView', 'FavouritesView', 'TrackOrdersView']
  //Will redirect to homepage if cart is empty
  if (cartItemCount.value<=0) {
    //if the result is not false, to.name value exists in array of route names
    if (cartRoutes.includes(to.name)!=false){
      router.push({name: 'ProductsView'})
      console.log('route guarded: no items in cart')
    }
  }
  if (localStorage.getItem('data')==null){
    if (authGuardRoutes.includes(to.name)!=false){
      router.push({name: 'ProductsView'})
      console.log('route guarded: user not logged in')
    }
  }
})

export default router
