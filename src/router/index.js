import { useAuthStore } from '@/store/auth-store'

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import ProductsView from '@/views/ProductsView.vue'
import ShowProductView from '@/views/ShowProductView.vue'
import CartView from '@/views/CartView.vue'
import OrderView from '@/views/OrderView.vue'
import TrackOrdersView from '@/views/TrackOrdersView.vue'
import CatalogView from '@/views/CatalogView.vue'
import FavouritesView from '@/views/FavouritesView.vue'
import ProductSearchResultsView from '@/views/ProductSearchResultsView'
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
    path: '/product/:productId',
    name: 'ShowProductView',
    component: ShowProductView,
    props: true
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
    path: '/search-results',
    name: 'ProductSearchResultsView',
    component: ProductSearchResultsView
  },
  {
    path: '/my-orders',
    name: 'TrackOrdersView',
    component: TrackOrdersView
  },
  {
    path: '/order/:orderId',
    name: 'OrderView',
    component: OrderView,
    props: true
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
  const { setAuthDialog } = useAuthStore()
  const cartRoutes = ['CartView']
  const authGuardRoutes = ['OrderView', 'FavouritesView', 'TrackOrdersView']

  //Will redirect to homepage if cart is empty
  if (sessionStorage.getItem('cart')==null) {
    //if the result is not false, to.name value exists in array of route names
    if (cartRoutes.includes(to.name)!=false){
      router.push({name: 'ProductsView'})
      console.log('route guarded: no items in cart')
      
    }
  }
  
  if (sessionStorage.getItem('data')==null){
    if (authGuardRoutes.includes(to.name)!=false){
      setAuthDialog('login')
      router.push({name: from.name})
      console.log('route guarded: user not logged in')
    }
  }
})

export default router
