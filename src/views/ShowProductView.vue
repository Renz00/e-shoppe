<template>
  <v-container class="my-10">
    <!-- Listening to emitCartItemCount from child component -->
    <ProductCardLg @emitCartItemCount="setCartItemCount()"/>
  </v-container>
</template>

<script setup>
import ProductCardLg from '@/components/ProductCardLg.vue'
// import { onMounted } from "vue";
// import { storeToRefs } from "pinia";
import { useProductStore } from '../store/product-store'

// const { cartItemCount } = storeToRefs(useProductStore())
const { setCartItemCount } = useProductStore()

// onMounted ( async () => {
//   await fetchProduct()
// })
</script>
