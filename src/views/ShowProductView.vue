<template>
  <v-container class="my-16">
    <ProductCardLg />
  </v-container>
</template>

<script setup>
import ProductCardLg from '@/components/ProductCardLg.vue'
// import { onMounted } from "vue";
// import { storeToRefs } from "pinia";
// import { useProductStore } from '../store/product-store'

// const { products } = storeToRefs(useProductStore())
// const { fetchProduct } = useProductStore()

// onMounted ( async () => {
//   await fetchProduct()
// })
</script>
