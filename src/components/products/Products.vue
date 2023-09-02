<template>
  <div>
    <ProductCardSm :products="products"/>
  </div>
</template>

<script setup>
import ProductCardSm from './ProductCardSm.vue';
const props = defineProps({
  products: Array
})

</script>
