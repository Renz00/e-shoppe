<template>
  <Products :products="products"/>
</template>

<script setup>
import Products from '@/components/Products.vue'
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from '../store/product-store'

const { products } = storeToRefs(useProductStore())
const { fetchAllProducts } = useProductStore()

onMounted ( async () => {
  await fetchAllProducts()
})
</script>
