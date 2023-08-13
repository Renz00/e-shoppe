<template>
  <div>
    <h1 class="py-5">Products</h1>
    <ProductCard :products="products"/>
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue';
const props = defineProps({
    products: Array,
})

</script>
