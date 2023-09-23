<template>
  <v-container class="mt-5">
    <v-row class="mt-5">
      <v-col>
        <!-- Listening to emitCartItemCount from child component -->
        <ProductCardLg :productId="productId"/>
      </v-col>
    </v-row>
    <v-row class="mt-5" id="title">
      <v-col>
        <div class="text-h4 mb-5">
          Similar products
        </div>
        <NoResults :isLoadingProducts="isLoadingProducts" :productsLength="products.length"/>
        <!-- <Products :products="products" v-if="!isLoadingProducts"/> -->
        <ProductCardSm :products="products" @emitSetCartItemCount="addToCart()"/>
        <Pagination v-if="!isLoadingProducts && products.length>0" />

      </v-col>
    </v-row>
    <Loader v-if="isLoadingProducts"/>
    <AddToCart :overlay="overlay" @emitSetOverlay="overlay=false"/>
  </v-container>
</template>

<script setup>
import { ref, onMounted,watchEffect } from 'vue';
import ProductCardLg from '@/components/products/ProductCardLg.vue'
// import Products from '@/components/products/Products.vue'
import Pagination from '@/components/products/Pagination.vue';
import NoResults from '@/components/products/NoResults.vue';
import Loader from '@/components/layout/Loader.vue';
import ProductCardSm from '@/components/products/ProductCardSm.vue';
import AddToCart from '@/components/products/AddToCart.vue';
import { storeToRefs } from "pinia";
import { useProductStore } from '../store/product-store'

//simProducts - array of products with similar category
const { products, isLoadingProducts } = storeToRefs(useProductStore())
const { handleFilterProducts, setCartItemCount } = useProductStore()

const overlay = ref(false)

const props=defineProps({
  productId: String
})

const addToCart = () => {
  overlay.value = true
  setCartItemCount()
}

//Closes overlay alert after 2 secs if value is true
//watchEffect will watch the value of whatever veriable is referrence within the callback function
watchEffect(() => {
  if (overlay.value) {
    setTimeout(() => {
      overlay.value = false;
    }, 1000);
  }
})

onMounted ( async () => {
  const filters = {
    'category': [1], // 1 is cosmetics
    'rating' : [5, 4, 3],
    'min_price': 0,
    'max_price': 50000
  }
  await handleFilterProducts(filters)
})
</script>
