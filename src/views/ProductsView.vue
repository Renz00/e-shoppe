<template>
  <div>
    <Banner />
    <div class="my-2">
      <Products :products="products"/>
    </div>
  </div>
</template>

<script setup>
import Products from '@/components/Products.vue'
import Banner from "@/components/Banner.vue"
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from '../store/product-store'

const { products } = storeToRefs(useProductStore())
const { fetchAllProducts } = useProductStore()

onMounted ( async () => {
  await fetchAllProducts()
})
</script>
